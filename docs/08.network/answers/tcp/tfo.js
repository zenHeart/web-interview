const net = require('net')
const { execSync } = require('child_process')

// 首先确保系统级 TFO 设置
function enableSystemTFO () {
  try {
    // 设置 TFO 为 3 (客户端和服务器端都启用)
    execSync('sudo sysctl -w net.inet.tcp.fastopen=3')
    // 设置足够大的 backlog
    execSync('sudo sysctl -w net.inet.tcp.fastopen_backlog=1000')
    console.log('TFO system settings configured successfully')
  } catch (e) {
    console.error('Failed to set TFO system settings:', e.message)
    process.exit(1)
  }
}

// 创建服务器
const server = net.createServer((socket) => {
  console.log('Client connected')

  socket.on('data', (data) => {
    console.log('Received:', data.toString())
    socket.write('Server response')
  })

  socket.on('error', (err) => {
    console.error('Socket error:', err)
  })
})

// 配置服务器 TFO
server.on('error', (err) => {
  console.error('Server error:', err)
})

// 启动服务器
async function startServer () {
  // 首先启用系统 TFO
  enableSystemTFO()

  return new Promise((resolve) => {
    server.listen({
      port: 54321,
      host: '0.0.0.0',
      enableTFO: true
    }, () => {
      console.log('Server listening on port 54321')
      resolve()
    })
  })
}

// 创建客户端连接
function createClient (index) {
  return new Promise((resolve) => {
    const client = new net.Socket()

    client.on('connect', () => {
      console.log(`Client ${index}: Connected`)
      client.write(`Hello from client ${index}`)
    })

    client.on('data', (data) => {
      console.log(`Client ${index}: Received:`, data.toString())
      client.end()
    })

    client.on('error', (err) => {
      console.error(`Client ${index} error:`, err)
    })

    client.on('close', () => {
      console.log(`Client ${index}: Connection closed`)
      resolve()
    })

    // 连接配置
    client.connect({
      port: 54321,
      host: '127.0.0.1',
      enableTFO: true,
      tcpFastOpen: true,
      tcp_fastopen: true,
      // 添加更多底层 socket 选项
      allowHalfOpen: true
    })
  })
}

// 主函数
async function main () {
  await startServer()

  // 等待服务器完全启动
  await new Promise(resolve => setTimeout(resolve, 1000))

  // 进行多次连接测试
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 500))
    await createClient(i + 1)
  }

  // 清理
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
}

// 运行测试
main().catch(console.error)
