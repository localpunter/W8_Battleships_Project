const Game = require('./models/game.js');
const Setup = require('./models/setup.js');
const ResultView = require('./views/result_view.js');
const IntermediateView = require('./views/intermediate_view.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('app.js loaded');

  const container = document.querySelector('#container');

  const gamestate = [];
  const gridSize = 6;
  const defaultGridEntry = 0;
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push(defaultGridEntry);
    }
    gamestate.push(row);
  }
  console.log(gamestate);

  const setup = new Setup(container, gamestate);
  setup.bindEvents();
  setup.render();

  const intermediateView = new IntermediateView(container, gamestate);
  intermediateView.bindEvents();

  const game = new Game(container, gamestate);
  game.bindEvents();
  // game.render(); //this will be removed later as action depends on setup

  const result = new ResultView(container);
  result.bindEvents();

});
