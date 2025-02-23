function arrMerge (arr1, arr2) {
  // 1. 设置双指针
  let indexArr1 = arr1.length - arr2.length - 1
  let indexArr2 = arr2.length - 1

  // 2. 从后往前遍历双指针，直到一个指针的值耗尽
  while (indexArr1 >= 0 && indexArr2 >= 0) {
    // 提取当前指针元素
    const elArr1 = arr1[indexArr1]
    const elArr2 = arr2[indexArr2]
    const setIndex = indexArr1 + indexArr2 + 1

    // 谁大则将大的值填充到对应位子，并兼该值对应数组的指针
    if (elArr1 > elArr2) {
      arr1[setIndex] = elArr1
      indexArr1--
    } else {
      arr1[setIndex] = elArr2
      indexArr2--
    }
  }
  // 3. 如果指针 2 还未耗尽
  while (indexArr2 >= 0) {
    arr1[indexArr2] = arr2[indexArr2]
    indexArr2--
  }

  // 如果不是说明已经排序完成，返回结果
  return arr1
}

console.log(arrMerge([1, 2, 3, 4, 5, undefined, undefined, undefined, undefined, undefined], [3, 4, 7, 8, 9])) //  [ 7, 2 ]
console.log(arrMerge([2, undefined], [1])) //  [ 7, 2 ]
console.log(arrMerge([2, 3, 4], [])) //  [ 7, 2 ]
