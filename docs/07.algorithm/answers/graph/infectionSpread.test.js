const {
  infectionSpreadPart1,
  infectionSpreadPart2,
  infectionSpreadPart3,
  infectionSpreadPart4,
  infectionSpreadPart5
} = require('./infectionSpread');

describe('Infection Spread Algorithm Suite (OpenAI 5-Part Follow-up)', () => {
  describe('Part 1: 基础多源 BFS 传播', () => {
    test('标准网格全感染天数', () => {
      // 2x3 网格，一个角落感染
      const grid = [
        [1, 0, 0],
        [0, 0, 0]
      ];
      // 第0天: (0,0)
      // 第1天: (0,1), (1,0)
      // 第2天: (0,2), (1,1)
      // 第3天: (1,2)
      expect(infectionSpreadPart1(grid)).toBe(3);
    });

    test('多源同时扩散', () => {
      const grid = [
        [1, 0],
        [0, 1]
      ];
      // 第1天: (0,1) 与 (1,0) 同时被感染
      expect(infectionSpreadPart1(grid)).toBe(1);
    });

    test('初始全健康或全感染', () => {
      expect(infectionSpreadPart1([[0, 0], [0, 0]])).toBe(-1);
      expect(infectionSpreadPart1([[1, 1], [1, 1]])).toBe(0);
    });
  });

  describe('Part 2: 免疫墙隔离', () => {
    test('存在免疫墙阻隔导致不可达', () => {
      const grid = [
        [1, 2, 0],
        [2, 2, 0]
      ];
      // 健康格 (0,2) 和 (1,2) 完全被墙阻断
      expect(infectionSpreadPart2(grid)).toBe(-1);
    });

    test('绕过免疫墙成功全员感染', () => {
      const grid = [
        [1, 2, 0],
        [0, 0, 0]
      ];
      // 曼哈顿路径绕行: (0,0) -> (1,0) -> (1,1) -> (1,2) -> (0,2)，共 4 天
      expect(infectionSpreadPart2(grid)).toBe(4);
    });
  });

  describe('Part 3: 自愈生命周期 (Off-by-one 时序控制)', () => {
    test('D=1 时单向波传播并按时自愈为免疫', () => {
      // 1x3 线性网格，D=1
      // 第0天: (0,0) 感染，向 (0,1) 扩散
      // 第1天: (0,0) 自愈为 2 (免疫)；(0,1) 扩散到 (0,2)
      // 第2天: (0,1) 自愈为 2；(0,2) 没有新邻居可扩散
      // 第3天: (0,2) 自愈为 2，全网格进入稳态
      const grid = [
        [1, 0, 0]
      ];
      const res = infectionSpreadPart3(grid, 1);
      expect(res.days).toBe(3);
      expect(res.remainingHealthy).toBe(0);
      expect(res.finalGrid).toEqual([[2, 2, 2]]);
    });

    test('遇到免疫墙与自愈双重截断，成功保护孤立健康格', () => {
      // (0,0) 感染，(0,1) 被免疫墙隔开，只有向下能走
      // 但下方有更多健康格无法在有限寿命内扩散完全
      const grid = [
        [1, 2, 0],
        [0, 2, 0]
      ];
      const res = infectionSpreadPart3(grid, 1);
      // (0,2) 和 (1,2) 从未被波及，依然健康
      expect(res.remainingHealthy).toBe(2);
      expect(res.finalGrid[0][2]).toBe(0);
      expect(res.finalGrid[1][2]).toBe(0);
    });
  });

  describe('Part 4: 阈值感染 (≥ K 邻居) + 双缓冲同步更新', () => {
    test('需要 ≥ 2 个邻居才被感染', () => {
      // 只有单个邻居时无法感染
      const gridSingle = [
        [1, 0, 0],
        [0, 0, 0]
      ];
      const res1 = infectionSpreadPart4(gridSingle, 2);
      expect(res1.remainingHealthy).toBe(5);

      // 夹逼健康格 (0,1)，上下/左右同时有感染源
      const gridDual = [
        [1, 0, 1],
        [0, 0, 0]
      ];
      const res2 = infectionSpreadPart4(gridDual, 2);
      // (0,1) 拥有 2 个感染邻居，成功被感染
      expect(res2.finalGrid[0][1]).toBe(1);
    });
  });

  describe('Part 5: 隔离消杀决策优化', () => {
    test('通过阻断关键行切断大部分健康区', () => {
      const grid = [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      // 阻断第 1 行直接保护下面两行所有健康格
      const res = infectionSpreadPart5(grid, { maxActions: 1 });
      expect(res.actionsTaken.length).toBe(1);
      expect(res.minCasualties).toBeLessThan(12);
    });
  });
});
