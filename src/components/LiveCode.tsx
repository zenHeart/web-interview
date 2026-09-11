import React from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

interface LiveCodeProps {
  code?: string
  filePath?: string
}

const LiveCode: React.FC<LiveCodeProps> = ({ code = '' }) => {
  const { colorMode } = useColorMode()

  return (
    <div style={{ margin: '1.5rem 0', borderRadius: '8px', overflow: 'hidden' }}>
      <Sandpack
        template="react"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        files={{
          '/App.js': code
        }}
        options={{
          editorHeight: 420
        }}
      />
    </div>
  )
}

export default LiveCode
