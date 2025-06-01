/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable jest/no-conditional-expect */
describe('Promise API Demonstrations', () => {
  // 辅助函数，用于创建一个在延迟后解析的 promise
  const resolveAfter = (ms, value) =>
    new Promise(resolve => setTimeout(() => resolve(value), ms))

  // 辅助函数，用于创建一个在延迟后拒绝的 promise
  const rejectAfter = (ms, reason) =>
    new Promise((resolve, reject) => setTimeout(() => reject(reason), ms))

  describe('Promise.all(iterable)', () => {
    test('should resolve when all promises resolve', async () => {
      const promises = [
        resolveAfter(10, 'one'),
        resolveAfter(20, 'two'),
        Promise.resolve('three')
      ]
      const results = await Promise.all(promises)
      expect(results).toEqual(['one', 'two', 'three'])
    })

    test('should reject if any promise rejects', async () => {
      const promises = [
        resolveAfter(10, 'one'),
        rejectAfter(20, 'Error: two failed'),
        Promise.resolve('three')
      ]
      try {
        await Promise.all(promises)
      } catch (error) {
        expect(error).toBe('Error: two failed')
      }
    })
  })

  describe('Promise.allSettled(iterable)', () => {
    test('should resolve with an array of settlement objects', async () => {
      const promises = [
        resolveAfter(10, 'one'),
        rejectAfter(20, 'Error: two failed'),
        Promise.resolve('three')
      ]
      const results = await Promise.allSettled(promises)
      expect(results).toEqual([
        { status: 'fulfilled', value: 'one' },
        { status: 'rejected', reason: 'Error: two failed' },
        { status: 'fulfilled', value: 'three' }
      ])
    })
  })

  describe('Promise.any(iterable)', () => {
    test('should resolve with the value of the first promise to fulfill', async () => {
      const promises = [
        rejectAfter(10, 'fail one'),
        resolveAfter(20, 'success two'),
        resolveAfter(5, 'success one')
      ]
      const result = await Promise.any(promises)
      expect(result).toBe('success one')
    })

    test('should reject with an AggregateError if all promises reject', async () => {
      const promises = [
        rejectAfter(10, 'fail one'),
        rejectAfter(20, 'fail two'),
        Promise.reject('fail three')
      ]
      try {
        await Promise.any(promises)
      } catch (error) {
        expect(error).toBeInstanceOf(AggregateError)
        expect(error.errors).toEqual(['fail one', 'fail two', 'fail three'])
      }
    })
  })

  describe('Promise.race(iterable)', () => {
    test('should resolve if the first settled promise resolves', async () => {
      const promises = [
        resolveAfter(10, 'one'),
        rejectAfter(5, 'Error: two failed fast')
      ]
      try {
        await Promise.race(promises)
      } catch (error) {
        expect(error).toBe('Error: two failed fast') // 因为 rejectAfter(5) 更快
      }

      const promises2 = [
        resolveAfter(5, 'one fast'),
        rejectAfter(10, 'Error: two failed slow')
      ]
      const result2 = await Promise.race(promises2)
      expect(result2).toBe('one fast')
    })

    test('should reject if the first settled promise rejects', async () => {
      const promises = [
        rejectAfter(10, 'Error: one failed'),
        resolveAfter(20, 'two')
      ]
      try {
        await Promise.race(promises)
      } catch (error) {
        expect(error).toBe('Error: one failed')
      }
    })
  })

  describe('Promise.reject(reason)', () => {
    test('should return a rejected promise', async () => {
      const reason = 'Test rejection'
      try {
        await Promise.reject(reason)
      } catch (error) {
        expect(error).toBe(reason)
      }
    })
  })

  describe('Promise.resolve(value)', () => {
    test('should return a resolved promise with the given value', async () => {
      const value = 'Test resolution'
      const result = await Promise.resolve(value)
      expect(result).toBe(value)
    })

    test('should return a resolved promise if value is a thenable', async () => {
      const thenable = {
        then: (resolve) => resolve('resolved from thenable')
      }
      const result = await Promise.resolve(thenable)
      expect(result).toBe('resolved from thenable')
    })
  })

  describe('Promise.try(fn)', () => {
    // Promise.try 不是标准的内置方法。
    // 它通常由像 Bluebird 这样的库提供，或者可以被 polyfill。
    // 这是一个用于演示的简单 polyfill：
    const promiseTry = (fn) => {
      return new Promise((resolve) => {
        resolve(fn())
      })
    }

    test('should resolve with the return value of fn if it does not throw', async () => {
      const result = await promiseTry(() => 'success')
      expect(result).toBe('success')
    })

    test('should reject if fn throws an error', async () => {
      const errorMsg = 'Function failed'
      try {
        await promiseTry(() => {
          throw new Error(errorMsg)
        })
      } catch (error) {
        expect(error.message).toBe(errorMsg)
      }
    })

    test('should resolve with the resolved value if fn returns a promise', async () => {
      const result = await promiseTry(() => Promise.resolve('async success'))
      expect(result).toBe('async success')
    })

    test('should reject with the rejected reason if fn returns a rejected promise', async () => {
      const errorMsg = 'Async function failed'
      try {
        await promiseTry(() => Promise.reject(errorMsg))
      } catch (error) {
        expect(error).toBe(errorMsg)
      }
    })
  })

  describe('Promise.withResolvers()', () => {
    // Promise.withResolvers() 是一个较新的补充 (ES2023+)。
    // 在没有 polyfill 或特定 Node/浏览器版本的情况下，它可能并非在所有环境中都可用。
    // 假设它在此测试中可用。
    if (typeof Promise.withResolvers === 'function') {
      test('should allow manual resolution of a promise', async () => {
        const { promise, resolve } = Promise.withResolvers()
        setTimeout(() => resolve('Manually resolved!'), 10)
        const result = await promise
        expect(result).toBe('Manually resolved!')
      })

      test('should allow manual rejection of a promise', async () => {
        const { promise, reject } = Promise.withResolvers()
        setTimeout(() => reject('Manually rejected!'), 10)
        try {
          await promise
        } catch (error) {
          expect(error).toBe('Manually rejected!')
        }
      })
    } else {
      test.skip('Promise.withResolvers() is not available in this environment', () => {})
    }
  })

  describe('Promise.prototype.then(onFulfilled, onRejected)', () => {
    test('should call onFulfilled when promise resolves', async () => {
      const onFulfilled = jest.fn(value => `Fulfilled: ${value}`)
      const onRejected = jest.fn()

      const result = await Promise.resolve('Data')
        .then(onFulfilled, onRejected)

      expect(onFulfilled).toHaveBeenCalledWith('Data')
      expect(onRejected).not.toHaveBeenCalled()
      expect(result).toBe('Fulfilled: Data')
    })

    test('should call onRejected when promise rejects', async () => {
      const onFulfilled = jest.fn()
      const onRejected = jest.fn(reason => `Rejected: ${reason}`)

      const result = await Promise.reject('Error')
        .then(onFulfilled, onRejected)

      expect(onFulfilled).not.toHaveBeenCalled()
      expect(onRejected).toHaveBeenCalledWith('Error')
      expect(result).toBe('Rejected: Error')
    })

    test('should chain promises', async () => {
      const result = await Promise.resolve(10)
        .then(value => value * 2)
        .then(value => value + 5)
      expect(result).toBe(25)
    })

    test('should handle rejection in chain', async () => {
      try {
        await Promise.resolve(10)
          .then(() => { throw new Error('Chain error') })
          .then(value => value + 5)
      } catch (error) {
        expect(error.message).toBe('Chain error')
      }
    })
  })

  describe('Promise.prototype.catch()', () => {
    test('should catch a rejected promise', async () => {
      const errorHandler = jest.fn(reason => `Caught: ${reason}`)
      const result = await Promise.reject('Initial Error')
        .catch(errorHandler)

      expect(errorHandler).toHaveBeenCalledWith('Initial Error')
      expect(result).toBe('Caught: Initial Error')
    })

    test('should not be called if promise resolves', async () => {
      const errorHandler = jest.fn()
      await Promise.resolve('Success')
        .catch(errorHandler)
      expect(errorHandler).not.toHaveBeenCalled()
    })

    test('should catch errors thrown in a preceding then', async () => {
      const errorMessage = 'Error in then'
      const errorHandler = jest.fn()
      await Promise.resolve('data')
        .then(() => {
          throw new Error(errorMessage)
        })
        .catch(errorHandler)
      expect(errorHandler).toHaveBeenCalled()
      expect(errorHandler.mock.calls[0][0].message).toBe(errorMessage)
    })
  })

  describe('Promise.prototype.finally(onFinally)', () => {
    test('should execute onFinally when promise resolves', async () => {
      const onFinally = jest.fn()
      const result = await Promise.resolve('Resolved value')
        .finally(onFinally)

      expect(onFinally).toHaveBeenCalledTimes(1)
      expect(result).toBe('Resolved value') // finally 会传递原始的解决值
    })

    test('should execute onFinally when promise rejects', async () => {
      const onFinally = jest.fn()
      const rejectionReason = 'Rejected reason'
      try {
        await Promise.reject(rejectionReason)
          .finally(onFinally)
      } catch (error) {
        expect(error).toBe(rejectionReason) // finally 会传递原始的拒绝原因
      }
      expect(onFinally).toHaveBeenCalledTimes(1)
    })

    test('should execute onFinally even if it returns a new promise', async () => {
      const onFinally = jest.fn(() => resolveAfter(10, 'finally done'))
      const result = await Promise.resolve('Original Value')
        .finally(onFinally)

      expect(onFinally).toHaveBeenCalledTimes(1)
      expect(result).toBe('Original Value') // 原始值被保留
    })

    test('if onFinally throws, the promise rejects with that error', async () => {
      const finallyError = new Error('Error in finally')
      const onFinally = jest.fn(() => { throw finallyError })

      try {
        await Promise.resolve('Original Value').finally(onFinally)
      } catch (error) {
        expect(error).toBe(finallyError)
      }
      expect(onFinally).toHaveBeenCalledTimes(1)

      try {
        await Promise.reject('Original Rejection').finally(onFinally)
      } catch (error) {
        expect(error).toBe(finallyError) // finally 中抛出的错误会取代原始的拒绝原因
      }
      expect(onFinally).toHaveBeenCalledTimes(2) // 再次调用
    })
  })
})
