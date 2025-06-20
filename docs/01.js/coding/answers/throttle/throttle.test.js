/* eslint-disable jest/no-done-callback */

const throttle = require('./throttle')
// const throttle = require('lodash/throttle')

// 工具函数
function identity (v) { return v }

// throttle.test.js

describe('throttle 节流函数', () => {
  test('应该节流函数的调用', done => {
    expect.assertions(2)

    let callCount = 0
    const throttled = throttle(() => { callCount++ }, 32)

    throttled()
    throttled()
    throttled()

    const lastCount = callCount
    expect(callCount).toBeGreaterThan(0)

    setTimeout(() => {
      expect(callCount).toBeGreaterThan(lastCount)
      done()
    }, 64)
  })

  test('后续调用应返回第一次调用的结果', done => {
    expect.assertions(5)

    const throttled = throttle(identity, 32)
    const results = [throttled('a'), throttled('b')]

    expect(results).toEqual(['a', 'a'])

    setTimeout(() => {
      const results2 = [throttled('c'), throttled('d')]
      expect(results2[0]).not.toBe('a')
      expect(results2[0]).not.toBeUndefined()
      expect(results2[1]).not.toBe('d')
      expect(results2[1]).not.toBeUndefined()
      done()
    }, 64)
  })

  test('应在 func 被调用时清除 timeout', done => {
    expect.assertions(1)

    let callCount = 0
    let dateCount = 0

    // mock Date.now
    const originalNow = Date.now
    Date.now = function () {
      return ++dateCount === 5 ? Infinity : originalNow()
    }

    const throttled = throttle(() => { callCount++ }, 32)

    throttled()
    throttled()

    setTimeout(() => {
      expect(callCount).toBe(2)
      // 恢复原始 Date.now
      Date.now = originalNow
      done()
    }, 64)
  })

  test('只调用一次时不应触发 trailing 调用', done => {
    expect.assertions(2)

    let callCount = 0
    const throttled = throttle(() => { callCount++ }, 32)

    throttled()
    expect(callCount).toBe(1)

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 64)
  });

  [false, true].forEach(index => {
    test(`重复调用时应触发调用${index ? '，且 leading 为 false' : ''}`, done => {
      expect.assertions(1)

      let callCount = 0
      const limit = 320
      const options = index ? { leading: false } : {}
      const throttled = throttle(() => { callCount++ }, 32, options)

      const start = +new Date()
      while ((new Date() - start) < limit) {
        throttled()
      }
      const actual = callCount > 1
      setTimeout(() => {
        expect(actual).toBeTruthy()
        done()
      }, 1)
    })
  })

  test('应尽快触发第二次节流调用', done => {
    expect.assertions(3)

    let callCount = 0

    const throttled = throttle(() => {
      callCount++
    }, 128, { leading: false })

    throttled()

    setTimeout(() => {
      expect(callCount).toBe(1)
      throttled()
    }, 192)

    setTimeout(() => {
      expect(callCount).toBe(1)
    }, 254)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 384)
  })

  test('应应用默认选项', done => {
    expect.assertions(2)

    let callCount = 0
    const throttled = throttle(() => { callCount++ }, 32, {})

    throttled()
    throttled()
    expect(callCount).toBe(1)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 128)
  })

  test('应支持 leading 选项', () => {
    expect.assertions(2)

    const withLeading = throttle(identity, 32, { leading: true })
    expect(withLeading('a')).toBe('a')

    const withoutLeading = throttle(identity, 32, { leading: false })
    expect(withoutLeading('a')).toBeUndefined()
  })

  test('应支持 trailing 选项', done => {
    expect.assertions(6)

    let withCount = 0
    let withoutCount = 0

    const withTrailing = throttle(value => {
      withCount++
      return value
    }, 64, { trailing: true })

    const withoutTrailing = throttle(value => {
      withoutCount++
      return value
    }, 64, { trailing: false })

    expect(withTrailing('a')).toBe('a')
    expect(withTrailing('b')).toBe('a')

    expect(withoutTrailing('a')).toBe('a')
    expect(withoutTrailing('b')).toBe('a')

    setTimeout(() => {
      expect(withCount).toBe(2)
      expect(withoutCount).toBe(1)
      done()
    }, 256)
  })

  test('当 trailing 为 false 时，超时结束后不应更新 lastCalled', done => {
    expect.assertions(1)

    let callCount = 0

    const throttled = throttle(() => {
      callCount++
    }, 64, { trailing: false })

    throttled()
    throttled()

    setTimeout(() => {
      throttled()
      throttled()
    }, 96)

    setTimeout(() => {
      expect(callCount).toBeGreaterThan(1)
      done()
    }, 192)
  })

  test('系统时间为 0 时应能正常工作', done => {
    expect.assertions(3)

    let callCount = 0
    let dateCount = 0

    // 保存原始 Date.now
    const originalNow = Date.now
    // mock Date.now
    Date.now = function () {
      return ++dateCount < 4 ? 0 : originalNow()
    }

    const throttled = throttle(value => {
      callCount++
      return value
    }, 32)

    const results = [throttled('a'), throttled('b'), throttled('c')]
    expect(results).toEqual(['a', 'a', 'a'])
    expect(callCount).toBe(1)

    setTimeout(() => {
      expect(callCount).toBe(2)
      // 恢复原始 Date.now
      Date.now = originalNow
      done()
    }, 64)
  })
})

