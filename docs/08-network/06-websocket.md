# websocket

## WebSocket 协议的底层原理是什么 {#p0-websocket}

WebSocket 是一种在Web浏览器和服务器之间进行全双工通信的协议，它通过一个长久的、双向的通信通道来实现实时数据传输。

下面是WebSocket协议的底层原理：

1. 握手（Handshake）：WebSocket连接的建立需要通过HTTP握手来升级到WebSocket协议。客户端首先发送一个HTTP请求，其中包含一些特定的头部信息，表明客户端希望升级到WebSocket协议。服务器收到请求后，如果支持WebSocket协议，就会返回一个带有特定头部的HTTP响应，表示握手成功。握手完成后，连接从HTTP协议切换到了WebSocket协议。

2. 数据帧（Data Frames）：一旦握手成功，WebSocket连接就处于打开状态，可以进行数据传输。数据以数据帧的形式在客户端和服务器之间进行传输。数据帧是WebSocket协议中的基本单位，它包含了有效负载（payload）和一些控制信息。有效负载可以是文本数据或二进制数据。

3. 帧格式（Frame Format）：WebSocket数据帧的格式相对简单。它以字节流的形式进行传输，通常由以下几个部分组成：

FIN（1 bit）：表示消息是否已完成，如果消息只占用一个帧，该位为1，否则为0。
RSV1、RSV2、RSV3（各占1 bit）：用于扩展使用，目前很少使用。
Opcode（4 bits）：表示消息类型，例如文本数据、二进制数据、连接关闭等。
Mask（1 bit）：指示是否对有效负载进行掩码处理。
Payload Length（7 bits或16 bits或64 bits）：表示有效负载的长度。
Masking Key（0或32 bits）：如果Mask位为1，表示用于对有效负载进行掩码处理的密钥。
Payload Data：实际的有效负载数据。

4. 数据传输：数据通过TCP连接进行传输。WebSocket建立在TCP协议之上，利用TCP的可靠性和双向通信能力来传输数据。客户端和服务器可以随时发送数据帧，数据帧可以被分割成多个TCP包进行传输，接收方会将这些包重新组装成完整的数据帧。

5. 心跳机制：为了保持连接的活跃状态，WebSocket使用心跳机制来定期发送心跳消息。这些心跳消息可以是空的数据帧或特定的控制帧，服务器可以通过检测心跳消息来确定连接是否仍然有效。

通过以上步骤，WebSocket协议能够在浏览器和服务器之间建立一个持久的、全双工的通信通道，实现实时的双向数据传输。相比传统的HTTP请求，WebSocket减少了通信的延迟，并且能够更高效地进行实时数据交换。

 WebSocket 协议 和 http 协议有什么区别

WebSocket协议和HTTP协议有以下几个主要区别：

1. 连接方式：HTTP协议是基于请求-响应模式的，每次请求都需要建立一个新的连接，并在响应完成后立即关闭连接。而WebSocket协议通过一次握手连接后，保持长久的双向连接，允许服务器主动向客户端推送数据，实现实时的双向通信。

2. 数据格式：HTTP协议传输的数据一般采用文本或二进制的形式，但每次请求和响应都需要包含HTTP头部信息，使得数据传输的开销较大。WebSocket协议支持以原始的二进制格式进行数据传输，减少了数据传输的开销，并且提供了更低的延迟。

3. 通信效率：由于HTTP协议每次请求都需要建立和关闭连接，对于频繁的数据交换场景效率较低。而WebSocket协议通过保持长连接，避免了多次建立连接的开销，从而提高了通信的效率。

4. 服务器推送：HTTP协议是一种单向的协议，客户端需要不断地向服务器发送请求以获取数据。而WebSocket协议支持服务器主动向客户端推送数据，服务器可以随时向客户端发送消息，实现实时的双向通信。

综上所述，WebSocket协议相比HTTP协议在实时通信和双向通信方面更加高效和灵活，适用于需要实时数据传输和双向交互的应用场景，如在线聊天、实时游戏、股票行情等。而HTTP协议则适用于传统的请求-响应模式的数据交换，如网页浏览、文件下载等。

## websockt 了解多少

1. 实现浏览器的实时推送问题，解决例如游戏/交易等有低延时诉求的场景
2. 通过 http 握手，保持一个基于 tcp 长链接

WebSocket 是一种基于 TCP 协议的网络通信协议，可以在客户端和服务器之间进行双向通信。相比传统的 HTTP 请求，WebSocket 具有更低的延迟和更高的效率。但是，由于同源策略的限制，**WebSocket 也会受到跨域问题的影响。**

