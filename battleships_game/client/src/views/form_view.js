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

  const info = ""
  createAndAppend('h3', 'game-info', info , this.container)

  const form1 = createAndAppend('div', 'form1', '' , this.container)
  const form2 = createAndAppend('div', 'form2', '' , this.container)

  const formTable1 = createAndAppend('table', 'form-table', '', form1)
  for (let i = 0; i < this.gamestate1.length; i++) {
    const row = createAndAppend('tr', null , '', formTable1)
    for (let j = 0; j < this.gamestate1[0].length; j++) {
      const formTileView = new FormTileView(row, "1" + i.toString() + j.toString(), this.gamestate1[i][j], this.turn);
      formTileView.bindEvents();
    };
  };

  const formTable2 = createAndAppend('table', 'form-table', '', form2)
  for (let i = 0; i < this.gamestate2.length; i++) {
    const row = createAndAppend('tr', null , '', formTable2)
    for (let j = 0; j < this.gamestate2[0].length; j++) {
      const formTileView = new FormTileView(row, "2" + i.toString() + j.toString(), this.gamestate2[i][j], this.turn);
      formTileView.bindEvents();
    };
  };
};

module.exports = FormView;
