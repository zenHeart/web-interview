const lengthOfLIS = require('./lengthOfLIS')

const testData = {
  'empty array': { input: [], output: 0 },
  'single element': { input: [10], output: 1 },
  'example 1': { input: [10, 9, 2, 5, 3, 7, 101, 18], output: 4 },
  'example 2': { input: [0, 1, 0, 3, 2, 3], output: 4 },
  'example 3': { input: [7, 7, 7, 7, 7, 7, 7], output: 1 }
}

describe('lengthOfLIS', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(lengthOfLIS(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
