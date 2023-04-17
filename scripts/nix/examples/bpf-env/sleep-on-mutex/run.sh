#!/usr/bin/bash

function delayed_run() {
	local cmd=$1

	sleep 10
	echo "starting comand!"
	exec $cmd
}


cmd=`readlink -f ${1:-"./sleep-on-mutex"}`
trace=${2:-"./trace.bt"}

(delayed_run $cmd) &

pid=$!
echo $pid

glibc_path=$(ldd $cmd | grep libc.so.6 | awk '{print $3}')

sudo $trace $pid $glibc_path $cmd
