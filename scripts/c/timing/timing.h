#ifndef _TIMING_H
#define _TIMING_H

#include <time.h>

#define CLOCK CLOCK_MONOTONIC
#define NWATCHES 8

void   tic(int watch);
double toc(int watch);

#endif /* _TIMING_H */
