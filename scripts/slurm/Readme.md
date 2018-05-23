This scripts run jobs on slurm and parse the results. submitron.sh runs tests
in individual jobs, supersubmit.sh runs multiple tests in a single job. Each
test is composed of a certain configuration that it is specific to the
applications run. Check the scripts to see which paramters can be configured by
default (such as the distribution of nodes). Other parameters might need to be
added or removed or modified depending on the application (just take a look at
the scripts, they are easy to read).

Each test must write the result that has to be parsed with the label "PARSEME:
number" where number is the result to be parsed. Then, parsetron.sh scans the
directory created by either supersubmit or submitron and creates a "results"
file containing the mean and standard deviation of both the value in PARSEME
and the memory usage of the application obtained with /usr/bin/time -v.

Parsetron will print a (4/5)! if enconuntered some repetition of a test has
failed. The pharentesis report the number of tests that have finished correctly.
If parsetron reports (5/5)! (all tests ok), means that the PARSEME: line was
present in all outputs (assuming that the application did what it had to do)
but the return status of the command was non-zero, this might require human
interventino to figure out what happened (in slurm, when the limit of the page
cache is hit, it is considered a problem and the return status complains.
However this is not actually an error but a warning. This might be already 
solved, so just take it into consideration).
