# web api

web 下常用 api

## ajax

## fetch

## 请求对象

1. ajax
2. fetch

* 请求进度
* 文件上传

## getComputedStyle用法? {#p4-getcomputedstyle}

## 解释 cookies session storage local storage 的区别 ? {#p0-cookies-session-storage-local-storage}

## intersection observer api? {#p3-intersection-observer-api}

## ResizeObserver 作用是什么 {#p2-resizeobserver}

`ResizeObserver` 的作用是监测元素的尺寸变化。这是一种强大的 Web API，允许开发者在元素的尺寸发生改变时（无论是因为元素内容的变化、窗口大小的调整还是其他原因导致的尺寸改变），执行一些操作或布局更新。在过去，开发者通常需要依赖定时器或者窗口的 `resize` 事件来间接监测元素尺寸的变化，这种方法不仅不够精确，而且效率低下。`ResizeObserver` 提供了一种更为直接和高效的方式来响应尺寸变化。

 如何使用 `ResizeObserver`

使用 `ResizeObserver` 很简单，你只需要创建一个 `ResizeObserver` 实例，并为它提供一个回调函数。在回调函数中，你可以基于元素尺寸的变化来执行相应的操作。然后，使用 `observe` 方法来指定需要被观察尺寸变化的元素。

 示例代码

下面的示例代码展示了如何使用 `ResizeObserver` 来监测一个元素的尺寸变化，并在尺寸变化时输出新的尺寸信息：

```javascript
// 监测的目标元素
const targetElement = document.querySelector('.resizable')

// 创建 ResizeObserver 实例
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // entry.target 是被观察的元素
    // entry.contentRect 包含了元素的尺寸信息
    console.log('Element size changed:', entry.target)
    console.log(`New width: ${entry.contentRect.width}`)
    console.log(`New height: ${entry.contentRect.height}`)
  }
})

// 开始观察目标元素
resizeObserver.observe(targetElement)
```

 应用场景

`ResizeObserver` 的常见应用场景包括：

* **响应式布局**：当容器的尺寸改变时，动态调整内容或布局，提供更好的响应式设计。
* **图表和可视化**：在图表或数据可视化的容器大小改变时，重新绘制图表来适应新的尺寸。
* **动态元素（如弹出窗口和下拉菜单）**：监测并根据内容大小自动调整元素的尺寸。

## HTML5的离线储存怎么使用，工作原理能不能解释一下？{#p2-html5-offline-storage}

## Cookie和Session区别？{#p1-cookie-session-difference}

## 如何取消请求 {#p0-cancel-request}

## 如何批量触发多个请求 {#p2-batch-request}

## Long-Polling、Websockets 和 Server-Sent Event 之间有什么区别？

## 为何现在主流的图表库都是用的 canvas 方案， 而不是使用 svg， 是基于什么因素考量的呢 {#p4-canvas}

**一、SVG 的 GPU 加速特点**

1. 有限的自动加速

* SVG 图形通常由浏览器自动决定是否使用 GPU 加速。对于一些简单的 SVG 图形，浏览器可能不会启用 GPU 加速，因为在这种情况下，使用 CPU 进行渲染可能已经足够高效。
* 只有在处理较为复杂的 SVG 场景，如包含大量图形元素、复杂的变换或动画效果时，浏览器才有可能启用 GPU 加速。但这种加速的触发机制并不完全可控，取决于浏览器的实现和判断。

2. 依赖浏览器优化

* SVG 的 GPU 加速很大程度上依赖于浏览器的优化策略。不同的浏览器对 SVG 的 GPU 加速支持程度可能不同，这可能导致在不同的浏览器上 SVG 图形的性能表现不一致。
* 例如，一些现代浏览器可能会对特定的 SVG 特性（如滤镜效果、渐变等）进行优化并启用 GPU 加速，而其他浏览器可能没有这样的优化。

**二、Canvas 的 GPU 加速特点**

1. 更明确的控制

* 在 Canvas 中，可以通过一些特定的技术手段来明确地请求 GPU 加速。例如，使用 WebGL（基于 OpenGL ES 的 JavaScript API）与 Canvas 结合，可以直接利用 GPU 进行高性能的 3D 图形渲染。
* 对于 2D 图形，一些浏览器也提供了对 Canvas 的硬件加速支持，可以通过特定的浏览器设置或使用特定的图形库来启用。开发人员可以更直接地控制是否使用 GPU 加速，以及如何优化图形渲染以充分利用 GPU 的性能。

