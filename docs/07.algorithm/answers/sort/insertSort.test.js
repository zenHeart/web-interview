const testData = require('./fixture/testData')
const insertSort = require('./insertSort')

describe('插入排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = insertSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
