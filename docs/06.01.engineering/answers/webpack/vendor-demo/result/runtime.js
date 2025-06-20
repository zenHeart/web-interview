/* eslint-disable camelcase */
/*
 * 注意: 当前使用的是 "eval" devtool（可能是开发模式下的默认配置）。
 * 这种 devtool 使用 "eval()" 调用来生成浏览器开发工具中的源文件映射。
 * 如果你正在阅读输出文件，请选择其他 devtool（https://webpack.js.org/configuration/devtool/）
 * 或禁用默认 devtool（设置 "devtool: false"）。
 * 如果需要生产环境的输出文件，请使用 "production" 模式（https://webpack.js.org/configuration/mode/）。
 */

/******/ (() => { // webpackBootstrap
/******/'use strict'
  // 模块定义对象，用于存储所有模块的代码
  const __webpack_modules__ = ({})
  /************************************************************************/
  // 模块缓存对象，用于存储已加载的模块，避免重复加载
  const __webpack_module_cache__ = {}

  // 模块加载函数，类似于 CommonJS 的 require
  function __webpack_require__ (moduleId) {
    // 检查模块是否在缓存中
    const cachedModule = __webpack_module_cache__[moduleId]
    if (cachedModule !== undefined) {
      return cachedModule.exports // 如果已缓存，直接返回模块的导出对象
    }
    // 创建一个新的模块对象并放入缓存
    const module = __webpack_module_cache__[moduleId] = {
      // 模块的导出对象
      exports: {}
    }

    // 执行模块定义函数，将模块的导出对象填充
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__)

    // 返回模块的导出对象
    return module.exports
  }

  // 暴露模块定义对象，方便运行时访问所有模块定义
  __webpack_require__.m = __webpack_modules__;

  /************************************************************************/
  /* webpack/runtime/chunk loaded */
  (() => {
    // 延迟队列，用于存储需要延迟执行的模块
    const deferred = []
    // 延迟队列管理函数
    __webpack_require__.O = (result, chunkIds, fn, priority) => {
      if (chunkIds) {
        // 如果传入 chunkIds，表示需要将模块推入延迟队列
        priority = priority || 0 // 如果未指定优先级，默认为 0
        // 按优先级从高到低插入队列
        for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1]
        deferred[i] = [chunkIds, fn, priority] // 将模块信息存入队列
        return
      }
      // 如果未传入 chunkIds，检查队列中模块的依赖是否已加载
      let notFulfilled = Infinity
      for (var i = 0; i < deferred.length; i++) {
        var chunkIds = deferred[i][0] // 模块的依赖列表
        var fn = deferred[i][1] // 模块的执行函数
        var priority = deferred[i][2] // 模块的优先级
        let fulfilled = true
        for (var j = 0; j < chunkIds.length; j++) {
          // 检查依赖的 chunk 是否已加载
          if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
            chunkIds.splice(j--, 1) // 如果已加载，从依赖列表中移除
          } else {
            fulfilled = false // 如果未加载，标记为未满足
            if (priority < notFulfilled) notFulfilled = priority
          }
        }
        if (fulfilled) {
          // 如果所有依赖已加载，执行模块并从队列中移除
          deferred.splice(i--, 1)
          const r = fn()
          if (r !== undefined) result = r
        }
      }
      return result // 返回模块的执行结果
    }
  })();

  /* webpack/runtime/define property getters */
  (() => {
    // 定义属性工具函数，为模块的 exports 定义 getter 函数
    __webpack_require__.d = (exports, definition) => {
      for (const key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
        }
      }
    }
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    // 简化版的 hasOwnProperty，用于检查对象是否拥有某个属性
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // 为模块的 exports 添加 __esModule 标志，用于区分 ES 模块和 CommonJS 模块
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
      }
      Object.defineProperty(exports, '__esModule', { value: true })
    }
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // 用于存储已加载和正在加载的 chunk 状态
    // undefined = chunk 未加载, null = chunk 已预加载/预取, [resolve, reject, Promise] = chunk 正在加载, 0 = chunk 已加载
    const installedChunks = {
      runtime: 0 // runtime chunk 已加载
    }

    // 检查 chunk 是否已加载
    __webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0)

    // JSONP 回调函数，用于处理异步加载的 chunk
    const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      const chunkIds = data[0] // 当前加载的 chunk ID 列表
      const moreModules = data[1] // 当前 chunk 中的模块定义
      const runtime = data[2] // 运行时代码
      let moduleId; let chunkId; let i = 0
      if (chunkIds.some((id) => (installedChunks[id] !== 0))) {
        // 注册模块到 __webpack_require__.m 中
        for (moduleId in moreModules) {
          if (__webpack_require__.o(moreModules, moduleId)) {
            __webpack_require__.m[moduleId] = moreModules[moduleId]
          }
        }
        // 如果存在运行时代码，执行它
        if (runtime) var result = runtime(__webpack_require__)
      }
      // 如果存在父级回调函数，调用它
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data)
      // 标记 chunk 为已加载，并触发延迟队列检查
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i]
        if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          installedChunks[chunkId][0]()
        }
        installedChunks[chunkId] = 0
      }
      return __webpack_require__.O(result)
    }

    // 全局数组，用于存储所有加载的 chunk 信息
    const chunkLoadingGlobal = self.webpackChunk = self.webpackChunk || []
    // 处理之前已加载的 chunk
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0))
    // 重写 push 方法，确保后续加载的 chunk 能立即触发回调
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal))
  })()

  /************************************************************************/
})()
