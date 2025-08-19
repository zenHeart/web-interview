// tcp_socket.js — 通过 TCP 套接字通信（同机演示）
// 运行：node tcp_socket.js

const net = require('node:net')

if (process.env.ROLE === 'server') {
  const server = net.createServer((s) => {
    s.on('data', (d) => s.write(d))
  })
  server.listen(0, '127.0.0.1', () => {
    const { port } = server.address()
    console.log('[server] listening', port)
  })
  setTimeout(() => server.close(), 2000)
} else if (process.env.ROLE === 'client') {
  const port = Number(process.env.PORT)
  const s = net.createConnection({ host: '127.0.0.1', port }, () => {
    s.write('hello')
  })
  s.on('data', (d) => console.log('[client] recv:', d.toString()))
  setTimeout(() => s.end(), 1000)
} else {
  // 自举：先起 server，再起 client
  const { spawn } = require('node:child_process')
  const server = spawn(process.execPath, [__filename], {
    env: { ...process.env, ROLE: 'server' }, stdio: ['ignore', 'pipe', 'inherit']
  })
  let port
  server.stdout.setEncoding('utf8')
  server.stdout.on('data', (d) => {
    const m = /listening (\d+)/.exec(d)
    if (m && !port) {
      port = Number(m[1])
      spawn(process.execPath, [__filename], { env: { ...process.env, ROLE: 'client', PORT: String(port) }, stdio: 'inherit' })
    }
    process.stdout.write(d)
  })
}
