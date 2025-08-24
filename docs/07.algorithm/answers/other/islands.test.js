const { 
  numIslandsBFS, 
  numIslandsDFS, 
  maxAreaOfIsland, 
  islandPerimeter, 
  solve 
} = require('./islands.js');

console.log('=== 岛屿问题测试 ===');

// 辅助函数：复制二维数组
function deepCopy(arr) {
  return arr.map(row => [...row]);
}

// 测试数据1
const grid1 = [
  ['1','1','1','1','0'],
  ['1','1','0','1','0'],
  ['1','1','0','0','0'],
  ['0','0','0','0','0']
];

console.log('\n--- 岛屿数量测试 ---');
console.log('网格1:');
grid1.forEach(row => console.log(row.join(' ')));

// 需要复制原数组，因为算法会修改原数组
console.log('BFS结果:', numIslandsBFS(deepCopy(grid1))); // 应该是1
console.log('DFS结果:', numIslandsDFS(deepCopy(grid1))); // 应该是1

// 测试数据2
const grid2 = [
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
];

console.log('\n网格2:');
grid2.forEach(row => console.log(row.join(' ')));
console.log('BFS结果:', numIslandsBFS(deepCopy(grid2))); // 应该是3
console.log('DFS结果:', numIslandsDFS(deepCopy(grid2))); // 应该是3

// 测试岛屿最大面积
console.log('\n--- 岛屿最大面积测试 ---');
const areaGrid1 = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
];

console.log('最大岛屿面积:', maxAreaOfIsland(deepCopy(areaGrid1))); // 应该是6

const areaGrid2 = [[0,0,0,0,0,0,0,0]];
console.log('全水网格最大面积:', maxAreaOfIsland(deepCopy(areaGrid2))); // 应该是0

// 测试岛屿周长
console.log('\n--- 岛屿周长测试 ---');
const perimeterGrid1 = [
  [0,1,0,0],
  [1,1,1,0],
  [0,1,0,0],
  [1,1,0,0]
];

console.log('周长网格1:');
perimeterGrid1.forEach(row => console.log(row.join(' ')));
console.log('岛屿周长:', islandPerimeter(deepCopy(perimeterGrid1))); // 应该是16

const perimeterGrid2 = [[1]];
console.log('单格岛屿周长:', islandPerimeter(deepCopy(perimeterGrid2))); // 应该是4

const perimeterGrid3 = [[1,1],[1,1]];
console.log('2x2岛屿周长:', islandPerimeter(deepCopy(perimeterGrid3))); // 应该是8

// 测试被围绕的区域
console.log('\n--- 被围绕的区域测试 ---');
const solveGrid1 = [
  ['X','X','X','X'],
  ['X','O','O','X'],
  ['X','X','O','X'],
  ['X','O','X','X']
];

console.log('原始网格:');
solveGrid1.forEach(row => console.log(row.join(' ')));

solve(solveGrid1);

console.log('处理后网格:');
solveGrid1.forEach(row => console.log(row.join(' ')));

// 另一个测试用例
const solveGrid2 = [
  ['X','O','X'],
  ['O','X','O'],
  ['X','O','X']
];

console.log('\n原始网格2:');
solveGrid2.forEach(row => console.log(row.join(' ')));

solve(solveGrid2);

console.log('处理后网格2:');
solveGrid2.forEach(row => console.log(row.join(' ')));

// 边界情况测试
console.log('\n--- 边界情况测试 ---');
console.log('空网格岛屿数量:', numIslandsBFS([]));
console.log('空网格最大面积:', maxAreaOfIsland([]));
console.log('空网格周长:', islandPerimeter([]));
