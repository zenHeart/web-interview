/**
 * 手动实现 bind
 * 详见 https://github.com/Raynos/function-bind/blob/master/implementation.js
 */
function bindPloyfill () {
  if (!Function.prototype.bind) {
      Function.prototype.bind = function(thisArg) {


      }
  }
}
