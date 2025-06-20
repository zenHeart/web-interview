// constructor-call.test.js

describe('构造函数与普通函数调用的区别', () => {
  // 1. this 的指向
//   test('普通函数调用时 this 指向全局对象（非严格模式）', () => {
//     function foo () {
//       return this
//     }
//     expect(foo()).toBe(global) // node 环境下全局对象为 global
//   })

  test('普通函数调用时 this 为 undefined（严格模式）', () => {
    'use strict'
    function foo () {
      return this
    }
    expect(foo()).toBeUndefined()
  })

  test('构造函数调用时 this 指向新创建的实例对象', () => {
    function Foo () {
      this.value = 42
    }
    const obj = new Foo()
    expect(obj.value).toBe(42)
    expect(obj instanceof Foo).toBe(true)
  })

  // 2. 返回值
  test('普通函数调用返回函数执行结果', () => {
    function foo () {
      return 123
    }
    expect(foo()).toBe(123)
  })

  test('构造函数调用返回新创建的实例对象', () => {
    function Foo () {
      this.x = 1
    }
    const obj = new Foo()
    expect(obj.x).toBe(1)
    expect(obj instanceof Foo).toBe(true)
  })

  test('构造函数显式返回对象时，返回该对象', () => {
    function Foo () {
      this.x = 1
      return { y: 2 }
    }
    const obj = new Foo()
    expect(obj.x).toBeUndefined()
    expect(obj.y).toBe(2)
  })

  test('构造函数显式返回非对象时，仍返回实例对象', () => {
    function Foo () {
      this.x = 1
      return 123
    }
    const obj = new Foo()
    expect(obj.x).toBe(1)
    expect(obj instanceof Foo).toBe(true)
  })

  // 3. 额外属性注入
  test('构造函数调用时 new.target 指向构造函数本身', () => {
    function Foo () {
      return new.target
    }
    const result = new Foo()
    expect(result).toBe(Foo)
  })

  test('普通函数调用时 new.target 为 undefined', () => {
    function foo () {
      return new.target
    }
    expect(foo()).toBeUndefined()
  })

  test('class 构造函数中 super 可用', () => {
    class Parent {
      constructor () {
        this.parentValue = 1
      }
    }
    class Child extends Parent {
      constructor () {
        super()
        this.childValue = 2
      }
    }
    const c = new Child()
    expect(c.parentValue).toBe(1)
    expect(c.childValue).toBe(2)
  })

  // 其他关键点
  test('构造函数 prototype 属性', () => {
    function Foo () {}
    const obj = new Foo()
    expect(Object.getPrototypeOf(obj)).toBe(Foo.prototype)
  })

  test('普通函数调用不会自动设置原型', () => {
    function Foo () {}
    const result = Foo()
    expect(result).toBeUndefined()
  })
})
