const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const GridView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;

};

GridView.prototype.render = function (event) {

  createAndAppend('h2', `turn-info-${this.gamestate.turn}`, `Player ${this.gamestate.turn} turn`, this.container);

  const info = "shoot here";

  const grid1 = createAndAppend('div', 'grid1', '', this.container);
  createAndAppend('h3', 'player-2-info', `Player 2 ${info}`, grid1)

  const grid2 = createAndAppend('div', 'grid2', '', this.container)
  createAndAppend('h3', 'player-1-info', `Player 1 ${info}`, grid2)

  const gridTable1 = createAndAppend('table', 'grid-table', '', grid1)
  for (let i = 0; i < this.gamestate.player1.length; i++) {
    const row = createAndAppend('tr', null , '', gridTable1)
    for (let j = 0; j < this.gamestate.player1[0].length; j++) {
      const gridTileView = new GridTileView(row, "1" + i.toString() + j.toString(), this.gamestate.player1[i][j], this.gamestate.turn);
      gridTileView.bindEvents();
    }
  }

  const gridTable2 = createAndAppend('table', 'grid-table', '', grid2)
  for (let i = 0; i < this.gamestate.player2.length; i++) {
    const row = createAndAppend('tr', null , '', gridTable2)
    for (let j = 0; j < this.gamestate.player2[0].length; j++) {
      const gridTileView = new GridTileView(row, "2" + i.toString() + j.toString(), this.gamestate.player2[i][j], this.gamestate.turn);
      gridTileView.bindEvents();
    }
  }

};

module.exports = GridView;
