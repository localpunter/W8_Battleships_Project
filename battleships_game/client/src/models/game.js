const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

const Game = function (container, gamestatePlayer1, gamestatePlayer2) {
  this.container = container;
  this.attemptCounterPlayer1 = 0; //I'm not sure if we need it or just the attemps left(maybe for stadistics?)
  this.attemptCounterPlayer2 = 0;
  // this.attemptsLeft = 15 ; // We can change this, just a number to try
  this.hitCounterPlayer1 = 0;
  this.hitCounterPlayer2 = 0;
  this.gamestatePlayer1 = gamestatePlayer1; // this will later be updated by setup
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = []; // it will have [1, 2], meaning player 1 and player 2, first turn will get it from setup
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('IntermediateView:to-player2', (event) => {
    this.gamestate = event.detail;
    this.render();
  });
  PubSub.subscribe('GridTileView:tile-clicked', (event) => {
    this.turn = event.detail.turn
    const tileRow = parseInt(tileIdString[1]);
    const tileCol = parseInt(tileIdString[2]);

    if (this.turn === 1) {
      //do stuff on gamestatePlayer1
      // if the tile has been used already doesn't do anything, just when is 0 or 1
      if (this.gamestatePlayer1[tileRow][tileCol] < 2) {
        this.updateGameState(this.gamestatePlayer1, this.attemptCounterPlayer1, this.hitCounterPlayer1 );
        this.turn = 2;
      }

    } else {
      if (this.gamestatePlayer2[tileRow][tileCol] < 2) {
        this.updateGameState(this.gamestatePlayer2, this.attemptCounterPlayer2, this.hitCounterPlayer2 );
        this.turn = 1;
      }
    }


  });

  PubSub.subscribe('ResultView:play-again', (event) => {

    if (event.detail) {
      this.hitCounter = 0;
      this.attemptsLeft = 15;
      // remember to change this if we change the number of atems depending on size and ships
    }
  });
};

Game.prototype.updateGameState = function (gamestate, attemptCounter, hitCounter) {
  attemptCounter += 1;

  const tileIdString = event.detail.info;
  // comes as a string though so need to convert
  //check current state of corresponding tile
  const currentState = gamestate[tileRow][tileCol];
  // change state of tile accordingly
  //this may need to change depending on coding for states
  // i assume for now there are 4 which are:
  // 0 = no boat - no attempted bombing
  // 1 = boat - no attempted bombing
  // 2 = no boat - attempted bombing [MISS]
  // 3 = boat - attempted bombing [HIT]
  if (currentState === 0) {
    // 0 = no boat - no attempted bombing
    // so change to 1 as now no boat [MISS]
    // no change to counter as missed
    attemptCounter += 1;
    gamestate[tileRow][tileCol] = 2;
  } else if (currentState === 1) {
    // 1 = boat - no attempted bombing
    // so change to 3 as hit boat [HIT]
    // and add to counter
    gamestate[tileRow][tileCol] = 3;
    hitCounter += 1;
  }
  // else if (currentState === 2) {
    // 2 = no boat - attempted bombing [MISS]
    // so no change as attempted same tile as previous MISS
    // no change to counter as still a MISS
  // } else if (currentState === 3) {
    // 3 = boat - attempted bombing [HIT]
    // so no change as attempted same tile as previous HIT
    // no change to counter as still a HIT
  // }
  // now check counter is not over number of ships required
  // dummy 1 used for now to check functionality
  // intended to be 5 for MVP - if we use 5 ships of size 1
  if (hitCounter < 5) {
    // then continue to render game until enough hits
    this.render(gamestate);
  } else {
    // enough hits so deal with finish game
    this.result();
  }

};

Game.prototype.handleNewGame = function () {
  PubSub.subscribe('ResultView:play-again', (event) => {
    if (event.details) {
      console.log('gamestate in game', this.gamestate, this.hitCounter, this.attemptsLeft);
    }
  })
};

Game.prototype.render = function () {
  this.container.innerHTML = '';
  console.log('game rendering');
  const gridView = new GridView(this.container, this.gamestate, this.attemptsLeft);
  console.log('attemptsLeft:', this.attemptsLeft);
  gridView.render();
}

Game.prototype.result = function () {
  // Publish to a ResultView, if attemptsLeft < 1 player 1 wins, otherwise player 2
  PubSub.publish('Game:result', this.attemptsLeft )
}

module.exports = Game;
