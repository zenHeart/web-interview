function countingSort(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr;
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const count = Array(max - min + 1).fill(0);

  arr.forEach(num => {
    count[num - min]++;
  });

  const sortedArr = [];
  count.forEach((num, index) => {
    while (num > 0) {
      sortedArr.push(index + min);
      num--;
    }
  });

  return sortedArr;
}

module.exports = countingSort;
