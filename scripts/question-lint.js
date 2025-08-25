#!/usr/bin/env node
/**
 * Question / Topic semantic lint
 * Rules:
 *  - headingRegex (#1-3 with anchor) identifies questions
 *  - system-design: only one question anchor per file
 *  - child headings inside <Answer> must be deeper and without anchor
 *  - capacity section numeric+unit check (system-design)
 */
const fs = require('fs')
const path = require('path')
const fg = require('fast-glob')

const headingRegex = /^(#{1,3})\s+(.+?)\s*(\{#([pP][0-5])-[^}]+})\s*$/gm
const anchorSlugRegex = /^\{#([pP][0-5])-[a-z0-9]+(?:-[a-z0-9]+)*}$/

const ROOT = path.resolve(__dirname, '..')

const args = process.argv.slice(2)
const onlyChanged = args.includes('--changed')

async function getTargetFiles () {
  if (onlyChanged) {
    // fallback: scan staged markdown
    try {
      const gitLs = require('child_process').execSync('git diff --name-only --cached', { encoding: 'utf8' })
      return gitLs.split(/\n/).filter(f => f && f.endsWith('.md') && f.startsWith('docs/')).map(f => path.join(ROOT, f))
    } catch { /* ignore */ }
  }
  return fg.sync(['docs/**/*.md'], { cwd: ROOT, absolute: true })
}

function parseFrontmatterType (content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return 'default'
  const line = m[1].split('\n').find(l => /^type:\s*/.test(l))
  if (!line) return 'default'
  return line.split(':')[1].trim()
}

function lintFile (absPath) {
  const text = fs.readFileSync(absPath, 'utf8')
  const rel = path.relative(ROOT, absPath)
  const qtype = parseFrontmatterType(text)
  const anchors = [...text.matchAll(headingRegex)].map(m => ({
    level: m[1].length,
    title: m[2].trim(),
    anchor: m[3]
  }))

  const problems = []
  const warn = (msg, code) => problems.push({ level: 'WARN', code, rel, msg })
  const error = (msg, code) => problems.push({ level: 'ERROR', code, rel, msg })

  // duplicate anchors
  const seen = new Map()
  anchors.forEach(a => {
    if (!anchorSlugRegex.test(a.anchor)) error(`锚点格式不合法: ${a.anchor}`, 'ANCHOR_FORMAT')
    const k = a.anchor.toLowerCase()
    seen.set(k, (seen.get(k) || 0) + 1)
  })
  for (const [k, c] of seen.entries()) if (c > 1) error(`重复锚点: ${k} (${c})`, 'DUP_SLUG')

  if (qtype === 'system-design' && anchors.length > 1) warn(`system-design 仅应包含 1 个题目, 实际 ${anchors.length}`, 'SD_MULTI')
  if (qtype === 'system-design' && anchors.length === 0) warn('system-design 未发现题目锚点', 'SD_NONE')

  if (qtype === 'system-design') {
    const capacityIdx = text.indexOf('约束与容量估算')
    if (capacityIdx >= 0) {
      const snippet = text.slice(capacityIdx, capacityIdx + 500)
      if (!/(QPS|TPS|GB|TB|ms|%)\b/.test(snippet)) warn('容量章节缺少单位 (QPS|TPS|GB|TB|ms|%)', 'SD_CAP_UNIT')
      if (!/\d+/.test(snippet)) warn('容量章节缺少数值', 'SD_CAP_NUMBER')
    }
  }

  return problems
}

async function main () {
  const files = await getTargetFiles()
  let all = []
  files.forEach(f => { all = all.concat(lintFile(f)) })
  if (all.length) {
    const out = all.map(p => `${p.level}\t${p.code}\t${p.rel}\t${p.msg}`).join('\n')
    console.log(out)
  }
  const errors = all.filter(p => p.level === 'ERROR')
  if (errors.length) process.exit(1)
}

main().catch(e => { console.error(e); process.exit(1) })
