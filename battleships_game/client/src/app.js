const Game = require('./models/game.js');
const Setup = require('./models/setup.js');

document.addEventListener('DOMContentLoaded', () => {

  console.log('app.js loaded');

  const container = document.querySelector('#container');

  const setup = new Setup(container);
  setup.bindEvents();
  setup.render();

  const game = new Game();
  game.bindEvents();

});
