const { readInputData } = require('../../../../util');

const input = readInputData(__dirname);

const TOTAL_TIME = 2503;

const lines = input.split('\n');
const stats = lines.reduce((state, el) => {
  const words = el.split(' ');
  state.push({
    name: words[0],
    speed: parseInt(words[3], 10),
    runTime: parseInt(words[6], 10),
    restTime: parseInt(words[13], 10),
  });

  return state;
}, []);

function race(totalTime, speed, runTime, restTime) {
  let distance = 0;
  let restRemaining = 0;
  let runRemaining = runTime;

  for (let i = 0; i < totalTime; i += 1) {
    if (restRemaining) {
      restRemaining -= 1;
      if (restRemaining === 0) {
        runRemaining = runTime;
      }
      continue;
    }

    if (runRemaining) {
      distance += speed;
      runRemaining -= 1;
    }

    if (runRemaining === 0) {
      restRemaining = restTime;
    }
  }

  return distance;
}

const results = stats.reduce((state, { name, speed, runTime, restTime }) => {
  state.push({
    name,
    distance: race(TOTAL_TIME, speed, runTime, restTime),
  });

  return state;
}, []);

const winner = results.reduce((state, result) => {
  if (result.distance > state.distance) {
    return result;
  }

  return state;
}, { name: '', distance: 0 });

console.log('The winner is', winner.name, 'at', winner.distance);
