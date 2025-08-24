const { 
  SimpleTreeMap, 
  performanceTest, 
  featureComparison, 
  spaceComplexityDemo 
} = require('./mapComparison.js');

console.log('=== HashMap vs TreeMap 对比测试 ===');

// 基本功能测试
console.log('\n--- 基本功能测试 ---');
const hashMap = new Map();
const treeMap = new SimpleTreeMap();

// 测试插入和查找
const testData = [
  [5, 'five'],
  [2, 'two'], 
  [8, 'eight'],
  [1, 'one'],
  [7, 'seven'],
  [3, 'three']
];

console.log('插入数据:', testData);

testData.forEach(([key, value]) => {
  hashMap.set(key, value);
  treeMap.put(key, value);
});

console.log('HashMap 大小:', hashMap.size);
console.log('TreeMap 大小:', treeMap.size);

console.log('\n--- 查找测试 ---');
console.log('HashMap 查找 key=5:', hashMap.get(5));
console.log('TreeMap 查找 key=5:', treeMap.get(5));
console.log('HashMap 查找 key=999:', hashMap.get(999));
console.log('TreeMap 查找 key=999:', treeMap.get(999));

console.log('\n--- 遍历顺序对比 ---');
console.log('HashMap 键（插入顺序）:', Array.from(hashMap.keys()));
console.log('TreeMap 键（排序顺序）:', treeMap.keys());

// 时间复杂度演示
console.log('\n--- 时间复杂度演示 ---');
console.log('插入 1000 个有序数据到TreeMap...');
const orderedTreeMap = new SimpleTreeMap();
console.time('TreeMap有序插入');
for (let i = 0; i < 1000; i++) {
  orderedTreeMap.put(i, `value_${i}`);
}
console.timeEnd('TreeMap有序插入');

console.log('插入 1000 个数据到HashMap...');
const orderedHashMap = new Map();
console.time('HashMap插入');
for (let i = 0; i < 1000; i++) {
  orderedHashMap.set(i, `value_${i}`);
}
console.timeEnd('HashMap插入');

// TreeMap 特有功能演示
console.log('\n--- TreeMap 特有功能 ---');
const rangeTreeMap = new SimpleTreeMap();
[15, 10, 20, 8, 12, 25, 6, 11, 13, 27].forEach(key => {
  rangeTreeMap.put(key, `value_${key}`);
});

console.log('所有键（有序）:', rangeTreeMap.keys());
console.log('最小键:', rangeTreeMap.firstKey());
console.log('最大键:', rangeTreeMap.lastKey());
console.log('有序遍历:', rangeTreeMap.entries());

// 自定义比较器测试
console.log('\n--- 自定义比较器测试 ---');
const reverseTreeMap = new SimpleTreeMap((a, b) => b - a); // 降序
[5, 2, 8, 1, 9, 3].forEach(key => {
  reverseTreeMap.put(key, `value_${key}`);
});
console.log('降序 TreeMap 键:', reverseTreeMap.keys());

const stringTreeMap = new SimpleTreeMap(); // 字符串比较
['banana', 'apple', 'orange', 'grape'].forEach(key => {
  stringTreeMap.put(key, key.length);
});
console.log('字符串 TreeMap 键:', stringTreeMap.keys());

// 运行完整对比测试
featureComparison();
spaceComplexityDemo();
performanceTest();

console.log('\n=== 总结 ===');
console.log('HashMap优势: O(1)平均时间复杂度，内存效率高');
console.log('TreeMap优势: 有序存储，支持范围查询，O(log n)稳定性能');
