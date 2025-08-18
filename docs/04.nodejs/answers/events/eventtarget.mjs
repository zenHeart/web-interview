// 注意 v15.0.0 中 EventTarget 为全局对象，node:events 模块中不再导出
const target = new EventTarget()

function handler (evt) {
  console.log('detail:', evt.detail)
}

// 使用 CustomEvent 传递 detail（Node 18+ 提供全局 CustomEvent）
target.addEventListener('ping', handler)

const CE = globalThis.CustomEvent || class extends Event {
  constructor (type, init) {
    super(type)
    this.detail = init && init.detail
  }
}

target.dispatchEvent(new CE('ping', { detail: 1 }))

target.removeEventListener('ping', handler)
