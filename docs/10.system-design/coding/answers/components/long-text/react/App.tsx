import React from 'react'
import LongText from './LongText'
import './LongText.css'

export default function App () {
  const text = '这是一段可能很长的文本，初始显示收起，点击展开查看更多内容。'.repeat(10)
  return <LongText text={text} />
}