2. 高性能图形渲染

* Canvas 结合 GPU 加速可以实现非常高性能的图形渲染，尤其适用于复杂的游戏、数据可视化和动画效果。通过利用 GPU 的并行处理能力，可以快速地绘制大量的图形和进行复杂的图形变换。
* 例如，在数据可视化中，使用 Canvas 和 WebGL 可以实现大规模数据的实时渲染和交互，提供流畅的用户体验。

总的来说，Canvas 在利用 GPU 硬件加速方面通常具有更明确的控制和更高的性能潜力，而 SVG 的 GPU 加速则更多地依赖于浏览器的自动优化，且加速的范围和效果相对有限。但在实际应用中，选择使用 SVG 还是 Canvas 并考虑 GPU 加速，需要根据具体的应用场景、性能需求和开发技术栈来综合决定。

## canvas 是如何处理复杂事件交互的 {#p2-canvas-complex-event-interaction}

* created_at: 2024-10-30T00:25:45Z
* updated_at: 2024-10-30T00:25:46Z
* labels: web应用场景, TOP100互联网
* milestone: 高

**关键词**：canvas 事件交互

在 HTML5 的`canvas`中处理复杂事件交互可以通过以下方法实现：

**一、基本原理**

由于`canvas`只是一个像素绘制区域，本身并不像常规 HTML 元素那样具有内置的事件处理机制。所以需要通过以下方式来处理事件交互：

1. 监听整个文档或包含`canvas`的容器元素的事件。
2. 根据事件发生的坐标位置判断是否在`canvas`内部以及与特定图形的交互。

**二、具体步骤**

1. 获取`canvas`元素和绘图上下文：

 ```javascript
 const canvas = document.getElementById('myCanvas')
 const ctx = canvas.getContext('2d')
 ```

2. 监听容器元素的事件：

* 通常可以监听整个文档或包含`canvas`的父元素的鼠标事件（如`mousemove`、`mousedown`、`mouseup`等）和触摸事件（如`touchstart`、`touchmove`、`touchend`等）。
* 例如：

 ```javascript
 document.addEventListener('mousemove', handleMouseMove)
 ```

3. 事件处理函数：

* 在事件处理函数中，计算鼠标或触摸点在`canvas`中的坐标。
* 判断坐标是否在特定图形范围内，以确定是否发生了交互。
* 例如：

 ```javascript
 function handleMouseMove (event) {
   const rect = canvas.getBoundingClientRect()
   const mouseX = event.clientX - rect.left
   const mouseY = event.clientY - rect.top
 
   // 判断坐标是否在某个圆形范围内
   if (isPointInCircle(mouseX, mouseY)) {
     // 执行与圆形交互的逻辑
   }
 }
 ```

4. 判断坐标是否在图形内的函数：

* 根据不同的图形形状，编写相应的函数来判断坐标是否在图形内。
* 例如，对于圆形：

 ```javascript
 function isPointInCircle (x, y, circleX, circleY, radius) {
   const dx = x - circleX
   const dy = y - circleY
   return dx
 }
 ```

**三、处理复杂交互的策略**

1. 多个图形的交互：

* 可以维护一个图形对象的数组，在事件处理函数中遍历这个数组，判断与每个图形的交互。
* 例如：

 ```javascript
 const shapes = [
   { type: 'circle', x: 100, y: 100, radius: 50 },
   { type: 'rectangle', x: 200, y: 200, width: 100, height: 50 }
 ]
 
 function handleMouseMove (event) {
   const rect = canvas.getBoundingClientRect()
   const mouseX = event.clientX - rect.left
   const mouseY = event.clientY - rect.top
 
   for (const shape of shapes) {
     if (shape.type === 'circle' && isPointInCircle(mouseX, mouseY, shape.x, shape.y, shape.radius)) {
       // 圆形交互逻辑
     } else if (
       shape.type === 'rectangle' &&
 isPointInRectangle(mouseX, mouseY, shape.x, shape.y, shape.width, shape.height)
     ) {
       // 矩形交互逻辑
     }
   }
 }
 ```

2. 动态交互效果：

