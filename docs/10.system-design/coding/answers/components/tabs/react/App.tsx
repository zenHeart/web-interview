import React from 'react'
import Tabs from './Tabs'
import './Tabs.css'

export default function App () {
  const items = [
    { key: 'a', label: '选项A', content: <div>A 内容</div> },
    { key: 'b', label: '选项B', content: <div>B 内容</div> },
    { key: 'c', label: '选项C', content: <div>C 内容</div> }
  ]
  return <Tabs items={items} />
}
