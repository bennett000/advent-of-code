module.exports = {
  deepCall,
  memoize,
  isObject,
  partial,
};

function deepCall(map, obj) {
  if (Array.isArray(obj)) {
    return map(obj.map(partial(deepCall, map)));
  }

  if (isObject(obj)) {
    for (let i in obj) {
      if (isObject(obj[i])) {
        if (!Object.isFrozen(obj[i])) {
          obj[i] = partial(deepCall, map)(obj[i]);
        }
      }
    }
  }

  return map(obj);
}

function isObject(obj) {
  return typeof obj === 'object' && obj;
}

function memoize(fn) {
  const memo = Object.create(null);
  return (...args) => {
    args.map((arg) => typeof arg === 'object' ? JSON.stringify(arg) : arg);
    const id = args.join('.');
    if (!memo[id]) {
      memo[id] = fn(...args);
    }
    return memo[id];
  };
}

function partial(fn, ...boundArgs) {
  return function partialed(...args) {
    return fn(...boundArgs, ...args);
  };
}

module.exports.deepFreeze = partial(deepCall, Object.freeze.bind(Object));
