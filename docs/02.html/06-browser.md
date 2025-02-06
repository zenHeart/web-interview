# 浏览器原理

## 输入 url 到渲染 {#p0-how-browser-render}

1. 在浏览器地址栏输入URL

2. 浏览器查看**缓存**，如果请求资源在缓存中并且新鲜，跳转到转码步骤

1. 如果资源未缓存，发起新请求

2. 如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。

3. 检验新鲜通常有两个HTTP头进行控制`Expires`和`Cache-Control`：

* HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期
* HTTP1.1增加了Cache-Control: max-age=,值为以秒为单位的最大新鲜时间

3. 浏览器**解析URL**获取协议，主机，端口，path

4. 浏览器**组装一个HTTP（GET）请求报文**

5. 浏览器**获取主机ip地址**，过程如下：

1. 浏览器缓存

2. 本机缓存

3. hosts文件

4. 路由器缓存

5. ISP DNS缓存

6. DNS递归查询（可能存在负载均衡导致每次IP不一样）

6. **打开一个socket与目标IP地址，端口建立TCP链接**，三次握手如下：

1. 客户端发送一个TCP的**SYN=1，Seq=X**的包到服务器端口

2. 服务器发回**SYN=1， ACK=X+1， Seq=Y**的响应包

3. 客户端发送**ACK=Y+1， Seq=Z**

7. TCP链接建立后**发送HTTP请求**

8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序

9. 服务器检查**HTTP请求头是否包含缓存验证信息**如果验证缓存新鲜，返回**304**等对应状态码

10. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作

11. 服务器将**响应报文通过TCP连接发送回浏览器**

12. 浏览器接收HTTP响应，然后根据情况选择**关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下**：

1. 主动方发送**Fin=1， Ack=Z， Seq= X**报文

2. 被动方发送**ACK=X+1， Seq=Z**报文

3. 被动方发送**Fin=1， ACK=X， Seq=Y**报文

4. 主动方发送**ACK=Y， Seq=X**报文

13. 浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同

14. 如果资源可缓存，**进行缓存**

15. 对响应进行**解码**（例如gzip压缩）

16. 根据资源类型决定如何处理（假设资源为HTML文档）

17. **解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本**，这些操作没有严格的先后顺序，以下分别解释

18. **构建DOM树**：

1. **Tokenizing**：根据HTML规范将字符流解析为标记

2. **Lexing**：词法分析将标记转换为对象并定义属性和规则

3. **DOM construction**：根据HTML标记关系将对象组成DOM树

19. 解析过程中遇到图片、样式表、js文件，**启动下载**

20. 构建**CSSOM树**：

1. **Tokenizing**：字符流转换为标记流

2. **Node**：根据标记创建节点

3. **CSSOM**：节点创建CSSOM树

21. **[根据DOM树和CSSOM树构建渲染树](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)**:

1. 从DOM树的根节点遍历所有**可见节点**，不可见节点包括：1）`script`,`meta`这样本身不可见的标签。2)被css隐藏的节点，如`display: none`

2. 对每一个可见节点，找到恰当的CSSOM规则并应用

3. 发布可视节点的内容和计算样式

22. **js解析如下**：

1. 浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时**document.readystate为loading**

2. HTML解析器遇到**没有async和defer的script时**，将他们添加到文档中，然后执行行内或外部脚本。
 这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。
 这样就可以用document.write()把文本插入到输入流中。
 **同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容**

3. 当解析器遇到设置了**async**属性的script时，开始下载脚本并继续解析文档。
 脚本会在它**下载完成后尽快执行**，但是**解析器不会停下来等它下载**。
 异步脚本**禁止使用document.write()**，它们可以访问自己script和之前的文档元素

4. 当文档完成解析，document.readState变成interactive

5. 所有**defer**脚本会**按照在文档出现的顺序执行**，延迟脚本**能访问完整文档树**，禁止使用document.write()

6. 浏览器**在Document对象上触发DOMContentLoaded事件**

7. 此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，
 等这些**内容完成载入并且所有异步脚本完成载入和执行**，document.readState变为complete,window触发load事件

23. **显示页面**（HTML解析过程中会逐步显示页面）

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

常见的浏览器内核包括：

* **Trident内核**：由Microsoft开发，主要用于Internet Explorer浏览器，也是Windows系统自带的默认浏览器内核。该内核在HTML和CSS的解释、渲染方面存在一些问题，但在JavaScript引擎的处理上表现较为出色。

* **Gecko内核**：由Mozilla开发，主要用于Firefox浏览器。该内核在HTML和CSS的解释、渲染方面表现较好，同时也有较强的JavaScript引擎。

* **WebKit内核**：由苹果公司开发，最初是为Safari浏览器所用。该内核在HTML、CSS和JavaScript处理方面都表现出色，支持的CSS特性较多。

* **Blink内核**：由Google和Opera Software共同开发，用于Chrome浏览器和Opera浏览器。该内核是Webkit内核的一个分支，对Web标准的支持也非常好。

这些浏览器内核之间的主要区别在于对Web标准的支持程度、渲染引擎的处理能力、JavaScript引擎的性能、浏览器的兼容性等方面。此外，不同的浏览器内核也会有一些独特的特性和优化，以满足不同用户的需求。

面是一个简单的表格对比

## repaint 和 reflow 区别 {#p0-repaint-reflow}

浏览器重绘（Repaint）和重排（Reflow）是Web页面中常见的两种渲染方式，它们的区别如下：

1. 重排（Reflow）：当DOM元素的结构或者布局发生变化时，浏览器需要重新计算元素的几何属性（比如位置、大小等），然后重新构建渲染树，这个过程叫做重排。重排的代价比较高，因为需要浏览器重新计算和布局，会消耗较多的CPU资源和时间。

