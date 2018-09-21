const GridView = require('./views/grid_view.js');
const Game = require('./models/game.js');
const Setup = require('./models/setup.js');

document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('#container');

  const setup = new Setup(container);
  setup.bindEvents();
  setup.render();

  // same or separate container?????

  // const gridView = new GridView(container);
  // gridView.bindEvents();

  // const game = new Game();
  // game.bindEvents();

});
