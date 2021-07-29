
def get_type(type_name):
	t = gdb.lookup_type(type_name)
	if t == None:
		raise gdb.GdbError("cannot resolve type '%s'" % type_name)
	return t

def offset_of(typeobj, field):
	element = gdb.Value(0).cast(typeobj.pointer())
	return int(str(element[field].address), 16)

# given a pointer to a member in a struct instance, get a pointer to the struct
# instance itself.
#
# arguments:
#  ptr:  gdb.Value
#  typeobj: gdb.Type
#  member: string
#
# Example:
#
####################
# C code
###################
#
# #include <stdio.h>
# #include <stdint.h>
# struct list_entry {
#   struct list_entry *next;
#   struct list_entry *prev;
# };
# struct potato {
#   uint64_t first;
#   uint64_t second;
#   struct list_entry entry;
# };
#
# struct potato my_potato;
# struct list_entry *reference = &my_potato.entry;
#
# int main() {
#    char c;
#    fscanf(stdin, "%c", &c);
#    return 0;
# }
#
###################
#   python code
###################
#   $ gcc -g ./example.c -o ./example
#   $ gdb ./example
#   $ source ./this_script.py
#   $ b main
#   $ run
#   $ pi # enter python interpreter
#   >>> ref = gdb.parse_and_eval("reference")
#   >>> potatoType = get_type('struct potato')
#   >>> my_potato = container_of(ref, potatoType, 'entry')
#   >>> assert(my_potato == gdb.parse_and_eval('my_potato').address)
#
def container_of(ptr, typeobj, member):
	charType = get_type("char")
	return (ptr.cast(charType.pointer()) - offset_of(typeobj, member)).cast(typeobj.pointer())
