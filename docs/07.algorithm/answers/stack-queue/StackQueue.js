/**
 * 1. 栈的特点是先进后出，队列的特点是先进先出
 * 2. 用两个栈实现队列，一个栈用来入队，一个栈用来出队
 * 3. 入队时，将元素压入栈 1
 * 4. 出队时，如果栈 2 为空，将栈 1 的元素逐个弹出并压入栈 2，栈 2 出栈
 * 5. 如果栈 2 不为空，直接出栈
 * 6. peek 方法返回栈 2 的栈顶元素
 */
class StackQueue {
  constructor () {
    this.pushStack = []
    this.popStack = []
  }

  enqueue (value) {
    this.pushStack.push(value)
  }

  dequeue () {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop())
      }
    }
    return this.popStack.pop()
  }

  peek () {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop())
      }
    }
    return this.popStack[this.popStack.length - 1]
  }

  empty () {
    return this.pushStack.length === 0 && this.popStack.length === 0
  }
}

exports.default = StackQueue
