#include "ht.h"

hash_table_t ht;

int main(int argc, char *argv[])
{
	char *data;

	ht_init(ht);
	ht_insert(ht, 0xffffffff12345678UL, "patata");
	ht_insert(ht, 0xffffffff00000000UL, "cucamonga");
	ht_insert(ht, 0x353UL, "pitifli");

	data = ht_search(ht, 0xffffffff12345678UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(ht, 0xffffffff00000000UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(ht, 0x353UL);
	printf("data: %s\n", (char *) data);
	data = ht_search(ht, 0x3783748343UL);
	printf("data: %s\n", (char *) (data) ? data : "NULL");

	return 0;
}
