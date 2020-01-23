#!/usr/bin/bash

PID=$1

awk '
BEGIN {
	tmp_size = -1
}

$1 == "Size:" {
	tmp_size = $2
	next
}

$1 == "KernelPageSize:" {
	if (tmp_size == -1) {
		print "ERROR: vma without proper size found" > /dev/stderr
		exit
	}

	page_size = $2
	vmas[page_size]["count"] += 1
	vmas[page_size]["pages"] += tmp_size/page_size

	tmp_size = -1
	next
}

END {
	for (key in vmas) {
		print(key " KiB VMAs: " vmas[key]["count"])
	}
	for (key in vmas) {
		print(key " KiB num pages: " vmas[key]["pages"])
	}
}

' /proc/$PID/smaps
