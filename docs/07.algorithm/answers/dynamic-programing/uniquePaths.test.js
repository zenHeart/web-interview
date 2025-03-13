const uniquePaths = require('./uniquePaths')

const testData = {
  'should return 1 for 1×7 grid': {
    input: [1, 7],
    output: 1
  },
  'should return 1 for 7×1 grid': {
    input: [7, 1],
    output: 1
  },
  'should return 2 for 2×2 grid': {
    input: [2, 2],
    output: 2
  },
  'should return 3 for 3×2 grid': {
    input: [3, 2],
    output: 3
  },
  'should return 6 for 3×3 grid': {
    input: [3, 3],
    output: 6
  },
  'should return 28 for 3×7 grid': {
    input: [3, 7],
    output: 28
  },
  'should return 28 for 7×3 grid': {
    input: [7, 3],
    output: 28
  }
}

describe('uniquePath', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(uniquePaths.uniquePaths(...testData[key].input)).toEqual(testData[key].output)
    })
  })
})
