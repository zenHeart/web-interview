const combinationSum = require('./combinationSum')
const testData = {
  empty: {
    input: [[], 1],
    expect: []
  },
  single: {
    input: [[1], 1],
    expect: [[1]]
  },
  double: {
    input: [[2, 3], 5],
    expect: [[2, 3]]
  },
  multi: {
    input: [[2, 3, 4, 5], 7],
    expect: [[2, 2, 3], [2, 5], [3, 4]]
  },
  multi2: {
    input: [[2, 3, 6, 7], 7],
    expect: [[2, 2, 3], [7]]
  },
  multi3: {
    input: [[2, 3, 5], 8],
    expect: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
  }
}

describe('combinationSum', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = combinationSum(...data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
