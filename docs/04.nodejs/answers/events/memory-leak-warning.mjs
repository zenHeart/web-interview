// 演示监听器过多的告警与抑制
import { EventEmitter } from 'node:events'

const bus = new EventEmitter()

// 默认 10，超出会告警（仅警告，不阻止）
for (let i = 0; i < 12; i++) {
  bus.on('x', () => {})
}

console.log('listeners before:', bus.listenerCount('x'))

// 解决方式1：提高阈值
bus.setMaxListeners(20)

// 解决方式2：及时移除
const fn = () => {}
bus.off('x', fn) // 此处仅示意；真实应移除已注册的监听器

console.log('listeners after:', bus.listenerCount('x'))
