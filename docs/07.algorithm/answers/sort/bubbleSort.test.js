const testData = require('./fixture/testData')
const bubbleSort = require('./bubbleSort')

describe('冒泡排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = bubbleSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
