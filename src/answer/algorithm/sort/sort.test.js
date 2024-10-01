const { expect } = require('chai');
const testData = require('./fixture/testData');
const sort = require('./sort');
describe('sort 排序测试', function () {
  describe('冒泡排序', function () {
    for (const unitTestName in testData) {
      it(unitTestName, function () {
        const data = testData[unitTestName];

        const res = sort.bubbleSort(data.input);
        expect(res).to.deep.eq(data.expect);
      });
    }
  });

  describe('插入排序', function () {
    for (const unitTestName in testData) {
      it(unitTestName, function () {
        const data = testData[unitTestName];

        const res = sort.insertSort(data.input);
        expect(res).to.deep.eq(data.expect);
      });
    }
  });

  describe('选择排序', function () {
    for (const unitTestName in testData) {
      it(unitTestName, function () {
        const data = testData[unitTestName];

        const res = sort.selectionSort(data.input);
        expect(res).to.deep.eq(data.expect);
      });
    }
  });

  describe('归并排序', function () {
    describe('归并逻辑测试', function () {
      const testData = {
        单一数组归并: {
          input: [[1], [2]],
          expect: [1, 2]
        },
        多元素归并: {
          input: [
            [1, 2, 6],
            [2, 3, 7, 8]
          ],
          expect: [1, 2, 2, 3, 6, 7, 8]
        }
      };
      for (const unitTestName in testData) {
        it(unitTestName, function () {
          const data = testData[unitTestName];
          const res = sort.mergeArr.apply(this, data.input);

          expect(res).to.deep.eq(data.expect);
        });
      }
    });

    describe('归并测试', function () {
      for (const unitTestName in testData) {
        it(unitTestName, function () {
          const data = testData[unitTestName];

          const res = sort.mergeSort(data.input);
          expect(res).to.deep.eq(data.expect);
        });
      }
    });
  });

  describe('快速排序', function () {
    for (const unitTestName in testData) {
      it(unitTestName, function () {
        const data = testData[unitTestName];

        const res = sort.quickSort(data.input);
        expect(res).to.deep.eq(data.expect);
      });
    }
  });
});
