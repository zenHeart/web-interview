/**
 * 一致性哈希实现
 * 解决分布式缓存的扩展性问题
 */

/**
 * 简单哈希函数（用于演示，实际应用中应使用更好的哈希算法如MD5、SHA1）
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
}

/**
 * 一致性哈希环
 */
class ConsistentHash {
  constructor(nodes = [], virtualNodes = 150) {
    this.virtualNodes = virtualNodes; // 每个物理节点的虚拟节点数
    this.ring = new Map(); // 哈希环，key: hash值, value: 节点名
    this.sortedHashes = []; // 排序的哈希值数组
    
    // 添加初始节点
    nodes.forEach(node => this.addNode(node));
  }

  /**
   * 添加节点
   */
  addNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeName = `${node}:${i}`;
      const hash = simpleHash(virtualNodeName);
      this.ring.set(hash, node);
    }
    this._updateSortedHashes();
    console.log(`添加节点: ${node}，虚拟节点数: ${this.virtualNodes}`);
  }

  /**
   * 移除节点
   */
  removeNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeName = `${node}:${i}`;
      const hash = simpleHash(virtualNodeName);
      this.ring.delete(hash);
    }
    this._updateSortedHashes();
    console.log(`移除节点: ${node}`);
  }

  /**
   * 获取数据应该存储在哪个节点
   */
  getNode(key) {
    if (this.ring.size === 0) {
      return null;
    }

    const hash = simpleHash(key);
    
    // 找到第一个大于等于该哈希值的节点
    let nodeIndex = this._findNodeIndex(hash);
    
    // 如果没找到，说明应该放在第一个节点（环形结构）
    if (nodeIndex === -1) {
      nodeIndex = 0;
    }

    const nodeHash = this.sortedHashes[nodeIndex];
    return this.ring.get(nodeHash);
  }

  /**
   * 更新排序的哈希值数组
   */
  _updateSortedHashes() {
    this.sortedHashes = Array.from(this.ring.keys()).sort((a, b) => a - b);
  }

  /**
   * 二分查找第一个大于等于目标值的位置
   */
  _findNodeIndex(targetHash) {
    let left = 0;
    let right = this.sortedHashes.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedHashes[mid] >= targetHash) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  }

  /**
   * 获取数据分布统计
   */
  getDistribution(keys) {
    const distribution = {};
    
    keys.forEach(key => {
      const node = this.getNode(key);
      if (node) {
        distribution[node] = (distribution[node] || 0) + 1;
      }
    });

    return distribution;
  }

  /**
   * 获取环的状态信息
   */
  getRingInfo() {
    return {
      totalVirtualNodes: this.ring.size,
      physicalNodes: [...new Set(this.ring.values())],
      virtualNodesPerPhysical: this.virtualNodes
    };
  }

  /**
   * 模拟节点故障后的数据迁移
   */
  simulateFailure(failedNode, keys) {
    console.log(`\n=== 模拟节点 ${failedNode} 故障 ===`);
    
    // 故障前的分布
    const beforeDistribution = this.getDistribution(keys);
    console.log('故障前分布:', beforeDistribution);

    // 找出故障节点上的数据
    const affectedKeys = keys.filter(key => this.getNode(key) === failedNode);
    console.log(`故障节点上的数据数量: ${affectedKeys.length}`);

    // 移除故障节点
    this.removeNode(failedNode);

    // 故障后的分布
    const afterDistribution = this.getDistribution(keys);
    console.log('故障后分布:', afterDistribution);

    // 分析数据迁移
    const migrationInfo = this._analyzeMigration(affectedKeys);
    console.log('数据迁移情况:', migrationInfo);

    return {
      affectedKeys: affectedKeys.length,
      beforeDistribution,
      afterDistribution,
      migrationInfo
    };
  }

  /**
   * 分析数据迁移情况
   */
  _analyzeMigration(affectedKeys) {
    const migration = {};
    
    affectedKeys.forEach(key => {
      const newNode = this.getNode(key);
      if (newNode) {
        migration[newNode] = (migration[newNode] || 0) + 1;
      }
    });

    return migration;
  }
}

/**
 * 传统哈希方法对比（取模哈希）
 */
class SimpleModHash {
  constructor(nodeCount) {
    this.nodeCount = nodeCount;
    this.nodes = Array.from({ length: nodeCount }, (_, i) => `node-${i}`);
  }

  getNode(key) {
    const hash = simpleHash(key);
    const index = hash % this.nodeCount;
    return this.nodes[index];
  }

  removeNode() {
    this.nodeCount--;
    this.nodes.pop();
  }

  addNode(node) {
    this.nodeCount++;
    this.nodes.push(node);
  }

  getDistribution(keys) {
    const distribution = {};
    
    keys.forEach(key => {
      const node = this.getNode(key);
      distribution[node] = (distribution[node] || 0) + 1;
    });

    return distribution;
  }
}

module.exports = {
  ConsistentHash,
  SimpleModHash,
  simpleHash
};
