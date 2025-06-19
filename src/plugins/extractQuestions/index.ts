import fs from 'fs'
import path from 'path'
import type { Plugin, LoadContext } from '@docusaurus/types'
import fastGlob from 'fast-glob'
import type { NumberPrefixParser } from '@docusaurus/plugin-content-docs'

export interface Topic {
   name: string;
   children: {
      [topic: string]: Topic
   }
}
export interface KnowledgeMap {
   [subject: string]: {
      name: string;
      topics: Topic[];
   };
}

export interface Question {
  subject: string;
  // 主题可能是一个数组，为嵌套关系，索引 0 为 1 级主题，索引 1 为 2 级主题，以此类推
  topic: string | string[];
  title: string;
  priority?: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  link: string;
  meta: {
    fileH1: string;
  };
}

export interface GroupedQuestion {
  [subject: string]: {
    [topic: string]: Question[];
  };
}

interface PluginOptions {
  exclude?: string[];
}
const numberPrefixPattern =
  /^(?<numberPrefix>\d+(\.\d+)?)\s*[-_.]+\s*(?<suffix>[^-_.\s].*)$/

export const numberPrefixParser: NumberPrefixParser = (filename: string) => {
  const match = numberPrefixPattern.exec(filename)
  if (!match) {
    return { filename, numberPrefix: undefined }
  }
  const numberPrefix = match.groups!.numberPrefix!.split('.').map(Number)

  const res = {
    filename: match.groups!.suffix!,
    numberPrefix:
      numberPrefix.length === 1
        ? numberPrefix[0]
        : parseFloat(numberPrefix.join('.'))
  }
  //   console.log(match.groups!.numberPrefix, res)
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
        const questions = (
          await Promise.all(
            files.map(async (filePath) => {
              const content = await fs.promises.readFile(filePath, 'utf-8')
              const matches = content.match(/^## (.+)$/gm) || []

              // 计算相对 docs 目录的路径
              const relativePath = path.relative(docsDir, filePath)
              const pathParts = relativePath.split(path.sep)
              // 主题为第一级目录
              const subject = numberPrefixParser(pathParts[0]).filename

              // 解析 topics（去除文件名后缀和前缀数字）
              const topicParts = pathParts
                .slice(1, -1) // 目录部分
                .map((dir) => numberPrefixParser(dir).filename)
              // 文件名部分
              const fileTopic = numberPrefixParser(
                path.basename(filePath, path.extname(filePath))
              ).filename
              // 合并目录和文件名作为 topics
              const topics = topicParts.length > 0
                ? [...topicParts, fileTopic]
                : fileTopic

              const fileH1 = content.match(/^# (.+)$/m)?.[1] // 获取文件的 H1 标题

              return matches.map((match) => {
                const titleWithAnchor = match.slice(3).trim()
                const anchorMatch =
                  titleWithAnchor.match(/{#(p\d+)-.*?}$/)?.[1]
                const title = titleWithAnchor.replace(/{#.*?}$/, '').trim()
                const priority = anchorMatch?.toUpperCase?.() || 'P4'
                const fragments = anchorMatch
                  ? titleWithAnchor.match(/{(#p\d+-.*?)}$/)?.[1]
                  : `#${title.toLowerCase().replace(/\s+/g, '-')}`

                // 构建链接路径
                const topicPath = Array.isArray(topics)
                  ? topics.join('/')
                  : topics
                const link = `${siteConfig.baseUrl}docs/${subject}/${topicPath}${fragments}`

                return {
                  title,
                  subject: subject || 'Other',
                  topic: topics,
                  priority,
                  link,
                  meta: {
                    fileH1
                  }
                }
              })
            })
          )
        ).flat()
        // 打印问题表格
        console.table(questions)

        return questions
      } catch (error) {
        console.error('Error extracting questions:', error)
        return []
      }
    },

    async contentLoaded ({ content, actions }) {
      const { createData, setGlobalData } = actions

      // console.log('Content loaded:', content)

      const info = await createData(
        'src/data/questions.json',
        JSON.stringify(content, null, 2)
      )
      setGlobalData({ questions: content })
    }
  }
}
