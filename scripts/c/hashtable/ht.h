#ifndef _HT_H_
#define _HT_H_

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/queue.h>

typedef unsigned long hash_key_t;

typedef struct hash_entry {
	SLIST_ENTRY(hash_entry) list_hook;
	hash_key_t key;
	void *data;
} hash_entry_t;

SLIST_HEAD(hash_bucket_head, hash_entry);

typedef struct hash_bucket {
	pthread_spinlock_t lock; // TODO upgrade to read-write spinlock
	struct hash_bucket_head head;
} hash_bucket_t;

typedef struct hash_table {
	int nbkt;
	hash_bucket_t free;
	pthread_spinlock_t free_lock; // TODO upgrade to read-write spinlock
	hash_bucket_t *buckets;
} hash_table_t;

int ht_init(hash_table_t *ht, size_t nbuckets, size_t nentries);
void *ht_search(hash_table_t *ht, hash_key_t key);
int ht_insert(hash_table_t *ht, hash_key_t key, void *data);
void *ht_pop(hash_table_t *ht);

#endif // _HT_H_
