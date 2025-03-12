const testData = require('./fixture/testData')
const selectionSort = require('./selectionSort')

describe('选择排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = selectionSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
