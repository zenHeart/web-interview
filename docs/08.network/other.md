# 杂项

## 弱网检测该如何做

在 JavaScript 中，可以通过以下几种方式进行弱网检测：

**一、监测网络连接状态**

1. 使用`navigator.onLine`属性：这个属性可以判断浏览器是否处于在线状态。当网络连接中断时，`navigator.onLine`会变为`false`；当网络连接恢复时，它会变为`true`。

* 示例代码：

```javascript
function checkNetworkStatus () {
  if (navigator.onLine) {
    console.log('网络连接正常')
  } else {
    console.log('网络连接中断')
  }
}

window.addEventListener('online', checkNetworkStatus)
window.addEventListener('offline', checkNetworkStatus)
```

2. 使用`online`和`offline`事件：可以监听`online`和`offline`事件来检测网络连接状态的变化。

* 示例代码与上述类似，在事件处理函数中执行相应的操作。

**二、测量网络延迟和带宽**

1. 使用`XMLHttpRequest`或`fetch`进行请求：可以发送一个小的请求到服务器，测量请求的响应时间。如果响应时间较长，可能表示网络状况不佳。

* 示例代码：

```javascript
function measureNetworkLatency () {
  const startTime = performance.now()
  fetch('small-test-file.txt')
    .then(() => {
      const endTime = performance.now()
      const latency = endTime - startTime
      if (latency > 500) {
        console.log('网络可能较慢')
      } else {
        console.log('网络状况良好')
      }
    })
    .catch(() => {
      console.log('网络连接问题')
    })
}

measureNetworkLatency()
```

2. 使用`Web Performance API`：可以使用`window.performance`对象来获取页面加载和资源请求的性能数据，包括网络延迟和带宽信息。

* 例如，可以通过`performance.getEntriesByType('navigation')[0].responseEnd - performance.getEntriesByType('navigation')[0].requestStart`来获取页面加载的总时间，包括网络延迟。

**三、模拟弱网环境进行测试**

1. 使用浏览器开发者工具：现代浏览器的开发者工具通常提供了网络模拟功能，可以模拟不同的网络条件，如慢速 3G、2G 等，以测试应用在弱网环境下的表现。

2. 使用第三方库：有一些专门的网络模拟库，如`Fiddler`、`Charles Proxy`等，可以模拟各种网络状况，帮助进行弱网测试。

总之，弱网检测可以通过监测网络连接状态、测量网络延迟和带宽以及模拟弱网环境等方式来实现。根据具体的应用场景和需求，可以选择合适的方法来检测网络状况，并采取相应的措施来优化应用在弱网环境下的性能和用户体验。

## Protobuf 相关知识

`Protobuf（Protocol Buffers）`是由 Google 开发的一种轻量级、高效的数据交换格式，它被用于结构化数据的序列化、反序列化和传输。相比于 XML 和 JSON 等文本格式，Protobuf 具有更小的数据体积、更快的解析速度和更强的可扩展性。
Protobuf 的核心思想是使用协议（Protocol）来定义数据的结构和编码方式。使用 Protobuf，可以先定义数据的结构和各字段的类型、字段等信息，然后使用Protobuf提供的编译器生成对应的代码，用于序列化和反序列化数据。由于 Protobuf 是基于二进制编码的，因此可以在数据传输和存储中实现更高效的数据交换，同时也可以跨语言使用。

相比于 XML 和 JSON，Protobuf 有以下几个优势：

1. **可扩展性：** Protobuf 支持向已有的消息类型中添加新的字段，而不会破坏对旧数据的兼容性。这使得系统能够逐渐演进而不需要修改所有的代码。

2. **高效性：** 相对于一些文本格式的序列化（如XML和JSON），Protobuf 使用二进制格式，因此更为紧凑，更高效地进行数据存储和传输。

3. **语言中立：** Protobuf 支持多种编程语言，包括但不限于C++, Java, Python, Go等，这使得不同语言的系统能够使用相同的数据结构进行通信。

