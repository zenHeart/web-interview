// let-const-var.test.js
describe('var, let, const 基本特性与区别', () => {
  test('var 是函数作用域，let/const 是块级作用域', () => {
    if (true) {
      var a = 1
      const b = 2
      const c = 3
    }
    expect(a).toBe(1)
    expect(() => b).toThrow(ReferenceError)
    expect(() => c).toThrow(ReferenceError)
  })

  test('var 存在变量提升，let/const 不存在变量提升', () => {
    expect(a).toBeUndefined()
    var a = 10
    // TODO: 完善用例
  })

  test('var 允许重复声明，let/const 不允许', () => {
    var x = 1
    var x = 2
    expect(x).toBe(2)
  })

  test('const 声明时必须初始化，let/var 不需要', () => {
    let a
    let b
    expect(a).toBeUndefined()
    expect(b).toBeUndefined()
    // 注意该用例在 parser 阶段就会报错而不是运行时，所以通过 eval 来转换为运行时错误
    expect(() => {
      // eslint-disable-next-line no-undef
      throw eval('const c')
    }).toThrow(SyntaxError)
  })

  test('const 不可重新赋值，但对象属性可变', () => {
    const obj = { a: 1 }
    obj.a = 2
    expect(obj.a).toBe(2)

    const n = 5
    expect(() => {
      // eslint-disable-next-line no-const-assign
      n = 10
    }).toThrow(TypeError)
  })

  test.skip('var 声明的变量会绑定到全局对象，let/const 不会', () => {
    // TODO: 完善用例

  })

  test('for 循环中 var 变量可能泄露为全局变量，let/const 不会', () => {
    // TODO: 完善用例
  })

  test('let/const 采用词法作用域', () => {
    const a = 1
    {
      const a = 2
      expect(a).toBe(2)
    }
    expect(a).toBe(1)

    const b = 3
    {
      const b = 4
      expect(b).toBe(4)
    }
    expect(b).toBe(3)
  })
})
