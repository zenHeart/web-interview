/**
 * 在树结构中按ID查找节点
 * @param {Array} tree - 树形数组
 * @param {string|number} id - 要查找的ID
 * @returns {Object|null} 找到的节点或null
 */
function findNodeById(tree, id) {
  if (!tree || tree.length === 0) return null;

  const search = (node) => {
    if (node.id === id) {
      return node;
    }
    
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = search(child);
        if (result) {
          return result;
        }
      }
    }
    
    return null;
  };

  for (const root of tree) {
    const result = search(root);
    if (result) {
      return result;
    }
  }

  return null;
}

/**
 * 在树结构中查找满足条件的所有节点
 * @param {Array} tree - 树形数组
 * @param {Function} predicate - 判断函数
 * @returns {Array} 符合条件的节点数组
 */
function findAllNodes(tree, predicate) {
  if (!tree || tree.length === 0) return [];
  
  const results = [];
  
  const search = (node) => {
    if (predicate(node)) {
      results.push(node);
    }
    
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        search(child);
      }
    }
  };

  for (const root of tree) {
    search(root);
  }

  return results;
}

/**
 * 在树结构中查找节点的路径
 * @param {Array} tree - 树形数组
 * @param {string|number} id - 要查找的ID
 * @returns {Array|null} 从根到目标节点的路径数组
 */
function findPath(tree, id) {
  if (!tree || tree.length === 0) return null;

  const search = (node, path) => {
    const currentPath = [...path, node];
    
    if (node.id === id) {
      return currentPath;
    }
    
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = search(child, currentPath);
        if (result) {
          return result;
        }
      }
    }
    
    return null;
  };

  for (const root of tree) {
    const result = search(root, []);
    if (result) {
      return result;
    }
  }

  return null;
}

module.exports = { findNodeById, findAllNodes, findPath };
