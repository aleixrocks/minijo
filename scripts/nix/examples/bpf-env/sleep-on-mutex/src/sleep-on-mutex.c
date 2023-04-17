#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>


void *sleep_on_mutex(void *)
{
	pthread_mutex_t mutex;

	pthread_mutex_init(&mutex, NULL);

	pthread_mutex_lock(&mutex);
	sleep(1);
	pthread_mutex_unlock(&mutex);

	pthread_mutex_destroy(&mutex);

	sleep(10);

	return NULL;
}

volatile int aux;
void *preempted_on_mutex(void *)
{
	pthread_mutex_t mutex;

	pthread_mutex_init(&mutex, NULL);

	pthread_mutex_lock(&mutex);

	for (long long int i = 0; i < 10000000ULL; i++) {
		aux += aux*34234/((aux*3.2345)*aux);
	}
	pthread_mutex_unlock(&mutex);

	pthread_mutex_destroy(&mutex);

	return NULL;
}

void stupid_delay(void)
{
	sleep(30);
}

int main(int argc, char *argv[])
{
	int ret;
	int i;
	const int n = 4;
	pthread_t *pthreads;

	pthreads = (pthread_t *) malloc(sizeof(pthread_t) * n);
	if (!pthreads) {
		perror("malloc");
		exit(1);
	}

	for (i = 0; i < n; i++) {
		ret = pthread_create(&pthreads[i], NULL, sleep_on_mutex, NULL);
		if (ret) {
			fprintf(stderr, "Error: pthread_create: %s\n", strerror(ret));
			exit(1);
		}
	}



	//preempted_on_mutex(NULL);

	sleep(5);
	printf("sleeping before exit...\n");
	stupid_delay();
	printf("sleeping done, exiting!\n");

	for (i = 0; i < n; i++) {
		ret = pthread_join(pthreads[i], NULL);
		if (ret) {
			fprintf(stderr, "Error: pthread_join: %s\n", strerror(ret));
			exit(1);
		}
	}

	free(pthreads);

	printf("test done!\n");
}
