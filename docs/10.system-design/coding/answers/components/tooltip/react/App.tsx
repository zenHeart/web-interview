import React from 'react'
import Tooltip from './Tooltip'
import './Tooltip.css'

export default function App () {
  return (
    <div style={{ padding: 24 }}>
      <Tooltip title={<>提示内容</>}>
        <span style={{ borderBottom: '1px dashed #999', cursor: 'help' }}>悬停查看</span>
      </Tooltip>
    </div>
  )
}
