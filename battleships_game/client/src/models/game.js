const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

const Game = function (container, gamestatePlayer1, gamestatePlayer2) {
  this.container = container;
  this.attemptCounterPlayer1 = 0;
  this.attemptCounterPlayer2 = 0;
  this.hitCounterPlayer1 = 0;
  this.hitCounterPlayer2 = 0;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = 1;
  this.id;
};

Game.prototype.bindEvents = function () {

  PubSub.subscribe('IntermediateView:game-ready', (event) => {
    this.gamestatePlayer1 = event.detail[0];
    this.gamestatePlayer2 = event.detail[1];
    this.render();
  });

  //should be working
  PubSub.subscribe('GridTileView:tile-clicked', (event) => {
    this.id = event.detail
    const tileRow = parseInt(this.id[1]);
    const tileCol = parseInt(this.id[2]);

    if (this.turn === 1) {
      //do stuff on gamestatePlayer1
      // if the tile has been used already doesn't do anything, just when is 0 or 1
      if (this.gamestatePlayer1[tileRow][tileCol] < 2) {
        this.updateGameState();
        this.turn = 2;
      }

    } else {
      if (this.gamestatePlayer2[tileRow][tileCol] < 2) {
        this.updateGameState();
        this.turn = 1;
      }
    }


  });


  PubSub.subscribe('ResultView:play-again', (event) => {

    if (event.detail) {
      this.attemptCounterPlayer1 = 0; //I'm not sure if we need it or just the attemps left(maybe for stadistics?)
      this.attemptCounterPlayer2 = 0;
      this.hitCounterPlayer1 = 0;
      this.hitCounterPlayer2 = 0;
      this.turn = []
      // remember to change this if we change the number of attempts depending on size and ships
    }
  });
};

Game.prototype.updateGameState = function (gamestate, attemptCounter, hitCounter) {

  if (this.turn === 1) {
    if (this.gamestatePlayer1[tileRow][tileCol] === 0) {
      this.attemptCounterPlayer1 += 1;
      this.gamestatePlayer1[tileRow][tileCol] = 2;
    } else if (this.gamestatePlayer1[tileRow][tileCol] === 1) {
      this.gamestatePlayer1[tileRow][tileCol] = 3;
      this.hitCounterPlayer1 += 1;
    }
    if (this.hitCounterPlayer1 < 5) {
      this.render();
    } else {
      this.result();
    }


  } else if (this.turn === 2) {
    if (this.gamestatePlayer2[tileRow][tileCol] === 0) {
      this.attemptCounterPlayer2 += 1;
      this.gamestatePlayer2[tileRow][tileCol] = 2;
    } else if (this.gamestatePlayer2[tileRow][tileCol] === 1) {
      this.gamestatePlayer2[tileRow][tileCol] = 3;
      this.hitCounterPlayer2 += 1;
    }
    if (this.hitCounterPlayer2 < 5) {
      this.render();
    } else {
      this.result();
    }
  }

};

// Game.prototype.handleNewGame = function () {
//   PubSub.subscribe('ResultView:play-again', (event) => {
//     if (event.details) {
//       console.log('gamestate in game', this.gamestate, this.hitCounter, this.attemptsLeft);
//     }
//   })
// };

Game.prototype.render = function () {
  this.container.innerHTML = '';
  console.log('game rendering');
  const gridView = new GridView(this.container, this.gamestatePlayer1, this.gamestatePlayer2);
  gridView.render();
}


Game.prototype.result = function () {
  PubSub.publish('Game:result', this.turn )
}

module.exports = Game;
