#!/bin/bash

#SBATCH --qos=bsc_cs
#SBATCH --time=02-00:00:00
#SBATCH -D .
#SBATCH --nodes=4
#SBATCH --exclusive
#SBATCH --job-name=fwi-mpi
#SBATCH --output=slurm-%A


##################################################################
######################### CONFIGURATION ##########################
##################################################################

BSC_SCRATCH_HOME='/gpfs/scratch/bsc15/bsc15182/fwi'
IODIRS_ID=("local" "gpfs")    # Pretty name for I/O directories
ODIRECT_ID=("none" "odirect") # Pretty name for O_DIRECT



# weak scalability test
#REP=5
#SUB_IDS="ioseq inter libsio2aio both"
#NODE_CONFIG="4:2:24 1:1:24 1:2:24 2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
#ODIRECT="1 0"

# weak sscalability test tmp
REP=5
SUB_IDS="ioseq iopar inter libsio2aio both"
NODE_CONFIG="4:2:24 1:1:24 1:2:24 2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
ODIRECT="1 0"


# Two nodes full
#REP=10
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
#ODIRECT="1 0"


# One node full
#REP=10
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="1:2:24 1:48:1" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
#ODIRECT="1 0"

# A bit of all
#REP=1
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
#ODIRECT="1 0"


# two node debug
#REP=1
#SUB_IDS="ioseq libsio2aio"
#NODE_CONFIG="4:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS="${TMPDIR} $BSC_SCRATCH_HOME/$SLURM_JOB_ID"
#ODIRECT="1 0"


#ulimit -c unlimited

##################################################################
###################### SUBMISSION SCRIPTS ########################
##################################################################



function run_ioseq() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4

	local FWI_PARAMS=../SetupParams/fwi_params.txt
	local FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$SLURM_JOB_ID
	local TIME="/usr/bin/time -v"

	echo "JOB_CONFIG:$JOB_CONFIG"
	cp $FWI_PARAMS $FWI_JOB_PARAMS
	sed -i "s~.*Results.*~$RESULTS_DIR/Results~" $FWI_JOB_PARAMS
	local CMD="./fwi.ioseq $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt $ODIRECT"

	srun --nodes=$NODES                    \
	     --tasks-per-node=$TASK_PER_NODE   \
	     --cpus-per-task=$CPUS_PER_TASK    \
	     $TIME $CMD

	local STATUS=$?
	if [ $STATUS -ne 0 ]; then
		echo "JOB_ERROR:$STATUS"
	fi

	rm $FWI_JOB_PARAMS
	rm -r $RESULTS_DIR/Results
}

function run_iopar() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4

	local FWI_PARAMS=../SetupParams/fwi_params.txt
	local FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$SLURM_JOB_ID
	local TIME="/usr/bin/time -v"

	echo "JOB_CONFIG:$JOB_CONFIG"
	cp $FWI_PARAMS $FWI_JOB_PARAMS
	sed -i "s~.*Results.*~$RESULTS_DIR/Results~" $FWI_JOB_PARAMS
	local CMD="./fwi.iopar $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt $ODIRECT"

	srun --nodes=$NODES                    \
	     --tasks-per-node=$TASK_PER_NODE   \
	     --cpus-per-task=$CPUS_PER_TASK    \
	     $TIME $CMD

	local STATUS=$?
	if [ $STATUS -ne 0 ]; then
		echo "JOB_ERROR:$STATUS"
	fi

	rm $FWI_JOB_PARAMS
	rm -r $RESULTS_DIR/Results
}

function run_libsio2aio() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4

	local FWI_PARAMS=../SetupParams/fwi_params.txt
	local FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$SLURM_JOB_ID
	local TIME="/usr/bin/time -v"

	local LIBSIO2AIO_INSTALL=/gpfs/projects/bsc15/bsc15182/libsio2aio

	echo "JOB_CONFIG:$JOB_CONFIG"
	cp $FWI_PARAMS $FWI_JOB_PARAMS
	sed -i "s~.*Results.*~$RESULTS_DIR/Results~" $FWI_JOB_PARAMS
	local CMD="./fwi.ls2a $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt $ODIRECT"

	LD_LIBRARY_PATH=$LIBSIO2AIO_INSTALL/obj:$LD_LIBRARY_PATH srun  \
	     --nodes=$NODES                                            \
	     --tasks-per-node=$TASK_PER_NODE                           \
	     --cpus-per-task=$CPUS_PER_TASK                            \
	     $TIME $CMD

	local STATUS=$?
	if [ $STATUS -ne 0 ]; then
		echo "JOB_ERROR:$STATUS"
	fi

	rm $FWI_JOB_PARAMS
	rm -r $RESULTS_DIR/Results
}



