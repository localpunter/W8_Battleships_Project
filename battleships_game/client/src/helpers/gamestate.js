const createGamestate = function (size) {
  const gamestate = [];
  const defaultGridEntry = 0;
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(defaultGridEntry);
    }
    gamestate.push(row);
  }

  return gamestate;
};


module.exports = createGamestate;
