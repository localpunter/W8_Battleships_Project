const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const IntermediateView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;
};

IntermediateView.prototype.bindEvents = function () {
  PubSub.subscribe('Setup:table-ready', (evt) => {
    this.container.innerHTML = '';
    const info = "Player 2, your mission is to destroy the five ships that Player 1 has hidden. You have 15 attemps. Good luck!"
    const intermediateViewInfo = createAndAppend('h3', 'intermediateViewInfo', info, this.container)
    const destroyButton = createAndAppend('Button', 'destroy-button', 'Destroy!', this.container)
    destroyButton.addEventListener('click', () => {
      this.handleClick();
    })
  })
};

IntermediateView.prototype.handleClick = function () {
  console.log('gamestate:',this.gamestate);
  PubSub.publish('IntermediateView:to-player2', this.gamestate);
};

module.exports = IntermediateView;
