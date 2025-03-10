const testData = require('./fixture/cycle.js')
const cycle = require('./cycleCheck.js')

describe('循环链表测试用例', function () {
  describe('链表循环检测 hasCycle', function () {
    // eslint-disable-next-line
    for (const unitTestName in testData.cycle) {
      it(unitTestName, function () {
        const data = testData.cycle[unitTestName]
        const res = cycle.hasCycle(data.input)

        expect(res).toEqual(data.expectHasCycle)
      })
    }
  })

  describe('链表循环点检测', function () {
    // eslint-disable-next-line
    for (const unitTestName in testData.cycle) {
      it(unitTestName, function () {
        const data = testData.cycle[unitTestName]
        const res = cycle.detectCycle(data.input)

        expect(res).toEqual(data.expectPos)
      })
    }
  })
})
