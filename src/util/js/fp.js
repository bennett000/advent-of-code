module.exports.partial = function partial(fn, ...boundArgs) {
  return function partialed(...args) {
    return fn(...boundArgs, ...args);
  };
};
