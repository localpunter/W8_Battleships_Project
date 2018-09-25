const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

// const Game = function (container, gamestatePlayer1, gamestatePlayer2) {
const Game = function (container, gamestate) {
  this.container = container;
  // this.attemptCounterPlayer1 = 0;
  // this.attemptCounterPlayer2 = 0;
  // this.hitCounterPlayer1 = 0;
  // this.hitCounterPlayer2 = 0;
  // this.gamestatePlayer1 = gamestatePlayer1;
  // this.gamestatePlayer2 = gamestatePlayer2;
  // this.turn = 1; // player2 board active
  this.gamestate = gamestate;
  this.id = "";
};

Game.prototype.bindEvents = function () {

  PubSub.subscribe('IntermediateView:game-ready', (event) => {
    // console.log(event.detail);
    // console.log(event.detail[0]);
    // console.log(event.detail[1]);
    // this.gamestatePlayer1 = event.detail[0];
    // this.gamestatePlayer2 = event.detail[1];
    this.render();
  });

  PubSub.subscribe('GridTileView:tile-clicked', (event) => {

    console.log("id passed on click:", event.detail);
    this.id = event.detail
    const tileRow = parseInt(this.id[1]);
    const tileCol = parseInt(this.id[2]);

    if (this.gamestate.turn === 1) {
      if (this.gamestate.player2[tileRow][tileCol] < 2) {
        this.updateGameState();
        console.log('gamestate player 2 board', this.gamestate.player2);
      }
      console.log("change turn to 2");
    } else {
      if (this.gamestate.player1[tileRow][tileCol] < 2) {
        this.updateGameState();
        console.log('gamestate player 1 board', this.gamestate.player1);
      }
      console.log("change turn to 1");
    }


  });


  PubSub.subscribe('ResultView:play-again', (event) => {

    // this.gamestate.reset(); //*********************MIGHT NEED THIS??
    // if (event.detail) {
    //   this.attemptCounterPlayer1 = 0;
    //   this.attemptCounterPlayer2 = 0;
    //   this.hitCounterPlayer1 = 0;
    //   this.hitCounterPlayer2 = 0;
    //   this.turn = 1; // player2 board active
    //   this.id = "";
    // }

  });

};

Game.prototype.updateGameState = function () {

  const tileRow = parseInt(this.id[1]);
  const tileCol = parseInt(this.id[2]);

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
    if (this.gamestate.hitsPlayer2 < 5) {
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
    if (this.gamestate.hitsPlayer1 < 5) {
      this.gamestate.turn = 1;
      this.render();
    } else {
      this.result();
    }
  }

};

Game.prototype.render = function() {
  this.container.innerHTML = '';
  console.log('game rendering');
  // const gridView = new GridView(this.container, this.gamestatePlayer1, this.gamestatePlayer2, this.turn);
  const gridView = new GridView(this.container, this.gamestate);
  gridView.render();
};


Game.prototype.result = function() {
  PubSub.publish('Game:result', this.gamestate);
};

module.exports = Game;
