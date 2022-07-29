
#useFramePointers() {
#	echo "I'm the setup hook!"
#	export NIX_CFLAGS_COMPILE="-fno-omit-frame-pointer -xdlkfhskjdfhds"$NIX_CFLAGS_COMPILE
#}
#
#postHooks+=(useFramePointers)
echo "@@@@@@@@@@@@@@@@@I'm the setup hook!@@@@@@@@@@@@@@@@@"
export NIX_CFLAGS_COMPILE="-fno-omit-frame-pointer "$NIX_CFLAGS_COMPILE
