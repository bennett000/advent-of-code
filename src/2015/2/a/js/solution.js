// http://adventofcode.com/2015/day/2
const { byNumber, readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const inputRows = input.split('\n');

const inputDimensions = inputRows
  .map((row) => row
    .split('x')
    .filter(Boolean)
    .sort(byNumber))
  .filter((row) => row.length);

/** Expects box dimensions to be in ascending order */
function computeBox(box) {
  const smallSide = box[0] * box[1];

  let total;

  total = 2 * smallSide;
  total += 2 * (box[0] * box[2]);
  total += 2 * (box[1] * box[2]);

  return total + smallSide;
}

const squareFeet = inputDimensions.reduce((sqFt, box) => {
  return computeBox(box) + sqFt;
}, 0);

console.log('The elves require', squareFeet, 'square feet of paper');
