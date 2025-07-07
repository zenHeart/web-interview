import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function Button ({ children }) {
  const theme = useContext(ThemeContext)
  return (
    <button style={{
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px'
    }}>
      {children}
    </button>
  )
}

export default function MyApp () {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext value={theme}>
      <Button>test</Button>
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </ThemeContext>
  )
}

function Panel ({ title, children }) {
  const theme = useContext(ThemeContext)
  const className = 'panel-' + theme
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}
