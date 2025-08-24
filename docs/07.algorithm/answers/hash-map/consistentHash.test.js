const { ConsistentHash, SimpleModHash, simpleHash } = require('./consistentHash.js');

console.log('=== 一致性哈希测试 ===');

// 生成测试数据
const generateTestKeys = (count) => {
  return Array.from({ length: count }, (_, i) => `key-${i}`);
};

// 计算分布的标准差（用于衡量负载均衡效果）
const calculateStandardDeviation = (distribution) => {
  const values = Object.values(distribution);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(avgSquaredDiff);
};

console.log('\n--- 基本功能测试 ---');
// 创建一致性哈希环
const consistentHash = new ConsistentHash(['node-A', 'node-B', 'node-C']);
console.log('哈希环信息:', consistentHash.getRingInfo());

// 测试数据分配
const testKeys = ['user1', 'user2', 'user3', 'user4', 'user5'];
console.log('\n数据分配结果:');
testKeys.forEach(key => {
  console.log(`${key} -> ${consistentHash.getNode(key)}`);
});

console.log('\n--- 负载均衡测试 ---');
const manyKeys = generateTestKeys(1000);
const distribution = consistentHash.getDistribution(manyKeys);
console.log('1000个键的分布:', distribution);

const stdDev = calculateStandardDeviation(distribution);
console.log(`分布标准差: ${stdDev.toFixed(2)} (越小越均匀)`);

console.log('\n--- 节点扩容测试 ---');
console.log('添加新节点 node-D...');
const beforeExpansion = consistentHash.getDistribution(manyKeys);
console.log('扩容前分布:', beforeExpansion);

consistentHash.addNode('node-D');
const afterExpansion = consistentHash.getDistribution(manyKeys);
console.log('扩容后分布:', afterExpansion);

// 计算数据迁移量
let totalMigrations = 0;
manyKeys.forEach(key => {
  const beforeNode = Object.keys(beforeExpansion).find(node => 
    consistentHash.getNode(key) !== node && beforeExpansion[node] > 0
  );
  // 这里简化了迁移计算，实际需要更复杂的逻辑
});

console.log('\n--- 节点故障测试 ---');
const failureTest = consistentHash.simulateFailure('node-A', manyKeys);

console.log('\n--- 虚拟节点数量影响测试 ---');
const testVirtualNodes = [10, 50, 100, 200];
testVirtualNodes.forEach(virtualCount => {
  const testHash = new ConsistentHash(['node-1', 'node-2', 'node-3'], virtualCount);
  const testDistribution = testHash.getDistribution(generateTestKeys(300));
  const testStdDev = calculateStandardDeviation(testDistribution);
  console.log(`虚拟节点数 ${virtualCount}: 标准差 ${testStdDev.toFixed(2)}`);
});

console.log('\n--- 一致性哈希 vs 传统取模哈希对比 ---');

// 传统取模哈希测试
const modHash = new SimpleModHash(3);
const modKeys = generateTestKeys(300);

console.log('原始分布 (3个节点):');
const originalModDist = modHash.getDistribution(modKeys);
const originalConsistentDist = new ConsistentHash(['node-0', 'node-1', 'node-2']).getDistribution(modKeys);

console.log('取模哈希:', originalModDist);
console.log('一致性哈希:', originalConsistentDist);

// 添加一个节点，观察数据迁移
console.log('\n添加一个节点后:');
modHash.addNode('node-3');
const newModDist = modHash.getDistribution(modKeys);

const newConsistent = new ConsistentHash(['node-0', 'node-1', 'node-2']);
newConsistent.addNode('node-3');
const newConsistentDist = newConsistent.getDistribution(modKeys);

console.log('取模哈希:', newModDist);
console.log('一致性哈希:', newConsistentDist);

// 计算数据迁移比例
const calculateMigrationRatio = (before, after, keys) => {
  let migrations = 0;
  keys.forEach(key => {
    const hashBefore = simpleHash(key) % 3;
    const hashAfter = simpleHash(key) % 4;
    if (`node-${hashBefore}` !== `node-${hashAfter}`) {
      migrations++;
    }
  });
  return (migrations / keys.length) * 100;
};

const modMigrationRatio = calculateMigrationRatio(originalModDist, newModDist, modKeys);
console.log(`\n取模哈希数据迁移比例: ${modMigrationRatio.toFixed(1)}%`);
console.log(`一致性哈希数据迁移比例: 约25% (理论值)`);

console.log('\n--- 哈希函数测试 ---');
const hashTestStrings = ['hello', 'world', 'consistent', 'hashing', 'test'];
console.log('哈希值测试:');
hashTestStrings.forEach(str => {
  console.log(`"${str}" -> ${simpleHash(str)}`);
});

console.log('\n--- 性能测试 ---');
const perfKeys = generateTestKeys(10000);

console.time('一致性哈希查找');
perfKeys.forEach(key => consistentHash.getNode(key));
console.timeEnd('一致性哈希查找');

console.time('取模哈希查找');
perfKeys.forEach(key => modHash.getNode(key));
console.timeEnd('取模哈希查找');

console.log('\n=== 总结 ===');
console.log('一致性哈希优势:');
console.log('- 节点变化时数据迁移量小 (约1/n vs 约(n-1)/n)');
console.log('- 通过虚拟节点实现负载均衡');
console.log('- 适合分布式系统的动态扩缩容');
console.log('\n传统哈希优势:');
console.log('- 实现简单，计算速度快');
console.log('- 节点固定时分布均匀');
console.log('- 内存开销小');
