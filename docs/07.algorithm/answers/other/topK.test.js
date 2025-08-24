const { MinHeap, topKLargest, quickSelect, massiveDataTopK } = require('./topK.js');

console.log('=== TopK问题测试 ===');

// 测试最小堆
console.log('\n--- 最小堆测试 ---');
const heap = new MinHeap();
const values = [5, 2, 8, 1, 9, 3];
console.log('插入:', values);

values.forEach(val => heap.insert(val));
console.log('堆内容:', heap.heap);

const extracted = [];
while (!heap.isEmpty()) {
  extracted.push(heap.extractMin());
}
console.log('依次取出:', extracted); // 应该是[1, 2, 3, 5, 8, 9]

// 测试TopK最大值
console.log('\n--- TopK最大值测试 ---');
const testData = [3, 2, 1, 5, 6, 4, 7, 8, 9, 10];
console.log('原数组:', testData);

for (let k = 1; k <= 5; k++) {
  const result = topKLargest(testData, k);
  console.log(`Top${k}最大值:`, result);
}

// 测试快速选择
console.log('\n--- 快速选择测试 ---');
console.log('原数组:', testData);
for (let k = 1; k <= 5; k++) {
  const result = quickSelect(testData, k);
  console.log(`第${k}大的数:`, result);
}

// 性能对比测试
console.log('\n--- 性能对比测试 ---');
const largeData = [];
for (let i = 0; i < 10000; i++) {
  largeData.push(Math.floor(Math.random() * 100000));
}
console.log(`生成${largeData.length}个随机数进行测试...`);

console.time('堆排序TopK');
const heapResult = topKLargest(largeData, 10);
console.timeEnd('堆排序TopK');
console.log('堆排序Top10:', heapResult);

console.time('快速选择第10大');
const quickResult = quickSelect(largeData, 10);
console.timeEnd('快速选择第10大');
console.log('快速选择第10大:', quickResult);

// 测试海量数据TopK模拟
console.log('\n--- 海量数据TopK模拟测试 ---');
const massiveData = [];
for (let i = 0; i < 5000; i++) {
  massiveData.push(Math.floor(Math.random() * 10000));
}

console.time('海量数据TopK');
const massiveResult = massiveDataTopK(massiveData, 10, 500);
console.timeEnd('海量数据TopK');
console.log('海量数据Top10:', massiveResult);

// 验证正确性
const sortedData = [...massiveData].sort((a, b) => b - a);
const actualTop10 = sortedData.slice(0, 10);
console.log('实际Top10:', actualTop10);
console.log('结果匹配:', JSON.stringify(massiveResult.sort((a, b) => b - a)) === JSON.stringify(actualTop10) ? '✓' : '✗');

// 边界情况测试
console.log('\n--- 边界情况测试 ---');
console.log('空数组TopK:', topKLargest([], 5));
console.log('k=0:', topKLargest([1, 2, 3], 0));
console.log('k大于数组长度:', topKLargest([1, 2, 3], 5));
console.log('单元素数组:', topKLargest([42], 1));
console.log('快速选择越界:', quickSelect([1, 2, 3], 5));
