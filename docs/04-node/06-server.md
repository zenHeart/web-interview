# 服务端

## express 里面的 中间件 和 插件， 是一个意思吗？{#express-middle-ware}

在 Express.js 中，"中间件" 和 "插件" 这两个术语有时被交替使用，但实际上它们可能指向不同类型的组件，其差异取决于上下文。

 中间件 (Middleware)

中间件是 Express 架构的核心部分，它是具有访问请求对象（`req`），响应对象（`res`），以及应用请求-响应循环中的下一个中间件的函数。中间件可以执行以下任务：

1. **执行任何代码**。
2. **对请求和响应对象做出更改**。
3. **结束请求-响应循环**。
4. **调用堆栈中的下一个中间件**。
5. **如果当前是一个错误处理中间件，也可以调用 `next` 函数来跳过执行后续的请求处理中间件**。

中间件可以用来处理日志记录、用户认证、HTTP 方法限定、跨域资源共享（CORS）、请求体解析等。

示例代码：

```javascript
app.use((req, res, next) => {
  // 这里是中间件逻辑
  next()
})
```

 插件 (Plugins)

在 Node.js 和 Express 生态系统中，"插件" 通常指的是：

1. **第三方库**：它们不是 Express 的原生部分，但可以被集成到 Express 应用中来提供额外的功能。例如，`morgan`（日志记录中间件）、`cors`（处理 CORS 请求）等。

2. **Express 框架的扩展**：某些特定的功能或一整套中间件，它们封装了一组特定的行为或应用结构，使之更容易复用于不同的项目中。

3. **框架本身的一部分**：在某些情况下，插件也可以是 Express 框架自身的功能模块或特性。

插件通常是由社区成员创建并维护的，它们可能遵从不同的 API 约定并且提供了比 Express 内置功能更特定的高级功能。

 主要区别

* **集成方式**：中间件通常是独立功能的函数，可以在应用的任何地方被 `use` 或 `middlewareFunction` 调用。插件则可能是更复杂的库，提供一系列中间件、错误处理或者服务级别的功能。

* **功能范畴**：中间件更侧重于 HTTP 请求的处理，通常与单个请求相关。插件则可能提供包括但不限于 HTTP 请求处理的更广泛的功能集。

* **源码结构**：中间件通常是单一功能的模块，而插件则可能是一个完整的包，包含了一个或多个中间件以及附加功能。

在实践使用中，一般不会严格区分中间件和插件，关键是理解它们提供的功能，以及如何将其集成到你的 Express 应用中。开发者通常根据自己的项目需求选择相应的中间件或插件来扩展 Express 应用的功能。

## grpc 和 protobuf 是什么关系？ {#p0-grpc-protbuf}

`gRPC（gRPC Remote Procedure Call）`和 `Protocol Buffers（protobuf）`有密切的关系，可以理解为它们之间是一种上下游的关系：

* **Protocol Buffers（protobuf）：** 这是一种由 Google 设计的数据序列化格式，用于结构化数据的序列化和反序列化。protobuf 使用 .proto 文件定义消息结构，然后通过编译器生成相应语言的代码，使得开发者可以在应用中使用这些结构化的消息。

* **gRPC：** 这是一个由 Google 开发的基于 HTTP/2 的远程过程调用（RPC）框架。gRPC 使用 Protocol Buffers 作为默认的序列化格式，以便在客户端和服务器之间传递结构化的消息。 gRPC 通过生成的代码支持多语言，使得开发者可以轻松地定义 RPC 服务、消息和调用远程方法。

因此，关系可以总结为：

* **gRPC 使用 protobuf：** gRPC 首选 Protocol Buffers 作为其默认的序列化格式，这意味着 gRPC 中的消息通信使用 protobuf 格式定义，而 gRPC 编译器将根据 protobuf 文件生成相应语言的代码，包括消息结构和 RPC 服务接口。

