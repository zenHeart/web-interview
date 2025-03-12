const testData = require('./fixture/testData')
const mergeSort = require('./mergeSort')

describe('归并排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]

      const res = mergeSort(data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
