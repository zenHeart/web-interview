describe('Function.prototype.call, apply, bind', () => {
  function greet (greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`
  }

  const context = { name: 'Alice' }

  test('call 以给定的 this 和参数调用函数', () => {
    const result = greet.call(context, 'Hello', '!')
    expect(result).toBe('Hello, Alice!')
  })

  test('apply 以给定的 this 和参数数组调用函数', () => {
    const result = greet.apply(context, ['Hi', '?'])
    expect(result).toBe('Hi, Alice?')
  })

  test('bind 返回一个新的函数，绑定 this 和可选参数', () => {
    const boundGreet = greet.bind(context, 'Hey')
    expect(boundGreet('~')).toBe('Hey, Alice~')
  })

  test('bind 可以实现部分应用，并在之后调用', () => {
    const boundGreet = greet.bind(context, 'Welcome')
    const result = boundGreet('!!!')
    expect(result).toBe('Welcome, Alice!!!')
  })

  test('call/apply 不会创建新函数，bind 会', () => {
    expect(typeof greet.call).toBe('function')
    expect(typeof greet.apply).toBe('function')
    const bound = greet.bind(context)
    expect(typeof bound).toBe('function')
    expect(bound).not.toBe(greet)
  })

  test('bind 返回的函数可以作为构造函数使用（忽略 thisArg）', () => {
    function Person (name) {
      this.name = name
    }
    const BoundPerson = Person.bind({ notUsed: true })
    const p = new BoundPerson('Bob')
    expect(p).toBeInstanceOf(Person)
    expect(p.name).toBe('Bob')
  })
})
