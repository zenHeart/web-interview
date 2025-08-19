// execFile：不经 shell，安全传参，缓冲整块输出
const { execFile } = require('node:child_process')

const userInput = 'foo; rm -rf /' // 模拟“危险字符”的用户输入
execFile(process.execPath, ['-e', 'console.log(process.argv.slice(2).join("|"))', userInput], (err, stdout) => {
  if (err) throw err
  // 可见整个 userInput 作为一个参数被安全传递，无 shell 解析/注入
  console.log('execFile arg:', stdout.trim())
})