* **protobuf 不依赖于 gRPC：** 尽管 protobuf 最初是为 gRPC 设计的，但它本身并不限定于 gRPC。您可以使用 protobuf 来序列化和反序列化数据，而不仅限于在 gRPC 中使用。

总的来说，gRPC 和 protobuf 是两个相关但独立的概念。gRPC 是一个使用 Protocol Buffers 的 RPC 框架，而 Protocol Buffers 是一个通用的数据序列化工具，可以在多种场景中使用。

## PM2 部署 nodejs 有哪些优势？

**关键词**：PM2 Nodejs

PM2部署Node.js应用程序有以下几个优势：

1. 进程管理和监控：PM2可以自动监控Node.js应用程序的运行状态，并在进程崩溃或无响应时自动重启进程。它还提供了实时的日志输出和监控面板，方便查看和分析应用程序的运行情况。

2. 无缝部署和热重载：使用PM2可以实现无缝部署Node.js应用程序，无需手动停止和启动进程。通过使用PM2的热重载功能，可以在不中断服务的情况下重新加载应用程序代码，实现零停机更新。

3. 环境管理和配置：PM2可以通过环境变量来管理应用程序的配置，如端口号、数据库连接等。它还支持在不同的环境（如开发、测试、生产）之间切换配置，方便应用程序的部署和管理。

4. 高可用性和负载均衡：PM2支持启动多个进程，并自动在多个CPU核心间平衡负载。这样可以提高应用程序的并发处理能力和性能，确保应用的高可用性和稳定性。

5. 集中化管理：PM2提供了命令行工具和Web界面，可以集中管理和操作所有的Node.js应用程序。通过PM2，可以方便地查看和管理进程、查看日志、监控性能指标等，提升管理效率。

综上所述，PM2提供了完善的进程管理和监控功能，以及便捷的部署和配置管理方式，可以大大简化Node.js应用程序的部署和运维工作，提高应用的可用性和性能。

