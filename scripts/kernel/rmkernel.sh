#!/bin/bash


#######################################################################
########################## FUNCTIONS ##################################
#######################################################################

usage() {
	echo "rmkernel.sh [-f] kernelversion"
	echo "  -f: remove files even if not all of them are found"
}

abort() {
	(>&2 cat $LOG)
	echo "temporal files located at $TMP"
	exit 1
}

restore() {
	BKP=$1

	if [ -f $TMP/$BKP ]; then
		mv $TMP/$BKP $KINSTALL
		if [ $? -ne 0 ]; then
			ERR="Fatal error restoring $TMP/$KBKP, this system version might be corrupted\n"
			echo -e $ERR >> $LOG
			abort
		fi
	fi
}

#######################################################################
########################## ARGUMENT PARSING ###########################
#######################################################################

DO_FORCE=false
while getopts "f" o; do
	case "${o}" in
		f)
			DO_FORCE=true
			;;
		\?)
			echo "option not recognized"
			usage
			exit 1
			;;
	esac
done

shift $( expr $OPTIND - 1 )
if [ $# -ne 1 ]; then
	usage
	exit 1
fi

KVER=$1
KMAP=System.map-$KVER
KINITRAM=initramfs-$KVER.img
KIMG=vmlinuz-$KVER
KINSTALL=/boot
TMP=`mktemp -d`
LOG=`mktemp`

#######################################################################
############################### MAIN ##################################
#######################################################################

# check for temporal directory
if [ ! -d $TMP ]; then
	ERR="Error: creating temporal directory\n"
	echo -e $ERR >> $LOG
	abort
fi

# check for kernel components existance

if [ ! -f $KINSTALL/$KMAP ] || [ ! -f $KINSTALL/$KINITRAM ] ||
   [ ! -f $KINSTALL/$KIMG ] || [ ! -d /lib/modules/$KVER ]
then

	[ ! -f $KINSTALL/$KMAP ];     TKMAP=$?
	[ ! -f $KINSTALL/$KINITRAM ]; TINITRAM=$?
	[ ! -f $KINSTALL/$KIMG ];     TKIMG=$?
	[ ! -d /lib/modules/$KVER ];  TMOD=$?

	ERR="WARNING: not all kernel components exist\n"
	ERR="$ERR$KINSTALL/$KMAP: $TKMAP\n"
	ERR="$ERR$KINSTALL/$KINITRAM: $TINITRAM\n"
	ERR="$ERR$KINSTALL/$KIMG: $TKIMG\n"
	ERR="$ERR/lib/modules/$KVER: $TMOD\n"
	echo -e $ERR >> $LOG
	if [ "$DO_FORCE" == false ]; then
		abort
	fi
fi

# uninstall kernel System.map file
if [ -f $KINSTALL/$KMAP ]; then
	mv $KINSTALL/$KMAP $TMP
	if [ $? -ne 0 ]; then
		ERR="Error: moving $KINSTALL/$KMAP, aborting\n"
		echo -e $ERR >> $LOG
		abort
	fi

	# warn if System.map symlink is broken
	SYSMAPLINK=`readlink $KINSTALL/System.map`
	if [ $? -eq 0 ]; then
		if [ "$SYSMAPLINK" == "$KINSTALL/$KMAP" ]; then
			WRN="WARNING: System.map link broken\n"
			echo -e $WRN >> $LOG
		fi
	fi
fi

# uninstall kernel initramfs image
if [ -f $KINSTALL/$KINITRAM ]; then
	mv $KINSTALL/$KINITRAM $TMP
	if [ $? -ne 0 ]; then
		ERR="Error: moving $KINSTALL/$KINITRAM, aborting\n"
		echo -e $ERR >> $LOG
		restore $KMAP
		abort
	fi
fi

# uninstall kernel vmlinuz image
if [ -f $KINSTALL/$KIMG ]; then
	mv $KINSTALL/$KIMG $TMP
	if [ $? -ne 0 ]; then
		ERR="Error: moving $KINSTALL/$KIMG, aborting\n"
		echo -e $ERR >> $LOG
		restore $KINITRAM
		restore $KMAP
		abort
	fi
fi

# remove modules
if [ -d /lib/modules/$KVER ]; then
	mv /lib/modules/$KVER $TMP/
	if [ $? -ne 0 ]; then
		ERR="Error: moving /lib/modules/$KVER, aborting\n"
		echo -e $ERR >> $LOG
		restore $KIMG
		restore $KINITRAM
		restore $KMAP
		abort
	fi
fi

# update grub
GRUBCFG=/boot/grub/grub.cfg
if [ -f $GRUBCFG ]; then
	grub-mkconfig -o $GRUBCFG
	if [ $? -ne 0 ]; then
		WRN="WARNING: grub update failed\n"
		echo -e $WRN >> $LOG
	fi
else
		WRN="WARNING: grub config file not found. grub update aborted\n"
		echo -e $WRN >> $LOG
fi

# delete backup files
#rm $TMP/$KMAP
#rm $TMP/$KINITRAM
#rm $TMP/$KIMG
#rm -r $TMP/$KVER

(>&2 cat $LOG)
rm $LOG
