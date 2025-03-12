function quickSort (arr) {
  // 非数组或数组元素小于 2 直接返回
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr
  } else {
    const compareNum = arr[0]
    const leftArr = []
    const rightArr = []
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < compareNum) {
        leftArr.push(arr[i])
      } else {
        rightArr.push(arr[i])
      }
    }
    const sortLeftArr = quickSort(leftArr)
    const sortRightArr = quickSort(rightArr)
    return [...sortLeftArr, compareNum, ...sortRightArr]
  }
}

module.exports = quickSort
