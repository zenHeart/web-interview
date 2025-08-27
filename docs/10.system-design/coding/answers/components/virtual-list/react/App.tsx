import React from 'react'
import VirtualList from './VirtualList'
import './VirtualList.css'

const count = 1000

export default function App () {
  return (
    <VirtualList
      count={count}
      height={300}
      estimatedItemHeight={36}
      renderItem={(i) => (
        <div className="vl-item" key={i}>
          <b style={{ marginRight: 8 }}>#{i + 1}</b>
          <span>{'内容 '.repeat((i % 5) + 1)}</span>
        </div>
      )}
    />
  )
}
