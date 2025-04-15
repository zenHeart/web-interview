const { Functor, Maybe, Either } = require('./Functor')

describe('Functor', () => {
  it('should be a function', () => {
    expect(typeof Functor).toBe('function')
  })

  it('should return a Functor object', () => {
    const functor = new Functor(5)
    expect(typeof functor).toBe('object')
  })

  it('should store the initial value', () => {
    const functor = new Functor(5)
    expect(functor.value).toBe(5)
  })

  it('should apply the function to the value using map', () => {
    const functor = new Functor(5)
    const newFunctor = functor.map(x => x + 5)
    expect(newFunctor.value).toBe(10)
  })

  it('should return a new Functor instance when map is called', () => {
    const functor = new Functor(5)
    const newFunctor = functor.map(x => x + 5)
    expect(newFunctor).toBeInstanceOf(Functor)
  })

  it('should chain multiple map operations', () => {
    const functor = new Functor(5)
    const newFunctor = functor
      .map(x => x + 5)
      .map(x => x * 2)
      .map(x => x - 3)
    expect(newFunctor.value).toBe(17)
  })

  it('should handle null values', () => {
    const functor = new Functor(null)
    const newFunctor = functor.map(x => x ? x + 5 : null)
    expect(newFunctor.value).toBe(null)
  })

  it('should handle undefined values', () => {
    const functor = new Functor(undefined)
    const newFunctor = functor.map(x => x ? x + 5 : undefined)
    expect(newFunctor.value).toBe(undefined)
  })

  it('should work with different data types', () => {
    const functor = new Functor('hello')
    const newFunctor = functor.map(x => x + ' world')
    expect(newFunctor.value).toBe('hello world')
  })

  it('should not modify the original Functor instance', () => {
    const functor = new Functor(5)
    functor.map(x => x + 5)
    expect(functor.value).toBe(5)
  })
})

describe('Maybe', () => {
  it('should be a function', () => {
    expect(typeof Maybe).toBe('function')
  })

  it('should return a Maybe object', () => {
    const maybe = new Maybe()
    expect(typeof maybe).toBe('object')
  })

  it('should handle null values', () => {
    const maybe = new Maybe(null)
    expect(maybe.value).toBe(null)
  })

  it('should handle undefined values', () => {
    const maybe = new Maybe(undefined)
    expect(maybe.value).toBe(undefined)
  })

  it('should handle valid values', () => {
    const maybe = new Maybe(5)
    expect(maybe.value).toBe(5)
  })

  it('should chain operations', () => {
    const maybe = new Maybe(5)
      .map(x => x + 5)
      .map(x => x * 2)
    expect(maybe.value).toBe(20)
  })

  it('should not execute map if value is null', () => {
    const maybe = new Maybe(null)
    const mapFn = jest.fn()
    maybe.map(mapFn)
    expect(mapFn).not.toHaveBeenCalled()
  })

  it('should not execute map if value is undefined', () => {
    const maybe = new Maybe(undefined)
    const mapFn = jest.fn()
    maybe.map(mapFn)
    expect(mapFn).not.toHaveBeenCalled()
  })

  it('should return a Maybe object when map is called', () => {
    const maybe = new Maybe(5).map(x => x + 5)
    expect(maybe instanceof Maybe).toBe(true)
  })
})

