const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const IntermediateView = function (container, gamestatePlayer1, gamestatePlayer2) {
  this.container = container;
  this.gamestatePlayer1 = gamestatePlayer1;
  this.gamestatePlayer2 = gamestatePlayer2;
};

IntermediateView.prototype.bindEvents = function () {
  PubSub.subscribe('Setup:table-ready', (evt) => {
    this.container.innerHTML = '';
    this.gamestatePlayer1 = evt.detail[0];
    this.gamestatePlayer2 = evt.detail[1];
    const info = "Players your mission is to destroy the five ships your opponnent has hidden. Good luck!"
    const intermediateViewInfo = createAndAppend('h3', 'intermediateViewInfo', info, this.container)
    const destroyButton = createAndAppend('Button', 'destroy-button', 'Destroy!', this.container)
    destroyButton.addEventListener('click', () => {
      this.handleClick();
    })
  })
};

IntermediateView.prototype.handleClick = function () {
  // console.log('gamestate:',this.gamestate);
  PubSub.publish('IntermediateView:game-ready', [this.gamestatePlayer1, this.gamestatePlayer2]);
};

module.exports = IntermediateView;
