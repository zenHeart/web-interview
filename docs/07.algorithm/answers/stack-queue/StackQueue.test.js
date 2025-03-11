const { default: StackQueue } = require('./StackQueue')

describe('StackQueue', () => {
  let queue

  beforeEach(() => {
    queue = new StackQueue()
  })

  test('should be empty when newly created', () => {
    expect(queue.empty()).toBe(true)
  })

  test('should handle basic operations in sequence', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.peek()).toBe(1)
    expect(queue.dequeue()).toBe(1)
    expect(queue.empty()).toBe(false)
    queue.enqueue(3)
    expect(queue.empty()).toBe(false)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.empty()).toBe(true)
  })

  test('should handle multiple enqueues before dequeue', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(4)
  })

  test('should maintain FIFO order after mixed operations', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.dequeue()).toBe(1)
    queue.enqueue(3)
    expect(queue.peek()).toBe(2)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
  })

  test('should handle peek on empty queue', () => {
    expect(queue.peek()).toBe(undefined)
  })

  test('should handle dequeue on empty queue', () => {
    expect(queue.dequeue()).toBe(undefined)
  })

  test('should correctly report empty state', () => {
    expect(queue.empty()).toBe(true)
    queue.enqueue(1)
    expect(queue.empty()).toBe(false)
    queue.dequeue()
    expect(queue.empty()).toBe(true)
  })
})
