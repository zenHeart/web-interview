// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Answer from '@site/src/components/templates/Answer'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  Answer
}