* 根据交互状态改变图形的外观、位置等属性，以实现动态效果。
* 例如，当鼠标悬停在圆形上时，改变圆形的颜色：

 ```javascript
 function handleMouseMove (event) {
   const rect = canvas.getBoundingClientRect()
   const mouseX = event.clientX - rect.left
   const mouseY = event.clientY - rect.top
 
   for (const shape of shapes) {
     if (shape.type === 'circle' && isPointInCircle(mouseX, mouseY, shape.x, shape.y, shape.radius)) {
       ctx.fillStyle = 'red'
     } else {
       ctx.fillStyle = 'blue'
     }
     drawShape(shape)
   }
 }

 function drawShape (shape) {
   if (shape.type === 'circle') {
     ctx.beginPath()
 
     ctx.fill()
   } else if (shape.type === 'rectangle') {
     ctx.fillRect(shape.x, shape.y, shape.width, shape.height)
   }
 }
 ```

通过以上方法，可以在`canvas`中实现较为复杂的事件交互处理，为用户提供丰富的交互体验。

## 介绍一下 URLSearchParams API {#p2-urlsearchparams}

`URLSearchParams`是 JavaScript 中的一个内置 API，用于处理 URL 的查询参数部分。它提供了一系列方法来方便地操作和获取 URL 中的查询参数。

**一、创建`URLSearchParams`对象**

1. **从现有 URL**：

* 可以从当前页面的 URL 中提取查询参数来创建`URLSearchParams`对象。例如：

```javascript
const urlParams = new URLSearchParams(window.location.search)
```

* 这里使用`window.location.search`获取当前页面 URL 的查询字符串，然后将其传递给`URLSearchParams`构造函数来创建一个新的对象。

2. **从字符串**：

* 也可以直接从一个查询字符串创建`URLSearchParams`对象。例如：

```javascript
const queryString = 'param1=value1&param2=value2'
const urlParams = new URLSearchParams(queryString)
```

**二、主要方法**

1. **`get()`方法**：

* 用于获取指定参数的第一个值。例如：

```javascript
const value = urlParams.get('paramName')
```

* 如果参数不存在，`get()`方法将返回`null`。

2. **`set()`方法**：

* 设置指定参数的值。如果参数不存在，将添加一个新的参数。例如：

```javascript
urlParams.set('paramName', 'newValue')
```

3. **`append()`方法**：

* 向现有参数添加一个新的值。如果参数不存在，将添加一个新的参数。例如：

```javascript
urlParams.append('paramName', 'anotherValue')
```

4. **`delete()`方法**：

* 删除指定参数。例如：

```javascript
urlParams.delete('paramName')
```

5. **`has()`方法**：

* 检查是否存在指定参数。返回一个布尔值。例如：

```javascript
const hasParam = urlParams.has('paramName')
```

6. **遍历参数**：

* 可以使用`forEach()`方法遍历所有参数。例如：

```javascript
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})
```

**三、优点和用途**

1. **方便性**：

* `URLSearchParams`提供了一种简洁、直观的方式来处理 URL 查询参数，避免了手动解析和拼接查询字符串的繁琐过程。

2. **兼容性**：

* 它在现代浏览器中广泛支持，可以在各种前端开发场景中使用。

3. **动态操作**：

* 可以方便地在运行时修改查询参数，例如在单页应用程序中根据用户操作动态更新 URL 的查询参数。

4. **与 URL 对象结合**：

* 可以与`URL`对象结合使用，方便地构建和操作完整的 URL。例如：

```javascript
const url = new URL('https://example.com')
url.searchParams.set('paramName', 'value')
console.log(url.toString())
```

总之，`URLSearchParams`是一个强大而方便的 API，用于处理 URL 的查询参数，在前端开发中具有广泛的应用。

## 剪切板方法 {#p1-clipboard-methods}

**关键词**：document.execCommand('copy')、navigator.clipboard API

在浏览器中，可以通过以下几种方式实现剪切板复制内容的功能：

**一、使用`document.execCommand('copy')`**

1. **基本用法**：

