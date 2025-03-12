const printBinary = require('./printBinary')
const testData = {
  empty: {
    input: 0,
    expect: []
  },
  single: {
    input: 1,
    expect: ['0', '1']
  },
  double: {
    input: 2,
    expect: ['00', '01', '10', '11']
  },
  triple: {
    input: 3,
    expect: ['000', '001', '010', '011', '100', '101', '110', '111']
  }
}

describe('permute', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = printBinary(data.input)

      expect(res).toEqual(data.expect)
    })
  }
})
