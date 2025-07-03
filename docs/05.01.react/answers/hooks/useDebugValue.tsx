import React, { useState, useDebugValue } from 'react'

function useCustomHook (initialValue: number) {
  const [value, setValue] = useState(initialValue)
  useDebugValue(value > 5 ? '大于5' : '小于等于5')
  const increment = () => setValue(value + 1)
  const decrement = () => setValue(value - 1)
  return { value, increment, decrement }
}

export default function UseDebugValueExample () {
  const { value, increment, decrement } = useCustomHook(0)

  return (
    <div>
      <h3>useDebugValue 示例</h3>
      <p>当前值: {value}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
      <p>useDebugValue 用于在React开发者工具中显示自定义Hook的标签</p>
      <p>打开React DevTools可以看到额外的debug信息</p>
    </div>
  )
}
