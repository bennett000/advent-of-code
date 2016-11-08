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

const map = directions.reduce((state, direction) => {
  switch (direction) {
  case NORTH:
    state.pos.y += 1;
    break;

  case SOUTH:
    state.pos.y -= 1;
    break;

  case EAST:
    state.pos.x += 1;
    break;

  case WEST:
    state.pos.x -= 1;
    break;

  default:
    return state;
  }

  state.map = incrementMap(state.world, state.pos);
  return state;
}, { world: { '0.0': 1 }, pos: { x: 0, y: 0 } });

const housesWithPresents = Object.keys(map.world).length;

console.log('Santa would visit', housesWithPresents, 'houses');
