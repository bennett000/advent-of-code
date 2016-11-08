const { readFileSync } = require('fs');
const { join } = require('path');

module.exports.readInputData = (root, relativePath = [
  '..', '..', 'input',
]) => {
  const inputFile = process.argv[2] || join(...[root, ...relativePath]);
  return readFileSync(inputFile, 'utf8').trim();
};
