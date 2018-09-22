const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const GridView = function (container, gamestate, attemptsLeft) {
  this.container = container;
  this.gamestate = gamestate;
  this.attemptsLeft = attemptsLeft;
  //we might need to pass number of guesses
};

GridView.prototype.render = function (event) {

  //info
  const info = `Unleash your wrath player 2, it's time to sink the enemy fleet.
  A simple click on the grid will be enough, but be sure to aim well, you only have ${this.attemptsLeft} guesses. You have to sink 5 ships in total.`
  createAndAppend('h3', 'player-2-info', info, this.container)

  const gridTable = createAndAppend('table', 'grid-table', '', this.container);
  console.log(this.gamestate);
  for (let i = 0; i < this.gamestate.length; i++) {
    const row = createAndAppend('tr', null , '', gridTable);
    for (let j = 0; j < this.gamestate[0].length; j++) {
      const gameTileView = new GridTileView(row, i.toString() + j.toString(), this.gamestate[i][j]);
      gameTileView.bindEvents();
    }
  }
};

module.exports = GridView;
