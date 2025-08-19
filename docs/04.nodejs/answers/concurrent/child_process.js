// 演示：child_process 的 IPC（fork）与标准流（spawn）两种通信
const { spawn, fork } = require('node:child_process')

if (process.env.ROLE === 'child-ipc') {
  process.on('message', msg => process.send({ echo: msg, from: 'child' }))
  return
}

;(async () => {
  // 1) spawn 标准流：使用 JSON 行协议或简单文本，这里做文本回显并变大写
  const child = spawn(process.execPath, ['-e', `
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', d => process.stdout.write(d.toUpperCase()))
  `], { stdio: ['pipe', 'pipe', 'inherit'] })

  child.stdout.once('data', buf => {
    console.log('spawn stdout  :', String(buf).trim()) // HELLO
  })
  child.stdin.write('hello\n')

  // 2) fork IPC：结构化消息与句柄传递支持
  const ipc = fork(__filename, [], { env: { ROLE: 'child-ipc' } })
  ipc.once('message', m => {
    console.log('fork ipc echo :', m) // { echo: 'ping', from: 'child' }
    ipc.disconnect()
  })
  ipc.send('ping')
})()