* 在 JavaScript 中，可以使用`document.execCommand('copy')`方法来执行复制操作。但这个方法需要先选中页面上的一部分内容或者将内容放入一个可编辑的元素中。
* 例如：

 ```html
 <button onclick="copyToClipboard()">复制</button>
 <div id="contentToCopy">这是要复制的内容</div>
 ```

 ```javascript
 function copyToClipboard () {
   const content = document.getElementById('contentToCopy').textContent
   const tempInput = document.createElement('input')
   tempInput.value = content
   document.body.appendChild(tempInput)
   tempInput.select()
   document.execCommand('copy')
   document.body.removeChild(tempInput)
 }
 ```

* 在这个例子中，当用户点击按钮时，将获取要复制的内容，创建一个临时的`<input>`元素，将内容放入其中，选中该元素的内容，然后执行复制操作，最后移除临时元素。

2. **限制和兼容性**：

* 这种方法在一些浏览器中可能存在兼容性问题，并且需要用户交互（如点击按钮）才能触发复制操作。
* 此外，现代浏览器对于使用`document.execCommand`的限制越来越多，因为它可能存在安全风险。

**二、使用`navigator.clipboard` API**

1. **异步方法**：

* 现代浏览器提供了`navigator.clipboard` API，它提供了更安全和可靠的方式来访问剪切板。这个 API 主要使用异步方法来进行复制操作。
* 例如：

 ```javascript
 async function copyToClipboard () {
   const content = '这是要复制的内容'
   try {
     await navigator.clipboard.writeText(content)
     console.log('内容已复制到剪切板')
   } catch (err) {
     console.error('无法复制内容到剪切板：', err)
   }
 }
 ```

* 在这个例子中，使用`navigator.clipboard.writeText()`方法将指定的内容复制到剪切板。如果操作成功，控制台将打印“内容已复制到剪切板”；如果出现错误，将打印错误信息。

2. **权限要求**：

* 使用`navigator.clipboard` API 可能需要用户的明确许可，特别是在一些注重隐私的浏览器中。如果用户没有授予权限，复制操作可能会失败。
* 可以通过在页面加载时请求用户的权限来提高复制操作的成功率。

**三、结合事件处理**

1. **响应用户交互**：

* 可以结合用户的交互事件，如点击按钮、按下快捷键等，来触发复制操作。这样可以提供更好的用户体验。
* 例如，可以使用`addEventListener`方法来监听按钮的点击事件：

 ```html
 <button id="copyButton">复制</button>
 ```

 ```javascript
 document.getElementById('copyButton').addEventListener('click', copyToClipboard)
 ```

2. **快捷键支持**：

* 还可以监听键盘快捷键事件，例如`Ctrl+C`（在 Windows 和 Linux 系统中）或`Command+C`（在 macOS 系统中），来模拟系统的复制操作。
* 这需要使用`keydown`或`keyup`事件，并检查按下的键是否是复制快捷键。但这种方法可能会受到浏览器的安全限制，并且不同浏览器对快捷键的处理方式可能不同。

通过以上方法，可以在浏览器中实现剪切板复制内容的功能。根据具体的需求和浏览器的兼容性，可以选择合适的方法来实现复制操作。同时，需要注意用户的隐私和安全问题，确保复制操作是在用户许可的情况下进行的。

## localStorage 是同步还是异步 {#p1-localstorage-is-synchronous-or-asynchronous}

在大多数现代浏览器中，`localStorage`的操作是同步的。

当你使用`localStorage.setItem()`来存储数据或者`localStorage.getItem()`来获取数据时，这些操作会立即执行并且不会返回一个 Promise 或者使用回调函数来处理异步操作。

例如：

```javascript
localStorage.setItem('key', 'value')
console.log(localStorage.getItem('key'))
```

在上面的代码中，设置和获取`localStorage`中的数据的操作会按顺序立即执行，不会像异步操作那样需要等待一段时间后再执行后续代码。

然而，需要注意的是，虽然`localStorage`操作本身是同步的，但如果存储的数据量较大，可能会导致性能问题，因为这些操作会阻塞浏览器的主线程。在这种情况下，可能会感觉操作像是异步的，因为浏览器可能会出现卡顿或响应缓慢的情况。

## 如何判断页签是否为活跃状态 {#p1-tab-active}

判断页面页签（Tab）是否为活跃状态，可以通过监听 `visibilitychange` 事件来实现。这个事件是由 `document` 对象触发的，可以用来判断页面是否对用户可见。当用户切换到其他标签页、最小化浏览器窗口、或是锁屏时，页面就会变为不可见状态。如果页面对用户可见，那么页面就处于活跃状态。

