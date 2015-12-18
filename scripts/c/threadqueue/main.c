#include "threadqueue.h"
#include "stdio.h"


void main(int argc, char ** argv) {
	struct threadqueue *queueee;
	struct threadmsg msggg;
	int a = thread_queue_init(queueee);
	
	while (1) {
//		thread_queue_get(queue, NULL, &msg);
		printf("%.*s\n",  (int) msggg.msgtype, (char *) msggg.data);
	}
}
