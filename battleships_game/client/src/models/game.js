const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

const Game = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
  this.id = "";
};

Game.prototype.bindEvents = function () {

  PubSub.subscribe('IntermediateView:game-ready', (event) => {
    this.render();
  });

  PubSub.subscribe('GridTileView:tile-clicked', (event) => {

    this.id = event.detail;
    const tileRow = parseInt(this.id[1]);
    const tileCol = parseInt(this.id[2]);


    if (this.gamestate.turn === 1) {
      if (this.gamestate.player2[tileRow][tileCol] < 2) {
        this.updateGameState(tileRow, tileCol);
      }
    } else {
      if (this.gamestate.player1[tileRow][tileCol] < 2) {
        this.updateGameState(tileRow, tileCol);
      }
    }


  });

};

Game.prototype.updateGameState = function (tileRow, tileCol) {

  if (this.gamestate.turn === 1) {
    if (this.gamestate.player2[tileRow][tileCol] === 0) {
      this.gamestate.attemptsPlayer2 += 1;
      this.gamestate.player2[tileRow][tileCol] = 2;
      var empty = new Audio('sounds/empty.wav');
      empty.play();
    } else if (this.gamestate.player2[tileRow][tileCol] === 1) {
      this.gamestate.player2[tileRow][tileCol] = 3;
      var hit = new Audio('sounds/hit.wav');
      hit.play();
      this.gamestate.hitsPlayer2 += 1;
    }
    if (this.gamestate.hitsPlayer2 < 17) {
      this.gamestate.turn = 2;
      this.render();
    } else {
      this.result();
    }


  } else if (this.gamestate.turn === 2) {
    if (this.gamestate.player1[tileRow][tileCol] === 0) {
      this.gamestate.attemptsPlayer1 += 1;
      this.gamestate.player1[tileRow][tileCol] = 2;
      var empty = new Audio('sounds/empty.wav');
      empty.play();
    } else if (this.gamestate.player1[tileRow][tileCol] === 1) {
      this.gamestate.player1[tileRow][tileCol] = 3;
      var hit = new Audio('sounds/hit.wav');
      hit.play();
      this.gamestate.hitsPlayer1 += 1;
    }
    if (this.gamestate.hitsPlayer1 < 17) {
      this.gamestate.turn = 1;
      this.render();
    } else {
      this.result();
    }
  }

};

Game.prototype.render = function() {
  this.container.innerHTML = '';
  const gridView = new GridView(this.container, this.gamestate);
  gridView.render();
};


Game.prototype.result = function() {
  PubSub.publish('Game:result', this.gamestate);
};

module.exports = Game;
