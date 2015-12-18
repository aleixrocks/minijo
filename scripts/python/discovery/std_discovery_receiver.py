#! /usr/bin/env python
import socket
from time import sleep

def init_listen_socket(port):
	"Creates a listening UDP socket on the given port"
	print 'Discovery: Binding process to port', port

	l = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	
	bounded = False
	while not bounded:
		try:
			l.bind(('',port));
		except Exception as e:
			print ' -', e, '[Retrying]'
			sleep(10)
		else:
			print ' * Bounded'
			bounded = True

	return l

def init_udp_socket():
	"Creates an UDP socket"
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	return s

def send_udp(s, host, port):
	"Send answer protocol discovery over UDP port"
	s.sendto('CPGV-OK', (host, port))


def discover(port):
	"Listens for beacons for the CPGV discovery protocol, and answer them"
	l = init_listen_socket(port)
	s = init_udp_socket()

	while True:
		data, addr = l.recvfrom(1024)
		if data == 'CPGV-discovery':
			send_udp(s, addr[0], port)
			print 'Discovery: Response sended to', addr[0]
