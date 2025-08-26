import React, { useState } from 'react'
import Select, { Option } from './Select'
import './Select.css'

const options: Option[] = Array.from({ length: 50 }, (_, i) => ({ value: String(i+1), label: `选项 ${i+1}` }))

export default function App () {
  const [value, setValue] = useState<string | undefined>()
  return (
    <div>
      <Select options={options} value={value} onChange={setValue} />
      <div style={{ marginTop: 8 }}>当前值：{value || '未选择'}</div>
    </div>
  )
}
