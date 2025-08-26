import React, { useState } from 'react'
import Cascader, { CascaderOption } from './Cascader'
import './Cascader.css'

const base: CascaderOption[] = [
  { value: 'zj', label: '浙江', children: [
    { value: 'hz', label: '杭州', children: [
      { value: 'xh', label: '西湖', isLeaf: true },
      { value: 'yl', label: '余杭', isLeaf: true }
    ]},
    { value: 'nb', label: '宁波', isLeaf: true }
  ]},
  { value: 'js', label: '江苏', isLeaf: false }
]

export default function App () {
  const [value, setValue] = useState<string[] | undefined>()

  async function loadData (path: CascaderOption[]) {
    const last = path[path.length - 1]
    // mock async
    await new Promise(r => setTimeout(r, 300))
    if (last.value === 'js') {
      return [
        { value: 'nj', label: '南京', isLeaf: true },
        { value: 'sz', label: '苏州', isLeaf: true }
      ]
    }
    return []
  }

  return (
    <div>
      <Cascader options={base} value={value} onChange={setValue} loadData={loadData} />
      <div style={{ marginTop: 8 }}>选中路径：{value?.join(' / ') || '未选择'}</div>
    </div>
  )
}
