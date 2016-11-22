module.exports.hasString = function has(qty, things, str) {
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
};

module.exports.trim = function trim(str) {
  return str.trim();
};
