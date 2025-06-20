// CommonJS 模块定义
const pi = 3.14159

function add (a, b) {
  return a + b
}

function multiply (a, b) {
  return a * b
}

module.exports = {
  add,
  multiply,
  PI: pi
}
