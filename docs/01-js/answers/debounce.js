/**
 * debounce 函数去抖
 * 若函数执行次数超过限定频次则忽略其他函数的调用
 * @param {Function} func 需要被去抖的函数
 * @param {Number} time 限抖间隔单位 ms
 *
 * 注意不要采用 setTimeout 会由于事件循环导致延迟执行
 *
 * 带参数的函数如何触发
 */
exports.debounce = function debounce (func, time) {
  let startTime = new Date().getTime()
  function debounceRun () {
    const callTime = new Date().getTime()

    if (callTime - startTime < time) {
      // none
    } else {
      startTime = callTime
      func.apply(this, arguments)
    }
  }
  return debounceRun
}

/**
 * 节流,当函数高频次触发时,
 * 按照固定的时间间隔执行函数
 */
exports.throttling = function throttling (func, time) {
  const runQueue = []
  let isRunning = false
  function throttlingFunc () {
    if (isRunning) {
      runQueue.push(arguments)
    } else {
      isRunning = true
      if (runQueue.length) {
        func.apply(this, runQueue.shift())
      } else {
        func.apply(this, arguments)
      }
      setTimeout(() => {
        isRunning = false
        if (runQueue.length) {
          throttlingFunc()
        }
      }, time)
    }
  }
  return throttlingFunc
}
