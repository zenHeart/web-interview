/**
 *
 * 典型场景：高阶组件 HOC / 函数增强器 / 指令系统
 * - React 中 HOC：`withAuth(Component)`
 * - Vue 中自定义指令：`v-permission`
 * - 函数扩展日志、缓存、节流防抖等
 */
// 简易日志装饰器
function withLog (fn) {
  return function (...args) {
    console.log('调用参数:', args)
    const result = fn(...args)
    console.log('返回结果:', result)
    return result
  }
}

function add (a, b) {
  return a + b
}

// 使用装饰器增强
const loggedAdd = withLog(add)
loggedAdd(1, 2) // 控制台打印调用信息
