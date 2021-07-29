#include <stdio.h>
#include <stdint.h>

struct list_entry {
  struct list_entry *next;
  struct list_entry *prev;
};
struct potato {
  uint64_t first;
  uint64_t second;
  struct list_entry entry;
};

struct potato my_potato;
struct list_entry *reference = &my_potato.entry;

int main() {
   printf("hello world!\n");
   return 0;
}
