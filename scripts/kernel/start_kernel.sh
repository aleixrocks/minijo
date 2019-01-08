#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


SESSION=kernel

#eudyptula
#BDIR="$HOME/projects/kernel/eudyptula"
#KDIR="$BDIR/kernel/linux"
#CDIR="$BDIR/code/tasks"

BDIR="$HOME/projects/kernel/bpi-w2"
KDIR="$BDIR/my_sdk/kernel/vanilla/linux"
CDIR="$BDIR/my_sdk"
UDIR="$CDIR/u-boot-rt/src"
RDIR="$CDIR/rootfs/busybox"

rbash() {
	CMD=$1
	echo 'exec bash --init-file <(echo "source '$HOME'/.bashrc; '"$CMD"'")'
}

cd $KDIR

# kernel window
tmux new-session -d -s $SESSION -n 'kernel' "`rbash "cd $KDIR; vim -S"`"
tmux split-window -t "$SESSION:kernel.0" -h 'exec bash'
tmux split-window -t "$SESSION:kernel.1" -v "`rbash "cd $CDIR"`"

# u-boot window
tmux new-window -n 'u-boot' "`rbash "cd $UDIR; vim -S"`"
tmux split-window -t "$SESSION:u-boot.0" -h "`rbash "if [ -c /dev/ttyUSB0 ]; then picocom -b 112500 /dev/ttyUSB0; else cd $UDIR; fi"`"
tmux split-window -t "$SESSION:u-boot.1" -v "`rbash "cd $UDIR"`"

# rootfs window
tmux new-window -n 'rootfs' "`rbash "cd $RDIR; vim -S"`"
tmux split-window -t "$SESSION:rootfs.0" -h "`rbash "cd $RDIR"`"
tmux split-window -t "$SESSION:rootfs.1" -v "`rbash "cd $RDIR"`"

# select kernel window by default
tmux select-window -t "$SESSION:kernel"

tmux -2 attach-session -t $SESSION
