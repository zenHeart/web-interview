import fs from 'fs'
import path from 'path'
import type { Plugin, LoadContext } from '@docusaurus/types'

export default function extractQuestionsPlugin (
  context: LoadContext,
  options: Record<string, unknown>
): Plugin<void> {
  return {
    name: 'extract-questions-plugin',
    async loadContent () {
      const { siteDir, siteConfig } = context
      const { exclude } = siteConfig.presets.find((preset) => preset.docs)?.docs ?? {}

      function extractQuestions (docsDir: string): { title: string }[] {
        const questions: { title: string }[] = []

        function traverseDirectory (dir: string) {
          const files = fs.readdirSync(dir)

          files.forEach((file) => {
            const filePath = path.join(dir, file)
            const stats = fs.statSync(filePath)

            if (stats.isDirectory()) {
              if (!(exclude as string[])?.some((pattern) => filePath.includes(pattern))) {
                traverseDirectory(filePath)
              }
            } else if (stats.isFile() && ['.md', '.mdx'].includes(path.extname(file))) {
              const content = fs.readFileSync(filePath, 'utf-8')
              const matches = content.match(/^## (.+)$/gm)

              if (matches) {
                matches.forEach((match) => {
                  const title = match.slice(3).trim()
                  questions.push({ title })
                })
              }
            }
          })
        }

        traverseDirectory(docsDir)

        return questions
      }

      const docsDir = path.join(siteDir, 'docs')
      const questions = extractQuestions(docsDir)

      console.log('Extracted questions:', questions)

      return questions
    },
    async contentLoaded ({ content, actions }) {
      const { createData, setGlobalData } = actions

      console.log('Content loaded:', content)

      await createData('src/data/questions.json', JSON.stringify(content, null, 2))
      setGlobalData({ questions: content })
    }
  }
}
