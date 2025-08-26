import React from 'react'
import Popover from './Popover'
import './Popover.css'

export default function App () {
  return (
    <div style={{ padding: 24 }}>
      <Popover content={<div>这是一段 Popover 内容</div>}>
        打开 Popover
      </Popover>
    </div>
  )
}
