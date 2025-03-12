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
 }function mergeSort (arr) {
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

module.exports = mergeSort