WebSocket 通过在客户端和服务器之间建立持久连接来解决跨域问题。WebSocket 的握手过程与 HTTP 协议相似，客户端首先通过 HTTP 请求与服务器建立连接，然后服务器返回一个握手响应，表示连接已经建立成功。**在握手完成后，客户端和服务器之间就可以通过该连接进行双向通信，不受同源策略的限制。**

需要注意的是，WebSocket 协议本身并没有限制跨域请求，**但是在实际使用中，服务器通常会限制 WebSocket 连接的来源**。这是出于安全性考虑，避免恶意网站通过 WebSocket 连接获取敏感信息。因此，在使用 WebSocket 进行跨域通信时，需要确保服务器允许来自指定域名或 IP 地址的连接。

ebSocket 同源限制是啥？

WebSocket 通信协议本身不受同源策略限制，因为 WebSocket 是一个独立的协议。但是在建立 WebSocket 连接时，需要进行握手，握手时会发送 HTTP 请求头，因此受到同源策略的限制。需要满足以下条件才能建立 WebSocket 连接：

* 协议头必须为 "ws://" 或 "wss://"（安全的 WebSocket）

* 域名和端口必须与当前网页完全一致

如果以上条件不满足，浏览器将不允许建立 WebSocket 连接。

于请求头的问题

在建立WebSocket连接时，需要添加`Upgrade`头和`Connection`头，其中Upgrade头指明这是一个WebSocket请求，Connection头指明连接方式为升级连接（upgrade）。
服务器如果同意升级，则会返回 101 状态码，表示升级成功，此时 WebSocket 连接建立成功，双方就可以通过该连接进行双向通信。这个过程与同源策略无关，因此 WebSocket 不会受到同源策略的限制。

new WebSocket(url) 创建 WebSocket 对象时，会自动添加 Upgrade 头和 Connection 头。这是因为在 WebSocket 协议中，这两个头部是必需的，用于告知服务器客户端希望建立 WebSocket 连接。
示例代码如下：

```js
const socket = new WebSocket('ws://localhost:8080')
```

此外，在WebSocket请求中也可以添加一些自定义的请求头，例如：

```js
const socket = new WebSocket('ws://localhost:8080', {
  headers: {
    'X-Custom-Header': 'hello',
    'Y-Custom-Header': 'world'
  }
})
```

立一个 WebSocket 连接需要以下步骤

**1. 创建一个 WebSocket 对象**

```js
const socket = new WebSocket('ws://localhost:8080')
```

**2. 监听 WebSocket 事件**
WebSocket 对象是一个 EventTarget 对象，它可以监听多个事件。常见的事件有 open、message、error 和 close。

* open 事件：WebSocket 连接建立成功时触发。

```js
socket.addEventListener('open', event => {
  console.log('WebSocket 连接已建立')
})
```

* message 事件：WebSocket 收到消息时触发。

```js
socket.addEventListener('message', event => {
  console.log(`收到消息：${event.data}`)
})
```

* error 事件：WebSocket 连接出错时触发。

```js
socket.addEventListener('error', event => {
  console.error('WebSocket 连接出错', event)
})
```

* close 事件：WebSocket 连接关闭时触发。

```js
socket.addEventListener('close', event => {
  console.log('WebSocket 连接已关闭')
})
```

以上是建立 WebSocket 连接的基本步骤。需要注意的是，在使用 WebSocket 协议时，服务器端也需要提供相应的支持。

务端支持

要支持 WebSocket，服务器需要在接收到客户端 WebSocket 握手请求时，返回符合 WebSocket 协议规范的响应。在 Node.js 中，我们可以使用 ws 模块来实现 WebSocket 服务器。以下是一个简单的 WebSocket 服务器的示例代码：

