const net = require('node:net')
net.createServer(s => {
  s.setNoDelay(true) // 降低小包往返时延
  s.on('data', d => s.write(d))
}).listen(9100)
