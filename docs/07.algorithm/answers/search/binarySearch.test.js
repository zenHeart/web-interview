const { binarySearch, searchLeftBound, searchRightBound } = require('./binarySearch.js');

// 测试二分查找
console.log('=== 二分查找测试 ===');
const nums = [1, 3, 5, 6, 8, 10, 15];
console.log('数组:', nums);
console.log('查找5:', binarySearch(nums, 5)); // 预期: 2
console.log('查找7:', binarySearch(nums, 7)); // 预期: -1
console.log('查找1:', binarySearch(nums, 1)); // 预期: 0

// 测试边界查找
console.log('\n=== 边界查找测试 ===');
const numsWithDuplicates = [1, 2, 2, 2, 3, 4, 4, 5];
console.log('数组:', numsWithDuplicates);
console.log('查找2的左边界:', searchLeftBound(numsWithDuplicates, 2)); // 预期: 1
console.log('查找2的右边界:', searchRightBound(numsWithDuplicates, 2)); // 预期: 3
console.log('查找4的左边界:', searchLeftBound(numsWithDuplicates, 4)); // 预期: 5
console.log('查找4的右边界:', searchRightBound(numsWithDuplicates, 4)); // 预期: 6

// 边界情况测试
console.log('\n=== 边界情况测试 ===');
const emptyArray = [];
console.log('空数组查找5:', binarySearch(emptyArray, 5)); // 预期: -1

const singleElement = [5];
console.log('单元素数组查找5:', binarySearch(singleElement, 5)); // 预期: 0
console.log('单元素数组查找3:', binarySearch(singleElement, 3)); // 预期: -1
