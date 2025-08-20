// signal_notify.js — 用 Node 处理 SIGUSR1 通知
// 运行：node signal_notify.js & pid=$!; kill -USR1 $pid; wait $pid

console.log('pid=' + process.pid)

let got = false
process.on('SIGUSR1', () => {
  got = true
  console.log('got SIGUSR1')
  // 延迟退出以确保输出 flush
  setImmediate(() => process.exit(0))
})

// 保持进程存活直到收到信号
setInterval(() => {
  if (got) clearInterval(this)
}, 1 << 30)
