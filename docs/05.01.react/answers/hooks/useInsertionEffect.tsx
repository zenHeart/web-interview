import React, { useState, useInsertionEffect } from 'react'

export default function UseInsertionEffectExample () {
  const [theme, setTheme] = useState('light')

  useInsertionEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .themed-box {
        background-color: ${theme === 'light' ? '#f0f0f0' : '#333'};
        color: ${theme === 'light' ? '#333' : '#fff'};
        padding: 20px;
        transition: all 0.3s;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [theme])

  return (
    <div>
      <h3>useInsertionEffect 示例</h3>
      <div className="themed-box">
        主题样式盒子
      </div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
      <p>当前主题: {theme}</p>
      <p>useInsertionEffect 主要用于CSS-in-JS库在DOM变更前注入样式</p>
    </div>
  )
}
