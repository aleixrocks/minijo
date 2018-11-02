#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


SESSION=kernel

#eudyptula
#BDIR="$HOME/projects/kernel/eudyptula"
#KDIR="$BDIR/kernel/linux"
#CDIR="$BDIR/code/tasks"

BDIR="$HOME/projects/kernel/kernel"
KDIR="$BDIR/kernel/linux"
CDIR="$BDIR/code"

cd $KDIR
tmux new-session -d -s $SESSION -n 'kernel' 'exec bash --init-file <(echo "source '$HOME'/.bashrc; vim -S")'
tmux split-window -t "$SESSION:kernel.0" -h 'exec bash'
tmux split-window -t "$SESSION:kernel.1" -v 'exec bash --init-file <(echo "source '$HOME'/.bashrc; cd '$CDIR'")'

tmux -2 attach-session -t $SESSION
