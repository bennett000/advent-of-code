Advent of Code
==============

Here are some [advent of code](http://adventofcode.com/ "Advent of Code Website") solutions and input data.

This repository is not complete, it's entirely for fun and mucking about.  There are hacky solutions, some of the languages will have especially rough code.

There are currently four languages used for solving puzzles and I would like to eventually add more.  x86_64 Assembly, C, Haskell, and JavaScript are the two current implementation languages used.

_note, rather than deal with build systems for each language simple bash scripts are used.  Interpereted languages are run from their source, compiled languages are built into the `dist` folder and their executables are run from there_

## Assembly Instructions

Assembly code is currently written using Intel syntax

Assuming you have:

* bash
* nasm
* ld (GNU)

There are still no guarantees.  Building assembly will take this and some know how.

```bash
    # from the repository directory
    ./run-asm 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-asm 2015 1 b
```

Currently the assembly code works on OS X 12.12.2 on Intel X86_64 hardware.

There are plans to test against Linux and BSD.  Consequently the system call code has been isolated.  Unfortunately despite this effort, other things like the way memory is addressed/referenced might be a problem (RIP vs explicit).  Also the current build tooling is hard coded for darwin and Mach.


## C Instructions

Assuming you have:

* bash
* gcc

Life should theoretically be good.

```bash
    # from the repository directory
    ./run-hs 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-hs 2015 1 b
```

## Haskell Instructions

Assuming you have:

* bash
* ghc

Life should theoretically be good.

```bash
    # from the repository directory
    ./run-hs 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-hs 2015 1 b
```

## Node Instructions

Assuming you have:

* bash
* node with `node` being a globally available executable (some GNU/Linux distributions use nodejs as a binary in their native packages)

Life should theoretically be good (there are no dependencies).

```bash
    # from the repository directory
    ./run-js 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-js 2015 1 b
```

## Developing

- all source code lives in the `src` directory
- the top level directory has a simple bash launcher for each language
- `src` contains directories for each year and a `util` directory
- `src` may also contain utility entry points for specific programming languages
- `src/util/<language>` will contain the utility files for a given language
- `src/<year>/<day>/<part>/<language>/solution.<language extension>` will 
contain the source code for a given part of a problem
- `src/<year>/<day>/input` will be the input data set
- `src/<year>/<day>/<part>/<test-file>` will be the _optional_ test data to run
against the solution
- compiled languages produce output in `dist/<year>/<day>/<part>/<test-file>
- compiled languages should produce a static binary named `solution`

