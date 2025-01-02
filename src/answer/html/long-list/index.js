function createElements (count) {
  const start = new Date()
  const arr = []

  for (let i = 0; i < count; i++) {
    arr.push(`<div>${i}</div>`)
  }
  const ele = document.createElement('div')
  ele.innerHTML = arr.join('')
  document.body.appendChild(ele)

  /**
   * 异步统计渲染时间,是因为渲染是在主线程完成的
   * 高精度采用 performance.now
   */
  setTimeout(() => {
    console.log(new Date() - start)
  }, 0)
}

createElements(10000)
