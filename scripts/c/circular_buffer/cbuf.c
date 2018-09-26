#include <cbuf.h>
//#include <kmalloc.h>
#include <string.h>

#include <stdio.h>
#include <stdlib.h>
#define kprintf printf
#define kmalloc(a, b) malloc(a)
#define kfree(a) free(a)
#define ENOMEM -3

int cbuf_init(struct cbuf *cbuf, size_t nelem)
{
	/* alloc and initialize buffer */
	nelem += 1;
	cbuf->buf = kmalloc(nelem*sizeof(cbuf_t), IHK_MC_PG_KERNEL);
	if (!cbuf->buf)
		return -ENOMEM;
	cbuf->head = 0;
	cbuf->tail = 0;
	cbuf->size  = nelem;

	return 0;
}

void cbuf_destroy(struct cbuf *cbuf)
{
	kfree(cbuf->buf);
	cbuf->size = 0;
	cbuf->head = 0;
	cbuf->tail = 0;
}


int cbuf_write(struct cbuf *cbuf, cbuf_t *buf, size_t len)
{
	if (!cbuf || !cbuf->buf) {
		kprintf("cbuf buffer not allocated before writing\n");
		return -1;
	}

	/* cripple user buffer if it is bigger than cbuf */
	if (len >= cbuf->size) {
		buf = buf + len - (cbuf->size-1);
		len = cbuf->size-1;
		cbuf->head = 0;
		cbuf->tail = 0;
	}

	/* buffer overflow */
	if (cbuf->head + len >= cbuf->size) {
		kprintf(" - write: buffer overflow\n");
		size_t chunk1, chunk2;
		size_t data_lost = 0;

		chunk1 = cbuf->size - cbuf->head;
		chunk2 = len - chunk1;

		/* first chunk */
		memcpy(&cbuf->buf[cbuf->head], buf, chunk1*sizeof(cbuf_t));

		/* second chunk */
		memcpy(cbuf->buf, buf+chunk1, chunk2*sizeof(cbuf_t));

		/* update tail */
		if (cbuf->tail > cbuf->head) {
			data_lost = cbuf->size - cbuf->tail + chunk2 + 1;
		} else if (cbuf->tail <= chunk2) {
			data_lost = chunk2 - cbuf->tail + 1;
		}

		if (data_lost) {
			cbuf->tail = (chunk2+1)%cbuf->size;
			kprintf("PEBS cbuf data lost: %lu records\n", data_lost);
		}

		cbuf->head = chunk2;
	/* no buffer overflow but data override */
	} else if ((cbuf->head < cbuf->tail) &&
		   (cbuf->head + len >= cbuf->tail)) {
		kprintf(" - write: data override\n");
		size_t data_lost = 0;
		memcpy(&cbuf->buf[cbuf->head], buf, len*sizeof(cbuf_t));
		data_lost = cbuf->head+len - cbuf->tail + 1;
		cbuf->head += len;
		cbuf->tail = (cbuf->head+1)%cbuf->size;
		kprintf("PEBS cbuf data lost: %lu records\n", data_lost);
	/* no buffer overflow and no data override */
	} else {
		kprintf(" - write: normal\n");
		memcpy(&cbuf->buf[cbuf->head], buf, len*sizeof(cbuf_t));
		cbuf->head += len;
	}

	return 0;
}

size_t cbuf_read(struct cbuf *cbuf, cbuf_t *buf, size_t len)
{
	size_t ret;

	if (!cbuf || !cbuf->buf) {
		kprintf("cbuf buffer not allocated before reading\n");
		return 0;
	}

	if (cbuf->tail == 0 && cbuf->head == 0)
		return 0;

	if (len >= cbuf->size)
		len = cbuf->size-1;

	/* buffer overflow */
	if ((cbuf->tail + len >= cbuf->size) && (cbuf->tail > cbuf->head)) {
		kprintf(" - read: overflow\n");
		size_t chunk1, chunk2;

		chunk1 = cbuf->size - cbuf->tail;
		chunk2 = (len-chunk1 <= cbuf->head)? len - chunk1 : cbuf->head;

		/* first chunk */
		memcpy(buf, &cbuf->buf[cbuf->tail], chunk1*sizeof(cbuf_t));
		/* second chunk */
		memcpy(buf+chunk1, cbuf->buf, chunk2*sizeof(cbuf_t));

		cbuf->tail = chunk2;
		ret = chunk1+chunk2;
	/* no buffer overflow */
	} else {
		kprintf(" - read: no overflow\n");
		size_t chunk;
		if (cbuf->tail > cbuf->head)
			chunk = len;
		else
			chunk = (cbuf->tail + len >= cbuf->head)?
				cbuf->head - cbuf->tail : len;

		memcpy(buf, &cbuf->buf[cbuf->tail], chunk*sizeof(cbuf_t));
		cbuf->tail += chunk;
		ret = chunk;
	}

	/* if tail == head, buffer is empy */
	if (cbuf->tail == cbuf->head) {
		cbuf->tail = 0;
		cbuf->head = 0;
	}

	return ret;
}

