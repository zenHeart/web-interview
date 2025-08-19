// shared_memory_node.js — Node 线程内共享内存（进程间共享需 POSIX shm，这里展示 SAB+Atomics）
// 运行：node shared_memory_node.js
const { Worker, isMainThread, workerData, parentPort } = require('node:worker_threads')

if (!isMainThread) {
  const view = new Int32Array(workerData.sab)
  for (let i = 0; i < (workerData.loops || 100000); i++) Atomics.add(view, 0, 1)
  parentPort.postMessage('done')
} else {
  const sab = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
  const view = new Int32Array(sab)
  console.log('before:', Atomics.load(view, 0))
  const w1 = new Worker(__filename, { workerData: { sab, loops: 100000 } })
  const w2 = new Worker(__filename, { workerData: { sab, loops: 100000 } })
  let done = 0
  const onDone = () => { if (++done === 2) console.log('after :', Atomics.load(view, 0)) }
  w1.once('message', onDone); w2.once('message', onDone)
}
