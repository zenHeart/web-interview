const permute = require('./permute')
const testData = {
  empty: {
    input: [],
    expect: []
  },
  single: {
    input: [1],
    expect: [[1]]
  },
  double: {
    input: [1, 2],
    expect: [[1, 2], [2, 1]]
  },
  triple: {
    input: [1, 2, 3],
    expect: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
  }
}

describe('permute', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = permute(data.input)

      expect(res).toEqual(data.expect)
    })
  }
})