function run_inter() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4

	local FWI_PARAMS=../SetupParams/fwi_params.txt
	local FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$SLURM_JOB_ID
	local TIME="/usr/bin/time -v"
	local MPIINTER_INSTALL=/gpfs/projects/bsc15/bsc15182/mpi_inter/install


	echo "JOB_CONFIG:$JOB_CONFIG"
	cp $FWI_PARAMS $FWI_JOB_PARAMS
	sed -i "s~.*Results.*~$RESULTS_DIR/Results~" $FWI_JOB_PARAMS
	local CMD="./fwi.intr $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt $ODIRECT"

	LD_LIBRARY_PATH=$MPIINTER_INSTALL/lib:$LD_LIBRARY_PATH srun  \
	     --nodes=$NODES                                          \
	     --tasks-per-node=$TASK_PER_NODE                         \
	     --cpus-per-task=$CPUS_PER_TASK                          \
	     $TIME $CMD

	local STATUS=$?
	if [ $STATUS -ne 0 ]; then
		echo "JOB_ERROR:$STATUS"
	fi

	rm $FWI_JOB_PARAMS
	rm -r $RESULTS_DIR/Results
}

function run_both() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4

	local FWI_PARAMS=../SetupParams/fwi_params.txt
	local FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$SLURM_JOB_ID
	local TIME="/usr/bin/time -v"
	local MPIINTER_INSTALL=/gpfs/projects/bsc15/bsc15182/mpi_inter/install
	local LIBSIO2AIO_INSTALL=/gpfs/projects/bsc15/bsc15182/libsio2aio


	echo "JOB_CONFIG:$JOB_CONFIG"
	cp $FWI_PARAMS $FWI_JOB_PARAMS
	sed -i "s~.*Results.*~$RESULTS_DIR/Results~" $FWI_JOB_PARAMS
	local CMD="./fwi.both $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt $ODIRECT"

	LD_LIBRARY_PATH=$MPIINTER_INSTALL/lib:$LIBSIO2AIO_INSTALL/obj:$LD_LIBRARY_PATH srun  \
	     --nodes=$NODES                                                                  \
	     --tasks-per-node=$TASK_PER_NODE                                                 \
	     --cpus-per-task=$CPUS_PER_TASK                                                  \
	     $TIME $CMD

	local STATUS=$?
	if [ $STATUS -ne 0 ]; then
		echo "JOB_ERROR:$STATUS"
	fi

	rm $FWI_JOB_PARAMS
	rm -r $RESULTS_DIR/Results

}


##################################################################
########################## FUNCTIONS #############################
##################################################################



function run() {
	local ODIR="$1"
	local ID="$2"
	local CONFIG="$3"
	local ODIRECT="$4"
	local IOD="$5"
	local R="$6"

	local SUBMIT_OUTPUT=$ODIR/slurm-$R

	case $ID in
	ioseq)
		run_ioseq $ODIR $CONFIG $ODIRECT $IOD &> $SUBMIT_OUTPUT
		;;
	iopar)
		run_iopar $ODIR $CONFIG $ODIRECT $IOD &> $SUBMIT_OUTPUT
		;;
	libsio2aio)
		run_libsio2aio $ODIR $CONFIG $ODIRECT $IOD &> $SUBMIT_OUTPUT
		;;
	inter)
		run_inter $ODIR $CONFIG $ODIRECT $IOD &> $SUBMIT_OUTPUT
		;;
	both)
		run_both $ODIR $CONFIG $ODIRECT $IOD &> $SUBMIT_OUTPUT
		;;
	esac
}



##################################################################
############################# MAIN ###############################
##################################################################


ODIR=$1

if [ -z $ODIR ]; then
	echo "WARNING: Run this script throught run_supersubmit.sh to safely store the logs in the output folder"
	TS=$(date +"%Y%m%d-%H%M%S")
	ODIR=$PWD/test-$TS
	mkdir -p $ODIR
fi

TS_START=$(date +%s.%N)


rm -rf $BSC_SCRATCH_HOME
mkdir -p $BSC_SCRATCH_HOME

for ID in $SUB_IDS; do
	IDDIR=$ODIR/$ID
	mkdir $IDDIR

	for NC in $NODE_CONFIG; do
		NC=(${NC//:/ })
		NODES=${NC[0]}
		TASK_PER_NODE=${NC[1]}
		CPUS_PER_TASK=${NC[2]}

		for O_D in $ODIRECT; do
			I=0
			for IOD in $IODIRS; do
				CONFIG=${ID}_${NODES}_${TASK_PER_NODE}_${CPUS_PER_TASK}_${ODIRECT_ID[O_D]}_${IODIRS_ID[I]}
				CNFDIR=$IDDIR/$CONFIG

				if [[ ${IODIRS_ID[I]} != "gpfs" ]] || [[ ${ODIRECT_ID[O_D]} != "odirect" ]]; then
					mkdir $CNFDIR
					mkdir $CNFDIR/scripts
					echo " - Executing: $CONFIG"

					for R in `seq 1 $REP`; do
						TS=$(date +"%Y/%m/%d-%H:%M:%S")
						echo "      - Repetition $R started at $TS"
						run "$CNFDIR" "$ID" "$CONFIG" "$O_D" "$IOD" "$R"
						sleep 5
					done
				fi
				I=$((I+1))
			done
		done
	done
done

TS_END=$(date +%s.%N)
DIFF=$(echo "($TS_END - $TS_START)/60" | bc)

echo
echo "Total execution time: $DIFF minutes"


