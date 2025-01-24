# 性能

## 如何监控卡顿  {#p1-metrics}

1. chrome 卡顿和设备刷新率是否有关？
2. 通过 requestAnimationFrame 监控卡顿
3. PerformanceObserver 监控长任务

## 常用性能指标 {#p0-metrics}

1. 评判模型参考 [RAIL](https://developers.google.cn/web/fundamentals/performance/rail)
2. 核心指标详见 [metrics](https://web.dev/articles/user-centric-performance-metrics#how_metrics_are_measured)

* **FCP** 已废弃
* **LCP**
* **INP**
* **FID（First Input Delay） - 首次输入延迟**
* **TTI（Time to Interactive） - 可交互时间**
* **CLS（Cumulative Layout Shift） - 累积布局偏移**
* **TTFB（Time to First Byte） - 首字节时间**
* **TBT（Total Blocking Time） - 总阻塞时间**

* [google web fundamentals performance](https://developers.google.cn/web/fundamentals/performance/why-performance-matters/)
* [Front-end-De veloper-Interview-Questions/Performance Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/93cf23ce51532d91319223c5a91e90811557ec0f/questions/performance-questions.md#performance-questions)

## 为什么传统上利用多个域名来提供网站资源会更有效？

## 采用什么工具查找性能问题?

参见 [google 性能测量](https://developers.google.cn/web/fundamentals/performance/get-started/measuringperf-2)

## 如何改善网站滚动性能?

## 你如何对网站的文件和资源进行优化？

## 浏览器同一时间可以从一个域名下载多少资源,有什么例外吗？

## 总结

性能推荐看 [google 性能教程](https://developers.google.cn/web/fundamentals/performance/rail)
基于 [RAIL](https://developers.google.cn/web/fundamentals/performance/rail) 去分析性能.

性能优化的基本思路

* 加载性能
    按照资源的类型处理
  * 文本类型资源
    * 源码区分开发和部署版本,对部署代码进行压缩混淆.例如 `uglify`
            具体工具参见 [压缩你的代码](https://developers.google.cn/web/fundamentals/performance/get-started/textcontent-3#minify_your_code)
    * 精简不需要的库和依赖
    * 服务端采用 gzip 压缩代码

  * ## 图片内容

## 解释 layout,painting,compositing

## css 动画和 js 动画优缺点?

## 请说出三种减少页面加载时间的方法

## 输入 url 浏览器发生了什么?

## 什么是 domain pre-fetching 它如何帮助性能?

## 说一下 Performance API {#p0-performance-api}

**一、性能监测与优化**

1. 测量页面加载时间：

* 通过`performance.timing`可以获取页面加载过程中的各个关键时间点，如`navigationStart`（导航开始时间）、`domLoading`（开始解析 DOM 的时间）、`domInteractive`（DOM 准备就绪时间）、`domContentLoadedEventEnd`（`DOMContentLoaded`事件结束时间）、`loadEventEnd`（页面完全加载时间）等。计算这些时间点之间的差值可以得出不同阶段的加载时间，帮助开发者了解页面加载的性能瓶颈并进行优化。
* 例如，可以计算从导航开始到页面完全加载的时间，以评估整体加载性能。

 ```javascript
 const timing = performance.timing
 const loadTime = timing.loadEventEnd - timing.navigationStart
 console.log(`Page load time: ${loadTime} milliseconds.`)
 ```

2. 测量资源加载时间：

* 使用`performance.getEntriesByType('resource')`可以获取所有资源（如脚本、样式表、图片等）的加载性能信息。可以分析每个资源的加载时间、发起请求的时间、响应时间等，以便优化资源的加载策略。
* 例如，可以找出加载时间较长的资源并考虑优化其大小、压缩方式或加载时机。

 ```javascript
 const resources = performance.getEntriesByType('resource')
 for (const resource of resources) {
   console.log(`Resource ${resource.name} took ${resource.responseEnd - resource.startTime} milliseconds to load.`)
 }
 ```

3. 监测网络请求耗时：

* 可以结合`fetch`或`XMLHttpRequest`与 Performance API 来测量特定网络请求的耗时。在请求发送前记录时间戳，在请求完成后再次记录时间戳并计算差值，同时可以利用 Performance API 的其他信息来进一步分析请求性能。
* 例如，可以统计某个 API 请求的耗时并与其他指标一起分析网络性能对应用的影响。

 ```javascript
 const startTime = performance.now()
 fetch('your-api-url')
   .then((response) => {
     const endTime = performance.now()
     const duration = endTime - startTime
     console.log(`API request took ${duration} milliseconds.`)
     return response
   })
   .catch((error) => {
     console.error(`Error fetching API: ${error}`)
   })
 ```

**二、用户体验优化**

1. 检测页面交互响应时间：

* 通过记录用户操作（如点击按钮、滚动页面等）的时间戳和相应的响应事件（如按钮点击后的处理完成时间、滚动事件触发后的页面更新时间等），可以测量用户交互的响应时间。这有助于确保应用在用户操作后能够及时做出反应，提高用户体验。
* 例如，可以在用户点击一个按钮后记录开始时间，在按钮对应的操作完成后记录结束时间，计算响应时间并进行优化。

 ```javascript
 document.getElementById('your-button').addEventListener('click', () => {
   const startTime = performance.now()
   // 执行按钮对应的操作
   // ...
   const endTime = performance.now()
   const responseTime = endTime - startTime
   console.log(`Button click response time: ${responseTime} milliseconds.`)
 })
 ```

2. 分析页面卡顿和流畅度：

* Performance API 中的`performance.now()`可以提供高精度的时间戳，通过在一定时间间隔内记录时间戳并分析时间差，可以检测页面是否出现卡顿。如果连续的时间差较大，可能表示页面出现了卡顿现象。此外，还可以结合浏览器的`requestAnimationFrame`来确保动画和交互的流畅性，通过在每一帧中执行特定的操作并测量时间，可以判断页面的流畅度是否符合预期。
* 例如，可以在动画循环中记录每一帧的时间戳，分析帧与帧之间的时间间隔是否稳定，以检测动画的流畅度。

 ```javascript
 let lastFrameTime = performance.now()
 function animate () {
   const currentTime = performance.now()
   const deltaTime = currentTime - lastFrameTime
   if (deltaTime > 100) {
     console.log('Possible卡顿 occurred.')
   }
   lastFrameTime = currentTime
   requestAnimationFrame(animate)
 }
 requestAnimationFrame(animate)
 ```

**三、性能分析工具开发**

1. 构建自定义性能分析工具：

* 利用 Performance API 提供的数据，可以开发自定义的性能分析工具，用于特定项目或团队的需求。这些工具可以收集和展示各种性能指标，提供详细的报告和分析，帮助开发者更好地理解应用的性能状况并进行针对性的优化。
* 例如，可以开发一个插件或工具，集成到开发环境中，实时监测页面性能并提供可视化的报告，包括加载时间、资源使用情况、网络请求耗时等。

 ```javascript
 class PerformanceAnalyzer {
   constructor () {
     this.measurements = []
   }
 
   startMeasurement () {
     this.startTime = performance.now()
   }
 
   endMeasurement (label) {
     const endTime = performance.now()
     const duration = endTime - this.startTime
     this.measurements.push({ label, duration })
   }
 
   generateReport () {
     console.log('Performance Report:')
     for (const measurement of this.measurements) {
       console.log(`${measurement.label}: ${measurement.duration} milliseconds.`)
     }
   }
 }
 const analyzer = new PerformanceAnalyzer()
 analyzer.startMeasurement()
 // 执行一些操作
 // ...
 analyzer.endMeasurement('Operation 1')
 analyzer.generateReport()
 ```

2. 与其他性能工具集成：

* Performance API 的数据可以与其他性能分析工具（如 Lighthouse、WebPageTest 等）结合使用，提供更全面的性能分析。可以将 Performance API 收集的数据作为输入，与这些工具的报告进行对比和分析，以获得更深入的性能洞察。
* 例如，可以在使用 Lighthouse 进行性能测试的同时，利用 Performance API 记录特定操作的耗时，以便更细致地分析应用在不同方面的性能表现。

## 如何计算页面首屏时间 {#p2-calculate-first-screen-time}

页面首屏时间是指从浏览器开始请求页面到页面的首屏内容完全显示的时间。以下是几种计算首屏时间的方法：

**一、使用浏览器性能 API 和自定义事件**

1. 具体步骤：

* 在页面的`<head>`标签中插入一段 JavaScript 代码，在页面加载时记录浏览器开始导航的时间戳，即`performance.timing.navigationStart`。
* 当页面的首屏内容加载完成时，触发一个自定义事件。可以通过监听特定元素的加载完成或者使用特定的标志来判断首屏内容是否加载完成。
* 在自定义事件的处理函数中，获取当前时间戳，并减去开始导航的时间戳，得到首屏时间。

例如：

```html
<!DOCTYPE html>
<html>
 <head>
 <script>
 const timing = performance.timing;
 let firstScreenLoaded = false;
 function onFirstScreenLoaded() {
 if (!firstScreenLoaded) {
 const firstScreenTime = performance.now() - timing.navigationStart;
 console.log(`首屏时间为：${firstScreenTime}ms`);
 firstScreenLoaded = true;
 }
 }
 window.addEventListener("load", function () {
 // 假设首屏内容加载完成的标志是某个特定元素的出现
 const firstScreenElement = document.getElementById("first-screen-element");
 if (firstScreenElement) {
 onFirstScreenLoaded();
 }
 });
 </script>
 </head>

 <body>
 <!-- 页面内容 -->
 <div id="first-screen-element">首屏关键内容元素</div>
 </body>
</html>
```

2. 注意事项：

* 需要准确确定首屏内容加载完成的标志，这可能因页面结构和内容而异。
* 不同浏览器对于性能时间戳的定义和准确性可能略有不同，需要在多种浏览器上进行测试。

**二、使用可视化工具和浏览器插件**

1. 一些可视化性能分析工具，如 Lighthouse、WebPageTest 等，可以测量页面的首屏时间。

* Lighthouse 是一个由 Google 开发的开源工具，可以在 Chrome 浏览器的开发者工具中运行。它会生成一个详细的性能报告，其中包括首屏时间等指标。
* WebPageTest 是一个在线性能测试工具，可以从不同的地理位置和设备类型进行测试，并提供详细的性能数据，包括首屏时间。

2. 一些浏览器插件，如 PageSpeed Insights、YSlow 等，也可以提供页面性能指标，包括首屏时间的估算。

3. 注意事项：

* 这些工具和插件的测量结果可能会受到网络环境、测试设备等因素的影响。
* 需要结合实际情况进行分析和优化，不能完全依赖工具的测量结果。

**三、手动计时和标记**

1. 步骤：

* 在页面的 JavaScript 代码中，在浏览器开始请求页面时手动记录一个时间戳。
* 在页面的首屏内容加载完成时，再次记录一个时间戳。
* 首屏时间 = 第二个时间戳 - 第一个时间戳。

例如：

```html
<!DOCTYPE html>
<html>
 <head>
 <script>
 let startTime;
 window.addEventListener("load", function () {
 if (!startTime) {
 startTime = performance.now();
 }
 // 假设首屏内容加载完成的标志是某个特定元素的出现
 const firstScreenElement = document.getElementById("first-screen-element");
 if (firstScreenElement) {
 const endTime = performance.now();
 const firstScreenTime = endTime - startTime;
 console.log(`首屏时间为：${firstScreenTime}ms`);
 }
 });
 </script>
 </head>

 <body>
 <!-- 页面内容 -->
 <div id="first-screen-element">首屏关键内容元素</div>
 </body>
</html>
```

2. 注意事项：

* 这种方法需要手动在代码中插入计时逻辑，可能会比较繁琐。
* 同样需要准确确定首屏内容加载完成的标志。

## 如何计算页面白屏时间 {#p2-calculate-white-screen-time}

白屏时间是指从浏览器开始请求页面到页面开始显示内容的时间。可以通过以下方法计算白屏时间：

**一、使用浏览器的性能 API**

现代浏览器提供了`performance`对象，可以用来获取页面加载过程中的各种时间戳。通过这些时间戳的差值可以计算出白屏时间。

1. 具体步骤：

* 在页面的`<head>`标签中插入一段 JavaScript 代码，在页面加载时记录关键时间点。
* 使用`performance.timing.navigationStart`表示浏览器开始导航的时间戳。
* 寻找一个表示页面开始有内容显示的时间点，通常可以使用`performance.timing.domInteractive`（文档被解析完成，开始加载外部资源时的时间戳）或者`performance.timing.domContentLoadedEventStart`（`DOMContentLoaded`事件开始的时间戳）作为近似的白屏结束时间点。
* 白屏时间 = 白屏结束时间点 - `performance.timing.navigationStart`。

例如：

```html
<!DOCTYPE html>
<html>
 <head>
 <script>
 const timing = performance.timing;
 const whiteScreenTime = timing.domInteractive - timing.navigationStart;
 console.log(`白屏时间为：${whiteScreenTime}ms`);
 </script>
 </head>

 <body>
 <!-- 页面内容 -->
 </body>
</html>
```

2. 注意事项：

* 不同的浏览器对于性能时间戳的定义可能略有不同，需要在多种浏览器上进行测试以确保准确性。
* 这种方法计算的白屏时间是一个近似值，因为很难精确地确定页面开始显示内容的瞬间。

**二、使用自定义标记和日志**

1. 步骤：

* 在页面的 HTML 结构中，在`<head>`标签之后插入一个不可见的元素，例如一个空的`<div>`元素，并给它一个特定的 ID。
* 在页面的 CSS 中，将这个元素的背景颜色设置为与页面背景相同的颜色，使其在页面加载初期不可见。
* 在页面的 JavaScript 代码中，当页面开始有内容显示时，通过修改这个元素的样式使其变为可见，并记录当前时间。
* 白屏时间 = 元素变为可见的时间 - 浏览器开始导航的时间。

例如：

```html
<!DOCTYPE html>
<html>
 <head>
 <style>
 #whiteScreenMarker {
 display: none;
 }
 </style>
 <script>
 const timing = performance.timing;
 document.addEventListener("DOMContentLoaded", function () {
 document.getElementById("whiteScreenMarker").style.display = "block";
 const whiteScreenTime = performance.now() - timing.navigationStart;
 console.log(`白屏时间为：${whiteScreenTime}ms`);
 });
 </script>
 </head>

 <body>
 <div id="whiteScreenMarker"></div>
 <!-- 页面内容 -->
 </body>
</html>
```

2. 注意事项：

* 这种方法需要手动在页面中插入标记元素和相应的 JavaScript 代码，可能会增加一些开发工作量。
* 同样需要考虑在不同浏览器上的兼容性和准确性。

## 有哪些前端性能分析工具 {#p0-performance-analysis-tools}

**一、浏览器开发者工具**

1. **Chrome DevTools**：

* 功能强大，提供了丰富的性能分析选项。
* 在“Performance”（性能）面板中，可以录制页面的交互过程，分析 CPU 使用率、内存占用、网络请求等，找出性能瓶颈。
* “Network”（网络）面板可以查看请求的加载时间、大小等信息，帮助优化网络请求。
* “Lighthouse”功能可以对页面进行全面的性能、可访问性、最佳实践等方面的审计。

2. **Firefox Developer Tools**：

* 类似 Chrome DevTools，具有性能分析、网络监测等功能。
* “Performance”工具可以分析页面加载和交互过程中的性能问题。

**二、性能监测平台**

1. **WebPageTest**：

* 在线工具，可以从多个地点对网页进行性能测试。
* 提供详细的性能指标，如首次内容绘制（FCP）、最大内容绘制（LCP）、首次输入延迟（FID）等。
* 生成可视化的报告，帮助分析页面的加载过程和性能瓶颈。

2. **Pingdom Tools**：

* 用于测试网站的性能和可用性。
* 提供页面加载时间、文件大小等信息，并给出优化建议。

**三、前端性能监控工具**

1. **Google Analytics**：

* 虽然主要用于网站分析，但也可以提供一些性能相关的数据。
* 如页面加载时间、用户行为等，可以帮助了解用户体验和性能趋势。

2. **New Relic Browser**：

* 提供全面的前端性能监控和分析。
* 可以实时监测页面性能，跟踪用户交互，提供详细的报告和警报。

**四、代码分析工具**

1. **Lighthouse CI**：

* 可以集成到持续集成（CI）流程中，对代码进行自动化的性能审计。
* 确保代码在提交和部署前符合一定的性能标准。

2. **PageSpeed Insights API**：

* 可以通过 API 方式获取页面的性能分析结果。
* 方便集成到自定义的工具或流程中，进行大规模的性能监测和优化。

## 动画性能如何检测 {#p1-detect-animation-performance}

**一、使用浏览器开发者工具**

1. Chrome 开发者工具：

* 打开 Chrome 浏览器，进入要检测动画性能的页面。
* 按下 F12 打开开发者工具，切换到“Performance”（性能）选项卡。
* 点击“Record”（录制）按钮开始录制页面的交互和动画。
* 进行页面上的动画操作，如滚动、拖动、动画播放等。
* 停止录制后，开发者工具会生成一个性能分析报告，其中包括 CPU 使用率、FPS（每秒帧数）、帧时间线等信息，可以帮助你分析动画的性能瓶颈。

**二、使用 JavaScript 性能分析工具**

Frame Timing API 可以用于检测动画性能。

**2.1、Frame Timing API 的作用**

Frame Timing API 提供了一种方式来测量浏览器渲染每一帧所花费的时间。这对于分析动画性能非常有用，因为它可以帮助你确定动画是否流畅，是否存在卡顿或掉帧的情况。

**2.2、如何使用 Frame Timing API 进行性能检测**

1. 获取帧时间数据：

* 使用 `performance.getEntriesByType('frame')` 方法可以获取帧时间数据的数组。每个条目代表一帧的信息，包括帧的开始时间、持续时间等。

 ```javascript
 const frameEntries = performance.getEntriesByType('frame')
 frameEntries.forEach((entry) => {
   console.log(`Frame start time: ${entry.startTime}`)
   console.log(`Frame duration: ${entry.duration}`)
 })
 ```

2. 分析帧时间数据：

* 通过分析帧的持续时间，可以判断动画是否在预期的时间内渲染。如果帧的持续时间过长，可能表示动画出现了卡顿。
* 可以计算平均帧时间、最大帧时间等指标，以评估动画的整体性能。

3. 结合其他性能指标：

* Frame Timing API 可以与其他性能指标一起使用，如 FPS（每秒帧数）、CPU 使用率等，以全面了解动画性能。
* 例如，可以使用 `requestAnimationFrame` 来计算 FPS，并结合帧时间数据来确定动画的流畅度。

**2.3、优势和局限性**

1. 优势：

* 提供精确的帧时间信息，有助于深入了解动画的性能细节。
* 可以在浏览器中直接使用，无需安装额外的工具。

2. 局限性：

* 并非所有浏览器都完全支持 Frame Timing API，可能存在兼容性问题。
* 仅提供帧时间数据，对于复杂的动画性能问题，可能需要结合其他工具和技术进行分析。

**三、使用在线性能检测工具**

1. WebPageTest：

* WebPageTest 是一个在线工具，可以对网页的性能进行全面的测试，包括加载时间、动画性能、资源加载等。
* 输入要测试的网页 URL，选择测试参数，如浏览器类型、地理位置等，然后启动测试。
* 测试完成后，会生成详细的报告，包括视频录制、性能指标图表等，可以帮助你分析动画性能问题。

2. Lighthouse：

* Lighthouse 是一个由 Google 开发的开源工具，可以作为 Chrome 浏览器的扩展或命令行工具使用。
* 运行 Lighthouse 对网页进行审计，它会评估网页的性能、可访问性、最佳实践等方面，并提供详细的报告和建议。
* 在性能部分，会包括对动画性能的评估，如 FPS、主线程忙碌时间等指标。

## 需要详细记录多个操作链路的性能耗时，进行结构化场景分析，该如何做 {#p2-detect-performance-of-multiple-operations}

操作节点指标

首先对一个操作链路切片：比如一个操作流程， 分拆为第一步， 第二步， 第三步.......
然后对每一步一个事件点。
然后统计每一个时间点之间的时间差， 就可以得出用户早操作每一步操作停留的时间。

甚至可以统计一个串行流程， 实际上是一样的。

 阶段耗时统计

**推荐： `performance.mark()`**

`performance.mark()` 是 Web Performance API 的一部分，它允许你在浏览器的性能条目缓冲区中创建一个具有特定名称的时间戳（也就是一个"标记"）。这些标记可用于精确测量页面或应用中的特定流程、操作、或某段代码的执行时间。通过使用`performance.mark()`来标记关键的代码执行点，你可以准确地测量出这些点之间的耗时，从而评估性能和识别瓶颈。

 如何使用 `performance.mark()`

**创建标记**

要使用`performance.mark()`，直接调用此函数并传入一个字符串作为标记的名称即可：

```javascript
performance.mark('startLoad')
// 执行一些操作
performance.mark('endLoad')
```

在上述示例中，`startLoad`和`endLoad`是两个标记点，分别表示加载操作的开始和结束。

**测量两个标记间的耗时**

创建标记后，你可以使用`performance.measure()`方法来测量这两个标记点之间的耗时。`performance.measure()`方法同样需要一个名称，并且可以接受两个额外的参数：起始标记和结束标记的名称。

```javascript
performance.measure('loadDuration', 'startLoad', 'endLoad')
```

在上面的代码中，`loadDuration`是测量的名称，表示从`startLoad`到`endLoad`之间的耗时。

**获取和分析测量结果**

通过`performance.getEntriesByName()`或其他类似的 API，你可以获取到性能条目并分析结果：

```javascript
const measure = performance.getEntriesByName('loadDuration')[0]
console.log(`加载耗时：${measure.duration}毫秒`)
```

`performance.getEntriesByName('loadDuration')`会返回一个数组，其中包含所有名为`loadDuration`的性能条目。在这个例子中，我们取数组的第一个元素，并通过`duration`属性获取实际的测量时间。

 清理标记和测量

为了避免性能条目缓冲区满了或是数据混乱，你可以在完成测量和分析后，使用`performance.clearMarks()`和`performance.clearMeasures()`来清除标记和测量结果。

```javascript
performance.clearMarks('startLoad')
performance.clearMarks('endLoad')
performance.clearMeasures('loadDuration')
```

 使用场景

`performance.mark()`非常适合用于测量页面加载、脚本执行、用户交互处理或任何自定义流程的性能。通过准确地标记和测量这些操作的起始和结束时间，开发者可以识别出性能瓶颈和潜在的优化点，从而改进应用的性能表现。

 注意事项

* 并非所有浏览器都支持 Web Performance API 的全部特性。使用这些 API 之前，建议检查兼容性。
* 对于高频率的性能标记和测量，要注意性能条目缓冲区可能会被快速填满，从而影响数据的收集和分析。确保适时清理不再需要的性能条目。

## 统计全站每一个静态资源加载耗时， 该如何做 {#p3-detect-performance-of-static-resources}

要统计全站每一个静态资源（如图片、JS 脚本、CSS 样式表等）的加载耗时，你可以借助浏览器的 Performance API，特别是利用 `PerformanceResourceTiming` 接口来获取资源加载的详细时间信息。以下是一个基本的步骤指导和示例代码，展示如何实现这一功能：

 步骤

1. **使用 `PerformanceObserver`：** 创建一个 `PerformanceObserver` 实例来监听资源加载事件，能够实时收集性能数据，而且对性能影响较小。

2. **过滤静态资源类型：** 通过检查 `initiatorType` 属性，筛选出静态资源（例如 `img`、`script`、`css` 等）的加载事件。

3. **计算和展示耗时：** 对每个静态资源的加载耗时进行计算并展示。资源的耗时可以通过 `duration` 属性直接获取。

 示例代码

以下是一个简单的 JavaScript 代码示例，展示了如何使用 `PerformanceObserver` 来统计全站静态资源的加载耗时：

```javascript
// 创建性能观察者实例来监听资源加载事件
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  for (const entry of entries) {
    // 过滤静态资源类型
    if (['img', 'script', 'css', 'link'].includes(entry.initiatorType)) {
      console.log(`资源 ${entry.name} 类型 ${entry.initiatorType} 耗时：${entry.duration.toFixed(2)} 毫秒`)
    }
  }
})

// 开始观察 Resource Timing 类型的性能条目
observer.observe({ entryTypes: ['resource'] })
```

 注意事项

* **性能数据的准确性：** 确保性能数据的准确性和实时性，你应该在页面加载的早期就开始监听资源加载事件，例如在 `<head>` 标签中就引入或嵌入这段脚本。
* **跨域资源的时间信息：** 如果你需要获取跨域资源的详细时间信息（如第三方字体或脚本），那么这些资源的服务器需要在响应头中包含 `Timing-Allow-Origin` 头。
* **大量数据的处理：** 如果页面包含大量静态资源，考虑如何存储、传输和分析这些数据，避免对性能和用户体验造成影响。

## 如何统计用户 pv 访问的发起请求数量（所有域名的） {#p2-pv}

统计用户 PV（页面访问量）期间发起的请求数量（涵盖所有域名）可以通过几种方法实现，包括使用浏览器的 `Performance API`、监听网络请求、或者通过服务端日志分析。每种方法有其优点和适用场景。下面是一些方法的简要说明和示例：

 方法 1: 使用 Performance API

`Performance API` 提供了丰富的接口来访问和利用浏览器的性能数据。通过使用这个 API，可以获取到用户 PV 时所有资源请求的详细信息，包括请求的域名信息。

 使用 PerformanceObserver 监听资源加载

```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntriesByType('resource')
  console.log(`当前页面共发起了 ${entries.length} 个资源请求。`)
})
observer.observe({ entryTypes: ['resource'] })
```

这段代码会统计所有类型的资源加载（如图片、脚本、样式表等），不过它不会区别处理各个域名的请求。

 方法 2: 监听所有网络请求 (XMLHttpRequest 和 Fetch API)

可以通过重新定义 `XMLHttpRequest` 和拦截 `fetch` API 的调用来监控所有通过这两种常见方法发起的网络请求。

 拦截 XMLHttpRequest

```javascript
(function () {
  const oldOpen = XMLHttpRequest.prototype.open
  window.requestCount = 0
  XMLHttpRequest.prototype.open = function () {
    window.requestCount++
    console.log(`请求数量: ${window.requestCount}`)
    return oldOpen.apply(this, arguments)
  }
})()
```

 拦截 Fetch API

```javascript
const oldFetch = window.fetch
window.fetch = function () {
  window.requestCount++
  console.log(`请求数量: ${window.requestCount}`)
  return oldFetch.apply(this, arguments)
}
```

这两段代码分别拦截了 `XMLHttpRequest` 和 `fetch` API 的请求，从而可以统计请求的总量。为了覆盖所有域名，代码没有对请求的 URL 进行筛选，但如果需要，可以通过分析 URL 来对请求进行分类统计。

 方法 3: 服务端日志分析

如果你有权访问服务器日志，或者使用了像 Google Analytics 这样的分析工具，也可以通过分析服务端日志来统计 PV 过程中的请求数量。这种方法可能更适合统计对外部 API 的请求或者整体网站流量的分析。

 方法选择建议

* 如果你想要实时在前端捕获和反馈统计数据，建议使用`Performance API`或者通过拦截网络请求的方法。
* 如果希望进行更全面的数据分析或长期趋势跟踪，服务端日志分析可能是更合适的选择。

## 可有办法判断用户的网络条件, 判断网速快慢，网络状态？ {#p1-network-condition}

确定用户的网络条件，包括网络速度和连接状态，对于提供优质用户体验至关重要。以下是一些方法可以帮助你判断用户的网络条件：

 1. **Navigator Connection API**

这个 API 提供有关系统的网络连接的信息，如网络的类型和下载速度。这个 API 的支持度不是全局性的，但在许多现代浏览器上可用。使用这个 API，你可以获取到有关用户网络连接的详细信息。

```javascript
if ('connection' in navigator) {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  console.log(`网络类型: ${connection.effectiveType}`)
  console.log(`估计的下行速度: ${connection.downlink}Mbps`)
  console.log(`RTT: ${connection.rtt}ms`)

  // 监听网络类型变化
  connection.addEventListener('change', (e) => {
    console.log(`网络类型变化为: ${connection.effectiveType}`)
  })
}
```

* `connection.effectiveType` 提供了网络的类型，如 `'4g'`，`'3g'`，代表网络速度。
* `connection.downlink` 提供了网络的下载速度信息，单位是 Mbps。
* `connection.rtt` 提供了来回时间信息，单位是毫秒。

 2. **观测发送请求的速度**

通过发送一个小请求（可能是一个小文件或 API 请求）并测量它完成的时间，可以粗略地估计当前的网络速度。

```javascript
const startTime = new Date().getTime() // 记录开始时间
fetch('your-small-file-or-api-url').then((response) => {
  const endTime = new Date().getTime() // 记录结束时间
  const duration = endTime - startTime // 请求持续时间
  console.log(`请求持续时间: ${duration}ms`)
  // 根据持续时间和文件大小估计网速
})
```

 3. **监听在线和离线事件**

HTML5 引入了在线和离线事件监听，可以用来简单判断用户是否连接到网络。

```javascript
window.addEventListener('online', () => console.log('网络已连接'))
window.addEventListener('offline', () => console.log('网络已断开'))
```

根据`navigator.onLine`的属性值，你可以检测用户是否在线。

```javascript
if (navigator.onLine) {
  console.log('用户在线')
} else {
  console.log('用户离线')
}
```

 结论

虽然无法精确地测量用户的网速，但以上方法提供了一些手段来估计用户的网络状况。这样的信息可以用来动态调整网站或应用的行为，例如，通过降低图像质量、推迟非关键资源的加载或取消某些动画，以改善慢速连接下的用户体验。

## PerformanceObserver 如何测量页面性能 {#p2-performance-observer}

`PerformanceObserver` API 是一个强大的浏览器接口，允许开发者订阅性能相关的事件，实时收集和分析用户当前浏览器会话中的性能数据。这个 API 是 Web 性能监测工具箱的一部分，与 `window.performance` 对象紧密协作，后者提供了对网页性能数据的访问。`PerformanceObserver` 允许应用异步监听性能测量事件，而不需要定时检查 `window.performance` 的条目。

 核心功能

* **实时性能数据收集**：随着网页生命周期中各种事件的触发，`PerformanceObserver` 支持实时捕获和处理性能数据条目。
* **减少资源消耗**：与轮询 `window.performance` 对象相比，使用 `PerformanceObserver` 可以降低资源消耗，并提供更及时的数据收集。
* **灵活的数据订阅模型**：可以指定订阅一个或多个特定类型的性能条目，根据需要接收相关数据。

 主要方法

* **`observe()`**：开始观察一个或多个特定类型的性能条目。通过指定条目类型，应用可以订阅感兴趣的性能事件。
* **`disconnect()`**：停止观察性能数据。这可以释放相关资源，并停止进一步的回调执行。

 使用示例

下面的例子展示了如何使用 `PerformanceObserver` 来监听首次内容绘制 (First Contentful Paint, FCP) 和最大内容绘制 (Largest Contentful Paint, LCP) 的性能指标。

```javascript
const perfObserver = new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime)
    } else if (entry.name === 'largest-contentful-paint') {
      console.log('LCP:', entry.startTime)
    }
  }
})

perfObserver.observe({ type: 'paint', buffered: true })
```

在这个例子中，`perfObserver` 被配置为监听包含 FCP 和 LCP 的 `paint` 类型的性能条目。当这些指标被记录到性能时间线上时，回调函数将被执行，并可以对这些数据进行进一步的处理，比如打印在控制台或发送到服务器。

 注意事项

* `PerformanceObserver` API 的支持程度取决于浏览器和浏览器版本。为了最好地利用这一 API，推荐检查目标用户群体最常用浏览器的兼容性。
* 合理使用 `disconnect()` 方法来停止数据的观察（特别是在单页应用中或在不再需要收集数据时）有助于保持应用的性能。
* `buffered` 选项允许接收到观察者激活之前已经记录的性能条目，这在页面加载阶段尤其有用。

通过 `PerformanceObserver`，开发者可以精细控制性能数据的收集过程，有效监控和分析网页性能，从而提升用户体验。

## 如何统计页面的 long task {#lp1-ong-task}

统计网页中的 `LongTask` 是性能监控的一部分，特别是在测量和优化页面的响应能力方面非常有用。`LongTask` API 提供了一种监测浏览器主线程被长时间任务阻塞的能力，这些任务通常会影响用户体验，如使滚动卡顿或延迟输入响应。下面是一些基本步骤，帮助你开始监控 `LongTask`：

1. **使用 Performance Observer API**: 这个 API 允许你注册一个观察者来获取性能相关的数据，包括 `LongTask`。

2. **注册 LongTask 观察者**:

* 创建一个 `PerformanceObserver` 实例，并为其提供一个回调函数。这个回调函数会在观察到 `LongTask` 时被调用。
* 在回调函数中，你可以获取到每个 `LongTask` 的详细信息，如开始时间、持续时间等。
* 调用 `observe()` 方法开始观察性能条目，指定 `{entryTypes: ['longtask']}` 来仅观察 `LongTask`。

3. **处理 LongTask 数据**:

* 在上述回调中，你可以收集 `LongTask` 的数据并进行处理，例如计算平均持续时间，或将数据发送到服务器进行进一步分析。

下面是一个简单的示例代码，演示如何注册 `LongTask` 观察者并打印任务的一些基本信息：

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('LongTask Detected:', entry)
    console.log(`Start Time: ${entry.startTime}, Duration: ${entry.duration}`)
    // TODO: 这里可以根据需要进一步处理这些数据，比如发送给服务器
  })
})

// 开始观察长任务
observer.observe({ entryTypes: ['longtask'] })
```

4. **优化相关代码**:

* 一旦你开始收集到 `LongTask` 数据，可以识别出影响性能的代码区域，并进行相应的优化。

5. **监控页面性能**:

* 持续监控并优化，根据收集到的数据调整策略。

记住，只有支持 Performance Timeline Level 2 规范的浏览器才能使用 `LongTask` API。在实际部署之前，确保你有对应的浏览器兼容性检查和错误处理代码。

在 JavaScript 中，可以使用 Performance API 中的 PerformanceObserver 来监视和统计长任务（Long Task）。长任务是指那些执行时间超过 50 毫秒的任务，这些任务可能会阻塞主线程，影响页面的交互性和流畅性。

 使用 PerformanceObserver 监听长任务

```javascript
// 创建一个性能观察者实例来订阅长任务
let observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long Task detected:')
    console.log(`Task Start Time: ${entry.startTime}, Duration: ${entry.duration}`)
  }
})

// 开始观察长任务
observer.observe({ entryTypes: ['longtask'] })

// 启动长任务统计数据的变量
let longTaskCount = 0
let totalLongTaskTime = 0

// 更新之前的性能观察者实例，以增加统计逻辑
observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    longTaskCount++ // 统计长任务次数
    totalLongTaskTime += entry.duration // 累加长任务总耗时
    // 可以在这里添加其他逻辑，比如记录长任务发生的具体时间等
  })
})

// 再次开始观察长任务
observer.observe({ entryTypes: ['longtask'] })
```

在上面的代码中，我们创建了一个`PerformanceObserver`对象来订阅长任务。每当检测到长任务时，它会向回调函数传递一个包含长任务性能条目的列表。在这个回调中，我们可以统计长任务的次数和总耗时。

注意：`PerformanceObserver`需要在支持该 API 的浏览器中运行。截至到我所知道的信息（2023 年 4 月的知识截点），所有现代浏览器都支持这一 API，但在使用前你应该检查用户的浏览器是否支持这个特性。

以下是如何在实际使用中停止观察和获取当前的统计数据：

```javascript
// 停止观察能力
observer.disconnect()

// 统计数据输出
console.log(`Total number of long tasks: ${longTaskCount}`)
console.log(`Total duration of all long tasks: ${totalLongTaskTime}ms`)
```

使用这种方法，你可以监控应用程序中的性能问题，并根据长任务的发生频率和持续时间进行优化。
