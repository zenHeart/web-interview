// IIFE 模式定义一个数学工具模块
// eslint-disable-next-line
const MathUtils = (function () {
  // 私有变量
  const pi = 3.14159

  // 返回公共API
  return {
    add: function (a, b) {
      return a + b
    },
    multiply: function (a, b) {
      return a * b
    },
    getPI: function () {
      return pi
    }
  }
})()
