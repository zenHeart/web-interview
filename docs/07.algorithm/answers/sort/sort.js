exports.bubbleSort = bubbleSort
exports.insertSort = insertSort
exports.selectionSort = selectionSort
exports.mergeSort = mergeSort
exports.mergeArr = mergeArr
exports.quickSort = quickSort

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

function selectionSort (arr) {
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

function mergeSort (arr) {
  // 非数组或数组元素小于 2 直接返回
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr
  } else if (arr.length === 2) {
    const [a, b] = arr
    if (a > b) {
      return [b, a]
    } else {
      return [a, b]
    }
  } else {
    const middleIndex = Math.floor(arr.length / 2)
    const leftArr = arr.slice(0, middleIndex)
    const rightArr = arr.slice(middleIndex)
    const sortLeft = mergeSort(leftArr)
    const sortRight = mergeSort(rightArr)
    return mergeArr(sortLeft, sortRight)
  }
}

function mergeArr (arr1, arr2) {
  const k = []
  let i = 0
  let j = 0

  // 任意数组未结束则不退出循环
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      k.push(arr2[j])
      j++
    } else {
      k.push(arr1[i])
      i++
    }
  }
  if (i >= arr1.length) {
    return k.concat(arr2.slice(j))
  } else {
    return k.concat(arr1.slice(i))
  }
}

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
