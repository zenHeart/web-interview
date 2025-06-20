// arrow.test.js
describe('Arrow Function 特点', () => {
  test('箭头函数语法更简洁', () => {
    const add = (a, b) => a + b
    expect(add(2, 3)).toBe(5)
  })

  test('箭头函数没有自己的 this', () => {
    function Counter () {
      this.num = 0
      setTimeout(() => {
        this.num++
      }, 10)
    }
    const counter = new Counter()
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(counter.num).toBe(1)
        resolve()
      }, 20)
    })
  })

  test.skip('箭头函数没有 arguments 对象', () => {
    const fn = () => typeof arguments
    expect(fn()).toBe('undefined')
  })

  test.skip('箭头函数不能作为构造函数', () => {
    const Arrow = () => {}
    expect(() => new Arrow()).toThrow(TypeError)
  })

  test('箭头函数不能使用 super', () => {
    class Parent {
      constructor () {
        this.value = 1
      }
    }
    class Child extends Parent {
      constructor () {
        super()
        this.getValue = () => {
          // super.value; // 不能直接用 super
          return this.value
        }
      }
    }
    const c = new Child()
    expect(c.getValue()).toBe(1)
  })

  test('箭头函数适合用作回调函数', () => {
    const arr = [1, 2, 3]
    const squared = arr.map(x => x * x)
    expect(squared).toEqual([1, 4, 9])
  })
})
