#!/usr/bin/env bash


qemu-system-x86_64 \
	-bios ./OVMF.fd \
	-enable-kvm \
	-nographic \
	-m 32G \
	-smp 56 \
	-virtfs local,path=./../,mount_tag=host0,security_model=none,id=host0 \
	-net nic -net user,hostfwd=tcp::2222-:22 \
	-hda ./image
