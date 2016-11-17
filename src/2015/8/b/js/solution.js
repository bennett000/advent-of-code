const {
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const BACKSLASH = /\\/g;
const DOUBLE_QUOTE = /"/g;
const WHITESPACE = /[\s\n\cI]+/g;

const charsArray = input
  .replace(WHITESPACE, '')
  .split('');

const charsString = charsArray.join('');
const encodedLength = input
  .toLowerCase()
  .split('\n')
  .reduce((count, row) => count + row
      .replace(BACKSLASH, '\\$&')
      .replace(DOUBLE_QUOTE, '\\$&')
      .length + 2, // the encoded string should be wrapped in quotes
    0);

const codeLength = charsString.length;

console.log('code length', codeLength,
  'encoded length', encodedLength,
  'diff', encodedLength - codeLength);

