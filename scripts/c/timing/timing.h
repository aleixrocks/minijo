#ifndef _TIMING_H
#define _TIMING_H

#include <time.h>
#include <stdint.h>

#define CLOCK CLOCK_MONOTONIC
#define NWATCHES 8

void   tic(int watch);
double toc(int watch);

void us_to_timespec(uint64_t us, struct timespec *ts);
uint64_t utime_diff(struct timespec *start, struct timespec *end);

#endif /* _TIMING_H */
