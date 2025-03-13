const findKthLargest = require('./findKthLargest')

const testData = {
  'example 1': { input: { nums: [3, 2, 1, 5, 6, 4], k: 2 }, output: 5 },
  'example 2': { input: { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }, output: 4 }
}

describe('findKthLargest', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      const { nums, k } = testData[key].input
      expect(findKthLargest(nums, k)).toEqual(testData[key].output)
    })
  })
})
