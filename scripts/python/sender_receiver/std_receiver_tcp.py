#! /usr/bin/env python
import pickle
import socket
from time import sleep


def listen(port):
	"Creates TCP listening socket at the given port. If conection fails \
	retry automatically"
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

	bounded = False
	while not bounded:
		try:
			s.bind(('', port))
			s.listen(1)
			conn, addr = s.accept()
		except Exception as e:
			print "Exception raised while listening", e, "retrying..."
			sleep(15)
		else:
			print "  * Connected"
			bounded = True

	return conn

def disconnect(s):
	"Close socket"
	s.close()



print 'Welcome ladies and gentelment to the stadard reciever circus!'
PORT = 6660
s = listen(PORT)

while True:
	try:
		data = s.recv(512)
	except Exception as e:
		print "Exception while recieving:", e
		sleep(30)
		s = listen(PORT)
	else:
		if data != '':
			t = pickle.loads(data)
			print "***", t
		else:
			print "No data recived, reconecting..."
			sleep(30)
			s = listen(PORT)

