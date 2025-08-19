// unix_socket.js — Unix Domain Socket 双向通信演示
// 运行：node unix_socket.js

const net = require('node:net')
const fs = require('node:fs')
const sock = '/tmp/demo.sock' // Unix socket 使用文件路径作为通信端点（而非 IP:端口）

if (process.env.ROLE === 'server') {
  // 清理可能存在的旧 socket 文件（避免 EADDRINUSE 错误）
  try { fs.unlinkSync(sock) } catch {}

  // 服务器进程：监听 socket 文件，处理客户端连接
  const server = net.createServer(client => {
    console.log('[服务器] 客户端已连接')

    // 监听客户端数据 → 服务器接收
    client.on('data', data => {
      console.log(`[服务器] 接收到: ${data}`)
      // 双向通信：服务器 → 客户端发送响应
      client.write(`服务器回复: ${data}`)
    })

    client.on('end', () => console.log('[服务器] 客户端断开'))
  })

  // 监听 Unix socket 文件（本地文件系统通信，无网络开销）
  server.listen(sock, () => console.log('[服务器] 监听:', sock))

  // 程序结束时清理 socket 文件
  process.on('exit', () => { try { fs.unlinkSync(sock) } catch {} })
} else if (process.env.ROLE === 'client') {
  // 客户端进程：连接到服务器的 socket 文件
  const client = net.createConnection(sock)

  // 连接成功后 → 客户端发送数据
  client.on('connect', () => {
    console.log('[客户端] 已连接到服务器')
    // 双向通信：客户端 → 服务器发送消息
    client.write('Hello Unix Socket!')
  })

  // 监听服务器响应 → 客户端接收
  client.on('data', data => {
    console.log(`[客户端] 收到响应: ${data}`)
    client.end() // 关闭连接
  })

  // 连接错误处理（socket 文件可能还未创建）
  client.on('error', () => setTimeout(() => process.exit(), 100))
} else {
  // 主进程：协调启动服务器和客户端进程
  const { spawn } = require('node:child_process')

  console.log('=== Unix Domain Socket 双向通信演示 ===')

  // 1. 先启动服务器进程
  const server = spawn(process.execPath, [__filename], {
    env: { ROLE: 'server' },
    stdio: 'inherit'
  })

  // 2. 延迟启动客户端进程（等待服务器就绪）
  setTimeout(() => {
    spawn(process.execPath, [__filename], {
      env: { ROLE: 'client' },
      stdio: 'inherit'
    })
  }, 100) // 100ms 延迟避免连接到不存在的 socket 文件
}
