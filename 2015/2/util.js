/** sort by number function */
module.exports.byNumber = function byNumber(a, b) {
  const ai = parseInt(a, 10);
  const bi = parseInt(b, 10);
  if (ai < bi) { return -1; }
  if (ai > bi) { return 1; }
  return 0;
};
