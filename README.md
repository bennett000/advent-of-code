Advent of Code
==============

Here are some [advent of code](http://adventofcode.com/ "Advent of Code Website") solutions and input data.

This repository is not complete, it's entirely for fun and mucking about.

There are currently two languages used for solving puzzles and I would like to eventually add more.  Haskell and JavaScript are the two current implementation languages used.

## Haskell Instructions

Assuming you have:

* bash
* runhaskell

Life should theoretically be good.

```bash
    # from the repository directory
    ./run-hs 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-hs 2015 1 a
```

## Node Instructions

Assuming you have:

* node and npm with `node` being a globally available executable

Life should theoretically be good (there are no dependencies).

```bash
    # from the repository directory
    ./run-js 2015 1 a
    
    # should run 2015's first problem, part a
    
    # to run part b
    ./run-js 2015 1 a
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
- `src/<year>/<day>/part/<test-file>` will be the _optional_ test data to run
against the solution

_all plans will need adjustments once compiled languages enter the mix_
