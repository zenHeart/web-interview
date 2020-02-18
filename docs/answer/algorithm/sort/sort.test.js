const { expect } = require('chai');
const testData = require('./fixture/testData');
const sort = require('./sort');
describe('sort 排序测试', function() {
    describe('bubble 排序', function() {
        for (let unitTestName in testData) {
            it(unitTestName, function() {
                let data = testData[unitTestName];

                let res = sort.bubbleSort(data.input);
                expect(res).to.deep.eq(data.expect);
            });
        }
    });
});
