import { useState, useEffect } from 'react'

export function useColorMode (): { colorMode: 'light' | 'dark' } {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const getTheme = (): 'light' | 'dark' => {
      if (typeof document === 'undefined') return 'light'
      const theme = document.documentElement.getAttribute('data-theme')
      return theme === 'dark' ? 'dark' : 'light'
    }

    setColorMode(getTheme())

    const observer = new MutationObserver(() => {
      setColorMode(getTheme())
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    return () => observer.disconnect()
  }, [])

  return { colorMode }
}

export default useColorMode
