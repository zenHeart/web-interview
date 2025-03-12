function shellSort (arr) {
  // 非数组或数组元素小于 2 直接返回
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr
  }
  // 拷贝数组避免直接在 arr 上操作
  const sortArr = []
  const tempArr = [...arr]
  while (tempArr.length) {
    let min = tempArr[0]
    let index = 0
    for (let i = 1; i < tempArr.length; i++) {
      if (tempArr[i] < min) {
        min = tempArr[i]
        index = i
      }
    }
    sortArr.push(min)
    tempArr.splice(index, 1)
  }

  return sortArr
}

module.exports = shellSort
