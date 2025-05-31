describe('instanceof 运算符', () => {
  test('对象是其构造函数的实例', () => {
    class Animal {}
    const dog = new Animal()
    expect(dog instanceof Animal).toBe(true)
  })

  test('对象是其父构造函数的实例', () => {
    class Animal {}
    class Dog extends Animal {}
    const myDog = new Dog()
    expect(myDog instanceof Animal).toBe(true)
    expect(myDog instanceof Dog).toBe(true)
  })

  test('原始类型不通过 instanceof 检查', () => {
    expect(123 instanceof Number).toBe(false)
    expect('hello' instanceof String).toBe(false)
    expect(true instanceof Boolean).toBe(false)
  })

  test('包装对象是其构造函数及 Object 的实例', () => {
    const stringObject = new String('String created with constructor')
    expect(stringObject instanceof String).toBe(true)
    expect(stringObject instanceof Object).toBe(true)
  })

  test('null 不通过 instanceof 检查', () => {
    expect(null instanceof Object).toBe(false)
  })

  test('undefined 不通过 instanceof 检查', () => {
    expect(undefined instanceof Object).toBe(false)
  })

  test('适用于内置类型', () => {
    const arr = []
    const date = new Date()
    expect(arr instanceof Array).toBe(true)
    expect(arr instanceof Object).toBe(true) // 数组也是对象
    expect(date instanceof Date).toBe(true)
    expect(date instanceof Object).toBe(true) // 日期也是对象
  })

  test('原型链不匹配则返回 false', () => {
    class A {}
    class B {}
    const aInstance = new A()
    expect(aInstance instanceof B).toBe(false)
  })

  test('Object.create(null) 创建的对象不是 Object 实例', () => {
    const obj = Object.create(null)
    // obj 的原型是 null，不在 Object.prototype 的原型链上
    expect(obj instanceof Object).toBe(false)
  })

  test('instanceof 与函数构造函数', () => {
    function Person (name) {
      this.name = name
    }
    const person1 = new Person('Alice')
    expect(person1 instanceof Person).toBe(true)
    expect(person1 instanceof Object).toBe(true)
  })

  test('修改 prototype 会影响 instanceof', () => {
    function C () {}
    function D () {}

    const o = new C()
    expect(o instanceof C).toBe(true) // o 的 [[Prototype]] 是原始 C.prototype

    C.prototype = {} // 重新赋值 C.prototype
    const o2 = new C() // o2 的 [[Prototype]] 是新的 C.prototype

    expect(o2 instanceof C).toBe(true) // o2 检查的是新的 C.prototype
    // o 的原型链中是旧的 C.prototype，它与新的 C.prototype 不同
    expect(o instanceof C).toBe(false)

    D.prototype = new C() // D.prototype 是 C 的一个实例 (使用新的 C.prototype)
    // D.prototype 的 [[Prototype]] 是新的 C.prototype
    const o3 = new D() // o3 的 [[Prototype]] 是 D.prototype
    expect(o3 instanceof D).toBe(true)
    expect(o3 instanceof C).toBe(true) // o3 -> D.prototype -> 新 C.prototype
  })

  test('Object.setPrototypeOf 会影响 instanceof', () => {
    class A {}
    const obj = {}
    expect(obj instanceof A).toBe(false)
    Object.setPrototypeOf(obj, A.prototype) // 改变 obj 的原型
    expect(obj instanceof A).toBe(true)
  })

  test('instanceof 与绑定函数', () => {
    class Base {}
    const BoundBase = Base.bind(null) // .bind(null, arg1, arg2) 同样有效
    const instance = new Base()
    // instanceof 检查的是 BoundBase 的 [[BoundTargetFunction]].prototype，即 Base.prototype
    expect(instance instanceof BoundBase).toBe(true)
  })

  test('Symbol.hasInstance 基本用法', () => {
    class Forgeable {
      static isInstanceFlag = Symbol('isInstanceFlag')

      static [Symbol.hasInstance] (obj) {
        // 确保 obj 不为 null/undefined，是对象，并且有特定标记
        return !!(obj && typeof obj === 'object' && Forgeable.isInstanceFlag in obj)
      }
    }

    const objWithFlag = { [Forgeable.isInstanceFlag]: true }
    const objWithoutFlag = {}
    expect(objWithFlag instanceof Forgeable).toBe(true)
    expect(objWithoutFlag instanceof Forgeable).toBe(false)
  })

  test.skip('Symbol.hasInstance 覆盖 instanceof 默认行为', () => {
    class MyClass {
      static [Symbol.hasInstance] (instance) {
        // 自定义逻辑：如果 instance 有 canBeInstance 属性，则认为是实例
        return instance && instance.canBeInstance === true
      }
    }

    const objWithProperty = { canBeInstance: true }
    const objWithoutProperty = { canBeInstance: false }
    const regularInstance = new MyClass() // 默认情况下，regularInstance instanceof MyClass 为 true

    // 默认情况下，objWithProperty 不是 MyClass 的实例
    // 但 Symbol.hasInstance 覆盖了此行为
    expect(objWithProperty instanceof MyClass).toBe(true)

    // 默认情况下，objWithoutProperty 不是 MyClass 的实例
    // Symbol.hasInstance 也返回 false
    expect(objWithoutProperty instanceof MyClass).toBe(false)

    // 默认情况下，regularInstance 是 MyClass 的实例
    // 但 Symbol.hasInstance 覆盖了此行为，因为它没有 canBeInstance: true
    expect(regularInstance instanceof MyClass).toBe(false)
  })

  test('instanceof 与 Object.create 继承', () => {
    function Shape () {}
    Shape.prototype.isShape = true

    function Rectangle () {
      Shape.call(this) // 调用父构造函数以继承实例属性
    }

    // 设置继承：Rectangle.prototype 继承自 Shape.prototype
    Rectangle.prototype = Object.create(Shape.prototype)
    Rectangle.prototype.constructor = Rectangle // 修复 constructor 指向，使其指向 Rectangle

    const rect = new Rectangle()

    expect(rect instanceof Rectangle).toBe(true)
    expect(rect instanceof Shape).toBe(true)
    expect(rect instanceof Object).toBe(true)
    expect(rect.isShape).toBe(true)
  })

  test('instanceof 与 ! 运算符优先级', () => {
    class MyClass {}
    const myInstance = new MyClass()

    // 正确检查非实例的方式：使用括号确保 instanceof 先执行
    expect(!(myInstance instanceof MyClass)).toBe(false)
    expect(!(null instanceof MyClass)).toBe(true)

    // 错误方式：! 优先级高于 instanceof (通常不是预期行为)
    // !myInstance 先被求值。如果 myInstance 是对象，!myInstance 是 false。
    // 然后 false instanceof MyClass，结果为 false。
    expect(!myInstance instanceof MyClass).toBe(false)

    const nullVar = null
    // !nullVar 先被求值 (为 true)。
    // 然后 true instanceof MyClass，结果为 false。
    expect(!nullVar instanceof MyClass).toBe(false)
  })
})
