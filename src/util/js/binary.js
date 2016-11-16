function uint16(x) {
  const xStr = x.toString(2);
  return parseInt(xStr.slice(Math.floor(xStr.length / 2)), 2);
}

module.exports.andUint16 = function andUint16(a, b) {
  return (a & b) >>> 0;
};

module.exports.lshiftUint16 = function lshiftUint16(a, b) {
  return (a << b) >>> 0;
};

module.exports.notUint16 = function notUint16(x) {
  return uint16(~ x >>> 0);
};

module.exports.orUint16 = function orUint16(a, b) {
  return (a | b) >>> 0;
};

module.exports.rshiftUint16 = function rshiftUint16(a, b) {
  return (a >> b) >>> 0;
};
