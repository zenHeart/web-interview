import React, { useState, useDeferredValue, useMemo } from 'react'

export default function UseDeferredValueExample () {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  const list = useMemo(() => {
    const items = []
    for (let i = 0; i < 50; i++) {
      items.push(<div key={i}>{deferredText}</div>)
    }
    return items
  }, [deferredText])

  return (
    <div>
      <h3>useDeferredValue 示例</h3>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="输入文本"
      />
      <p>当前文本: {text}</p>
      <p>延迟文本: {deferredText}</p>
      <div style={{ height: '100px', overflow: 'auto' }}>
        {list}
      </div>
      <p>useDeferredValue 允许推迟更新低优先级的内容，保持界面响应</p>
    </div>
  )
}
