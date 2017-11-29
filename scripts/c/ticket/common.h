#ifndef _COMMON_H_
#define _COMMON_H_

#include <pthread.h>

#define TRUE  1
#define FALSE 0

#define AT_LD(var) __atomic_load_n(var, __ATOMIC_RELAXED)
#define AT_ST(var, val) __atomic_store_n(var, val, __ATOMIC_RELAXED)
#define AT_ADD(var, val) __atomic_add_fetch(var, val, __ATOMIC_RELAXED)
#define AT_EXC(var, exp, des) __atomic_compare_exchange_n(var, exp, des, \
		FALSE, __ATOMIC_RELAXED, __ATOMIC_RELAXED)

void init_spinlock(pthread_spinlock_t *lock);
void get_spinlock(pthread_spinlock_t *lock);
void put_spinlock(pthread_spinlock_t *lock);
void aio_abort(const char * msg, int code);
void libc_abort(const char * msg);

#endif //_COMMON_H_
