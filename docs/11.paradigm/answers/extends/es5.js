function Parent (name) {
  this.name = name
}

// 父类的实例方法
Parent.prototype.greet = function () {
  console.log('Hello from Parent, my name is ' + this.name)
}

// 父类的静态方法
Parent.staticMethod = function () {
  console.log('This is a static method in Parent')
}

const Child = (function () {
  Object.setPrototypeOf(Child, Parent) // 设置子类的原型链
  function Child (name, age) {
    // 调用父类的构造函数
    Parent.call(this, name)
    this.age = age
  }
  return Child
})()

// 子类继承父类的原型方法
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// 子类重写父类的实例方法
Child.prototype.greet = function () {
  Parent.prototype.greet.call(this) // 调用父类的实例方法
  console.log('Hello from Child, I am ' + this.age + ' years old')
}

// 子类重写父类的静态方法
Child.staticMethod = function () {
  Parent.staticMethod.call(this) // 调用父类的静态方法
  console.log('This is a static method in Child')
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
