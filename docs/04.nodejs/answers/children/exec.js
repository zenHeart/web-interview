// exec：经 shell，缓冲整块输出（注意 maxBuffer 与 shell 注入）
const { exec } = require('node:child_process')

exec(`${process.execPath} -p "['a','b','c'].join('\\n')"`, { maxBuffer: 1024 * 64 }, (err, stdout) => {
  if (err) throw err
  console.log('exec output:\n' + stdout.trim())
})
