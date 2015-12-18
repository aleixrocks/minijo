#! /usr/bin/env python
import pickle
import socket
from time import sleep
from cmusphinx_reader import read
#from julius_reader import read

def connect(host, port):
	"Connect the specific port of the given host. Will retry if nos posible \
	to connect."
	connected=False
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	while not connected:
		try:
			s.connect((host, port))
		except Exception as e:
			print " - ERROR connecting:", e
			sleep(15)
		else:
			connected=True;
	print " * Connected"
	return s

def disconnect(s):
	"Close socket"
	s.close()

def send(s, packet):
	"pickle and send packet over socket s"
	packet = pickle.dumps(packet);
	s.send(packet)
	




HOST="192.168.1.94"
PORT=6660
s = connect(HOST, PORT)

while True:
	print 'Waiting input...'
	result = read()
	print 'Input recived'
	try:
		send(s, result);
	except Exception as e:
		print "Excpetion while sending:", e
		disconnect(s)
		s = connect(HOST, PORT)
