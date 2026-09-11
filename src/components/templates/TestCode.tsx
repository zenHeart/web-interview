import React from 'react'
import { Sandpack, SandpackProps } from '@codesandbox/sandpack-react'
import { useColorMode } from '@site/src/components/hooks/useColorMode'

export interface TestCodeProps {
  files: Record<string, string | { code: string; readOnly?: boolean; hidden?: boolean; active?: boolean }>
  options?: SandpackProps['options']
}

export default function TestCode ({ files, options }: TestCodeProps) {
  const { colorMode } = useColorMode()
  const fileNames = Object.keys(files)
  const activeFile = fileNames[0]

  return (
    <div style={{ margin: '1.5rem 0', borderRadius: '8px', overflow: 'hidden' }}>
      <Sandpack
        template="test-ts"
        theme={colorMode === 'dark' ? 'dark' : 'light'}
        files={{
          ...files,
          '/sandbox.config.json': JSON.stringify({
            infiniteLoopProtection: false
          })
        }}
        options={{
          showConsole: true,
          activeFile: activeFile as any,
          editorHeight: 480,
          visibleFiles: fileNames as any,
          ...(options || {})
        }}
      />
    </div>
  )
}