describe('Either', () => {
  describe('Either.Right', () => {
    it('should create a Right instance', () => {
      const right = Either.right(5)
      expect(right.value).toBe(5)
    })

    it('should map the value in Right', () => {
      const right = Either.right(5)
      const newRight = right.map(x => x + 5)
      expect(newRight.value).toBe(10)
    })

    it('should chain operations in Right', () => {
      const right = Either.right(5)
      const newRight = right.chain(x => Either.right(x + 5))
      expect(newRight.value).toBe(10)
    })

    it('should get the value from Right using getOrElse', () => {
      const right = Either.right(5)
      expect(right.getOrElse(10)).toBe(5)
    })

    it('should return a string representation of Right', () => {
      const right = Either.right(5)
      expect(right.toString()).toBe('Right(5)')
    })
  })

  describe('Either.Left', () => {
    it('should create a Left instance', () => {
      const left = Either.left('error')
      expect(left.value).toBe('error')
    })

    it('should not map the value in Left', () => {
      const left = Either.left('error')
      const newLeft = left.map(x => x + 5)
      expect(newLeft).toBe(left)
      expect(newLeft.value).toBe('error')
    })

    it('should not chain operations in Left', () => {
      const left = Either.left('error')
      const newLeft = left.chain(x => Either.right(x + 5))
      expect(newLeft).toBe(left)
      expect(newLeft.value).toBe('error')
    })

    it('should get the default value from Left using getOrElse', () => {
      const left = Either.left('error')
      expect(left.getOrElse(10)).toBe(10)
    })

    it('should return a string representation of Left', () => {
      const left = Either.left('error')
      expect(left.toString()).toBe('Left(error)')
    })
  })

  describe('Either.of', () => {
    it('should create a Right instance using Either.of', () => {
      const right = Either.of(5)
      expect(right.value).toBe(5)
    })
  })

  describe('Either factory functions', () => {
    it('Either.left should create a Left', () => {
      const left = Either.left('error')
      expect(left.value).toBe('error')
    })

    it('Either.right should create a Right', () => {
      const right = Either.right(5)
      expect(right.value).toBe(5)
    })
  })

  describe('Either in practical scenarios', () => {
    it('should handle errors in division operations', () => {
      const safeDivide = (a, b) => {
        if (b === 0) {
          return Either.left('Division by zero')
        }
        return Either.right(a / b)
      }

      expect(safeDivide(10, 2).getOrElse('Error')).toBe(5)
      expect(safeDivide(10, 0).getOrElse('Error')).toBe('Error')
    })

    it('should chain operations safely', () => {
      const parseAndProcess = (str) => {
        const parsed = parseInt(str, 10)

        return isNaN(parsed)
          ? Either.left(`Cannot parse "${str}" as a number`)
          : Either.right(parsed)
            .map(n => n * n)
      }

      expect(parseAndProcess('4').getOrElse('Error')).toBe(16)
      expect(parseAndProcess('abc').getOrElse('Error')).toBe('Error')
    })

    it('should transform data safely', () => {
      const getNestedProperty = (obj, path) => {
        try {
          const result = path.split('.').reduce((o, p) => {
            if (o === null || o === undefined) {
              throw new Error(`Cannot access property "${p}" of ${o}`)
            }
            return o[p]
          }, obj)

          return result !== undefined
            ? Either.right(result)
            : Either.left(`Property ${path} is undefined`)
        } catch (e) {
          return Either.left(e.message)
        }
      }

      const data = { user: { name: 'John', address: { city: 'New York' } } }

      expect(getNestedProperty(data, 'user.name').getOrElse('N/A')).toBe('John')
      expect(getNestedProperty(data, 'user.address.city').getOrElse('N/A')).toBe('New York')
      expect(getNestedProperty(data, 'user.age').getOrElse('N/A')).toBe('N/A')
    })

    it('should validate input data', () => {
      const validateUser = (user) => {
        if (!user) return Either.left('User is required')
        if (!user.name) return Either.left('Name is required')
        if (!user.email) return Either.left('Email is required')
        if (!user.email.includes('@')) return Either.left('Invalid email format')

        return Either.right(user)
      }

      const validUser = { name: 'John', email: 'john@example.com' }
      const noNameUser = { email: 'john@example.com' }
      const invalidEmailUser = { name: 'John', email: 'johnexample.com' }

      expect(validateUser(validUser).getOrElse('Invalid user')).toEqual(validUser)
      expect(validateUser(noNameUser).getOrElse('Invalid user')).toBe('Invalid user')
      expect(validateUser(invalidEmailUser).getOrElse('Invalid user')).toBe('Invalid user')
    })

    it('should combine multiple Either operations', () => {
      const getUser = (id) => {
        if (id === 1) return Either.right({ id: 1, name: 'John' })
        return Either.left(`User with id ${id} not found`)
      }

      const getOrders = (user) => {
        if (user.id === 1) return Either.right([{ id: 101, product: 'Book' }])
        return Either.left(`No orders found for user ${user.id}`)
      }

      const getUserOrders = (userId) => {
        return getUser(userId).chain(user => getOrders(user))
      }

      expect(getUserOrders(1).getOrElse('Error')).toEqual([{ id: 101, product: 'Book' }])
      expect(getUserOrders(2).getOrElse('Error')).toBe('Error')
    })
  })
})