使用 `document.visibilityState` 属性可以检查页面的当前可视状态，这个属性有以下可能的值：

* **"visible"**：页面至少部分可见。在桌面端，这通常意味着页面是当前激活的标签页。
* **"hidden"**：页面对用户不可见。
* **"prerender"** 和 **"unloaded"**：这两个值用于特殊情况，通常较少用到。

 示例代码

下面的代码演示了如何使用 `visibilitychange` 事件和 `document.visibilityState` 来判断页面是否为活跃状态：

```javascript
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'visible') {
    console.log('页面现在是活跃状态。')
  } else {
    console.log('页面现在不是活跃状态。')
  }
})
```

每当用户切换到该页签或从该页签切换走时，会触发 `visibilitychange` 事件。通过检查 `document.visibilityState` 的值，你可以判断页面是变为活跃状态还是变为非活跃状态。

这个功能可以用于多种场合，比如：

* 停止或开始运行页面上的动画。
* 控制媒体播放（比如自动暂停视频播放）。
* 调整页面或应用的资源消耗（对于非活跃页签减少资源使用）。
* 发送用户行为统计数据，以记录用户实际查看页面的时间。

这种方法的优点是兼容性好，现代浏览器都支持 `visibilitychange` 事件，可以用于构建响应用户行为的 web 应用。

## 如何判断用户设备 {#p2-user-device}

在 Web 前端开发中，判断用户设备类型（如手机、平板、桌面电脑）主要依赖于用户代理字符串（User-Agent）和/或视口（Viewport）的尺寸。以下是一些常用方法：

 使用用户代理字符串（User-Agent）

用户代理字符串包含了浏览器类型、版本、操作系统等信息，可以通过分析这些信息来大致判断用户的设备类型。`navigator.userAgent` 属性用于获取用户代理字符串。

```javascript
function detectDevice () {
  const userAgent = navigator.userAgent

  if (/mobile/i.test(userAgent)) {
    return 'Mobile'
  }
  if (/tablet/i.test(userAgent)) {
    return 'Tablet'
  }
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS Device'
  }
  // Android, Windows Phone, BlackBerry 识别可以类似添加

  return 'Desktop'
}

console.log(detectDevice())
```

 使用视口尺寸

有时候用户代理字符串可能不够准确或被修改，此时可以根据视口尺寸作为补充手段。通过检测屏幕的宽度，你可以推断出设备的大致类别。

```javascript
function detectDeviceByViewport () {
  const width = window.innerWidth

  if (width < 768) {
    return 'Mobile'
  }
  if (width >= 768 && width < 992) {
    return 'Tablet'
  }
  return 'Desktop'
}

console.log(detectDeviceByViewport())
```

 使用 CSS 媒体查询

虽然 CSS 媒体查询主要用于响应式设计，但你也可以在 JavaScript 中使用 `window.matchMedia()` 方法来判断设备类型。这提供了一种基于 CSS 媒体查询语法来检测设备/视口特性的方式。

```javascript
function detectDeviceByMediaQuery () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    return 'Mobile'
  } else if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
    return 'Tablet'
  } else {
    return 'Desktop'
  }
}

console.log(detectDeviceByMediaQuery())
```

 注意

* **用户代理字符串被视为不可靠**：由于用户代理字符串可以被修改，某些情况下可能不能准确反映用户的设备信息。
* **响应式设计原则**：在进行设备检测时，最佳实践是根据内容和功能的需要来适应不同设备，而不是针对特定设备进行优化或限制。

综上，设备检测方法多种多样，选择合适的方法取决于你的具体需求和场景。在可能的情况下，优先考虑使用响应式设计原则，来创建能够在不同设备上良好工作的网页。

## navigator.sendBeacon {#p2-navigator-sendBeacon}

`navigator.sendBeacon()` 方法使得网页可以异步地将数据发送到服务器，与页面的卸载过程同时进行，这一点非常重要，因为它允许在不影响用户体验的情况下，安全地结束会话或者发送统计数据。这方法主要用于追踪和诊断信息，特别是在需要确保数据被成功发送到服务器的场景中——比如记录用户在网页上的行为数据。

 基本语法

```javascript
navigator.sendBeacon(url, data)
```

