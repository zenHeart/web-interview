/**
 * 滑动窗口最大值问题解决步骤:
 * 1. 创建双端队列deque存储元素索引，队列中索引对应的元素值保持递减
 * 2. 处理前k个元素:
 *    - 移除队尾小于当前元素的所有索引
 *    - 将当前索引加入队尾
 * 3. 遍历剩余元素(i从k开始):
 *    - 移除队首不在当前窗口范围的索引
 *    - 移除队尾小于当前元素的所有索引
 *    - 将当前索引加入队尾
 *    - 将队首对应的元素(窗口最大值)加入结果数组
 * 4. 返回结果数组
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow (nums, k) {
  const deque = []
  const result = []

  for (let i = 0; i < nums.length; i++) {
    // 移除队首不在当前窗口范围的索引
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift()
    }

    // 移除队尾小于当前元素的所有索引
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop()
    }

    // 将当前索引加入队尾
    deque.push(i)

    // 将队首对应的元素(窗口最大值)加入结果数组
    if (i >= k - 1) {
      result.push(nums[deque[0]])
    }
  }

  return result
}

module.exports = maxSlidingWindow
