#!/usr/bin/perl -w
use strict;

use Time::HiRes qw/sleep/;

# First, set the standard output to auto-flush
select((select(STDOUT), $| = 1)[0]);

# And loop 5000 times, printing values...
my $offset = 0.0;
while(1) {
    print "0:".sin($offset)."\n";
    print "1:".cos($offset)."\n";
    $offset += 0.1;
    if ($offset > 500) {
        last;
    }
    sleep(0.02);
}
