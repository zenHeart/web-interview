const h = require('virtual-dom/h');
var createElement = require('virtual-dom/create-element');

function render() {
    return h('div', 'test');
}

console.log(createElement(render()));
