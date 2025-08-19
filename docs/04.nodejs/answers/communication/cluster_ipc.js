// cluster_ipc.js — 使用 cluster 主/工作进程 IPC
// 运行：node cluster_ipc.js

const cluster = require('node:cluster')
const os = require('node:os')

if (cluster.isPrimary) {
  const cpu = Math.min(2, Math.max(1, os.cpus().length))
  for (let i = 0; i < cpu; i++) cluster.fork()
  for (const id in cluster.workers) {
    const w = cluster.workers[id]
    w.on('message', (m) => console.log('[master] recv from', w.process.pid, m))
    w.send({ ping: 'ping', to: id })
  }
  setTimeout(() => process.exit(0), 1500)
} else {
  process.on('message', (m) => {
    process.send && process.send({ echo: m, pid: process.pid })
  })
}
