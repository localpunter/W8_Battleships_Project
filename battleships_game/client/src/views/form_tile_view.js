const PubSub = require('../helpers/pub_sub.js');

const FormTileView = function (container, id) {
  this.container = container;
  this.id = id;
};

FormTileView.prototype.bindEvents = function () {
  formTile = //create element and add to dom
  formTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function (event) {
  PubSub.publish('FormTileView:tile-clicked', event);  //pass id here event.target.id??
};

module.exports = FormTileView;
