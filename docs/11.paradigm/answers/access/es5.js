'use strict'

// 通过 IIFE 和 defineProperty 实现类的访问控制模拟
const Person = (function () {
  // 使用闭包实现私有静态变量
  let _count = 0

  // 创建私有数据存储
  const _privateInstances = []
  const _privateValues = []

  // 查找或创建私有数据索引
  function _getPrivateIndex (instance) {
    let index = _privateInstances.indexOf(instance)
    if (index === -1) {
      index = _privateInstances.length
      _privateInstances.push(instance)
      _privateValues.push({})
    }
    return index
  }

  // 获取私有数据
  function _getPrivateData (instance) {
    return _privateValues[_getPrivateIndex(instance)]
  }

  // 构造函数(替代类声明)
  function Person (name) {
    // 实例属性初始化
    this.name = name
    this.age = 0 // 公共类字段转换为实例属性

    // 设置私有实例属性
    const privateData = _getPrivateData(this)
    privateData.privateField = 'private value'

    // 增加静态计数器
    _count++
  }

  // 将公共实例方法添加到原型
  Person.prototype.greet = function () {
    console.log('Hello, my name is ' + this.name)
  }

  // 获取私有数据的辅助方法
  Person.prototype._getPrivateField = function () {
    return _getPrivateData(this).privateField
  }

  // 私有方法实现为闭包中的函数
  function _privateMethod (instance) {
    return instance.name + "'s private data: " + _getPrivateData(instance).privateField
  }

  // 提供访问私有方法的公开接口（可选）
  Person.prototype._accessPrivateMethod = function () {
    return _privateMethod(this)
  }

  // 使用Object.defineProperty实现getter和setter
  Object.defineProperty(Person.prototype, 'profile', {
    get: function () {
      return this.name + ', age: ' + this.age
    },
    set: function (value) {
      const parts = value.split(',')
      this.name = parts[0]
      this.age = parts[1]
    },
    enumerable: true,
    configurable: true
  })

  // 在构造函数上定义静态属性和方法
  Person.species = 'Human'

  Person.getCount = function () {
    return _count
  }

  // 静态初始化块转换为即时执行代码
  console.log('Class initialization')

  return Person
})()

// 使用示例
const person = new Person('Alice')
console.log(person.name) // Alice
console.log(Person.getCount()) // 1
