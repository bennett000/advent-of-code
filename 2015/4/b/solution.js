const { readFileSync } = require('fs');
const { createHash } = require('crypto');

const inputFile = process.argv[2] || '../input';

const input = readFileSync(inputFile, 'utf8').trim();

let found = false;
let i = 0;

while (!found) {
  i += 1;
  const md5 = createHash('md5');
  md5.update(input + i);
  const digest = md5.digest('hex');
  const firstSix = digest.slice(0, 6);

  if (firstSix === '000000') {
    found = true;
  }
}

console.log('The advent coin for', input, 'is', i);
