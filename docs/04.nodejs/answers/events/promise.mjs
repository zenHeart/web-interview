// promsie 风格 once 和 on
import { EventEmitter, once, on } from 'node:events'

const bus = new EventEmitter()

async function demoOnce () {
  setTimeout(() => bus.emit('tick', 1), 10)
  const [v] = await once(bus, 'tick')
  console.log('once:', v)
}

async function demoOn () {
  setTimeout(() => {
    bus.emit('stream', 'a')
    bus.emit('stream', 'b')
    bus.emit('end')
  }, 0)

  for await (const [v] of on(bus, 'stream')) {
    console.log('on stream:', v)
    if (v === 'b') break
  }
}

await demoOnce()
await demoOn()
