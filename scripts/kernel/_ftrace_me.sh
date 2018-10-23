#!/bin/bash
DEBUGFS=`grep debugfs /proc/mounts | awk '{ print $2; }'`
PID=$$


sudo bash -c "echo nop > $DEBUGFS/tracing/current_tracer;            \
              echo 0 > $DEBUGFS/tracing/tracing_on;                  \
              echo $PID > $DEBUGFS/tracing/set_ftrace_pid;           \
              echo function_graph > $DEBUGFS/tracing/current_tracer; \
              echo 1 > $DEBUGFS/tracing/tracing_on;"

exec "$@" #morph into process to keep the current tid
