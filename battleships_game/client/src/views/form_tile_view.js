const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const FormTileView = function (container, id) {
  this.container = container;
  this.id = id;
  this.status = 'Empty';
  // pass status from form_view and the model
};

FormTileView.prototype.bindEvents = function () {
  const formTile = createAndAppend('td', this.id, this.status, this.container);
  formTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function (event) {
  PubSub.publish('FormTileView:tile-clicked', event);  //pass id here event.target.id??
};

module.exports = FormTileView;
