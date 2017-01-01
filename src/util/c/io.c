#include <unistd.h>
#include <stdio.h>
#include <stdarg.h>

#include "../util.h"

int mprintf(char *output, ...) {
  va_list args;
  int result = 0;
  va_start(args, output);
  result += vprintf(output, args);
  va_end(args);
  return result;
}

int mread(char *buffer, unsigned int bufferSize) {
  return read(STDIN_FILENO, buffer, bufferSize);
}
