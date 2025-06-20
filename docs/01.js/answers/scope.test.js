// scope.test.js
describe('JavaScript Scope 基本概念', () => {
  // 1. 全局作用域
  it('全局作用域变量可全局访问', () => {
    globalThis.globalVar = 42
    expect(globalVar).toBe(42)
    function accessGlobal () {
      return globalVar
    }
    expect(accessGlobal()).toBe(42)
  })

  // 2. 函数作用域
  it('函数作用域变量只能在函数内部访问', () => {
    function foo () {
      const inner = 'inside'
      return inner
    }
    expect(foo()).toBe('inside')
    // @ts-expect-error
    expect(typeof inner).toBe('undefined')
  })

  // 3. 块级作用域
  it('块级作用域 let/const 变量只在块内有效', () => {
    if (true) {
      const blockVar = 100
      const blockConst = 200
      expect(blockVar).toBe(100)
      expect(blockConst).toBe(200)
    }
    // @ts-expect-error
    expect(typeof blockVar).toBe('undefined')
    // @ts-expect-error
    expect(typeof blockConst).toBe('undefined')
  })

  // 4. 模块作用域（模拟，Node.js 环境下每个文件就是模块作用域）
  it('模块作用域变量默认私有', () => {
    const moduleVar = 'private'
    expect(moduleVar).toBe('private')
    // 不能在模块外访问 moduleVar（此测试仅说明，实际无法跨文件访问）
  })

  // 5. with 作用域, ESM 为 strict 模式下不允许使用 with
  // it.skip('with 语句可以动态扩展作用域链', () => {
  //    const obj = { a: 1 };
  //    let result;
  //    with (obj) {
  //       result = a;
  //    }
  //    expect(result).toBe(1);
  // });

  // 6. eval 作用域, ESM 为 strict 模式下 eval 不会对当前作用于产生污染
  //   it('eval 可以动态注入变量到当前作用域', () => {
  //     eval('var y = 20; x = 30;')
  //     expect(x).toBe(30)
  //     expect(y).toBe(20)
  //   })

  // 7. 作用域链查找
  it('作用域链查找最近的同名变量', () => {
    const a = 1
    function outer () {
      const a = 2
      function inner () {
        const a = 3
        return a
      }
      return inner()
    }
    expect(outer()).toBe(3)
  })

  // 8. 作用域链覆盖
  it('内层作用域变量覆盖外层同名变量', () => {
    const v = 'global'
    function test () {
      const v = 'local'
      return v
    }
    expect(test()).toBe('local')
    expect(v).toBe('global')
  })

  // 9. 闭包与作用域
  it('闭包可以访问其创建时的作用域', () => {
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
  })
})
