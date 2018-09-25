const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const ResultView = function () {
  this.container = container;
  this.turn = 1;
}

ResultView.prototype.bindEvents = function () {
  console.log('ResultView working');
  PubSub.subscribe('Game:result', (event) => {
    this.turn = event.detail.turn;
    console.log('turn:', this.turn);
    this.handleResult();
    this.playAgain();
  });
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
  // for the extensions, but this will be the place to implement the play again button
  const button = createAndAppend('button', 'play-again', 'Play again', this.container);
  button.addEventListener('click', () => {
    PubSub.publish('ResultView:play-again', true)
  })
};

module.exports = ResultView;
