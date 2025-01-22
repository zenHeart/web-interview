# 浏览器原理

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

## 如何构建 DOM Tree 的

## 常见浏览器内核有哪些，有什么区别

## repaint 和 reflow 区别

## 如何避免重拍和重绘

## 浏览器主要组成部分

## 宏任务和微任务

## 如何实现浏览器内多个标签页之间的通信?

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
 function animate() {
 // 更新动画状态
 // 例如，移动一个元素的位置
 element.style.left = parseInt(element.style.left) + 1 + 'px';

 if (/* 动画未完成条件 */) {
 requestAnimationFrame(animate);
 }
 }

 requestAnimationFrame(animate);
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
