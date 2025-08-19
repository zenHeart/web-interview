// 将 CPU 密集任务交给 worker，避免阻塞事件循环（典型场景：哈希/压缩/图像处理等）
const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const crypto = require('node:crypto')

if (!isMainThread) {
  const { rounds, salt, password } = workerData
  // 模拟重 CPU 任务：同步 PBKDF2（纯 CPU，演示阻塞型计算交给 worker 处理）
  const hash = crypto.pbkdf2Sync(password, salt, rounds, 32, 'sha256').toString('hex')
  parentPort.postMessage({ hash })
} else {
  console.time('pbkdf2@worker')
  const w = new Worker(__filename, {
    workerData: { rounds: 200_000, salt: 'salty', password: 'secret' }
  })
  w.once('message', ({ hash }) => {
    console.timeEnd('pbkdf2@worker')
    console.log('hash:', hash.slice(0, 16) + '...')
    w.terminate()
  })
  w.once('error', err => console.error('worker error:', err))
  w.once('exit', code => code && console.error('worker exit code:', code))

  // 主线程可继续处理其它任务（若用 pbkdf2Sync 在主线程会卡住）
  setImmediate(() => console.log('main tick: event loop is free'))
}
