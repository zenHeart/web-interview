function pipeline (...fns) {
  // 1. 兜底返回空函数
  if (fns.length === 0) return () => undefined
  // 2 注意 pipeline 是从左向右执行
  return (...args) => fns.reduce((res, fn) => {
    const inputArgs = [].concat(res)
    // 2. 多个参数的话需要 deepmerge
    const afterRes = fn(...inputArgs.concat(args.slice(inputArgs.length)))
    return afterRes
  }, args)
}

module.exports = pipeline
