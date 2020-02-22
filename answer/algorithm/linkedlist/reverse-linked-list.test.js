/**
 * 单链表反转
 */
const { expect } = require('chai');
const { LinkedList } = require('./linked-list');
const reverseLinkedList = require('./reverse-linked-list');

let testData = {
  多节点链表: {
    input: new LinkedList([1, 2, 3, 4, 5]),
    expect: new LinkedList([5, 4, 3, 2, 1])
  },
  单个节点: {
    input: new LinkedList([1]),
    expect: new LinkedList([1])
  },
  空节点: {
    input: null,
    expect: null
  }
};

describe('单链表翻转测试', function() {
  for (let testUnitName in testData) {
    it(testUnitName, function() {
      let data = testData[testUnitName];
      let res = reverseLinkedList(data.input);
      expect(res).to.deep.eq(data.expect);
    });
  }
});
