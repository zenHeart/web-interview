// handle_passing.js — 在 IPC 中传递句柄（net.Server），让子进程共享监听
// 运行：node handle_passing.js

const { fork } = require('node:child_process')
const net = require('node:net')

if (process.env.CHILD_HANDLE === '1') {
  process.on('message', (m, handle) => {
    if (handle && handle.on) {
      console.log('[child] got handle, attaching connection handler', m)
      handle.on('connection', (s) => {
        s.end('served by child ' + process.pid)
      })
    }
  })
  setTimeout(() => process.exit(0), 2000)
} else {
  const child = fork(__filename, { env: { ...process.env, CHILD_HANDLE: '1' }, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
  const server = net.createServer()
  server.listen(0, '127.0.0.1', () => {
    console.log('[parent] server listening', server.address().port)
    child.send({ take: 'server' }, server)
  })
  child.on('exit', () => server.close())
}
