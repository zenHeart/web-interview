const curry = require('./curry')

describe('curry function', () => {
  test('should curry a function with one argument', () => {
    const add = (x) => x + 1
    const curriedAdd = curry(add)
    expect(curriedAdd(2)).toBe(3)
  })

  test('should curry a function with multiple arguments', () => {
    const add = (a, b, c) => a + b + c
    const curriedAdd = curry(add)

    const add1 = curriedAdd(1)
    const add1and2 = add1(2)
    const result = add1and2(3)

    expect(result).toBe(6)
  })

  test('should execute immediately if all arguments are provided', () => {
    const multiply = (a, b) => a * b
    const result = curry(multiply, 4, 5)

    expect(result).toBe(20)
  })

  test('should handle functions with default parameters', () => {
    const greet = (name, greeting = 'Hello') => `${greeting}, ${name}!`
    const curriedGreet = curry(greet)

    expect(curriedGreet('World')).toBe('Hello, World!')
    expect(curry(greet, 'Friend')).toBe('Hello, Friend!')
    expect(curry(greet, 'Developer', 'Hi')).toBe('Hi, Developer!')
  })

  test('should handle extra arguments', () => {
    const sum = (a, b) => a + b
    const result = curry(sum, 3, 4, 5) // The third argument is ignored

    expect(result).toBe(7)
  })
})
