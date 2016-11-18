const {
  memoize,
  partial,
  permute,
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const createSmallest = () => ({
  permutation: [],
  distance: 0,
});

const trim = s => s.trim();
const toInt = n => parseInt(n, 10);

const instructions = input
  .split('\n')
  .map(trim)
  .filter(Boolean)
  .map(expressionToMap);

const cities = Object.keys(citiesFromInstructions(instructions));
const memoDistanceFromIns = memoize(distanceFromInstructions);

function leftHandToTrip(expression) {
  const parts = expression
    .split('to')
    .filter(Boolean)
    .map(trim);

  if (parts.length !== 2) {
    throw new Error(
      `leftHandToTrip: invalid expression: ${expression}`
    );
  }

  return {
    a: parts[0],
    b: parts[1],
  };
}

function expressionToMap(expression) {
  const parts = expression
    .split('=')
    .map(trim)
    .filter(Boolean);

  if (parts.length !== 2) {
    throw new Error(
      `expressionToInstruction: invalid expression: ${expression}`
    );
  }

  return {
    route: leftHandToTrip(parts[0]),
    distance: toInt(parts[1]),
  };
}

function markCity(map, city) {
  // normally do an Object.assign but why churn memory for this?
  map[city] = true;
  return map;
}

function citiesFromInstructions(ins) {
  return ins.reduce((cts, instruction) => {
    let marked = cts;
    if (!cts[instruction.route.a]) {
      marked = markCity(marked, instruction.route.a);
    }
    if (!cts[instruction.route.b]) {
      marked = markCity(marked, instruction.route.b);
    }
    return marked;
  }, {});
}

function distanceFromInstructions(ins, a, b) {
  return ins.reduce((distance, instruction) => {
    if (instruction.route.a === a && instruction.route.b === b) {
      return instruction.distance;
    }
    // inverse is valid too :)
    if (instruction.route.a === b && instruction.route.b === a) {
      return instruction.distance;
    }
    return distance;
  }, 0);
}

function accumulateDistance(ins, count, city, i, arr) {
  if (i === arr.length - 1) {
    // skip the last city since we do not need to return home
    return count;
  }
  const offset = i + 1;
  return count +
    memoDistanceFromIns(ins, city, arr[offset]);
}

function makeSmallestDistance(accDistance) {
  return (smallest = createSmallest(), permutation) => {
    const distance = permutation.reduce(accDistance, 0);
    if (distance < smallest.distance || smallest.distance === 0) {
      smallest.distance = distance;
      smallest.permutation = permutation;
    }
    return smallest;
  };
}

function brute(cts, ins) {
  const permutations = permute(cts);

  const bAccumulateDistance = partial(accumulateDistance, ins);

  return permutations
    .reduce(makeSmallestDistance(bAccumulateDistance), createSmallest());
}
const shortest = brute(cities, instructions);

console.log('The shortest path is', shortest.permutation,
  'at', shortest.distance);
