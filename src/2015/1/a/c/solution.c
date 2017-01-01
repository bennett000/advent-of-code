#include "../../../../util/util.h"

#define INCREMENT '('
#define DECREMENT ')'


int main() {
  char buffer = 0;
  int floor = 0;

  while (mread(&buffer, 1) > 0) {
    if (buffer == INCREMENT) {
      floor += 1;
    }
    if (buffer == DECREMENT) {
      floor -= 1;
    }
  }

  mprintf("Santa is on floor %d\n", floor);

  return 0;
}
