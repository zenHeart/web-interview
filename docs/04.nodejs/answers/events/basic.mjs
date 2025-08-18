// 基础用法：on/once/emit、listenerCount、setMaxListeners
import { EventEmitter } from 'node:events'

const bus = new EventEmitter()
// 设置最大监听器数量
bus.setMaxListeners(20)
// 添加监听器, 注意 on 为同步触发
bus.on('data', (v) => console.log('data1:', v))
bus.on('data', (v) => console.log('data2:', v))
// 添加一次性监听器
bus.once('ready', () => console.log('ready once'))

console.log('listeners(data)=', bus.listenerCount('data'))
// 触发一次性监听器
bus.emit('ready')
// 触发普通监听器
bus.emit('data', 1)

setTimeout(() => {
  bus.emit('data', 2)
}, 0)