2. 重绘（Repaint）：当元素的样式（如背景颜色、字体颜色、边框颜色等）发生变化时，浏览器会重新绘制元素的样式，这个过程叫做重绘。重绘的代价比较低，因为不需要重新计算元素的位置和大小，只需要重新绘制元素的样式即可。

因此，重排会触发重绘，但是重绘不一定会触发重排。在Web开发中，我们应该尽量避免频繁的重排和重绘，以提高页面的性能。一些常见的优化方式包括：减少DOM操作、使用CSS3动画代替JavaScript动画、避免使用table布局等。

下面是它们的区别：

| 区别 | 重绘 | 重排 |
|--------------|--------------------------------------------------------|--------------------------------------------------------|
| 定义 | 更新元素的可见样式，但不影响布局 | 更新元素的布局和尺寸 |
| 影响范围 | 仅影响元素的外观，不影响其他元素 | 影响元素及其周围的布局、尺寸和位置 |
| 执行顺序 | 在重排之后执行 | 在重绘之前执行 |
| 开销 | 开销较小，不涉及元素的重新布局和计算 | 开销较大，需要重新计算元素的布局和位置 |
| 触发条件 | 元素的可见样式属性发生变化，例如颜色、背景、阴影等 | 元素的尺寸、布局属性发生变化，例如宽度、高度、边距等 |
| 优化建议 | 使用 CSS3 的 transform 和 opacity 属性实现动画效果 | 批量更新样式，使用文档片段进行 DOM 操作，禁用动画效果，减少样式计算 |
| 示例 | 更改颜色、背景、边框等 | 更改尺寸、位置、边距、文本内容等 |

请注意，重绘和重排是相互关联的，当发生重排时，会随之引发重绘。因此，为了提高性能，应该尽量减少重绘和重排的次数。

任何改变用来构建渲染树的信息都会导致一次重排或重绘：

* 添加、删除、更新DOM节点
* 通过display: none隐藏一个DOM节点-触发重排和重绘
* 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
* 移动或者给页面中的DOM节点添加动画
* 添加一个样式表，调整样式属性
* 用户行为，例如调整窗口大小，改变字号，或者滚动。

何避免重绘或者重排

 集中改变样式

我们往往通过改变class的方式来集中改变样式

```js
// 判断是否是黑色系样式
const theme = isDark ? 'dark' : 'light'

// 根据判断来设置不同的class
ele.setAttribute('className', theme)
```

 使用DocumentFragment

我们可以通过createDocumentFragment创建一个游离于DOM树之外的节点，然后在此节点上批量操作，最后插入DOM树中，因此只触发一次重排

```js
const fragment = document.createDocumentFragment()

for (let i = 0; i < 10; i++) {
  const node = document.createElement('p')
  node.innerHTML = i
  fragment.appendChild(node)
}

document.body.appendChild(fragment)
```

 提升为合成层

元素提升为合成层有以下优点：

* 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
* 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
* 对于 transform 和 opacity 效果，不会触发 layout 和 paint

提升合成层的最好方式是使用 CSS 的 will-change 属性：

```css
#target {
 will-change: transform;
}
```

## 如何避免重拍和重绘

## 浏览器主要组成部分

浏览器的主要组成部分是什么

* **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
* **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。
* **呈现引擎** - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
* **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
* **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
* **JavaScript 解释器** - 用于解析和执行 JavaScript 代码。
* **数据存储。这是持久层** - 浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

## 宏任务和微任务

在JavaScript中，宏任务（macro-task）和微任务（micro-task）是指异步操作的两种类型。

本操作

**宏任务通常包括以下操作：**

* setTimeout和setInterval定时器回调函数
* 事件回调函数（例如，鼠标点击、键盘输入等）
* AJAX请求的回调函数
* 请求动画帧（requestAnimationFrame）回调函数
* script标签的onload和onerror事件

当一个宏任务开始执行时，JavaScript 引擎会将其放入调用堆栈的底部，然后继续执行其他代码。当调用堆栈为空时，JavaScript引擎会取出下一个宏任务并执行。

**微任务通常包括以下操作：**

* Promise的回调函数
* Generator函数
* MutationObserver 的回调函数
* process.nextTick（Node.js环境下）

当一个微任务被添加到任务队列中时，它会在当前宏任务执行完成后立即执行，而不是等待下一个宏任务开始执行。这使得微任务可以在当前宏任务执行期间处理异步操作的结果，从而提高应用程序的响应性能。

任务与微任务的优先级是怎样的？

在 JavaScript 中，宏任务和微任务的执行优先级是不同的。**通常情况下，微任务的优先级高于宏任务**，也就是说，在一个宏任务中，如果有微任务存在，那么微任务会优先于宏任务执行。

具体来说，当一个宏任务开始执行时，如果在它的执行过程中产生了微任务，那么这些微任务会被添加到微任务队列中，等待当前宏任务执行完成后立即执行。如果在这个过程中产生了新的微任务，则会一直执行微任务，直到微任务队列为空，然后JavaScript引擎才会继续执行下一个宏任务。

例如，以下代码演示了宏任务和微任务的执行顺序：

```js
console.log('start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(function () {
  console.log('promise')
})

console.log('end')
```

上述代码中，先执行同步代码 console.log('start') 和 console.log('end')。接着，使用 setTimeout 添加一个宏任务，然后使用 Promise.resolve().then 添加一个微任务。由于微任务优先级高于宏任务，因此 Promise 的回调函数会在 setTimeout 回调函数之前执行。因此，上述代码的输出顺序如下：