* `url`：一个字符串，代表您想要发送数据到的服务器地址。
* `data`：可选参数，要发送的数据。可以是 `ArrayBufferView`、`Blob`、`DOMString`、或者 `FormData` 对象。

 返回值

* 该方法返回一个布尔值：如果浏览器成功地将请求入队进行发送，则返回 `true`；如果请求因任何原因未能入队，则返回 `false`。

 特点

1. **异步**：`sendBeacon()` 发送的请求是异步的，不会阻塞页面卸载过程或者延迟用户浏览器的关闭操作。
2. **小数据量**：适用于发送少量数据，如统计信息和会话结束信号。
3. **不影响关闭**：它允许在页面卸载或关闭时发送数据，而不会阻止或延迟页面的卸载过程。
4. **可靠**：它确保数据能够在页面退出时被送出，相较于 `beforeunload` 或 `unload` 事件中使用同步的 `XMLHttpRequest` 更为可靠。

 使用示例

发送一些统计数据到服务器的简单示例：

```javascript
window.addEventListener('unload', function () {
  const data = { action: 'leave', timestamp: Date.now() }
  navigator.sendBeacon('https://example.com/analytics', JSON.stringify(data))
})
```

在上面的例子中，当用户离开页面时，我们监听 `unload` 事件，并在该事件触发时使用 `navigator.sendBeacon()` 方法发送一些统计数据到服务器。使用 `JSON.stringify(data)` 将数据对象转换成字符串形式，因为 `sendBeacon` 需要发送的数据必须是文本或二进制形式。

 兼容性与限制

* 虽然 `navigator.sendBeacon()` 被现代浏览器广泛支持，但在使用前最好检查浏览器兼容性。
* 发送数据量有限制，一般适用于发送小量的数据。
* 某些浏览器实现可能有细微差异，建议在实际使用前进行充分测试。

通过使用 `navigator.sendBeacon()`，开发者可以确保在页面卸载过程中，重要的数据能够被可靠地发送到服务器，从而改善数据收集的准确性和用户体验。

退出浏览器时发送积压的埋点数据请求是 web 开发中的一个常见需求，尤其是在需要确保用户活动数据尽可能准确地被记录的场景下。实现这一需求的关键在于捕获用户关闭浏览器或离开页面的时刻，并在这一时刻尽可能快速地发送所有积压的数据。由于浏览器对于即将关闭时发出的请求处理方式不同，这一过程可能会有些复杂。

 使用 `navigator.sendBeacon()`

`navigator.sendBeacon()` 方法允许你在浏览器会话结束时异步地向服务器发送小量数据。这个方法的设计初衷就是为了解决上述问题。`sendBeacon()` 在大多数现代浏览器中得到支持，并且其异步特性意味着它不会阻塞页面卸载或影响用户体验。

```javascript
window.addEventListener('beforeunload', function (event) {
  const data = {

  }
  const beaconUrl = 'https://yourserver.com/path' // 你的服务器接收端点

  navigator.sendBeacon(beaconUrl, JSON.stringify(data))
})
```

 使用 `fetch()` API 与 `keepalive` 选项

如果因某种原因 `navigator.sendBeacon()` 不能满足需求，`fetch()` API 的 `keepalive` 选项是另一个选择。这个选项允许你发送一个保持存活状态的请求，即使用户已经离开页面。但是，需要注意的是，使用 `keepalive` 选项发送的请求有大小限制（大约为 64KB）。

```javascript
window.addEventListener('beforeunload', function (event) {
  const data = {

  }
  const beaconUrl = 'https://yourserver.com/path' // 你的服务器接收端点

  fetch(beaconUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    keepalive: true // 保持请求存活
  })
})
```

 注意事项

* **浏览器兼容性**：尽管 `navigator.sendBeacon()` 和 `fetch()` 的 `keepalive` 选项被许多现代浏览器支持，但在实施解决方案时仍然需要考虑目标用户可能使用的浏览器类型和版本。
* **数据量限制**：`sendBeacon()` 和 `keepalive` 选项的请求都有数据量限制。确保不要发送超过限制大小的数据。
* **可靠性**：虽然这些方法能够提高数据发送的成功率，在浏览器关闭时发送数据的操作本身依然不能保证 100% 的成功率，特别是在网络状况不佳的情况下。

