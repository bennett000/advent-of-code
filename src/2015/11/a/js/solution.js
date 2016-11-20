const {
  hasString,
  partial,
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const ALPHA = Object.freeze('abcdefghijklmnopqrstuvwxyz'.split(''));

const hasForbidden = partial(hasString, 1, 'iol'.split(''));

console.log(
  'Given', input, 'the next valid password is ', incrementToValidPassword(input)
);

function incrementToValidPassword(str) {
  let incremented = increment(str);
  let count = 0;

  while (!isValidPassword(incremented)) {
    incremented = increment(incremented);
    count += 1;

    if (count % 100000 === 0) {
      console.log('incrementing', str, 'to', incremented);
    }
  }

  return incremented;
}

function isValidPassword(str) {
  return !hasForbidden(str) && getPairCount(str) >= 2 && hasRun(ALPHA, 3, str);
}

function getPairCount(str) {
  const strChars = str.split('');

  const used = [];
  let count = 0;

  for (let i = 0; i < (strChars.length - 1); i += 1) {
    if (strChars[i] === strChars[i + 1]) {
      if (used.indexOf(strChars[i]) === -1) {
        count += 1;
        i += 1;
        used.push(strChars[i]);
      }
    }
  }

  return count;
}

function hasRun(set, count = 3, str) {
  return str
    .split('')
    .reduce((state, char, i) => {
      if (state) {
        return state;
      }

      const strMinRun = str.slice(i, i + count);

      if (strMinRun.length < count) {
        return state;
      }

      const strMinRunChars = strMinRun.split('');
      const setStartIndex = set.indexOf(strMinRunChars[0]);

      if (setStartIndex === -1) {
        console.warn(`hasRun: character not found ${ strMinRunChars[0] }`);
        return state;
      }

      const setMinRun = set.slice(setStartIndex, setStartIndex + count);

      if (setMinRun.length < count) {
        return state;
      }

      if (strMinRun === setMinRun.join('')) {
        return true;
      }

      return false;
    }, false);
}

function increment(str) {
  return str
    .toLowerCase()
    .split('')
    .reverse()
    .reduce((state, char) => {
      const index = ALPHA.indexOf(char);

      if (index === -1) {
        throw new Error(`undexpected character ${char}`);
      }

      if (state.carry) {
        if (index === ALPHA.length - 1) {
          state.str = ALPHA[0] + state.str;
          state.carry = true;
        } else {
          state.str = ALPHA[index + 1] + state.str;
          state.carry = false;
        }
      } else {
        state.str = char + state.str;
      }

      return state;
    }, {
      str: '',
      carry: true,
    }).str;
}

