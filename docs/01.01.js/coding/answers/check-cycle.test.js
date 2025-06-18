/**
 * 检测对象是否存在循环引用
 */
const chai = require('chai')

function checkCycle (obj) {
  try {
    JSON.stringify(obj)
    return false
  } catch (e) {
    return e.message.includes('circular')
  }
}

// use weakSet to check has duplicate refer
function checkCycleUseWeakSet (obj, markObjects = new WeakSet()) {
  for (const key in obj) {
    const element = obj[key]
    if (typeof element === 'object') {
      if (markObjects.has(element)) {
        return true
      }
      markObjects.add(element)
      return checkCycleUseWeakSet(element, markObjects)
    }
  }
  return false
}

// use graph theory to check has cycle
// TODO: unfinished

const TestData = {
  empty: {
    input: {},
    expected: false
  },
  'no circular': {
    input: { a: 1, b: 2, c: 3 },
    expected: false
  },
  'has circular': {
    input: { a: 1, b: 2, c: 3 },
    expected: true
  },
  'nest circular': {
    input: { a: 1, b: 2, c: 3, circyle: { a: 1, b: 2, c: 3 } },
    expected: true
  }
}
TestData['has circular'].input.circyle = TestData['has circular'].input
TestData['nest circular'].input.circyle.cycle = TestData['nest circular'].input

describe('检测对象是否存在循环引用', function () {
  describe('use circular error', function () {
    for (const testKey in TestData) {
      it(testKey, function () {
        chai.expect(checkCycle(TestData[testKey].input)).to.be.equal(TestData[testKey].expected)
      })
    }
  })

  describe('use checkCycleUseWeakSet ', function () {
    for (const testKey in TestData) {
      it(testKey, function () {
        chai.expect(checkCycleUseWeakSet(TestData[testKey].input)).to.be.equal(TestData[testKey].expected)
      })
    }
  })
})
