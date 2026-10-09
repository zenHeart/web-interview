/**
 * OpenAI 经典高频面试题: Infection Spread (网络与网格多源扩散 5 连问)
 * 状态定义:
 * 0: Healthy (健康)
 * 1: Infected (感染)
 * 2: Immune / Wall (免疫 / 墙)
 * 3: Dead (死亡，Part 4/5 扩展)
 */

/**
 * Part 1: 基础多源传播 (LeetCode 994 经典多源 BFS)
 * 每天每个感染格同时感染 4 邻域健康格，求全感染天数，无法全感染返回 -1
 * @param {number[][]} grid
 * @returns {number}
 */
function infectionSpreadPart1(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let healthyCount = 0;

  // 1. 拷贝网格以保证无副作用，同时统计健康格与初始感染源
  const state = grid.map(row => [...row]);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (state[r][c] === 1) {
        queue.push([r, c, 0]);
      } else if (state[r][c] === 0) {
        healthyCount++;
      }
    }
  }

  if (healthyCount === 0) return 0;

  let maxDays = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let head = 0;

  while (head < queue.length) {
    const [r, c, day] = queue[head++];
    maxDays = Math.max(maxDays, day);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && state[nr][nc] === 0) {
        state[nr][nc] = 1;
        healthyCount--;
        queue.push([nr, nc, day + 1]);
      }
    }
  }

  return healthyCount === 0 ? maxDays : -1;
}

/**
 * Part 2: 免疫墙隔离 (2 = immune)
 * 2 表示免疫障碍墙，既不被感染，也不向外传播。遇到墙直接跳过；若有健康格无法被感染返回 -1
 * @param {number[][]} grid
 * @returns {number}
 */
function infectionSpreadPart2(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let healthyCount = 0;

  const state = grid.map(row => [...row]);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (state[r][c] === 1) {
        queue.push([r, c, 0]);
      } else if (state[r][c] === 0) {
        healthyCount++;
      }
      // 2 为免疫墙，不做计数
    }
  }

  if (healthyCount === 0) return 0;

  let maxDays = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let head = 0;

  while (head < queue.length) {
    const [r, c, day] = queue[head++];
    maxDays = Math.max(maxDays, day);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      // 遇到墙 (2) 或越界或非健康格跳过
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && state[nr][nc] === 0) {
        state[nr][nc] = 1;
        healthyCount--;
        queue.push([nr, nc, day + 1]);
      }
    }
  }

  return healthyCount === 0 ? maxDays : -1;
}

/**
 * Part 3: 自愈生命周期 (感染 D 天后变 immune 不再传播)
 * 核心边界时序：第 t 天感染的格，current_day - t >= D 当天先变 immune 再传播
 * 返回传播终止达到稳态的总天数，以及最终未被感染的健康格数量
 * @param {number[][]} grid
 * @param {number} D - 自愈周期 (天数)
 * @returns {{ days: number, remainingHealthy: number, finalGrid: number[][] }}
 */
function infectionSpreadPart3(grid, D) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return { days: 0, remainingHealthy: 0, finalGrid: [] };
  }
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // 记录每个格子的当前状态与感染起始天数
  // -1 表示未感染
  const infectedAt = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const state = grid.map((row, r) =>
    row.map((val, c) => {
      if (val === 1) {
        infectedAt[r][c] = 0;
      }
      return val;
    })
  );

  let currentDay = 0;
  let hasActiveInfection = true;

  while (hasActiveInfection) {
    hasActiveInfection = false;

    // 1. 先进行自愈判定 (current_day - t >= D 变为 immune 2)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (state[r][c] === 1) {
          if (currentDay - infectedAt[r][c] >= D) {
            state[r][c] = 2; // 免疫不再传播
          } else {
            hasActiveInfection = true; // 仍然是活跃感染源
          }
        }
      }
    }

    if (!hasActiveInfection) {
      break;
    }

    // 2. 活跃感染格向 4 邻域扩散 (当天新感染的格子在当前天结束时生效)
    const newlyInfected = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (state[r][c] === 1) {
          for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && state[nr][nc] === 0) {
              newlyInfected.push([nr, nc]);
            }
          }
        }
      }
    }

    // 3. 结算新感染格
    if (newlyInfected.length > 0) {
      for (const [nr, nc] of newlyInfected) {
        if (state[nr][nc] === 0) {
          state[nr][nc] = 1;
          infectedAt[nr][nc] = currentDay + 1;
        }
      }
    }

    currentDay++;
  }

  let remainingHealthy = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (state[r][c] === 0) remainingHealthy++;
    }
  }

  return { days: currentDay, remainingHealthy, finalGrid: state };
}

/**
 * Part 4: 阈值感染 (≥ K 个感染邻居才被感染) + 死亡/自愈倒计时
 * 必须使用双缓冲同步更新 (Double Buffering / Snapshot)
 * @param {number[][]} grid
 * @param {number} K - 邻居阈值
 * @param {{ recoveryDays?: number, deathDays?: number }} options
 * @returns {{ days: number, remainingHealthy: number, deadCount: number, finalGrid: number[][] }}
 */
