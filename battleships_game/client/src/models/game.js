const PubSub = require('../helpers/pub_sub.js');

const Game = function () {
};

Game.prototype.bindEvents = function () {

  PubSub.subscribe('Setup:table-ready', (event) => {
  });

  PubSub.subscribe('ListItemView:status-changed', (event) => {

  });

  PubSub.subscribe('ListFormView:item-submitted', (event) => {

  })
};

module.exports = Game;
