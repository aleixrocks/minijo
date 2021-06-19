#include "ht.h"

#include <sys/queue.h>
#include <assert.h>


static inline size_t hash(hash_table_t *ht, hash_key_t key)
{
	assert(ht != NULL);
	assert(ht->nbkt > 0);
	// TODO improve hash function. it's easy for pointers to point to
	// aligned positions, leaving empty holes
	return key % ht->nbkt;
}

int ht_init(hash_table_t *ht, size_t nbuckets, size_t nentries)
{
	size_t i;
	hash_entry_t *buffer;

	assert(ht != NULL);

	ht->buckets = (hash_bucket_t *)malloc(sizeof(hash_bucket_t) * nbuckets);
	if (!ht->buckets) {
		return 1;
	}

	ht->nbkt = nbuckets;
	SLIST_INIT(&ht->free.head);
	if (pthread_spin_init(&ht->free_lock, PTHREAD_PROCESS_PRIVATE)) {
		return 1;
	}
	for (i = 0; i < nbuckets; i++) {
		SLIST_INIT(&ht->buckets[i].head);
		if (pthread_spin_init(&ht->buckets[i].lock, PTHREAD_PROCESS_PRIVATE)) {
			return 1;
		}
	}

	if (nentries) {
		buffer = (hash_entry_t *)malloc(sizeof(hash_entry_t) * nentries);
		if (!buffer) {
			return 1;
		}

		for (i = 0; i < nentries; i++) {
			SLIST_INSERT_HEAD(&ht->free.head, &buffer[i], list_hook);
		}
	}

	return 0;
}

static hash_entry_t *get_free_entry(hash_table_t *ht)
{
	hash_entry_t *he;

	assert(ht != NULL);

	pthread_spin_lock(&ht->free_lock);
	if (!SLIST_EMPTY(&ht->free.head)) {
		he = SLIST_FIRST(&ht->free.head);
		SLIST_REMOVE_HEAD(&ht->free.head, list_hook);
		pthread_spin_unlock(&ht->free_lock);
	} else {
		pthread_spin_unlock(&ht->free_lock);
		he = (hash_entry_t *) malloc(sizeof(hash_entry_t));
		// if error, we return null anyways
	}

	return he;
}

int ht_insert(hash_table_t *ht, hash_key_t key, void *data)
{
	size_t i;
	hash_entry_t *he;
	hash_bucket_t *bkt;

	assert(ht != NULL);

	i = hash(ht, key);
	bkt = &ht->buckets[i];
	assert(bkt != NULL);

	he = get_free_entry(ht);
	if (!he)
		return 1;

	he->key = key;
	he->data = data;

	//printf("inserting key %lx data %p into bin %u\n", key, data, i);

	pthread_spin_lock(&bkt->lock);
	SLIST_INSERT_HEAD(&bkt->head, he, list_hook);
	pthread_spin_unlock(&bkt->lock);

	return 0;
}

void *ht_search(hash_table_t *ht, hash_key_t key)
{
	hash_entry_t *he;
	hash_bucket_t *bkt;
	size_t i;

	assert(ht != NULL);

	i = hash(ht, key);
	bkt = &ht->buckets[i];
	assert(bkt != NULL);

	//printf("searching for key %lx in bin %u\n", key, i);

	pthread_spin_lock(&bkt->lock);
	SLIST_FOREACH(he, &bkt->head, list_hook) {
		if (he->key == key) {
			pthread_spin_unlock(&bkt->lock);
			return he->data;
		}
	}
	pthread_spin_unlock(&bkt->lock);

	return NULL;
}

void *ht_pop(hash_table_t *ht)
{
	size_t i;
	hash_entry_t *he;
	hash_bucket_t *bkt;

	assert(ht != NULL);

	for (i = 0; i < ht->nbkt; i++) {
		bkt = &ht->buckets[i];
		assert(bkt != NULL);
		pthread_spin_lock(&bkt->lock);
		if (!SLIST_EMPTY(&bkt->head)) {
			break;
		}
		pthread_spin_unlock(&bkt->lock);
	}

	if (i == ht->nbkt) {
		// no locks held if all buckets were traversed
		return NULL;
	}

	// we hold the lock of the bucket with at least one entry
	he = SLIST_FIRST(&bkt->head);
	SLIST_REMOVE_HEAD(&bkt->head, list_hook);
	pthread_spin_unlock(&bkt->lock);

	pthread_spin_lock(&ht->free_lock);
	SLIST_INSERT_HEAD(&ht->free.head, he, list_hook);
	pthread_spin_unlock(&ht->free_lock);

	return he->data;
}
