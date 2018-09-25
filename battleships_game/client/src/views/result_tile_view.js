
const createAndAppend = require('../helpers/create_append.js');

const ResultTileView = function (container, id, status, turn) {
  this.container = container;
  this.id = id;
  this.status = status;
  this.turn = turn;
};

ResultTileView.prototype.bindEvents = function () {
  const gridTile = createAndAppend('td', this.id, '', this.container);
  this.handleStatus(gridTile);
};



ResultTileView.prototype.handleStatus = function (parent) {
  if (this.status === 0) {
    const src = 'css/images/sea1.svg';
    const emptyImage = createAndAppend('img', null, '', parent);
    emptyImage.src = src;
  }
  else if (this.status === 1) {
    const src = 'css/images/ship.svg';
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

module.exports = ResultTileView;
