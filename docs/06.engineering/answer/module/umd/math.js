// UMD 模块定义
(function (root, factory) {
  // eslint-disable-next-line
  if (typeof define === 'function' && define.amd) {
    // AMD
    // eslint-disable-next-line
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory()
  } else {
    // 浏览器全局变量
    root.MathUtils = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
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
}))
