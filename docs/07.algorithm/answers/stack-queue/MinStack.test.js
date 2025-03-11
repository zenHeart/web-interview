const MinStack = require('./MinStack').default

describe('MinStack', () => {
  let stack

  beforeEach(() => {
    stack = new MinStack()
  })

  test('should handle example operations sequence correctly', () => {
    stack.push(-2)
    stack.push(0)
    stack.push(-3)
    expect(stack.getMin()).toBe(-3)
    stack.pop()
    expect(stack.top()).toBe(0)
    expect(stack.getMin()).toBe(-2)
  })

  test('should handle empty stack', () => {
    expect(stack.stack.length).toBe(0)
    expect(stack.decreaseStack.length).toBe(0)
  })

  test('should maintain min value after multiple pushes', () => {
    stack.push(5)
    expect(stack.getMin()).toBe(5)
    stack.push(3)
    expect(stack.getMin()).toBe(3)
    stack.push(7)
    expect(stack.getMin()).toBe(3)
    stack.push(2)
    expect(stack.getMin()).toBe(2)
  })

  test('should maintain min value after multiple pops', () => {
    stack.push(5)
    stack.push(3)
    stack.push(7)
    stack.push(2)
    stack.pop()
    expect(stack.getMin()).toBe(3)
    stack.pop()
    expect(stack.getMin()).toBe(3)
    stack.pop()
    expect(stack.getMin()).toBe(5)
  })

  test('should handle duplicate values', () => {
    stack.push(1)
    stack.push(1)
    stack.push(1)
    expect(stack.getMin()).toBe(1)
    stack.pop()
    expect(stack.getMin()).toBe(1)
    expect(stack.top()).toBe(1)
  })
})
