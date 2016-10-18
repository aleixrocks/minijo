 - By default, make executes the first rule it find on the makefile
 - include PATH_TO_MAKFILE includes the makefile into this makefile
 - target : prerequisite1 prerequisite2 ... ; command
        
     - all: pipas pal pajaro ; echo "eeeeiiiis"
         - after the ; we can specify a command (is the same as writing the
           command on a new line and tab it)
         - to avoid printing "echo eeeeiiiiss" we can put @ in front of echo
         - $@ prints the name of the target
         - The target can be just a string, or can be a path to a file. 
           If the target name is /home/aleix/target.txt make won't execute 
           the rule if the file existes (and all prerequisites are up to date).
           If our target name is an arbitrary name wich we know that never
           will be a path to a file, it will execute always.
           Unsing the variable .PHONY we can specify the target names that
           will execute even if the file wich corresponds to the target name
           exists, so it wil always be considered as a "string"
     - /home/aleix/target: ; @touch $@
         - this will exectue only once. After the firs execution 
           /home/aleix/target will exists (touch $@) and make would avoid 
           further executions of the rule.
 - make V=1 -> show exactly the commands used.
