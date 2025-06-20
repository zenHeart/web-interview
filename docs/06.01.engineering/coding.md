# 编码

## 实现 Awaited 类型定义

## 应用上线后， 怎么通知用户刷新当前页面？ {#p2-update-app}

**关键词**：静态资源更新、页面版本更新、服务端推送

**关键词**：静态资源更新、页面版本更新

这个话题非常的有意思，问题的答案是比较开发的，这里仅代表作者本人的个人经验来做回答。 当然也可以自行去搜集掘金上的大佬们的博文。

 首先第一个问题

**用户在没有页面刷新的情况下， 如何去感知前端静态资源已经发生了更新？**

首先要做静态资源版本管理。 这个版本直接给到 html 模板即可， 其他 link 打包的资源还是以哈希 code 作为文件名称后缀。

就类似于这样子的

```
xxx.1.0.0.html --> vender.hash_1.js、 vender.hash_2.js、 vender.hash_3.js、vender.hash_1.css

xxx.1.0.1.html --> vender.hash_a.js、 vender.hash_b.js、 vender.hash_c.js、vender.hash_d.css
```

 如何主动推送给客户端

**这个实现方式就非常的多了，我这里建议让服务端来做处理**

因为我们前端静态资源打包之后， 大多数会上传到云存储服务器上， 或者甚至是 服务器本地 也行。 这个时候， 后端给一个定时任务， 比如 1 分钟去执行一次， 看看是否有新的 html 版本的内容生成。 如果有新的 html 版本内容生成， 且当前用户访问的还是旧版本， 那么直接发一个服务端信息推送即可（SSE 允许服务器推送数据到浏览器）。

这样做成本是最低的， 甚至可以说是一劳永逸。 前端是没有任何负债， 没有任何性能问题。

 那是否还有别的处理方式呢？ 当然是有的

1. **WebSockets**：

通过 WebSocket 连接，服务器可以实时地向客户端发送消息，包括静态资源更新的通知。收到消息后，客户端可以采取相应的措施，比如显示一个提示信息让用户选择是否重新加载页面。

2. **Service Workers(推荐)**：

Service workers 位于浏览器和网络之间，可以控制页面的资源缓存。它们也可用于检测资源更新，当检测到静态资源更新时，可以通过推送通知或在网站上显示更新提示。

3. **轮询**：

客户端用 JavaScript 定时发送 HTTP 请求到服务器，查询版本信息。如果检测到新版本，可以提醒用户或自动刷新资源。

**在绝大多数情况下，使用 Service Workers 可能是最稳妥的做法**，因为它不仅提供了资源缓存和管理的能力，而且也可以在后台做资源更新的检查，即使用户没有开启网页也能实现通知和更新的功能。当然，选择哪种方案还需考虑应用的需求、用户体验和实现复杂度等因素。

