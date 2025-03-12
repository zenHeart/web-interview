const combine = require('./combine')
const testData = {
  empty: {
    input: [[]],
    expect: []
  },
  single: {
    input: [1, 1],
    expect: [[1]]
  },
  double: {
    input: [2, 1],
    expect: [[1], [2]]
  },
  triple: {
    input: [3, 2],
    expect: [[1, 2], [1, 3], [2, 3]]
  },
  four: {
    input: [4, 2],
    expect: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
  },
  all: {
    input: [4, 4],
    expect: [[1, 2, 3, 4]]
  }

}

describe('combine', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = combine(...data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
