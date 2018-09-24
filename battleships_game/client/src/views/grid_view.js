const PubSub = require('../helpers/pub_sub.js');
const GridTileView = require('./grid_tile_view.js');
const createAndAppend = require('../helpers/create_append.js');

const GridView = function (container, gamestatePlayer1, gamestatePlayer2, turn) {
  this.container = container;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = turn

};

GridView.prototype.render = function (event) {

  //info
  const info = ""
  createAndAppend('h3', 'player-2-info', info, this.container)

  const form1 = createAndAppend('div', 'form1', '' , this.container);
  const form2 = createAndAppend('div', 'form2', '' , this.container);

  const formTable1 = createAndAppend('table', 'grid-table', '', form1)
  for (let i = 0; i < this.gamestatePlayer1.length; i++) {
    const row = createAndAppend('tr', null , '', formTable1)
    for (let j = 0; j < this.gamestatePlayer1[0].length; j++) {
      const formTileView = new GridTileView(row, "1" + i.toString() + j.toString(), this.gamestatePlayer1[i][j], this.turn);
      formTileView.bindEvents();
    }
  }

  const formTable2 = createAndAppend('table', 'grid-table', '', form2)
  for (let i = 0; i < this.gamestatePlayer2.length; i++) {
    const row = createAndAppend('tr', null , '', formTable2)
    for (let j = 0; j < this.gamestatePlayer2[0].length; j++) {
      const formTileView = new FormTileView(row, "2" + i.toString() + j.toString(), this.gamestatePlayer2[i][j], this.turn);
      formTileView.bindEvents();
    }
  }



  // const gridTable = createAndAppend('table', 'grid-table', '', this.container);
  // console.log(this.gamestate);
  // for (let i = 0; i < this.gamestate.length; i++) {
  //   const row = createAndAppend('tr', null , '', gridTable);
  //   for (let j = 0; j < this.gamestate[0].length; j++) {
  //     const gameTileView = new GridTileView(row, i.toString() + j.toString(), this.gamestate[i][j]);
  //     gameTileView.bindEvents();
  //   }
  // }
};

module.exports = GridView;
