// stdio_node.js — 使用 Node 的子进程标准流通信（行协议分帧）
// 运行：node stdio_node.js
const { spawn } = require('node:child_process')

const child = spawn(process.execPath, ['-e', `
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', d => process.stdout.write(d.toUpperCase()))
`], { stdio: ['pipe', 'pipe', 'inherit'] })

child.stdout.once('data', d => console.log('[parent] recv:', String(d).trim()))
child.stdin.write('hello stdio\n')
