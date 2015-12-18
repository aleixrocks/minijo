#! /usr/bin/env python
import socket
from time import sleep


def init_listen_socket(port):
	"Creates a socket to listen on the given port from any ip address \
	with a timout counter"
	print 'Bounding discovery port'
	
	l = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

	bounded = False
	while not bounded:
		try:
			l.bind(('',port))
		except Exception as e:
			print ' -', e, '[Retrying to bind]'
			sleep(10)
		else: 
			print ' * Bounded'
			bounded = True

	l.settimeout(30)
	return l

def init_broadcast_socket():
	"Creates a socket to broadcast packets"
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	s.bind(('', 0))
	s.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
	return s

def send_broadcast(s, port):
	"Send a broadcast message using a broadcast socket"
	# Warning: Windows don't like '<broadcast>'. Won't send
	# the packet unless local broadcast address is given,
	# such as: 192.168.1.255. It's tricky to get that in python.
	s.sendto('CPGV-discovery', ('<broadcast>',port))

def listen_broadcast(l):
	"Listens for a confirmation message. This wile will end when \
	return or time out exception"
	while True:
		data, addr = l.recvfrom(1024)
		if data == "CPGV-OK":
			return addr


def discover(port):
	"Find a device listening to the given port for the CPGV app and \
	returns its listening address"
	l = init_listen_socket(port)
	s = init_broadcast_socket()

	found = False
	while not found:
		send_broadcast(s, port)
		try:
			addr = listen_broadcast(l)
		except:
			print 'Discovery: No clients found. Sending requests again'
		else:
			found = True
	
	l.close()
	s.close()				
	return  addr[0]
