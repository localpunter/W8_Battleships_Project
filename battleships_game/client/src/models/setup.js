const PubSub = require('../helpers/pub_sub.js');
const FormView = require('../views/form_view.js')

const Setup = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
  this.id = "";
};

Setup.prototype.bindEvents = function () {
  PubSub.subscribe('FormTileView:tile-clicked', (event) => {
    this.id = event.detail;
    this.updateGamestate();
  });
  PubSub.subscribe('ResultView:play-again', (event) => {
    if (event.detail) {
      this.gamestate.reset();
      this.render();
    }
  })
};


Setup.prototype.updateGamestate = function () {
  const tileRow = parseInt(this.id[1]);
  const tileCol = parseInt(this.id[2]);
  if (this.gamestate.turn === 1) {
    if (this.gamestate.player1[tileRow][tileCol] === 0) {
      this.gamestate.player1[tileRow][tileCol] = 1;
      this.gamestate.shipsPlayer1 += 1;
    } else if (this.gamestate.player1[tileRow][tileCol] === 1) {
      this.gamestate.player1[tileRow][tileCol] = 0;
      this.gamestate.shipsPlayer1 -= 1;
    }
  } else if (this.gamestate.turn === 2) {
    if (this.gamestate.player2[tileRow][tileCol] === 0) {
      this.gamestate.player2[tileRow][tileCol] = 1;
      this.gamestate.shipsPlayer2 += 1;
    } else if (this.gamestate.player2[tileRow][tileCol] === 1) {
      this.gamestate.player2[tileRow][tileCol] = 0;
      this.gamestate.shipsPlayer2 -= 1;
    }

  }

  if (this.gamestate.shipsPlayer1 < 5 || this.gamestate.shipsPlayer2 < 5) {
    // var backgroundMusic = new Audio('sounds/seagulls.wav');
    // backgroundMusic.play();
    // then continue to render form until enough tiles clicked
    // but first check counter1 and change turn
    if (this.gamestate.shipsPlayer1 === 5) {
      this.gamestate.turn = 2;
    }
    this.render();
  } else {
    // enough boats set / tiles clicked so publish table ready
    this.gamestate.turn = 1;
    PubSub.publish('Setup:table-ready', this.gamestate);
  }
};

Setup.prototype.render = function () {
  this.container.innerHTML = '';
  const formView = new FormView(this.container, this.gamestate);
  formView.render();
};

module.exports = Setup;
