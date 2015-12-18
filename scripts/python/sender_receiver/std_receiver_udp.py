#! /usr/bin/env python
import pickle
import socket
from time import sleep


def listen(port):
	"Creates UPD listening socket at the given port. If bounding fails \
	retry automatically"
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

	bounded = False
	while not bounded:
		try:
			s.bind(('', port))
		except Exception as e:
			print "ERROR", e, "Retrying to bind..."
			sleep(15)
		else:
			print "  * Bounded"
			bounded = True

	return s

def disconnect(s):
	"Close socket"
	s.close()



print 'Welcome ladies and gentelment to the standard reciver circus!'
PORT = 5234
s = listen(PORT)

while True:
	try:
		data, addr = s.recvfrom(512)
	except Exception as e:
		print "ERROR:", e
		sleep(30)
		s = listen(PORT)
	else:
		if data != '':
			t = pickle.loads(data)
			print "***", t

