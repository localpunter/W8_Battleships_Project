const PubSub = require('../helpers/pub_sub.js');
const FormTileView = require('./form_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const FormView = function (container, gamestate) {
  console.log(gamestate);
  this.container = container;
  this.gamestate = gamestate;
  console.log(this.gamestate);
};

FormView.prototype.render = function (event) {
  console.log('form view rendering');

  const formTable = createAndAppend('table', 'form-table', '', this.container)
  console.log(this.gamestate);
  for (let i = 0; i < this.gamestate.length; i++) {
    const row = createAndAppend('tr', null , '', formTable)
    for (let j = 0; j < this.gamestate[0].length; j++) {      
      const formTileView = new FormTileView(row, i.toString() + j.toString(), this.gamestate[i][j]);
      formTileView.bindEvents();
    }
  }
};


module.exports = FormView;
