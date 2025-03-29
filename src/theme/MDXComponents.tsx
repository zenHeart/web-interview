// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Answer from '@site/src/components/templates/Answer.mdx'
import Analysis from '@site/src/components/templates/Analysis.mdx'
import TestCode from '@site/src/components/templates/TestCode'
import LiveCode from '@site/src/components/LiveCode'
import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { Sandpack } from '@codesandbox/sandpack-react'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Tabs,
  TabItem,
  LiveCode,
  CodeBlock,
  Sandpack,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Answer,
  Analysis,
  TestCode
}
