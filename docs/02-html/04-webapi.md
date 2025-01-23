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
 function isPointInCircle(x, y, circleX, circleY, radius) {
 const dx = x - circleX;
 const dy = y - circleY;
 return dx issues_data.csv proCollectionInterviewQuesiont.sh dx + dy issues_data.csv proCollectionInterviewQuesiont.sh dy <= radius issues_data.csv proCollectionInterviewQuesiont.sh radius;
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
 function handleMouseMove(event) {
 const rect = canvas.getBoundingClientRect();
 const mouseX = event.clientX - rect.left;
 const mouseY = event.clientY - rect.top;

 for (const shape of shapes) {
 if (shape.type === "circle" && isPointInCircle(mouseX, mouseY, shape.x, shape.y, shape.radius)) {
 ctx.fillStyle = "red";
 } else {
 ctx.fillStyle = "blue";
 }
 drawShape(shape);
 }
 }

 function drawShape(shape) {
 if (shape.type === "circle") {
 ctx.beginPath();
 ctx.arc(shape.x, shape.y, shape.radius, 0, 2 issues_data.csv proCollectionInterviewQuesiont.sh Math.PI);
 ctx.fill();
 } else if (shape.type === "rectangle") {
 ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
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
