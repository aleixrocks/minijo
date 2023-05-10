#!/usr/bin/env bash

# The integer part of the time values is in us.
# doc: https://www.kernel.org/doc/Documentation/locking/lockstat.rst

full=./lockstat_full.log
sum=./lockstat_summary.log

echo 0 | sudo tee /proc/lock_stat > /dev/null
echo 1 | sudo tee /proc/sys/kernel/lock_stat > /dev/null
$@
echo 0 | sudo tee /proc/sys/kernel/lock_stat > /dev/null

sudo cat /proc/lock_stat > $full
head -n 4 $full > $sum
grep : $full >> $sum
