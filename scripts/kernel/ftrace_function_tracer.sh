#!/bin/bash

DBG=/sys/kernel/debug/tracing/
sudo bash -c "echo nop > $DBG/current_tracer; echo 1 > $DBG/function_profile_enabled"
sudo bash -c "echo 0 > $DBG/options/graph-time" # Account for funtions individuall, not its children.
#sudo bash -c "echo 0 > $DBG/options/sleep-time" # Ignore the time the task was scheduled out
#PID=$$ sudo bash -c "echo $PID > $DBG/tracing/set_ftrace_pid" # Only trace current process

$@

sudo bash -c "echo 0 > $DBG/function_profile_enabled"
#sudo bash -c "cat $DBG/trace_stat/function0 > ./trace" # see the trace



# less $DBG/trace_stat/function0 # see the trace
