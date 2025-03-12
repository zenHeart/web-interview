exports.mergeArrays = function mergeArrays(arr1, arr2) {
  let i = arr1.length - arr2.length - 1;
  let j = arr2.length - 1;
  let k = arr1.length - 1;

  while (j >= 0) {
    if (i >= 0 && arr1[i] > arr2[j]) {
      arr1[k--] = arr1[i--];
    } else {
      arr1[k--] = arr2[j--];
    }
  }
  return arr1;
}
