// 客户端复用：同主机多次请求复用一个连接
const http = require('node:http')
const agent = new http.Agent({ keepAlive: true, maxSockets: 10, maxFreeSockets: 2 })
for (let i = 0; i < 3; i++) {
  http.get({ hostname: 'localhost', port: 3000, path: '/', agent }, res => {
    res.resume()
  })
}

// 服务端建议：不显式关闭连接，尊重 Connection/Keep-Alive 头
http.createServer((req, res) => {
  res.setHeader('Connection', 'keep-alive')
  res.end('ok')
}).listen(3000)
