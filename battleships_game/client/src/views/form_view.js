const PubSub = require('../helpers/pub_sub.js');
const FormTileView = require('./form_tile_view.js');

const FormView = function (container, gamestate) {
  console.log(gamestate);
  this.container = container;
  this.gamestate = gamestate;
  console.log(this.gamestate);
};

FormView.prototype.render = function (event) {

  console.log('form view rendering');

  // create form div e
  const formDiv = document.createElement('div');
  // add form div to DOM
  this.container.appendChild(formDiv);
  console.log(this.gamestate);
  for (let i = 0; i < this.gamestate.length; i++) {
    for (let j = 0; j < this.gamestate[0].length; j++) {
      //creates tiles
      const formTileView = new FormTileView(formDiv, i.toString() + j.toString());
      //adds click events to tiles
      formTileView.bindEvents();
    }
  }

};


module.exports = FormView;
