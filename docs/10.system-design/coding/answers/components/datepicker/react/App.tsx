import React, { useState } from 'react'
import DatePicker from './DatePicker'

export default function App () {
  const [value, setValue] = useState('')
  return (
    <div>
      <DatePicker value={value} onChange={setValue} min="2020-01-01" max="2030-12-31" />
      <div style={{ marginTop: 8 }}>当前日期：{value || '未选择'}</div>
    </div>
  )
}
