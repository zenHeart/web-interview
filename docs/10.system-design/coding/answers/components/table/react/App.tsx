import React from 'react'
import Table from './Table'
import './Table.css'

const columns = [
  { key: 'name', title: '姓名', width: 140 },
  { key: 'age', title: '年龄', width: 80 },
  { key: 'city', title: '城市', width: 160 },
  { key: 'job', title: '职业', width: 200 },
]

const data = Array.from({ length: 30 }, (_, i) => ({ name: `用户 ${i+1}`, age: 20 + (i%10), city: '杭州', job: '前端工程师' }))

export default function App () {
  return <Table columns={columns} data={data} />
}
