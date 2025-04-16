/**
 * 1. ES6 类语法
 * 关键特性：现代类语法，含构造器和方法定义
 * 优势：语法清晰，支持继承和静态方法私有属性
 * 局限性：本质仍是原型继承的语法糖
 *  */
class Person {
  // ===== ES2015 (ES6) =====
  static species = 'Human' // Static properties

  constructor (name) {
    this.name = name
    Person.#count++
  }

  greet () { // Public methods
    console.log(`Hello, my name is ${this.name}`)
  }

  get profile () { // Getter
    return `${this.name}, age: ${this.age}`
  }

  set profile (value) { // Setter
    [this.name, this.age] = value.split(',')
  }

  static getCount () { // Static methods
    return this.#count
  }

  // ===== ES2019 =====
  #privateField = 'private value' // Private fields
  static #count = 0 // Static private fields

  // ===== ES2020 =====
  #privateMethod () { // Private methods
    return `${this.name}'s private data: ${this.#privateField}`
  }

  // ===== ES2022 =====
  name // Public class fields
  age = 0

  // Static initialization block
  static {
    console.log('Class initialization')
  }
}
const person = new Person('Alice')
console.log(person.name) // Alice

/**
 * 2.  构造函数+原型
 * 关键特性：分离实例属性和原型方法
 * 优势：内存效率高，方法共享
 * 局限性：代码组织分散，不直观
 *  */
function Animal (type) {
  this.type = type
}
Animal.prototype.speak = function () {
  console.log(`${this.type} makes a noise.`)
}
const dog = new Animal('Dog')
dog.speak() // Dog makes a noise.

/**
 * 3. 类表达式
* 关键特性：匿名或命名类表达式
* 优势：可用于闭包和高阶函数
* 局限性：与类声明类似，仅语法形式不同
* react 总一些高阶组件经常使用类表达式
 */
// 类表达式示例：UI组件工厂
// HOC with class expression example
// 模拟 React 组件用来说明概念
const React = { Component: {} }
const withExtraProps = (WrappedComponent) => {
  return class HocDemo extends React.Component {
    componentDidMount () {
      console.log('HOC mounted')
    }

    constructor (props) {
      super(props)
      this.state = {
        extraData: 'Enhanced with HOC'
      }
    }

    render () {
      // Pass the original props and add our extra props
      return <WrappedComponent
            {...this.props}
            extraData={this.state.extraData}
         />
    }
  }
}

// 使用
class BaseComponent extends React.Component {
  render () {
    return <div>
         {this.props.children}
         {this.props.extraData && <p>{this.props.extraData}</p>}
      </div>
  }
}

// 增强类组件
const EnhancedComponent = withExtraProps(BaseComponent)
console.log(EnhancedComponent)

/**
 * 4. IIFE类模式
 * 关键特性：立即执行函数返回类定义
 * 优势：可创建私有状态和方法用来模拟私有成员
 * 局限性：较复杂，可读性较差
*/
// 典型示例：模块化 Counter
const Counter = (function () {
  let count = 0 // 私有状态

  class Counter {
    constructor () {
      if (typeof Counter.instance === 'object') {
        return Counter.instance
      }
      Counter.instance = this
      return this
    }

    increment () { // 公有方法
      count++
      console.log('count: ', count)
    }

    decrement () {
      count--
      console.log('count: ', count)
    }

    getCount () {
      return count
    }
  }

  return Counter
})()

const counter1 = new Counter()
counter1.increment() // 输出: count: 1
counter1.increment() // 输出: count: 2

const counter2 = new Counter()
counter2.decrement() // 输出: count: 1

console.log(counter1.getCount())
console.log(counter2.getCount())
