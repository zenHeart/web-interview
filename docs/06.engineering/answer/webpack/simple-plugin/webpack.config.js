const path = require('path')
const TodoPlugin = require('./src/TodoPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new TodoPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'] // 自定义支持的文件后缀
    })
  ]
}
