const Game = require('./models/game.js');
const Setup = require('./models/setup.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('app.js loaded');

  const container = document.querySelector('#container');

const gamestate = [[0,0], [0,0]];

  const setup = new Setup(container, gamestate);
  setup.bindEvents();
  setup.render();

  const game = new Game(container);
  game.bindEvents();
  game.render(); //this will be removed later as action depends on setup

});