function infectionSpreadPart4(grid, K = 2, options = {}) {
  const { recoveryDays = Infinity, deathDays = Infinity } = options;
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  let currentGrid = grid.map(row => [...row]);
  const infectedDaysCount = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (currentGrid[r][c] === 1) {
        infectedDaysCount[r][c] = 1;
      }
    }
  }

  let day = 0;
  const maxIterations = 1000;

  while (day < maxIterations) {
    let changed = false;
    // 双缓冲快照：所有判定基于 currentGrid，变更写入 nextGrid
    const nextGrid = currentGrid.map(row => [...row]);
    const nextDaysCount = infectedDaysCount.map(row => [...row]);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = currentGrid[r][c];

        if (val === 1) {
          // 检查死亡或自愈
          const duration = infectedDaysCount[r][c];
          if (duration >= deathDays) {
            nextGrid[r][c] = 3; // 死亡
            changed = true;
          } else if (duration >= recoveryDays) {
            nextGrid[r][c] = 2; // 自愈免疫
            changed = true;
          } else {
            nextDaysCount[r][c] = duration + 1;
          }
        } else if (val === 0) {
          // 统计活跃感染邻居 (值为 1 的邻居)
          let infectedNeighbors = 0;
          for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && currentGrid[nr][nc] === 1) {
              infectedNeighbors++;
            }
          }

          if (infectedNeighbors >= K) {
            nextGrid[r][c] = 1;
            nextDaysCount[r][c] = 1;
            changed = true;
          }
        }
      }
    }

    currentGrid = nextGrid;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        infectedDaysCount[r][c] = nextDaysCount[r][c];
      }
    }

    if (!changed) break;
    day++;
  }

  let remainingHealthy = 0;
  let deadCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (currentGrid[r][c] === 0) remainingHealthy++;
      if (currentGrid[r][c] === 3) deadCount++;
    }
  }

  return { days: day, remainingHealthy, deadCount, finalGrid: currentGrid };
}

/**
 * Part 5: 隔离决策优化 (每天消杀/隔离一行或一列，最小化感染/死亡数)
 * 贪心策略：每一天评估如果阻断某一行或某一列能够切断的最大传播潜能
 * @param {number[][]} grid
 * @param {{ K?: number, deathDays?: number, maxActions?: number }} options
 * @returns {{ minCasualties: number, actionsTaken: Array<{ type: 'row'|'col', index: number }> }}
 */
function infectionSpreadPart5(grid, options = {}) {
  const rows = grid.length;
  const cols = grid[0].length;
  const maxActions = options.maxActions || Math.min(rows, cols);

  let currentGrid = grid.map(row => [...row]);
  const actionsTaken = [];

  for (let step = 0; step < maxActions; step++) {
    let bestAction = null;
    let minFutureCasualties = Infinity;

    // 候选动作 1: 隔离各行
    for (let r = 0; r < rows; r++) {
      // 若该行全为已阻断 (2)，跳过
      if (currentGrid[r].every(v => v === 2)) continue;
      const trialGrid = currentGrid.map(row => [...row]);
      trialGrid[r] = Array(cols).fill(2); // 变为免疫阻断隔离带
      const sim = infectionSpreadPart4(trialGrid, options.K || 1, options);
      const totalCasualties = (rows * cols) - sim.remainingHealthy;
      if (totalCasualties < minFutureCasualties) {
        minFutureCasualties = totalCasualties;
        bestAction = { type: 'row', index: r, grid: trialGrid };
      }
    }

    // 候选动作 2: 隔离各列
    for (let c = 0; c < cols; c++) {
      let allImmune = true;
      for (let r = 0; r < rows; r++) {
        if (currentGrid[r][c] !== 2) {
          allImmune = false;
          break;
        }
      }
      if (allImmune) continue;

      const trialGrid = currentGrid.map(row => [...row]);
      for (let r = 0; r < rows; r++) {
        trialGrid[r][c] = 2;
      }
      const sim = infectionSpreadPart4(trialGrid, options.K || 1, options);
      const totalCasualties = (rows * cols) - sim.remainingHealthy;
      if (totalCasualties < minFutureCasualties) {
        minFutureCasualties = totalCasualties;
        bestAction = { type: 'col', index: c, grid: trialGrid };
      }
    }

    if (bestAction && minFutureCasualties < (rows * cols)) {
      actionsTaken.push({ type: bestAction.type, index: bestAction.index });
      currentGrid = bestAction.grid;
    } else {
      break;
    }
  }

  const finalSim = infectionSpreadPart4(currentGrid, options.K || 1, options);
  const casualties = (rows * cols) - finalSim.remainingHealthy;

  return { minCasualties: casualties, actionsTaken };
}

module.exports = {
  infectionSpreadPart1,
  infectionSpreadPart2,
  infectionSpreadPart3,
  infectionSpreadPart4,
  infectionSpreadPart5
};