通过上述方法，你可以在浏览器即将关闭时尝试发送积压的埋点数据，从而尽可能减少数据丢失的情况。

## dom.contains {#p2-dom-contains}

在 DOM（文档对象模型）中，要判断元素 `a` 是否是元素 `b` 的子元素，您可以使用以下的 JavaScript 代码：

```javascript
function isChildElement (a, b) {
  return b.contains(a)
}
```

可以这样使用上述函数：

```javascript
const elementA = document.getElementById('elementA')
const elementB = document.getElementById('elementB')

if (isChildElement(elementA, elementB)) {
  console.log('元素 A 是元素 B 的子元素')
} else {
  console.log('元素 A 不是元素 B 的子元素')
}
```

## MutationObserver {#p0-MutationObserver}

`MutationObserver` 是一种能够响应 DOM 树变动的 Web API，它可以监听几乎所有类型的 DOM 变动，比如元素被添加、删除或修改。你可以通过它执行 callback 来应对这些变化。

下面是 `MutationObserver` 的基本用法：

 创建 `MutationObserver` 实例

```javascript
const observer = new MutationObserver(callback)
```

 配置观察者

你可以指定要观察的 DOM 变动的类型和具体的目标节点：

```javascript
const config = {
  attributes: true, // 观察属性变动
  childList: true, // 观察子列表变动
  subtree: true // 观察后代节点
}

observer.observe(targetNode, config)
```

这里的 `callback` 是一个在观察到变动时执行的函数，它有两个参数：`mutationsList` 是一个变动列表，`observer` 是观察者实例。

 回调函数

`MutationCallback` 函数会被调用，它有两个参数：

1. `mutationsList`：一个 `MutationRecord` 对象的数组，每个对象都描述了一个变动。
2. `observer`：触发通知的 `MutationObserver` 实例。

```javascript
function callback (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.')
    } else if (mutation.type === 'attributes') {
      console.log(`The ${mutation.attributeName} attribute was modified.`)
    }
  }
}
```

 停止观察

你可以通过调用 `disconnect` 方法来停止观察：

```javascript
observer.disconnect()
```

这将停止观察并且清除之前的记录。

 注意

* 使用 `MutationObserver` 应该谨慎，因为它可能对页面性能产生影响，尤其是在观察大型 DOM 树或频繁变动时。
* 尽量不要过度使用 `MutationObserver` 或过度指定需要它观察的变动种类和节点。

比如，如果你只想监听某个特定属性的变动，那么就不应该打开 `childList` 或者 `attributes`（如果不需要观察它们）。

`MutationObserver` 非常适用于响应 DOM 的动态变动来执行特定的 JavaScript 代码，而且是现代前端开发中的一个重要工具。在使用它时，考虑使用最严格的选项来优化性能并减少不必要的性能损耗。

使用场景

1. 埋点

## 拖曳

