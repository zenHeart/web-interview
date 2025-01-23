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
