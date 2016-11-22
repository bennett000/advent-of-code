module.exports.isObject = function isObject(obj) {
  return typeof obj === 'object' && obj;
};

module.exports.isNumber = function isNumber(num) {
  return typeof num === 'number';
};

module.exports.isUsableNumber = function isUsableNumber(num) {
  if (typeof num !== 'number') {
    return false;
  }

  if (num !== num) {
    return false;
  }

  if (num === Infinity) {
    return false;
  }

  if (num === -Infinity) {
    return false;
  }

  return true;
};
