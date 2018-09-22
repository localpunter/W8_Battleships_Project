const PubSub = require('../helpers/pub_sub.js');
const GridView = require('../views/grid_view.js')

const Game = function (container, gamestate) {
  this.container = container;
  this.attemptCounter = 0; //I'm not sure if we need it or just the attemps left(maybe for stadistics?)
  this.attemptsLeft = 15 ; // We can change this, just a number to try
  this.hitCounter = 0;
  this.gamestate = gamestate; // this will later be updated by setup
};

Game.prototype.bindEvents = function () {
  PubSub.subscribe('IntermediateView:to-player2', (event) => {
    this.gamestate = event.detail;
    this.render();
  });
  PubSub.subscribe('GridTileView:tile-clicked', (event) => {
    this.attemptCounter += 1;
    console.log("id passed to game", event.detail);
    const tileIdString = event.detail;
    // comes as a string though so need to convert
    const tileRow = parseInt(tileIdString[0]);
    const tileCol = parseInt(tileIdString[1]);
    //check current state of corresponding tile
    const currentState = this.gamestate[tileRow][tileCol];
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
      this.attemptCounter += 1;
      this.attemptsLeft -= 1;
      this.gamestate[tileRow][tileCol] = 2;
    } else if (currentState === 1) {
      // 1 = boat - no attempted bombing
      // so change to 3 as hit boat [HIT]
      // and add to counter
      this.gamestate[tileRow][tileCol] = 3;
      this.hitCounter += 1;
    } else if (currentState === 2) {
      // 2 = no boat - attempted bombing [MISS]
      // so no change as attempted same tile as previous MISS
      // no change to counter as still a MISS
    } else if (currentState === 3) {
      // 3 = boat - attempted bombing [HIT]
      // so no change as attempted same tile as previous HIT
      // no change to counter as still a HIT
    }
    // now check counter is not over number of ships required
    // dummy 1 used for now to check functionality
    // intended to be 5 for MVP - if we use 5 ships of size 1
    if (this.hitCounter < 5) {
      // then continue to render game until enough hits
      this.render(this.gamestate);
    } else {
      // enough hits so deal with finish game
      this.result();
    }

    //could also check attemptCounter here is we want to end the game that way
    if (this.attemptsLeft < 1) {
      this.result()
    }

    //but think that was an extension

  });

  PubSub.subscribe('ResultView:play-again', (event) => {

    if (event.detail) {
      this.hitCounter = 0;
    }
  });
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
