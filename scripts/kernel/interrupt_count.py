#!/usr/bin/env python
import argparse
import pandas as pd
import os

def read_interrupts():
	with open('/proc/interrupts') as f:
		header = next(f).split()
		ncores = len(header)
		header.append("Description")
		df = pd.DataFrame(columns=header)
		for line in f:
			tmp = line.split()
			if len(tmp) < ncores + 2:
				tmp2 = [ (tmp[i] if i < len(tmp) else None) for i in range(0, len(header))]
				tmp = tmp2
			index = tmp[0]
			intr = [int(x) if x != None else None for x in tmp[1:ncores+1] ]
			dscr = [" ".join(tmp[ncores+1:])]
			row = intr + dscr
			df.loc[index] = row
	return df

def count_interrupts_per_core(df):
	ncores = len(df.columns) - 1
	return df.iloc[:, :ncores].sum()

def sub_intr(before, after):
	ncores = len(before.columns) - 1
	df = after.iloc[:, :ncores] - before.iloc[:, :ncores]
	df["Description"] = before["Description"]
	return df


parser = argparse.ArgumentParser(description="Hardware interrupts helper command.")
parser.add_argument("cmd", nargs='*', default=None, help='Run command and return the interrupts fired while executing it.')
parser.add_argument('-c', '--count', action="store_true", help='Only show per core interrupt count.')
parser.add_argument('-t', '--type', action="store_true", help='Only show per-core interrupts by type.')
args = parser.parse_args()


# by default show both count and type
show_count = True
show_type  = True
if not args.count and not args.type:
	pass
elif args.count:
	show_type = False
elif args.type:
	show_count = False


# read interrupts based on user arguments
df = None
if not args.cmd:
	df = read_interrupts()
else:
	intr_before = read_interrupts()
	os.system(" ".join(args.cmd))
	intr_after = read_interrupts()
	df = sub_intr(intr_before, intr_after)

# display interrupts
if show_type:
	print(df.to_string())
if show_count:
	intr_per_core = count_interrupts_per_core(df)
	print("Interrupt count per core")
	print(intr_per_core.to_string())
