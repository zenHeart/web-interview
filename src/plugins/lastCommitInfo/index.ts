import type { Plugin } from '@docusaurus/types'
import { execSync } from 'child_process'

export interface LastCommitInfo {
  hash: string
  shortHash: string
  authorName: string
  authorEmail: string
  dateISO: string
  dateReadable: string
  message: string
}

function getLastCommit (): LastCommitInfo | null {
  try {
    // %H full hash, %h short, %an author name, %ae email, %cI committer date (ISO 8601), %s subject
    const format = ['%H', '%h', '%an', '%ae', '%cI', '%s'].join('%x1f') + '%x1e'
    const stdout = execSync(`git log -1 --pretty=format:"${format}"`, {
      stdio: ['ignore', 'pipe', 'ignore']
    }).toString('utf-8')
    const record = stdout.split('\x1e')[0]
    if (!record) return null
    const [hash, shortHash, authorName, authorEmail, dateISO, message] = record.split('\x1f')
    const dateReadable = new Date(dateISO).toLocaleString('zh-CN', {
      hour12: false
    })
    return { hash, shortHash, authorName, authorEmail, dateISO, dateReadable, message }
  } catch (e) {
    return null
  }
}

export default function lastCommitInfoPlugin (): Plugin<{ lastCommit: LastCommitInfo | null }> {
  return {
    name: 'last-commit-info-plugin',
    async loadContent () {
      const lastCommit = getLastCommit()
      return { lastCommit }
    },
    async contentLoaded ({ content, actions }) {
      const { setGlobalData, createData } = actions
      await createData('src/data/lastCommit.json', JSON.stringify(content.lastCommit, null, 2))
      setGlobalData(content)
    }
  }
}
