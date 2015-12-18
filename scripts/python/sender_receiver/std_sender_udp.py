#! /usr/bin/env python
import pickle
import socket
from time import sleep
from cmusphinx_reader import read
#from julius_reader import read

def init_udp_socket():
	"Creates udp socket"
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	return s

def disconnect(s):
	"Close socket"
	s.close()

def send(s, packet, host, port):
	"pickle and send packet over socket s to host and port"
	packet = pickle.dumps(packet);
	s.sendto(packet, (host, port))
	




HOST="192.168.1.94"
PORT=5234
s = init_udp_socket()

while True:
	print 'Waiting input...'
	result = read()
	print 'Input recived'
	try:
		send(s, result, HOST, PORT);
	except Exception as e:
		print "Excpetion while sending:", e
		disconnect(s)
		s = connect()
