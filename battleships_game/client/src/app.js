const Game = require('./models/game.js');
const Setup = require('./models/setup.js');
const ResultView = require('./views/result_view.js');
const IntermediateView = require('./views/intermediate_view.js');
const Gamestate = require('./models/gamestate.js');

document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('#container');

  const gamestate = new Gamestate(6);

  const setup = new Setup(container, gamestate);
  setup.bindEvents();
  setup.render();

  const intermediateView = new IntermediateView(container, gamestate);
  intermediateView.bindEvents();

  const game = new Game(container, gamestate);
  game.bindEvents();

  const result = new ResultView(container);
  result.bindEvents();

});
