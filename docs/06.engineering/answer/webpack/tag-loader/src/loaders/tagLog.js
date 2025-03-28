module.exports = function (source) {
  // 获取当前文件路径（相对于项目根目录）
  const resourcePath = this.resourcePath
  const relativePath = resourcePath.replace(process.cwd(), '').replace(/\\/g, '/')

  // 定义需要处理的 console 方法
  const consoleMethods = ['log', 'info', 'warn', 'error', 'debug']

  let modifiedSource = source

  // 处理每个 console 方法
  consoleMethods.forEach(method => {
    // 使用更精确的正则表达式匹配 console.method( 或 console.method ( 的情况
    // 同时处理可能的空格和换行
    const regex = new RegExp(`console\\s*\\.\\s*${method}\\s*\\(`, 'g')
    modifiedSource = modifiedSource.replace(regex, `console.${method}("[${relativePath}]", `)
  })

  // 添加调试信息
  console.log(`[TagLog Loader] Processing file: ${relativePath}`)

  return modifiedSource
}
