import React, { useEffect, useState } from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'

interface LiveCodeProps {
  filePath: string; // Accept a full relative file path
}

const LiveCode: React.FC<LiveCodeProps> = ({ filePath }) => {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadCode = async () => {
      setLoading(true)
      try {
        const codeModule = await import(`!!raw-loader!${filePath}`)
        console.log('codeModule', codeModule)
        setCode(codeModule.default) // Set the code content
      } catch (error) {
        console.error('Error loading code:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCode()
  }, [filePath]) // Reload code when filePath changes

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Sandpack
      template="react"
      files={{
        '/App.js': code || '' // Use the loaded code
      }}
    />
  )
}

export default LiveCode
