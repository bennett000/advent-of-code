const { readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const strings = input.toLowerCase().split('\n').filter(Boolean);

function hasDoubleOccurenceWithGap(str, gap = 1) {
  const step = gap < 1 ? 1 : gap;

  if (gap + 2 >= str.length) {
    return false;
  }

  if (str.length < 3) {
    return false;
  }

  return str
    .split('')
    .reduce((state, char, i, arr) => {
      if (state) {
        return state;
      }

      if (i + gap + 1 > arr.length) {
        return state;
      }

      if (char === arr[i + step + 1]) {
        return true;
      }

      return state;

    }, false);
}

function hasDoubleOccurenceOfGiven(givenLength, str) {
  if (givenLength * 2 > str.length) {
    return false;
  }

  const chars = str.split('');
  let hasDouble = false;

  for (let i = 0; i < chars.length - (givenLength - 1); i += 1) {
    const given = [...chars.slice(i, i + givenLength)].join('');
    let occurences = 0;

    for (let j = 0; j < chars.length - (givenLength - 1); j += 1) {
      const compare = [...chars.slice(j, j + givenLength)].join('');

      if (given === compare) {
        occurences += 1;
        j += givenLength - 1;
      }
    }

    if (occurences >= 2) {
      hasDouble = true;
      break;
    }
  }

  return hasDouble;
}

function isNiceString(str) {
  return hasDoubleOccurenceWithGap(str) &&
    hasDoubleOccurenceOfGiven(2, str);
}

const niceStrings = strings
  .reduce((state, word) => isNiceString(word) ? state + 1 : state,  0);


console.log('File contains', niceStrings, 'nice strings');
