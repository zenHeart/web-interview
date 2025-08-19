// fork：仅 Node 模块，自动建立 IPC 通道，可传结构化消息
const { fork } = require('node:child_process')

if (process.env.ROLE === 'child') {
  process.on('message', m => process.send({ from: 'child', got: m }))
  return
}

const child = fork(__filename, [], { env: { ROLE: 'child' } })
child.once('message', m => {
  console.log('fork ipc ->', m)
  child.disconnect()
})
child.send({ type: 'ping', ts: Date.now() })