// Node.js 的 vm 模块可模拟 V8 的 Isolate 和 Context 概念
const vm = require('vm')

// 创建第一个 Context（沙箱环境）
const contextA = vm.createContext({ name: 'A' })
vm.runInContext('var secret = 42; globalThis.info = `ContextA: ${name}, secret: ${secret}`', contextA)

// 创建第二个 Context（沙箱环境）
const contextB = vm.createContext({ name: 'B' })
vm.runInContext('var secret = 99; globalThis.info = `ContextB: ${name}, secret: ${secret}`', contextB)

// 两个 Context 变量和作用域完全隔离
console.log(contextA.info) // ContextA: A, secret: 42
console.log(contextB.info) // ContextB: B, secret: 99
