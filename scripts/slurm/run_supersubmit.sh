#!/bin/bash

TS=$(date +"%Y%m%d-%H%M%S")
ODIR=$PWD/test-$TS
SLURM_OUT=$ODIR/slurm-%A
mkdir -p $ODIR

sbatch --output=$SLURM_OUT ./supersubmit.sh $ODIR
