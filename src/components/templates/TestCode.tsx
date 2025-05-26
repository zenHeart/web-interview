import { Sandpack } from '@codesandbox/sandpack-react'

interface files {
   string: string
}

export default function CodeSandbox ({ files, options }: {files: files, options?: any}) {
  // 获取文件名
  const fileNames = Object.keys(files) as any
  const activeFile = Object.keys(files)[0] as any

  return (
    <Sandpack
      template="test-ts"
      files={{
        ...files,
        '/add.ts': '',
        '/add.test.ts': ''
      }}
      options={{
        showConsole: false,
        activeFile,
        visibleFiles: fileNames,
        ...(options || {})
      }}
    />
  )
}
