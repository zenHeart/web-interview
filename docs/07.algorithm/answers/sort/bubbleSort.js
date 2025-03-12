function bubbleSort (arr) {
  // 非数组或数组元素小于 2 直接返回
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr
  }
  // 拷贝数组避免直接在 arr 上操作
  const sortArr = [...arr]

  for (let i = sortArr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      const before = sortArr[j]
      const after = sortArr[j + 1]
      if (before > after) {
        // 交换元素位置
        sortArr.splice(j, 2, after, before)
      }
    }
  }
  return sortArr
}

module.exports = bubbleSort
