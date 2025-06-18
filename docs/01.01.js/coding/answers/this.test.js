/* eslint-disable no-eval */
/* eslint-disable strict */

describe.skip('this 关键字行为详解', () => {
  // 1. 普通函数调用
  describe('普通函数调用', () => {
    test('严格模式下 this 为 undefined', () => {
      'use strict'
      function fnStrict () { return this }
      expect(fnStrict()).toBeUndefined()
    })
  })

  // 2. 对象方法调用
  describe('对象方法调用', () => {
    const obj = {
      x: 1,
      getX () { return this?.x }
    }
    test('作为对象方法调用，this 指向该对象', () => {
      expect(obj.getX()).toBe(1)
    })
    test('方法赋值给变量后调用，this 丢失，变为全局对象', () => {
      const f = obj.getX
      expect(f()).toBeUndefined() // global.x 可能不存在
    })
  })

  // 3. call/apply 显式绑定
  describe('call/apply 显式绑定', () => {
    function fn () { return this }
    test('call/apply 显式绑定 this', () => {
      const ctx = { a: 1 }
      expect(fn.call(ctx)).toBe(ctx)
      expect(fn.apply(ctx)).toBe(ctx)
    })
  })

  // 4. bind 绑定
  describe('bind 绑定', () => {
    function fn () { return this }
    test('bind 返回新函数，this 永远绑定', () => {
      const ctx = { b: 2 }
      const bound = fn.bind(ctx)
      expect(bound()).toBe(ctx)
    })
    test('bind 后 call/apply 不能再修改 this', () => {
      const ctx = { b: 2 }
      const other = { c: 3 }
      const bound = fn.bind(ctx)
      expect(bound.call(other)).toBe(ctx)
    })
  })

  // 5. new 构造函数调用
  describe('new 构造函数调用', () => {
    function Person (name) {
      this.name = name
    }
    test('new 调用 this 指向新实例', () => {
      const p = new Person('Tom')
      expect(p).toEqual({ name: 'Tom' })
    })
    test('new 优先级高于 bind/call/apply', () => {
      function Foo (x) { this.x = x }
      const obj = { x: 42 }
      const Bound = Foo.bind(obj)
      const f = new Bound(100)
      expect(f).toEqual({ x: 100 })
    })
  })

  // 6. 箭头函数
  describe('箭头函数', () => {
    test('箭头函数 this 继承外层作用域', () => {
      const ctx = { val: 1 }
      function outer () {
        return (() => this)()
      }
      expect(outer.call(ctx)).toBe(ctx)
    })
    test('箭头函数 this 不可被 call/apply/bind 修改', () => {
      const ctx = { val: 2 }
      const arrow = () => this
      // 不能直接比较 this，容易导致 jest 尝试序列化全局对象
      expect(arrow.call(ctx)).toBe(arrow())
      expect(arrow.bind(ctx)()).toBe(arrow())
    })
    test('对象方法中定义箭头函数，this 取决于方法调用时的 this', () => {
      const obj = {
        getThis: function () {
          return (() => this)()
        }
      }
      expect(obj.getThis()).toBe(obj)
      const f = obj.getThis
      expect(f()).toBe(undefined)
    })
  })

  // 7. eval
  describe('eval', () => {
    test('eval 采用外层执行环境的 this', () => {
      const obj = {
        test () {
          return eval('this')
        }
      }
      expect(obj.test()).toBe(obj)
    })
    test('eval 中定义函数，this 规则同普通函数', () => {
      const res = eval('(function(){return this})()')
      expect(res).toBe(undefined)
    })
  })

  // 8. 回调/引用传递 this 丢失
  describe('回调/引用传递 this 丢失', () => {
    const obj = {
      x: 1,
      getX () { return this?.x }
    }
    function callFn (fn) { return fn() }
    test('直接传递方法引用，this 丢失', () => {
      expect(callFn(obj.getX)).toBeUndefined()
    })
    test('通过 bind 绑定 this 保持', () => {
      expect(callFn(obj.getX.bind(obj))).toBe(1)
    })
  })

  // 9. 严格模式下 this
  describe('严格模式下 this', () => {
    test('严格模式下未绑定 this 为 undefined', () => {
      'use strict'
      function f () { return this }
      expect(f()).toBeUndefined()
    })
    test('对象方法严格模式下 this 仍指向对象', () => {
      'use strict'
      const obj = { f () { return this } }
      expect(obj.f()).toBe(obj)
    })
  })
})
