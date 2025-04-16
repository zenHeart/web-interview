class Parent {
  constructor (name) {
    this.name = name
  }

  // 父类的实例方法
  greet () {
    console.log(`Hello from Parent, my name is ${this.name}`)
  }

  // 父类的静态方法
  static staticMethod () {
    console.log('This is a static method in Parent')
  }
}

class Child extends Parent {
  constructor (name, age) {
    super(name) // 调用父类的构造函数
    this.age = age
  }

  // 子类重写父类的实例方法
  greet () {
    super.greet() // 调用父类的实例方法
    console.log(`Hello from Child, I am ${this.age} years old`)
  }

  // 子类重写父类的静态方法
  static staticMethod () {
    super.staticMethod() // 调用父类的静态方法
    console.log('This is a static method in Child')
  }
}

// 实例化子类
const child = new Child('Alice', 10)
child.greet()

// 调用子类重写的静态方法
Child.staticMethod()

// 演示子类继承父类的静态方法
console.log('\n从子类调用父类的静态方法（未重写的情况下）:')
delete Child.staticMethod // 删除子类重写的静态方法
Child.staticMethod() // 这将调用父类的静态方法
