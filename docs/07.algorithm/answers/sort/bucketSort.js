function bucketSort(arr, bucketSize = 5) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return arr;
  }

  const minValue = Math.min(...arr);
  const maxValue = Math.max(...arr);

  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  arr.forEach(num => {
    const bucketIndex = Math.floor((num - minValue) / bucketSize);
    buckets[bucketIndex].push(num);
  });

  return buckets.reduce((sortedArray, bucket) => {
    return sortedArray.concat(bucket.sort((a, b) => a - b));
  }, []);
}

module.exports = bucketSort;
