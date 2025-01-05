/**
 * 手动实现 bind
 * 详见 https://github.com/Raynos/function-bind/blob/master/implementation.js
 */
// eslint-disable-next-line
function bindPloyfill () {
  if (!Function.prototype.bind) {
    // eslint-disable-next-line no-extend-native
    Function.prototype.bind = function (thisArg) {
      // none
    }
  }
}
