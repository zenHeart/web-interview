function compose (...fns) {
  // 1. 兜底返回空函数
  if (fns.length === 0) return () => undefined
  // 2. 注意 compose 是从右向左 执行
  return (...args) => fns.reverse().reduce((res, fn) => {
    const inputArgs = [].concat(res)
    // 3. 多个参数的话需要 deepmerge
    const afterRes = fn(...inputArgs.concat(args.slice(inputArgs.length)))
    return afterRes
  }, args)
}

module.exports = compose
