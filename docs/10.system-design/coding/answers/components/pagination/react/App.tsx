import React, { useState } from 'react'
import Pagination from './Pagination'
import './Pagination.css'

export default function App () {
  const [current, setCurrent] = useState(1)
  return (
    <div>
      <Pagination total={200} pageSize={10} current={current} onChange={setCurrent} />
      <div style={{ marginTop: 8 }}>当前页：{current}</div>
    </div>
  )
}
