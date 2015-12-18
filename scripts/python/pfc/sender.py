#! /usr/bin/env python
import pickle
import socket
import signal
import sys
import threading
from time import sleep
from cmusphinx_reader import read
from std_discovery_sender import discover
#from julius_reader import read


###################################################
################## VARIABLES ######################
###################################################

PORT=5234
PORT_DISCOVERY=5235

###################################################
################## FUNCTIONS ######################
###################################################

def init_udp_socket():
	"Creates udp socket"
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	return s

def find_ip(PORT):
	"Starts discovery protocol and find an IP"
	print 'Starting discovery protocol'
	HOST = discover(PORT)
	print 'IP Found:', HOST
	return HOST

def disconnect(s):
	"Close socket"
	s.close()

def send(s, packet, host, port):
	"pickle and send packet over socket s to host and port"
	packet = pickle.dumps(packet);
	s.sendto(packet, (host, port))

def signal_handler(signal, frame):
	"Signal SIGTERM handler"
	print 'Closing aplication!'
	sys.exit(0)

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

def autoreply_daemon(PORT):
	"Autoreply daemon to keep track of listener responses"
	global sended
	l = listen(PORT)

	while True:
		try:
			data, addr = l.recvfrom(1024)
		except Exception as e:
			print "Exception while listening", e
			disconnect(l)
			sleep(15)
			l = listen(PORT)
		else:
			if data=="OK":
				print "- Response recived"
				sended = sended - 1

def start_autoreply_daemon(PORT):
	"Starts autoreply daemon to keep track of listener responses"
	d = threading.Thread(target=autoreply_daemon, args=(PORT, ))
	d.setDaemon(True)
	d.start()

###################################################
##################   MAIN   #######################
###################################################

# Registering signal ctrl + c
signal.signal(signal.SIGINT, signal_handler)

# Start autoreply daemon
start_autoreply_daemon(PORT)

# finding IP and crates socket
HOST = find_ip(PORT_DISCOVERY)
s = init_udp_socket()

sended = 0
error_counter = 0
while True:
	print 'Waiting input...'
	result = read()
	print 'Input recived'
	try:
		print ' - Sending'
		send(s, result, HOST, PORT);
	except Exception as e:
		print "Exception while sending:", e
		error_counter += 1
		# If we can't send after 10 attempts, find new ip
		if error_counter > 3:
			HOST = find_ip(PORT_DISCOVERY)
			error_counter = 0
	else:
		print ' - Sended'
		error_counter = 0
		sended = sended + 1	
		# if more than 3 messages has been send without receiving OK
		# find a new IP.
		if sended > 3:
			sended = 0
			HOST = find_ip(PORT_DISCOVERY)
