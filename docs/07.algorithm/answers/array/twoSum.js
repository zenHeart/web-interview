exports.twoSum = function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [complement, arr[i]];
    }
    map.set(arr[i], i);
  }
  return [];
}
