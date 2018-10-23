#!/bin/bash

DEBUGFS=`grep debugfs /proc/mounts | awk '{ print $2; }'`

_ftrace_me.sh "$@" &
PID=$!
wait $PID

sudo bash -c "cp $DEBUGFS/tracing/trace  ./trace;         \
              echo nop > $DEBUGFS/tracing/current_tracer; \
              echo 0 > $DEBUGFS/tracing/tracing_on;"#       \
              #echo -1 > $DEBUGFS/tracing/set_ftrace_pid;"
