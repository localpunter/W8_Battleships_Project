const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const FormTileView = function (container, id, status, turn) {
  this.container = container;
  this.id = id;
  this.status = status;
  this.turn = turn;
};

FormTileView.prototype.bindEvents = function () {
  const formTile = createAndAppend('td', this.id, '', this.container);
  this.handleStatus(formTile)
  if (this.turn === parseInt(this.id[0])) {
    formTile.addEventListener('click', (event) => {
      this.handleClick(event);
    });
  }
};

FormTileView.prototype.handleClick = function () {
  PubSub.publish('FormTileView:tile-clicked', this.id);
};

FormTileView.prototype.handleStatus = function (parent) {
  if (this.turn !== parseInt(this.id[0])) {
    const src = 'css/images/sea.jpeg';
    const emptyImage = createAndAppend('img', null, '', parent);
    emptyImage.src = src;

  } else if (this.status === 0) {
    const src = 'css/images/sea.jpeg';
    const emptyImage = createAndAppend('img', null, '', parent);
    emptyImage.src = src;
  } else {
    const src = 'css/images/ship.jpeg';
    const shipImage = createAndAppend('img', null, '', parent);
    shipImage.src = src;
  }
};

module.exports = FormTileView;
