import fs from 'fs'
import path from 'path'
import type { Plugin, LoadContext } from '@docusaurus/types'
import fastGlob from 'fast-glob'
import type { NumberPrefixParser } from '@docusaurus/plugin-content-docs'

export interface Topic {
   name: string;
   children?: {
      [topic: string]: Topic
   }
}
export interface KnowledgeMap {
   [subject: string]: {
      name: string;
      children: {
         [topic: string]: Topic;
      }
   };
}

export interface Question {
  subject: string;
  // 主题可能是一个数组，为嵌套关系，索引 0 为 1 级主题，索引 1 为 2 级主题，以此类推
  topic: string | string[];
  title: string;
  priority?: 'P0' | 'P1' | 'P2' | 'P3' | 'P4' | string
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
): Plugin<{ questions: Question[]; knowledgeMap: KnowledgeMap }> {
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
        const rawFiles = await fastGlob(['**/*.{md,mdx}'], {
          cwd: docsDir,
          ignore: excludePatterns,
          absolute: true,
          dot: true
        })

        // 自然数字前缀路径拓扑排序函数
        const parsePart = (part: string): { num: number; name: string } => {
          const match = part.match(/^(\d+(\.\d+)?)/)
          if (match) {
            return { num: parseFloat(match[1]), name: part }
          }
          return { num: 9999, name: part }
        }
        const compareDocPaths = (a: string, b: string): number => {
          const partsA = a.split(path.sep)
          const partsB = b.split(path.sep)
          const minLen = Math.min(partsA.length, partsB.length)
          for (let i = 0; i < minLen; i++) {
            const itemA = parsePart(partsA[i])
            const itemB = parsePart(partsB[i])
            if (itemA.num !== itemB.num) {
              return itemA.num - itemB.num
            }
            const cmp = partsA[i].localeCompare(partsB[i])
            if (cmp !== 0) return cmp
          }
          return partsA.length - partsB.length
        }
        const files = rawFiles.sort((a, b) =>
          compareDocPaths(path.relative(docsDir, a), path.relative(docsDir, b))
        )
        // 1. 预读取所有 subject 的 index.md H1
        const subjectH1Map: Record<string, string> = {}
        const h1Cache: Record<string, string> = {}
        const subjectSet = new Set<string>()
        await Promise.all(files.map(async (filePath) => {
          const relativePath = path.relative(docsDir, filePath)
          const pathParts = relativePath.split(path.sep)
          const subject = numberPrefixParser(pathParts[0]).filename
          subjectSet.add(subject)
          const noExt = relativePath.replace(/\.(md|mdx)$/, '')
          const content = await fs.promises.readFile(filePath, 'utf-8')
          let h1 = content.match(/^# (.+)$/m)?.[1] || ''
          h1 = h1.replace(/✅+$/, '').trim()
          h1Cache[noExt] = h1
        }))
        // 2. questions 收集 + knowledgeMap 构建
        const questions: Question[] = []
        const knowledgeMap: KnowledgeMap = {}
        // 构建 subject 根节点，顺序与 subjectSet 保持一致
        // subjectArr 用原始目录名（带标号）
        const subjectArr = Array.from(new Set(files.map(f => path.relative(docsDir, f).split(path.sep)[0])))
        subjectArr.sort((a, b) => {
          const aNum = parseFloat(a.match(/^\d+(\.\d+)?/)?.[0] || '0')
          const bNum = parseFloat(b.match(/^\d+(\.\d+)?/)?.[0] || '0')
          return aNum - bNum
        })
        for (const subjectDirName of subjectArr) {
          // 优先查找 subject 目录下 index.md 的 H1 或 _category_.json
          const indexMd = path.join(docsDir, subjectDirName, 'index.md')
          const categoryJson = path.join(docsDir, subjectDirName, '_category_.json')
          let name = subjectDirName
          if (fs.existsSync(categoryJson)) {
            try {
              const cat = JSON.parse(fs.readFileSync(categoryJson, 'utf-8'))
              if (cat.label) name = cat.label
            } catch {}
          } else if (fs.existsSync(indexMd)) {
            const rel = path.relative(docsDir, indexMd).replace(/\.(md|mdx)$/, '')
            name = h1Cache[rel] || numberPrefixParser(subjectDirName).filename
          } else {
            name = numberPrefixParser(subjectDirName).filename
          }
          const subjectKey = numberPrefixParser(subjectDirName).filename
          knowledgeMap[subjectKey] = { name, children: {} }
        }
        // 遍历所有文件，questions 逻辑保持不变，同时递归 knowledgeMap，顺序与文件顺序一致
        for (const filePath of files) {
          const content = await fs.promises.readFile(filePath, 'utf-8')
          // 仅收集带优先级锚点的任意层级标题为题目，例如：
          // # 标题 {#p1-some-slug}
          // ## 子标题 {#p0-xxx}
          const headingRegex = /^(#{1,3})\s+(.+?)\s*(\{#([pP][0-5])-[^}]+})\s*$/gm
          const relativePath = path.relative(docsDir, filePath)
          const pathParts = relativePath.split(path.sep)
          // 用原始 subject 目录名和去标号 key
          const subjectDirName = pathParts[0]
          const subjectKey = numberPrefixParser(subjectDirName).filename
          // topicParts: [{raw, key}]
          const topicPartsRaw = pathParts.slice(1, -1)
          const topicParts = topicPartsRaw.map(dir => ({ raw: dir, key: numberPrefixParser(dir).filename }))
          const fileRaw = path.basename(filePath, path.extname(filePath))
          const fileKey = numberPrefixParser(fileRaw).filename
          // topics: [{raw, key}]
          const topics = topicParts.length > 0 ? [...topicParts, { raw: fileRaw, key: fileKey }] : [{ raw: fileRaw, key: fileKey }]
          const fileH1 = content.match(/^# (.+)$/m)?.[1]
          // === 仅采集符合锚点规则的标题为题目 ===
          const topicPathArr = topics.map(t => t.key)
          const subject = subjectKey
          for (const m of content.matchAll(headingRegex)) {
            const title = m[2].trim()
            const anchorFull = m[3] // 如 {#p1-some-slug}
            const pToken = (m[4] || 'p4').toUpperCase()
            const fragments = anchorFull ? anchorFull.slice(1, -1) : `#${title.toLowerCase().replace(/\s+/g, '-')}`
            const topicPath = topics.map(t => t.key).join('/')
            const link = `${siteConfig.baseUrl}docs/${subject}/${topicPath}${fragments}`
            // H1 单文件题目：仅归属到父目录作为主题
            const headingLevel = m[1].length
            const displayTopicPathArr = (headingLevel === 1 && topicParts.length > 0)
              ? topicParts.map(t => t.key)
              : topics.map(t => t.key)
            questions.push({
              title,
              subject: subject || 'Other',
              topic: displayTopicPathArr,
              priority: pToken,
              link,
              meta: { fileH1 }
            })
          }
          // === knowledgeMap 递归构建 ===
          if (topicPathArr.length === 1 && (fileKey === 'index')) continue
          let node = knowledgeMap[subjectKey].children
          let parentRawPath = subjectDirName // 用于拼接原始路径
          for (let i = 0; i < topics.length; i++) {
            const { raw, key } = topics[i]
            const isLast = i === topics.length - 1
            let name = key
            if (!isLast) {
              // 嵌套目录，优先查找该目录下 _category_.json 或 index.md 的 H1
              const dirPath = parentRawPath + '/' + raw
              const categoryJsonPath = path.join(docsDir, dirPath, '_category_.json')
              const indexMdPath = path.join(docsDir, dirPath, 'index.md')
              if (fs.existsSync(categoryJsonPath)) {
                try {
                  const cat = JSON.parse(fs.readFileSync(categoryJsonPath, 'utf-8'))
                  if (cat.label) name = cat.label
                } catch {}
              } else if (fs.existsSync(indexMdPath)) {
                const rel = path.relative(docsDir, indexMdPath).replace(/\.(md|mdx)$/, '')
                name = h1Cache[rel] || key
              } else {
                name = key
              }
              parentRawPath = dirPath
            } else {
              // 最后一级，优先查找同名文件 H1
              const filePathTry = path.join(docsDir, parentRawPath, raw + '.md')
              if (fs.existsSync(filePathTry)) {
                const rel = path.relative(docsDir, filePathTry).replace(/\.(md|mdx)$/, '')
                name = h1Cache[rel] || key
              } else {
                // 也可能是目录 index.md
                const dirPath = parentRawPath + '/' + raw
                const indexMdPath = path.join(docsDir, dirPath, 'index.md')
                if (fs.existsSync(indexMdPath)) {
                  const rel = path.relative(docsDir, indexMdPath).replace(/\.(md|mdx)$/, '')
                  name = h1Cache[rel] || key
                } else {
                  name = key
                }
              }
              // 剔除末尾 ✅
              name = name.replace(/✅+$/, '').trim()
            }
            if (!node[key]) node[key] = { name }
            if (!isLast) {
              if (!node[key].children) node[key].children = {}
              node = node[key].children
            }
          }
        }
        // 打印问题表格
        //   console.table(questions)
        return { questions, knowledgeMap }
      } catch (error) {
        console.error('Error extracting questions:', error)
        return { questions: [], knowledgeMap: {} }
      }
      // 辅助函数
      function addTopicNode (tree: any, topicPath: string[], name: string) {
        if (!topicPath.length) return
        const [head, ...rest] = topicPath
        if (!tree[head]) {
          tree[head] = { name: head, children: {} }
        }
        if (rest.length === 0) {
          tree[head].name = name || head
        }
        addTopicNode(tree[head].children, rest, name)
      }
      function treeToArr (tree: any): any[] {
        return Object.entries(tree || {}).map(([_, v]: [string, any]) => ({
          name: v.name,
          children: treeToArr(v.children)
        }))
      }
    },
    async contentLoaded ({ content, actions }) {
      const { createData, setGlobalData } = actions
      const questions = content.questions
      const knowledgeMap = content.knowledgeMap
      await createData(
        'src/data/questions.json',
        JSON.stringify(questions, null, 2)
      )
      await createData(
        'src/data/knowledgeMap.json',
        JSON.stringify(knowledgeMap, null, 2)
      )
      setGlobalData({ questions, knowledgeMap })
    }
  }
}
