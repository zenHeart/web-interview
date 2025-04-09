const dgram = require('dgram')
const multicastAddress = '239.255.255.250'
const port = 41235

// 创建 UDP 服务端
const server = dgram.createSocket('udp4')
server.on('message', (msg, rinfo) => {
  console.log(`多播消息: ${msg} 来自 ${rinfo.address}:${rinfo.port}`)
})
server.bind(port, () => {
  server.addMembership(multicastAddress)
  console.log(`多播服务器已启动，监听端口 ${port}`)
})

// 创建 UDP 客户端
const client = dgram.createSocket('udp4')
const message = Buffer.from('Hello Multicast')
client.send(message, port, multicastAddress, (err) => {
  if (err) console.error(err)
  else console.log('多播消息已发送')
  client.close()
})
