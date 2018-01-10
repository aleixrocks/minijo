#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <math.h>

typedef float type_t;

#define NBUFF 1024
#define BUFF_SIZE (NBUFF*sizeof(type_t))

void pabort()
{
	perror("perror:");
	_exit(1);
}

void mabort(char * msg)
{
	fprintf(stderr, "%s\n", msg);
	_exit(1);
}

void usage()
{
	printf("usage:\n");
	printf("  cmpheat heat_1.ppm heat_2.ppm [delta]\n\n");
	printf("compare heat_1.ppm and heat_2.ppm with\n");
	printf("delta tolerance where 0 < delta < 1\n");
}

ssize_t unintread(int fd, void *buffer, size_t size)
{
	ssize_t total, rd;

	total = 0;

	while (total != size) {
		rd = read(fd, &((char*)buffer)[total], size - total);
		if (rd == -1) pabort();
		if (rd == 0) break;

		total += rd;
	}

	return total;
}


void compare(char *fname1, char *fname2, int fd1, int fd2, size_t size,
	    double delta, type_t *buffer1, type_t *buffer2)
{

	double tol;
	int i, nelem;
	ssize_t r1, r2;
	size_t remmaining;
	unsigned long int byte = 0;
	unsigned long int elem = 0;

	remmaining = size;

	while (remmaining) {
		r1 = unintread(fd1, buffer1, BUFF_SIZE);
		r2 = unintread(fd2, buffer2, BUFF_SIZE);

		if (r1 != r2)          mabort("error reading");
		if (r1 == 0)           break;
		if (r1%sizeof(type_t)) mabort("error reading");

		nelem = r1/sizeof(type_t);

		for (i = 0; i < nelem; i++, byte+=sizeof(type_t), elem++) {
			tol = fabs(((double)buffer1[i])*delta);

			if ( ((double)buffer2[i]      < ((double)buffer1[i]-tol)) ||
			   ( ((double)buffer1[i]+tol) <  (double)buffer2[i])) {
				fprintf(stderr, "byte: %lu elem: %lu tol: %f buf1:%f buf2:%f\n", byte, elem, tol, buffer1[i], buffer2[i]);
				mabort("Files differ");
			}
		}

		remmaining -= r1;
	}

	if (remmaining) mabort("Files could not be compared untill the end");
}

int main(int argc, char ** argv)
{
	struct stat st;
	int ret;
	char *fname1, *fname2;
	int  fd1, fd2;
	size_t s1, s2;
	type_t *buffer1, *buffer2;
	double delta;

	ret = 0;
	delta = 0;

	if ((argc != 3) && (argc != 4)) {
		usage();
		return 1;
	}

	fname1 = argv[1];
	fname2 = argv[2];
	if (argc == 4) delta = atof(argv[3]);

	if ((buffer1 = malloc(BUFF_SIZE)) == NULL) pabort();
	if ((buffer2 = malloc(BUFF_SIZE)) == NULL) pabort();

	if ((fd1 = open(fname1, 0, O_RDONLY)) == -1) pabort();
	if ((fd2 = open(fname2, 0, O_RDONLY)) == -1) pabort();

	if (fstat(fd1, &st)) pabort();
	s1 = st.st_size;
	if (fstat(fd2, &st)) pabort();
	s2 = st.st_size;

	if (s1 != s2)          mabort("File lengths differ");
	if (s1%sizeof(type_t)) mabort("File 1 is corrupted");
	if (s2%sizeof(type_t)) mabort("File 2 is corrupted");

	compare(fname1, fname2, fd1, fd2, s1, delta, buffer1, buffer2);

	free(buffer1);
	free(buffer2);
	close(fd1);
	close(fd2);

	return ret;
}
