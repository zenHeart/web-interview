/**
 * 生成数组中所有可能的排列组合。
 *
 * 递推公式：
 * 设P(S)表示集合S的所有排列
 * 对于数组[n₁, n₂, ..., nₘ]：
 * P({n₁, n₂, ..., nₘ}) = ⋃ {nᵢ} × P({n₁, ..., nᵢ₋₁, nᵢ₊₁, ..., nₘ})
 *
 * 其中i从1到m，"×"表示将元素nᵢ添加到剩余元素所有排列的前面。
 * 基本情况：当S为空集时，P(S) = {[]}（仅包含空排列）
 */
function permute (nums) {
  // 处理边界情况：空数组
  if (nums.length === 0) return []

  const result = [] // 存储所有找到的排列结果

  /**
    * 回溯函数，用于生成所有可能的排列
    * @param {number[]} path - 当前正在构建的排列路径
    * @param {number[]} choices - 当前可以选择的剩余数字
    */
  const backtrack = (path, choices) => {
    // 基本情况：如果路径长度等于原始数组长度，则找到一个完整的排列
    if (path.length === nums.length) {
      result.push(path.slice()) // 将当前排列的副本添加到结果中
      return
    }

    // 遍历所有可用的选择
    for (let i = 0; i < choices.length; i++) {
      // 做出选择：将当前数字添加到路径中
      path.push(choices[i])

      // 创建新的选择集（排除已选择的元素）
      const newChoices = choices.slice()
      newChoices.splice(i, 1)

      // 递归：使用更新后的路径和选择继续探索
      backtrack(path, newChoices)

      // 回溯：撤销选择，从路径中移除最后添加的元素
      path.pop()
    }
  }

  // 开始回溯过程，初始路径为空，所有数字都可选择
  backtrack([], nums)
  return result
}

module.exports = permute
