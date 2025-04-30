function getSequence (arr) {
  // 处理空
  if (!arr?.length) return []

  // 处理数组递增情况
  let i
  const len = arr.length
  const p = Array.from({ length: len }) // 创建一个数组 p 用来存储最长递增子序列的前驱元素
  // 之前做了空检验，此处默认返回第一个元素
  const result = [0]
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    const maxLastIndex = result[result.length - 1] // 获取当前最长递增子序列的最后一个元素的索引
    const lastElement = arr[maxLastIndex] // 获取当前最长递增子序列的最后一个元素
    if (arrI > lastElement) {
      p[i] = maxLastIndex // 先保存当前最大的前驱元素
      result.push(i) // 如果当前元素大于最长递增子序列的最后一个元素，说明可以扩展最长递增子序列
      continue
    }
    // 如果当前元素小于最长递增子序列的最后一个元素，说明当前递增子序列存在可能的新的增长方式
    // 先采用二分法定位这个当前元素因该替换递增子序列的位置
    let u = 0; let v = result.length - 1 // 二分法查找的上下边界
    while (u < v) {
      const m = (u + v) >> 1 // 找出已排序的递增子序列中间值的索引
      const curEl = arr[result[m]] // 获取当前中间值的元素
      if (arrI > curEl) { // 当前元素大于已排序的子序列中的元素则搜索范围变为 m + 1 到 v
        u = m + 1 // 更新下边界
      } else { // 如果当前元素小于等于已排序的元素搜索范围变为 u 到 m， 找出第一个大于 arrI 的元素索引
        v = m // 更新上边界
      }
    }
    // 判断是否找到了替换位置
    if (arr[result[u]] > arrI) {
      if (u > 0) {
      // 如果当前最长递增子序列中元素大于当前元素，说明用当前元素搜有更大的衔接可能性，替换对应位置的结果
        p[i] = result[u - 1] // 注意此处需要保留替换了的元素对应的前驱位置
      }
      result[u] = i // 替换当前元素
    }
  }

  // 全部遍历完后，目前已经包含了最长递归子序列，但是元素顺序需校正
  let k = result.length // 获取当前最长递增子序列的最后一个元素的索引
  let v = result[k - 1] // 去除最长递增子序列最后一个元素索引位置
  while (k-- > 0) {
    result[k] = v // 复制最后一个元素为索引位置
    v = p[v] // 获取前驱节点的索引位置
  }

  return result
}

module.exports = getSequence
