// create-function.test.js

describe('函数创建方法及区别', () => {
  // 函数声明
  test('函数声明：function functionName() {}', () => {
    expect(typeof funcDecl).toBe('function')
    // 可以在声明前调用, 申明会提升
    expect(funcDecl()).toBe('decl')
    function funcDecl () {
      return 'decl'
    }
    // 可以在声明前调用
    expect(funcDecl()).toBe('decl')
  })

  // 函数表达式
  test('函数表达式：const functionName = function() {}', () => {
    const funcExpr = function () {
      return 'expr'
    }
    expect(typeof funcExpr).toBe('function')
    expect(funcExpr()).toBe('expr')
    // 不能在定义前调用
    let error
    try {
      funcExprBefore()
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(TypeError)
    const funcExprBefore = function () {}
  })

  // 箭头函数
  test('箭头函数：const functionName = () => {}', () => {
    const arrowFunc = () => 'arrow'
    expect(typeof arrowFunc).toBe('function')
    expect(arrowFunc()).toBe('arrow')
    // 没有自己的 this
    const obj = {
      value: 42,
      getValue: () => this?.value,
      getValueNormal () { return this?.value }
    }
    expect(obj.getValue()).toBe(undefined)
    expect(obj.getValueNormal()).toBe(42)
  })

  // 函数构造器
  test('函数构造器：new Function()', () => {
    const func = new Function('a', 'b', 'return a + b')
    expect(typeof func).toBe('function')
    expect(func(1, 2)).toBe(3)
  })

  // eval
  test('eval 创建函数', () => {
    let evalFunc
    eval('evalFunc = function() { return "eval"; }')
    expect(typeof evalFunc).toBe('function')
    expect(evalFunc()).toBe('eval')
  })

  // 类方法
  test('类方法：class ClassName { methodName() {} }', () => {
    class MyClass {
      method () { return 'class method' }
    }
    const instance = new MyClass()
    expect(typeof instance.method).toBe('function')
    expect(instance.method()).toBe('class method')
  })
})
