const { readFileSync } = require('fs');

const input = readFileSync('../input', 'utf8');

const increment = '(';
const decrement = ')';

const steps = input.split('');


const destination = steps
  .reduce((floor, instruction) => {
    if (instruction === increment) {
      return floor + 1;
    }

    if (instruction === decrement) {
      return floor - 1;
    }

    return floor;
  }, 0);

console.log('Santa is on floor', destination);
