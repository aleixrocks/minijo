# this script is application specific. It is intened
# to plot an x y columns with data to be plotted with
# gnuplot

BEGIN {
	NT=2; 
}
/Time:/ {
	print NT " " $2; 
	NT=NT+2
}

END {
	#print "e"
}
