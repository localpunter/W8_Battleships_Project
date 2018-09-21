const PubSub = require('../helpers/pub_sub.js');
const ListItemView = require('./list_item_view.js');

const ListView = function (container) {
  this.container = container;
};

ListView.prototype.bindEvents = function () {
  PubSub.subscribe('BucketList:data-loaded', (evt) => {
    this.render(evt.detail);
  });
};

ListView.prototype.render = function (list) {
  this.container.innerHTML = '';
  console.log(list);
  const sortList = list.sort( (a,b) => a.status - b.status)
  const listItemView = new ListItemView(this.container);
  list.forEach((item) => listItemView.render(item));
};

module.exports = ListView;
