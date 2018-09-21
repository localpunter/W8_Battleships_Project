const PubSub = require('../helpers/pub_sub.js');
const PubSub = require('../helpers/pub_sub.js');

const FormTileView = function (container, id) {
  this.container = container;
  this.id = id;
};

FormTileView.prototype.bindEvents = function () {
  this.form.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function (event) {
  PubSub.publish('FormTileView:tile-clicked', event);
};

module.exports = FormTileView;
