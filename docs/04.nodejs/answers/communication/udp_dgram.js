// udp_dgram.js — 使用 dgram 的 UDP 报文通信
// 运行：node udp_dgram.js

const dgram = require('node:dgram')

if (process.env.ROLE === 'server') {
  const sock = dgram.createSocket('udp4')
  sock.on('message', (msg, r) => sock.send(msg, r.port, r.address))
  sock.bind(0, '127.0.0.1', () => {
    const addr = sock.address()
    console.log('[server] listening', addr.port)
  })
  setTimeout(() => sock.close(), 2000)
} else if (process.env.ROLE === 'client') {
  const port = Number(process.env.PORT)
  const sock = dgram.createSocket('udp4')
  sock.send(Buffer.from('hi'), port, '127.0.0.1')
  sock.on('message', (msg) => console.log('[client] recv:', msg.toString()))
  setTimeout(() => sock.close(), 800)
} else {
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
