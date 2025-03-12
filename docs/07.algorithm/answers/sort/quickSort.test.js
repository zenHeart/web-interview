const testData = require('./fixture/testData')
const quickSort = require('./quickSort')

describe('快排', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = quickSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
