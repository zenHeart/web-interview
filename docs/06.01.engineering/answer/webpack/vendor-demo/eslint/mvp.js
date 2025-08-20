// 最小可运行“玩具 ESLint”：演示 配置→扫描→报告→自动修复(semi)
const source = `var x=1
console.log(x)
if (a == 1) { }
let y
`

const config = {
  rules: {
    'no-console': 'warn',
    eqeqeq: 'error',
    semi: 'error',
    'no-unused-vars': 'warn'
  }
}

function lint (code, cfg) {
  const lines = code.split('\n')
  const problems = []

  // 1) 收集声明与引用（极简）
  const decls = new Set()
  const declRe = /\b(var|let|const)\s+([A-Za-z_$][\w$]*)/g
  let m
  while ((m = declRe.exec(code))) decls.add(m[2])

  const refs = new Map()
  for (const name of decls) {
    const re = new RegExp(`\\b${name}\\b`, 'g')
    const matches = [...code.matchAll(re)].length
    refs.set(name, Math.max(0, matches - 1)) // 除去声明本身
  }

  // 2) 按行检查：semi、no-console、eqeqeq
  lines.forEach((line, i) => {
    const n = i + 1
    const trimmed = line.trim()

    // no-console
    if (cfg.rules['no-console'] && /\bconsole\.\w+\s*\(/.test(line)) {
      problems.push({ ruleId: 'no-console', severity: 'warn', line: n, message: 'Unexpected console statement.' })
    }

    // eqeqeq（仅匹配 == 且非 ===）
    if (cfg.rules.eqeqeq && /(^|[^=])==([^=]|$)/.test(line)) {
      problems.push({ ruleId: 'eqeqeq', severity: 'error', line: n, message: 'Expected \'===\' and instead saw \'==\'.' })
    }

    // semi（行尾需 ;，忽略空行/以{}/,结尾/注释）
    if (cfg.rules.semi) {
      if (trimmed && !/[;{}:,]$/.test(trimmed) && !/^\s*\/\//.test(trimmed)) {
        problems.push({ ruleId: 'semi', severity: 'error', line: n, message: 'Missing semicolon.' })
      }
    }
  })

  // 3) 未使用变量
  for (const [name, count] of refs) {
    if (count === 0 && config.rules['no-unused-vars']) {
      // 找到声明行（粗略）
      const declLine = lines.findIndex(l => new RegExp(`\\b(var|let|const)\\s+${name}\\b`).test(l)) + 1
      problems.push({ ruleId: 'no-unused-vars', severity: 'warn', line: declLine || 1, message: `'${name}' is defined but never used.` })
    }
  }

  // 4) 自动修复：仅修复 semi
  const fixed = [...lines]
  for (const p of problems) {
    if (p.ruleId === 'semi') {
      const idx = p.line - 1
      fixed[idx] = fixed[idx].replace(/\s+$/, '')
      if (!/[;{}:,]$/.test(fixed[idx].trim())) fixed[idx] = fixed[idx] + ';'
    }
    if (p.ruleId === 'eqeqeq') {
      const idx = p.line - 1
      fixed[idx] = fixed[idx].replace(/(^|[^=])==([^=]|$)/, (_m, a, b) => `${a}===${b}`)
    }
  }

  return { problems, fixed: fixed.join('\n') }
}

function printReport (res, code) {
  const counts = res.problems.reduce((acc, p) => { acc[p.severity] = (acc[p.severity] || 0) + 1; return acc }, {})
  console.log('Input:\n' + code)
  console.log('\nReport:')
  if (res.problems.length === 0) console.log('✔ No problems found')
  else res.problems.forEach(p => console.log(`- [${p.severity}] (${p.ruleId}) line ${p.line}: ${p.message}`))
  console.log(`\nSummary: errors=${counts.error || 0}, warnings=${counts.warn || 0}`)
  console.log('\nFixed output:\n' + res.fixed)
}

const result = lint(source, config)
printReport(result, source)
