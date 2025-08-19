// udp_dgram.js — UDP 报文通信
// 运行：node udp_dgram.js
const dgram = require('node:dgram')

const server = dgram.createSocket('udp4')
server.on('message', (msg, r) => server.send(msg, r.port, r.address))
server.bind(0, '127.0.0.1', () => {
  const { port } = server.address()
  console.log('[server] listening', port)
  const client = dgram.createSocket('udp4')
  client.send(Buffer.from('hello udp'), port, '127.0.0.1')
  client.on('message', (m) => {
    console.log('[client] recv:', m.toString())
    client.close(); server.close()
  })
})
