/**
 * HashMap vs TreeMap 对比演示
 */

/**
 * 简单的TreeMap实现（基于红黑树的简化版本）
 */
class TreeMapNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class SimpleTreeMap {
  constructor(compareFn = (a, b) => a < b ? -1 : a > b ? 1 : 0) {
    this.root = null;
    this.size = 0;
    this.compare = compareFn;
  }

  put(key, value) {
    if (this.root === null) {
      this.root = new TreeMapNode(key, value);
      this.size++;
      return;
    }

    this._insert(this.root, key, value);
  }

  _insert(node, key, value) {
    const cmp = this.compare(key, node.key);
    
    if (cmp === 0) {
      // 更新现有节点
      node.value = value;
      return;
    }
    
    if (cmp < 0) {
      if (node.left === null) {
        node.left = new TreeMapNode(key, value);
        this.size++;
      } else {
        this._insert(node.left, key, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeMapNode(key, value);
        this.size++;
      } else {
        this._insert(node.right, key, value);
      }
    }
  }

  get(key) {
    return this._search(this.root, key);
  }

  _search(node, key) {
    if (node === null) return undefined;
    
    const cmp = this.compare(key, node.key);
    if (cmp === 0) return node.value;
    if (cmp < 0) return this._search(node.left, key);
    return this._search(node.right, key);
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  // 中序遍历获取有序的键值对
  entries() {
    const result = [];
    this._inorderTraversal(this.root, result);
    return result;
  }

  _inorderTraversal(node, result) {
    if (node !== null) {
      this._inorderTraversal(node.left, result);
      result.push([node.key, node.value]);
      this._inorderTraversal(node.right, result);
    }
  }

  keys() {
    return this.entries().map(([key]) => key);
  }

  values() {
    return this.entries().map(([, value]) => value);
  }

  // 获取第一个（最小）键
  firstKey() {
    if (this.root === null) return undefined;
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.key;
  }

  // 获取最后一个（最大）键
  lastKey() {
    if (this.root === null) return undefined;
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.key;
  }
}

/**
 * 性能测试函数
 */
function performanceTest() {
  const testSize = 10000;
  const randomKeys = Array.from({ length: testSize }, () => 
    Math.floor(Math.random() * testSize * 2)
  );

  console.log(`=== 性能测试 (${testSize} 个操作) ===`);

  // HashMap (Map) 性能测试
  console.time('HashMap 插入');
  const hashMap = new Map();
  for (const key of randomKeys) {
    hashMap.set(key, `value_${key}`);
  }
  console.timeEnd('HashMap 插入');

  console.time('HashMap 查找');
  for (const key of randomKeys) {
    hashMap.get(key);
  }
  console.timeEnd('HashMap 查找');

  // TreeMap 性能测试
  console.time('TreeMap 插入');
  const treeMap = new SimpleTreeMap();
  for (const key of randomKeys) {
    treeMap.put(key, `value_${key}`);
  }
  console.timeEnd('TreeMap 插入');

  console.time('TreeMap 查找');
  for (const key of randomKeys) {
    treeMap.get(key);
  }
  console.timeEnd('TreeMap 查找');

  console.log(`HashMap 大小: ${hashMap.size}`);
  console.log(`TreeMap 大小: ${treeMap.size}`);
}

/**
 * 功能特性对比
 */
function featureComparison() {
  console.log('=== 功能特性对比 ===');

  const hashMap = new Map();
  const treeMap = new SimpleTreeMap();

  // 插入无序数据
  const data = [
    [30, 'thirty'],
    [10, 'ten'],
    [50, 'fifty'],
    [20, 'twenty'],
    [40, 'forty']
  ];

  console.log('\n--- 插入数据 ---');
  console.log('插入顺序:', data.map(([k, v]) => k));

  data.forEach(([key, value]) => {
    hashMap.set(key, value);
    treeMap.put(key, value);
  });

  console.log('\n--- 遍历结果 ---');
  console.log('HashMap 遍历（插入顺序）:', Array.from(hashMap.keys()));
  console.log('TreeMap 遍历（排序顺序）:', treeMap.keys());

  console.log('\n--- 范围查询 ---');
  console.log('TreeMap 最小键:', treeMap.firstKey());
  console.log('TreeMap 最大键:', treeMap.lastKey());
  console.log('HashMap 无法直接获取最小/最大键');

  console.log('\n--- 有序遍历 ---');
  console.log('TreeMap 有序键值对:', treeMap.entries());
  
  const sortedHashMap = Array.from(hashMap.entries()).sort(([a], [b]) => a - b);
  console.log('HashMap 需要手动排序:', sortedHashMap);
}

/**
 * 空间复杂度对比
 */
function spaceComplexityDemo() {
  console.log('\n=== 空间复杂度演示 ===');

  const size = 1000;
  
  // HashMap
  const hashMap = new Map();
  for (let i = 0; i < size; i++) {
    hashMap.set(i, `value_${i}`);
  }

  // TreeMap  
  const treeMap = new SimpleTreeMap();
  for (let i = 0; i < size; i++) {
    treeMap.put(i, `value_${i}`);
  }

  console.log(`HashMap: 每个条目只存储键值对`);
  console.log(`TreeMap: 每个条目额外存储左右子节点指针`);
  console.log(`TreeMap 的空间开销相对更大`);
}

module.exports = {
  SimpleTreeMap,
  TreeMapNode,
  performanceTest,
  featureComparison,
  spaceComplexityDemo
};
