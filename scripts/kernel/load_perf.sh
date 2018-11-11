#!/bin/bash

BUILD_DIR=/home/aleix/projects/kernel/kernel/kernel/builds

usage() {
	echo "usage: source load_perf.sh <kernel_build_dir>"
	echo " if no <kernel_build_dir> is provided it will attepmt to load"
	echo " the perf binary from the currently loaded kernel"
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
	usage
	return
fi

if [ $# -eq 0 ]; then
	KVER=`uname -r`
else
	KVER=$1
fi


PERF_DIR=$BUILD_DIR/$KVER/perf/install


if [ ! -x $PERF_DIR/bin/perf ]; then
	echo "Error: perf binary not found for kernel build \"$KVER\""
	echo $PERF_DIR/bin/perf
	return
fi
export PATH=$PERF_DIR/bin:$PATH

if [ ! -d $PERF_DIR/share/man ]; then
	echo "Warning: no man pages found for perf"
	echo $PERF_DIR/share/man
else
	export MANPATH=$PERF_DIR/share/man:$MANPATH
fi

