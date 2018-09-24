const PubSub = require('../helpers/pub_sub.js');
const FormTileView = require('./form_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const FormView = function (container, gamestate1, gamestate2, turn) {
  this.container = container;
  this.gamestate1 = gamestate1;
  this.gamestate2 = gamestate2;
  this.turn = turn;
};

FormView.prototype.render = function (event) {
  console.log('form view rendering');

  const info = "Welcome to Battleships player 1, your mission is to hide your ships well in this grid so that you can emerge victorious from the rage of player 2. You have 5 ships to place and to do it you just have to click at the tiles"
  createAndAppend('h3', 'game-info', info , this.container)

  form1 = createAndAppend('div', 'form1', '' , this.container)
  form2 = createAndAppend('div', 'form2', '' , this.container)


  const formTable1 = createAndAppend('table', 'form-table', '', form1)
  const turn1 = this.turn == 1 ? true : false;
  for (let i = 0; i < this.gamestate1.length; i++) {
    const row = createAndAppend('tr', null , '', formTable1)
    for (let j = 0; j < this.gamestate1[0].length; j++) {
      const formTileView = new FormTileView(row, i.toString() + j.toString(), this.gamestate1[i][j], turn1);
      formTileView.bindEvents();
    }
  }

  const formTable2 = createAndAppend('table', 'form-table', '', form2)
  const turn2 = this.turn == 2 ? true : false;
  for (let i = 0; i < this.gamestate2.length; i++) {
    const row = createAndAppend('tr', null , '', formTable2)
    for (let j = 0; j < this.gamestate2[0].length; j++) {
      const formTileView = new FormTileView(row, i.toString() + j.toString(), this.gamestate2[i][j], turn2);
      formTileView.bindEvents();
    }
  }

};


module.exports = FormView;
