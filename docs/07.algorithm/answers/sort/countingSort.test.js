const testData = require('./fixture/testData');
const countingSort = require('./countingSort');

describe('计数排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName];

      const res = countingSort(data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
