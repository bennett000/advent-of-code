#include "../util.h"

#define TRUE 1
#define FALSE 0

typedef unsigned char uchar;
typedef unsigned int uint;

struct HashTable {
  void *table;
  uchar (*get)(char *key);
  uchar (*set)(char *key, void *value);
};

uint oatHash(void *key, uint len) {
    uchar *p = key;
    uint h = 0;
    uint i;

    for (i = 0; i < len; i++) {
        h += p[i];
        h += (h << 10);
        h ^= (h >> 6);
    }

    h += (h << 3);
    h ^= (h >> 11);
    h += (h << 15);

    return h;
}
