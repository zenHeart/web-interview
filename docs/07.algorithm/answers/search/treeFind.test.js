const { findNodeById, findAllNodes, findPath } = require('./treeFind.js');

// 构建测试树结构
const tree = [
  {
    id: 1,
    name: '根节点1',
    children: [
      {
        id: 11,
        name: '子节点1-1',
        children: [
          { id: 111, name: '叶节点1-1-1' },
          { id: 112, name: '叶节点1-1-2' }
        ]
      },
      {
        id: 12,
        name: '子节点1-2',
        children: [
          { id: 121, name: '叶节点1-2-1' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '根节点2',
    children: [
      {
        id: 21,
        name: '子节点2-1',
        children: []
      }
    ]
  }
];

console.log('=== 树结构查找测试 ===');
console.log('测试树结构:', JSON.stringify(tree, null, 2));

// 测试按ID查找
console.log('\n=== 按ID查找节点 ===');
console.log('查找ID为112的节点:', findNodeById(tree, 112));
console.log('查找ID为21的节点:', findNodeById(tree, 21));
console.log('查找不存在的ID:', findNodeById(tree, 999));

// 测试查找所有节点
console.log('\n=== 查找所有叶节点 ===');
const leafNodes = findAllNodes(tree, (node) => !node.children || node.children.length === 0);
console.log('叶节点:', leafNodes.map(node => ({ id: node.id, name: node.name })));

// 测试查找路径
console.log('\n=== 查找节点路径 ===');
const pathTo112 = findPath(tree, 112);
console.log('到ID为112节点的路径:', pathTo112?.map(node => ({ id: node.id, name: node.name })));

const pathTo21 = findPath(tree, 21);
console.log('到ID为21节点的路径:', pathTo21?.map(node => ({ id: node.id, name: node.name })));

// 空树测试
console.log('\n=== 边界情况测试 ===');
console.log('空树查找:', findNodeById([], 1));
console.log('null输入查找:', findNodeById(null, 1));
