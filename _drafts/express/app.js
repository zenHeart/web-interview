// tiny-app-simulation.js

class TinyApp {
  constructor () {
    // 中间件栈，存放所有处理层
    this.stack = []
  }

  // 注册通用中间件
  use (handler) {
    this.stack.push({
      type: 'middleware',
      handler
    })
  }

  // 注册 GET 路由处理器
  get (path, handler) {
    this.stack.push({
      type: 'route',
      method: 'GET',
      path,
      handler
    })
  }

  // 这是整个流程的总入口和调度器
  handle (req, res) {
    let index = 0

    // ✨ 核心 next 函数 ✨
    // 每次调用，它都会尝试执行栈中的下一个处理器
    const next = () => {
      // 检查1: 如果响应已经发送，立即停止整个链条
      if (res.sent) {
        console.log('--- 响应已发送，流程终止 ---')
        return
      }

      // 检查2: 如果所有中间件都执行完了，请求仍未被处理
      if (index >= this.stack.length) {
        console.log('[结束] 所有中间件执行完毕，但没有处理器发送响应。 模拟 404 Not Found.')
        res.sent = true // 标记为结束
        return
      }

      const layer = this.stack[index]
      index++ // 准备下一次调用时执行下一个

      let match = false
      // 匹配逻辑
      if (layer.type === 'middleware') {
        match = true // use() 中间件总是匹配
      } else if (layer.type === 'route') {
        if (layer.method === req.method && layer.path === req.url) {
          match = true // 路由的方法和路径都匹配
        }
      }

      if (match) {
        // 匹配成功，执行处理器！
        // 把控制权和 next 函数一起交给它
        layer.handler(req, res, next)
      } else {
        // 当前层不匹配，自动跳到下一层
        next()
      }
    }

    // 启动执行链
    console.log(`\n======= 开始处理请求: ${req.method} ${req.url} =======`)
    next()
  }
}

module.exports = TinyApp
