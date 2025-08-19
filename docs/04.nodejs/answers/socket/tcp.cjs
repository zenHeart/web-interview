// TCP Echo（net）
const net = require('node:net')

net.createServer(socket => {
  socket.setNoDelay(true)
  socket.on('data', buf => {
    const ok = socket.write(buf)
    if (!ok) socket.once('drain', () => socket.write(Buffer.from('resume'))) // 背压示意
  })
}).listen(9000)


