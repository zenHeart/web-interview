class Stack {
  constructor () {
    this.stack = []
  }

  push (value) {
    this.stack.push(value)
  }

  pop () {
    return this.stack.pop()
  }

  peek () {
    return this.stack[this.stack.length - 1]
  }

  isEmpty () {
    return this.stack.length === 0
  }
}
exports.default = Stack
