// spawn_stdio.js — 使用 spawn 的 stdin/stdout 通信（JSON 行协议）
// 运行：node spawn_stdio.js

const { spawn } = require('node:child_process')

if (process.env.CHILD_STDIO === '1') {
  // 子进程：读取 stdin 的每一行 JSON，写回结果
  let buf = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => {
    buf += chunk
    let idx
    while ((idx = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, idx)
      buf = buf.slice(idx + 1)
      try {
        const msg = JSON.parse(line)
        process.stdout.write(JSON.stringify({ echo: msg, pid: process.pid }) + '\n')
      } catch {}
    }
  })
  // 1.5 秒后退出
  setTimeout(() => process.exit(0), 1500)
} else {
  // 父进程
  const child = spawn(process.execPath, [__filename], {
    env: { ...process.env, CHILD_STDIO: '1' },
    stdio: ['pipe', 'pipe', 'inherit']
  })
  child.stdout.setEncoding('utf8')
  child.stdout.on('data', (d) => process.stdout.write('[parent] recv: ' + d))
  child.stdin.write(JSON.stringify({ ping: 'hello' }) + '\n')
  setTimeout(() => child.stdin.write(JSON.stringify({ seq: 2 }) + '\n'), 300)
  child.on('exit', (c) => console.log('[parent] child exit', c))
}
