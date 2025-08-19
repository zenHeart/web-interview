const http = require('node:http')
const fs = require('node:fs')
http.createServer((req, res) => {
  // 利用 pipeline 自动处理背压与错误传播
  fs.createReadStream('big.bin', { highWaterMark: 64 * 1024 })
    .pipe(res)
}).listen(3200)
