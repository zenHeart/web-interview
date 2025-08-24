const {
  fisherYatesShuffle,
  badSortShuffle,
  knuthShuffle,
  insideOutShuffle,
  reservoirSampling,
  testShuffleUniformity,
  performanceTest,
  analyzeShuffleQuality,
  weightedShuffle
} = require('./shuffle.js');

console.log('=== 洗牌算法测试 ===');

// 基本功能测试
const testArray = [1, 2, 3, 4, 5];
console.log('原数组:', testArray);

console.log('\n--- 各种洗牌算法结果 ---');
console.log('Fisher-Yates:', fisherYatesShuffle(testArray));
console.log('Sort + Random:', badSortShuffle(testArray));
console.log('Inside-Out:', insideOutShuffle(testArray));

// 原地洗牌测试
const inPlaceArray = [1, 2, 3, 4, 5];
console.log('原地洗牌前:', inPlaceArray);
knuthShuffle(inPlaceArray);
console.log('原地洗牌后:', inPlaceArray);

console.log('\n--- 蓄水池抽样测试 ---');
const stream = Array.from({ length: 20 }, (_, i) => i + 1);
console.log('数据流 (1-20):', stream);
console.log('抽样3个元素:', reservoirSampling(stream, 3));
console.log('抽样5个元素:', reservoirSampling(stream, 5));

console.log('\n--- 加权洗牌测试 ---');
const items = ['A', 'B', 'C', 'D', 'E'];
const weights = [1, 2, 3, 4, 5]; // E的权重最高
console.log('元素:', items);
console.log('权重:', weights);
console.log('加权洗牌结果:', weightedShuffle(items, weights));
console.log('加权洗牌结果:', weightedShuffle(items, weights));
console.log('加权洗牌结果:', weightedShuffle(items, weights));

console.log('\n--- 均匀性测试 ---');
const uniformTestArray = ['A', 'B', 'C'];
console.log('测试Fisher-Yates算法的均匀性 (3000次迭代):');

const fisherResults = testShuffleUniformity(fisherYatesShuffle, uniformTestArray, 3000);
console.log('Fisher-Yates分布:', fisherResults);

console.log('\n测试Sort + Random的均匀性 (3000次迭代):');
const sortResults = testShuffleUniformity(badSortShuffle, uniformTestArray, 3000);
console.log('Sort + Random分布:', sortResults);

console.log('\n--- 质量分析 ---');
console.log('Fisher-Yates质量分析:');
const fisherQuality = analyzeShuffleQuality(fisherYatesShuffle, uniformTestArray, 1000);
console.log(`卡方值: ${fisherQuality.chiSquare} (自由度: ${fisherQuality.degreesOfFreedom})`);

console.log('\nSort + Random质量分析:');
const sortQuality = analyzeShuffleQuality(badSortShuffle, uniformTestArray, 1000);
console.log(`卡方值: ${sortQuality.chiSquare} (自由度: ${sortQuality.degreesOfFreedom})`);

console.log('\n--- 大数组测试 ---');
const largeArray = Array.from({ length: 1000 }, (_, i) => i);
console.log('洗牌1000个元素的数组...');

console.time('Fisher-Yates大数组');
const shuffledLarge = fisherYatesShuffle(largeArray);
console.timeEnd('Fisher-Yates大数组');

console.log('前10个元素:', shuffledLarge.slice(0, 10));
console.log('后10个元素:', shuffledLarge.slice(-10));

console.log('\n--- 多次洗牌结果对比 ---');
const multiTestArray = [1, 2, 3, 4];
console.log('原数组:', multiTestArray);

console.log('\n连续5次Fisher-Yates洗牌:');
for (let i = 0; i < 5; i++) {
  console.log(`第${i + 1}次:`, fisherYatesShuffle(multiTestArray));
}

console.log('\n连续5次Sort + Random洗牌:');
for (let i = 0; i < 5; i++) {
  console.log(`第${i + 1}次:`, badSortShuffle(multiTestArray));
}

console.log('\n--- 边界情况测试 ---');
console.log('空数组:', fisherYatesShuffle([]));
console.log('单元素数组:', fisherYatesShuffle([42]));
console.log('两元素数组:', fisherYatesShuffle(['X', 'Y']));

console.log('\n--- 蓄水池抽样边界测试 ---');
console.log('k=0:', reservoirSampling([1, 2, 3, 4, 5], 0));
console.log('k大于数组长度:', reservoirSampling([1, 2, 3], 5));

// 验证蓄水池抽样的均匀性
console.log('\n--- 蓄水池抽样均匀性验证 ---');
const reservoirTestStream = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const reservoirStats = {};

// 进行多次抽样统计
for (let i = 0; i < 10000; i++) {
  const sample = reservoirSampling(reservoirTestStream, 3);
  sample.forEach(item => {
    reservoirStats[item] = (reservoirStats[item] || 0) + 1;
  });
}

console.log('10000次抽样3个元素的统计结果:');
Object.entries(reservoirStats).forEach(([item, count]) => {
  const percentage = (count / 30000 * 100).toFixed(1); // 总共30000次采样机会
  console.log(`元素${item}: ${count}次 (${percentage}%)`);
});

console.log('\n--- 性能对比测试 ---');
performanceTest(1000, 100);

console.log('\n=== 洗牌算法总结 ===');
console.log('Fisher-Yates算法:');
console.log('  - 时间复杂度: O(n)');
console.log('  - 空间复杂度: O(1) (原地) 或 O(n) (非原地)');
console.log('  - 真正的均匀分布');
console.log('  - 推荐使用');

console.log('\nSort + Random方法:');
console.log('  - 时间复杂度: O(n log n)');
console.log('  - 分布不均匀，有偏向性');
console.log('  - 不推荐使用');

console.log('\nInside-Out算法:');
console.log('  - 适合流式数据');
console.log('  - 可以边读边洗牌');
console.log('  - 均匀分布');

console.log('\n蓄水池抽样:');
console.log('  - 适合从大数据流中抽样');
console.log('  - 内存使用固定');
console.log('  - 保证每个元素被选中概率相等');
