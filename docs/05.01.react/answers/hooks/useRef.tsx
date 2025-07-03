import React, { useRef, useState, useEffect } from 'react'

export default function UseRefExample () {
  const inputRef = useRef<HTMLInputElement>(null)
  const countRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [count, setCount] = useState(0)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const incrementRefCount = () => {
    countRef.current += 1
    console.log('Ref计数:', countRef.current)
  }

  const incrementStateCount = () => {
    setCount(prevCount => prevCount + 1)
  }

  const startTimer = () => {
    if (timerRef.current !== null) return
    timerRef.current = setInterval(() => {
      console.log('定时器运行中...')
      setCount(prev => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div>
      <h3>useRef 示例</h3>
      <div>
        <input ref={inputRef} placeholder="点击按钮聚焦" />
        <button onClick={focusInput}>聚焦输入框</button>
      </div>
      <div>
        <p>状态计数（触发重新渲染）: {count}</p>
        <p>Ref计数（不触发重新渲染）: {countRef.current}</p>
        <button onClick={incrementStateCount}>增加状态计数</button>
        <button onClick={incrementRefCount}>增加Ref计数</button>
      </div>
      <div>
        <button onClick={startTimer}>开始计时器</button>
        <button onClick={stopTimer}>停止计时器</button>
      </div>
    </div>
  )
}
