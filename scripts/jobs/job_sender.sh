#!/bin/bash
PROG=ser
PROG="par"
NP="1 2 4 8 16"
NS="1024 2048 4096"
NR=5


send() {
	PROG=$1
	P=$2
	NS=$3
	NR=$4

	bsub <<< "
		#BSUB -q training
		#BSUB -n $P
		#BSUB -W 01:00
		#BSUB -J \"SA-MIRI\"
		#BSUB -oo out-%J.out
		#BSUB -eo out-%J.err
		#BSUB -x
		#BSUB -R\"span[ptile=1]\"

		for S in $NS; do
			for R in {1..$NR}; do
				mpirun ../$PROG \$S
			done
		done
	"
}

mkdir -p ./out
cd ./out

for P in $NP; do
	send "$PROG" "$P" "$NS" "$NR"
done
