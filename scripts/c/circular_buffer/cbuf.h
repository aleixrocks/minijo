
#ifndef HEADER_CBUF_H
#define HEADER_CBUF_H
/* circular buffer */

//#include <ihk/types.h>
#include <unistd.h>

typedef unsigned long long int uint64_t;
typedef uint64_t cbuf_t;

struct cbuf {
	size_t head;
	size_t tail;
	size_t size;
	cbuf_t  *buf;
};

int cbuf_init(struct cbuf *cbuf, size_t nelem);
void cbuf_destroy(struct cbuf *cbuf);
size_t cbuf_read(struct cbuf *cbuf, cbuf_t *buf, size_t len);
int cbuf_write(struct cbuf *cbuf, cbuf_t *buf, size_t len);
void reset(struct cbuf *cbuf);

#endif // HEADER_CBUF_H