> 别的社区上文章的处理方式， 基本上也逃不开以上几种方式
>
> 比如这篇高赞文档: [资料](https://juejin.cn/post/7185451392994115645). 点赞量有 1.8k， 实现的方式是前端轮询。
>
> 这篇文章也不错: [资料](https://juejin.cn/post/7330255976506458153). 实现方式是通过 websocket.

## 简单实现一个洋葱模式中间件 {#p0-onnion-model}

洋葱模型是一种常用的中间件模型，例如在 Koa 框架中就广泛应用了这种模型。这种模型的特点是请求被传递到下一个中间件之前，需要先经过当前中间件处理，然后再逐层返回。

下面是一个简单的洋葱模型的示例代码：

```js
function middleware1 (next) {
  return function (ctx) {
    console.log('middleware1 before')
    next(ctx)
    console.log('middleware1 after')
  }
}

function middleware2 (next) {
  return function (ctx) {
    console.log('middleware2 before')
    next(ctx)
    console.log('middleware2 after')
  }
}

function middleware3 (next) {
  return function (ctx) {
    console.log('middleware3 before')
    next(ctx)
    console.log('middleware3 after')
  }
}

function compose (middlewares) {
  return function (ctx) {
    function dispatch (i) {
      if (i === middlewares.length) {
        return
      }
      const middleware = middlewares[i]
      const next = dispatch.bind(null, i + 1)
      middleware(next)(ctx)
    }
    dispatch(0)
  }
}

const middlewares = [middleware1, middleware2, middleware3]
const composed = compose(middlewares)
composed({})
```

这个示例中有三个中间件函数 `middleware1`、`middleware2` 和 `middleware3`，它们都是接受一个 `next` 函数作为参数的高阶函数。当这个中间件被执行时，它将接受一个 `ctx` 对象作为参数，并且调用 `next(ctx)` 将请求传递给下一个中间件。

`compose` 函数接受一个中间件函数数组作为参数，返回一个新的函数，这个函数可以将请求传递给第一个中间件函数。每个中间件函数都将接收一个 `next` 函数作为参数，并返回一个新的函数，这个新的函数将接收 `ctx` 对象作为参数，并且在调用 `next(ctx)` 之前和之后都会执行一些操作。当 `next(ctx)` 被调用时，请求将被传递到下一个中间件函数。

在 `composed` 函数中，我们将一个空的 `ctx` 对象作为参数传递给第一个中间件函数。`dispatch` 函数递归地调用中间件数组中的每一个中间件函数，并将 `ctx` 对象和下一个中间件函数作为参数传递。当最后一个中间件函数完成处理时，递归调用结束，请求处理完成。

## 大文件上传了解多少 {#p0-big-file-upload}

如果太大的文件，比如一个视频1g 2g那么大，直接采用上面的栗子中的方法上传可能会出链接现超时的情况，而且也会超过服务端允许上传文件的大小限制，所以解决这个问题我们可以将文件进行分片上传，每次只上传很小的一部分 比如2M。

`Blob` 它表示原始数据, 也就是二进制数据，同时提供了对数据截取的方法 `slice`,而 `File` 继承了 `Blob` 的功能，所以可以直接使用此方法对数据进行分段截图。

过程如下：

* 把大文件进行分段 比如2M，发送到服务器携带一个标志，暂时用当前的时间戳，用于标识一个完整的文件
* 服务端保存各段文件
* 浏览器端所有分片上传完成，发送给服务端一个合并文件的请求
* 服务端根据文件标识、类型、各分片顺序进行文件合并
* 删除分片文件

客户端 JS 代码实现如下

```js
function submitUpload () {
  const chunkSize = 210241024// 分片大小 2M
  const file = document.getElementById('f1').files[0]
  const chunks = [] // 保存分片数据
  const token = (+new Date()); const // 时间戳
    name = file.name; let chunkCount = 0; let sendChunkCount = 0

  // 拆分文件 像操作字符串一样
  if (file.size > chunkSize) {
    // 拆分文件
    let start = 0; let end = 0
    while (true) {
      end += chunkSize
      const blob = file.slice(start, end)
      start += chunkSize

      // 截取的数据为空 则结束
      if (!blob.size) {
        // 拆分结束
        break
      }

      chunks.push(blob)// 保存分段数据
    }
  } else {
    chunks.push(file.slice(0))
  }

  chunkCount = chunks.length// 分片的个数

  // 没有做并发限制，较大文件导致并发过多，tcp 链接被占光 ，需要做下并发控制，比如只有4个在请求在发送

  for (let i = 0; i < chunkCount; i++) {
    const fd = new FormData() // 构造FormData对象
    fd.append('token', token)
    fd.append('f1', chunks[i])
    fd.append('index', i)
    xhrSend(fd, function () {
      sendChunkCount += 1
      if (sendChunkCount === chunkCount) { // 上传完成，发送合并请求
        console.log('上传完成，发送合并请求')
        const formD = new FormData()
        formD.append('type', 'merge')
        formD.append('token', token)
        formD.append('chunkCount', chunkCount)
        formD.append('filename', name)
        xhrSend(formD)
      }
    })
  }
}

function xhrSend (fd, cb) {

  const xhr = new XMLHttpRequest() // 创建对象
  xhr.open('POST', 'http://localhost:8100/', true)
  xhr.onreadystatechange = function () {
    console.log('state change', xhr.readyState)
    if (xhr.readyState === 4) {
      console.log(xhr.responseText)
      cb && cb()
    }
  }
  xhr.send(fd)// 发送
}

// 绑定提交事件
document.getElementById('btn-submit').addEventListener('click', submitUpload)
```

服务端 node 实现代码如下： 合并文件这里使用 stream pipe 实现，这样更节省内存，边读边写入，占用内存更小，效率更高，代码见fnMergeFile方法。

```js
// 二次处理文件，修改名称
app.use((ctx) => {
  const body = ctx.request.body
  let files = ctx.request.files ? ctx.request.files.f1 : []// 得到上传文件的数组
  const result = []
  const fileToken = ctx.request.body.token// 文件标识
  const fileIndex = ctx.request.body.index// 文件顺序

  if (files && !Array.isArray(files)) { // 单文件上传容错
    files = [files]
  }

  files && files.forEach(item => {
    const path = item.path
    const fname = item.name// 原文件名称
    const nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken
    if (item.size > 0 && path) {
      // 得到扩展名
      const extArr = fname.split('.')
      const ext = extArr[extArr.length - 1]
      // var nextPath = path + '.' + ext;
      // 重命名文件
      fs.renameSync(path, nextPath)
      result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
    }
  })

  if (body.type === 'merge') { // 合并分片文件
    const filename = body.filename
    const chunkCount = body.chunkCount
    const folder = path.resolve(__dirname, '../static/uploads') + '/'

    const writeStream = fs.createWriteStream(`${folder}${filename}`)

    let cindex = 0

    // 合并文件
    // eslint-disable-next-line
    function fnMergeFile () {
      const fname = `${folder}${cindex}-${fileToken}`
      const readStream = fs.createReadStream(fname)
      readStream.pipe(writeStream, { end: false })
      readStream.on('end', function () {
        fs.unlink(fname, function (err) {
          if (err) {
            throw err
          }
        })
        if (cindex + 1 < chunkCount) {
          cindex += 1
          fnMergeFile()
        }
      })
    }

    fnMergeFile()
    ctx.body = 'merge ok 200'
  }

})
```

 大文件上传断点续传

在上面我们实现了文件分片上传和最终的合并，现在要做的就是如何检测这些分片，不再重新上传即可。 这里我们可以在本地进行保存已上传成功的分片，重新上传的时候使用`spark-md5`来生成文件 hash，区分此文件是否已上传。

* 为每个分段生成 hash 值，使用 `spark-md5` 库
* 将上传成功的分段信息保存到本地
* 重新上传时，进行和本地分段 hash 值的对比，如果相同的话则跳过，继续下一个分段的上传

**方案一**： 保存在本地 `indexDB/localStorage` 等地方， 推荐使用 `localForage` 这个库
`npm install localforage`

**客户端 JS 代码**：

```js
// 获得本地缓存的数据
function getUploadedFromStorage () {
  return JSON.parse(localforage.getItem(saveChunkKey) || '{}')
}

// 写入缓存
function setUploadedToStorage (index) {
  const obj = getUploadedFromStorage()
  obj[index] = true
  localforage.setItem(saveChunkKey, JSON.stringify(obj))
}

// 分段对比

const uploadedInfo = getUploadedFromStorage()// 获得已上传的分段信息

for (let i = 0; i < chunkCount; i++) {
  console.log('index', i, uploadedInfo[i] ? '已上传过' : '未上传')

  if (uploadedInfo[i]) { // 对比分段
    sendChunkCount = i + 1// 记录已上传的索引
    continue// 如果已上传则跳过
  }
  var fd = new FormData() // 构造FormData对象
  fd.append('token', token)
  fd.append('f1', chunks[i])
  fd.append('index', i);

  (function (index) {
    xhrSend(fd, function () {
      sendChunkCount += 1
      // 将成功信息保存到本地
      setUploadedToStorage(index)
      if (sendChunkCount === chunkCount) {
        console.log('上传完成，发送合并请求')
        const formD = new FormData()
        formD.append('type', 'merge')
        formD.append('token', token)
        formD.append('chunkCount', chunkCount)
        formD.append('filename', name)
        xhrSend(formD)
      }
    })
  })(i)
}
```

**方案2**：服务端用于保存分片坐标信息， 返回给前端

需要服务端添加一个接口只是服务端需要增加一个接口。 基于上面一个栗子进行改进，服务端已保存了部分片段，客户端上传前需要从服务端获取已上传的分片信息（上面是保存在了本地浏览器），本地对比每个分片的 hash 值，跳过已上传的部分，只传未上传的分片。

方法1是从本地获取分片信息,这里只需要将此方法的能力改为从服务端获取分片信息就行了。

## 解决重复引用 node_modules 里面的不同版本的包(包重复问题) {#p1-webpack-different-version}

解决重复引用 `node_modules` 中不同版本的包的问题，可以通过以下几种方式：

**1.使用 npm 或者 yarn 的工具进行依赖的版本控制，尽量避免引用不同版本的同一个依赖库**。在 package.json 文件中使用 "^"、"~"、">=" 等方式指定依赖版本，可以有效减少不同版本的包冲突问题。

**2.使用 webpack 的 resolve.alias 配置选项**，将需要共享的模块指定到一个目录下，然后在其它模块中使用别名引用该模块。例如，将需要共享的模块指定到 src/shared 目录下，然后在其它模块中使用别名 @shared 引用该模块，这样就可以保证在不同模块中引用相同的依赖库。
假设我们在项目中同时依赖了两个库：`lodash` 和 `lodash-es`，并且它们分别被安装在了不同的目录下，如下所示：

```
Copy codenode_modules/
├── lodash/
└── lodash-es/
```

我们需要在项目中同时引用这两个库，但是如果我们在代码中分别使用 `import _ from 'lodash'` 和 `import _ from 'lodash-es'`，那么 webpack 会将它们打包成两个独立的模块，导致代码体积变大。

为了解决这个问题，我们可以通过 `resolve.alias` 配置项将它们指向同一个模块。具体做法是在 webpack 配置文件中添加以下内容：

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      'lodash-es': 'lodash'
    }
  }
}
```

这样一来，当我们在代码中使用 `import _ from 'lodash-es'` 时，webpack 会自动将它解析成对 `lodash` 的引用，从而避免了重复打包的问题。

**3.使用 webpack 的 ProvidePlugin 插件**，将需要共享的模块注入到全局作用域中，这样就可以在不同模块中共享相同的依赖库。例如，在 webpack 配置文件中添加以下代码：

```js
const webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
```

这样在不同模块中就可以使用 $、jQuery、window.jQuery 全局变量引用 jquery 依赖库，避免了重复引用不同版本的 jquery 包的问题。

**4.使用 webpack 的 resolve.modules 配置选项**，将 node\_modules 目录移动到项目根目录之外，然后在 resolve.modules 中添加该目录的绝对路径，这样就可以解决不同模块中引用相同依赖库不同版本的问题。例如，在 webpack 配置文件中添加以下代码：

```js
const path = require('path')

module.exports = {
  // ...
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}
```

这样 webpack 在查找依赖库的时候，会先在项目根目录下的 src 目录中查找，如果没有找到再去 node\_modules 目录中查找，避免了不同模块中引用相同依赖库不同版本的问题。
