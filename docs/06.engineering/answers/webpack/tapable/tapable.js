const { SyncHook, AsyncSeriesHook } = require('tapable')

// 一个简化版的文本流处理工具，模拟 Webpack 插件架构
class TextProcessor {
  constructor () {
    // 定义钩子
    this.hooks = {
      // 同步钩子：文本处理开始时触发
      beforeProcess: new SyncHook(['content']),
      // 异步钩子：文本处理完成后触发
      afterProcess: new AsyncSeriesHook(['content'])
    }
  }

  // 注册插件
  apply (plugin) {
    plugin.apply(this)
  }

  // 处理文本
  async process (content) {
    console.log('Processing started...')
    this.hooks.beforeProcess.call(content) // 触发 beforeProcess 钩子

    // 模拟文本处理逻辑
    const processedContent = content.toUpperCase()

    console.log('Processing completed...')
    await this.hooks.afterProcess.promise(processedContent) // 触发 afterProcess 钩子

    return processedContent
  }
}

// 插件：日志插件
class LogPlugin {
  apply (processor) {
    processor.hooks.beforeProcess.tap('LogPlugin', (content) => {
      console.log(`[LogPlugin] Before processing: ${content}`)
    })

    processor.hooks.afterProcess.tapPromise('LogPlugin', async (content) => {
      console.log(`[LogPlugin] After processing: ${content}`)
      return new Promise((resolve) => setTimeout(resolve, 500)) // 模拟异步操作
    })
  }
}

// 插件：统计插件
class StatsPlugin {
  apply (processor) {
    processor.hooks.afterProcess.tapPromise('StatsPlugin', async (content) => {
      console.log(`[StatsPlugin] Processed content length: ${content.length}`)
      return new Promise((resolve) => setTimeout(resolve, 300)) // 模拟异步操作
    })
  }
}

// 使用文本处理工具
(async () => {
  const processor = new TextProcessor()

  // 注册插件
  processor.apply(new LogPlugin())
  processor.apply(new StatsPlugin())

  // 处理文本
  const inputText = 'Hello, Tapable!'
  const result = await processor.process(inputText)

  console.log(`Final processed content: ${result}`)
})()
