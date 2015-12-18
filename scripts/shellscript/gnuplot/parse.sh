#!/bin/bash

# This script takes some input files, that are parsed
# with awk. The output of all parsed files are given to
# gnuplot which plot all of them as separe graphs in
# the same image.

usage() {
	echo -n "usage: parse.sh graph_title \"graph1_name graph2_name ...\""
	echo " file1 [file2 [file3 ..]]"
	echo "where the number of graph_name is the same as the number of files"
}

if [ $# -le 2 ]; then
	echo "input filename expected"
	usage;
	exit;
fi

NARG=$(( ($# - 1)/2 ))

for i in ${@:2+NARG}; do
	
	awk -f parse.awk $i > .${i}.awk
	F="$F .${i}.awk"
done

L=${@:2:NARG}

TITLE=$1 NF=$(($# - 1)) FILES="$F" LABELS="$L" gnuplot -p ./parse.gpi

for i in $F; do
	rm $i
done
