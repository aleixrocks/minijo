all: sleep-on-mutex

sleep-on-mutex: sleep-on-mutex.c
	gcc $< -g -lpthread -o $@

clean:
	rm -f sleep-on-mutex
