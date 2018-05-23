#!/bin/bash

function usage() {
	echo "Usage:"
	echo "    parsetron.sh submitron-folder"
}

function standardDeviation() {
	echo "$1" | awk '
	{
		cnt=0
		sum=0
		std="X"
		for(i = 1; i <= NF; i++) {
			if ($i != "X") {
				sum+=$i
				cnt+=1
			}
		}
		if (cnt > 0) {
			M = sum/cnt

			sum = 0
			for (i = 1; i <= NF; i++) {
				if ($i != "X") {
					sum += ($i-M) * ($i-M)
				}
			}

			std = sqrt (sum / cnt)

			printf "%.2f", std
		} else {
			printf "X"
		}
	}'
}

function mean() {
	echo "$1" | awk '
	{
		if (sum != 0) {
			exit
		}

		mean="X"
		sum=0
		cnt=0
		for(i = 1; i <= NF; i++) {
			if ($i != "X") {
				sum+=$i
				cnt+=1
			}
		}
		if (cnt > 0) {
			mean = sum/cnt
			printf "%.2f", mean
		} else {
			printf "X"
		}
	}
	'
}

function getMaxMemory() {
	local LOG=$1

	awk -F':' '
	/Maximum resident set size \(kbytes\)/ {
		sum += $2;
		next
	}
	/Maximum resident set size/ { 
		print "Error: time -v reports not known size"
		print $0
	}
	END {
		print sum/1024/1024
	}' $LOG
}



if [ $# -ne 1 ]; then
	usage
	exit 1
fi


IDIR=$1
GRES=$IDIR/results

rm -f $GRES
for ID in $IDIR/*/; do
	for CNF in $ID/*; do
		echo $CNF
		RESULTS=""
		MEMORY=""
		TAINTED=false
		LRES=$CNF/raw
		rm -f $LRES
		HEADER=${CNF##*/}
		HEADER=`echo $HEADER | tr '_' ','`
		REP=`ls -1 $CNF/slurm-* | wc -l`
		GOODCNT=0
		for R in `seq 1 $REP`; do
			OUT=$CNF/slurm-$R
			RES=""
			RES=`awk -F: '/PARSEME/ {print $2}' $OUT`
			ERR=`awk -F: '/JOB_ERROR/ {print "true"}' $OUT`
			MEM=$(getMaxMemory $OUT)
			if [ -z $RES ]; then
				RES='X'
				TAINTED=true
			else
				GOODCNT=$(( GOODCNT + 1 ))
			fi

			if [ "$ERR" == "true" ]; then 
				TAINTED=true
			fi
			RESULTS="$RESULTS $RES"
			MEMORY="$MEMORY $MEM"
			echo "$R,$HEADER,$MEM,$RES" >> $LRES
		done
		MEAN=$(mean "$RESULTS")
		STD=$(standardDeviation "$RESULTS")
		MEM_MEAN=$(mean "$MEMORY")
		MEM_STD=$(standardDeviation "$MEMORY")

		if [ "$TAINTED" == "true" ]; then
			echo "$HEADER,$REP,$MEM_MEAN,$MEM_STD,$MEAN,$STD,($GOODCNT/$REP)!" >> $GRES
		else
			echo "$HEADER,$REP,$MEM_MEAN,$MEM_STD,$MEAN,$STD" >> $GRES
		fi
	done
done
