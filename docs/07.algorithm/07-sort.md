# 排序

## 常见数组排序算法有哪些？ {#p0-sort}

如图所示：
![01_10](https://user-images.githubusercontent.com/22188674/222961047-79023840-bd63-4a2c-93fe-2d94f2a8ac04.png)

速排序

先从数列中取出一个数作为“基准”。

分区过程：将比这个“基准”大的数全放到“基准”的右边，小于或等于“基准”的数全放到“基准”的左边。
再对左右区间重复第二步，直到各区间只有一个数。

```js
const quickSort = function (arr) {
  if (arr.length <= 1) { return arr }
  const pivotIndex = Math.floor(arr.length / 2) // 基准位置（理论上可任意选取）
  const pivot = arr.splice(pivotIndex, 1)[0] // 基准数
  const left = []
  const right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right)) // 链接左数组、基准数构成的数组、右数组
}
```

择排序

首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
重复第二步，直到所有元素均排序完毕。

```js
function selectionSort (arr) {
  const len = arr.length
  let minIndex, temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) { // 寻找最小的数
        minIndex = j // 将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```

入排序

将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

```js
function insertionSort (arr) {
  const len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
```

泡法排序

比较相邻的元素。如果第一个比第二个大，就交换他们两个。
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
针对所有的元素重复以上的步骤，除了最后一个。
持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

```js
function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
        const temp = arr[j + 1] // 元素交换
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}
```

尔排序

1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。
它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。

先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：
选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
按增量序列个数k，对序列进行k 趟排序；
每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。
仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

```js
function shellSort (arr) {
  const len = arr.length
  let temp
  let gap = 1
  while (gap < len / 3) { // 动态定义间隔序列
    gap = gap3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j > 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
  }
  return arr
}
```

并排序

直接上代码了

```js
function mergeSort (arr) {
  const len = arr.length
  if (len < 2) { return arr }
  const mid = Math.floor(len / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  // send left and right to the mergeSort to broke it down into pieces
  // then merge those
  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  const result = []
  const lLen = left.length
  const rLen = right.length
  let l = 0
  let r = 0
  while (l < lLen && r < rLen) {
    if (left[l] < right[r]) {
      result.push(left[l++])
    } else {
      result.push(right[r++])
    }
  }
  // remaining part needs to be addred to the result
  return result.concat(left.slice(l)).concat(right.slice(r))
}
```

## 冒泡排序 (bubble sort)

**算法步骤**

1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
3. 针对所有的元素重复以上的步骤，除了最后一个。
4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

* [冒泡 wiki](https://zh.wikipedia.org/wiki/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F)

## 插入排序 (insert sort)

**算法步骤**

1. 从第一个元素开始,作为初始排序元素
2. 取下一个元素和第一个元素比较后,若数值更大向后插入
3. 后续元素和以排序数组元素比较,插入对应位置
4. 重复上述步骤返回结果

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

## 选择排序 (Selection sort)

**算法步骤**

1. 从未排序的元素中找出最小值,放入数组最前面
2. 遍历剩余未排序元素将最小的元素插入第二个位置
3. 重复上述步骤

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

## 归并排序 (merge sort)

**算法步骤**

归并算法分为两部分

1. 拆分
    1. 从元数组中间分割为两个子数组进行排序
    2. 重复步骤一
2. 合并
    1. 比较两个子数组 a[0],b[0],取小的值放入新数组 c[0],假设 a[0] 为包含较小值的数组
    2. 比较 a[1],b[0],取小的值放入新数组 c[1]
    3. 重复上述步骤知道遍历完一个子数组
    4. 将剩余元素放入 c 数组中
    5. 重复步骤 1-4 直到合并结束

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

## 快速排序 (quick sort)

**算法步骤**

1. 选取数组 a 中任一项为分区点,这里默认取第一项,a[0]
2. 遍历数组 a,小于数组 a[0],放入数组 b,大于等于则元素放入数组 c
3. 对数组 b,c 重复步骤 1,2
4. 返回数组 b,a,c 的合并结果

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

## 桶排序 (bucket sort)

**算法步骤**

1. 将数组 a 按照范围区间分割为一系列子数组 b,c,d
2. 对 b,c,d 采用快速排序
3. 按照顺序组合结果

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |

#### 计数排序 (counting sort)

**算法步骤**

思想类似桶排序,但区间粒度更细,单一元素作为一个区间,适用于
区间范围狭小且固定,但数据量巨大的场景

1. 按照区间范围,将每个单一元素拆分为一个数组容器
2. 遍历数组,存入对应元素的数组
3. 合并所有离散数组即可

**复杂度**

| 复杂度 | 值     |
| :----- | :----- |
| 最好   | O(n)   |
| 最坏   | O(n^2) |
| 平均   | O(n^2) |
