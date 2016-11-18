const {
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const finalString = lookAndSay(input.trim(), 40);
console.log('final string length:', finalString.length);

function lookAndSay(what, limit = 10, count = 0) {
  const s = (what + '').split('');
  let next = '';

  let i = 0;

  while (i < s.length) {
    const repeat = findRepeatNumberCount(s, s[i], i);
    next += repeat + s[i];
    i += repeat;
  }

  // console.log('Given', what, 'say', next);
  console.log(
    count + 1, 'of', limit,
    'given length', s.length,
    'next length', next.length
  );

  if (count >= (limit - 1)) {
    return next;
  }
  return lookAndSay(next, limit, count + 1);
}

function findRepeatNumberCount(arr, num, startPos) {
  let i = startPos;
  let curr = arr[i];
  let count = 0;
  while (parseInt(curr, 10) === parseInt(num, 10)) {
    count += 1;
    i += 1;
    curr = arr[i];
  }
  return count;
}
