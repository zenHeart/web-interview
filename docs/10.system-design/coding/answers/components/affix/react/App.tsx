import React from 'react'
import Affix from './Affix'
import './Affix.css'

export default function App () {
  return (
    <div style={{ height: 600, paddingTop: 200 }}>
      <Affix offsetTop={0}>
        <button className="affix-btn">吸顶按钮</button>
      </Affix>
      <div style={{ height: 1000 }} />
    </div>
  )
}
