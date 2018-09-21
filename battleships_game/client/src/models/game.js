const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

const Game = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate; // this will later be updated by setup
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('Setup:table-ready', (event) => {
  });
  PubSub.subscribe('GridTileView:tile-clicked', (event) => {
  });
};

Game.prototype.render = function () {
  console.log('game rendering');
  const gridView = new GridView(this.container, this.gamestate);
  gridView.render();
}

module.exports = Game;
