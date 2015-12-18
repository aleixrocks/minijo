#! /usr/bin/env python
import RPi.GPIO as GPIO
import time


# setup must be called first to configure the GPIOs


# GPIO numbering
GPIO_OUT_UP=24
GPIO_OUT_DOWN=23
GPIO_IN_UP=22
GPIO_IN_DOWN=27

# Variables to store the callback functions
# for the input operations. This variables
# contains the entire functions passed as 
# parameters when calling "setup()". The
# true callback functions attached to the
# gpio's interrupt when raising voltage are
# wraper_input_up and wraper_input_down. These
# functions perform error correction due to
# glitches. After the correction, the user
# specified functions (inside the variables
# CALLBACK_INPUT_UP and CALLBACK_INPUT_DOWN)
# will be called

CALLBACK_INPUT_UP = None
CALLBACK_INPUT_DOWN = None



# unsetup GPIO, they became High-Z
def clean():
	GPIO.cleanup()

# Configure GPIO
def setup(arg_input_up, arg_input_down):
	global CALLBACK_INPUT_UP
	global CALLBACK_INPUT_DOWN

#	GPIO.setwarnings(False)
	GPIO.setmode(GPIO.BCM)
	GPIO.setup(GPIO_OUT_DOWN, GPIO.OUT)
	GPIO.setup(GPIO_OUT_UP,   GPIO.OUT)
	GPIO.setup(GPIO_IN_DOWN,  GPIO.IN)
	GPIO.setup(GPIO_IN_UP,    GPIO.IN)

	# Store user callback functions
	CALLBACK_INPUT_UP = arg_input_up
	CALLBACK_INPUT_DOWN = arg_input_down

	GPIO.add_event_detect(GPIO_IN_UP, GPIO.RISING, callback=wraper_input_up, bouncetime=300)
	GPIO.add_event_detect(GPIO_IN_DOWN, GPIO.RISING, callback=wraper_input_down, bouncetime=300)


def stop():
	GPIO.output(GPIO_OUT_DOWN, False)
	GPIO.output(GPIO_OUT_UP, False)

def go_up():
	stop()
	GPIO.output(GPIO_OUT_UP, True)

def go_down():
	stop()
	GPIO.output(GPIO_OUT_DOWN, True)



# INPUT functions. These functions read
# the state of a GPIO and try to correct
# any glitch. 

# When one of this functions is called, a
# new thread is created for it. While the 
# GPIO is high, the function prevents the
# executions of more than one thread. The
# first thread sets a flag to true. The 
# other threads will exit if they find this
# flag to true.

# The first thread, waits a small amout of time
# and then reads the GPIO state. IF this is still
# true, then it's not a glitch and we can proceed.
# If not, the thread exits.

# If it's not a glitch, the user defined callback
# function is called. On return, it checks if 
# the gpio is still true. We want to be sure 
# that the gpio is false, not just a small
# glitch. A double check with to while's 
# is done for this reason.

# Finally, when we know that the gpio is false
# the flag set to false and the thread exits.

ctl_up = False
def wraper_input_up(channel):		
	global ctl_up
	global CALLBACK_INPUT_UP

	# If a thread is already up, just exit
	if ctl_up == True:
		return
	# Thread up flag
	ctl_up = True

	time.sleep(0.3)
	if GPIO.input(GPIO_IN_UP) == 1:
		# Call main function previously stored
		CALLBACK_INPUT_UP()
		# Double while to be sure the GPIO is off
		while GPIO.input(GPIO_IN_UP) == 1:
			while GPIO.input(GPIO_IN_UP) == 1:
				time.sleep(1)
		time.sleep(0.3)
	# Release flag
	ctl_up = False


ctl_down = False
def wraper_input_down(channel):		
	global ctl_down
	global CALLBACK_INPUT_DOWN

	# If a thread is already up, just exit
	if ctl_down == True:
		return
	# Thread up flag
	ctl_down = True

	time.sleep(0.3)
	if GPIO.input(GPIO_IN_DOWN) == 1:
		# Call main function previously stored
		CALLBACK_INPUT_DOWN()
		# Double while to be sure the GPIO is off
		while GPIO.input(GPIO_IN_DOWN) == 1:
			while GPIO.input(GPIO_IN_DOWN) == 1:
				time.sleep(1)
		time.sleep(0.3)
	# Release flag
	ctl_down = False

