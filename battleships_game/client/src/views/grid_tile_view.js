const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const GridTileView = function (container, id, status, turn) {
  this.container = container;
  this.id = id;
  this.status = status;
  this.turn = turn;
};

GridTileView.prototype.bindEvents = function () {
  const gridTile = createAndAppend('td', this.id, '', this.container);
  this.handleStatus(gridTile);
  if (this.turn !== parseInt(this.id[0])) {
    gridTile.addEventListener('click', (event) => {
      this.handleClick(event);
    });
  }
};

GridTileView.prototype.handleClick = function () {
  PubSub.publish('GridTileView:tile-clicked', this.id);
};

GridTileView.prototype.handleStatus = function (parent) {
  if (this.status <= 1) {
    const src = 'css/images/sea1.svg';
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
