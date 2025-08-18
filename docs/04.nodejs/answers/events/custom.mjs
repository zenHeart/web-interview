// 自定义发射器（CJS）
const { EventEmitter } = require('node:events')

class ChannelBus extends EventEmitter {
  publish (channel, payload) {
    this.emit(channel, payload)
  }

  subscribe (channel, fn) {
    this.on(channel, fn)
    return () => this.off(channel, fn)
  }
}

const bus = new ChannelBus()
const off = bus.subscribe('order.created', (e) => {
  console.log('handle order.created:', e)
})

bus.publish('order.created', { id: 1 })
off()
bus.publish('order.created', { id: 2 }) // 无输出

module.exports = { ChannelBus }
