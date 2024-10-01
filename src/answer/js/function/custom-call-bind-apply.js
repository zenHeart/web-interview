/* eslint-disable no-extend-native */
Function.prototype.customCall = function customCall (thisArg, ...args) {
  // 注意此处的全局变量取决于宿主环境,该处为 node 全局变量 global
  thisArg = thisArg || global; // 若传入 this 为空则默认为全局
  thisArg._fn = this;

  /**
     * 改代码利用成员调用会修改 this 值的特性模拟了 call
     * 若要退化到 es5 模拟 call,apply 需采用 `eval` 函数, 推荐参看此文 <https://github.com/mqyqingfeng/Blog/issues/11>
     */
  const result = thisArg._fn(...args);
  delete thisArg.fn;
  return result;
};

Function.prototype.customApply = function customCall (thisArg, args) {
  // 根据规范,若 args 非对象需抛出类型错误
  if (typeof args !== 'object' && args !== undefined) {
    throw new TypeError('arguments must be array like');
  }
  // 此步骤是将 args 装换为数组结构
  args = args ? Array.from(args) : [];

  thisArg = thisArg || global;
  thisArg._fn = this;
  const result = thisArg._fn(...args);
  delete thisArg.fn;
  return result;
};

/**
 * 此函数参考 MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
 */
Function.prototype.customBind = function customBind (thisArg, ...args) {
  const thatFunc = this;

  return function () {
    // 实现对传入参数的拼接
    const newArgs = [...args, ...arguments];
    // 注意此处若无需实现 apply 则直接使用原生 apply
    return thatFunc.customApply(thisArg, newArgs);
  };
};
