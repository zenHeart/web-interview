// 简单示例：使用 worker_threads 并行计算斐波那契
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')

function fib (n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}

if (isMainThread) {
  // CPU 密集，示例用两个任务
  const tasks = [36, 36]
  const start = Date.now()
  let done = 0
  for (const n of tasks) {
    // 创建 worker 线程
    const w = new Worker(__filename, { workerData: n })
    w.on('message', res => {
      console.log(`fib(${n}) = ${res}`)
      done++
      if (done === tasks.length) {
        console.log(`Total time: ${Date.now() - start}ms`)
      }
    })
  }
} else {
  // 在 worker 中计算斐波那契数
  const result = fib(workerData)
  parentPort.postMessage(result)
}
