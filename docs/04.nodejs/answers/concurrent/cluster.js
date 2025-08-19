// 演示：cluster 基于 fork 的多进程与主-工间 IPC
const cluster = require('node:cluster')

if (cluster.isPrimary) {
  const worker = cluster.fork()
  worker.once('online', () => worker.send({ type: 'ping', ts: Date.now() }))
  worker.on('message', m => {
    console.log('cluster reply :', m)
    worker.kill()
  })
} else {
  process.on('message', m => {
    // worker 可在此处创建服务器监听同一端口，由主进程分发句柄
    // 这里简化为 IPC 回应
    process.send({ type: 'pong', got: m.type, wid: cluster.worker.id, pid: process.pid })
  })
}
