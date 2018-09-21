const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const GridTileView = function (container, id, status) {
  this.container = container;
  this.id = id;
  this.status = status;
  // pass status from grid_view and the model
};

GridTileView.prototype.bindEvents = function () {
  this.handleStatus()
  const gridTile = createAndAppend('td', this.id, this.status, this.container);
  gridTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

GridTileView.prototype.handleClick = function (event) {
  PubSub.publish('GridTileView:tile-clicked', event.target.id);  //pass id here event.target.id??
};

GridTileView.prototype.handleStatus = function () {
  if (this.status === 0) {
    this.status = "BLANK"
  } else if (this.status === 1) {
    this.status = "BLANK"
  } else if (this.status === 2) {
    this.status = "MISS"
  } else if (this.status === 3) {
    this.status = "HIT"
  }
};

module.exports = GridTileView;
