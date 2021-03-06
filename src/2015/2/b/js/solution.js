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
function computeRibbon(box) {
  const wrap = box[0] * 2 + box[1] * 2;
  const bow = box[0] * box[1] * box[2];
  return wrap + bow;
}

const squareFeet = inputDimensions.reduce((sqFt, box) => {
  return computeRibbon(box) + sqFt;
}, 0);

console.log('The elves require', squareFeet, 'feet of ribbon');
