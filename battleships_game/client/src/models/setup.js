const FormView = require('./views/form_view.js')
const PubSub = require('../helpers/pub_sub.js');

const Setup = function (container) {
  this.container = container;
  this.counter = 0;
  this.gameState = [[0,0],[0,0]];
};

Setup.prototype.bindEvents = function () {

  PubSub.subscribe('EmptyTileView:tile-clicked', (event) => {
    // deal with counter
    //get id
    //check current state of corresponding tile
    //change state of tile
    //change counter
    if (this.counter < 5) {
      this.render();
    } else {
      PubSub.publish('Setup:table-ready', array);
    }
  });

};

Setup.prototype.render = function () {

  const formView = new FormView(this.container);
  formView.bindEvents();

}


module.exports = Setup;
