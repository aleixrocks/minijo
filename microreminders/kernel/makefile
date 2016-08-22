Beautify output

 Normally, we echo the whole command before executing it. By making
 that echo $($(quiet)$(cmd)), we now have the possibility to set
 $(quiet) to choose other forms of output instead, e.g.

         quiet_cmd_cc_o_c = Compiling $(RELDIR)/$@
         cmd_cc_o_c       = $(CC) $(c_flags) -c -o $@ $<

 If $(quiet) is empty, the whole command will be printed.
 If it is set to "quiet_", only the short version will be printed.
 If it is set to "silent_", nothing will be printed at all, since
 the variable $(silent_cmd_cc_o_c) doesn't exist.

 A simple variant is to prefix commands with $(Q) - that's useful
 for commands that shall be hidden in non-verbose mode.

      $(Q)ln $@ :<

 If KBUILD_VERBOSE equals 0 then the above command will be hidden.
 If KBUILD_VERBOSE equals 1 then the above command is displayed.

