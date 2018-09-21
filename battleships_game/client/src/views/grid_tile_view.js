const PubSub = require('../helpers/pub_sub.js');

const GridTileView = function (container, id) {
  this.container = container;
  this.id = id;
};

GridTileView.prototype.bindEvents = function () {
  //add click event
  const gridTile = document.createElement('div');
  this.container.appendChild(gridTile);

  gridTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

GridTileView.prototype.handleClick = function (event) {
  PubSub.publish('GridTileView:tile-clicked', event);  //pass id here event.target.id??
};


module.exports = GridTileView;
