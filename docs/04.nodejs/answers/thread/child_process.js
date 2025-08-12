// 使用 child_process 并行执行任务（隔离进程）
const { fork } = require('node:child_process')

if (process.argv[2] !== 'child') {
  const start = Date.now()
  const workers = [fork(__filename, ['child']), fork(__filename, ['child'])]
  let done = 0
  for (const w of workers) {
    w.on('message', m => {
      console.log('child sum =', m.sum)
      if (++done === workers.length) {
        console.log(`Total time: ${Date.now() - start}ms`)
      }
    })
    w.send({ nums: [1, 2, 3, 4, 5] })
  }
} else {
  process.on('message', m => {
    const sum = m.nums.reduce((a, b) => a + b, 0)
    process.send({ sum })
  })
}
