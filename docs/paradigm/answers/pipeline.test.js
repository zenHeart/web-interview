const pipeline = require('./pipeline')

describe('pipeline', () => {
  it('should return a function', () => {
    expect(typeof pipeline()).toBe('function')
  })

  it('should execute functions from left to right', () => {
    const addOne = x => x + 1
    const double = x => x * 2
    const piped = pipeline(addOne, double)
    expect(piped(1)).toBe(4)
  })

  it('should handle multiple arguments', () => {
    const add = (x, y) => x + y
    const multiply = (x, y) => x * y
    const piped = pipeline(add, multiply)
    expect(piped(1, 2)).toBe(6)
  })

  it('should handle functions with different arity', () => {
    const addOne = x => x + 1
    const add = (x, y) => x + y
    const piped = pipeline(add, addOne)
    expect(piped(1, 2)).toBe(4)
  })

  it('should handle no functions', () => {
    const piped = pipeline()
    expect(piped(1)).toBe(undefined)
  })

  it('should handle one function', () => {
    const addOne = x => x + 1
    const piped = pipeline(addOne)
    expect(piped(1)).toBe(2)
  })

  it('should pass multiple arguments to the first function', () => {
    const toArray = (...args) => args
    const piped = pipeline(toArray)
    expect(piped(1, 2, 3)).toEqual([1, 2, 3])
  })

  it('should work with functions that return null or undefined', () => {
    const returnNull = () => null
    const returnUndefined = () => undefined
    const pipedNull = pipeline(returnNull)
    const pipedUndefined = pipeline(returnUndefined)

    expect(pipedNull()).toBe(null)
    expect(pipedUndefined()).toBe(undefined)
  })

  it('should handle a mix of unary and n-ary functions', () => {
    const add = (x, y) => x + y
    const multiplyByTwo = x => x * 2
    const addThenMultiply = pipeline(add, multiplyByTwo)

    expect(addThenMultiply(2, 3)).toBe(10)
  })

  it('should handle more complex compositions', () => {
    const increment = x => x + 1
    const square = x => x * x
    const double = x => x * 2

    const piped = pipeline(increment, square, double)
    expect(piped(2)).toBe(18)
  })
})