describe('throttle 额外用例', () => {
  test('throttle 不应因非对象 options 报错', () => {
    function noop () {}
    expect(() => throttle(noop, 32, 1)).not.toThrow()
  })

  test('throttle 应使用默认 wait=0', done => {
    let callCount = 0
    const throttled = throttle(() => { callCount++ })

    throttled()

    setTimeout(() => {
      throttled()
      expect(callCount).toBe(2)
      done()
    }, 32)
  })

  test('throttle 应以正确 this 调用 func', done => {
    const actual = []
    const object = { throttled: throttle(function () { actual.push(this) }, 32) }
    const expected = [object, object]

    object.throttled()
    object.throttled()
    setTimeout(() => {
      expect(actual).toEqual(expected)
      done()
    }, 64)
  })

  test('throttle 支持递归调用', done => {
    const actual = []
    const args = [[{}, 'a'], [{}, 'b'], [{}, 'c']]
    const expected = args.slice()
    const queue = args.slice()

    const throttled = throttle(function (chr) {
      const current = [this, chr]
      actual.push(current)
      const next = queue.shift()
      if (next) {
        throttled.call(next[0], next[1])
      }
    }, 32)

    const next = queue.shift()
    throttled.call(next[0], next[1])
    expect(actual).toEqual(expected.slice(0, 1))

    setTimeout(() => {
      expect(actual).toEqual(expected.slice(0, actual.length))
      done()
    }, 256)
  })

  test('throttle 系统时间倒退时应能正常工作', done => {
    let callCount = 0
    let dateCount = 0
    const originalNow = Date.now
    Date.now = function () {
      return ++dateCount === 4
        ? +new Date(2012, 3, 23, 23, 27, 18)
        : originalNow()
    }

    const throttled = throttle(() => { callCount++ }, 32)

    throttled()

    setTimeout(() => {
      throttled()
      expect(callCount).toBe(2)
      Date.now = originalNow
      done()
    }, 64)
  })

  test('throttle 支持取消延迟调用', done => {
    let callCount = 0
    const throttled = throttle(() => { callCount++ }, 32, { leading: false })

    throttled()
    throttled.cancel && throttled.cancel()

    setTimeout(() => {
      expect(callCount).toBe(0)
      done()
    }, 64)
  })

  test('throttle 取消后应重置 lastCalled', done => {
    let callCount = 0
    const throttled = throttle(() => ++callCount, 32, { leading: true })

    expect(throttled()).toBe(1)
    throttled.cancel && throttled.cancel()
    expect(throttled()).toBe(2)
    throttled()

    setTimeout(() => {
      expect(callCount).toBe(3)
      done()
    }, 64)
  })

  test('throttle 支持 flush 延迟调用', done => {
    let callCount = 0
    const throttled = throttle(() => ++callCount, 32, { leading: false })

    throttled()
    expect(throttled.flush && throttled.flush()).toBe(1)

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 64)
  })

  test('throttle cancel/flush 无队列时应为 noop', done => {
    let callCount = 0
    const throttled = throttle(() => { callCount++ }, 32)

    throttled.cancel && throttled.cancel()
    expect(throttled.flush && throttled.flush()).toBeUndefined()

    setTimeout(() => {
      expect(callCount).toBe(0)
      done()
    }, 64)
  })
})
