import React, { useState, useEffect } from 'react'

export default function UseEffectExample () {
  const [data, setData] = useState<string | null>(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('组件重新渲染')
  })

  useEffect(() => {
    console.log('组件挂载')
    setTimeout(() => {
      setData('从API获取的数据')
    }, 2000)
    return () => {
      console.log('组件卸载')
    }
  }, [])

  useEffect(() => {
    console.log('counter 改变了:', counter)
  }, [counter])

  return (
    <div>
      <h3>useEffect 示例</h3>
      <p>数据: {data || '加载中...'}</p>
      <button onClick={() => setCounter(counter + 1)}>
        计数: {counter}
      </button>
    </div>
  )
}
