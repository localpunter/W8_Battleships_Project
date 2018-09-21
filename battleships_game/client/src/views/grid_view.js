const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const GridView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
};

GridView.prototype.render = function (event) {
  const gridTable = createAndAppend('table', 'grid-table', '', this.container)
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
