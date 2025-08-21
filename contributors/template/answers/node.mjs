import EventEmitter from 'node:events'

/**
 * 使用 Node.js 内置 EventEmitter 模块和 nextTick API
 * 运行：node app.js
 */
const emitter = new EventEmitter()

emitter.on('greet', (msg) => {
  process.nextTick(() => {
    console.log('收到消息:', msg)
  })
})

emitter.emit('greet', '你好，Node.js!')
