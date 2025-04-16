/**

 */
function curry (fn, ...args) {
  return args.length >= fn.length ? fn(...args) : curry.bind(null, fn, ...args)
}

module.exports = curry
