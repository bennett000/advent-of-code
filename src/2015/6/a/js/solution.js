const { partial, readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const ON = 'turn on';
const OFF = 'turn off';
const TOGGLE = 'toggle';

// mutating map function
function map(fn, x1, y1, x2, y2, arr) {
  const bclamp = partial(clamp, arr.length);
  const vx1 = bclamp(x1);
  const vx2 = bclamp(x2);
  const vy1 = bclamp(y1);
  const vy2 = bclamp(y2);

  for (let i = vx1; i <= vx2; i += 1) {
    for (let j = vy1; j <= vy2; j += 1) {
      arr[i][j] = fn(arr[i][j]);
    }
  }
}

const on = partial(map, () => true);
const off = partial(map, () => false);
const toggle = partial(map, state => !state);

function instructionToFunction(instruction) {
  if (instruction.indexOf(ON) === 0) {
    return onToFunction(instruction);
  }

  if (instruction.indexOf(OFF) === 0) {
    return offToFunction(instruction);
  }

  if (instruction.indexOf(TOGGLE) === 0) {
    return toggleToFunction(instruction);
  }

  return null;
}


function onToFunction(instruction) {
  const tail = instruction.slice(ON.length);
  const coords = tailToCoords(tail);
  return partial(on, ...coords);
}

function offToFunction(instruction) {
  const tail = instruction.slice(OFF.length);
  const coords = tailToCoords(tail);
  return partial(off, ...coords);
}

function toggleToFunction(instruction) {
  const tail = instruction.slice(TOGGLE.length);
  const coords = tailToCoords(tail);
  return partial(toggle, ...coords);
}

function tailToCoords(tail) {
  const words = tail.split('through').filter(Boolean);
  const pointA = words[0].split(',').filter(Boolean);
  const pointB = words[1].split(',').filter(Boolean);

  return [
    ...pointA,
    ...pointB,
  ];
}

function createGrid(width = 1000, height = width) {
  const arr = [];
  for (let i = 0; i < width; i += 1) {
    if (!arr[i]) {
      arr[i] = [];
    }

    for (let j = 0; j < height; j += 1) {
      arr[i][j] = false;
    }
  }

  return arr;
}

function clamp(max, val) {
  const nval = parseInt(val, 0);

  if (nval < 0) {
    return 0;
  }

  if (nval > max) {
    return max;
  }

  return nval;
}

const grid = createGrid();

const strings = input
  .toLowerCase()
  .split('\n')
  .filter(Boolean)
  .map(instructionToFunction)
  .filter(Boolean);

const lights = strings
  .reduce((count, stringFn) => {
    // this function mutates
    stringFn(grid);

    return grid
      .reduce((colCount, row) => colCount + row
          .reduce((rowCount, light) => light ? rowCount + 1 : rowCount,
            0),
        0);
  }, 0);


console.log('There would be', lights, 'lights lit');
