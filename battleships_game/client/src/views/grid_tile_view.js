const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const GridTileView = function (container, id, status) {
  this.container = container;
  this.id = id;
  this.status = status;
  // pass status from grid_view and the model
};

GridTileView.prototype.bindEvents = function () {
  const gridTile = createAndAppend('td', this.id, '', this.container);

  this.handleStatus(gridTile)
  gridTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

GridTileView.prototype.handleClick = function () {
  PubSub.publish('GridTileView:tile-clicked', this.id);  //pass id here event.target.id??
};

GridTileView.prototype.handleStatus = function (parent) {
  if (this.status <= 1) {
    const src = 'css/images/sea.svg';
    const emptyImage = createAndAppend('img', null, '', parent);
    emptyImage.src = src;
  } else if (this.status === 2) {
    const src = 'css/images/miss1.svg';
    const missImage = createAndAppend('img', null, '', parent);
    missImage.src = src;
  } else if (this.status === 3) {
    const src = 'css/images/hit.svg';
    const hitImage = createAndAppend('img', null, '', parent);
    hitImage.src = src;
  }
};

module.exports = GridTileView;
