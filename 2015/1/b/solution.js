const { readFileSync } = require('fs');

const input = readFileSync('../input', 'utf8');

const increment = '(';
const decrement = ')';

const steps = input.split('');


const destination = steps
  .reduce((floor, instruction, pos) => {
    if (typeof floor === 'object') {
      return floor;
    }

    if (floor === -1) {
      return {
        basementAt: pos,
      };
    }

    if (instruction === increment) {
      return floor + 1;
    }

    if (instruction === decrement) {
      return floor - 1;
    }

    return floor;
  }, 0);

if (typeof destination === 'object') {
  console.log('Santa enters the basement at position:', destination.basementAt);
} else {
  console.log('Santa never enters the basement');
}
