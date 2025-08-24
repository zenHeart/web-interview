const { LRUCache, SimpleLRUCache } = require('./lruCache.js');

console.log('=== LRU缓存测试 ===');

// 测试标准LRU缓存
console.log('\n--- 标准LRU缓存测试 ---');
const lru = new LRUCache(2);

console.log('1. 插入 (1, 1)');
lru.put(1, 1);
console.log('缓存状态:', lru.getState());

console.log('2. 插入 (2, 2)');
lru.put(2, 2);
console.log('缓存状态:', lru.getState());

console.log('3. 获取 key=1:', lru.get(1)); // 返回 1，key=1变为最近使用
console.log('缓存状态:', lru.getState());

console.log('4. 插入 (3, 3)'); // key=2被淘汰
lru.put(3, 3);
console.log('缓存状态:', lru.getState());

console.log('5. 获取 key=2:', lru.get(2)); // 返回 -1 (未找到)
console.log('6. 获取 key=3:', lru.get(3)); // 返回 3
console.log('7. 获取 key=1:', lru.get(1)); // 返回 1

console.log('8. 插入 (4, 4)'); // key=3被淘汰
lru.put(4, 4);
console.log('缓存状态:', lru.getState());

console.log('9. 获取 key=1:', lru.get(1)); // 返回 1
console.log('10. 获取 key=3:', lru.get(3)); // 返回 -1
console.log('11. 获取 key=4:', lru.get(4)); // 返回 4

// 测试简化版LRU缓存
console.log('\n--- 简化版LRU缓存测试 ---');
const simpleLru = new SimpleLRUCache(3);

console.log('1. 插入多个键值对');
simpleLru.put('a', 1);
simpleLru.put('b', 2);
simpleLru.put('c', 3);
console.log('缓存状态:', simpleLru.getState());

console.log('2. 访问key=a:', simpleLru.get('a')); // a变为最近使用
console.log('缓存状态:', simpleLru.getState());

console.log('3. 插入 (d, 4)'); // b被淘汰
simpleLru.put('d', 4);
console.log('缓存状态:', simpleLru.getState());

console.log('4. 获取 key=b:', simpleLru.get('b')); // 返回 -1
console.log('5. 获取 key=c:', simpleLru.get('c')); // 返回 3

// 测试更新已存在的key
console.log('\n--- 更新测试 ---');
const updateLru = new LRUCache(2);
updateLru.put(1, 1);
updateLru.put(2, 2);
console.log('初始状态:', updateLru.getState());

console.log('更新 key=1 的值为 10');
updateLru.put(1, 10);
console.log('更新后状态:', updateLru.getState());
console.log('获取 key=1:', updateLru.get(1)); // 返回 10

// 性能测试
console.log('\n--- 性能测试 ---');
const perfLru = new LRUCache(1000);

console.time('LRU性能测试');
for (let i = 0; i < 10000; i++) {
  perfLru.put(i % 1500, i); // 会有一些key重复，测试缓存淘汰
}

for (let i = 0; i < 1000; i++) {
  perfLru.get(i);
}
console.timeEnd('LRU性能测试');

console.log('最终缓存大小:', perfLru.cache.size);

// 边界情况测试
console.log('\n--- 边界情况测试 ---');
const edgeLru = new LRUCache(1);
console.log('容量为1的缓存:');
edgeLru.put(1, 1);
console.log('插入(1,1)后:', edgeLru.getState());
edgeLru.put(2, 2);
console.log('插入(2,2)后:', edgeLru.getState());
console.log('获取key=1:', edgeLru.get(1)); // 应该返回-1
