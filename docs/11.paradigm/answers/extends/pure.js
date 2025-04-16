// 基于原型链实现继承的示例：员工和经理
// 员工对象
const employee = {
  name: 'Default Name',
  position: 'Employee',
  work: function () {
    console.log(`${this.name} is working as a ${this.position}.`)
  }
}

// 创建经理对象，继承自员工对象
const manager = Object.create(employee)
manager.position = 'Manager'
manager.manage = function () {
  console.log(`${this.name} is managing the team.`)
}

// 使用示例
const alice = Object.create(manager)
alice.name = 'Alice'
alice.work() // 输出: Alice is working as a Manager.
alice.manage() // 输出: Alice is managing the team.

const bob = Object.create(employee)
bob.name = 'Bob'
bob.work() // 输出: Bob is working as a Employee.