4. **自动代码生成：** Protobuf 通过使用 .proto 文件定义消息结构，然后利用相应语言的编译器生成与消息结构对应的代码。这简化了开发过程，减少了手动编写序列化和反序列化代码的工作。

5. **支持多种数据类型：** Protobuf 提供了丰富的基本数据类型，包括整数、浮点数、布尔值、字符串等，以及可以嵌套的消息类型，使得可以构建复杂的数据结构。

6. **适用于网络通信：** Protobuf 在网络通信领域广泛应用，特别是在 gRPC 中作为默认的消息序列化格式。

**可以参考文档**：[资料](https://zhuanlan.zhihu.com/p/141415216)

## web 应用中如何对静态资源加载失败的场景做降级处理 {#p0-assets-expired}

在 Web 应用中，可以使用以下方法对静态资源加载进行降级处理，即在某个资源加载失败时使用备用的静态资源链接：

1. 使用多个 CDN 链接：在 HTML 中使用多个静态资源链接，按照优先级顺序加载，如果其中一个链接加载失败，则尝试加载下一个链接。

```html
<script src="https://cdn1.example.com/script.js"></script>
<script src="https://cdn2.example.com/script.js"></script>
<script src="https://cdn3.example.com/script.js"></script>
```

在加载 JavaScript 脚本时，浏览器会按照给定的顺序尝试加载各个链接，如果某个链接加载失败，浏览器会自动尝试加载下一个链接。

2. 使用备用资源路径：在 JavaScript 中使用备用的资源路径，当主要的资源路径加载失败时，切换到备用路径。

```javascript
const script = document.createElement('script')
script.src = 'https://cdn.example.com/script.js'
script.onerror = function () {
  // 主要资源加载失败，切换到备用资源路径
  script.src = 'https://backup.example.com/script.js'
}
document.head.appendChild(script)
```

在加载 JavaScript 脚本时，可以通过监听 `onerror` 事件，在主要资源加载失败时切换到备用资源路径，保证资源的可靠加载。

3. 使用动态加载和错误处理：使用 JavaScript 动态加载静态资源，并处理加载失败的情况。

```javascript
function loadScript (src, backupSrc) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = function () {
      if (backupSrc) {
        // 主要资源加载失败，切换到备用资源路径
        script.src = backupSrc
      } else {
        reject(new Error('Failed to load script: ' + src))
      }
    }
    document.head.appendChild(script)
  })
}

// 使用示例
loadScript('https://cdn.example.com/script.js', 'https://backup.example.com/script.js')
  .then(function () {
    // 资源加载成功
  })
  .catch(function (error) {
    // 资源加载失败
    console.error(error)
  })
```

通过动态加载脚本的方式，可以在资源加载失败时切换到备用资源路径或处理加载错误。

除了前面提到的方法外，还有以下一些降级处理的方法：

4. 本地备份资源：在 Web 应用的服务器上存储备份的静态资源文件，并在主要资源加载失败时，从本地服务器上加载备份资源。这种方法需要在服务器上维护备份资源的更新和一致性。

5. 使用浏览器缓存：如果静态资源被浏览器缓存，则在资源加载失败时，浏览器可以使用缓存中的资源。可以通过设置合适的缓存策略，例如设置资源的 Cache-Control 头字段，让浏览器缓存资源并在需要时从缓存中加载。

6. 使用 Service Worker：使用 Service Worker 技术可以在浏览器中拦截网络请求，从而实现更高级的降级处理。当主要资源加载失败时，可以使用 Service Worker 拦截请求并返回备用资源，或者动态生成代替资源。

7. 使用资源加载管理工具：使用像 Webpack 这样的资源加载管理工具，可以通过配置多个资源入口点和插件来实现资源加载的灵活控制。在资源加载失败时，可以通过配置自动切换到备用资源或通过插件实现自定义的降级逻辑。

这些方法可以根据具体的需求和场景选择适合的降级处理策略。降级处理的目的是确保网页应用的正常运行，提高用户体验，并减少对单一资源的依赖性。
