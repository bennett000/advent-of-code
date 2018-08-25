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

function tick(state, capabilities) {
  if (state.restRemaining) {
    state.restRemaining -= 1;
    if (state.restRemaining === 0) {
      state.runRemaining = capabilities.runTime;
    }
    return;
  }

  if (state.runRemaining) {
    state.distance += capabilities.speed;
    state.runRemaining -= 1;
  }

  if (state.runRemaining === 0) {
    state.restRemaining = capabilities.restTime;
  }
}

function createState(runTime) {
  return {
    distance: 0,
    restRemaining: 0,
    runRemaining: runTime,
  };
}

function race(totalTime, details) {
  const leaderboard = details.map(({ name, runTime }) => ({
    name,
    points: 0,
    state: createState(runTime),
  }));

  for (let i = 0; i < totalTime; i += 1) {
    details.forEach((detail, i) => {
      tick(leaderboard[i].state, detail);
    });

    const roundWinner = leaderboard.reduce((state, entry, i, board) => {
      if (board[state].state.distance > entry.state.distance) {
        return state;
      }
      return i;
    }, 0);

    leaderboard[roundWinner].points += 1;
  }

  return leaderboard;
}

const results = race(TOTAL_TIME, stats);

const winner = results.reduce((state, result) => {
  if (result.points > state.points) {
    return result;
  }

  return state;
}, { name: '', points: 0 });

console.log('The winner is', winner.name, 'with', winner.points);
