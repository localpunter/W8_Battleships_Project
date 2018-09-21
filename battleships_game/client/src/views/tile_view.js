const PubSub = require('../helpers/pub_sub.js');

const View = function (container) {
  this.container = container;
};

ListItemView.prototype.render = function (item) {
  const itemContainer = document.createElement('div');
  itemContainer.id = 'item';

  const name = this.createName(item.name);
  itemContainer.appendChild(name);

  const status = this.createStatusBox(item.status);
  status.id = item._id;
  const label = document.createElement('label');
  label.htmlfor = status.id;
  label.textContent = "Achieved:"
  itemContainer.appendChild(label);
  itemContainer.appendChild(status);

  const deleteButton = this.createDeleteButton(item._id);
  itemContainer.appendChild(deleteButton);

  this.container.appendChild(itemContainer);
};

ListItemView.prototype.createName = function (textContent) {
  const name = document.createElement('p');
  name.textContent = textContent;
  return name;
};


ListItemView.prototype.createStatusBox = function (itemvalue) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('status-box');
  if (itemvalue === true) checkbox.checked = 'true';
  checkbox.addEventListener('change', (evt) => {
    this.handleCheckBox(evt)
  });
  return checkbox;
};

ListItemView.prototype.handleCheckBox = function (evt) {
  PubSub.publish('ListItemView:status-changed', evt);
  evt.target.checked = "true";
};

ListItemView.prototype.createDeleteButton = function (itemId) {
  const button = document.createElement('button');
  button.classList.add('delete-button');
  button.value = itemId;
  button.textContent = "Delete";
  button.addEventListener('click', (evt) => {
    PubSub.publish('ListItemView:item-deleted', evt.target.value);
  });
  return button;
};

module.exports = ListItemView;
