/* eslint-disable no-extend-native */
/**
 * 自定义 bind 方法注意如下细节
 * 详见 https://github.com/Raynos/function-bind/blob/master/implementation.js
 * 1. 特性检查,不存在才添加此属性
 * 2. 采用具名函数表达式可以方便调试
 */
if (!Function.prototype.myBind) {
  Function.prototype.myBind = function myBind (oThis) {
    // 防御检查,bind 必须在函数上被调用
    console.log(typeof this);
    if (typeof this !== 'function') {
      throw new TypeError('Bind must be called on a function');
    }
    // 剔除 this 参数,后面参数作为函数参数
    const aArgs = Array.prototype.slice.call(arguments, 1);
    const fToBind = this;
    const fNOP = function () {};
    const fBound = function () {
      return fToBind.apply(this instanceof fBound
        ? this
        : oThis,
      aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };
    if (this.prototype) { // 维持原型链
      fNOP.prototype = this.prototype;
    }

    // eslint-disable-next-line new-cap
    fBound.prototype = new fNOP();
    return fBound;
  };
}

function say () {
  console.log('say', arguments);
}
