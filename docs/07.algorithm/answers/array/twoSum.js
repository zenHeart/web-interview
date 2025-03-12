function twoSum (arr, target) {
  const eleMap = {}
  for (let i = 0; i < arr.length; i++) {
    const currentEle = arr[i]
    const left = target - currentEle
    if (eleMap[left] !== undefined) {
      return [currentEle, left]
    } else {
      eleMap[currentEle] = i
    }
  }
  return []
}
console.log(twoSum([2, 7, 11, 15], 9)) //  [ 7, 2 ]
console.log(twoSum([2, 7, 11, 15], 20)) //  [ 7, 2 ]
console.log(twoSum([2, 7, 11, 30, 15], 45)) //  [ 7, 2 ]
