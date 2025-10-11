// index-simulation.js
const TinyApp = require('./app')
const app = new TinyApp()

// ---- 定义我们的中间件和路由处理器 ----

// 1. 日志中间件 (典型的 `use` 场景)
// 职责：打印日志，然后调用 next() 将控制权传递下去
const loggerMiddleware = (req, res, next) => {
  console.log('[日志] 请求进入...')
  next() // <-- 关键：调用 next() 继续流程
  console.log('[日志] 请求已离开...') // 这行会在请求处理完后执行
}

// 2. 一个“坏掉的”中间件，用于演示请求卡住的情况
const stuckMiddleware = (req, res, next) => {
  console.log('[卡住] 这个中间件忘记调用 next() 了！')
  // 没有调用 next()，也没有调用 res.send()
  // 流程将在这里停止
}

// 3. 路由处理器 (典型的 `get` 场景)
// 职责：处理业务逻辑，然后调用 res.send() 结束请求
const helloHandler = (req, res, next) => {
  console.log('[路由] 执行 /hello 处理器')
  res.send('你好，世界') // <-- 关键：调用 send() 终结流程
}

// ---- 注册中间件和处理器 ----
app.use(loggerMiddleware)
// app.use(stuckMiddleware); // <-- 如果取消这行的注释，所有请求都会卡住
app.get('/hello', helloHandler)

// ---- 开始模拟 ----

// 场景1: 成功的请求 (GET /hello)
// 预期：日志中间件执行 -> /hello 处理器执行 -> 流程终止
const mockReq1 = { method: 'GET', url: '/hello' }
const mockRes1 = { // 模拟的 response 对象
  sent: false,
  send: function (body) {
    console.log(`[响应] 准备发送: "${body}"`)
    this.sent = true // ✨ 终结信号！
  }
}
app.handle(mockReq1, mockRes1)

// 场景2: 失败的请求 (找不到路由)
// 预期：日志中间件执行 -> 找不到匹配的路由 -> 流程自然结束
const mockReq2 = { method: 'GET', url: '/not-found' }
const mockRes2 = {
  sent: false,
  send: function (body) {
    console.log(`[响应] 准备发送: "${body}"`)
    this.sent = true
  }
}
app.handle(mockReq2, mockRes2)