void reset(struct cbuf *cbuf)
{
	if (!cbuf || !cbuf->buf) {
		kprintf("cbuf buffer not allocated before reset\n");
	}

	cbuf->head = 0;
	cbuf->tail = 0;
}


int check(struct cbuf *cbuf, size_t ehead, size_t etail)
{
	size_t head = cbuf->head;
	size_t tail = cbuf->tail;
	if (!((ehead == head) && (etail == tail))) {
		kprintf("error, results do not coincide:\n - head: %llu != %llu\n - tail: %llu != %llu\n", head, ehead, tail, etail);
		return 1;
	}
	return 0;
}

int checkr(struct cbuf *cbuf, size_t ehead, size_t etail, cbuf_t *res, cbuf_t *eres, size_t s)
{
	int ret = 0;
	char found = 0;
	size_t i;
	if (!check(cbuf, ehead, etail)) {
		for (i = 0; i < s; i++) {
			if (eres[i] != res[i]) {
				found = 1;
				break;
			}
		}
		if (found) {
			printf("results differ:\n");
			printf(" - result = ");
			for (i = 0; i < s; i++) {
				printf("%lu ", res[i]);
			}
			printf("\n - expect = ");
			for (i = 0; i < s; i++) {
				printf("%lu ", eres[i]);
			}
			printf("\n");
		}
	}
	return ret;
}

int main() {
	struct cbuf cbuf;
	int i;
	cbuf_t a[50];
	cbuf_t x[20];

	for (i = 0; i < 50; i++)
		a[i] = i;

	cbuf_init(&cbuf, 10);
	memset(x,0,20*sizeof(cbuf_t));

	kprintf("::::::: write normal test :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: read normal test 1 :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	cbuf_read(&cbuf, x, 1);
	checkr(&cbuf, 5, 1, x,(cbuf_t[]){0}, 1);
	cbuf_read(&cbuf, x, 4);
	checkr(&cbuf, 0, 0, x,(cbuf_t[]){1,2,3,4}, 4);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: write data overflow test :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	cbuf_write(&cbuf, a, 10);
	check(&cbuf, 4, 5);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);
	//TODO check data lost variants (2)

	kprintf("\n::::::: read data overflow test :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	cbuf_write(&cbuf, a, 10);
	check(&cbuf, 4, 5);
	cbuf_read(&cbuf, x, 6);
	checkr(&cbuf, 4, 0, x, (cbuf_t[]){0,1,2,3,4,5},6);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: write data override test :::::::\n");
	cbuf_write(&cbuf, a, 10);
	check(&cbuf, 10, 0);
	cbuf_write(&cbuf, a, 4);
	check(&cbuf, 3, 4);
	cbuf_read(&cbuf, x, 4);
	check(&cbuf, 3, 8);
	cbuf_write(&cbuf, a, 5); //data lost 1
	check(&cbuf, 8, 9);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: read normal test 2 :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	cbuf_read(&cbuf, x, 10);
	checkr(&cbuf, 0, 0, x, (cbuf_t[]){0,1,2,3,4,0,0,0,0,0}, 10);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: read normal test 3 :::::::\n");
	cbuf_write(&cbuf, a, 5);
	check(&cbuf, 5, 0);
	cbuf_write(&cbuf, a, 8);
	check(&cbuf, 2, 3);
	cbuf_read(&cbuf, x, 3);
	checkr(&cbuf, 2, 6, x, (cbuf_t[]){3,4,0}, 3);
	memset(x,0,20*sizeof(cbuf_t));
	reset(&cbuf);

	kprintf("\n::::::: write bigger buffer than cbuf :::::::\n");
	cbuf_write(&cbuf, a, 3);
	check(&cbuf, 3, 0);
	cbuf_write(&cbuf, a, 33);
	check(&cbuf, 10, 0);
	cbuf_read(&cbuf, x, 10);
	checkr(&cbuf, 0, 0, x, (cbuf_t[]){23,24,25,26,27,28,29,30,31,32}, 10);

	kprintf("\n::::::: read bigger buffer than cbuf :::::::\n");
	cbuf_write(&cbuf, a, 10);
	check(&cbuf, 10, 0);
	cbuf_read(&cbuf, x, 20);
	checkr(&cbuf, 0, 0, x, (cbuf_t[]){
	       0,1,2,3,4,5,6,7,8,9,
	       0,0,0,0,0,0,0,0,0,0}, 20);

	return 0;
}
