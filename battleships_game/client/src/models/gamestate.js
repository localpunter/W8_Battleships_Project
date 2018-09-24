const Gamestate = function (size) {
  this.size = size;
  this.player1 = [];
  this.player2 = [];
  this.shipsPlayer1 = 0;
  this.shipsPlayer2 = 0;
  this.attemptsPlayer1 = 0;
  this.attemptsPlayer2 = 0;
  this.hitsPlayer1 = 0;
  this.hitsPlayer2 = 0;
  this.turn = 1;
  this.reset();
}

Gamestate.prototype.reset = function () {
  const player1 = [];
  const player2 = [];
  const defaultEntry = 0;
  for (let i = 0; i < this.size; i++) {
    const row1 = [];
    const row2 = [];
    for (let j = 0; j < this.size; j++) {
      row1.push(defaultEntry);
      row2.push(defaultEntry);
    }
    player1.push(row1);
    player2.push(row2);
  }
  this.player1 = player1;
  this.player2 = player2;
  this.shipsPlayer1 = 0;
  this.shipsPlayer2 = 0;
  this.attemptsPlayer1 = 0;
  this.attemptsPlayer2 = 0;
  this.hitsPlayer1 = 0;
  this.hitsPlayer2 = 0;
  this.turn = 1;
};

module.exports = Gamestate;
