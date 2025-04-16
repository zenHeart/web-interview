/**
 * 典型场景：Vuex / Redux Store、全局 EventBus、Modal 管理器**
 *
 */
// EventBus 单例
class EventBus {
  constructor () {
    if (!EventBus.instance) {
      this.listeners = {}
      EventBus.instance = this
    }
    return EventBus.instance
  }

  on (event, cb) {
    (this.listeners[event] ||= []).push(cb)
  }

  emit (event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data))
  }
}

// 使用
const bus = new EventBus()
bus.on('login', data => console.log('User logged in', data))
bus.emit('login', { user: 'Alice' })
