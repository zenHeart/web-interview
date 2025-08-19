// shm_posix.js — 用 Node 线程模拟“共享内存 + 互斥”计数（SAB + Atomics）
// 运行：node shm_posix.js
// 说明：SAB 仅在线程间共享；跨进程共享请用 POSIX shm（需原生扩展或 C）。

const { Worker, isMainThread, workerData, parentPort } = require('node:worker_threads')

// 简单自旋锁（0=unlock, 1=lock）
function lock (view, idx = 0) {
  while (Atomics.compareExchange(view, idx, 0, 1) !== 0) {
    // 低成本等待，避免死循环占满 CPU
    Atomics.wait(view, idx, 1, 1)
  }
}
function unlock (view, idx = 0) {
  Atomics.store(view, idx, 0)
  Atomics.notify(view, idx, 1)
}

if (!isMainThread) {
  const { ctrSAB, mtxSAB, loops } = workerData
  const counter = new Int32Array(ctrSAB) // [0]: counter
  const mutex = new Int32Array(mtxSAB) // [0]: lock flag
  for (let i = 0; i < loops; i++) {
    lock(mutex, 0)
    Atomics.add(counter, 0, 1)
    unlock(mutex, 0)
  }
  parentPort.postMessage('done')
} else {
  const ctrSAB = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
  const mtxSAB = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
  const counter = new Int32Array(ctrSAB)
  const mutex = new Int32Array(mtxSAB)
  Atomics.store(counter, 0, 0)
  Atomics.store(mutex, 0, 0)

  const mk = () => new Worker(__filename, { workerData: { ctrSAB, mtxSAB, loops: 100000 } })
  const w1 = mk()
  const w2 = mk()
  let n = 0
  const onDone = () => {
    if (++n === 2) {
      console.log('counter =', Atomics.load(counter, 0)) // 期望 200000
      w1.terminate(); w2.terminate()
    }
  }
  w1.once('message', onDone)
  w2.once('message', onDone)
}
