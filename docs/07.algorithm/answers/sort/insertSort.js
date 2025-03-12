function insertSort (arr) {
  // 非数组或数组元素小于 2 直接返回
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr
  }
  // 拷贝数组避免直接在 arr 上操作
  const backArr = []
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      backArr.push(arr[i])
    } else {
      // 插入对应位置
      let j
      for (j = backArr.length - 1; j >= 0; j--) {
        if (arr[i] > backArr[j]) {
          backArr.splice(j + 1, 0, arr[i])
          break
        }
      }
      // 若未找到此位置则插入最前面
      if (j === -1) {
        backArr.unshift(arr[i])
      }
    }
  }
  return backArr
}

module.exports = insertSort
