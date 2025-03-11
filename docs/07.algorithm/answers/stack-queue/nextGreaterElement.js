/**
 * 查找数组中每个元素的下一个更大元素
 */
function nextGreaterElement (nums) {
  // 1. 初始化结果数组和栈
  const result = new Array(nums.length).fill(-1)
  const stack = []

  // 2. 遍历输入数组中的每个元素
  for (let i = 0; i < nums.length; i++) {
    // 3. 当栈不为空且当前元素大于栈顶索引对应的元素时
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      // 4. 从栈中弹出索引，并用当前元素更新其结果
      const index = stack.pop()
      result[index] = nums[i]
    }
    // 5. 将当前索引压入栈中
    stack.push(i)
  }

  // 6. 返回最终结果数组
  return result
}

module.exports = nextGreaterElement
