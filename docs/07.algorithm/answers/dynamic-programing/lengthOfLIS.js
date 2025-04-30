function lengthOfLIS (nums) {
  // 如果输入数组为空，返回0，因为没有子序列
  if (nums.length === 0) return 0

  // 创建一个DP数组，初始化为1，因为任何元素的最小LIS（最长递增子序列）为1（它本身）
  const dp = new Array(nums.length).fill(1)

  // 从数组的第二个元素开始迭代
  for (let i = 1; i < nums.length; i++) {
    // 对于每个元素，检查所有之前的元素
    for (let j = 0; j < i; j++) {
      // 如果当前元素大于某个之前的元素
      if (nums[i] > nums[j]) {
        // 更新当前元素的DP值为其当前值或之前元素的DP值加1中的较大值
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  // 返回DP数组中的最大值，表示LIS的长度
  return Math.max(...dp)
}

module.exports = lengthOfLIS
