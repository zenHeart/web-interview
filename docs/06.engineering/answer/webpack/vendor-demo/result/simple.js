/* eslint-disable camelcase */
(() => { // webpack 启动逻辑
  /* chunk 加载的逻辑 */
  (() => {
    // 延迟队列，用于存储需要延迟执行的模块
    const deferred = []
    // 延迟队列管理函数
    __webpack_require__.O = (result, chunkIds, fn, priority) => {
      // 核心逻辑包括
      // 1. 如果执行有依赖推入延迟队列
      // 2. 如果未传入 chunkIds，检查队列中模块的依赖是否已加载
      // 3. 如果依赖都加载完毕，执行该 chunk 的执行函数
      // 4. 返回模块的执行结果
    }
  })();

  /* jsonp chunk loading */
  (() => {
    // JSONP 回调函数，用于处理异步加载的 chunk
    const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      // 这里获取的就是数组推入的模块信息
      const chunkIds = data[0] // 当前加载的 chunk ID 列表
      const moreModules = data[1] // 当前 chunk 中的模块定义
      const runtime = data[2] // 运行时代码

      // 后续核心逻辑为
      // 1. 如果存在父级回调函数，调用它
      // 2. 标记 chunk 为已加载，并触发延迟队列检查
      // 3. 返回模块的执行结果
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
