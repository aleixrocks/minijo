#include <stdio.h>

void second_func(char *arg) {
	char hello[]= "hello";
	printf("%s%s\n", hello, arg);
}

void first_func() {
	char myarg[10];
	myarg[0] = '!';
	myarg[1] = '\0';
	second_func(myarg);
}

int main() {
	first_func();
	return 0;
}
