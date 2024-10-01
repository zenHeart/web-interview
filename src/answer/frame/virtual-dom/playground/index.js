const h = require('virtual-dom/h');
const createElement = require('virtual-dom/create-element');

function render () {
  return h('div', 'test');
}

console.log(createElement(render()));
