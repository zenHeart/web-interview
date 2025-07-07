import { memo } from 'react'

const SlowList = memo(function SlowList ({ text }) {
  const items = []
  for (let i = 0; i < 5; i++) {
    items.push(<SlowItem key={i} text={text} />)
  }
  return (
    <ul className="items">
      {items}
    </ul>
  )
})

function SlowItem ({ text }) {
  const startTime = performance.now()
  // 模拟渲染延迟
  while (performance.now() - startTime < 100);

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default SlowList
