const FormView = require('./views/form_view.js')
const PubSub = require('../helpers/pub_sub.js');

const Setup = function (container) {
  this.container = container;
  this.counter = 0;
};

Setup.prototype.bindEvents = function () {

  PubSub.subscribe('EmptyTileView:tile-clicked', (event) => {
    // deal with counter
    // if else - submit
  });

  PubSub.subscribe('ListItemView:status-changed', (event) => {

  });

  PubSub.subscribe('ListFormView:item-submitted', (evt) => {

  })

};

Setup.prototype.render = function () {

  const formView = new FormView(this.container);
  formView.bindEvents();

}


module.exports = Setup;
