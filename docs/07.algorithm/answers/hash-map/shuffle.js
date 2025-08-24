/**
 * 洗牌算法实现
 */

/**
 * Fisher-Yates 洗牌算法（现代版本）
 * 时间复杂度: O(n)
 * 空间复杂度: O(1)
 * 真正的均匀随机分布
 */
function fisherYatesShuffle(array) {
  // 不修改原数组
  const shuffled = [...array];
  
  // 从后往前遍历
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 随机选择一个位置 [0, i]
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // 交换当前位置和随机位置的元素
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 错误的 sort + Math.random 方法
 * 问题：不是真正的均匀分布
 * 仅供对比演示，不推荐使用
 */
function badSortShuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/**
 * Knuth-Durstenfeld 洗牌算法（Fisher-Yates的改进版）
 * 原地洗牌，修改原数组
 */
function knuthShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Inside-Out 洗牌算法
 * 适合流式数据，可以边读取边洗牌
 */
function insideOutShuffle(array) {
  const result = new Array(array.length);
  
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    if (j !== i) {
      result[i] = result[j];
    }
    result[j] = array[i];
  }
  
  return result;
}

/**
 * 蓄水池抽样算法
 * 从未知大小的数据流中随机采样k个元素
 */
function reservoirSampling(stream, k) {
  const reservoir = [];
  
  for (let i = 0; i < stream.length; i++) {
    if (i < k) {
      // 前k个元素直接加入蓄水池
      reservoir[i] = stream[i];
    } else {
      // 以 k/(i+1) 的概率替换蓄水池中的元素
      const randomIndex = Math.floor(Math.random() * (i + 1));
      if (randomIndex < k) {
        reservoir[randomIndex] = stream[i];
      }
    }
  }
  
  return reservoir;
}

/**
 * 测试洗牌算法的均匀性
 * 通过统计每个元素在各个位置出现的频次来验证
 */
function testShuffleUniformity(shuffleFunc, testArray, iterations = 10000) {
  const positions = {};
  const arrayLength = testArray.length;
  
  // 初始化统计
  for (let i = 0; i < arrayLength; i++) {
    positions[i] = {};
    for (let j = 0; j < arrayLength; j++) {
      positions[i][testArray[j]] = 0;
    }
  }
  
  // 进行多次洗牌测试
  for (let iter = 0; iter < iterations; iter++) {
    const shuffled = shuffleFunc([...testArray]);
    for (let pos = 0; pos < arrayLength; pos++) {
      positions[pos][shuffled[pos]]++;
    }
  }
  
  // 计算每个位置的分布情况
  const results = {};
  for (let pos = 0; pos < arrayLength; pos++) {
    results[`position_${pos}`] = {};
    for (const element of testArray) {
      const frequency = positions[pos][element];
      const percentage = (frequency / iterations * 100).toFixed(1);
      results[`position_${pos}`][element] = `${frequency} (${percentage}%)`;
    }
  }
  
  return results;
}

/**
 * 性能测试
 */
function performanceTest(size = 10000, iterations = 1000) {
  const testArray = Array.from({ length: size }, (_, i) => i);
  
  console.log(`性能测试 - 数组大小: ${size}, 迭代次数: ${iterations}`);
  
  // Fisher-Yates
  console.time('Fisher-Yates');
  for (let i = 0; i < iterations; i++) {
    fisherYatesShuffle(testArray);
  }
  console.timeEnd('Fisher-Yates');
  
  // Sort + Random (错误方法)
  console.time('Sort + Random');
  for (let i = 0; i < iterations; i++) {
    badSortShuffle(testArray);
  }
  console.timeEnd('Sort + Random');
  
  // Inside-Out
  console.time('Inside-Out');
  for (let i = 0; i < iterations; i++) {
    insideOutShuffle(testArray);
  }
  console.timeEnd('Inside-Out');
}

/**
 * 洗牌质量分析
 * 使用卡方检验评估随机性
 */
function analyzeShuffleQuality(shuffleFunc, testArray, iterations = 1000) {
  const positionCounts = new Array(testArray.length).fill(0).map(() => 
    new Array(testArray.length).fill(0)
  );
  
  for (let iter = 0; iter < iterations; iter++) {
    const shuffled = shuffleFunc([...testArray]);
    for (let pos = 0; pos < shuffled.length; pos++) {
      const elementIndex = testArray.indexOf(shuffled[pos]);
      positionCounts[pos][elementIndex]++;
    }
  }
  
  // 计算期望频次
  const expectedFreq = iterations / testArray.length;
  
  // 计算卡方统计量
  let chiSquare = 0;
  for (let pos = 0; pos < testArray.length; pos++) {
    for (let elem = 0; elem < testArray.length; elem++) {
      const observed = positionCounts[pos][elem];
      const expected = expectedFreq;
      chiSquare += Math.pow(observed - expected, 2) / expected;
    }
  }
  
  return {
    chiSquare: chiSquare.toFixed(2),
    degreesOfFreedom: (testArray.length - 1) * (testArray.length - 1),
    positionCounts
  };
}

/**
 * 加权洗牌算法
 * 根据权重进行洗牌，权重高的元素更容易排在前面
 */
function weightedShuffle(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights arrays must have the same length');
  }
  
  // 创建带权重的数组
  const weightedItems = items.map((item, index) => ({
    item,
    weight: weights[index],
    random: Math.random()
  }));
  
  // 按照 random^(1/weight) 排序
  weightedItems.sort((a, b) => 
    Math.pow(b.random, 1 / b.weight) - Math.pow(a.random, 1 / a.weight)
  );
  
  return weightedItems.map(({ item }) => item);
}

module.exports = {
  fisherYatesShuffle,
  badSortShuffle,
  knuthShuffle,
  insideOutShuffle,
  reservoirSampling,
  testShuffleUniformity,
  performanceTest,
  analyzeShuffleQuality,
  weightedShuffle
};
