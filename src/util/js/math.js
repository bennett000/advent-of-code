// shamelessly ripped from SO
// http://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979

module.exports.permute = function permute(permutation) {
  const length = permutation.length;
  const result = new Array([
    0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600,
  ][length]);
  const c = new Array(length).fill(0);
  let i = 1;
  let j = 1;

  result[0] = permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      const k = (i % 2) ? c[i] : 0;
      const p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result[j] = permutation.slice();
      ++j;
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
};