参考文档： [资料](https://zhuanlan.zhihu.com/p/627009546)

## koa 中间件的异常处理是怎么做的？

在 Koa 中，中间件函数的异常处理可以通过两种方式来实现：

1. 使用 `try...catch` 捕获异常：在中间件函数中使用 `try...catch` 语句来捕获异常，然后通过 `ctx.throw()` 方法抛出异常信息，例如：

```vbnet
vbnetCopy codeasync function myMiddleware(ctx, next) {
 try {
 await next();
 } catch (err) {
 ctx.throw(500, 'Internal Server Error');
 }
}
```

在这个例子中，`await next()` 表示调用下一个中间件函数，如果这个函数抛出异常，就会被捕获到，然后通过 `ctx.throw()` 方法抛出一个包含错误状态码和错误信息的异常。

2. 使用 Koa 的错误处理中间件：Koa 提供了一个错误处理中间件 `koa-json-error`，可以通过在应用程序中使用该中间件来处理异常。这个中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 注册错误处理中间件
app.use(jsonError())

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，`koa-json-error` 中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。开发人员可以通过自定义错误处理函数来处理异常，例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 自定义错误处理函数
function errorHandler (err, ctx) {
  ctx.status = err.status || 500
  ctx.body = {
    message: err.message,
    status: ctx.status
  }
}

// 注册错误处理中间件
app.use(jsonError(errorHandler))

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，我们自定义了一个错误处理函数 `errorHandler`，将错误信息格式化为 JSON 格式，并设置响应状态码。然后将这个函数作为参数传递给 `koa-json-error` 中间件，用于处理异常。

## koa 在没有async await 的时候, koa是怎么实现的洋葱模型？

说到洋葱模型，就必须聊一聊中间件，中间件这个概念，我们并不陌生，比如平时我们用的 `redux`、`express` 、`koa` 这些库里，都离不开中间件。

那 `koa` 里面的中间件是什么样的呢？其本质上是一个函数，这个函数有着特定，单一的功能，`koa`将一个个中间件注册进来，通过**组合**实现强大的功能。

先看 `demo` ：

```js
// index.js
const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use(async (ctx, next) => {
  console.log('1')
  await next()
  console.log('2')
})
// 中间件2
app.use(async (ctx, next) => {
  console.log('3')
  await next()
  console.log('4')
})
// 中间件3
app.use(async (ctx, next) => {
  console.log('5')
  await next()
  console.log('6')
})
app.listen(8002)
```

先后注册了三个中间件，运行一下`index.js` ，可以看到输出结果为：

```js
1
3
5
6
4
2
```

没接触过洋葱模型的人第一眼可能会疑惑，为什么调用了一个 `next` 之后，直接从`1` 跳到了 `3` ，而不是先输出`1` ，再输出`2`呢。 其实这就是洋葱模型特点，下图是它的执行过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80798be002944d67a46c456d4af3c03c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 一开始我们先后注册了三个中间件，分别是中间件1，中间件2，中间件3，调用`listen`方法，打开对应端口的页面，触发了中间件的执行。

首先会先执行第一个中间件的 `next` 的前置语句，相当于 `demo` 里面的 `console.log('1')` ，当调用 `next()` 之后，会直接进入第二个中间件，继续重复上述逻辑，直至最后一个中间件，就会执行 `next` 的后置语句，然后继续上一个中间件的后置语句，继续重复上述逻辑，直至执行第一个中间件的后置语句，最后输出。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935675e49480426eb517a68c224673c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 正是因为它这种执行机制，才被称为**洋葱模型**。

* 首先调用 `use` 方法收集中间件，调用 `listen` 方法执行中间件。
* 每一个中间件都有一个`next`参数（暂时不考虑ctx参数），`next`参数可以控制进入下一个中间件的时机。

**需要解决的问题**

* 最后一个中间件调用next如何处理
* 如何解决同一个中间件多次调用next

**完整代码**

其中最精华的部分就是`compose`函数，细数一下，只有`11`行代码，1比1还原了`koa`的`compose`函数（去除了不影响主逻辑判断）。

> koa是利用koa-compose这个库进行组合中间件的，在koa-compose里面，next返回的都是一个promise函数。

```js
function Koa () {
  this.middleares = []
}
Koa.prototype.use = function (middleare) {
  this.middleares.push(middleare)
  return this
}
Koa.prototype.listen = function () {
  const fn = compose(this.middleares)
}
function compose (middleares) {
  let index = -1
  const dispatch = (i) => {
    if (i <= index) throw new Error('next（） 不能调用多次')
    index = i
    if (i >= middleares.length) return
    const middleare = middleares[i]
    return middleare('ctx', dispatch.bind(null, i + 1))
  }
  return dispatch(0)
}

const app = new Koa()
app.use(async (ctx, next) => {
  console.log('1')
  next()
  console.log('2')
})
app.use(async (ctx, next) => {
  console.log('3')
  next()
  console.log('4')
})
app.use(async (ctx, next) => {
  console.log('5')
  next()
  console.log('6')
})

app.listen()
```

**使用**

```js
const Koa = require('koa')
const app = new Koa()

// 中间件过多，可以创建一个middleares文件夹，将cors函数放到middleares/cors.js文件里面
const cors = () => {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    await next()
  }
}

app.use(cors())
app.use(async (ctx, next) => {
  console.log('第一个中间件', ctx.request.method, ctx.request.url)
  await next()
  ctx.body = 'hello world'
})
```

`koa`的中间件都是有固定模板的，首先是一个函数，并且返回一个`async`函数（闭包的应用），这个`async`函数有两个参数，一个是`koa`的`context`，一个是`next`函数。

在没有 `async/await` 的时候，Koa 通过使用 ES6 的生成器函数来实现洋葱模型。具体来说，Koa 中间件函数是一个带有 `next` 参数的生成器函数，当中间件函数调用 `next` 方法时，它会挂起当前的执行，转而执行下一个中间件函数，直到执行完最后一个中间件函数，然后将执行权返回到前一个中间件函数，继续执行下面的代码。这个过程就像一层一层剥开洋葱一样，因此被称为洋葱模型。

下面是一个使用生成器函数实现的简单的 Koa 中间件函数：

```javascript
function * myMiddleware (next) {
  // 中间件函数的代码
  console.log('Start')
  yield next
  console.log('End')
}
```

在这个中间件函数中，`yield next` 表示挂起当前的执行，执行下一个中间件函数。假设我们有两个中间件函数 `middleware1` 和 `middleware2`，它们的代码如下：

```javascript
function * middleware1 (next) {
  console.log('middleware1 Start')
  yield next
  console.log('middleware1 End')
}

function * middleware2 (next) {
  console.log('middleware2 Start')
  yield next
  console.log('middleware2 End')
}
```

我们可以使用 `compose` 函数将它们组合成一个洋葱模型：

```scss
scssCopy codeconst compose = require('koa-compose');

const app = compose([middleware1, middleware2]);

app();
```

在这个例子中，`compose` 函数将 `middleware1` 和 `middleware2` 组合成一个函数 `app`，然后调用这个函数即可执行整个中间件链。执行的结果如下：

```sql
sqlCopy codemiddleware1 Start
middleware2 Start
middleware2 End
middleware1 End
```

可以看到，这个结果与洋葱模型的特点相符。

## koa body-parser 中间件实现原理？

Koa 中间件 `koa-bodyparser` 的原理是将 HTTP 请求中的 `request body` 解析成 JavaScript 对象，并将其挂载到 `ctx.request.body` 属性上，方便后续的处理。

具体来说，`koa-bodyparser` 中间件会监听 HTTP 请求的 `data` 事件和 `end` 事件，然后将请求中的数据流解析成一个 JavaScript 对象，并将其作为参数传递给 `ctx.request.body` 属性，最后调用 `await next()`，将控制权交给下一个中间件。

在实现过程中，`koa-bodyparser` 中间件会根据请求头中的 `Content-Type` 字段来判断请求体的类型，支持解析的请求体类型有 `application/json`、`application/x-www-form-urlencoded` 和 `multipart/form-data`。对于其他类型的请求体，`koa-bodyparser` 会将其解析成一个空对象 `{}`。

下面是一个简单的 `koa-bodyparser` 中间件的实现示例：

```javascript
function bodyParser () {
  return async (ctx, next) => {
    if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
      let data = ''
      ctx.req.on('data', (chunk) => {
        data += chunk
      })
      ctx.req.on('end', () => {
        if (ctx.request.headers['content-type'] === 'application/json') {
          ctx.request.body = JSON.parse(data)
        } else if (ctx.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
          ctx.request.body = querystring.parse(data)
        } else if (ctx.request.headers['content-type'].startsWith('multipart/form-data')) {
          // 解析 multipart/form-data 请求体
          // ...
        } else {
          ctx.request.body = {}
        }
        return next()
      })
    } else {
      return next()
    }
  }
}
```

在这个实现中，如果请求方法为 `POST` 或者 `PUT`，则开始监听 `data` 事件和 `end` 事件，将请求体数据解析成一个 JavaScript 对象并挂载到 `ctx.request.body` 上，最后调用 `next()` 将控制权交给下一个中间件。对于其他请求方法，则直接调用 `next()` 交给下一个中间件处理。注意，这个实现只支持解析 `application/json` 和 `application/x-www-form-urlencoded` 类型的请求体，对于其他类型的请求体需要进行特殊处理。

## koa 如何解析 post 请求参数 {#p0-koa-parser}

如果你不想使用任何中间件来解析 POST 请求参数，你可以手动解析请求体数据。在 Koa 中，你可以通过以下步骤来解析 POST 请求的参数：

1. 使用 `ctx.req` 获取原始的 Node.js 请求对象。
2. 将请求对象的数据流通过 `ctx.req.on('data', ...)` 事件监听进行读取。
3. 将读取到的数据流进行处理，根据请求头的 `Content-Type` 判断数据格式，可以是 `application/json` 或 `application/x-www-form-urlencoded`。
4. 将处理后的数据转换为 JavaScript 对象或其他格式进行进一步处理。

以下是一个示例：

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.method === 'POST') {
    // 手动解析 POST 请求的参数
    const requestData = await parseRequestBody(ctx.req)
    // 处理请求参数
    // ...
    ctx.body = 'POST request received'
  } else {
    ctx.body = 'Hello, Koa!'
  }
})

