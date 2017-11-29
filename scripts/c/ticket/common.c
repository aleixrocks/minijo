#include <stdio.h>
#include <unistd.h>
#include <error.h>

#include "common.h"


void aio_abort(const char * msg, int code) {
	error(1, -code, "%s", msg);
}

void libc_abort(const char * msg) {
	perror(msg);
	_exit(1);
}

void inline get_spinlock(pthread_spinlock_t *lock) {
	if (pthread_spin_lock(lock)) {
		libc_abort("Error while getting spinlock");
	}
}

void inline put_spinlock(pthread_spinlock_t *lock) {
	if (pthread_spin_unlock(lock)) {
		libc_abort("Error while unlocking spinlock");
	}
}

void init_spinlock(pthread_spinlock_t *lock) {
	if (pthread_spin_init(lock, PTHREAD_PROCESS_SHARED)) {
		libc_abort("Error initializing spinlock");
	}
}
