import React, { useState } from 'react'

export default function UseStateExample () {
  // useState: 管理组件状态
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div>
      <h3>useState 示例</h3>
      {/* 计数器示例 */}
      <div>
        <p>计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
      </div>
      {/* 表单输入示例 */}
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="请输入文字"
        />
        <p>你输入了: {text}</p>
      </div>
    </div>
  )
}
