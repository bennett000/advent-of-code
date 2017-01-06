#ifndef MJB_UTIL_H
#define MJB_UTIL_H

/* simple constants */

#define NEWLINE '\n'
#define NUL '\0'
#define TRUE 1
#define FALSE 0

typedef unsigned long int uint;

int matoi(char *);
void mexit(int status);
void mfree(void *ptr);
void *mmalloc(uint size); 
int mprintf(char *output, ...);
int mread(char *buffer, unsigned int bufferSize);

#endif