```js
const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`)

    // Echo the message back to the client
    socket.send(`Echo: ${message}`)
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})
```

需要注意的是，在生产环境中，我们需要使用 HTTPS 协议来保证 WebSocket 的安全性。同时，我们还需要注意处理异常情况，例如客户端断开连接等。

其中 `ws` 不是 Node.js 的内置模块，它是一个第三方模块，可以使用 npm 安装。在 Node.js 应用中使用 WebSocket 时，需要先安装 ws 模块。可以使用以下命令进行安装：

```
npm install ws
```

务端如何限制链接源？

在 WebSocket 建立连接的时候，可以通过检查请求的 Origin 头部信息来限制访问源。下面是一个简单的 Node.js 示例代码：

```js
const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (ws, req) => {
  const { origin } = req.headers
  // 判断请求的 origin 是否允许连接
  if (origin === 'https://www.example.com') {
    // 允许连接
    console.log('Connection allowed from', origin)
    ws.send('Connection allowed')
  } else {
    // 拒绝连接
    console.log('Connection refused from', origin)
    ws.close()
  }
})
```

ws://" 与 "wss://" 有啥区别？

"ws://" 和 "wss://" 都是 WebSocket 协议的 URL 前缀，它们之间的区别在于传输层协议的不同。

"ws://" 使用的是普通的 HTTP 协议作为传输层协议，在传输过程中数据是明文的，容易被中间人攻击篡改数据，存在安全风险。

"wss://" 使用的是加密的 SSL/TLS 协议作为传输层协议，在传输过程中数据是加密的，更加安全。但是因为要进行 SSL/TLS 握手等复杂过程，所以 "wss://" 的连接建立时间和数据传输速度会比 "ws://" 慢一些。

因此，如果数据传输需要保密性，建议使用 "wss://"，否则可以使用 "ws://"。

## websocket 断联之后如何重连，且保证断链期间数据不丢失 {#websocket-reconnect}

实现 WebSocket 的自动重连并保证断连期间数据不丢失，通常需要在客户端实现一些机制来管理连接状态、定时重试以及缓存未成功发送的消息。以下是一个简单的步骤和策略指南：

 1. 监听连接状态

首先，你需要监听 WebSocket 连接的各种事件，以便知道何时发生了断连，并根据这些事件来触发重连逻辑。

* `onclose`: 当 WebSocket 连接关闭时，触发重连逻辑。
* `onerror`: 出现错误时，也可视为一个触发重连的信号。
* `onopen`: 连接成功时，清除重试计数器和缓存的数据（如果之前成功发送了）。

 2. 实现重连逻辑

* **使用指数退避算法**来延迟重连尝试，避免短时间内频繁重连。
* 例如，第一次重连延迟 1 秒，第二次 2 秒，然后 4 秒，最大延迟设置为 1 分钟。
* 在每次重连时，重置 WebSocket 对象并重新发起连接。

 3. 缓存数据

* **发送数据前检查连接状态**：如果 WebSocket 处于非开放状态，将数据缓存起来，待连接恢复后再发送。
* **使用队列存储待发送数据**：便于按顺序发送，保证数据的完整性和顺序。

 4. 发送缓存数据

* 在连接成功的回调（`onopen`事件）中，检查是否有缓存的数据，如果有，则遍历队列发送。

 示例代码

下面是一个示范代码片段：

```javascript
let ws
let retryInterval = 1000 // 初始重连间隔为 1 秒
const maxInterval = 60000 // 最大间隔为 1 分钟
const messageQueue = [] // 数据缓存队列

function connect () {
  ws = new WebSocket('wss://your-websocket-url')

  ws.onopen = function () {
    console.log('WebSocket connected')
    retryInterval = 1000 // 重置重连间隔
    sendMessageQueue() // 尝试发送缓存中的数据
  }

  ws.onclose = function () {
    console.log('WebSocket disconnected, attempting to reconnect...')
    setTimeout(connect, retryInterval)
    retryInterval = Math.min(retryInterval2, maxInterval) // 指数退避
  }

  ws.onerror = function (error) {
    console.error('WebSocket error:', error)
    ws.close() // 确保触发 onclose 事件
  }

  ws.onmessage = function (message) {
    // 处理接收到的数据
  }
}

function sendMessage (data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data)
  } else {
    console.log('WebSocket is not open. Queuing message.')
    messageQueue.push(data) // 缓存待发送数据
  }
}

function sendMessageQueue () {
  while (messageQueue.length > 0) {
    const data = messageQueue.shift() // 获取并移除队列中的第一个元素
    sendMessage(data) // 尝试再次发送
  }
}

connect() // 初始化连接
```

这个示例实现了基本的重连逻辑和数据缓存策略。在实际应用中，根据实际需求对这些逻辑进行扩展和定制化是很有必要的，尤其是数据缓存和发送逻辑，可能需要结合业务特点进行更复杂的处理。

特别是数据缓存这个场景， 如果有多个 webscoket 数据， 建议使用 `indexedDB` 做一个系统级别的数据管理。