* [drag api](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

## documentFragment api 是什么， 有哪些使用场景 {#p2-documentFragment}

`DocumentFragment` 是 Web API 中的一部分，它是 `DOM` （文档对象模型）的一个非常轻量级的节点，代表一组 `DOM` 节点的集合。它不是一个真实存在于 `DOM` 中的实体，因此被认为是“没有名字”的节点，或者说它不在文档的主体中渲染，通常用来作为临时的 `DOM` 节点仓库。

对于 `DocumentFragment` 的一部分内容，当它们在 `DocumentFragment` 之外操作时，并不会引起主 DOM 树的直接重排或重绘。然而，一旦你将整个 `DocumentFragment` 插入到 DOM 的一个永久节点上，那么在 `DocumentFragment` 内进行的更改将会触发 DOM 的重新渲染。

DocumentFragment API 有几个关键的特点和用途：

1. **轻量级**：`DocumentFragment` 不会引起布局重排，因为其不是真实渲染的一部分。

2. **节点集合**：可以在 `DocumentFragment` 中节点集合进行分组，这个集合可以一次性插入到 `DOM` 的某一部分中。

3. **性能优化**：通过在一个 `DocumentFragment` 中构建好一大块 `DOM` 树，然后将它整体插入到主 `DOM` 中，从而减少重排次数，提高效率。

4. **事件不冒泡**：因为 `DocumentFragment` 不是真实渲染的一部分，所以它的事件不会冒泡到上层的 DOM 元素，除非它被插入到了 `DOM` 中。

 使用场景

以下是一些使用 `DocumentFragment` 的常见场景：

* **批量操作**：当你想要一次性添加多个节点到 `DOM` 树中时，使用 `DocumentFragment` 可以将这些节点预先堆放在一个轻量级对象中，然后一次性添加。

* **离屏操作**：如果你需要创建复杂的 `DOM` 结构，可以通过 `DocumentFragment` 在不触发页面重排和重绘的情况下进行。

* **内容填充**：在填充 `DOM` 元素内容之前，可以先创建一个 `DocumentFragment` 完成所有节点的添加和排序，然后把它添加到 `DOM` 树中。

* **避免内存泄漏**：在某些情况下，它可以作为防止因移动节点而造成的内存泄漏的一个办法。

 示例代码

```javascript
// 创建 DocumentFragment
const fragment = document.createDocumentFragment()

// 创建多个节点或元素
const div = document.createElement('div')
const p = document.createElement('p')

// 将节点添加到 DocumentFragment 上
fragment.appendChild(div)
fragment.appendChild(p)

// 一次性将 DocumentFragment 添加到 DOM 的某个部分
const body = document.querySelector('body')
body.appendChild(fragment)

// 这时 div 和 p 被添加至 body 元素，而不会触发额外的布局重排。
```

`DocumentFragment` 提供了一个高效的方式去操作 `DOM` 而不影响页面的渲染性能，在很多需要进行批量 DOM 操作的场合非常有用。

## requestIdleCallback api {#p2-requestIdleCallback}

`requestIdleCallback` 是一个 Web API，它允许开发者请求浏览器在主线程空闲时执行一些低优先级的后台任务，这对于执行如分析、整理状态和数据等不紧急的任务是理想的。这种方法可以提高用户的响应性和页面的整体性能。

以下是 `requestIdleCallback` API 的一些关键特点：

 何时使用 requestIdleCallback

`requestIdleCallback` 特别适合那些不直接关联用户交互及响应的任务，这些任务可以延后执行而不会明显影响用户体验。例如：

* 清理工作：如标记的 DOM 节点删除、数据的本地存储同步等。
* 非关键的解析：如解析大量数据。
* 状态更新：如发送不紧急的状态变更。

 如何使用 requestIdleCallback

使用 `requestIdleCallback`，你需要传递一个回调函数给它，此函数会在浏览器的空闲时间调用。你可以指定一个超时参数，它定义了浏览器在“空闲期”最多可以花费的时间来执行你的回调。

```javascript
requestIdleCallback(myNonCriticalFunction, { timeout: 5000 })
```

* **myNonCriticalFunction**: 这是你想要浏览器在空闲时间执行的函数。
* **timeout**: 一个可选的参数，表示回调执行时间的上限（以毫秒为单位）。如果超时，浏览器可能在下次空闲机会进行执行。

 回调函数参数

你的回调函数会接收到一个 `IdleDeadline` 对象作为参数，通常命名为 `deadline`。这个对象包含两个属性：

* **didTimeout** - 一个布尔值，如果超时已经被触发为 `true`。
* **timeRemaining** - 返回当前空闲阶段剩余时间的函数，单位是毫秒。

```javascript
function myNonCriticalFunction (deadline) {
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && someCondition()) {
    // 执行工作直到时间用完或下次更新不是必要的
  }

  // 如果还有未完成的工作，可以请求下一次空闲周期
  if (someCondition()) {
    requestIdleCallback(myNonCriticalFunction)
  }
}
```

 注意事项

* `requestIdleCallback` 不保证你的回调会在一个特定的时刻被调用，它只在浏览器需要的时候调用。
* 执行低优先级任务时，不应该太过频繁或执行时间太长，以免影响页面性能。
* 这个 API 为了最大化性能优化，会强制性地结束你的任务，在不迟于指定的超时时长执行结束。

 Cross-Browser Compatibility (跨浏览器兼容性)

你可能需要 polyfills（垫片库）来确保 `requestIdleCallback` 的兼容性，因为它并不是在所有浏览器中都有原生支持。

使用 `requestIdleCallback`，开发者可以更好地利用浏览器的空闲序列来执行不紧急的任务，同时保持用户交互的流畅度。

 参考文档

* [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API)
