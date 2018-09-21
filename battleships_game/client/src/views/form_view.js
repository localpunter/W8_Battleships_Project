const PubSub = require('../helpers/pub_sub.js');
const PubSub = require('./form_tile_view.js');

const FormView = function (container) {
  this.container = container;
};

FormView.prototype.bindEvents = function () {

  PubSub.subscribe('Setup:not-ready', (event) => {
    FormView.render(event);
  });

};

FormView.prototype.render = function (event) {

  //create form div element
  // formDiv =
  // add form div to DOM
  formState = [[1,1],[1,1]]; // update to get state from events
  for (let i = 0; i < formState.length; i++) {
    for (let j = 0; j < formState[0].length; j++) {
      const formTileView = new FormTileView(formDiv, i.toString() + j.toString());
      formTileView.bindEvents();
    }
  }

};


module.exports = FormView;
