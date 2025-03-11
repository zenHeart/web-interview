/**
 */
class MinStack {
  constructor () {
    this.stack = []
    // 采用递减栈维护最小值
    this.decreaseStack = []
  }

  push (value) {
    this.stack.push(value)
    // 递减栈为空，或者压入值比递减栈栈顶小则推入
    if (this.decreaseStack.length === 0 || value <= this.decreaseStack[this.decreaseStack.length - 1]) {
      this.decreaseStack.push(value)
    }
  }

  pop () {
    const value = this.stack.pop()
    // 如果弹出值等于递减栈栈顶值，则递减栈也弹出
    if (value === this.decreaseStack[this.decreaseStack.length - 1]) {
      this.decreaseStack.pop()
    }
    return value
  }

  top () {
    return this.stack[this.stack.length - 1]
  }

  getMin () {
    return this.decreaseStack[this.decreaseStack.length - 1]
  }
}

exports.default = MinStack
