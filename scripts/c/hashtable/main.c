#include <stdio.h>
#include <string.h>

#include "ht.h"

void ht_insert_safe(hash_table_t *ht, hash_key_t key, void *value)
{
	if (ht_insert(ht, key, value)) {
		perror("ht_insert");
		exit(EXIT_FAILURE);
	}
}

void easy()
{
	char *data;
	hash_table_t ht;

	if (ht_init(&ht, 100, 1)) {
		perror("ht_init");
		exit(EXIT_FAILURE);
	}


	ht_insert_safe(&ht, 0xffffffff12345678UL, "patata");
	ht_insert_safe(&ht, 0xffffffff00000000UL, "cucamonga");
	ht_insert_safe(&ht, 0x353UL, "pitifli");

	data = ht_search(&ht, 0xffffffff12345678UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(&ht, 0xffffffff00000000UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(&ht, 0x353UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(&ht, 0x3783748343UL);
	printf("data: %s\n", (char *) (data) ? data : "NULL");
}

void hard_body(hash_table_t *ht)
{
	size_t i;
	char *data;
	size_t test_size = 10000;
	char *abc = "abcdefghijklmnopqrstuvwxyz";
	int abcl = strlen(abc);
	char *p = abc;


	for (i = 0; i < test_size; i++) {
		ht_insert(ht, i, (p + (i % abcl)));
	}

	printf("hard: inserted %zu elements\n", test_size);

	for (i = 0; i < test_size; i++) {
		char *t = ht_search(ht, i);
		char *e = (p + (i % abcl));
		if (*t != *e) {
			fprintf(stderr, "Error: position %d: expected: \"%c\" found = \"%c\"\n",
				i, *e, *t);
		}
	}

	printf("hard: checked %zu elements\n", test_size);

	size_t deletes = test_size/2;
	for (i = 0; i < deletes; i++) {
		char *t = ht_pop(ht);
		if (t == NULL) {
			fprintf(stderr, "Error: delete %d failed\n", i);
		}
	}

	printf("hard: removed %zu elements\n", deletes);

	size_t failures = 0;
	for (i = 0; i < test_size; i++) {
		char *t = ht_search(ht, i);
		char *e = (p + (i % abcl));
		if (t == NULL) {
			failures++;
			continue;
		}

		if (*t != *e) {
			failures++;
			fprintf(stderr, "Error: delete test: position %d: expected: \"%c\" found = \"%c\"\n",
				i, *e, *t);
		}
	}

	if (failures != deletes) {
		fprintf(stderr, "Error: deleted expected: %zu, deletes found: %zu\n",
			deletes, failures);

	}

	printf("hard: checked %zu elements removed\n", deletes);

	size_t rest = test_size - deletes;
	for (i = 0; i < rest; i++) {
		char *t = ht_pop(ht);
		if (t == NULL) {
			fprintf(stderr, "Error: delete rest test: delete %d failed\n", i);
		}
	}

	printf("hard: removed remaining %zu elements\n", rest);
	// all deleted up to this point
	char *t = ht_pop(ht);
	if (t != NULL) {
		fprintf(stderr, "Error: delete last failed\n");
	}

	printf("hard: checked remaining removed elements\n");
}

void hard()
{
	int i;
	int len = 100;
	hash_table_t ht;

	if (ht_init(&ht, 100, 1)) {
		perror("ht_init");
		exit(EXIT_FAILURE);
	}
	for (i = 0; i < len; i++) {
		hard_body(&ht);
	}
}

int main(int argc, char *argv[])
{
	easy();
	hard();
	return 0;
}
