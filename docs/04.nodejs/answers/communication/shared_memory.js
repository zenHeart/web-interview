// SharedArrayBuffer + Atomics 演示：两个 worker 并发累加同一计数器
const { Worker, isMainThread, workerData, parentPort } = require('node:worker_threads')

// Worker 线程逻辑
if (!isMainThread) {
  // 获取主线程传入的共享缓冲区，并创建视图
  const view = new Int32Array(workerData.sab)
  // 获取循环次数，默认 100000
  const loops = workerData.loops || 100000
  // 原子性地累加共享计数器
  for (let i = 0; i < loops; i++) Atomics.add(view, 0, 1)
  // 通知主线程本 worker 已完成
  parentPort.postMessage({ done: true })
} else {
  // 主线程逻辑
  // 创建一个仅包含一个元素的共享缓冲区
  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1)
  // 创建 Int32Array 视图用于操作共享数据
  const view = new Int32Array(sab)
  // 工厂函数，创建 worker 并传入共享缓冲区和循环次数
  const make = () => new Worker(__filename, { workerData: { sab, loops: 100000 } })

  // 输出初始计数器值
  console.log('before:', Atomics.load(view, 0))
  // 启动两个 worker 并发累加
  const w1 = make()
  const w2 = make()

  let finished = 0
  // worker 完成后回调，统计完成数量
  const onDone = () => {
    finished++
    // 两个 worker 都完成后输出最终计数器值
    if (finished === 2) {
      console.log('after :', Atomics.load(view, 0)) // 期望 200000
      w1.terminate(); w2.terminate()
    }
  }
  // 监听 worker 完成消息
  w1.once('message', onDone)
  w2.once('message', onDone)
}
