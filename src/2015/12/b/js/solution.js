const {
  isObject,
  isUsableNumber,
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const inObj = JSON.parse(input.trim());

console.log('Total Count', totalNumbersIn(inObj, ['red']));

function totalNumbersIn(obj, forbidden = []) {
  if (Array.isArray(obj)) {
    return obj.reduce(makeTotalNumbers(forbidden), 0);
  }

  if (isObject(obj)) {
    const keys = Object.keys(obj);
    const hasForbidden = forbidden
      .reduce((state, key) => keys
        .reduce((subState, prop) => obj[prop] === key ?
            true :
            subState,
          state), false);

    if (hasForbidden) {
      return 0;
    }

    return Object.keys(obj)
      .reduce(
        (count, prop) => makeTotalNumbers(forbidden)(count, obj[prop]),
        0
      );
  }

  return 0;
}

function makeTotalNumbers(filter) {
  return function totalNumbers(count, element) {
    if (isUsableNumber(element)) {
      return count + element;
    }

    if (isObject(element) || Array.isArray(element)) {
      return count + totalNumbersIn(element, filter);
    }

    return count;
  }
}
