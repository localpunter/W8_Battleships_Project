const Game = require('./models/game.js');
const Setup = require('./models/setup.js');
const ResultView = require('./views/result_view.js');
const IntermediateView = require('./views/intermediate_view.js');
// const createGamestate = require('./helpers/gamestate.js');
const Gamestate = require('./models/gamestate.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('app.js loaded');

  const container = document.querySelector('#container');

  // const gamestatePlayer1 = createGamestate(6)
  // const gamestatePlayer2 = createGamestate(6)
  // console.log('gamestates:',gamestatePlayer1, gamestatePlayer2);

  const gamestate = new Gamestate(6);
  console.log('gamestate:', gamestate.player1, gamestate.player2);

  const setup = new Setup(container, gamestate);
  // const setup = new Setup(container, gamestatePlayer1, gamestatePlayer2);
  setup.bindEvents();
  setup.render();

  // const intermediateView = new IntermediateView(container, gamestatePlayer1, gamestatePlayer2);
  const intermediateView = new IntermediateView(container, gamestate);
  // can probably remove gamestate here
  intermediateView.bindEvents();

  // const game = new Game(container, gamestatePlayer1, gamestatePlayer2);
  const game = new Game(container, gamestate);
  game.bindEvents();

  const result = new ResultView(container);
  result.bindEvents();

});
