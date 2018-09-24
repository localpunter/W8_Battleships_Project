const PubSub = require('../helpers/pub_sub.js');
const FormView = require('../views/form_view.js')

const Setup = function (container, gamestatePlayer1, gamestatePlayer2) {
  this.container = container;
  this.counterPlayer1 = 0;
  this.counterPlayer2 = 0;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
  this.turn = 1;
};

Setup.prototype.bindEvents = function () {
  PubSub.subscribe('FormTileView:tile-clicked', (event) => {
    console.log("id passed to form", event.detail);

    this.turn = event.detail.turn;
    if (this.turn === 1 ) {
      //do stuff in gamestatePlayer1
      this.updateGamestate(this.gamestatePlayer1, this.counterPlayer1)
      this.turn = 2
    } else {
      //do stuff in gamestatePlayer2
      this.updateGamestate(this.gamestatePlayer2, this.counterPlayer2)
      this.turn = 1
    }




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


Setup.prototype.updateGamestate = function (gamestate, counter) {
  // check current state of corresponding tile
  // comes as a string though so need to convert
  const tileIdString = event.detail.info;
  const tileRow = parseInt(tileIdString[1]);
  const tileCol = parseInt(tileIdString[2]);
  const currentState = gamestate[tileRow][tileCol];

  // change state of tile accordingly
  //this may need to change depending on coding for states
  // i assume for now there are only 2 - not clicked = 0 or clicked = 1
  if (currentState === 0) {
    //so change to clicked = 1 and add to counter of clicked tiles
    gamestate[tileRow][tileCol] = 1;
    counter += 1;
  } else if (currentState === 1) {
    // so unclicked - so change to not clicked = 0 and reduce counter
    gamestate[tileRow][tileCol] = 0;
    counter -= 1;
  }
  // now check counter is not over number of ships required
  // dummy 1 used for now to check functionality
  // intended to be 5 for MVP
  if (counter < 5) {
    // then continue to render form until enough tiles clicked
    this.render(gamestate);
  } else {
    // enough boats set / tiles clicked so publish table ready
    PubSub.publish('Setup:table-ready', gamestate);
  }
};

Setup.prototype.render = function () {
  this.container.innerHTML = '';
  console.log('set up rendering');
  const formView = new FormView(this.container, this.gamestatePlayer1, this.gamestatePlayer2);
  formView.render();
}

Setup.prototype.reset = function () {
  //set all the tiles to empty
  this.counter = 0
  for (let i = 0; i < this.gamestate.length; i++) {

    for (let j = 0; j < this.gamestate[i].length; j++) {
      this.gamestate[i][j] = 0
    }
  }

};

module.exports = Setup;