function parseRequestBody (req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      // 根据请求头的 Content-Type 判断数据格式
      if (req.headers['content-type'] === 'application/json') {
        // 解析 JSON 格式数据
        try {
          resolve(JSON.parse(data))
        } catch (error) {
          reject(error)
        }
      } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // 解析 URL 编码格式数据
        const parsedData = {}
        const keyValuePairs = data.split('&')
        for (const pair of keyValuePairs) {
          const [key, value] = pair.split('=')
          parsedData[key] = decodeURIComponent(value)
        }
        resolve(parsedData)
      } else {
        reject(new Error('Unsupported content type'))
      }
    })
    req.on('error', (error) => {
      reject(error)
    })
  })
}

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
```

在上述示例中，我们在中间件函数中手动解析 POST 请求的参数。`parseRequestBody` 函数使用 `ctx.req` 获取原始的 Node.js 请求对象，并通过监听 `data` 事件将请求体数据流进行读取。然后，根据请求头的 `Content-Type` 判断数据格式，如果是 `application/json`，则使用 `JSON.parse` 解析为 JavaScript 对象；如果是 `application/x-www-form-urlencoded`，则将数据转换为键值对对象。最后，将解析后的数据传递给处理函数进行进一步处理。

请注意，手动解析请求参数可能更复杂且容易出错，而使用中间件能够更方便地处理和解析请求体数据。因此，在实际开发中，推荐使用合适的中间件来解析请求参数。

## SSR  {#p0-ssr}

* 客户端渲染路线：1. 请求一个html -> 2. 服务端返回一个html -> 3. 浏览器下载html里面的js/css文件 -> 4. 等待js文件下载完成 -> 5. 等待js加载并初始化完成 -> 6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch ) -> 7. 等待后端数据返回 -> 8. react-dom( 客户端 )从无到完整地，把数据渲染为响应页面

* 服务端渲染路线：1. 请求一个html -> 2. 服务端请求数据( 内网请求快 ) -> 3. 服务器初始渲染（服务端性能好，较快） -> 4. 服务端返回已经有正确内容的页面 -> 5. 客户端请求js/css文件 -> 6. 等待js文件下载完成 -> 7. 等待js加载并初始化完成 -> 8. react-dom( 客户端 )把剩下一部分渲染完成( 内容小，渲染快 )

 10.1 react

* React的虚拟DOM是其可被用于服务端渲染的关键。首先每个ReactComponent 在虚拟DOM中完成渲染，然后React通过虚拟DOM来更新浏览器DOM中产生变化的那一部分，虚拟DOM作为内存中的DOM表现，为React在Node.js这类非浏览器环境下的吮吸给你提供了可能，React可以从虚拟DoM中生成一个字符串。而不是跟新真正的DOM，这使得我们可以在客户端和服务端使用同一个React Component。

* React 提供了两个可用于服务端渲染组件的函数：React.renderToString 和React.render-ToStaticMarkup。 在设计用于服务端渲染的ReactComponent时需要有预见性，考虑以下方面。

选取最优的渲染函数。
如何支持组件的异步状态。
如何将应用的初始化状态传递到客户端。
哪些生命周期函数可以用于服务端的渲染。
如何为应用提供同构路由支持。
单例、实例以及上下文的用法。

 10.2 vue

**1. 什么是服务器端渲染（SSR）？**

* Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记”混合”为客户端上完全交互的应用程序。

* 服务器渲染的 Vue.js 应用程序也可以被认为是”同构”或”通用”，因为应用程序的大部分代码都可以在服务器和客户端上运行。

**2. 服务器端渲染优势**
. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
. 更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content)与转化率直接相关」的应用程序而言，服务器端渲染(SSR)至关重要。

 1. 把UI图划分出组件层级

 2. 用React创建一个静态版本

* 传入数据模型，渲染 UI 但没有任何交互。最好把这些过程解耦，因为创建一个静态版本更多需要的是码代码，不太需要逻辑思考，而添加交互则更多需要的是逻辑思考，不是码代码。
* 在创建静态版本的时候不要使用 state。
* 你可以自顶向下或者自底向上构建应用。也就是，你可以从层级最高的组件开始构建(即 FilterableProductTable开始)或层级最低的组件开始构建(ProductRow)。在较为简单的例子中，通常自顶向下更容易，而在较大的项目中，自底向上会更容易并且在你构建的时候有利于编写测试。
* React 的单向数据流(也叫作单向绑定)保证了一切是模块化并且是快速的。

 3. 定义 UI 状态的最小(但完整)表示

* 想想实例应用中的数据，让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：

它是通过 props 从父级传来的吗？如果是，他可能不是 state。
它随着时间推移不变吗？如果是，它可能不是 state。
你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。

 4. 确定你的State应该位于哪里

* 对你应用的每一个 state：

确定每一个需要这个 state 来渲染的组件。
找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

 5. 添加反向数据流

结

总结一下，我们发现，
. Vue的优势包括：
. 模板和渲染函数的弹性选择
. 简单的语法及项目创建
. 更快的渲染速度和更小的体积
. React的优势包括：
. 更适用于大型应用和更好的可测试性
. 同时适用于Web端和原生App
. 更大的生态圈带来的更多支持和工具
. 而实际上，React和Vue都是非常优秀的框架，它们之间的相似之处多过不同之处，并且它们大部分最棒的功能是相通的：
. 利用**虚拟DOM**实现快速渲染
. 轻量级
. 响应式和组件化
. 服务器端渲染
. 易于集成路由工具，打包工具以及状态管理工具
. 优秀的支持和社区

文章参考来源：

* [vue官方文档关于框架的对比](https://cn.vuejs.org/v2/guide/comparison.html)
* [react中文文档](https://discountry.github.io/react/docs/hello-world.html)
* [vue官方文档](https://cn.vuejs.org/v2/guide/installation.html)

 SSR 原理是啥

服务器端渲染（Server-Side Rendering，SSR）是一种前端渲染方式，其核心原理是在服务器端将动态生成的 HTML 页面发送给客户端，以便客户端在接收到页面时直接渲染显示，而不是在客户端使用 JavaScript 动态生成页面。

核心原理如下：

1. 客户端发起请求：当用户访问一个 SSR 应用的页面时，客户端会向服务器发起请求。

2. 服务器处理请求：服务器接收到请求后，根据请求的路径和参数，获取对应的数据。

3. 数据获取和页面渲染：在服务器端，通过调用后端数据接口或其他数据源获取页面所需的数据。获取到数据后，服务器使用模板引擎或渲染框架将数据填充到页面模板中，生成完整的 HTML 页面。

4. HTML 页面返回给客户端：服务器将生成的 HTML 页面作为响应返回给客户端。

5. 客户端渲染：客户端接收到服务器返回的 HTML 页面后，直接渲染显示页面内容。由于服务器已经将数据填充到了页面中，客户端无需再进行数据获取和页面渲染的过程，提升了页面的加载速度和用户体验。

SSR 的核心原理是在服务器端生成完整的 HTML 页面，并将其发送给客户端，使客户端能够更快地显示页面内容。相比于传统的客户端渲染（CSR），SSR 可以改善首次加载时的白屏时间和搜索引擎抓取等方面的问题。同时，SSR 也可以更好地支持 SEO（搜索引擎优化）和提供更好的性能体验给用户。

 实现方案

前端实现服务器端渲染（SSR）的方案有以下几种：

1. 基于 Node.js 的框架：使用 Node.js 的框架（如Express、Koa、Nest.js等）来构建服务器端应用程序，并在服务器端进行页面渲染。通过在服务器上运行 JavaScript 代码，将渲染好的页面直接返回给客户端。

2. 框架提供的 SSR 功能：一些前端框架（如Next.js、Nuxt.js、Angular Universal等）提供了内置的服务器端渲染功能，可以更方便地实现 SSR。这些框架会负责处理路由、数据预取和页面渲染等工作，并将渲染好的页面返回给客户端。

3. 预渲染：使用预渲染技术将静态页面提前生成，并部署到服务器上。在用户请求页面时，直接返回预渲染好的 HTML 页面，然后再由客户端接管页面的交互。这种方式适用于内容不经常变动或不需要动态数据的页面。

4. 后端代理：通过将前端应用程序的请求代理到服务器端，然后在服务器端进行页面渲染，并将渲染好的页面返回给客户端。这种方式适用于在现有的后端服务中添加 SSR 功能，而无需重写整个应用程序。

需要根据具体的项目需求、技术栈和框架选择合适的 SSR 实现方案。每种方案都有其优点和限制，综合考虑性能、开发体验、部署成本和维护复杂度等因素来做出决策。

## CSR、SSR、SSG、NSR、ESR、ISR 都是啥？ {#p0-CSR}

CSR、SSR、SSG、NSR、ESR、ISR 都是啥？

根据不同的构建、渲染过程有不同的优劣势和适用情况。

* 现代 UI 库加持下常用的 `CSR`、
* 具有更好 `SEO` 效果的 `SSR` (`SPR`)、
* 转换思路主打**构建时生成**的 `SSG`、
* 大架构视野之上的 `ISR`、`DPR`，
* 还有更少听到的 `NSR`、`ESR`。

 CSR(Client Side Rendering)

> 页面托管服务器只需要对页面的**访问请求响应**一个如下的**空页面**

```html
<!DOCTYPE html>
<html>
 <head>
 <meta charset="utf-8" />
 <!-- metas -->
 <title></title>
 <link rel="shortcut icon" href="xxx.png" />
 <link rel="stylesheet" href="xxx.css" />
 </head>
 <body>
 <div id="root"><!-- page content --></div>
 <script src="xxx/filterXss.min.js"></script>
 <script src="xxx/x.chunk.js"></script>
 <script src="xxx/main.chunk.js"></script>
 </body>
