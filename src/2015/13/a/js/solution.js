const {
  partial,
  permute,
  readInputData,
  trim,
} = require('../../../../util');

const input = readInputData(__dirname);

const GAIN_CONTEXT_TO_QTY = 'would gain';
const LOSE_CONTEXT_TO_QTY = 'would lose';
const QTY_TO_NEIGHBOUR = 'happiness units by sitting next to';

const happinessMap = createHappinessMap(input);

console.log('Optimal Seating', JSON.stringify(brute(happinessMap), null, 2));

function accumulateDeltaHappiness(map, deltaHappiness, person, i, arr) {
  let lh;

  if (i === 0) {
    lh = arr[arr.length - 1];
  } else {
    lh = arr[i - 1];
  }

  return deltaHappiness + map[person][lh] + map[lh][person];
}


function brute(map) {
  const permutations = permute(Object.keys(map));

  return permutations.reduce((optimal, permutation) => {
    const accDh = partial(accumulateDeltaHappiness, map);
    const result = permutation.reduce(accDh, 0);

    if (result > optimal.deltaHappiness) {
      optimal.deltaHappiness = result;
      optimal.permutation = permutation;
    }

    return optimal;
  }, {
    permutation: [],
    deltaHappiness: 0,
  });
}

function createHappinessMap(str) {
  return str
    .split('\n')
    .reduce(parseInstruction, {});
}

function splitBy(str, instruction) {
  return instruction
    .split(str)
    .filter(Boolean)
    .map(trim);
}

function parseLhFromInstruction(instruction) {
  const parts = splitBy(GAIN_CONTEXT_TO_QTY, instruction);

  if (parts.length === 2) {
    return {
      context: parts[0],
      rh: parts[1],
      sign: 1,
    };
  }

  const negParts = splitBy(LOSE_CONTEXT_TO_QTY, instruction);

  if (negParts.length !== 2) {
    throw new Error(
      `parseLhFromInstruction: invalid instruction ${instruction}`
    );
  }

  return {
    context: negParts[0],
    rh: negParts[1],
    sign: -1,
  };
}

// mutates
function parseQtyAndTargetFromLh(lh) {
  const parts = splitBy(QTY_TO_NEIGHBOUR, lh.rh);

  if (parts.length !== 2) {
    throw new Error(
      `parseQtyFromLh: invalid instruction ${JSON.stringify(lh, null, 2)}`
    );
  }

  lh.qty = parseInt(parts[0], 10) * lh.sign;
  lh.target = parts[1].slice(0, parts[1].length - 1);

  return lh;
}

function parseInstruction(map = {}, instruction) {
  const lh = parseLhFromInstruction(instruction);
  const directions = parseQtyAndTargetFromLh(lh);

  if (!map[directions.context]) {
    map[directions.context] = {};
  }

  if (!map[directions.context][directions.target]) {
    map[directions.context][directions.target] = 0;
  }

  map[directions.context][directions.target] += directions.qty;

  return map;
}
