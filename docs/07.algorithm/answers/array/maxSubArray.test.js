const maxSubArray = require('./maxSubArray')

const testData = {
  'example 1': { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], output: 6 },
  'example 2': { input: [1], output: 1 },
  'example 3': { input: [5, 4, -1, 7, 8], output: 23 },
  'example 4': { input: [-1], output: -1 }
}

describe('maxSubArray', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(maxSubArray(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
