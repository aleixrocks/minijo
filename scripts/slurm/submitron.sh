#!/bin/bash


##################################################################
######################### CONFIGURATION ##########################
##################################################################

BSC_SCRATCH_HOME='/gpfs/scratch/bsc15/bsc15182/fwi'
IODIRS_ID=("local" "gpfs")    # Pretty name for I/O directories
ODIRECT_ID=("none" "odirect") # Pretty name for O_DIRECT


# Two nodes full
#TIME=00:50:00
#REP=10
#QUEUE=bsc_cs
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS='${TMPDIR} '$BSC_SCRATCH_HOME/'$SLURM_JOB_ID'
#ODIRECT="1 0"

# Two nodes partial
#TIME=00:50:00
#REP=5
#QUEUE=bsc_cs
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS='${TMPDIR} '$BSC_SCRATCH_HOME/'$SLURM_JOB_ID'
#ODIRECT="1 0"

# Two nodes debug
TIME=00:30:00
REP=1
QUEUE=debug
SUB_IDS="ioseq"
NODE_CONFIG="2:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
IODIRS=$BSC_SCRATCH_HOME/'$SLURM_JOB_ID'
ODIRECT="1"



# One node full
#TIME=00:30:00
#REP=10
#QUEUE=debug
#SUB_IDS="ioseq libsio2aio inter both"
#NODE_CONFIG="1:2:24 1:48:1" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
#IODIRS='${TMPDIR} '$BSC_SCRATCH_HOME/'$SLURM_JOB_ID'
#ODIRECT="1 0"

# one node debug
# TIME=00:20:00
# REP=1
# QUEUE=debug
# SUB_IDS="ioseq"
# NODE_CONFIG="1:2:24" # NODE_CONFIG = NODE:TASK_PER_NODE:CPUS_PER_TASK
# IODIRS='${TMPDIR}'
# ODIRECT="1"


ulimit -c unlimited

##################################################################
###################### SUBMISSION SCRIPTS ########################
##################################################################



function build_submit_ioseq() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4
	local R=$5

	local SUBMIT_OUTPUT=$ODIR/slurm-$R

	local SUB='#!/bin/bash
#SBATCH --qos='$QUEUE'
#SBATCH --time='$TIME'
#SBATCH -D .
#SBATCH --nodes='$NODES'
#SBATCH --tasks-per-node='$TASK_PER_NODE'
#SBATCH --cpus-per-task='$CPUS_PER_TASK'
#SBATCH --job-name=fwi-mpi
#SBATCH --output='$SUBMIT_OUTPUT'

JOBID=$SLURM_JOB_ID
FWI_PARAMS=../SetupParams/fwi_params.txt
FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$JOBID
TIME="/usr/bin/time -v"

echo "JOB_CONFIG:'$JOB_CONFIG'"
df -h
cp $FWI_PARAMS $FWI_JOB_PARAMS
sed -i "s~.*Results.*~'$RESULTS_DIR'/Results~" $FWI_JOB_PARAMS
CMD="./fwi.ioseq $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt '$ODIRECT'"

srun $TIME $CMD
STATUS=$?
if [ $STATUS -ne 0 ]; then
	echo "JOB_ERROR:$STATUS"
fi

rm $FWI_JOB_PARAMS
rm -r '$RESULTS_DIR'/Results'

	echo -e "$SUB"
}


function build_submit_libsio2aio() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4
	local R=$5

	local SUBMIT_OUTPUT=$ODIR/slurm-$R

	local SUB='#!/bin/bash
#SBATCH --qos='$QUEUE'
#SBATCH --time='$TIME'
#SBATCH -D .
#SBATCH --nodes='$NODES'
#SBATCH --tasks-per-node='$TASK_PER_NODE'
#SBATCH --cpus-per-task='$CPUS_PER_TASK'
#SBATCH --job-name=fwi-mpi
#SBATCH --output='$SUBMIT_OUTPUT'

JOBID=$SLURM_JOB_ID
FWI_PARAMS=../SetupParams/fwi_params.txt
FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$JOBID
LIBSIO2AIO_INSTALL=/gpfs/projects/bsc15/bsc15182/libsio2aio
TIME="/usr/bin/time -v"

echo "JOB_CONFIG:'$JOB_CONFIG'"
df -h
cp $FWI_PARAMS $FWI_JOB_PARAMS
sed -i "s~.*Results.*~'$RESULTS_DIR'/Results~" $FWI_JOB_PARAMS
CMD="./fwi.ls2a $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt '$ODIRECT'"

LD_LIBRARY_PATH=$LIBSIO2AIO_INSTALL/obj srun $TIME $CMD
STATUS=$?
if [ $STATUS -ne 0 ]; then
	echo "JOB_ERROR:$STATUS"
fi

rm $FWI_JOB_PARAMS
rm -r '$RESULTS_DIR'/Results'

	echo -e "$SUB"
}

