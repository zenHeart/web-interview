// tcp_socket.js — TCP 跨主机/同机皆可（此处本机）
// 运行：node tcp_socket.js
const net = require('node:net')

const server = net.createServer(s => s.on('data', d => s.end(d)))
server.listen(0, '127.0.0.1', () => {
  const { port } = server.address()
  console.log('[server] listening', port)
  const c = net.createConnection({ host: '127.0.0.1', port }, () => c.end('hello tcp'))
  c.on('data', d => console.log('[client] recv:', d.toString()))
  c.on('close', () => server.close())
})
