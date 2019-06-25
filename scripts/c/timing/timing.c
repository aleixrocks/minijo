#include "timing.h"

/* If the clock macro is defined, we use the POSIX clock_gettime,
 * and CLOCK defines which timer should be used.  Otherwise, we use
 * the system clock() command.
 */


#ifdef CLOCK
static struct timespec watches[NWATCHES];
#else
static clock_t watches[NWATCHES];
#endif

uint64_t utime_diff(struct timespec *start, struct timespec *end)
{
	uint64_t elapsed;

	if (end->tv_sec == start->tv_sec) {
		elapsed = end->tv_nsec - start->tv_nsec;
		elapsed /= 1000;
	} else {
		elapsed = 1000000000ULL - start->tv_nsec + end->tv_nsec;
		elapsed /= 1000;
		elapsed += (end->tv_sec - start->tv_sec - 1)*1000000ULL;
	}

	return elapsed;
}

void us_to_timespec(uint64_t us, struct timespec *ts)
{
	ts->tv_sec  = us/1000000UL;
	ts->tv_nsec = (us - ts->tv_sec*1000000UL)*1000UL;
}

void tic(int watch)
{
#ifdef CLOCK
	clock_gettime(CLOCK, watches+watch);
#else
	watches[watch] = clock();
#endif
}


double toc(int watch)
{
	double elapsed;
#ifdef CLOCK
	struct timespec now;
	clock_gettime(CLOCK, &now);
	elapsed = utime_diff(&watches[watch], &now);
#else
	clock_t now = clock();
	elapsed = (double) (now-watches[watch])/CLOCKS_PER_SEC;
#endif
	return elapsed;
}
