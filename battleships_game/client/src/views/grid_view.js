const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const GridView = function (container, gamestatePlayer1, gamestatePlayer2, turn) {
  this.container = container;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = turn;

};

GridView.prototype.render = function (event) {

  //info
  const info = ""
  createAndAppend('h3', 'player-2-info', info, this.container)

  const grid1 = createAndAppend('div', 'grid1', '' , this.container);
  const grid2 = createAndAppend('div', 'grid2', '' , this.container);

  const gridTable1 = createAndAppend('table', 'grid-table', '', grid1)
  for (let i = 0; i < this.gamestatePlayer1.length; i++) {
    const row = createAndAppend('tr', null , '', gridTable1)
    for (let j = 0; j < this.gamestatePlayer1[0].length; j++) {
      const gridTileView = new GridTileView(row, "1" + i.toString() + j.toString(), this.gamestatePlayer1[i][j], this.turn);
      gridTileView.bindEvents();
    }
  }

  const gridTable2 = createAndAppend('table', 'grid-table', '', grid2)
  for (let i = 0; i < this.gamestatePlayer2.length; i++) {
    const row = createAndAppend('tr', null , '', gridTable2)
    for (let j = 0; j < this.gamestatePlayer2[0].length; j++) {
      const gridTileView = new GridTileView(row, "2" + i.toString() + j.toString(), this.gamestatePlayer2[i][j], this.turn);
      gridTileView.bindEvents();
    }
  }

};

module.exports = GridView;
