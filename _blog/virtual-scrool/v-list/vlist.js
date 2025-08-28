/**
 * VirtualList: 通过只渲染当前视窗附近的一小段数据，实现长列表的性能优化。
 * 假设：所有行高度固定 (itemHeight)，可用 scrollTop / itemHeight O(1) 计算首行索引。
 * 实现要点：
 * 1. 外层容器 (container) 设 overflow:auto 提供滚动。
 * 2. 内部放一个透明的“scroller”占位块（仅 1px 宽，高度 = itemHeight * totalRows），制造正确滚动条。
 * 3. 实际渲染的行（绝对定位）叠加在容器里，根据需要批量创建。
 * 4. 采用缓冲：cachedItemsLen = 可视条数 * 3（中间一段 + 上下预留）。
 * 5. 滚动时若超过缓冲阈值(maxBuffer) 才重新生成一个 chunk，减少重排。
 * 6. 旧节点先隐藏并打标，滚动停止后异步清理，避免同步大量删除影响流畅度。
 */

'use strict'

/**
 * @param {object} config
 * @param {number} config.w 容器宽(数值, px)
 * @param {number} config.h 容器高(数值, px)
 * @param {number} config.itemHeight 行固定高度
 * @param {Array|undefined} config.items 静态数据数组（可选）
 * @param {Function|undefined} config.generatorFn (i)=>Node 生成函数（优先于 items）
 * @param {number} [config.totalRows] 总行数（不传则 items.length）
 * @constructor
 */
function VirtualList (config) {
  const width = (config && config.w + 'px') || '100%'
  const height = (config && config.h + 'px') || '100%'
  const itemHeight = this.itemHeight = config.itemHeight

  this.items = config.items
  this.generatorFn = config.generatorFn
  this.totalRows = config.totalRows || (config.items && config.items.length)

  // 创建一个透明占位元素，用于撑起真实滚动高度
  const scroller = VirtualList.createScroller(itemHeight * this.totalRows)
  // 可滚动容器
  this.container = VirtualList.createContainer(width, height)
  this.container.appendChild(scroller)

  // 计算一屏可容纳的条目数（向上取整避免空白）
  const screenItemsLen = Math.ceil(config.h / itemHeight)
  // 设定缓存窗口：可视条数 * 3（中间 + 上预留 + 下预留）
  this.cachedItemsLen = screenItemsLen * 3

  // 初次渲染：从 0 开始
  this._renderChunk(this.container, 0)

  const self = this
  let lastRepaintY // 上一次触发重绘时的 scrollTop（缓冲判断用）
  const maxBuffer = screenItemsLen * itemHeight // 超过此滚动距离才重绘
  let lastScrolled = 0 // 记录最近一次滚动时间

  /**
   * 定时清理标记过期的节点
   * 使用 setInterval + 时间差方式判定“滚动已停止”
   * 优点：简洁；缺点：存在 100~300ms 延迟，可换 requestAnimationFrame + idle 回调优化
   */
  this.rmNodeInterval = setInterval(function () {
    if (Date.now() - lastScrolled > 100) {
      const badNodes = document.querySelectorAll('[data-rm="1"]')
      for (let i = 0, l = badNodes.length; i < l; i++) {
        self.container.removeChild(badNodes[i])
      }
    }
  }, 300)

  /**
   * 滚动事件处理：仅在超过缓冲距离时重新渲染新的窗口
   */
  function onScroll (e) {
    const scrollTop = e.target.scrollTop // 读取 scrollTop 触发一次浏览器布局
    // 初次或超过缓冲距离才重绘
    if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
      // 预加载一屏之前的数据，减轻上滚抖动；最小为 0
      const first = parseInt(scrollTop / itemHeight) - screenItemsLen
      self._renderChunk(self.container, first < 0 ? 0 : first)
      lastRepaintY = scrollTop
    }

    lastScrolled = Date.now()
    e.preventDefault && e.preventDefault()
  }

  this.container.addEventListener('scroll', onScroll)
}

/**
 * 创建单行节点
 * @param {number} i 行索引
 * @return {HTMLElement}
 */
VirtualList.prototype.createRow = function (i) {
  let item
  if (this.generatorFn) {
    // 优先用自定义生成函数
    item = this.generatorFn(i)
  } else if (this.items) {
    if (typeof this.items[i] === 'string') {
      // 字符串 -> 包装为 div
      const itemText = document.createTextNode(this.items[i])
      item = document.createElement('div')
      item.style.height = this.itemHeight + 'px'
      item.appendChild(itemText)
    } else {
      // 已提供 DOM 节点
      item = this.items[i]
    }
  }

  item.classList.add('vrow')
  item.style.position = 'absolute'
  // 利用固定行高快速定位
  item.style.top = (i * this.itemHeight) + 'px'
  return item
}

/**
 * 渲染从 from 开始的一个连续窗口(chunk)。
 * 策略：
 * 1. 预先构建 DocumentFragment (减少多次回流)。
 * 2. 旧节点不立即删除，而是隐藏 + 打标；延迟清理保证滚动顺滑。
 *
 * @param {Node} node 容器
 * @param {Number} from 起始行索引
 */
VirtualList.prototype._renderChunk = function (node, from) {
  let finalItem = from + this.cachedItemsLen
  if (finalItem > this.totalRows) finalItem = this.totalRows

  const fragment = document.createDocumentFragment()
  for (let i = from; i < finalItem; i++) {
    fragment.appendChild(this.createRow(i))
  }

  // 从索引 1 开始跳过 0 (scroller)，隐藏旧渲染节点并标记
  for (let j = 1, l = node.childNodes.length; j < l; j++) {
    node.childNodes[j].style.display = 'none'
    node.childNodes[j].setAttribute('data-rm', '1')
  }

  node.appendChild(fragment)
}

/**
 * 创建滚动容器
 */
VirtualList.createContainer = function (w, h) {
  const c = document.createElement('div')
  c.style.width = w
  c.style.height = h
  c.style.overflow = 'auto'
  c.style.position = 'relative'
  c.style.padding = 0
  c.style.border = '1px solid black'
  return c
}
/**
 * 创建占位滚动条元素：仅用于撑开滚动高度，不展示内容
 */
VirtualList.createScroller = function (h) {
  const scroller = document.createElement('div')
  scroller.style.opacity = 0
  scroller.style.position = 'absolute'
  scroller.style.top = 0
  scroller.style.left = 0
  scroller.style.width = '1px'
  scroller.style.height = h + 'px'
  return scroller
}
