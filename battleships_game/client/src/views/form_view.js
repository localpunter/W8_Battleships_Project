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
  // info

  const info = "Welcome to Battleships player 1, your mission is to hide your ships well in this grid so that you can emerge victorious from the rage of player 2. You have 5 ships to place and to do it you just have to click at the tiles"

  createAndAppend('h3', 'game-info', info , this.container)
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
