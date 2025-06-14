/**
 * 实现 loadash 的 debounce 函数
 * @param {Function} func 要 doubunce 的函数
 * @param {number} wait 延迟时间，单位毫秒
 * @param {Object} options 可选参数
 * @param {boolean} options.leading 是否在延迟开始前调用函数
 * @param {boolean} options.trailing 是否在延迟结束后调用函数
 * @param {boolean} options.maxWait 最大等待时间，单位毫秒, 避免函数被频繁调用导致一直无法触发，设置一个最大等待时间，确保函数执行
 * @returns {Function} 返回一个新的防抖函数
 * @example
 * const debouncedFunc = debounce(() => {
 *   console.log('Function executed');
 * }, 1000, { leading: true, trailing: false });
 * debouncedFunc(); // 立即执行
 * setTimeout(debouncedFunc, 500); // 不会执行
 * setTimeout(debouncedFunc, 1500); // 会执行
 */
module.exports = function debounce (func, wait = 0, options = {}) {
  let timeoutId
  let maxTimeoutId
  let result
  let startTriggerTime
  const mergeOptions = {
    leading: false,
    trailing: true,
    ...options
  }

  return function (...args) {
    const canCallNow = timeoutId === undefined && mergeOptions.leading
    // 记录首次触发的时间
    if (startTriggerTime === undefined) {
      startTriggerTime = Date.now()
    }

    // debounce 延迟执行逻辑
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (mergeOptions.trailing) {
        result = func.apply(this, args)
        clearTimeout(maxTimeoutId)
        maxTimeoutId = undefined
        startTriggerTime = undefined
      }
      timeoutId = undefined
    }, wait)

    /**
       * leading
       * 且为首次
       * 或者过了超时时间
       * 则可以触发
       */
    if (canCallNow) {
      result = func.apply(this, args)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = undefined
      }, wait)
    }

    // 注意 maxWait
    if (mergeOptions.maxWait !== undefined && maxTimeoutId === undefined && (Date.now() - startTriggerTime) >= mergeOptions.maxWait) {
      result = func.apply(this, args)
      clearTimeout(timeoutId)
      timeoutId = undefined
    }

    return result
  }
}
