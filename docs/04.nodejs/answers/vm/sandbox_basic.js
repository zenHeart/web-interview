// 基础：隔离上下文、Script 复用、超时防护
const vm = require('node:vm')

// 1. 创建一个沙箱对象，限制可访问的全局变量
const sandbox = { console, Math, Date }
vm.createContext(sandbox) // 隔离上下文环境

// 2. 创建可复用的脚本对象
const script = new vm.Script(`
   // 检查沙箱内是否能访问 process（通常不可访问）
   console.log('in sandbox -> typeof process:', typeof process)
   // 使用 globalThis 在沙箱内存储变量，实现计数
   globalThis.counter = (globalThis.counter || 0) + 1
   counter
`)

// 3. 在同一个沙箱上下文中多次运行脚本，计数器会累加
const r1 = script.runInContext(sandbox, { timeout: 50 }) // 第一次运行
const r2 = script.runInContext(sandbox, { timeout: 50 }) // 第二次运行
console.log('sandbox counter:', r1, '->', r2)

// 3. runInNewContext 创建新上下文并运行代码，返回函数
const double = vm.runInNewContext('x => x * 2', { /* 空上下文 */ })
console.log('runInNewContext fn(5)=', double(5))

// 4。 runInThisContext 在当前上下文运行代码，可访问主进程变量
const kind = vm.runInThisContext('typeof process')
console.log('in this context -> typeof process:', kind)

// 超时防护：运行死循环脚本，超时后抛出异常
try {
  new vm.Script('for(;;){}').runInContext(sandbox, { timeout: 20 })
} catch (e) {
  console.log('timeout caught:', e.code || e.name)
}
