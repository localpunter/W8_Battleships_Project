const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const FormTileView = function (container, id, status) {
  this.container = container;
  this.id = id;
  this.status = status;
  // pass status from form_view and the model
};

FormTileView.prototype.bindEvents = function () {
  // const wrapper = createAndAppend('div', 'table-wrapper', '', this.container)
  const formTile = createAndAppend('td', this.id, '', this.container);
  this.handleStatus(formTile)
  formTile.addEventListener('click', (event) => {
    this.handleClick(event);
  });
};

FormTileView.prototype.handleClick = function () {
  // console.log('target.id',event.target.id);
  PubSub.publish('FormTileView:tile-clicked', this.id);  //pass id here event.target.id??
};

FormTileView.prototype.handleStatus = function (parent) {
  if (this.status === 0) {
    const src = 'css/images/sea.jpeg';
    const emptyImage = createAndAppend('img', null, '', parent);
    emptyImage.src = src;

  } else {
    // this.status = "Ship"
    const src = 'css/images/ship.jpeg';
    const shipImage = createAndAppend('img', null, '', parent);
    shipImage.src = src;
  }
};

module.exports = FormTileView;