</html>

```

页面中留出一个用于填充渲染内容的视图节点 (`div#root`)，并插入指向项目**编译压缩后**的

* `JS Bundle` 文件的 `script` 节点
* 指向 `CSS` 文件的 `link.stylesheet` 节点等。

浏览器接收到这样的文档响应之后，会根据文档内的链接加载脚本与样式资源，并完成以下几方面主要工作：

> 1. **执行脚本**
> 2. 进行**网络访问以获取在线数据**
> 3. 使用 DOM API **更新页面结构**
> 4. **绑定交互事件**
> 5. **注入样式**

以此完成整个渲染过程。

CSR 模式有以下几方面优点：

* UI 库支持
* **前后端分离**
* **服务器负担轻**

 SSR (Server Side Rendering)

SSR 的概念，即与 `CSR` 相对地，在服务端完成大部分渲染工作， 服务器在响应站点访问请求的时候，就已经渲染好可供呈现的页面。

像 `React`、`Vue` 这样的 UI 生态巨头，其实都有一个关键的 `Virtual DOM` (or VDOM) 概念,先自己**建模处理视图表现与更新**、再批量调 `DOM API` 完成视图渲染更新。这就带来了一种 `SSR` 方案：

`VDOM` 是**自建模型**，是一种抽象的嵌套数据结构，也就可以在 `Node` 环境（或者说一切服务端环境）下跑起来，**把原来的视图代码拿来在服务端跑**，通过 `VDOM` 维护，再在最后**拼接好字符串作为页面响应**，生成文档作为响应页面，此时的页面内容已经基本生成完毕，把逻辑代码、样式代码附上，则可以实现完整的、可呈现页面的响应。

 SSR优点

