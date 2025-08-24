/**
 * 二分查找
 * @param {number[]} nums - 有序数组
 * @param {number} target - 目标值
 * @returns {number} 目标值索引，不存在返回-1
 */
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

/**
 * 查找第一个大于等于target的位置（左边界）
 */
function searchLeftBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return left;
}

/**
 * 查找最后一个小于等于target的位置（右边界）
 */
function searchRightBound(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return right;
}

module.exports = { binarySearch, searchLeftBound, searchRightBound };
