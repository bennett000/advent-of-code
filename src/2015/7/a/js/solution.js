const {
  andUint16,
  deepFreeze,
  lshiftUint16,
  notUint16,
  rshiftUint16,
  orUint16,
  readInputData,
} = require('../../../../util');

const input = readInputData(__dirname);

const language = deepFreeze({
  AND: {
    fn: andUint16,
  },
  LSHIFT: {
    fn: lshiftUint16,
  },
  NOT: {
    fn: notUint16,
  },
  OR: {
    fn: orUint16,
  },
  RSHIFT: {
    fn: rshiftUint16,
  },
});

function toExpression(str) {
  const parts = str.trim()
    .split('->')
    .filter(Boolean);

  if (parts.length !== 2) {
    return null;
  }

  return {
    instruction: parts[0].trim(),
    target: parts[1].trim(),
  };
}

function isNumber(n) {
  // simple isNumber for this kind of case
  const asN = parseInt(n, 10);
  return (asN === 0) || asN > 0 || asN < 0;
}

function isValidSymbol(map, symbol) {
  return isNumber(symbol) || map[symbol];
}

function evaluatePrefixInstruction(memo, map, parts) {
  if (!language[parts[0]]) {
    throw new Error(`toPrefixInstruction: Unknown Operator: ${parts[0]}`);
  }
  if (!isValidSymbol(map, parts[1])) {
    throw new Error(`toPrefixInstruction: Unknown Symbol: ${parts[1]}`);
  }
  const symbol = isNumber(parts[1]) ?
    parts[1] :
    evaluateMapFor(memo, map, parts[1]);

  return language[parts[0]].fn(symbol);
}

function evaluateAssignment(memo, map, parts) {
  if (isNumber(parts[0])) {
    return parts[0];
  }
  if (!map[parts[0]]) {
    throw new Error(`toAssignment: Unknown Symbol: ${parts[0]}`);
  }
  return evaluateMapFor(memo, map, parts[0]);
}

function evaluateBinaryInstruction(memo, map, parts) {
  if (!language[parts[1]]) {
    throw new Error(`toBinaryInstruction: Unknown Symbol: ${parts[1]}`);
  }
  if (!isValidSymbol(map, parts[0])) {
    throw new Error(`toBinaryInstruction: Unknown Symbol: ${parts[0]}`);
  }
  if (!isValidSymbol(map, parts[2])) {
    throw new Error(`toBinaryInstruction: Unknown Symbol: ${parts[2]}`);
  }
  const l = isNumber(parts[0]) ? parts[0] : evaluateMapFor(memo, map, parts[0]);
  const r = isNumber(parts[2]) ? parts[2] : evaluateMapFor(memo, map, parts[2]);
  return language[parts[1]].fn(l, r);
}

function evaluateInstruction(memo, map, expr) {
  const parts = expr.split(' ').filter(Boolean);

  if (parts.length === 1) {
    return evaluateAssignment(memo, map, parts);
  }

  if (parts.length === 2) {
    return evaluatePrefixInstruction(memo, map, parts);
  }

  if (parts.length === 3) {
    return evaluateBinaryInstruction(memo, map, parts);
  }

  throw new Error(`toInstruction: Invalid Expression: ${expr}`);
}

function indexByInstruction(map, expression) {
  if (!map[expression.target]) {
    map[expression.target] = expression;
  } else {
    console.warn('indexByInstruction: expression is reassigned!');
  }
  return map;
}


function evaluateMapFor(memo = {}, map, val) {
  if (!map[val]) {
    throw new Error(`evaluateMapFor: val (${val}) not in map`);
  }

  if (memo[val] === undefined) {
    memo[val] = evaluateInstruction(memo, map, map[val].instruction);
  }

  return memo[val];
}

const expressionMap = input.split('\n')
  .filter(Boolean)
  .map(toExpression)
  .filter(Boolean)
  .reduce(indexByInstruction, {});

console.log('Evaluate Circuit For a', evaluateMapFor({}, expressionMap, 'a'));
