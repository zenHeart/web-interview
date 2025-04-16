/**
 * 观察者模式
 */
class EventEmitter {
  constructor () {
    this.events = {}
  }

  on (event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
  }

  off (event, listener) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter(l => l !== listener)
  }

  once (event, listener) {
    const onceWrapper = (...args) => {
      listener(...args)
      this.off(event, onceWrapper)
    }
    this.on(event, onceWrapper)
  }

  emit (event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args))
    }
  }
}

const eventEmitter = new EventEmitter()
eventEmitter.on('event1', (data) => {
  console.log(`Event 1 triggered with data: ${data}`)
})
eventEmitter.once('event2', (data) => {
  console.log(`Event 2 triggered with data: ${data}`)
})
eventEmitter.emit('event1', 'Hello World!')
eventEmitter.emit('event1', 'Hello World!')
eventEmitter.emit('event2', 'Hello World!')
eventEmitter.emit('event2', 'Hello Again!') // Won't trigger
