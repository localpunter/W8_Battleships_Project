const createAndAppend = function (tag, id, text, parent) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (id) { element.id = id }
  parent.appendChild(element);

  return element;
}

module.exports = createAndAppend;
