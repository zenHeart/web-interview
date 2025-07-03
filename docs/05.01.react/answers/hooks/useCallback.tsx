import React, { useState, useCallback } from 'react'

function CallbackChild ({ onReset }: { onReset: () => void }) {
  console.log('CallbackChild 渲染')
  return (
    <button onClick={onReset}>
      从子组件重置
    </button>
  )
}

export default function UseCallbackExample () {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const incrementWithoutCallback = () => {
    setCount(count + 1)
  }

  const incrementWithCallback = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const resetCounter = useCallback(() => {
    setCount(0)
  }, [])

  return (
    <div>
      <h3>useCallback 示例</h3>
      <p>计数: {count}</p>
      <button onClick={incrementWithCallback}>增加 (带 useCallback)</button>
      <button onClick={incrementWithoutCallback}>增加 (无 useCallback)</button>
      <button onClick={resetCounter}>重置</button>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入不会触发回调函数重建"
        />
      </div>
      <CallbackChild onReset={resetCounter} />
    </div>
  )
}
