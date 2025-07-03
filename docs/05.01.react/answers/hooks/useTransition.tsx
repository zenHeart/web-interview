import React, { useState, useTransition } from 'react'

export default function UseTransitionExample () {
  const [isPending, startTransition] = useTransition()
  const [tab, setTab] = useState('home')
  const [searchText, setSearchText] = useState('')

  const handleTabChange = (newTab: string) => {
    startTransition(() => {
      setTab(newTab)
    })
  }

  const tabs = ['home', 'profile', 'settings', 'gallery']

  const renderContent = () => {
    if (tab === 'home') {
      const items = []
      for (let i = 0; i < 100; i++) {
        items.push(<div key={i}>首页内容项 {i}</div>)
      }
      return items
    }
    return <div>{tab} 内容</div>
  }

  return (
    <div>
      <h3>useTransition 示例</h3>
      <div style={{ marginBottom: '10px' }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            style={{
              margin: '0 5px',
              fontWeight: tab === t ? 'bold' : 'normal'
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <input
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value)
          startTransition(() => {
            // 复杂过滤逻辑
          })
        }}
        placeholder="搜索（立即响应）"
      />
      {isPending
        ? (
        <div>加载中...</div>
          )
        : (
        <div style={{ height: '200px', overflow: 'auto' }}>
          {renderContent()}
        </div>
          )}
      <p>useTransition 用于标记低优先级更新，保持UI的响应性</p>
    </div>
  )
}
