const PubSub = require('../helpers/pub_sub.js');
const createAndAppend = require('../helpers/create_append.js');

const IntermediateView = function (container, gamestate) {
  this.container = container;
  this.gamestate = gamestate;

};

IntermediateView.prototype.bindEvents = function () {
  PubSub.subscribe('Setup:table-ready', (evt) => {
    this.container.innerHTML = '';

    const info = "Players your mission is to destroy the five ships your opponnent has hidden. Good luck!"
    const intermediateViewInfo = createAndAppend('h3', 'intermediateViewInfo', info, this.container)
    const destroyButton = createAndAppend('Button', 'destroy-button', 'Destroy!', this.container)
    destroyButton.addEventListener('click', () => {
      this.handleClick();
    })
  })
};

IntermediateView.prototype.handleClick = function () {

  var start = new Audio('sounds/start.wav');
  start.play();

  PubSub.publish('IntermediateView:game-ready', this.gamestate);
};

module.exports = IntermediateView;