```
start
end
promise
setTimeout
```

process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序

[前端碎碎念 之 nextTick, setTimeout 以及 setImmediate 三者的执行顺序](https://segmentfault.com/a/1190000008595101)

首先来看一个非常经典的例子：

```js
setImmediate(function () {
  console.log(1) // 7
}, 0)
setTimeout(function () {
  console.log(2) // 8
}, 0)
new Promise(function (resolve) {
  console.log(3) // 1
  resolve()
  console.log(4) // 2
}).then(function () {
  console.log(5) // 6
})
console.log(6) // 3
process.nextTick(function () {
  console.log(7) // 5
})
console.log(8) // 4
// 输出结果是3 4 6 8 7 5 2 1
```

macro-task(宏任务): script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.
micro-task(微任务): process.nextTick, Promise(原生)，Object.observe，MutationObserver

除了script整体代码，micro-task的任务优先级高于macro-task的任务优先级。其中，script(整体代码) ，可以理解为待执行的所有代码。

所以执行顺序如下：

第一步. script整体代码被执行，执行过程为

* 创建setImmediate macro-task
* 创建setTimeout macro-task
* 创建micro-task Promise.then 的回调，并执行script console.log(3); resolve(); console.log(4); 此时输出3和4，虽然resolve调用了，执行了但是整体代码还没执行完，无法进入Promise.then 流程。
* console.log(6)输出6
* process.nextTick 创建micro-task
* console.log(8) 输出8

第一个过程过后，已经输出了3 4 6 8

第二步. 由于其他micro-task 的 优先级高于macro-task。
此时micro-task 中有两个任务按照优先级 process.nextTick 高于 Promise。
所以先输出7，再输出5

第三步，micro-task 任务列表已经执行完毕，家下来执行macro-task. 由于setTimeout的优先级高于setIImmediate，所以先输出2，再输出1。

整个过程描述起来像是同步操作，实际上是基于Event Loop的事件循环。
关于micro-task和macro-task的执行顺序，可看下面这个例子(来自《深入浅出Node.js》)：

```js
// 加入两个nextTick的回调函数
process.nextTick(function () {
  console.log('nextTick延迟执行1')
})
process.nextTick(function () {
  console.log('nextTick延迟执行2')
})
// 加入两个setImmediate()的回调函数
setImmediate(function () {
  console.log('setImmediate延迟执行1')
  // 进入下次循环
  process.nextTick(function () {
    console.log('强势插入')
  })
})
setImmediate(function () {
  console.log('setImmediate延迟执行2')
})
console.log('正常执行')
```

书中给出的执行结果是：

```
正常执行
nextTick延迟执行1
nextTick延迟执行2
setImmediate延迟执行1
强势插入
setImmediate延迟执行2
```

朴老师写那本书的时候，node最新版本为0.10.13，而我的版本是6.x

老版本的Node会优先执行process.nextTick。
当process.nextTick队列执行完后再执行一个setImmediate任务。
然后再次回到新的事件循环。所以执行完第一个setImmediate后，队列里只剩下第一个setImmediate里的process.nextTick和第二个setImmediate。
所以process.nextTick会先执行。

而在新版的Node中，process.nextTick执行完后，会循环遍历setImmediate，将setImmediate都执行完毕后再跳出循环。
所以两个setImmediate执行完后队列里只剩下第一个setImmediate里的process.nextTick。最后输出"强势插入"。

**关于优先级的另一个比较清晰的版本：**
观察者优先级
在每次轮训检查中，各观察者的优先级分别是：
idle观察者 > I/O观察者 > check观察者。
idle观察者：process.nextTick
I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等
check观察者：setImmediate，setTimeout

**setImmediate 和 setTimeout 的优先级**
看下面这个例子：

```js
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 0)
console.log('3')
// 输出结果是3 2 1
```

我们知道现在HTML5规定setTimeout的最小间隔时间是4ms，也就是说0实际上也会别默认设置为最小值4ms。我们把这个延迟加大
上面说到setTimeout 的优先级比 setImmediate的高，其实这种说法是有条件的。
再看下面这个例子，为setTimeout增加了一个延迟20ms的时间：

```js
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 20)
console.log('3')
// 输出结果是3 2 1
```

试试打印出这个程序的执行时间：

```js
const t1 = +new Date()
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 20)

console.log('3')
const t2 = +new Date()
console.log('time: ' + (t2 - t1))
// 输出
3
23
2
1
```

程序执行用了23ms, 也就是说，在script(整体代码)执行完之前，setTimeout已经过时了，所以当进入macro-task的时候setTimeout依然优先于setImmediate执行。如果我们把这个值调大一点呢？

```js
const t1 = +new Date()
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 30)

console.log('3')
const t2 = +new Date()
console.log('time: ' + (t2 - t1))
// 输出
3
23
1
2
```

setImmediate早于setTimeout执行了，因为进入macro-task 循环的时候，setTimeout的定时器还没到。
以上实验是基于6.6.0版本Node.js测试，实际上在碰到类似这种问题的时候，最好的办法是参考标准，并查阅源码，不能死记概念和顺序，因为标准也是会变的。包括此文也是自学总结，经供参考。

## 事件循环原理?

```js
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
Promise.resolve().then(function () {
  console.log('promise1')
}).then(function () {
  console.log('promise2')
})
console.log('script end')
```

可以先试一下，手写出执行结果，然后看完这篇文章以后，在运行一下这段代码，看结果和预期是否一样

 单线程

 定义

单线程意味着所有的任务需要排队，前一个任务结束，才能够执行后一个任务。如果前一个任务耗时很长，后面一个任务不得不一直等着。

 原因

`JavaScript`的单线程，与它的用途有关。作为浏览器脚本语言，`JavaScript`的主要用途是与用户互动，以及操作`DOM`。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定`JavaScript`同时有两个线程，一个在添加`DOM`节点，另外一个是删除`DOM`节点，那浏览器应该应该以哪个为准，如果在增加一个线程进行管理多个线程，虽然解决了问题，但是增加了复杂度，为什么不使用单线程呢，执行有个先后顺序，某个时间只执行单个事件。
为了利用多核`CPU`的计算能力，`HTML5`提出`Web Worker`标准，运行`JavaScript`创建多个线程，但是子线程完全受主线程控制，且不得操作`DOM`。所以，这个标准并没有改变`JavaScript`单线程的本质

 浏览器中的`Event Loop`

事件循环这个名字来源于它往往这么实现:

```cpp
while(queue.waitForMessage()) {
 queue.processNextMessage();
}
```

这个模型的优势在于它必须处理完一个消息(run to completion),才会处理下一个消息,使程序可追溯性更强。不像C语言可能随时从一个线程切换到另一个线程。但是缺点也在于此,若同步代码阻塞则会影响用户交互

 `macroTask`和`microTask`

宏队列，`macroTask`也叫`tasks`。包含同步任务，和一些异步任务的回调会依次进入`macro task queue`中，`macroTask`包含:

* script代码块
* setTimeout
* requestAnimationFrame
* I/O
* UI rendering

微队列, `microtask`，也叫`jobs`。另外一些异步任务的回调会依次进入`micro task queue`，等待后续被调用，这些异步任务包含:

* Promise.then
* MutationObserver

下面是`Event Loop`的示意图

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/24/16dfca86d30dc6d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
一段`JavaScript`执行的具体流程就是如下：

1. 首先执行宏队列中取出第一个，一段`script`就是相当于一个`macrotask`,所以他先会执行同步代码，当遇到例如`setTimeout`的时候，就会把这个异步任务推送到宏队列队尾中。
2. 当前`macrotask`执行完成以后，就会从微队列中取出位于头部的异步任务进行执行，然后微队列中任务的长度减一。
3. 然后继续从微队列中取出任务，直到整个队列中没有任务。如果在执行微队列任务的过程中，又产生了`microtask`，那么会加入整个队列的队尾，也会在当前的周期中执行
4. 当微队列的任务为空了，那么就需要执行下一个`macrotask`，执行完成以后再执行微队列，以此反复。
 总结下来就是不断从`task`队列中按顺序取`task`执行，每执行完一个`task`都会检查`microtask`是否为空，不让过不为空就执行队列中的所有`microtask`。然后在取下一个`task`以此循环

 调用栈和任务队列

调用栈是一个栈结构，函数调用会形成一个栈帧。栈帧：调用栈中每个实体被称为栈帧，帧中包含了当前执行函数的参数和局部变量等上下文信息，函数执行完成后，它的执行上下文会从栈中弹出。 下面是调用栈和任务队列的关系:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/25/16e01c44735fee30~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
分析文章开头的题目，可以通过在题目前面添加`debugger`，结合`chrome`的`call stack`进行分析:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/25/16e01cbeaa6b1c05~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
(这里不知道怎么画动图，在晚上找的一张图，小伙伴们有好的工具，求分享); 下面借助三个数组来分析一下这段代码的执行流程，`call stack`表示调用栈，`macroTasks`表示宏队列，`microTasks`表示微队列：

1. 首先代码执行之前都是三个队列都是空的:

```apache
callStack: []
macroTasks: [main]
microTasks: []
```

在前面提到，整个代码块就相当于一个`macroTask`，所以首先向`callStack`中压入`main()`，`main`相当于整个代码块
2. 执行`main`，输出同步代码结果:

```apache
callStack: [main]
macroTasks: []
microTasks: []
```

在遇到`setTimeout`和`promise`的时候会向`macroTasks`与`microTasks`中分别推入
3. 此时的三个队列分别是:

```apache
callStack: [main]
macroTasks: [setTimeout]
microTasks: [promise]
```

当这段代码执行完成以后，会输出:

```applescript
script start
script end
```

4. 当`main`执行完成以后，会取`microTasks`中的任务，放入`callStack`中，此时的三个队列为:

```apache
callStack: [promise]
macroTasks: [setTimeout]
microTask: []
```

当这个`promise`执行完成后会输出

```
promise1
```

后面又有一个`then`，在前面提到如果还有`microtask`就在微队列队尾中加入这个任务，并且在当前`tick`执行。所以紧接着输出`promise2`
5. 当前的`tick`也就完成了，最后在从`macroTasks`取出`task`，此时三个队列的状态如下：

```apache
callStack: [setTimeout]
macroTasks: []
microTask: []
```

最后输出的结果就是`setTimeout`。
所谓的事件循环就是从两个队列中不断取出事件，然后执行，反复循环就是事件循环。经过上面的示例，理解起来是不是比较简单

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

```js
const channel = new BroadcastChannel('channelName')
```

2. 在一个标签页中发送消息：

```js
channel.postMessage('message')
```

3. 在其他标签页中监听消息并做出响应：

```js
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

```js
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

```js
// 页面1
const sharedWorker = new SharedWorker('worker.js')

// 获取共享 Worker 的端口
const port = sharedWorker.port

// 发送消息
port.postMessage('Message from Page 1')

// 接收消息
port.onmessage = function (event) {
  const message = event.data

  // 处理接收到的消息
  // ...
}

// 页面2
// var sharedWorker = new SharedWorker('worker.js')

// // 获取共享 Worker 的端口
// var port = sharedWorker.port

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

```js
// 发送消息到目标窗口
window.postMessage('Hello, World!', 'https://example.com')
```

在接收消息的窗口中：

```js
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

```js
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

```js
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

```js
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

```js
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

```js
const fileInput = document.getElementById('fileInput')
const selectedFile = fileInput.files[0]
```

3. 读取文件内容。使用FileReader对象来读取文件内容。创建一个新的FileReader对象，然后使用它的readAsText()方法来读取文件内容，例如：

```js
const reader = new FileReader()
reader.onload = function (event) {
  const fileContent = event.target.result
  // 在这里对文件内容进行操作
}
reader.readAsText(selectedFile)
```

4. 对文件内容进行操作。在上一步的回调函数中，可以获取到文件的内容，然后可以对该内容进行任何需要的操作，例如将其显示在页面上或者发送到服务器。

5. 写入文件。如果需要将内容写入本地文件，可以使用FileWriter对象来实现。创建一个新的FileWriter对象，然后使用它的write()方法来写入内容，例如：

```js
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

## 浏览器缓存中 Memory Cache 和 Disk Cache， 有啥区别？ {#p0-disk-memory}

在浏览器缓存中，Memory Cache 和 Disk Cache 是两种不同的缓存类型，它们有以下区别：

1. 存储位置：Memory Cache 存储在内存中，而 Disk Cache 存储在硬盘中。
2. 读取速度：Memory Cache 读取速度比 Disk Cache 快，因为内存访问速度比硬盘访问速度快。
3. 存储容量：Memory Cache 存储容量比较小，一般只有几十兆，而 Disk Cache 存储容量比较大，可以有数百兆或者更多。
4. 生命周期：Memory Cache 生命周期短暂，一般只在当前会话中有效，当会话结束或者浏览器关闭时，Memory Cache 就会被清空；而 Disk Cache 生命周期比较长，数据可以被保存很长时间，即使浏览器关闭了，下次打开还可以使用。

一般来说，浏览器在请求资源时，会优先从 Memory Cache 中读取，如果没有找到再去 Disk Cache 中查找。如果两种缓存中都没有找到，则会向服务器发送请求。如果需要强制刷新缓存，可以通过清空浏览器缓存来实现。

 什么情况下资源会缓存在 Memory Cache， 什么情况下会缓存在 Disk Cache ?

浏览器中的缓存是为了提高网页访问速度和减少网络流量而存在的。缓存分为 Memory Cache 和 Disk Cache 两种。

Memory Cache 是浏览器内存缓存，资源会被缓存在内存中，由于内存读取速度快，所以 Memory Cache 的读取速度也较快。资源被缓存在 Memory Cache 中的情况有：

1. 当前页面中通过 `<link>` 或者 `<script>` 标签引入的资源；
2. 当前页面通过 XMLHttpRequest 或 Fetch API 请求获取到的资源。

Disk Cache 是浏览器磁盘缓存，资源会被缓存在磁盘中。由于磁盘读取速度相对内存较慢，所以 Disk Cache 的读取速度也较慢。资源被缓存在 Disk Cache 中的情况有：

1. 当前页面中通过 `<img>` 标签引入的资源；
2. 当前页面中通过 `<audio>` 或 `<video>` 标签引入的资源；
3. 当前页面中通过 `iframe` 加载的资源；
4. 当前页面中通过 `WebSocket` 加载的资源；
5. 通过 `Service Worker` 缓存的资源。

一般来说，比较大的资源会被缓存到 Disk Cache 中，而较小的资源则会被缓存到 Memory Cache 中。如果需要手动清除缓存，可以在浏览器设置中找到相应选项进行操作。

## 浏览器 和 Node 事件循环有区别吗？ {#p0-eventloop-browser-node}

浏览器和Node.js事件循环在本质上是相同的，它们都是基于事件循环模型实现异步操作。但是它们的实现细节和环境限制有所不同。

在浏览器中，事件循环模型基于浏览器提供的`EventTarget`接口，包括浏览器环境下的DOM、XMLHttpRequest、WebSocket、Web Worker等等，所有的异步任务都会被推入任务队列，等待事件循环系统去处理。

而在Node.js中，事件循环模型则基于Node提供的`EventEmitter`接口，所有的异步任务都会被推入libuv的事件队列中，等待事件循环系统去处理。同时，Node.js还有一个特点是支持I/O操作，也就是在I/O完成之前，会把任务挂起，不会把任务加入到事件队列中，以避免事件队列阻塞。

另外，浏览器中的事件循环系统是单线程的，即所有的任务都在同一个线程中运行，因此需要注意不能有耗时的操作。而Node.js则是多线程的，它可以利用异步I/O等机制来充分利用多核CPU的能力，提高并发处理能力。

---------------

> 2023.05.15 补充

Node.js 和浏览器的 Event Loop 的差异主要体现在以下几个方面：

1.实现方法不同：Node.js 的 Event Loop 实现与浏览器中的不同。Node.js 使用了 libuv 库来实现 Event Loop，而浏览器中通常使用的是浏览器引擎自带的 Event Loop。

2.触发时机不同：Node.js 和浏览器中的 Event Loop 的触发时机也有所不同。浏览器的 Event Loop 在主线程上执行，当主线程空闲时会执行 Event Loop，而 Node.js 的 Event Loop 是在一个单独的线程中运行，与主线程分离。

3.内置的 API 不同：Node.js 的事件机制包含一些在浏览器中没有的 API，比如 fs、http、net 等模块，这些内置的 API 让 Node.js 的 Event Loop 更加强大。

4.在浏览器中，有一些 Web API 是异步的，比如 setTimeout、setInterval、XMLHTTPRequest 等，这些 Web API 在事件队列中注册了一个回调函数，然后在一定时间后由 Event Loop 触发执行。而在 Node.js 中，它们同样存在，但是它们不是 Web API 的一部分。Node.js 通过 Timers、I/O Callbacks、Immediate 和 Close Callbacks 等回调机制来执行类似的任务，这些回调函数同样会被注册到事件队列中等待执行。

总之，Node.js 和浏览器中的 Event Loop 主要差异在于实现方法、触发时机和内置 API 等方面。但无论在哪种环境中，Event Loop 都是 JavaScript 异步编程的基础。

## 浏览器渲染进程了解多少？ {#p0-render-process}

浏览器渲染UI的过程通常被称为渲染流水线（rendering pipeline），它可以分为以下几个步骤：

1. 解析HTML：浏览器首先解析HTML代码，创建DOM（文档对象模型）树。DOM树是由节点和对象组成的层次结构，它表示了文档的内容和结构。

2. 解析CSS：浏览器接着解析CSS代码，创建CSSOM（CSS对象模型）树。CSSOM树是由CSS规则和对应的元素组成的层次结构，它表示了文档中的元素的样式信息。

3. 创建渲染树：浏览器将DOM树和CSSOM树结合起来，生成渲染树。渲染树只包含需要显示的元素，它是一种按照渲染顺序排列的树形结构。

4. 布局：浏览器对渲染树进行布局（layout），计算每个元素在屏幕上的位置和大小。

5. 绘制：浏览器将渲染树中的每个元素绘制到屏幕上。

6. 合成：如果有多个层叠的元素，浏览器将它们合成一个图层，以提高性能。

这些步骤通常是逐步完成的，而且它们是相互依赖的。例如，布局必须在绘制之前完成，因为绘制需要知道每个元素的位置和大小。为了提高性能，浏览器通常会对这些步骤进行优化，例如使用异步布局和延迟合成等技术。

浏览器是一个多进程的架构，当我们每开一个tab页面，就会开一个新的进程，所以如果一个页面崩溃也不会影响到别的页面。面试的时候经常会问从输入url到页面显示都发生了什么，这次主要说说针对渲染这块而浏览器具体都做了些什么，都有哪些进程？

首先浏览器进程有如下几部分：**主进程**，**第三方插件进程，GPU进程，渲染进程**。

而渲染进程又包含了很多线程：**js引擎线程，事件触发线程，定时器触发线程，异步http请求线程，GUI渲染线程。**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e40c867849c4911a6c16491a9bcf739~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

主进程：负责页面的显示与交互，各个页面的管理，创建和销毁其他进程。网络的资源管理和下载。

GPU进程： 最多有一个，3d绘制等。

插件进程： 每种类型的插件对应一个进程。

渲染进程：称为浏览器渲染或浏览器内核，内部是多线程的；主要负责页面渲染，脚本执行，事件处理等。

GUI渲染线程：

```markdown
1. 负责渲染浏览器界面，解析html，css，构建dom树和render树，布局和绘制。
2. 当重绘和回流的时候就会执行这个线程
3. GUI渲染线程和js引擎线程互斥，当js引擎执行时，GUI线程就会被挂起（相当于冻结了），GUI更新会被保存在一个队列中等到js引擎空闲时立即执行。


```

js引擎线程：

```markdown
1. 也称js内核，负责处理js脚本程序，例如v8引擎
2. 负责解析js脚本，运行代码
3. 等待任务队列中的任务，一个tab页只有一个js进程
4. 因为与GUI渲染线程互斥，所以js执行过长时间，就会造成页面渲染不连贯，导致页面渲染阻塞

```

事件触发线程：

```markdown
1. 归属于浏览器而不是js引擎，用了控制事件循环
2. 当js引擎执行settimeout类似的代码块时，会将对应任务添加到事件线程
3. 当对应的事件符合触发条件时，会被放到任务队列的队尾，等待js引擎线程处理
4. 由于js单线程的关系，这些等待处理的事件都需要排队等待js引擎处理

```

定时器触发线程：

```markdown
1. settimeout和setinterval所在的线程
2. 浏览器定时计数器不是由js引擎线程计数的，因此通过单独线程来计时触发定时，计时完毕后，添加到事件队列，等待js引擎执行。

```

异步http请求进程：

```markdown
1. 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求。
2. 将检测到状态变更时,如果设置有回调函数,异步线程就产生状态变更事件,将这个回调再放入事件队列中。再由 JavaScript 引擎执行

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e0e27b8d2954ab18ddf0ba13bdf70ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0bb32540e484bff8c162417e8112154~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

看图能大致了解渲染流程的七七八八，我按照我的理解重新梳理一下：

```css
1. 构建DOM树。因为浏览器无法理解和直接使用html所以需要转换成dom树的形式，对html进行解析。
2. 样式计算，对css进行解析。首先把css文本转化成浏览器可以理解的结构--stylesheets，然后对stylesheets进行标准化处理，就是将一些属性值转化为渲染引擎更容易理解，标准化的计算值（例如，color单词形式转化为rgb，em单位转化为px），其次计算dom节点的样式属性。
3. 布局阶段。
 a. 首先创建布局：遍历dom中所有节点，并添加到布局树中。
 b. 布局计算：通过js和css，计算dom在页面上的位置。
 c. 最后创建布局树。
4. 分层。根据复杂的3d转换，页面滚动，还有z-index属性都会形成单独图层，把图层按照正确顺序排列。生成分层树。
5. 图层绘制，栅格化以及图层显示。对每个图层进行单独的绘制，并提交到合成器线程。
6. 合成线程将图层分为图块，并在栅格化线程池中将图块转化为位图。
7. 合成线程发送绘制图块命令drawquads给浏览器进程。
8. 浏览器根据drawquads消息生成页面展示出来

```

 css阻塞，js阻塞

关于提高页面性能经常听到建议说：把css代码放头部，js代码放底部。还有如果script和link都在头部，应该把script放上面。

css不会阻塞DOM解析，css阻塞DOM渲染：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cbba082d94a4241b2c2ab9e1e73c2c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

从这个渲染流程图可以看出，dom解析的时候，也可以进行css的解析

js阻塞DOM解析：

如果“script”和link都在头部，把link放在头部。就会发生阻塞，浏览器会先去下载css样式，再执行js，再执行dom。 因为浏览器不知道js脚本会写些什么，如果有删除dom操作，那提前解析dom就是无用功。不过浏览器也会先“偷看”下html中是否有碰到如link、script和img等标签时，它会帮助我们先行下载里面的资源，不会傻等到解析到那里时才下载。

我们在优化js阻塞的时候经常会用**defer和async异步进行js的解析，那这两个有什么区别呢？**

 async

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d5baa0a68b84c65b8b9059edf12be5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bde046b1318a4cc2849607734cd6653c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，async异步的解析js，如果js解析完毕，html还没解析完，就会停止html解析，立即执行js； 如果html解析完了就正好，直接执行js。所以还是有可能阻塞html。

 defer

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df533c40559640b78c0806288e60dc48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，defer可以异步的支持解析js，等到html解析完成后，才会执行js。必然不会阻塞html。

## gc {#gc}

浏览器垃圾回收机制是指浏览器在运行时自动回收不再使用的内存空间的过程。以下是浏览器垃圾回收机制的几个方面：

1. `标记清除`：这是一种最常用的垃圾回收机制。它的工作原理是标记所有当前正在使用的对象，然后清除未标记的对象。这种方法的优点是效率高，缺点是可能会导致内存碎片。

2. `引用计数`：这种垃圾回收机制会跟踪每个对象被引用的次数，当引用计数为零时，就会回收该对象。这种方法的优点是可以立即回收不再使用的对象，缺点是无法处理循环引用。

3. `分代回收`：这是一种结合了标记清除和引用计数的垃圾回收机制。它将对象分为几代，然后在不同的代上使用不同的回收策略。新创建的对象会被分配到第一代，随着时间的推移，如果它们仍然存活，它们会被转移到下一代。这种方法的优点是可以更精细地控制回收策略。

浏览器垃圾回收机制可以帮助开发人员避免内存泄漏和减少程序崩溃的风险。不同的浏览器和不同的 JavaScript 引擎实现可能有不同的垃圾回收机制，但它们的基本原理是相似的。

**标记清除**

在JavaScript中，垃圾回收是一种自动管理内存的机制，它负责检测不再被使用的对象，并将其释放以回收内存空间。标记清除法是垃圾回收的一种常见算法。

标记清除法的工作原理如下：

1. 标记阶段：垃圾回收器首先会从根对象开始，递归遍历所有可访问的对象，并给这些对象打上标记。根对象可以是全局对象、当前执行上下文中的变量、正在执行的函数的局部变量等。只有被标记的对象才视为可达的，未被标记的对象则被视为不可达。

2. 清除阶段：在标记阶段完成后，垃圾回收器会遍历堆内存中的所有对象，清除未被标记的对象。这些未被标记的对象是不可达的，即不再被程序所使用。清除后的空间可以用于存储新的对象。

标记清除法的特点包括：

1. 自动触发：JavaScript的垃圾回收是自动触发的，开发人员无需显式地释放内存。

2. 引用计数：标记清除法不会使用引用计数来判断对象的可达性。引用计数是一种简单的垃圾回收算法，它通过记录对象被引用的次数来判断对象是否可达。然而，引用计数法无法解决循环引用的问题。

3. 效率：标记清除法可以高效地回收不再使用的内存空间，但在回收大量内存时可能会导致一段时间的停顿，因为垃圾回收器需要暂停程序的执行来完成清除操作。

**引用计数方式**

在JavaScript中，引用计数是一种常见的垃圾回收算法。它的基本原理是通过对每个对象进行引用计数，来判断对象是否可达。当对象的引用计数为0时，即没有任何引用指向该对象，那么该对象就不再被使用，可以被回收。

引用计数法的工作原理如下：

1. 引用计数：每当一个对象被创建时，都会给该对象的引用计数设置为1。当有其他变量引用该对象时，引用计数会增加。当变量不再引用该对象时，引用计数会减少。

2. 循环引用：引用计数法无法解决循环引用的问题。循环引用指的是两个或多个对象互相引用，导致它们的引用计数都不为0，即使这些对象都不再被程序所使用，也无法回收它们。这是因为循环引用导致对象的引用计数无法归零，垃圾回收器无法判断它们是否可达。

3. 垃圾回收：垃圾回收器会定期执行垃圾回收操作，检查所有对象的引用计数。当一个对象的引用计数为0时，垃圾回收器会将其认定为垃圾对象，可以将其回收以释放内存空间。

4. 回收操作：当一个对象被回收时，垃圾回收器会释放对象所占用的内存空间，并且递归地减少该对象引用的所有其他对象的引用计数。如果被减少的对象引用计数归零，则继续回收该对象。这个过程会不断地进行，直到所有的垃圾对象都被回收。

## dom tree {#p1-dom-tree}

1. 解析HTML代码：浏览器会将HTML代码解析成一个DOM树的结构。

2. 创建根节点：DOM树的根节点通常是HTML元素。

3. 创建子节点：根据HTML标记的嵌套关系，浏览器会在DOM树中创建相应的子节点，每个节点表示一个HTML元素。

4. 创建属性节点：HTML元素可能有一些属性，例如id、class、src等，浏览器会将这些属性创建为节点的属性节点。

5. 创建文本节点：如果HTML元素中包含文本内容，浏览器会将这些文本内容创建为文本节点，并将它们作为元素的子节点插入到DOM树中。

6. 创建注释节点：HTML代码中可能包含注释，浏览器会将注释创建为注释节点，并将它们插入到DOM树中。

7. 构建完整的DOM树：经过以上步骤，浏览器会将所有HTML代码解析成一个完整的DOM树。

需要注意的是，浏览器构建DOM树是一个逐步进行的过程，解析器会逐个读取HTML标记，并创建相应的节点，直到解析完整个HTML代码。在这个过程中，如果遇到错误的HTML标记，浏览器也会尽可能地将其解析成一个节点，以保证DOM树的完整性。

## css parser {#p0-css-parser}

浏览器会『从右往左』解析CSS选择器。

 CSS选择器的解析顺序

相信很多人在一开始接触CSS的时候都会看到一条规则就是尽量少使用层级关系，比如尽量不要写成：

```css
#div P.class {
 color: red;
}
```

而是写成：

```css
.class {
 color: red;
}
```

之所以需要这么写，给的解释是这样可以减少选择器匹配的次数。
初看觉得哦，有点道理啊，但是往细了再想想：
如果我把层级定的足够的清晰分明，那不是可以直接去掉很多不对应的CSS选择器的索引路径的么？为什么都是建议少使用层级关系呢？

原因其实很简单，我们犯了一个经验主义错误，默认CSS选择器是从左往右进行解析的，实际上恰恰相反，CSS选择器是从右往左解析的。

 CSS选择器进行优化的必要性

再次看下图：
![img](https://img-blog.csdn.net/20160805094241153)

在图中我们可以看到HTML解析出了一颗DOM tree，与此同时样式脚本则解析生成了一个style rules，也可以说是一个CSS tree。
最后，DOM tree同style rules一同结合解析出一颗Render Tree，
而Render Tree就是包含了一个dom对象以及为其计算好的样式规则，提供了布局以及显示方法。

因为不清楚一个DOM对象上究竟对应着哪些样式规则，所以只能选择一个最笨的办法，
即每一个DOM对象都遍历一遍style rules，DOM对象的数量相信大家也都清楚，
如果每次遍历style rules都是像一个晒太阳的老大爷一样的悠哉游哉，因此对CSS选择器进行优化就是一个必须的事情了。

 从右往左解析到底好在哪里

假如有如下的一段HTML：

```html
<div id="div1">
 <div class="a">
 <div class="b">
 ...
 </div>
 <div class="c">
 <div class="d">
 ...
 </div>
 <div class="e">
 ...
 </div>
 </div>
 </div>
 <div class="f">
 <div class="c">
 <div class="d">
 ...
 </div>
 </div>
 </div>
</div>
```

和如下的CSS：

```css
#div1 .c .d {}
.f .c .d {}
.a .c .e {}
#div1 .f {}
.c .d{}
```

假如我们的CSS解析器是从左往右进行匹配的，那么会生成如下的style rules：
![01_47_03](https://user-images.githubusercontent.com/22188674/224469670-1156d32e-ea84-4a5a-9323-308d2db320b3.jpg)

首先，#div1 .c .d ｛｝ .f .c .d ｛｝.c .d｛｝这三个选择器里面都含有 **.c .d｛｝这么一个公用样式，**
所以哪怕是我们的DOM节点明确了是在#div1下面都必须对style rules进行全部的匹配查找，
这样一来基本上可以说是**每一个DOM节点都必须完全遍历一遍style rules**，
不然搞不好就会漏掉一些公用样式之类的，所以想着将层级写的更加详细就能去掉很多不对应的CSS选择器的索引路径的就不要想了，
不管你写的多细，你总是需要把整个style rules都遍历一遍，不然万一漏掉了某个公用样式不就思密达了？

那么如果我们换成从右向左进行解析就能够避免这种情况了么？请看下面这个style rules：
![01_47_04](https://user-images.githubusercontent.com/22188674/224469699-0dc5d98b-3995-4cb9-b4ae-375441dcc995.jpeg)

别的先不提，**最少这个节点就少了很多**嘛，哪怕我这里同样是需要全部遍历一遍就冲着减少了这么多个节点也要从右往左进行解析啊！
更重要的是，只要有公用样式，那么选择器最右边的那个类型选择器一定是相同的，如此公共样式就很自然的都集中到一个分支上，
这个时候我们**完全可以将其他不匹配的路径全部去掉而不用担心会漏掉某些个公用样式了**。
虽然当这颗CSS树在遍历的时候还有有部分节点会遍历到最后才能确定到底是不是匹配的，
但总的来说从**右往左进行解析还是会比从左往右解析要少很多次的匹配**，这样带来的效率提升是显而易见的！

同时，这也是不建议使用*通配符来进行样式匹配的原因：浏览器专门建立了一个反常规思维的从右往左的匹配规则就是为了避免对所有元素进行遍历。

最后，从右往左进行解析还有一个好处那就是从右往左进行匹配的时候，匹配的全部是DOM元素的父节点，
而从左往右进行匹配的时候时候，匹配的全部是DOM元素的子节点，这样就**避免了HTML与CSS没有下载完需要进行等待的情形**。
