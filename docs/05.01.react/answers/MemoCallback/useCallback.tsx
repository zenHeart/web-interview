import React, { useState, useCallback, useEffect } from 'react'

// 使用 React.memo 包裹子组件，观察 props 是否变化
const MemoizedButton = React.memo(function MemoizedButton ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  useEffect(() => {
    console.log(`MemoizedButton rendered with children: ${children}`)
  })

  return <button onClick={onClick}>{children}</button>
})

export default function App () {
  const [count, setCount] = useState(0)

  // ✅ useCallback：函数引用不会变，除非依赖变化
  const handleClickMemo = useCallback(() => {
    console.log('Clicked Memoized Button')
  }, [])

  // ❌ 每次渲染都创建新函数引用
  const handleClickNormal = () => {
    console.log('Clicked Normal Button')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <button onClick={() => setCount(count + 1)}>Update Count {count}</button>
      <MemoizedButton onClick={handleClickMemo}>MemoizedButton with useCallback</MemoizedButton>
      <MemoizedButton onClick={handleClickNormal}>MemoizedButton no useCallback</MemoizedButton>
    </div>
  )
}
