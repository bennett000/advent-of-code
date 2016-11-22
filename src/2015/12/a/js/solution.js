const {
  isObject,
  isUsableNumber,
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const inObj = JSON.parse(input.trim());

console.log('Total Count', totalNumbersIn(inObj));

function totalNumbersIn(obj) {
  if (Array.isArray(obj)) {
    return obj.reduce(totalNumbers, 0);
  }

  if (isObject(obj)) {
    return Object.keys(obj)
      .reduce((count, prop) => totalNumbers(count, obj[prop]), 0);
  }

  return 0;
}

function totalNumbers(count, element) {
  if (isUsableNumber(element)) {
    return count + element;
  }

  if (isObject(element) || Array.isArray(element)) {
    return count + totalNumbersIn(element);
  }

  return count;
}
