/**
 * 创建一个防抖函数，该函数会延迟执行 `func`，直到经过了 `wait` 毫秒没有再次调用，
 * 或者直到下一帧浏览器重绘。返回的防抖函数带有 `cancel` 方法用于取消延迟的执行，
 * 以及 `flush` 方法用于立即执行。可以通过 `options` 参数指定是否在延迟开始前
 * （leading）和/或结束后（trailing）调用 `func`。`func` 会以最后一次调用时的参数执行。
 * 多次调用防抖函数会返回最后一次 `func` 执行的结果。
 *
 * **注意：** 如果 `leading` 和 `trailing` 都为 `true`，只有在 `wait` 时间内多次调用
 * 防抖函数时，`func` 才会在延迟结束时执行。
 *
 * 如果 `wait` 为 `0` 且 `leading` 为 `false`，`func` 的执行会被推迟到下一轮事件循环，
 * 类似于 `setTimeout` 的超时为 `0`。
 *
 * 详细区别可参考 [David Corbacho 的文章](https://css-tricks.com/debouncing-throttling-explained-examples/)。
 *
 * @param {Function} func 需要防抖处理的函数
 * @param {number} [wait=0] 延迟的毫秒数
 * @param {Object} [options={}] 配置项
 * @param {boolean} [options.leading=false] 是否在延迟开始前调用
 * @param {number} [options.maxWait] func 允许被延迟的最大时间
 * @param {boolean} [options.trailing=true] 是否在延迟结束后调用
 * @returns {Function} 返回新的防抖函数
 */
function debounce (func, wait = 0, options = {}) {
  let lastArgs
  let lastThis
  let maxWait
  let result
  let timerId
  let lastCallTime

  // 修正：初始化 lastInvokeTime 为 0。用于追踪上一次实际执行函数的时间点，
  // 这对于 throttle 的实现非常关键。原实现的 startTriggerTime 只追踪了一系列调用的开始时间。
  let lastInvokeTime = 0
  let leading = false
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  wait = +wait || 0
  if (typeof options === 'object') {
    leading = !!options.leading
    maxWait = 'maxWait' in options ? Math.max(+options.maxWait || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc (time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    // 修正：每次实际执行函数时都要更新 lastInvokeTime。
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge (time) {
    // 重置任何 maxWait 定时器
    lastInvokeTime = time
    // 启动 trailing 边的定时器
    timerId = setTimeout(timerExpired, wait)
    // 如果需要，立即执行
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxWait === undefined
      ? timeWaiting
      : Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
  }

  // 修正：统一判断是否应该执行的函数。原实现对 leading、maxWait、trailing 的判断分散且容易出错。
  function shouldInvoke (time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // 首次调用，或者距离上次调用已超过 wait，或者系统时间倒退，或者已到达 maxWait
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
         (timeSinceLastCall < 0) || (maxWait !== undefined && timeSinceLastInvoke >= maxWait))
  }

  // 修正：统一的定时器回调，管理所有 trailing 边的逻辑。
  function timerExpired () {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // 重新启动定时器
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge (time) {
    timerId = undefined

    // 只有在有待执行的 trailing 调用且 trailing 为 true 时才执行
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  // 修正：cancel 方法现在会重置所有状态变量，确保任何 pending 的执行都被取消
  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced (...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxWait !== undefined) {
        // 处理高频调用的情况
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined && trailing) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

/**
 * 实现 lodash 的 throttle 函数
 * @param {Function} func 需要节流的函数
 * @param {number} wait 等待时间，单位毫秒
 * @param {Object} options 可选参数
 * @param {boolean} options.leading 是否在开始时调用函数
 * @param {boolean} options.trailing 是否在结束时调用函数
 * @returns {Function} 返回一个新的节流函数
 * @example
 *
 */

module.exports = function throttle (func, wait, options = {}) {
  return debounce(func, wait, {
    leading: true,
    trailing: true,
    maxWait: wait,
    ...options
  })
}
