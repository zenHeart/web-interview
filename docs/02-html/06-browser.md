# 浏览器原理

## 浏览器架构

* 浏览器进程作为最重要的进程负责大多数页签外部的工作，包括地址栏显示、网络请求、页签状态管理等
* 不同的渲染进程负责不同的站点渲染工作，渲染进程间彼此独立
* 渲染进程在渲染页面的过程中会通过浏览器进程获取站点资源，只有安全的资源才会被渲染进程接收到
* 渲染进程中主线程负责除了图像生成外绝大多数工作，如何减少主线程上代码的运行是交互性能优化的关键
* 渲染进程中的合成线程和栅格线程负责图像生成，利用分层技术可以优化图像生成的效率
* 当用户与页面发生交互时，事件的传播途径从浏览器进程到渲染进程的合成线程再根据事件监听的区域决定是否要传递给渲染进程的主线程处理

* [inside browser](https://developer.chrome.com/blog/inside-browser-part1)

## html5有哪些新特性移除了那些元素？{#p0-html5-new-features}

## 如何处理HTML5新标签的浏览器兼容问题？

## 如何区分 HTML 和 HTML5?

## url 解析到渲染过程分析?

1. URL 解析
2. DNS 解析
3. TCP 连接建立
4. 发送 HTTP 请求
5. 服务器处理请求并响应
6. 浏览器解析响应
   * HTML 解析
   * CSS 解析
   * JavaScript 解析
7. 构建 DOM 树和 CSSOM 树
8. 生成渲染树
9. 布局（Layout）
10. 绘制（Paint）

* [The Rendering Critical Path](https://www.chromium.org/developers/the-rendering-critical-path/)
* [url 解析](https://juejin.cn/post/6935232082482298911)

## 如何构建 DOM Tree 的

## 常见浏览器内核有哪些，有什么区别

## repaint 和 reflow 区别

## 如何避免重拍和重绘

## 浏览器主要组成部分

## 宏任务和微任务

## 如何实现浏览器内多个标签页之间的通信? {#p0-tab-communicate}

在浏览器内多个标签页之间实现通信可以通过以下几种方式：

1. 使用 Broadcast Channel API：Broadcast Channel API 是 HTML5 提供的一种跨页面通信的机制。通过该 API，可以在不同的标签页之间发送消息，实现实时的双向通信。

2. 使用 LocalStorage 或 SessionStorage：LocalStorage 和 SessionStorage 是浏览器提供的本地存储机制。可以通过在一个标签页中修改 LocalStorage 或 SessionStorage 中的数据，然后在其他标签页中监听该数据的变化，实现跨标签页的通信。

3. 使用 SharedWorker：SharedWorker 是一种特殊的 Web Worker，可以被多个浏览器标签页所共享。通过 SharedWorker，不同标签页可以通过消息传递进行通信。

4. 使用 Cookies：通过设置同一个域名下的 Cookie，不同的标签页可以共享这些 Cookie 数据。可以在一个标签页中设置 Cookie，然后在其他标签页中读取该 Cookie 实现通信。

5. 使用 Window.postMessage：Window.postMessage 方法可以在不同的浏览器窗口之间进行跨域通信。可以通过在一个窗口中使用 postMessage 方法向其他窗口发送消息，接收窗口通过监听 message 事件来接收并处理消息。

 Broadcast Channel API

Broadcast Channel API 是 HTML5 提供的一种跨页面通信的机制，它可以在同一个域名下的多个浏览器标签页之间进行实时的双向通信。

通过 Broadcast Channel API，你可以创建一个通道（channel），然后不同的标签页可以通过这个通道发送和接收消息。每个标签页都可以监听通道中的消息，并对接收到的消息做出相应的处理。

使用 Broadcast Channel API 实现多页签之间的通信的步骤如下：

1. 创建一个 BroadcastChannel 对象，并指定一个唯一的通道名称：

```javascript
const channel = new BroadcastChannel('channelName')
```

2. 在一个标签页中发送消息：

```javascript
channel.postMessage('message')
```

3. 在其他标签页中监听消息并做出响应：

```javascript
channel.addEventListener('message', event => {
  const message = event.data
  // 处理接收到的消息
})
```

通过 Broadcast Channel API，不同的标签页可以实时地收发消息，从而实现多页签之间的通信。这对于需要在多个标签页之间共享状态、同步数据或实现协作等场景非常有用。请注意，Broadcast Channel API 只在同一域名下的标签页之间有效，不支持跨域通信。

 SharedWorker 实现多页签之间通信

SharedWorker 是 HTML5 提供的一种多页签之间共享的 Web Worker。通过 SharedWorker，多个浏览器标签页可以共享一个后台线程，实现跨页面的通信和数据共享。

下面是一个使用 SharedWorker 实现多页签之间通信的示例：

在一个 JavaScript 文件（worker.js）中创建 SharedWorker：

```javascript
// worker.js

// 在共享 Worker 中监听消息
self.onconnect = function (event) {
  const port = event.ports[0]

  // 接收消息
  port.onmessage = function (event) {
    const message = event.data

    // 处理消息
    // ...

    // 发送消息
    port.postMessage('Response from SharedWorker')
  }

  // 断开连接时的处理
  port.onclose = function () {
    // ...
  }
}
```

在多个页面中分别引入 SharedWorker，并进行通信：

```javascript
// 页面1
var sharedWorker = new SharedWorker('worker.js')

// 获取共享 Worker 的端口
var port = sharedWorker.port

// 发送消息
port.postMessage('Message from Page 1')

// 接收消息
port.onmessage = function (event) {
  const message = event.data

  // 处理接收到的消息
  // ...
}

// 页面2
var sharedWorker = new SharedWorker('worker.js')

// 获取共享 Worker 的端口
var port = sharedWorker.port

// 发送消息
port.postMessage('Message from Page 2')

// 接收消息
port.onmessage = function (event) {
  const message = event.data

  // 处理接收到的消息
  // ...
}
```

以上示例中，`worker.js` 创建了一个 SharedWorker，它会监听来自多个页面的连接请求，并为每个连接创建一个端口（port）。每个页面通过创建 SharedWorker 实例，并通过获取端口对象进行消息的发送和接收。

通过 SharedWorker，页面1和页面2可以实现跨页签的通信。它们可以向共享 Worker 发送消息，并监听共享 Worker 返回的消息，从而实现跨页面的数据交互和共享。

需要注意的是，SharedWorker 需要在支持 SharedWorker 的浏览器中运行，而且需要在服务器环境下运行，即通过 HTTP 或 HTTPS 协议访问页面才能正常工作。

 Window.postMessage 使用示例

`Window.postMessage()` 是 HTML5 提供的一种在不同窗口之间进行跨域通信的方法。它可以安全地向其他窗口发送消息，并在接收方窗口触发消息事件。

下面是一个使用 `postMessage()` 进行跨窗口通信的示例：

在发送消息的窗口中：

```javascript
// 发送消息到目标窗口
window.postMessage('Hello, World!', 'https://example.com')
```

在接收消息的窗口中：

```javascript
// 监听消息事件
window.addEventListener('message', function (event) {
  // 确保消息来自指定域名
  if (event.origin === 'https://example.com') {
    const message = event.data

    // 处理接收到的消息
    console.log('Received message:', message)
  }
})
```

在发送消息的窗口中，使用 `window.postMessage()` 发送消息，第一个参数是要发送的消息内容，第二个参数是目标窗口的源（origin），可以是 URL、域名或通配符 '*'。

在接收消息的窗口中，通过监听 `message` 事件，可以捕获来自其他窗口的消息。在事件处理程序中，通过 `event.origin` 可以判断消息来自哪个域名。可以根据需要进行安全性检查，确保只接收来自指定域名的消息。

需要注意的是，`postMessage()` 通常用于跨窗口通信，可以在不同窗口或不同域名之间进行通信。在使用时需要确保目标窗口的源是可信任的，以防止安全漏洞。同时，接收消息的窗口需要显式地监听消息事件，并进行相应的处理。

## 常见的浏览器内核有哪些？{#p0-browser-kernel}

## jS 浏览器事循环有哪些使用案例 {#p2-js-event-loop}

**一、异步操作处理**

1. 网络请求：

* 当进行 AJAX 请求时，浏览器不会阻塞等待响应，而是继续执行其他代码。一旦请求完成，相应的回调函数会被添加到任务队列中，等待事件循环处理。
* 例如，使用`XMLHttpRequest`或`fetch`进行网络请求：

```javascript
function makeAjaxRequest (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText)
      } else {
        reject(new Error(xhr.statusText))
      }
    }
    xhr.onerror = function () {
      reject(new Error('Network error'))
    }
    xhr.send()
  })
}

makeAjaxRequest('https://example.com/data')
  .then((data) => {
    console.log('Received data:', data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

* 在这个例子中，网络请求是异步的，不会阻塞主线程。当请求完成后，对应的`then`或`catch`回调函数会被执行。

2. 定时器：

* `setTimeout`和`setInterval`函数会在指定的时间后将回调函数添加到任务队列中。
* 例如：

```javascript
console.log('Start')
setTimeout(() => {
  console.log('Timeout after 1 second')
}, 1000)
console.log('End')
```

* 输出结果为“Start”、“End”，然后在 1 秒后输出“Timeout after 1 second”。这表明`setTimeout`的回调函数是在主线程执行完其他代码后，由事件循环处理执行的。

**二、用户交互响应**

1. 按钮点击事件：

* 当用户点击按钮时，会触发相应的点击事件处理程序。这些处理程序会被添加到任务队列中，等待事件循环处理。
* 例如：

```html
 <button id="myButton">Click me</button>
 <script>
 document.getElementById("myButton").addEventListener("click", function () {
 console.log("Button clicked");
 });
 </script>
```

* 当用户点击按钮时，“Button clicked”会被输出。这种方式确保了用户交互不会阻塞主线程，使得界面保持响应。

2. 输入框实时验证：

* 可以使用事件循环来实现输入框的实时验证。当用户在输入框中输入内容时，触发`input`事件，相应的验证函数会被添加到任务队列中，进行异步验证。
* 例如：

```html
 <input type="text" id="myInput" />
 <script>
 document.getElementById("myInput").addEventListener("input", function () {
 const value = this.value;
 setTimeout(() => {
 if (value.length < 5) {
 console.log("Input too short");
 } else {
 console.log("Input valid");
 }
 }, 500);
 });
 </script>
```

* 在这个例子中，每次用户输入时，会在 500 毫秒后进行验证。如果输入长度小于 5，则输出“Input too short”；否则输出“Input valid”。

**三、动画和界面更新**

1. 动画循环：

* 使用`requestAnimationFrame`函数可以创建一个动画循环，在每一帧更新动画状态并重新绘制界面。这个函数会在浏览器下一次重绘之前调用指定的回调函数，确保动画的流畅性。
* 例如：

```javascript
function animate () {
  // 更新动画状态
  // 例如，移动一个元素的位置
  element.style.left = parseInt(element.style.left) + 1 + 'px'

  //  if (
  //   /* 动画未完成条件 */

//  ) {
//  requestAnimationFrame(animate);
//  }
}

requestAnimationFrame(animate)
```

* 在这个例子中，`animate`函数会在每一帧更新元素的位置，直到动画完成。`requestAnimationFrame`确保了动画在浏览器的最佳时机进行更新，避免了不必要的重绘和性能浪费。

2. 界面更新：

* 在复杂的界面应用中，可以使用事件循环来异步更新界面，避免阻塞主线程。例如，当有大量数据需要渲染到界面上时，可以将渲染过程分成小块，每次在事件循环的空闲时间进行一部分渲染。
* 例如：

```javascript
function updateUI (data) {
  const chunkSize = 10
  let index = 0

  function renderChunk () {
    for (let i = index; i < index + chunkSize && i < data.length; i++) {
      // 渲染数据的一部分到界面上
      const item = data[i]
      const element = document.createElement('div')
      element.textContent = item
      document.body.appendChild(element)
    }
    index += chunkSize

    if (index < data.length) {
      requestIdleCallback(renderChunk)
    }
  }

  requestIdleCallback(renderChunk)
}

const largeData = Array.from({ length: 1000 }, (_, i) => `Item ${i}`)
updateUI(largeData)
```

* 在这个例子中，`updateUI`函数将大量数据分成小块进行渲染，每次在浏览器空闲时间（使用`requestIdleCallback`）进行一部分渲染，避免了长时间阻塞主线程，使得界面保持响应。

## 什么是文档的预解析 {#p0-pre-parser}

文档的预解析（Document Preloading）是浏览器在解析 HTML 文档时的一个优化技术，用于提前获取页面所需的外部资源，如样式表、脚本、字体等。通过在解析过程中预先获取这些资源，可以加快页面加载速度和渲染时间。

浏览器在解析 HTML 文档时，会遇到外部资源的引用，比如 `<link>` 标签引入的样式表和 `<script>` 标签引入的脚本。在进行实际网络请求获取这些资源之前，浏览器可以通过预解析的方式提前发起请求并获取资源内容。

文档的预解析过程会在 HTML 解析器解析到特定标签时触发，浏览器会检查这些标签是否存在可预解析的资源，然后以异步方式发起请求并下载资源。预解析的资源在下载完成后会被浏览器缓存起来，以便在后续的渲染过程中快速加载和使用。

预解析的好处是减少页面加载时间，因为浏览器可以在主 HTML 文档下载和解析过程中并行获取其他资源，而不需要等待主文档解析完毕才开始下载这些资源。这样可以提高页面的渲染速度和用户体验。

文档的预解析是由浏览器自动完成的优化过程，无需开发人员显式地进行操作。浏览器会根据特定的规则和算法，在解析 HTML 文档的过程中自动触发预解析行为。

**要让浏览器正确进行文档的预解析，可以遵循以下一些最佳实践**：

1. 合理设置资源的引入方式：将样式表放在 `<head>` 标签内，并尽量将脚本放在 `<body>` 标签底部，这样可以使浏览器更早地开始解析和预解析文档的其他部分。

2. 使用合适的资源引入标签：使用 `<link>` 标签来引入样式表，使用 `<script>` 标签来引入脚本文件，这样可以让浏览器更容易识别和处理这些资源的预解析。

3. 合理设置资源的属性和关联：为 `<link>` 标签设置 `rel` 属性，用于指定资源的关联关系，如 `stylesheet` 表示关联的是样式表；为 `<script>` 标签设置 `async` 或 `defer` 属性，用于控制脚本的执行时机。

4. 减少不必要的资源引入：避免引入无用的外部资源，减少需要预解析的资源数量，可以提高预解析的效果。

5. 合理配置服务器响应头：使用适当的缓存策略和 HTTP 响应头，可以帮助浏览器更好地处理资源的预解析和缓存。

需要注意的是，浏览器在进行文档预解析时会根据具体的算法和策略进行优化，不同浏览器可能会有略微不同的行为。此外，预解析并不一定在所有情况下都能带来明显的性能提升，具体效果会受到网络环境、服务器响应时间和页面结构等因素的影响。因此，在实际开发中，除了依赖浏览器的自动预解析外，还可以采用其他优化手段，如合并和压缩资源、使用缓存等，以提升页面加载和渲染的性能。

## 浏览器有读写能力吗？

在一般情况下，浏览器本身不具备直接的读写能力。浏览器是用于显示网页内容的客户端应用程序，其主要功能是发送HTTP请求，接收和渲染服务器返回的HTML、CSS和JavaScript等资源。然而，浏览器提供了一些特定的API，允许开发人员在浏览器中进行读写操作。

下面是一些允许浏览器进行读写操作的API：

1. Web Storage API：通过localStorage和sessionStorage提供了在浏览器中存储数据的能力。开发人员可以使用这些API将数据以键值对的形式存储在浏览器本地，读取和修改数据。

2. IndexedDB API：IndexedDB是浏览器提供的一种高性能的非关系型数据库API。开发人员可以使用IndexedDB API在浏览器中创建和管理数据库，进行复杂的数据存储、查询和索引操作。

3. File API：File API允许浏览器读取和处理本地文件。开发人员可以使用 File API选择本地文件并读取其内容，也可以通过Blob 将数据保存本地文件。

需要注意的是，浏览器的读写能力受到一些限制，如同源策略、跨域限制等。为了保障安全性和用户隐私，浏览器会限制对本地文件系统的直接读写访问。读写操作通常是通过浏览器提供的特定API进行，并且需要经过用户的授权和同意。

------------------------

**关于读写能力的讨论**：

读取是通过 FileReader: [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

写是通过 blob 实现： [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

但是这个写了之后， 要想保存在本地， 需要自己手动操作：

> 现代浏览器支持File API，它提供了通过JavaScript读取和操作本地文件的能力。
> 使用File API，您可以通过文件选择对话框选择本地文件，并使用JavaScript读取文件内容、将文件内容写入到本地等操作。但是需要注意的是，**出于安全性的考虑，浏览器限制了对本地文件系统的访问权限，只能在用户主动选择文件的情况下进行操作**。

**示范**：
使用File API来读写本地文档的步骤如下：

1. 通过input元素创建文件选择对话框。在HTML中添加一个input元素，设置type属性为file，例如：

```html
<input type="file" id="fileInput">
```

2. 使用JavaScript获取选择的文件。在JavaScript中，通过访问input元素的files属性来获取选择的文件对象，例如：

```javascript
const fileInput = document.getElementById('fileInput')
const selectedFile = fileInput.files[0]
```

3. 读取文件内容。使用FileReader对象来读取文件内容。创建一个新的FileReader对象，然后使用它的readAsText()方法来读取文件内容，例如：

```javascript
const reader = new FileReader()
reader.onload = function (event) {
  const fileContent = event.target.result
  // 在这里对文件内容进行操作
}
reader.readAsText(selectedFile)
```

4. 对文件内容进行操作。在上一步的回调函数中，可以获取到文件的内容，然后可以对该内容进行任何需要的操作，例如将其显示在页面上或者发送到服务器。

5. 写入文件。如果需要将内容写入本地文件，可以使用FileWriter对象来实现。创建一个新的FileWriter对象，然后使用它的write()方法来写入内容，例如：

```javascript
const fileOutput = new Blob([fileContent], { type: 'text/plain' })
const downloadLink = document.createElement('a')
downloadLink.href = URL.createObjectURL(fileOutput)
downloadLink.download = 'output.txt'
downloadLink.click()
```

------

> 2024.05.12 作者更新

可以读写本地文件： 使用 file system api

文档请看： [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/File_System_API)
