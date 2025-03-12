function combinationSum (candidates, target) {
  if (!candidates || !candidates.length) return []
  const result = []
  function backtrack (start, path, sum) {
    if (sum === target) {
      result.push([...path]) // 找到一个符合条件的组合
      return
    }
    if (sum > target) return // 剪枝
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i])
      backtrack(i, path, sum + candidates[i]) // 允许重复选择
      path.pop() // 撤销选择
    }
  }
  backtrack(0, [], 0)
  return result
}
module.exports = combinationSum
