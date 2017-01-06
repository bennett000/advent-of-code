#include <unistd.h>
#include <stdlib.h>

#include "../util.h"

int matoi(char * string) {
  return atoi(string);
}

void mexit(int status) {
  exit(status);
}

void mfree(void *ptr) {
  free(ptr);
}

void *mmalloc(uint size) {
  return malloc(size);
}
