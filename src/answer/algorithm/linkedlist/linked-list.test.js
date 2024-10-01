/* eslint-disable mocha/no-setup-in-describe */
const { expect } = require('chai');
const testData = require('./fixture/testData');
const { LinkedList } = require('./linked-list');

describe('链表结构测试', function () {
  describe('链表创建', function () {
    for (const unitTestName in testData.create) {
      it(unitTestName, function () {
        const data = testData.create[unitTestName];
        const res = new LinkedList(data.input);

        expect(res).to.deep.equal(data.expect);
      });
    }
  });

  describe('add 添加节点', function () {
    for (const unitTestName in testData.add) {
      it(unitTestName, function () {
        const data = testData.add[unitTestName];
        const res = new LinkedList(data.input[0]).add(data.input[1]);
        expect(res).to.deep.equal(data.expect);
      });
    }
  });

  describe('removeByVal 根据值删除节点', function () {
    for (const unitTestName in testData.removeByVal) {
      it(unitTestName, function () {
        const data = testData.removeByVal[unitTestName];
        const res = new LinkedList(data.input[0]).removeByVal(data.input[1]);
        expect(res).to.deep.equal(data.expect);
      });
    }
  });

  describe('removeByNum 根据节点位置', function () {
    for (const unitTestName in testData.removeByNum) {
      it(unitTestName, function () {
        const data = testData.removeByNum[unitTestName];
        const res = new LinkedList(data.input[0]).removeByNum(data.input[1]);
        expect(res).to.deep.equal(data.expect);
      });
    }
  });
});
