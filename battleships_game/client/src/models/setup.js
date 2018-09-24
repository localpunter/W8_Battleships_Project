const PubSub = require('../helpers/pub_sub.js');
const FormView = require('../views/form_view.js')
const createGamestate = require('../helpers/gamestate.js');

const Setup = function (container, gamestatePlayer1, gamestatePlayer2) {
  this.container = container;
  this.counterPlayer1 = 0;
  this.counterPlayer2 = 0;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = 1;
  this.id = "";
};

Setup.prototype.bindEvents = function () {
  PubSub.subscribe('FormTileView:tile-clicked', (event) => {
    console.log("id passed to form", event.detail);
    this.id = event.detail;
    this.updateGamestate();
  });
  PubSub.subscribe('ResultView:play-again', (event) => {
    console.log('receiving play again');
    console.log('event detail from play-again',event.detail);
    if (event.detail) {
      this.reset();
      this.render();
    }
  })
};


Setup.prototype.updateGamestate = function () {
  console.log("updating gamestate");
  const tileRow = parseInt(this.id[1]);
  const tileCol = parseInt(this.id[2]);
  if (this.turn === 1) {
    if (this.gamestatePlayer1[tileRow][tileCol] === 0) {
      this.gamestatePlayer1[tileRow][tileCol] = 1;
      this.counterPlayer1 += 1;
    } else if (this.gamestatePlayer1[tileRow][tileCol] === 1) {
      this.gamestatePlayer1[tileRow][tileCol] = 0;
      this.counterPlayer1 -= 1;
    }
  } else if (this.turn === 2) {
    if (this.gamestatePlayer2[tileRow][tileCol] === 0) {
      this.gamestatePlayer2[tileRow][tileCol] = 1;
      this.counterPlayer2 += 1;
    } else if (this.gamestatePlayer1[tileRow][tileCol] === 1) {
      this.gamestatePlayer2[tileRow][tileCol] = 0;
      this.counterPlayer2 -= 1;
    }

  }



  // now check counter is not over number of ships required
  // dummy 1 used for now to check functionality
  // intended to be 5 for MVP
  if (this.counterPlayer1 < 5 || this.counterPlayer2 < 5) {
    console.log("still setting up");
    // then continue to render form until enough tiles clicked
    // but first check counter1 and change turn
    if (this.counterPlayer1 === 5) {
      console.log("change turn");
      this.turn = 2;
    }
    this.render();
  } else {
    // enough boats set / tiles clicked so publish table ready
    PubSub.publish('Setup:table-ready', this.gamestatePlayer1, this.gamestatePlayer2);
  }
};

Setup.prototype.render = function () {
  this.container.innerHTML = '';
  console.log('set up rendering');
  const formView = new FormView(this.container, this.gamestatePlayer1, this.gamestatePlayer2, this.turn);
  formView.render();
}

Setup.prototype.reset = function () {
  this.counterPlayer1 = 0;
  this.counterPlayer2 = 0;
  this.gamestatePlayer1 = createGamestate(6)
  this.gamestatePlayer2 = createGamestate(6)
  this.turn = 1;
  this.id = "";
};

module.exports = Setup;
