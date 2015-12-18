#! /usr/bin/env python
import threading


########################################################
###################### VARIABLES #######################
########################################################

PORT = 5234

########################################################
###################### FUNCTIONS #######################
########################################################


def start_discovery_daemon(PORT):
	"Main function which initiates the discovery daemon"
	d = threading.Thread(target=discovery_daemon, args=(PORT, ))
	d.setDaemon(True)
	d.start()

def discovery_daemon(PORT):
	"Threaded function which serves petitions \
	asking for visibility of the CPGV application"
	print 'Im a Thread wiiii'

########################################################
######################   MAIN   ########################
########################################################


start_discovery_daemon(PORT)

while 1:
	pass
