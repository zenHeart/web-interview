const dgram = require('node:dgram')
const udp = dgram.createSocket('udp4')
udp.on('message', (msg, rinfo) => {
  udp.send(msg, rinfo.port, rinfo.address)
})
udp.bind(9001)
