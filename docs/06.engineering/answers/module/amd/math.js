// AMD 模块定义
// eslint-disable-next-line
define([], function () {
  const pi = 3.14159
  return {
    add: function (a, b) {
      return a + b
    },
    multiply: function (a, b) {
      return a * b
    },
    PI: pi
  }
})
