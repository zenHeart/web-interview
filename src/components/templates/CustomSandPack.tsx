import { Sandpack } from '@codesandbox/sandpack-react'

interface files {
   string: string
}

export default function CustomSandPack ({ files, options, ...extraOptions }: {files: files, options?: any, extraOptions?: any}) {
  // 获取文件名
  const fileNames = Object.keys(files) as any
  const activeFile = Object.keys(files)[0] as any

  return (
    <Sandpack
      template="test-ts"
      files={{
        ...files,
        '/sandbox.config.json': JSON.stringify({
          infiniteLoopProtection: false
        })

      }}
      options={{
        showConsole: false,
        activeFile,
        editorHeight: 800,
        visibleFiles: fileNames,
        ...(options || {})
      }}
      {...extraOptions}
    />
  )
}
