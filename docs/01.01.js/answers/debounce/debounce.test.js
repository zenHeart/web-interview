/* eslint-disable jest/no-done-callback */
const debounce = require('./debounce')
// const debounce = require('lodash/debounce')

function identity (x) {
  return x
}

describe('debounce', () => {
  test('应该防抖一个函数', done => {
    expect.assertions(6)

    let callCount = 0

    const debounced = debounce(function (value) {
      ++callCount
      return value
    }, 32)
    // 初始化不该触发函数调用
    const results = [debounced('a'), debounced('b'), debounced('c')]
    expect(results).toEqual([undefined, undefined, undefined])
    expect(callCount).toBe(0)

    setTimeout(() => {
      expect(callCount).toBe(1)

      const results2 = [debounced('d'), debounced('e'), debounced('f')]
      expect(results2).toEqual(['c', 'c', 'c'])
      expect(callCount).toBe(1)
    }, 128)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 256)
  })

  test('后续的防抖调用应返回最后一次 func 的结果', done => {
    expect.assertions(2)

    const debounced = debounce(identity, 32)
    debounced('a')

    setTimeout(() => {
      expect(debounced('b')).not.toBe('b')
    }, 64)

    setTimeout(() => {
      expect(debounced('c')).not.toBe('c')
      done()
    }, 128)
  })

  test('当 wait 为 0 时不应立即调用 func', done => {
    expect.assertions(2)

    let callCount = 0
    const debounced = debounce(function () { ++callCount }, 0)

    debounced()
    debounced()
    expect(callCount).toBe(0)

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 5)
  })

  test('应应用默认选项', done => {
    expect.assertions(2)

    let callCount = 0
    const debounced = debounce(function () { callCount++ }, 32, {})

    debounced()
    expect(callCount).toBe(0)

    setTimeout(() => {
      expect(callCount).toBe(1)
      done()
    }, 64)
  })

  test('应支持 leading 选项', done => {
    expect.assertions(4)

    const callCounts = [0, 0]

    const withLeading = debounce(function () {
      callCounts[0]++
    }, 32, { leading: true })

    const withLeadingAndTrailing = debounce(function () {
      callCounts[1]++
    }, 32, { leading: true })

    withLeading()
    expect(callCounts[0]).toBe(1)

    withLeadingAndTrailing()
    withLeadingAndTrailing()
    expect(callCounts[1]).toBe(1)

    setTimeout(() => {
      expect(callCounts).toEqual([1, 2])

      withLeading()
      expect(callCounts[0]).toBe(2)

      done()
    }, 64)
  })

  test('后续 leading 防抖调用应返回最后一次 func 的结果', done => {
    expect.assertions(2)

    const debounced = debounce(identity, 32, { leading: true, trailing: false })
    const results = [debounced('a'), debounced('b')]

    expect(results).toEqual(['a', 'a'])

    setTimeout(() => {
      const results2 = [debounced('c'), debounced('d')]
      expect(results2).toEqual(['c', 'c'])
      done()
    }, 64)
  })

  test('应支持 trailing 选项', done => {
    expect.assertions(4)

    let withCount = 0; let withoutCount = 0

    const withTrailing = debounce(function () {
      withCount++
    }, 32, { trailing: true })

    const withoutTrailing = debounce(function () {
      withoutCount++
    }, 32, { trailing: false })

    withTrailing()
    expect(withCount).toBe(0)

    withoutTrailing()
    expect(withoutCount).toBe(0)

    setTimeout(() => {
      expect(withCount).toBe(1)
      expect(withoutCount).toBe(0)
      done()
    }, 64)
  })

  test('应支持 maxWait 选项', done => {
    expect.assertions(4)

    let callCount = 0

    const debounced = debounce(function (value) {
      ++callCount
      return value
    }, 32, { maxWait: 64 })

    debounced()
    debounced()
    expect(callCount).toBe(0)

    setTimeout(() => {
      expect(callCount).toBe(1)
      debounced()
      debounced()
      expect(callCount).toBe(1)
    }, 128)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 256)
  })

  test('应在紧密循环中支持 maxWait', done => {
    expect.assertions(1)

    const limit = (typeof argv !== 'undefined' || typeof isPhantom !== 'undefined') ? 1000 : 320
    let withCount = 0; let withoutCount = 0

    const withMaxWait = debounce(function () {
      withCount++
    }, 64, { maxWait: 128 })

    const withoutMaxWait = debounce(function () {
      withoutCount++
    }, 96)

    const start = +new Date()
    while ((new Date() - start) < limit) {
      withMaxWait()
      withoutMaxWait()
    }
    const actual = [Boolean(withoutCount), Boolean(withCount)]
    setTimeout(() => {
      expect(actual).toEqual([false, true])
      done()
    }, 1)
  })

  test('应为 maxWait 后的后续防抖调用排队 trailing 调用', done => {
    expect.assertions(1)

    let callCount = 0

    const debounced = debounce(function () {
      ++callCount
    }, 200, { maxWait: 200 })

    debounced()

    setTimeout(debounced, 190)
    setTimeout(debounced, 200)
    setTimeout(debounced, 210)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 500)
  })

  test('当 delayed 被调用时应取消 maxDelayed', done => {
    expect.assertions(2)

    let callCount = 0

    const debounced = debounce(function () {
      callCount++
    }, 32, { maxWait: 64 })

    debounced()

    setTimeout(() => {
      debounced()
      expect(callCount).toBe(1)
    }, 128)

    setTimeout(() => {
      expect(callCount).toBe(2)
      done()
    }, 192)
  })

  test('应以正确的参数和 this 绑定调用 trailing', done => {
    expect.assertions(2)

    let actual; let callCount = 0; const object = {}

    const debounced = debounce(function (value) {
      actual = [this]
      Array.prototype.push.apply(actual, arguments)
      return ++callCount !== 2
    }, 32, { leading: true, maxWait: 64 })

    while (true) {
      if (!debounced.call(object, 'a')) {
        break
      }
    }
    setTimeout(() => {
      expect(callCount).toBe(2)
      expect(actual).toEqual([object, 'a'])
      done()
    }, 64)
  })
})
