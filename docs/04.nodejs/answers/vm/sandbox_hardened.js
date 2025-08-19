// 加固示例：最小化注入 + 冻结 + 移除 constructor 链接
const vm = require('node:vm')

// 仅注入白名单：不可暴露 Object/Function/Buffer 等构造器
const safeConsole = Object.freeze({ log: console.log.bind(console) })
const sandbox = { console: safeConsole, Math: Object.freeze(Math) }
vm.createContext(sandbox)

// 冻结 globalThis，阻断原型链修改
Object.freeze(sandbox)
Object.freeze(sandbox.console)

// 在代码中进一步使用 IIFE 和严格模式
const code = `
  'use strict'
  // 尝试常见逃逸：获取 Function 或 process
  try {
    const Fn = ({}).constructor
    const getProcess = Fn('return process')
    getProcess()
  } catch (e) {
    console.log('blocked:', e.name)
  }
  // 允许的安全计算
  Math.max(1, 2, 3)
`

const script = new vm.Script(code, { filename: 'sandbox.js' })
const out = script.runInContext(sandbox, { timeout: 50 })
console.log('safe result:', out)
