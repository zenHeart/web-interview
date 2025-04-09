const dgram = require('dgram')
const port = 41236

// 创建 UDP 服务端
const server = dgram.createSocket('udp4')
server.on('message', (msg, rinfo) => {

   console.log(`服务端收到广播: ${msg} 来自 ${rinfo.address}:${rinfo.port}`)
   // 服务端收到消息后也发送广播
   const response = Buffer.from(`Server broadcast response: client ${rinfo.address}:${rinfo.port}`)
   server.send(response, rinfo.port, '255.255.255.255', (err) => {
      if (err) console.error(err)
      else console.log('服务端广播已发送')
   })
})
server.bind(port, () => {
   server.setBroadcast(true)
   console.log(`广播服务器已启动，监听端口 ${port}`)
})

// 创建多个 UDP 客户端
function createClient(clientId) {
   const client = dgram.createSocket('udp4')
   client.on('message', (msg, rinfo) => {
      console.log(`客户端${clientId}收到广播: ${msg} 来自 ${rinfo.address}:${rinfo.port}`)
   })

   client.bind(() => {
      client.setBroadcast(true)
      const message = Buffer.from(`Client ${clientId} broadcast message`)
      client.send(message, port, '255.255.255.255', (err) => {
         if (err) console.error(err)
         else console.log(`客户端${clientId}广播已发送`)
      })
   })

   return client
}

// 创建3个客户端
const clients = []
for (let i = 1; i <= 3; i++) {
   clients.push(createClient(i))
}

// 5秒后关闭所有客户端
setTimeout(() => {
   clients.forEach(client => client.close())
   console.log('所有客户端已关闭')
}, 5000)
