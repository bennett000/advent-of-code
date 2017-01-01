#include "../../../../util/c/io.h"

#define INCREMENT '('
#define DECREMENT ')'


int main() {
  char buffer = 0;
  int floor = 0;
  int count = 0;

  while (mread(&buffer, 1) > 0) {
    if (buffer == INCREMENT) {
      floor += 1;
    }

    if (buffer == DECREMENT) {
      floor -= 1;
    }

    count += 1;

    if (floor < 0) {
      break;
    }
  }

  mprintf("Santa enters the basement at position: %d\n", count);

  return 0;
}
