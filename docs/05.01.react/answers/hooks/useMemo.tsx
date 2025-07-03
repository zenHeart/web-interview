import React, { useState, useMemo } from 'react'

export default function UseMemoExample () {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const expensiveCalculationWithoutMemo = () => {
    console.log('执行昂贵计算 - 无缓存')
    let result = 0
    for (let i = 0; i < 1e4; i++) {
      result += i
    }
    return result
  }

  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵计算 - 有缓存')
    let result = 0
    for (let i = 0; i < 1e4; i++) {
      result += i
    }
    return result + count
  }, [count])

  return (
    <div>
      <h3>useMemo 示例</h3>
      <p>计数: {count}</p>
      <p>带缓存的计算结果: {expensiveCalculation}</p>
      <p>无缓存的计算结果: {expensiveCalculationWithoutMemo()}</p>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文本不会触发昂贵计算"
        />
        <p>输入文本: {text}</p>
      </div>
    </div>
  )
}
