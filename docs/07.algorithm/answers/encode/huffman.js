/**
 * 霍夫曼树节点
 */
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;      // 字符
    this.freq = freq;      // 频率
    this.left = left;      // 左子节点
    this.right = right;    // 右子节点
  }

  // 判断是否为叶节点
  isLeaf() {
    return this.char !== null;
  }
}

/**
 * 霍夫曼编码器
 */
class HuffmanCoder {
  /**
   * 构建霍夫曼树
   * @param {string} text - 输入文本
   * @returns {HuffmanNode} 霍夫曼树根节点
   */
  buildHuffmanTree(text) {
    if (!text || text.length === 0) {
      return null;
    }

    // 统计字符频率
    const freqMap = new Map();
    for (const char of text) {
      freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // 创建叶节点
    const nodes = Array.from(freqMap.entries()).map(
      ([char, freq]) => new HuffmanNode(char, freq)
    );

    // 特殊情况：只有一个字符
    if (nodes.length === 1) {
      return new HuffmanNode(null, nodes[0].freq, nodes[0], null);
    }

    // 构建霍夫曼树
    while (nodes.length > 1) {
      // 按频率排序
      nodes.sort((a, b) => a.freq - b.freq);
      
      // 取出频率最小的两个节点
      const left = nodes.shift();
      const right = nodes.shift();
      
      // 创建新的内部节点
      const newNode = new HuffmanNode(
        null, 
        left.freq + right.freq, 
        left, 
        right
      );
      
      nodes.push(newNode);
    }

    return nodes[0];
  }

  /**
   * 构建霍夫曼编码表
   * @param {HuffmanNode} root - 霍夫曼树根节点
   * @returns {Map} 字符到编码的映射
   */
  buildCodes(root) {
    if (!root) return new Map();

    const codes = new Map();

    // 特殊情况：只有一个字符
    if (root.isLeaf()) {
      codes.set(root.char, '0');
      return codes;
    }

    const traverse = (node, code) => {
      if (node.isLeaf()) {
        codes.set(node.char, code);
      } else {
        if (node.left) traverse(node.left, code + '0');
        if (node.right) traverse(node.right, code + '1');
      }
    };

    traverse(root, '');
    return codes;
  }

  /**
   * 编码文本
   * @param {string} text - 输入文本
   * @returns {Object} 包含编码结果和霍夫曼树的对象
   */
  encode(text) {
    if (!text || text.length === 0) {
      return { encoded: '', tree: null, codes: new Map() };
    }

    // 构建霍夫曼树
    const tree = this.buildHuffmanTree(text);
    
    // 构建编码表
    const codes = this.buildCodes(tree);
    
    // 编码文本
    let encoded = '';
    for (const char of text) {
      encoded += codes.get(char);
    }

    return { encoded, tree, codes };
  }

  /**
   * 解码文本
   * @param {string} encoded - 编码后的二进制字符串
   * @param {HuffmanNode} tree - 霍夫曼树
   * @returns {string} 解码后的文本
   */
  decode(encoded, tree) {
    if (!encoded || !tree) {
      return '';
    }

    let result = '';
    let current = tree;
    
    for (const bit of encoded) {
      // 根据位移动到左或右子节点
      current = bit === '0' ? current.left : current.right;
      
      // 如果到达叶节点，输出字符并回到根节点
      if (current && current.isLeaf()) {
        result += current.char;
        current = tree;
      }
    }

    return result;
  }

  /**
   * 计算压缩比
   * @param {string} original - 原文本
   * @param {string} encoded - 编码后的二进制字符串
   * @returns {Object} 压缩信息
   */
  getCompressionInfo(original, encoded) {
    const originalBits = original.length * 8; // 假设ASCII编码
    const compressedBits = encoded.length;
    const compressionRatio = (1 - compressedBits / originalBits) * 100;

    return {
      originalSize: originalBits,
      compressedSize: compressedBits,
      compressionRatio: Math.round(compressionRatio * 100) / 100
    };
  }
}

module.exports = { HuffmanNode, HuffmanCoder };
