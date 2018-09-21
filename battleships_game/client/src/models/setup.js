const PubSub = require('../helpers/pub_sub.js');
const FormView = require('../views/form_view.js')

const Setup = function (container, gamestate) {
  this.container = container;
  this.counter = 0;
  this.gamestate = gamestate;
};

Setup.prototype.bindEvents = function () {
  console.log('set up setting up');
  PubSub.subscribe('FormTileView:tile-clicked', (event) => {
    // get id from event
    const tileIdString = "00";
    //dummy - this will depend on what is published
    //will come as a string though so need to convert
    const tileRow = parseInt(tileIdString[0]);
    const tileCol = parseInt(tileIdString[1]);
    console.log(tileRow);
    //check current state of corresponding tile
    const currentState = this.gamestate[tileRow][tileCol];
    // change state of tile accordingly
    //this may need to change depending on coding for states
    // i assume for now there are only 2 - not clicked = 0 or clicked = 1
    if (currentState === 0) {
      //so change to clicked = 1 and add to counter of clicked tiles
      this.gamestate[tileRow][tileCol] = 1;
      this.counter += 1;
    } else if (currentState === 1) {
      // so unclicked - so change to not clicked = 0 and reduce counter
      this.gamestate[tileRow][tileCol] = 0;
      this.counter -= 1;
    }
    // now check counter is not over number of ships required
    // dummy 1 used for now to check functionality
    // intended to be 5 for MVP
    if (this.counter < 1) {
      // then continue to render form until enough tiles clicked
      this.render(this.gamestate);
    } else {
      // enough boats set / tiles clicked so publish table ready
      PubSub.publish('Setup:table-ready', this.gamestate);
    }
  });
};

Setup.prototype.render = function () {
  console.log('set up rendering');
  const formView = new FormView(this.container, this.gamestate);
  formView.render();
}

module.exports = Setup;