* 呈现速度和用户体验佳
* `SEO` 友好

 SSR缺点

1. 引入成本高
将视图渲染的工作交给了服务器做，引入了新的概念和技术栈（如 Node）
1. 响应时间长
SSR 在完成访问响应的时候需要做更多的计算和生成工作
关键指标 `TTFB` (`Time To First Byte`) 将变得更大
1. 首屏交互不佳
虽然 SSR 可以让页面请求响应后更快在浏览器上渲染出来
但在首帧出现，需要客户端加载激活的逻辑代码（如事件绑定）还没有初始化完毕的时候，其实是不可交互的状态

 SSR-React 原理

1. VDOM
2. 同构
3. 双端对比

几大概念：

* VDOM
* 同构
* 双端对比
* renderToString()
* renderToStaticMarkup()

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

仅仅是为了将组件渲染为html字符串，不会带有`data-react-checksum`属性

 SPR (Serverless Pre-Rendering)

无服务预渲染，这是 `Serverless` 话题之下的一项渲染技术。`SPR` 是指在 `SSR` 架构下通过预渲染与缓存能力，将部分页面转化为静态页面，以避免其在服务器接收到请求的时候频繁被渲染的能力，同时一些框架还支持**设置静态资源过期时间**，以确保这部分“静态页面”也能有一定的即时性。

 SSG (Static Site Generation)

