/**
 * 岛屿数量问题 - BFS解法
 * @param {string[][]} grid - 二维网格，'1'表示陆地，'0'表示水
 * @returns {number} 岛屿数量
 */
function numIslandsBFS(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // BFS遍历岛屿
  const bfs = (startRow, startCol) => {
    const queue = [[startRow, startCol]];
    grid[startRow][startCol] = '0'; // 标记为已访问

    while (queue.length > 0) {
      const [row, col] = queue.shift();

      // 四个方向：上、下、左、右
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        // 检查边界和是否为陆地
        if (newRow >= 0 && newRow < rows && 
            newCol >= 0 && newCol < cols && 
            grid[newRow][newCol] === '1') {
          queue.push([newRow, newCol]);
          grid[newRow][newCol] = '0'; // 标记为已访问
        }
      }
    }
  };

  // 遍历整个网格
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        count++;
        bfs(row, col);
      }
    }
  }

  return count;
}

/**
 * 岛屿数量问题 - DFS解法
 * @param {string[][]} grid - 二维网格
 * @returns {number} 岛屿数量
 */
function numIslandsDFS(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  const dfs = (row, col) => {
    // 边界检查和已访问检查
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
      return;
    }

    // 标记为已访问
    grid[row][col] = '0';

    // 递归访问四个方向
    dfs(row - 1, col); // 上
    dfs(row + 1, col); // 下
    dfs(row, col - 1); // 左
    dfs(row, col + 1); // 右
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        count++;
        dfs(row, col);
      }
    }
  }

  return count;
}

/**
 * 岛屿的最大面积
 * @param {number[][]} grid - 二维网格，1表示陆地，0表示水
 * @returns {number} 最大岛屿面积
 */
function maxAreaOfIsland(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let maxArea = 0;

  const dfs = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
      return 0;
    }

    grid[row][col] = 0; // 标记为已访问
    
    return 1 + dfs(row - 1, col) + dfs(row + 1, col) + 
           dfs(row, col - 1) + dfs(row, col + 1);
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        maxArea = Math.max(maxArea, dfs(row, col));
      }
    }
  }

  return maxArea;
}

/**
 * 岛屿的周长
 * @param {number[][]} grid - 二维网格
 * @returns {number} 岛屿周长
 */
function islandPerimeter(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let perimeter = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        // 检查四个方向，如果是边界或者是水，周长+1
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        
        for (const [dr, dc] of directions) {
          const newRow = row + dr;
          const newCol = col + dc;
          
          if (newRow < 0 || newRow >= rows || 
              newCol < 0 || newCol >= cols || 
              grid[newRow][newCol] === 0) {
            perimeter++;
          }
        }
      }
    }
  }

  return perimeter;
}

/**
 * 被围绕的区域（翻转被围绕的'O'为'X'）
 * @param {string[][]} board - 二维字符数组
 */
function solve(board) {
  if (!board || board.length === 0) return;

  const rows = board.length;
  const cols = board[0].length;

  // DFS标记边界连通的'O'
  const dfs = (row, col) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col] !== 'O') {
      return;
    }

    board[row][col] = 'T'; // 临时标记

    dfs(row - 1, col);
    dfs(row + 1, col);
    dfs(row, col - 1);
    dfs(row, col + 1);
  };

  // 标记边界上的'O'及其连通区域
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ((row === 0 || row === rows - 1 || col === 0 || col === cols - 1) && 
          board[row][col] === 'O') {
        dfs(row, col);
      }
    }
  }

  // 最终处理：'T'恢复为'O'，'O'变为'X'
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === 'T') {
        board[row][col] = 'O';
      } else if (board[row][col] === 'O') {
        board[row][col] = 'X';
      }
    }
  }
}

module.exports = {
  numIslandsBFS,
  numIslandsDFS,
  maxAreaOfIsland,
  islandPerimeter,
  solve
};
