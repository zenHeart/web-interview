// unix_socket.js — Unix 域套接字（类 Unix，有句柄传递能力但此处仅回显）
// 运行：node unix_socket.js
const os = require('node:os')
const fs = require('node:fs')
const net = require('node:net')

if (os.platform() === 'win32') {
  console.log('Unix Domain Socket 不适用于 Windows')
  process.exit(0)
}

const sock = `/tmp/ipc_demo_${process.pid}.sock`
try { fs.unlinkSync(sock) } catch {}

const server = net.createServer(s => s.on('data', d => s.end(d)))
server.listen(sock, () => {
  console.log('[server] listening', sock)
  const c = net.createConnection(sock, () => c.end('hello uds'))
  c.on('data', d => console.log('[client] recv:', d.toString()))
  c.on('close', () => server.close())
})
