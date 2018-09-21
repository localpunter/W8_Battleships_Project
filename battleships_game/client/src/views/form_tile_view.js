const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const FormTileView = function (container, id, status) {
  this.container = container;
  this.id = id;
  this.status = status;
  // pass status from form_view and the model
};

FormTileView.prototype.bindEvents = function () {
  this.handleStatus()
  const formTile = createAndAppend('td', this.id, this.status, this.container);
  formTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function (event) {
  PubSub.publish('FormTileView:tile-clicked', event.target.id);  //pass id here event.target.id??
};

FormTileView.prototype.handleStatus = function () {
  if (this.status === 0) {
    this.status = "Empty"
  } else {
    this.status = "Ship"
  }
};

module.exports = FormTileView;
