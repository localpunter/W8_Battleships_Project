const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');

const GridView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
};

GridView.prototype.render = function (event) {
  console.log('grid view rendering');
  const gridDiv = document.createElement('div');
  this.container.appendChild(gridDiv);
  for (let i = 0; i < this.gamestate.length; i++) {
    for (let j = 0; j < this.gamestate[0].length; j++) {
      const gameTileView = new GridTileView(gridDiv, i.toString() + j.toString());
      gameTileView.bindEvents();
    }
  }
};

module.exports = GridView;
