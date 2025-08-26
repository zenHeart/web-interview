import React from 'react'
import VirtualList from './VirtualList'
import './VirtualList.css'

const count = 1000

export default function App () {
  return (
    <VirtualList
      count={count}
      itemHeight={30}
      height={300}
      renderItem={(i) => (
        <div className="vl-item" key={i}>行 {i + 1}</div>
      )}
    />
  )
}
