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

## SSR 了解多少 {#p0-ssr}

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
