const PubSub = require('../helpers/pub_sub.js');
const FormView = require('../views/form_view.js')

const Setup = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
  // this.id = "";
};

Setup.prototype.bindEvents = function () {
  PubSub.subscribe('FormTileView:tile-clicked', (event) => {
    // this.id = event.detail[0];
    this.updateGamestate(event.detail);
  });
  PubSub.subscribe('ResultView:play-again', (event) => {
    if (event.detail) {
      this.gamestate.reset();
      this.render();
    }
  })
};


Setup.prototype.updateGamestate = function (ship_details) {
  // const tileRow = parseInt(this.id[1]);
  // const tileCol = parseInt(this.id[2]);
  const shipSizes = [2, 3, 3, 4, 5];

  const tileRow = parseInt(ship_details[0][1]);
  const tileCol = parseInt(ship_details[0][2]);
  const horVer = ship_details[1];
  const shipIndex = ship_details[2]-1;
  const shipSize = shipSizes[shipIndex];

  // check turn and ship not already selected
  if (this.gamestate.turn === 1 && this.gamestate.shipArrayPlayer1[shipIndex] === 0) {

    if (horVer === 1) { // horVer === 1 = HORIZONTAL
      const no_ship_in_way = true;
      for (let k = tileCol; k < tileCol + shipSize; k++) {
          if (this.gamestate.player1[tileRow][k] === 1) {ship_in_way = false;}
      }
      if (6 - tileCol <= shipSize && no_ship_in_way) {
        for (let k = tileCol; k < tileCol + shipSize; k++) {
          this.gamestate.player1[tileRow][k] = 1;
          this.gamestate.shipsPlayer1 += shipSize;
          this.shipArrayPlayer1[shipIndex] = 1;
        }
      }
    } else if (horVer === 2) { // horVer === 2 = VERTICAL
      const no_ship_in_way = true;
      for (let k = tileRow; k < tileRow + shipSize; k++) {
          if (this.gamestate.player1[k][tileCol] === 1) {ship_in_way = false;}
      }
      if (6 - tileRow <= shipSize && no_ship_in_way) {
        for (let k = tileRow; k < tileRow + shipSize; k++) {
          this.gamestate.player1[k][tileCol] = 1;
          this.gamestate.shipsPlayer1 += shipSize;
          this.shipArrayPlayer1[shipIndex] = 1;
        }
      }
    }

  //   if (this.gamestate.player1[tileRow][tileCol] === 0) {
  //
  //     this.gamestate.player1[tileRow][tileCol] = 1;
  //     this.gamestate.shipsPlayer1 += 1;
  //
  //   } else if (this.gamestate.player1[tileRow][tileCol] === 1) {
  //
  //     this.gamestate.player1[tileRow][tileCol] = 0;
  //     this.gamestate.shipsPlayer1 -= 1;
  //
  //   }

} else if (this.gamestate.turn === 2 && this.gamestate.shipArrayPlayer2[shipIndex] === 0) {

      if (horVer === 1) { // horVer === 1 = HORIZONTAL
        const no_ship_in_way = true;
        for (let k = tileCol; k < tileCol + shipSize; k++) {
            if (this.gamestate.player2[tileRow][k] === 1) {ship_in_way = false;}
        }
        if (6 - tileCol <= shipSize && no_ship_in_way) {
          for (let k = tileCol; k < tileCol + shipSize; k++) {
            this.gamestate.player2[tileRow][k] = 1;
            this.gamestate.shipsPlayer2 += shipSize;
            this.shipArrayPlayer2[shipIndex] = 1;
          }
        }
      } else if (horVer === 2) { // horVer === 2 = VERTICAL
        const no_ship_in_way = true;
        for (let k = tileRow; k < tileRow + shipSize; k++) {
            if (this.gamestate.player2[k][tileCol] === 1) {ship_in_way = false;}
        }
        if (6 - tileRow <= shipSize && no_ship_in_way) {
          for (let k = tileRow; k < tileRow + shipSize; k++) {
            this.gamestate.player2[k][tileCol] = 1;
            this.gamestate.shipsPlayer2 += shipSize;
            this.shipArrayPlayer2[shipIndex] = 1;
          }
        }
      }

  //   if (this.gamestate.player2[tileRow][tileCol] === 0) {
  //     this.gamestate.player2[tileRow][tileCol] = 1;
  //     this.gamestate.shipsPlayer2 += 1;
  //   } else if (this.gamestate.player2[tileRow][tileCol] === 1) {
  //     this.gamestate.player2[tileRow][tileCol] = 0;
  //     this.gamestate.shipsPlayer2 -= 1;
  //   }

  }


  if (this.gamestate.shipsPlayer1 < 17 || this.gamestate.shipsPlayer2 < 17) {
    if (this.gamestate.shipsPlayer1 === 17) {
      this.gamestate.turn = 2;
    }
    this.render();
  } else {
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
