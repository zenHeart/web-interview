import React, { useState, useContext, createContext } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

function ThemedButton () {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const style = {
    background: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    padding: '8px 16px',
    border: '1px solid #ccc',
    cursor: 'pointer'
  }
  return (
    <div>
      <p>当前主题: {theme}</p>
      <button style={style} onClick={toggleTheme}>
        切换主题
      </button>
    </div>
  )
}

export default function UseContextExample () {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <h3>useContext 示例</h3>
        <ThemedButton />
      </div>
    </ThemeContext.Provider>
  )
}
