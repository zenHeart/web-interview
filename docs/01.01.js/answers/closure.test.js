describe('闭包（Closure）', () => {
  test('基本使用：内部函数访问外部变量', () => {
    function makeCounter () {
      let count = 0
      return function () {
        count++
        return count
      }
    }
    const counter = makeCounter()
    expect(counter()).toBe(1)
    expect(counter()).toBe(2)
    expect(counter()).toBe(3)
  })

  test('实现私有变量：外部无法直接访问', () => {
    function createSecret (secret) {
      return {
        getSecret: function () {
          return secret
        }
      }
    }
    const obj = createSecret('mySecret')
    expect(obj.getSecret()).toBe('mySecret')
    expect(obj.secret).toBeUndefined()
  })

  test('回调和异步操作中保存状态', done => {
    function delayedLogger (msg) {
      setTimeout(function () {
        expect(msg).toBe('hello')
        done()
      }, 10)
    }
    delayedLogger('hello')
  })

  test('函数柯里化：通过闭包保存参数', () => {
    function add (a) {
      return function (b) {
        return a + b
      }
    }
    const add5 = add(5)
    expect(add5(3)).toBe(8)
    expect(add(2)(4)).toBe(6)
  })

  test('实现缓存功能', () => {
    function memoize (fn) {
      const cache = {}
      return function (x) {
        if (cache[x] !== undefined) return cache[x]
        cache[x] = fn(x)
        return cache[x]
      }
    }
    const square = memoize(x => x * x)
    expect(square(4)).toBe(16)
    expect(square(4)).toBe(16) // 来自缓存
  })

  test('注意事项：闭包访问的是引用，变量变化会影响所有闭包', () => {
    function makeFuncs () {
      const arr = []
      for (var i = 0; i < 3; i++) {
        arr.push(function () {
          return i
        })
      }
      return arr
    }
    const funcs = makeFuncs()
    // 由于 var 没有块级作用域，所有函数都引用同一个 i
    expect(funcs[0]()).toBe(3)
    expect(funcs[1]()).toBe(3)
    expect(funcs[2]()).toBe(3)
  })

  test('注意事项：使用 let 可避免变量提升带来的闭包陷阱', () => {
    function makeFuncs () {
      const arr = []
      for (let i = 0; i < 3; i++) {
        arr.push(function () {
          return i
        })
      }
      return arr
    }
    const funcs = makeFuncs()
    expect(funcs[0]()).toBe(0)
    expect(funcs[1]()).toBe(1)
    expect(funcs[2]()).toBe(2)
  })

  test('注意事项：闭包可能导致内存泄漏', () => {
    let leaked
    function outer () {
      const large = new Array(10000).fill(1)
      leaked = function () {
        return large
      }
    }
    outer()
    expect(typeof leaked).toBe('function')
    // large 数组不会被回收，直到 leaked 解除引用
    leaked = null // 解除引用，便于垃圾回收
  })
})
