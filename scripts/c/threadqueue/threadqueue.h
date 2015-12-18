#ifndef _THREADQUEUE_H_
#define _THREADQUEUE_H_ 

#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <pthread.h>
#include <sys/time.h>
#include <pthread.h>

struct threadmsg{
        void *data;
        long msgtype;
        long qlength;
};

struct threadqueue {
        long length;
        pthread_mutex_t mutex;
        pthread_cond_t cond;
        struct msglist *first,*last;
    struct msglist *msgpool;
    long msgpool_length;
};

int thread_queue_init(struct threadqueue *queue);
int thread_queue_add(struct threadqueue *queue, void *data, long msgtype);
int thread_queue_get(struct threadqueue *queue, const struct timespec *timeout, struct threadmsg *msg);
long thread_queue_length( struct threadqueue *queue );
int thread_queue_cleanup(struct threadqueue *queue, int freedata);

#endif
