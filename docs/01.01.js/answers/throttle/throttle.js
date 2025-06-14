/**
 * 节流,当函数高频次触发时,
 * 按照固定的时间间隔执行函数
 */
exports.throttle = function throttle (func, time) {
  const runQueue = []
  let isRunning = false
  function throttleFunc () {
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
          throttleFunc()
        }
      }, time)
    }
  }
  return throttleFunc
}
