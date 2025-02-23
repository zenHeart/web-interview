/**
 * 这是一个三数之和的问题， 需要从数组中提取出三个数，使得这三个数的和等于target
 * 请给出结题的伪代码注释，并说明考察了哪些算法知识
 *
 *
 *  */
function arr3Sum (arr, target) {
  // 1. 对数组排序，降低复杂度
  arr.sort((a, b) => a - b)

  // 2. 固定一个数，然后使用双指针法，找到另外两个数
  let fixed = 0
  let searLeftIndex = fixed + 1
  let searchRightIndex = arr.length - 1

  // 3. 搜索结果
  const result = []
  // 固定指针移到了倒数第三个数，说明整体遍历结束
  while (fixed < arr.length - 3) {
    const fixEle = arr[fixed]
    // 如果历史结果有第一个固定元素，则直接跳过
    if (result.some(answer => answer[0] === fixEle)) {
      fixed++
      continue
    }

    // 遍历当前固定元素的所有可能
    while (
    // 右指针大于左指针
      searLeftIndex < searchRightIndex
    ) {
      const leftEle = arr[searLeftIndex]
      const rightEle = arr[searchRightIndex]
      const sum = fixEle + leftEle + rightEle

      if (sum === target) {
        result.push([fixEle, leftEle, rightEle])
        searLeftIndex++
        searchRightIndex--
      } else if (sum < target) {
        searLeftIndex++
      } else {
        searchRightIndex--
      }
    }

    fixed++
    searLeftIndex = fixed + 1
    searchRightIndex = arr.length - 1
  }
  return result
}

console.log(arr3Sum([1, 2, 3, 4, 5, 6, 7], 10)) // [[1, 2, 7], [1, 3, 6], [1, 4, 5], [2, 3, 5]]
console.log(arr3Sum([1, 2, 3, 4, 5, 6, 7], 0)) // []
console.log(arr3Sum([-8, -4, -2, 0, 1, 2, 3, 4, 5], 0)) // [[-8,3,5],[-4,0,4],[-4,1,3],[-2,0,2]]
