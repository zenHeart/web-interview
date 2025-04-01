// 模拟 webpack runtime
(function (global) {
  // 初始化全局 webpack 运行时对象
  const webpackRuntime = global.__webpack_require__ = {
    // 模块缓存
    c: {},
    // 已加载的 chunk
    l: {},
    // 延迟加载的模块
    deferred: {},
    // 模块定义
    m: {}
  }

  // 核心 require 函数
  function __webpack_require__ (moduleId) {
    // 检查缓存
    if (webpackRuntime.c[moduleId]) {
      return webpackRuntime.c[moduleId].exports
    }

    // 检查模块是否存在
    if (!webpackRuntime.m[moduleId]) {
      throw new Error(`Module "${moduleId}" not found`)
    }

    // 创建模块对象
    const module = webpackRuntime.c[moduleId] = {
      exports: {},
      loaded: false
    }

    // 执行模块
    try {
      webpackRuntime.m[moduleId].call(module.exports, __webpack_require__, module, module.exports)
      module.loaded = true
      return module.exports
    } catch (e) {
      // 模块执行失败，从缓存中删除
      delete webpackRuntime.c[moduleId]
      console.log(`Module ${moduleId} failed to execute, might retry later.`)
      throw e
    }
  }

  // 加载chunk
  webpackRuntime.load = function (chunkId, moduleDefinitions) {
    console.log(`Loading ${chunkId} chunk...`)

    // 注册模块定义
    for (const moduleId in moduleDefinitions) {
      webpackRuntime.m[moduleId] = moduleDefinitions[moduleId]
    }

    // 标记chunk已加载
    webpackRuntime.l[chunkId] = true

    // 尝试执行延迟模块
    webpackRuntime.checkDeferredModules()
  }

  // 检查并执行延迟模块
  webpackRuntime.checkDeferredModules = function () {
    let anyProgress = false

    do {
      anyProgress = false

      for (const moduleId in webpackRuntime.deferred) {
        if (!webpackRuntime.deferred[moduleId].resolved) {
          try {
            // 清除可能的缓存
            delete webpackRuntime.c[moduleId]

            // 尝试执行
            const exports = __webpack_require__(moduleId)
            webpackRuntime.deferred[moduleId].resolved = true
            webpackRuntime.deferred[moduleId].exports = exports
            console.log(`Successfully executed deferred module: ${moduleId}`)

            anyProgress = true
          } catch (e) {
            console.log(`Module ${moduleId} still failed to execute, will retry later.`)
          }
        }
      }
    } while (anyProgress)
  }

  // 执行入口模块
  webpackRuntime.execute = function (entryModule) {
    console.log(`Trying to execute ${entryModule}...`)

    try {
      return __webpack_require__(entryModule)
    } catch (e) {
      console.log(`Entry module ${entryModule} failed, will retry after dependencies are loaded`)

      // 添加到延迟模块列表
      if (!webpackRuntime.deferred[entryModule]) {
        webpackRuntime.deferred[entryModule] = { resolved: false, exports: null }
      }

      return null
    }
  }

  return webpackRuntime
})(globalThis)

// 加载 main.js chunk (先加载)
__webpack_require__.load('main', {
  'main.js': function (__webpack_require__, module, exports) {
    try {
      // 首先尝试加载依赖
      const common = __webpack_require__('common.js')

      // 只有当依赖成功加载后才执行这部分代码
      console.log('Main module executed')
      common()
    } catch (e) {
      console.log('Failed to execute main.js, waiting for dependencies...')
      throw e // 重新抛出异常
    }
  }
})

// 执行入口模块
__webpack_require__.execute('main.js')

// 模拟稍后加载 common.js chunk
setTimeout(function () {
  __webpack_require__.load('common', {
    'common.js': function (__webpack_require__, module, exports) {
      console.log('Common module executed')
      module.exports = function () {
        console.log('Common module function called')
      }
    }
  })
}, 10)
