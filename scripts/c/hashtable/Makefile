CFLAGS  := $(shell pkg-config --cflags libbsd-overlay)
LDFLAGS := $(shell pkg-config --libs libbsd-overlay)

CFLAGS += -ggdb3 -pthread

all: main

main: main.c ht.c
	gcc $(CFLAGS) $^ $(LDFLAGS) -o $@

run: main
	./main

clean:
	rm -f main
