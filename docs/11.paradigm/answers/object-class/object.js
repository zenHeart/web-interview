/**
 * 1. 对象字面量
 * 关键特性: 直接定义对象属性和方法
 * 优势: 简洁易读，适合单例对象
 * 局限性: 不支持创建多个相似结构的对象
 *  */
const objLiteral = { prop: 'value' }
console.log(objLiteral) // { prop: 'value' }

/**
 * 2. new 关键字初始化
 * 关键特性: 通过 new 关键字创建实例
 * 优势: 可创建多个实例，支持原型继承
 * 局限性: 适用于复用的对象，简单对象创建建议采用字面量形式
 */

// 2.1 使用构造函数模式
function Person (name) {
  this.name = name
}
const person1 = new Person('Alice')
console.log(person1) // Person { name: 'Alice' }

// 2.2 使用类模式
class Animal {
  constructor (type) {
    this.type = type
  }
}
const animal1 = new Animal('Dog')
console.log(animal1) // Animal { type: 'Dog' }
/**
 * 3. Object.assign()
 * 关键特性: 复制一个或多个源对象的属性到目标对象
 * 优势: 可合并多个对象，实现浅拷贝
 * 局限性: 只复制可枚举属性，嵌套对象仍共享引用
 */

//
const sourceObj = { a: 1, b: 2 }
const objAssign = Object.assign({}, sourceObj)
console.log(objAssign) // { a: 1, b: 2 }

/**
 * 4. Object.create()
 * 关键特性: 基于现有对象创建新对象
 * 优势: 直接设置原型，实现继承
 * 局限性: 初始化属性较繁琐
 */
const proto = { greet: function () { console.log('Hello!') } }
const objCreate = Object.create(proto)
console.log(objCreate) // {}
objCreate.greet() // Hello!
