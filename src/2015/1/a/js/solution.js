const { readInputData } = require('../../../../util');

const input = readInputData(__dirname);

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
