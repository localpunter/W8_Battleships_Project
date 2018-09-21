const PubSub = require('../helpers/pub_sub.js');

const FormTileView = function (container, id) {
  this.container = container;
  this.id = id;
};

FormTileView.prototype.bindEvents = function () {
  const formTile = document.createElement('div');
  this.container.appendChild(formTile);
  formTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function (event) {
  PubSub.publish('FormTileView:tile-clicked', event);  //pass id here event.target.id??
};

module.exports = FormTileView;
