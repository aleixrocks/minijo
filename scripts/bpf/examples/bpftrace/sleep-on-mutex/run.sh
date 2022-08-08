#!/usr/bin/bash

cmd() {
	sleep 10
	echo "starting comand!"
	exec ./main
}

(cmd) &

pid=$!
echo $pid

sudo ./trace.bt $pid
