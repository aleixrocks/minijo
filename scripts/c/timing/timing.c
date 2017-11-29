#include "timing.h"
#include <time.h>

/* If the clock macro is defined, we use the POSIX clock_gettime,
 * and CLOCK defines which timer should be used.  Otherwise, we use
 * the system clock() command.
 */


#ifdef CLOCK
static struct timespec watches[NWATCHES];
#else
static clock_t watches[NWATCHES];
#endif


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
    clock_gettime(CLOCK, &now);
    //elapsed = now.tv_nsec - (double) watches[watch].tv_nsec;
    //elapsed *= 1.0E-9L;
    //elapsed += now.tv_sec - (double) watches[watch].tv_sec;
    if (now.tv_sec == watches[watch].tv_sec) {
        elapsed = now.tv_nsec - watches[watch].tv_nsec;
        elapsed /= 1000;
    } else {
        elapsed = 1000000000 - watches[watch].tv_nsec + now.tv_nsec;
        elapsed /= 1000;
        elapsed += (now.tv_sec - watches[watch].tv_sec)*1000000;
    }
#else
    clock_t now = clock();
    elapsed = (double) (now-watches[watch])/CLOCKS_PER_SEC;
#endif    
    return elapsed;
}
