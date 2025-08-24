/**
 * 最小堆实现（用于Top K最大值问题）
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 获取父节点索引
  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // 获取左子节点索引
  leftChild(index) {
    return 2 * index + 1;
  }

  // 获取右子节点索引
  rightChild(index) {
    return 2 * index + 2;
  }

  // 交换两个元素
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 向上调整堆
  heapifyUp(index) {
    if (index === 0) return;
    
    const parentIndex = this.parent(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  // 向下调整堆
  heapifyDown(index) {
    let minIndex = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    if (left < this.heap.length && this.heap[left] < this.heap[minIndex]) {
      minIndex = left;
    }

    if (right < this.heap.length && this.heap[right] < this.heap[minIndex]) {
      minIndex = right;
    }

    if (minIndex !== index) {
      this.swap(index, minIndex);
      this.heapifyDown(minIndex);
    }
  }

  // 插入元素
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  // 删除并返回最小元素
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  // 获取最小元素
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // 获取堆大小
  size() {
    return this.heap.length;
  }

  // 判断堆是否为空
  isEmpty() {
    return this.heap.length === 0;
  }
}

/**
 * 使用小顶堆找出数组中最大的K个数
 * 时间复杂度: O(n log k)
 * 空间复杂度: O(k)
 * @param {number[]} nums - 输入数组
 * @param {number} k - 需要找出的最大值个数
 * @returns {number[]} 最大的K个数
 */
function topKLargest(nums, k) {
  if (k <= 0 || nums.length === 0) return [];
  
  const heap = new MinHeap();
  
  for (const num of nums) {
    if (heap.size() < k) {
      heap.insert(num);
    } else if (num > heap.peek()) {
      heap.extractMin();
      heap.insert(num);
    }
  }
  
  const result = [];
  while (!heap.isEmpty()) {
    result.unshift(heap.extractMin()); // unshift保持降序
  }
  
  return result;
}

/**
 * 快速选择算法找第K大的数
 * 平均时间复杂度: O(n)
 * 最坏时间复杂度: O(n²)
 * @param {number[]} nums - 输入数组
 * @param {number} k - 第k大的数（1-indexed）
 * @returns {number} 第k大的数
 */
function quickSelect(nums, k) {
  if (k < 1 || k > nums.length) return null;
  
  // 转换为0-indexed，找第k-1大的数在排序后数组中的位置
  return quickSelectHelper(nums.slice(), 0, nums.length - 1, nums.length - k);
}

function quickSelectHelper(nums, left, right, k) {
  if (left === right) return nums[left];
  
  // 选择随机pivot避免最坏情况
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];
  
  const pivot = partition(nums, left, right);
  
  if (k === pivot) {
    return nums[k];
  } else if (k < pivot) {
    return quickSelectHelper(nums, left, pivot - 1, k);
  } else {
    return quickSelectHelper(nums, pivot + 1, right, k);
  }
}

function partition(nums, left, right) {
  const pivot = nums[right];
  let i = left;
  
  for (let j = left; j < right; j++) {
    if (nums[j] <= pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }
  
  [nums[i], nums[right]] = [nums[right], nums[i]];
  return i;
}

/**
 * 海量数据TopK问题的分治解决方案模拟
 * 将大数据分块处理，每块找TopK，然后合并
 * @param {number[]} nums - 模拟的大数据数组
 * @param {number} k - 需要找的TopK
 * @param {number} chunkSize - 每块的大小
 * @returns {number[]} TopK结果
 */
function massiveDataTopK(nums, k, chunkSize = 1000) {
  const chunks = [];
  
  // 分块
  for (let i = 0; i < nums.length; i += chunkSize) {
    chunks.push(nums.slice(i, i + chunkSize));
  }
  
  // 每块找TopK
  const allTopK = [];
  for (const chunk of chunks) {
    const chunkTopK = topKLargest(chunk, Math.min(k, chunk.length));
    allTopK.push(...chunkTopK);
  }
  
  // 合并所有块的TopK，再找最终TopK
  return topKLargest(allTopK, k);
}

module.exports = { 
  MinHeap, 
  topKLargest, 
  quickSelect, 
  massiveDataTopK 
};
