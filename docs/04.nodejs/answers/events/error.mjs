// error 处理与未处理崩溃演示
// 运行：node error-handling.mjs [crash]
import { EventEmitter } from 'node:events'

const bus = new EventEmitter()

// 统一错误监听（注释此行以演示未处理崩溃）
bus.on('error', (e) => console.error('caught error:', e.message))

const willCrash = process.argv[2] === 'crash'

setImmediate(() => {
  if (willCrash) {
    // 若未监听 error，将导致进程抛出并退出
    bus.emit('error', new Error('boom'))
  } else {
    bus.emit('data', 42)
  }
})

bus.on('data', (v) => console.log('data:', v))
