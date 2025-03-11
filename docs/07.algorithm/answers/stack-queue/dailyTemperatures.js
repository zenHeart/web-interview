/**
 * 1. 初始化一个栈，所有结果赋值为 0
 * 2. 循环温度，取出当前温度
 * 3. 如果栈为空，直接入栈
 * 4. 如果栈不为空，判断当前温度是否大于栈顶温度,如果大于，出栈，计算出栈温度的索引差值，赋值给结果数组,
 * 5. 重复 3，直到栈为空或者当前温度小于等于栈顶温度
 * 6. 如果小于等于，入栈
 * 7. 遍历结束, 直接返回结果
 */
function dailyTemperatures (T) {
  const decreaseStack = []
  // 1. 初始化一个栈，所有结果赋值为 0
  const res = new Array(T.length).fill(0)
  // 2. 循环温度，取出当前温度
  for (let i = 0; i < T.length; i++) {
    const cur = T[i]
    // 3. 如果栈为空，直接入栈
    if (decreaseStack.length === 0) {
      decreaseStack.push(i)
    } else {
      // 4. 如果栈不为空，判断当前温度是否大于栈顶温度,如果大于，出栈，计算出栈温度的索引差值，赋值给结果数组,
      // 5. 重复 3，直到栈为空或者当前温度小于等于栈顶温度
      while (decreaseStack.length > 0 && cur > T[decreaseStack[decreaseStack.length - 1]]) {
        const top = decreaseStack.pop()
        res[top] = i - top
      }
      // 6. 如果小于等于，入栈
      decreaseStack.push(i)
    }
  }
  // 7. 遍历结束, 直接返回结果
  return res
}

module.exports = dailyTemperatures
