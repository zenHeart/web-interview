
# 系统设计



## 将静态资源缓存在本地的方式有哪些？{#p0-cached-static}

**浏览器可以使用以下几种方式将前端静态资源缓存在本地**：

1. HTTP缓存：浏览器通过设置HTTP响应头中的Cache-Control或Expires字段来指定资源的缓存策略。常见的缓存策略有：no-cache（每次都请求服务器进行验证）、no-store（不缓存资源）、max-age（设置资源缓存的最大时间）等。浏览器根据这些缓存策略来决定是否将资源缓存在本地。

2. ETag/If-None-Match：服务器可以通过在响应头中添加ETag字段，用于标识资源的版本号。当浏览器再次请求资源时，会将上次请求返回的ETag值通过If-None-Match字段发送给服务器，由服务器判断资源是否发生了变化。如果资源未发生变化，服务器会返回304 Not Modified状态码，浏览器则直接使用本地缓存的资源。

3. Last-Modified/If-Modified-Since：服务器可以通过在响应头中添加Last-Modified字段，用于标识资源的最后修改时间。浏览器再次请求资源时，会将上次请求返回的Last-Modified值通过If-Modified-Since字段发送给服务器。服务器根据资源的最后修改时间判断资源是否发生了变化，如果未发生变化，则返回304 Not Modified状态码，浏览器使用本地缓存的资源。

4. Service Worker缓存：使用Service Worker可以将前端资源缓存在浏览器的Service Worker缓存中。Service Worker是运行在浏览器后台的脚本，它可以拦截和处理网络请求，因此可以将前端资源缓存起来，并在离线状态下提供缓存的资源。

5. LocalStorage或IndexedDB：对于一些小的静态资源，可以将其存储在浏览器的LocalStorage或IndexedDB中。这些存储方式是浏览器提供的本地存储机制，可以将数据以键值对的形式存储在浏览器中，从而实现缓存的效果。

**如何将静态资源缓存在 LocalStorage或IndexedDB**

以下是一个使用LocalStorage将静态资源缓存的示例代码：

```js
// 定义一个数组，包含需要缓存的静态资源的URL
const resources = [
  'https://example.com/css/style.css',
  'https://example.com/js/main.js',
  'https://example.com/images/logo.png'
]

// 遍历资源数组，将资源请求并存储在LocalStorage中
resources.forEach(function (url) {
  // 发起资源请求
  fetch(url)
    .then(function (response) {
      // 检查请求是否成功
      if (!response.ok) {
        throw new Error('Request failed: ' + response.status)
      }
      // 将响应数据存储在LocalStorage中
      return response.text()
    })
    .then(function (data) {
      // 将资源数据存储在LocalStorage中，以URL作为键名
      localStorage.setItem(url, data)
      console.log('Resource cached: ' + url)
    })
    .catch(function (error) {
      console.error(error)
    })
})
```

以下是一个使用IndexedDB将静态资源缓存的示例代码：

```js
// 打开或创建一个IndexedDB数据库
const request = indexedDB.open('myDatabase', 1)

// 创建或更新数据库的对象存储空间
request.onupgradeneeded = function (event) {
  const db = event.target.result
  const objectStore = db.createObjectStore('resources', { keyPath: 'url' })
  objectStore.createIndex('url', 'url', { unique: true })
}

// 成功打开数据库后，将资源请求并存储在IndexedDB中
request.onsuccess = function (event) {
  const db = event.target.result
  const transaction = db.transaction('resources', 'readwrite')
  const objectStore = transaction.objectStore('resources')

  resources.forEach(function (url) {
    // 发起资源请求
    fetch(url)
      .then(function (response) {
        // 检查请求是否成功
        if (!response.ok) {
          throw new Error('Request failed: ' + response.status)
        }
        // 将响应数据存储在IndexedDB中
        return response.blob()
      })
      .then(function (data) {
        // 创建一个资源对象，以URL作为键名
        const resource = { url, data }
        // 将资源对象存储在IndexedDB中
        objectStore.put(resource)
        console.log('Resource cached: ' + url)
      })
      .catch(function (error) {
        console.error(error)
      })
  })

  // 完成事务
  transaction.oncomplete = function () {
    console.log('All resources cached in IndexedDB.')
  }

  transaction.onerror = function (event) {
    console.error('Transaction error:', event.target.error)
  }
}
```

以上代码仅为示例，实际应用中需要根据具体的需求进行相应的优化和错误处理。

## 什么是 JWT {#p0-jwt}

JWT是JSON Web Token的缩写，是一种用于在不同系统之间安全传输信息的开放标准。JWT通常用于身份验证和授权，它由三部分组成：头部（header）、载荷（payload）和签名（signature）。

头部包含了关于令牌的元数据和算法信息，通常包括令牌的类型（例如JWT）、使用的加密算法（例如HMAC SHA256或RSA）等。

载荷包含了要传输的数据，可以是用户的身份信息、权限、角色等。载荷可以自定义，但常见的标准字段有iss（令牌的签发者）、exp（令牌的过期时间）、sub（令牌的主题）等。

签名是使用头部和载荷中的数据以及秘密密钥生成的，用于验证令牌的真实性和完整性。接收方可以使用相同的密钥对收到的令牌进行验证。

JWT的优点包括可扩展性、易于使用和跨平台支持，它可以在各种语言和框架中使用。由于JWT是基于标准的JSON格式，因此它易于解析和处理。

## 如何解决页面请求接口大规模并发问题 {#p0-batch-request}

