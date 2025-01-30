import fs from 'fs'
import path from 'path'
import type { Plugin, LoadContext } from '@docusaurus/types'
import fastGlob from 'fast-glob'
import type { NumberPrefixParser } from '@docusaurus/plugin-content-docs'

export interface Question {
  domain: string;
  topic: string;
  title: string;
  priority?: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  link: string;
}

export interface GroupedQuestion {
  [domain: string]: {
    [topic: string]: Question[];
  };
}

interface PluginOptions {
  exclude?: string[];
}
const numberPrefixPattern =
  /^(?<numberPrefix>\d+(\.\d+)?)\s*[-_.]+\s*(?<suffix>[^-_.\s].*)$/

export const numberPrefixParser: NumberPrefixParser = (
  filename: string
) => {
  const match = numberPrefixPattern.exec(filename)
  if (!match) {
    return { filename, numberPrefix: undefined }
  }
  const numberPrefix = match.groups!.numberPrefix!.split('.').map(Number)

  const res = {
    filename: match.groups!.suffix!,
    numberPrefix: numberPrefix.length === 1 ? numberPrefix[0] : parseFloat(numberPrefix.join('.'))
  }
  console.log(match.groups!.numberPrefix, res)
  return res
}

export default function extractQuestionsPlugin (
  context: LoadContext,
  options: PluginOptions = {
    exclude: ['issueData']
  }
): Plugin<Question[]> {
  return {
    name: 'extract-questions-plugin',
    async loadContent () {
      const { siteDir, siteConfig } = context
      const exclude: string[] =
        siteConfig.presets.find((preset) =>
          (preset as unknown[]).includes?.('classic')
        )?.[1]?.docs?.exclude || []
      const excludePatterns = [...exclude, ...(options.exclude || [])]
      const docsDir = path.join(siteDir, 'docs')
      try {
        // 使用 fast-glob 查找所有 markdown 文件
        const files = await fastGlob(['**/*.{md,mdx}'], {
          cwd: docsDir,
          ignore: excludePatterns,
          absolute: true,
          dot: true
        })

        const questions = (await Promise.all(
          files.map(async (filePath) => {
            const content = await fs.promises.readFile(filePath, 'utf-8')
            const matches = content.match(/^## (.+)$/gm) || []
            const domain = numberPrefixParser(path.basename(path.dirname(filePath))).filename // 获取一级目录名并移除前缀数字
            const topic = numberPrefixParser(path.basename(path.basename(filePath, path.extname(filePath)))).filename // 获取文件名作为 topic，并移除前缀数字

            return matches.map(match => {
              const titleWithAnchor = match.slice(3).trim()
              const anchorMatch = titleWithAnchor.match(/{#(p\d+)-.*?}$/)?.[1]
              const title = titleWithAnchor.replace(/{#.*?}$/, '').trim()
              const priority = anchorMatch?.toUpperCase?.() || 'P4'
              const fragments = anchorMatch ? titleWithAnchor.match(/{(#p\d+-.*?)}$/)?.[1] : `#${title.toLowerCase().replace(/\s+/g, '-')}`
              const link = `/web-interview/docs/${domain}/${topic}${fragments}`
              return {
                title,
                domain: domain || 'Other',
                topic,
                priority,
                link
              }
            })
          })
        )).flat()

        return questions
      } catch (error) {
        console.error('Error extracting questions:', error)
        return []
      }
    },

    async contentLoaded ({ content, actions }) {
      const { createData, setGlobalData } = actions

      // console.log('Content loaded:', content)

      await createData(
        'src/data/questions.json',
        JSON.stringify(content, null, 2)
      )
      setGlobalData({ questions: content })
    }
  }
}
