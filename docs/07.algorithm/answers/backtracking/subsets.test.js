const subsets = require('./subsets')
const testData = {
  empty: {
    input: [],
    expect: [[]]
  },
  single: {
    input: [1],
    expect: [[], [1]]
  },
  double: {
    input: [1, 2],
    expect: [[], [1], [1, 2], [2]]
  },
  triple: {
    input: [1, 2, 3],
    expect: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
  }
}

describe('subsets', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = subsets(data.input)

      expect(res).toEqual(data.expect)
    })
  }
})
