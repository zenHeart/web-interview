/**
 * LRU缓存实现
 * 使用双向链表 + 哈希表
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    // 创建头尾虚拟节点
    this.head = { key: -1, value: -1, prev: null, next: null };
    this.tail = { key: -1, value: -1, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取值
   * @param {number} key
   * @returns {number}
   */
  get(key) {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      // 移动到头部（最近使用）
      this.moveToHead(node);
      return node.value;
    }
    return -1;
  }

  /**
   * 设置键值对
   * @param {number} key
   * @param {number} value
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // 更新已存在的节点
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
    } else {
      // 创建新节点
      const newNode = { key, value, prev: null, next: null };
      
      if (this.cache.size >= this.capacity) {
        // 删除尾部节点（最久未使用）
        const tail = this.removeTail();
        this.cache.delete(tail.key);
      }
      
      this.cache.set(key, newNode);
      this.addToHead(newNode);
    }
  }

  /**
   * 将节点添加到头部
   */
  addToHead(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * 移除节点
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * 将节点移动到头部
   */
  moveToHead(node) {
    this.removeNode(node);
    this.addToHead(node);
  }

  /**
   * 移除尾部节点
   */
  removeTail() {
    const lastNode = this.tail.prev;
    this.removeNode(lastNode);
    return lastNode;
  }

  /**
   * 获取当前缓存状态（用于调试）
   */
  getState() {
    const result = [];
    let current = this.head.next;
    while (current !== this.tail) {
      result.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return result;
  }
}

/**
 * 简化版LRU缓存（使用Map的插入顺序特性）
 */
class SimpleLRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // 重新插入以更新顺序
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最早插入的项（Map迭代器的第一个）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  getState() {
    return Array.from(this.cache.entries()).map(([key, value]) => ({ key, value }));
  }
}

module.exports = { LRUCache, SimpleLRUCache };
