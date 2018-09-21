const PubSub = require('../helpers/pub_sub.js');
const FormTileView = require('./form_tile_view.js');

const FormView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
};

// FormView.prototype.bindEvents = function () {
//
//   console.log('form view binding events');

  // PubSub.subscribe('Setup:not-ready', (event) => {
  //   FormView.render(event);
  // });

// };

FormView.prototype.render = function (event) {

  console.log('form view rendering');

  // create form div element
  // formDiv =
  // add form div to DOM
  formState = [[1,1],[1,1]]; // update to get state from events
  for (let i = 0; i < formState.length; i++) {
    for (let j = 0; j < formState[0].length; j++) {
      //creates tiles
      const formTileView = new FormTileView(formDiv, i.toString() + j.toString());
      //adds click events to tiles
      formTileView.bindEvents();
    }
  }

};


module.exports = FormView;
