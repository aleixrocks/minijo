#! /usr/bin/env python
import pickle
import socket
import threading
import sys
from time import sleep
from std_discovery_receiver import discover



########################################################
###################### VARIABLES #######################
########################################################

PORT = 5234
PORT_DISCOVERY = 5235

########################################################
###################### FUNCTIONS #######################
########################################################

def listen(port):
	"Creates UPD listening socket at the given port. If bounding fails \
	retry automatically"

	print 'Bounding process to port', port
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

	bounded = False
	while not bounded:
		try:
			s.bind(('', port))
		except Exception as e:
			print  " -", e, "[Retrying to bind]"
			sleep(15)
		else:
			print "  * Bounded"
			bounded = True

	return s

def disconnect(s):
	"Close socket"
	s.close()

def init_udp_socket():
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	return s

def start_discovery_daemon(PORT):
	"Main function which initiates the discovery daemon"
	d = threading.Thread(target=discovery_daemon, args=(PORT, ))
	d.setDaemon(True) # It will kill the threads when de main procees dies
	d.start()

def discovery_daemon(PORT):
	"Threaded function which serves petitions \
	asking for visibility of the CPGV application"
	discover(PORT)


########################################################
######################   MAIN   ########################
########################################################

print 'Welcome ladies and gentelment to the standard reciver circus!'

s_reply = init_udp_socket()
s = listen(PORT)
start_discovery_daemon(PORT_DISCOVERY)

while True:
	try:
		data, addr = s.recvfrom(512)
		s_reply.sendto('OK', (addr[0], PORT))
	except Exception as e:
		print " - Exception while sending/reciving:", e
		sleep(30)
		disconnect(s)
		s = listen(PORT)
	else:
		if data != '':
			try:
				t = pickle.loads(data)
			except Exception as e:
				print " - Exception while unpacking data:", e, "[Ignoring \
				packet]"
			else:
				print "***", t

