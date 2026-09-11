// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Answer from '@site/src/components/templates/Answer.mdx'
import Analysis from '@site/src/components/templates/Analysis.mdx'
import TestCode from '@site/src/components/templates/TestCode'
import CustomSandPack from '@site/src/components/templates/CustomSandPack'

import LiveCode from '@site/src/components/LiveCode'
import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import { Sandpack } from '@codesandbox/sandpack-react'
import * as LayoutComponent from '@site/src/components/Layout'

import ViteHmrVisualizer from '@site/src/components/visualizers/ViteHmrVisualizer'
import StranglerVisualizer from '@site/src/components/visualizers/StranglerVisualizer'
import ElectronProcessVisualizer from '@site/src/components/visualizers/ElectronProcessVisualizer'
import AgentTraceVisualizer from '@site/src/components/visualizers/AgentTraceVisualizer'
import InpVisualizer from '@site/src/components/visualizers/InpVisualizer'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  ...LayoutComponent,
  Tabs,
  TabItem,
  LiveCode,
  CodeBlock,
  Sandpack,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Answer,
  Analysis,
  TestCode,
  CustomSandPack,
  ViteHmrVisualizer,
  StranglerVisualizer,
  ElectronProcessVisualizer,
  AgentTraceVisualizer,
  InpVisualizer
}
