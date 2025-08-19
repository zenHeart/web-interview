// fork_ipc.js — 使用 child_process.fork 的内置 IPC 通道（process.send/on('message')）
// 运行：node fork_ipc.js

const { fork } = require('node:child_process')
// 利用环境变量识别子进程
if (process.env.CHILD_FORK === '1') {
  // 子进程通过 on 监听事件
  process.on('message', (msg) => {
    console.log('[child] recv:', msg)
    // senf 发送事件
    process.send && process.send({ reply: 'pong', ts: Date.now() })
  })
  // 给父进程一个握手
  process.send && process.send({ hello: 'from child', pid: process.pid })
  // 2 秒后退出，给足往返时间
  setTimeout(() => process.exit(0), 2000)
} else {
  // 父进程逻辑
  const child = fork(__filename, { env: { ...process.env, CHILD_FORK: '1' } })
  // 通过子进程返回实例监听子进程回传事件
  child.on('message', (msg) => console.log('[parent] recv:', msg))
  child.once('spawn', () => {
    child.send({ ping: 'ping', ts: Date.now() })
  })
  child.on('exit', (code) => console.log('[parent] child exit', code))
}
