const { runMiddleware } = require('./cps.js')

describe('runMiddleware', () => {
  // Synchronous tests
  test('should handle empty middleware array', () => {
    const initialData = { value: 42 }
    return new Promise((resolve) => {
      runMiddleware(initialData, [], (result) => {
        expect(result).toBe(initialData)
        resolve()
      })
    })
  })
  test('should run a single middleware function', () => {
    const initialData = { count: 0 }
    const middleware = [
      (data, next) => {
        data.count += 1
        next()
      }
    ]

    return new Promise((resolve) => {
      runMiddleware(initialData, middleware, (result) => {
        expect(result.count).toBe(1)
        resolve()
      })
    })
  })
  test('should run multiple middleware in sequence', () => {
    const initialData = { count: 0, operations: [] }
    const middleware = [
      (data, next) => {
        data.count += 1
        data.operations.push('first')
        next()
      },
      (data, next) => {
        data.count *= 2
        data.operations.push('second')
        next()
      },
      (data, next) => {
        data.count -= 1
        data.operations.push('third')
        next()
      }
    ]

    return new Promise((resolve) => {
      runMiddleware(initialData, middleware, (result) => {
        expect(result.count).toBe(1) // (0+1)*2-1 = 1
        expect(result.operations).toEqual(['first', 'second', 'third'])
        resolve()
      })
    })
  })
  test('should work with async middleware', () => {
    const initialData = { value: 10 }
    const middleware = [
      (data, next) => {
        setTimeout(() => {
          data.value += 5
          next()
        }, 10)
      },
      (data, next) => {
        setTimeout(() => {
          data.value *= 2
          next()
        }, 10)
      }
    ]

    return new Promise((resolve) => {
      runMiddleware(initialData, middleware, (result) => {
        expect(result.value).toBe(30) // (10+5)*2 = 30
        resolve()
      })
    })
  })
  test('should handle mixed sync and async middleware', () => {
    const initialData = { value: 5, steps: [] }
    const middleware = [
      (data, next) => {
        // Synchronous middleware
        data.value += 5
        data.steps.push('sync1')
        next()
      },
      (data, next) => {
        // Asynchronous middleware
        setTimeout(() => {
          data.value *= 2
          data.steps.push('async')
          next()
        }, 10)
      },
      (data, next) => {
        // Synchronous middleware again
        data.value -= 3
        data.steps.push('sync2')
        next()
      }
    ]

    return new Promise((resolve) => {
      runMiddleware(initialData, middleware, (result) => {
        expect(result.value).toBe(17) // (5+5)*2-3 = 17
        expect(result.steps).toEqual(['sync1', 'async', 'sync2'])
        resolve()
      })
    })
  })
})
