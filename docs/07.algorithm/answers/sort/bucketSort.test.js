const testData = require('./fixture/testData');
const bucketSort = require('./bucketSort');

describe('桶排序', function () {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName];

      const res = bucketSort(data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
