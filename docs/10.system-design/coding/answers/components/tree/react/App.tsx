import React from 'react'
import Tree, { TreeNode } from './Tree'
import './Tree.css'

const data: TreeNode[] = [
  { key: 'zj', title: '浙江', children: [
    { key: 'hz', title: '杭州', children: [ { key: 'xh', title: '西湖' }, { key: 'yl', title: '余杭' } ] },
    { key: 'nb', title: '宁波' }
  ]},
  { key: 'js', title: '江苏', children: [ { key: 'nj', title: '南京' }, { key: 'sz', title: '苏州' } ] }
]

export default function App () {
  return (
    <div>
      <Tree data={data} defaultExpandedKeys={[ 'zj', 'hz' ]} onSelect={(k)=>console.log('select:', k)} />
    </div>
  )
}
