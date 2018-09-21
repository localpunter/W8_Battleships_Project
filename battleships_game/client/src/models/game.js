const GridView = require('../views/grid_view.js')
const PubSub = require('../helpers/pub_sub.js');

const Game = function (container) {
  this.container = container;
  this.gamestate = [[0,0],[0,0]]; // nneds to be passed from setup

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
