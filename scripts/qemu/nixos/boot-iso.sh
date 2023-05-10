#!/usr/bin/env bash

qemu-system-x86_64 \
	-cdrom ./nixos-minimal-22.11.3160.c4aec3c0216-x86_64-linux.iso \
	-boot d \
	-hda ./image \
	-m 2048 \
	-nographic \
	-enable-kvm

