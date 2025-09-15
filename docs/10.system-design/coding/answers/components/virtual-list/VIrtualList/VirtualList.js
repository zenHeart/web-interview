export default class VirtualList {
  init () {
    const scrollContainer = this.initScrollContainer()
    const fragments = this.initPages(0, 30)
    scrollContainer.appendChild(fragments)
    this.mockScroll()
    return scrollContainer
  }

  initScrollContainer () {
    const div = document.createElement('div')
    div.style.width = this.options.width || '100%'
    div.style.height = this.options.height || '100%'
    div.id = 'scroll-container'
    div.style.overflow = 'scroll'
    div.style.position = 'relative'
    div.addEventListener('scroll', this.switchPage.bind(this))
    this.scrollContainer = div

    return div
  }

  mockScroll () {
    const style = document.createElement('style')
    style.textContent = `
  #scroll-container::before {
    content: " ";
      display: block;
      width: 1px;
      position: absolute;
      height: ${this.options.items.length * this.options.itemHeight}px;
  }
`
    document.head.appendChild(style)
  }

  initPages (startIndex, pageSize) {
    const fragment = document.createDocumentFragment()
    const items = this.options.items || []

    for (let i = startIndex; i < startIndex + pageSize && i < items.length; i++) {
      const item = this.initItem(items[i])
      // 修正定位方式
      item.style.position = 'absolute'
      item.style.top = `${i * this.options.itemHeight}px`
      item.style.width = '100%'
      fragment.appendChild(item)
    }
    return fragment
  }

  switchPage (event) {
    const scrollTop = event.target.scrollTop
    // 计算当前可视区域的第一个元素索引，向下取整
    const startIndex = Math.floor(scrollTop / this.options.itemHeight)
    // 计算渲染区块，避免白屏
    if (this.scrollContainer) {
      this.scrollContainer.innerHTML = ''
      this.scrollContainer.appendChild(this.initPages(startIndex, 30))
    }
  }

  initItem (item) {
    return this.options.renderItem(item)
  }

  constructor (options) {
    this.options = options || {}
    if (!this.options.container) {
      throw new Error('container is required')
    }
    const scrollContainer = this.init()
    this.scrollContainer = scrollContainer
    this.options.container.appendChild(scrollContainer)
  }
}
