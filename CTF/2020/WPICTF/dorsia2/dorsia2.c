#include <stdio.h>

void main() {
	char a[69] = {0};
	scanf("GET /%s", &a);
	printf("HTTP 200\r\n\r\n");
	fflush(stdout);
	execlp("cat", a, a, 0);
}

//run in /home/ctf/web/
//flag in ~/flag.txt