如何解决页面请求接口大规模并发问题， 不仅仅是包含了接口并发， 还有前端资源下载的请求并发。

应该说这是一个话题讨论了；

**个人认为可以从以下几个方面来考虑如何解决这个并发问题:**

1. 后端优化：可以对接口进行优化，采用缓存技术，对数据进行预处理，减少数据库操作等。使用集群技术，将请求分散到不同的服务器上，提高并发量。另外可以使用反向代理、负载均衡等技术，分担服务器压力。

2. 做 BFF 聚合：把所有首屏需要依赖的接口， 利用服务中间层给聚合为一个接口。

3. CDN加速：使用CDN缓存技术可以有效减少服务器请求压力，提高网站访问速度。CDN缓存可以将接口的数据存储在缓存服务器中，减少对原始服务器的访问，加速数据传输速度。

4. 使用 WebSocket：使用 WebSocket 可以建立一个持久的连接，避免反复连接请求。WebSocket 可以实现双向通信，大幅降低服务器响应时间。

5. 使用 HTTP2 及其以上版本， 使用多路复用。

6. 使用浏览器缓存技术：强缓存、协商缓存、离线缓存、Service Worker 缓存 等方向。

7. 聚合一定量的静态资源： 比如提取页面公用复用部分代码打包到一个文件里面、对图片进行雪碧图处理， 多个图片只下载一个图片。

8. 采用微前端工程架构： 只是对当前访问页面的静态资源进行下载， 而不是下载整站静态资源。

9. 使用服务端渲染技术： 从服务端把页面首屏直接渲染好返回， 就可以避免掉首屏需要的数据再做额外加载和执行。

## 前后端实时通信方案 {#p0-online-communicate}

端如何实现即时通讯

 短轮询

短轮询的原理很简单，每隔一段时间客户端就发出一个请求，去获取服务器最新的数据，一定程度上模拟实现了即时通讯。

* 优点：兼容性强，实现非常简单
* 缺点：延迟性高，非常消耗请求资源，影响性能

 comet

comet有两种主要实现手段，
一种是基于 AJAX 的长轮询（long-polling）方式，
另一种是基于 Iframe 及 htmlfile 的流（streaming）方式，通常被叫做长连接。

具体两种手段的操作方法请移步 [Comet技术详解：基于HTTP长连接的Web端实时通信技术](http://www.52im.net/thread-334-1-1.html)

* 长轮询优缺点：
* 优点：兼容性好，资源浪费较小
* 缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护

* 长连接优缺点：
* 优点：兼容性好，消息即时到达，不发无用请求
* 缺点：服务器维护长连接消耗资源

 SSE

SSE（Server-Sent Event，服务端推送事件）是一种允许服务端向客户端推送新数据的HTML5技术。

* 优点：基于HTTP而生，因此不需要太多改造就能使用，使用方便，而websocket非常复杂，必须借助成熟的库或框架
* 缺点：基于文本传输效率没有websocket高，不是严格的双向通信，客户端向服务端发送请求无法复用之前的连接，需要重新发出独立的请求

 Websocket

Websocket是一个全新的、独立的协议，基于TCP协议，与http协议兼容、却不会融入http协议，仅仅作为html5的一部分，其作用就是在服务器和客户端之间建立实时的双向通信。

* 优点：真正意义上的实时双向通信，性能好，低延迟
* 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器

 Web Worker

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行

 Service workers

Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理，创建有效的离线体验。

实时通信是一种双向的通信方式，前后端都能实时地获取对方的数据和状态变化，目前主要有以下几种方法可以实现：

1. WebSocket：WebSocket 是一种基于 TCP 协议的双向通信协议，它可以在客户端和服务器之间建立持久性的连接，并且支持服务器主动向客户端推送数据。WebSocket 协议通过 HTTP 协议的 101 状态码进行握手，握手成功后，客户端和服务器之间的通信就不再使用 HTTP 协议，而是使用 WebSocket 协议。WebSocket 协议具有低延迟、高效、实时等优点，适用于实时通信、在线游戏、股票行情等场景。

2. Server-Sent Events（SSE）：SSE 是一种基于 HTTP 协议的服务器推送技术，它允许服务器向客户端推送文本数据或事件数据，而无需客户端发起请求。SSE 协议通过 HTTP 的长连接机制实现服务器向客户端的推送，客户端通过 EventSource API 接口接收服务器推送的数据。SSE 协议比较简单，实现也比较容易，适用于需要推送数据而不需要客户端与服务器进行双向通信的场景。

3. 长轮询（Long Polling）：长轮询是一种基于 HTTP 协议的服务器推送技术，它通过客户端向服务器发送一个长时间的请求，服务器在有数据更新时返回响应，否则将一直等待一段时间后才返回响应。客户端收到响应后立即发起下一次请求。长轮询比较容易实现，适用于需要实时通知客户端数据变化但不需要高实时性的场景。

4. WebRTC：WebRTC 是一种实时通信协议，它基于 P2P 技术，可以在浏览器之间直接建立通信，并实现视频、音频、数据等多媒体的实时传输。WebRTC 协议支持点对点通信，不需要经过服务器转发，因此具有低延迟、高效、实时等优点，适用于实时视频、音频等场景。

总的来说，WebSocket 和 SSE 协议适用于需要服务器主动向客户端推送数据的场景，长轮询适用于需要实时通知客户端数据变化但不需要高实时性的场景，WebRTC 协议适用于实时视频、音频等场景。选择哪种方法要根据具体的业务场景和需求来决定。
