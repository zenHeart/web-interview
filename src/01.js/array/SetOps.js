/**
 * 参考 [gist sets]{@link https://gist.github.com/jabney/d9d5c13ad7f871ddf03f}
 * 实现集合相关操作.
 * 算法核心,为数组元素创建唯一索引
 * 统计数组各元素的出现次数
 */

/**
 * 标注元素类型
 * @type {{BELONG_A: number, BELONG_B: number, BELONG_AB: number}}
 */
const ELE = {
  BELONG_A: 1,
  BELONG_B: 2,
  BELONG_AB: 3
}

module.exports = class SetOps {
  /**
     * a,b 的并集
     * @param {Array} a 数组 a
     * @param {Array} b 数组 b
     */
  union (a, b) {
    // 返回并集
    return this._process(a, b, () => true)
  }

  /**
     * a,b 的交集
     * @param {Array} a 数组 a
     * @param {Array} b 数组 b
     */
  intersection (a, b) {
    return this._process(a, b, (type) => type === ELE.BELONG_AB)
  }

  /**
     * a 相对 b 的补集
     * @param {Array} a 数组 a
     * @param {Array} b 数组 b
     */
  complements (a, b) {
    return this._process(a, b, (type) => type === ELE.BELONG_A)
  }

  /**
     * a,b 的对称差集,参见 [对称差]{@link https://en.wikipedia.org/wiki/Symmetric_difference}
     * @param {Array} a 数组 a
     * @param {Array} b 数组 b
     */
  symmetricDifference (a, b) {
    return this._process(a, b, (type) => type !== ELE.BELONG_AB)
  }

  /**
     * 统计数组元素,注意此处数组元素均为基础类型,对于混合类型暂不考虑.
     * @param {Array} a 数组元素 a
     * @param {Array} b 数组元素 b
     * @param filter 过滤函数
     * @private
     */
  _process (a, b, filter) {
    const hist = Object.create(null); const out = []; let ukey; let k
    // 提取 a 中不重复的元素集,保存到 hist
    a.forEach((value) => {
      ukey = value
      // 只记录不重复的元素
      if (!hist[ukey]) {
        hist[ukey] = {
          value,
          type: ELE.BELONG_A
        }
      }
    })

    // 提取 b 中的元素集,保存到 hist,并且对重复出现的元素进行标注
    b.forEach((value) => {
      ukey = value
      if (hist[ukey]) { // 元素在 b 中也存在
        if (hist[ukey].type === ELE.BELONG_A) {
          hist[ukey].type = ELE.BELONG_AB
        }
      } else { // 元素在 b 中首次出现
        hist[ukey] = {
          value,
          type: ELE.BELONG_B
        }
      }
    })

    // 利用过滤函数,筛选需要的元素类型
    if (filter) {
      for (k in hist) {
        if (filter(hist[k].type)) {
          out.push(hist[k].value)
        }
      }
      return out
    } else {
      return hist
    }
  }
}
