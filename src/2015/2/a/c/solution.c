#include "../../../../util/util.h"

#define ASCII_X 120
#define BUFFER_LIMIT 6
#define ERR_DIMENSION 2
#define ERR_LARGE_INT 1
#define ERR_UNEXPECTED -1

struct DimensionBuffers {
  char stringBuffer[BUFFER_LIMIT];
  uint stringCount;
  char charBuffer;
  uint x, y, z;
  uint *current;
};

typedef struct DimensionBuffers DimensionBuffers;

void bufferOnNewLine(DimensionBuffers *buffs);
void bufferOnX(DimensionBuffers *buffs);
uint computeInput(
  uint (*mapInput)(uint, uint, uint),
  DimensionBuffers *buffs,
  char *atEof
);
DimensionBuffers *createDimensionBuffers(void);
void exitBounds(uint stringCount);
void exitDimensions(DimensionBuffers *buffs);
void exitError(uint error);
uint surfaceArea(uint small, uint mid, uint lg);
void swap(uint *a, uint *b);
void swapCurrent();
void threeSort(uint *a, uint *b, uint *c);
void zeroBuffers(DimensionBuffers *buffs);


int main() {
  char atEof = FALSE;
  uint squareFeet = 0;
  DimensionBuffers *buffs = createDimensionBuffers();

  while (atEof == FALSE) {
    squareFeet += computeInput(&surfaceArea, buffs, &atEof);
    zeroBuffers(buffs);
  }

  mfree(buffs);

  mprintf("The elves require %d square feet of paper\n", squareFeet);

  return 0;
}

DimensionBuffers *createDimensionBuffers(void) {
  DimensionBuffers *buffs = mmalloc(sizeof(DimensionBuffers*));
  zeroBuffers(buffs);
  return buffs;
}

void zeroBuffers(DimensionBuffers *buffs) {
  for (uint i = 0; i < BUFFER_LIMIT; i += 1) {
    buffs->stringBuffer[i] = NUL;
  }
  buffs->stringCount = 0;
  buffs->charBuffer = 0;
  buffs->x = 0;
  buffs->y = 0;
  buffs->z = 0;
  buffs->current = &(buffs->x);
}

/**
 * Given a stream of inputs, exits on bad data
 * Example data:
 * 1x4x2\n
 * 124x2341x22\n
 * 4x23x222\n
 */
uint computeInput(uint (*mapInput)(uint, uint, uint),
		  DimensionBuffers *buffs,
		  char *atEof) {

  while (mread(&buffs->charBuffer, 1) > 0) {
    exitBounds(buffs->stringCount);

    if (buffs->charBuffer == NEWLINE) {
      bufferOnNewLine(buffs);
      return mapInput(buffs->x, buffs->y, buffs->z);
    }

    if (buffs->charBuffer == ASCII_X) {
      bufferOnX(buffs);
      continue;
    }

    buffs->stringBuffer[buffs->stringCount * sizeof(char)] = buffs->charBuffer;
    buffs->stringCount += 1;
  }

  // mark eof
  *atEof = TRUE;
  return 0;
}

void bufferOnNewLine(DimensionBuffers *buffs) {
  exitDimensions(buffs);
  buffs->stringBuffer[buffs->stringCount] = NUL;
  buffs->z = matoi(buffs->stringBuffer);
  threeSort(&buffs->x, &buffs->y, &buffs->z);
}

void bufferOnX(DimensionBuffers *buffs) {
  buffs->stringBuffer[buffs->stringCount] = NUL;
  buffs->stringCount = 0;
  *buffs->current = matoi(buffs->stringBuffer);
  swapCurrent(&buffs->current, &buffs->x, &buffs->y, &buffs->z);
}

void exitDimensions(DimensionBuffers *buffs) {
  if (buffs->x == 0) {
    exitError(ERR_DIMENSION);
  }
  if (buffs->y == 0) {
    exitError(ERR_DIMENSION);
  }
}

void exitBounds(uint stringCount) {
  if (stringCount >= (BUFFER_LIMIT - 2)) {
    exitError(ERR_LARGE_INT);
  }
}

void swapCurrent(uint **current, uint *a, uint *b, uint *c) {
  if (*current == a) {
    *current = b;
  } else if (*current == b) {
    *current = c;
  } else {
    mprintf(
      "Error more parts than expected :/  a: %d, b: %d, c: %d",
       a, b, c
    );
  }
}
		  
uint surfaceArea(uint small, uint mid, uint lg) {
  uint total;

  total = 2 * small * mid;
  total += 2 * small * lg;
  total += 2 * mid * lg; 

  return total + /* slack */ small * mid;
}

/** side effect rich */
void swap(uint *a, uint *b) {
  int temp = *a;
  *a = *b;
  *b = temp;
}

/** side effect rich */
void threeSort(uint *a, uint *b, uint *c) {
  if (*a > *b) {
    swap(a, b);
  }
  if (*b > *c) {
    swap(b, c);
  }
  if (*a > *b) {
    swap(a, b);
  }
}

void exitError(uint error) {
  switch (error) {
  case ERR_DIMENSION:
    mprintf("Error: unexpected dimension parsed\n");
    break;
  case ERR_LARGE_INT:
    mprintf("Error: unexpected dimension, exceeds %d chars\n", BUFFER_LIMIT - 1);
    mexit(ERR_LARGE_INT);
    break;
  default:
    mprintf("Error: unexpected error\n");
    mexit(ERR_UNEXPECTED);
    break;
  }
}
