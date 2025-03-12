function combine (n, k) {
  if (n === 0) return []
  const result = []
  function backtrack (start, path) {
    if (path.length === k) {
      result.push([...path]) // 组合数量达到 k，加入结果
      return
    }
    for (let i = start; i <= n; i++) {
      path.push(i)
      backtrack(i + 1, path)
      path.pop() // 撤销选择
    }
  }
  backtrack(1, [])
  return result
}
module.exports = combine
