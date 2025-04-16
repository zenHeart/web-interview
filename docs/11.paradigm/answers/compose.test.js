const compose = require('./compose')

describe('compose', () => {
  it('should return a function', () => {
    expect(typeof compose()).toBe('function')
  })

  it('should compose functions from right to left', () => {
    const addOne = x => x + 1
    const double = x => x * 2
    const composed = compose(double, addOne)
    expect(composed(1)).toBe(4)
  })

  it('should handle multiple arguments', () => {
    const add = (x, y) => x + y
    const multiply = (x, y) => x * y
    const composed = compose(multiply, add)
    expect(composed(1, 2)).toBe(6)
  })

  it('should handle functions with different arity', () => {
    const addOne = x => x + 1
    const add = (x, y) => x + y
    const composed = compose(addOne, add)
    expect(composed(1, 2)).toBe(4)
  })

  it('should handle no functions', () => {
    const composed = compose()
    expect(composed(1)).toBe(undefined)
  })

  it('should handle one function', () => {
    const addOne = x => x + 1
    const composed = compose(addOne)
    expect(composed(1)).toBe(2)
  })

  it('should pass multiple arguments to the first function', () => {
    const toArray = (...args) => args
    const composed = compose(toArray)
    expect(composed(1, 2, 3)).toEqual([1, 2, 3])
  })

  it('should work with functions that return null or undefined', () => {
    const returnNull = () => null
    const returnUndefined = () => undefined
    const composedNull = compose(returnNull)
    const composedUndefined = compose(returnUndefined)

    expect(composedNull()).toBe(null)
    expect(composedUndefined()).toBe(undefined)
  })

  it('should handle a mix of unary and n-ary functions', () => {
    const add = (x, y) => x + y
    const multiplyByTwo = x => x * 2
    const addThenMultiply = compose(multiplyByTwo, add)

    expect(addThenMultiply(2, 3)).toBe(10)
  })

  it('should handle more complex compositions', () => {
    const increment = x => x + 1
    const square = x => x * x
    const double = x => x * 2

    const composed = compose(double, square, increment)
    expect(composed(2)).toBe(18)
  })
})
