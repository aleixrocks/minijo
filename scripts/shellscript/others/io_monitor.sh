#!/bin/bash

SECTOR_SIZE=512
DISK_STAT=/sys/block/sda/sda2/stat
OUTFILE=./out_iomonitor.$SLURM_JOBID.csv
LOCAL_ID=$SLURM_LOCALID

# See /Documentation/block/stat.txt for more info
RI=0
RM=1
RS=2
RT=3
WI=4
WM=5
WS=6
WT=7
IF=8
IT=9
TQ=10
T=11

function monitorIO() {
	local SOLD=($(<$DISK_STAT))

	while [ 1 ]; do
		sleep 1

		local SNEW=($(<$DISK_STAT))

		VRS=$(((SNEW[RS]-SOLD[RS])*SECTOR_SIZE/1024/1024))
		VWS=$(((SNEW[WS]-SOLD[WS])*SECTOR_SIZE/1024/1024))

		SOLD=("${SNEW[@]}")

		echo "$VRS,$VWS" >> $OUTFILE
	done
}

if [ $LOCAL_ID -eq 0 ]; then
	echo "Starting I/O monitor"
	rm -f $OUTFILE
	monitorIO &
	MONITORIO_PID=$!
	$*
	kill $MONITORIO_PID
	echo "Killing I/O monitor"
else
	$*
fi
