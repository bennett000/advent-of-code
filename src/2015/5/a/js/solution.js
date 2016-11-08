const { readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const strings = input.toLowerCase().split('\n').filter(Boolean);

const vowels = Object.freeze(['a', 'e', 'i', 'o', 'u']);

const forbidden = Object.freeze(['ab', 'cd', 'pq', 'xy']);

function has(qty, things, str) {
  let count = 0;

  things.forEach((thing) => {
    let occurences = 0;
    let index = str.indexOf(thing);

    while (index !== -1) {
      occurences += 1;
      index = str.indexOf(thing, index + 1);
    }

    count += occurences;
  });

  return count >= qty;
}

const hasThree = has.bind(null, 3);

const hasThreeVowels = hasThree.bind(null, vowels);

const hasForbidden = has.bind(null, 1, forbidden);

function hasDoubleOccurence(str) {
  return str
    .split('')
    .reduce((state, char, i, arr) => {
      if (state) {
        return state;
      }

      if (arr.length === (i - 1)) {
        return state;
      }

      return char === arr[i + 1];
    }, false);
}

function isNiceString(str) {
  return hasThreeVowels(str) &&
    hasDoubleOccurence(str) &&
    !hasForbidden(str);
}

const niceStrings = strings
  .reduce((state, word) => isNiceString(word) ? state + 1 : state,  0);


console.log('File contains', niceStrings, 'nice strings');
