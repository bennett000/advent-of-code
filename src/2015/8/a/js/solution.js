const {
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const ESC_BACKSLASH = /\\\\/g;
const ESC_HEX = /\\x[0-9a-f]{2}/g;
const ESC_DOUBLE_QUOTE = /\\"/g;
const DOUBLE_QUOTE = /"/g;
const WHITESPACE = /[\s\n\cI]+/g;

const charsArray = input
  .replace(WHITESPACE, '')
  .split('');

const charsString = charsArray.join('');

const codeLength = charsString.length;
const memoryLength = charsString
  .toLowerCase()
  .replace(ESC_BACKSLASH, '!')
  .replace(ESC_DOUBLE_QUOTE, '@')
  .replace(ESC_HEX, '#')
  .replace(DOUBLE_QUOTE, '')
  .length;

console.log('code length', codeLength,
  'memory length', memoryLength,
  'diff', codeLength - memoryLength);

