// spawn：流式输出，适合长时间/大量输出与管道场景
const { spawn } = require('node:child_process')

const child = spawn(process.execPath, ['-e', `
  let i = 0
  const t = setInterval(() => {
    console.log('tick', ++i)
    if (i === 3) { clearInterval(t) }
  }, 100)
`], { stdio: ['ignore', 'pipe', 'inherit'] })

child.stdout.on('data', d => process.stdout.write('parent<- ' + d))
child.on('close', code => console.log('spawn exit', code))
