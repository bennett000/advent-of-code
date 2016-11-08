const { readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const directions = input.split('').filter(Boolean);

const NORTH = '^';
const SOUTH = 'v';
const WEST  = '<';
const EAST  = '>';

function incrementMap(map, pos) {
  const attr = pos.x + '.' + pos.y;
  if (!map[attr]) {
    map[attr] = 0;
  }
  map[attr] += 1;

  return map;
}

const map = directions.reduce((state, direction, i) => {
  let pos;
  if (i % 2 === 0) {
    pos = state.posSanta;
  } else {
    pos = state.posRobo;
  }

  switch (direction) {
  case NORTH:
    pos.y += 1;
    break;

  case SOUTH:
    pos.y -= 1;
    break;

  case EAST:
    pos.x += 1;
    break;

  case WEST:
    pos.x -= 1;
    break;

  default:
    return state;
  }

  state.map = incrementMap(state.world, pos);
  return state;
}, { world: { '0.0': 2 }, posSanta: { x: 0, y: 0 }, posRobo: { x: 0, y: 0 } });

const housesWithPresents = Object.keys(map.world).length;

console.log('Santa would visit', housesWithPresents, 'houses');