function build_submit_inter() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4
	local R=$5

	local SUBMIT_OUTPUT=$ODIR/slurm-$R

	local SUB='#!/bin/bash
#SBATCH --qos='$QUEUE'
#SBATCH --time='$TIME'
#SBATCH -D .
#SBATCH --nodes='$NODES'
#SBATCH --tasks-per-node='$TASK_PER_NODE'
#SBATCH --cpus-per-task='$CPUS_PER_TASK'
#SBATCH --job-name=fwi-mpi
#SBATCH --output='$SUBMIT_OUTPUT'

JOBID=$SLURM_JOB_ID
FWI_PARAMS=../SetupParams/fwi_params.txt
FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$JOBID
MPIINTER_INSTALL=/gpfs/projects/bsc15/bsc15182/mpi_inter/install
TIME="/usr/bin/time -v"

echo "JOB_CONFIG:'$JOB_CONFIG'"
df -h
cp $FWI_PARAMS $FWI_JOB_PARAMS
sed -i "s~.*Results.*~'$RESULTS_DIR'/Results~" $FWI_JOB_PARAMS
CMD="./fwi.intr $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt '$ODIRECT'"

LD_LIBRARY_PATH=$MPIINTER_INSTALL/lib:$LD_LIBRARY_PATH srun $TIME $CMD
STATUS=$?
if [ $STATUS -ne 0 ]; then
	echo "JOB_ERROR:$STATUS"
fi

rm $FWI_JOB_PARAMS
rm -r '$RESULTS_DIR'/Results'

	echo -e "$SUB"
}

function build_submit_both() {
	local ODIR=$1
	local JOB_CONFIG=$2
	local ODIRECT=$3
	local RESULTS_DIR=$4
	local R=$5

	local SUBMIT_OUTPUT=$ODIR/slurm-$R

	local SUB='#!/bin/bash
#SBATCH --qos=debug
#SBATCH --time='$TIME'
#SBATCH -D .
#SBATCH --nodes='$NODES'
#SBATCH --tasks-per-node='$TASK_PER_NODE'
#SBATCH --cpus-per-task='$CPUS_PER_TASK'
#SBATCH --job-name=fwi-mpi
#SBATCH --output='$SUBMIT_OUTPUT'

JOBID=$SLURM_JOB_ID
FWI_PARAMS=../SetupParams/fwi_params.txt
FWI_JOB_PARAMS=../SetupParams/fwi_params.txt.$JOBID
MPIINTER_INSTALL=/gpfs/projects/bsc15/bsc15182/mpi_inter/install
LIBSIO2AIO_INSTALL=/gpfs/projects/bsc15/bsc15182/libsio2aio
TIME="/usr/bin/time -v"

echo "JOB_CONFIG:'$JOB_CONFIG'"
df -h
cp $FWI_PARAMS $FWI_JOB_PARAMS
sed -i "s~.*Results.*~'$RESULTS_DIR'/Results~" $FWI_JOB_PARAMS
CMD="./fwi.both $FWI_JOB_PARAMS ../SetupParams/fwi_frequencies.txt '$ODIRECT'"

LD_LIBRARY_PATH=$MPIINTER_INSTALL/lib:$LIBSIO2AIO_INSTALL/obj:$LD_LIBRARY_PATH srun $TIME $CMD
STATUS=$?
if [ $STATUS -ne 0 ]; then
	echo "JOB_ERROR:$STATUS"
fi

rm $FWI_JOB_PARAMS
rm -r '$RESULTS_DIR'/Results'

	echo -e "$SUB"
}


##################################################################
########################## FUNCTIONS #############################
##################################################################



function submit() {
	local ODIR="$1"
	local ID="$2"
	local CONFIG="$3"
	local ODIRECT="$4"
	local IOD="$5"
	local R="$6"

	case $ID in
	ioseq)
		SCRIPT=$(build_submit_ioseq $ODIR $CONFIG $ODIRECT $IOD $R)
		;;
	libsio2aio)
		SCRIPT=$(build_submit_libsio2aio $ODIR $CONFIG $ODIRECT $IOD $R)
		;;
	inter)
		SCRIPT=$(build_submit_inter $ODIR $CONFIG $ODIRECT $IOD $R)
		;;
	both)
		SCRIPT=$(build_submit_both $ODIR $CONFIG $ODIRECT $IOD $R)
		;;
	esac

	local SCRNAME=$ODIR/scripts/$CONFIG.sh
	echo -e "$SCRIPT" > $SCRNAME

	sbatch $SCRNAME
}



##################################################################
############################# MAIN ###############################
##################################################################

TS=$(date +"%Y%m%d-%H%M%S")
ODIR=$PWD/test-$TS


echo "WARNING@!!!!!! SKipping odirect & gpfs"

mkdir -p $ODIR
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

					for R in `seq 1 $REP`; do
						submit "$CNFDIR" "$ID" "$CONFIG" "$O_D" "$IOD" "$R"
					done
				fi
				I=$((I+1))
			done
		done
	done
done
