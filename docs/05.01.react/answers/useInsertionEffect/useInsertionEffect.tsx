import { useState, useInsertionEffect } from 'react'

// 模拟 CSS 插入函数
function insertStyle (id: string, css: string) {
  let styleTag = document.getElementById(id)
  if (!styleTag) {
    styleTag = document.createElement('style')
    styleTag.id = id
    document.head.appendChild(styleTag)
  }
  // 确保每次都更新样式，让效果更明显
  styleTag.textContent = css
  console.log(`Style "${id}" inserted/updated.`)
}

// --- 使用 useInsertionEffect ---
function InsertionBox () {
  const boxId = 'insertion-box'
  useInsertionEffect(() => {
    insertStyle(boxId, `
      #${boxId} {
        background-color: lightgreen;
        width: 200px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        border: 2px solid green;
        color: black;
        font-weight: bold;
      }
    `)
  }, []) // 只在挂载时执行一次

  // 内部只放文本
  return <div id={boxId}>使用 useInsertionEffect</div>
}

// --- 应用组件 ---
export default function App () {
  return (
    <div>
      <h1>Hook 样式注入对比</h1>
      <InsertionBox />
    </div>
  )
}