* 它与 `CSR` 一样，只需要**页面托管**，不需要真正编写并部署服务端，页面资源在编译完成部署之前就已经确定；
* 但它又与 `SSR` 一样，属于一种 `Prerender` 预渲染操作，即在用户浏览器得到页面响应之前，页面内容和结构就已经渲染好了。
* 当然形式和特征来看，它更接近 SSR。

> `SSG` 模式，把原本日益动态化、交互性增强的页面，变成了大部分已经填充好，托管在页面服务 / CDN 上的**静态页面**

 NSR (Native Side Rendering)

`Native` 就是客户端，万物皆可**分布式**，可以理解为这就是一种分布式的 `SSR`，不过这里的渲染工作交给了客户端去做而不是远端服务器。在用户即将访问页面的**上级页面预取页面数据，由客户端缓存 HTML 结构，以达到用户真正访问时快速响应的效果**。

NSR 见于各种移动端 + `Webview` 的 `Hybrid` 场景，是需要页面与客户端研发协作的一种优化手段。

 ESR (Edge Side Rendering)

`Edge` 就是边缘，类比前面的各种 `XSR`，`ESR` 就是将渲染工作交给边缘服务器节点，常见的就是 `CDN` 的边缘节点。这个方案主打的是**边缘节点相比核心服务器与用户的距离优势**，利用了 `CDN` 分级缓存的概念，渲染和内容填充也可以是分级进行并缓存下来的。

`ESR` 之下静态内容与动态内容是分流的，

1. 边缘 CDN 节点可以将静态页面内容先响应给用户
2. 然后再自己发起动态内容请求，得到核心服务器响应之后再返回给用户

是在大型网络架构下非常极致的一种优化，但这也就依赖更庞大的技术基建体系了。

 ISR (Incremental Site Rendering)

**增量式网站渲染**，就是对待页面内容小刀切，**有更细的差异化渲染粒度**，能渐进、分层地进行渲染。

常见的选择是：

* 对于重要页面如首屏、访问量较大的直接落地页，进行**预渲染并添加缓存**，保证最佳的访问性能；
* 对于次要页面，则确保有兜底内容可以即时 `fallback`，再将其实时数据的渲染留到 CSR 层次完成，同时触发异步缓存更新。

对于“异步缓存更新”，则需要提到一个常见的内容缓存策略：`Stale While Revalidate`，CDN 对于数据请求始终首先响应缓存内容，如果这份内容已经过期，则**在响应之后再触发异步更新**——这也是对于次要元素或页面的缓存处理方式。
