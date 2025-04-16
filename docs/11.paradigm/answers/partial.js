/**
 * curry 化实现知识点
 * 1. function.length 为原始函数参数个数
 * 2. 如果参数个数小于原始函数参数个数，则返回一个新的函数
 * 3. 支持递归 partial
 */
function partial (fn, ...args) {
  return (args.length >= fn.length && args.every(el => el !== undefined))
    ? fn(...args)
    : (...leftArgs) => {
        const allArgys = Array.from({ length: fn.length }).map((el, index) => {
          return args[index] !== undefined ? args[index] : leftArgs.shift()
        })
        return partial(fn, ...allArgys)
      }
}

module.exports = partial
