const testData = require('./fixture/testData')
const shellSort = require('./shellSort')

describe('希尔排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = shellSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
