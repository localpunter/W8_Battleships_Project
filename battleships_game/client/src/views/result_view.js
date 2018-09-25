const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');
const ResultGridView = require('./result_grid_view.js');

const ResultView = function () {
  this.container = container;
  this.turn = 1;
  this.gamestate;
}

ResultView.prototype.bindEvents = function () {
  console.log('ResultView working');
  PubSub.subscribe('Game:result', (event) => {
    this.turn = event.detail.turn;
    this.gamestate = event.detail;
    console.log('event detail', event.detail);
    this.handleResult();
    this.playAgain();
    this.render()

  });
};

ResultView.prototype.render = function () {
  const resultGrid = new ResultGridView(this.container, this.gamestate)
  resultGrid.render()
};


ResultView.prototype.handleResult = function () {
  var final = new Audio('sounds/final.wav');
  final.play();
  this.container.innerHTML = ''
  if (this.turn === 1) {
    createAndAppend('h2', 'result', 'Player 1 knows how to hide stuff! Player 1 wins!', this.container)
  } else {
    createAndAppend('h2', 'result', `Player 2 is literally on fire! Oh wait, that's Player 1 ships! Player 2 wins!`, this.container)
  }
};

ResultView.prototype.playAgain = function () {
  const button = createAndAppend('button', 'play-again', 'Play again', this.container);
  button.addEventListener('click', () => {
    PubSub.publish('ResultView:play-again', true)
  })
};

module.exports = ResultView;
