 After a fork, where exactly does the child's execution start?
 =============================================================

 The following answer is the same whether the invoked system call is fork,
 vfork, or clone.

 The magic of forking is that the child is a copy of the parent, with both
 returning from the system call executing the same code, differing only in
 return value: the child's PID to the parent, zero to the child. How does that
 work?

 The fork system call invokes do_fork, which performs error checking and initial
 setup for the fork.  do_fork calls copy_process, which does the heavy-lifting
 of copying the invoking process's kernel state and resources. State that is not
 copied, such as various process statistics, is set to zero.

 copy_process calls copy_thread, which is architecture-specific code to copy the
 process's execution state: registers, instruction pointer, stack setup, and so
 on.

 copy_thread pulls two tricks. The exact tricks depend on the architecture, but
 the intent is the same. On x86-32, it overwrites the EAX register with zero and
 it sets the instruction pointer to an assembly function named ret_from_fork.

 Back in do_fork, the child is woken up, becoming schedulable.
 do_fork returns the child's PID.

 When the child is run, it then looks just like the parent, but with two crucial
 details: The register holding the return value for the system call is zero and
 its instruction pointer is set to ret_from_fork. So instead of jumping back to
 do_fork, it jumps to ret_from_fork.

 ret_from_fork does some cleanup via schedule_tail and then exits to user-space.
 With a zero in EAX, user-space will see a zero as the return value from the
 system call. Voila.

 To answer your question succinctly: for x86-32, ret_from_fork in
 arch/x86/kernel/entry_32.S.

