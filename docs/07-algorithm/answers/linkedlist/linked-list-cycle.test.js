const { expect } = require('chai')
const testData = require('./fixture/testData.js')
const cycle = require('./linked-list-cycle.js')

describe('循环链表测试用例', function () {
  describe('链表循环检测 hasCycle', function () {
    // eslint-disable-next-line
    for (const unitTestName in testData.cycle) {
      it(unitTestName, function () {
        const data = testData.cycle[unitTestName]
        const res = cycle.hasCycle(data.input)

        expect(res).to.deep.equal(data.expectHasCycle)
      })
    }
  })

  describe('链表循环点检测', function () {
    // eslint-disable-next-line
    for (const unitTestName in testData.cycle) {
      it(unitTestName, function () {
        const data = testData.cycle[unitTestName]
        const res = cycle.detectCycle(data.input)

        expect(res).to.equal(data.expectPos)
      })
    }
  })
})
