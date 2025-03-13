function dijkstra (graph, start) {
  const distances = {}
  const visited = new Set()
  const pq = new PriorityQueue((a, b) => a[1] < b[1])

  for (const node in graph) {
    distances[node] = Infinity
  }
  distances[start] = 0
  pq.enqueue([start, 0])

  while (!pq.isEmpty()) {
    const [current, currentDist] = pq.dequeue()
    if (visited.has(current)) continue
    visited.add(current)

    for (const neighbor in graph[current]) {
      const newDist = currentDist + graph[current][neighbor]
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist
        pq.enqueue([neighbor, newDist])
      }
    }
  }

  return distances
}

class PriorityQueue {
  constructor (comparator = (a, b) => a > b) {
    this._heap = []
    this._comparator = comparator
  }

  size () {
    return this._heap.length
  }

  isEmpty () {
    return this.size() === 0
  }

  peek () {
    return this._heap[0]
  }

  enqueue (value) {
    this._heap.push(value)
    this._siftUp()
  }

  dequeue () {
    const poppedValue = this.peek()
    const bottom = this.size() - 1
    if (bottom > 0) {
      this._swap(0, bottom)
    }
    this._heap.pop()
    this._siftDown()
    return poppedValue
  }

  _siftUp () {
    let nodeIdx = this.size() - 1
    while (nodeIdx > 0 && this._comparator(this._heap[nodeIdx], this._heap[this._parent(nodeIdx)])) {
      this._swap(nodeIdx, this._parent(nodeIdx))
      nodeIdx = this._parent(nodeIdx)
    }
  }

  _siftDown () {
    let nodeIdx = 0
    while (
      (this._left(nodeIdx) < this.size() && this._comparator(this._heap[this._left(nodeIdx)], this._heap[nodeIdx])) ||
      (this._right(nodeIdx) < this.size() && this._comparator(this._heap[this._right(nodeIdx)], this._heap[nodeIdx]))
    ) {
      const greaterChildIdx =
        this._right(nodeIdx) < this.size() && this._comparator(this._heap[this._right(nodeIdx)], this._heap[this._left(nodeIdx)])
          ? this._right(nodeIdx)
          : this._left(nodeIdx)
      this._swap(nodeIdx, greaterChildIdx)
      nodeIdx = greaterChildIdx
    }
  }

  _parent (idx) {
    return ((idx + 1) >>> 1) - 1
  }

  _left (idx) {
    return (idx << 1) + 1
  }

  _right (idx) {
    return (idx + 1) << 1
  }

  _swap (i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]]
  }
}

module.exports = dijkstra
