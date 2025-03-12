function subsets (nums) {
  if (nums.length === 0) return [[]]

  const result = []
  function backtrack (start, path) {
    result.push([...path]) // 记录当前路径
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]) // 选择当前元素
      backtrack(i + 1, path) // 递归到下一个元素
      path.pop() // 撤销选择
    }
  }
  backtrack(0, [])
  return result
}
module.exports = subsets
