# 事件

## 事件冒泡? {#p0-event-bubble}

## 事件委托的作用和意义？ {#p1-event-delegate}

1. 实现原理
1. 通过 target 事件对象获取事件目标元素

## 说明 load,ready,DOMContentLoaded 的区别 {#p1-event-load-ready-domcontentloaded}

<Answer>

`DOMContentLoaded`事件和`load`事件主要有以下区别：

**一、触发时机**

1. `DOMContentLoaded`事件：

* 触发时机是在文档的 DOM（文档对象模型）完全加载和解析完成后，不等待样式表、图片和子框架等外部资源的加载完成。这意味着当 HTML 结构被完全解析，并且可以通过 JavaScript 访问和操作 DOM 元素时，该事件就会触发。
* 例如，当打开一个网页时，浏览器首先下载 HTML 文档并进行解析。一旦 HTML 文档的解析完成，`DOMContentLoaded`事件就会触发，此时可以立即执行一些与 DOM 操作相关的 JavaScript 代码，而不必等待页面上的所有图像和其他资源加载完毕。

2. `load`事件：

* 触发时机是在整个网页（包括所有的资源如样式表、图片、脚本等）完全加载完成后。这意味着不仅 HTML 文档的 DOM 结构要被加载和解析，而且所有的外部资源（如图片、CSS 文件、JavaScript 文件等）也必须完全下载并加载到浏览器中，该事件才会触发。
* 例如，在一个包含大量图片和复杂样式表的网页中，`load`事件可能会在所有这些资源都加载完成后才触发，这可能需要相对较长的时间，具体取决于网络速度和资源的大小。

**二、用途**

1. `DOMContentLoaded`事件：

* 通常用于在 DOM 准备好后尽快执行一些关键的 JavaScript 代码，这些代码可能需要操作 DOM 元素或设置事件监听器，但不需要等待所有外部资源的加载。这样可以提高页面的交互性和响应速度，因为用户可以在页面的主要内容加载完成后就开始与页面进行交互，而不必等待所有资源加载完毕。
* 例如，可以在`DOMContentLoaded`事件的回调函数中初始化页面的布局、设置表单验证规则或显示一些初始的动画效果。

2. `load`事件：

* 主要用于在确保整个页面的所有资源都加载完成后执行一些特定的操作，这些操作可能依赖于所有的资源都可用。例如，在一个需要确保所有图片都加载完成后才能正确显示的画廊页面中，可以使用`load`事件来触发图片的展示动画或调整页面布局以适应所有图片的尺寸。
* 另外，`load`事件也可以用于在页面完全加载后进行一些性能监测或统计工作，例如记录页面的加载时间或检查所有资源是否正确加载。

**三、性能影响**

1. `DOMContentLoaded`事件：

* 由于它在 DOM 加载和解析完成后就触发，不等待外部资源的加载，所以可以更快地执行相关的 JavaScript 代码，减少用户等待的时间。这对于提高页面的性能和用户体验非常重要，特别是在网络速度较慢或页面包含大量资源的情况下。
* 例如，如果一个页面有很多大尺寸的图片，使用`DOMContentLoaded`事件可以让用户在图片还在加载的过程中就开始与页面进行交互，而不必等待所有图片都加载完成。

2. `load`事件：

* 因为它需要等待所有资源的加载完成，所以可能会导致页面的加载时间较长，特别是在网络状况不佳或资源较多的情况下。然而，在某些情况下，确保所有资源都加载完成是必要的，所以`load`事件仍然有其特定的用途。
* 例如，如果一个页面的布局或功能依赖于所有的样式表和图片都加载完成，那么使用`load`事件可以确保在执行相关代码时所有资源都可用，避免出现布局错误或功能不正常的情况。

* ready  为 jqury 事件,为 domcontentLoad 触发 完成了 html 文档的解析就会触发,样式等元素还未加载
* window loaded 在页面完全加载成功后触发包括图片脚本等

1. 发送请求
2. 接收字节流
3. 解析字节流 tokenizer
4. 解析完成触发 DOMContentLoaded 事件
5. 图片等资源完成加载
6. 页面加载完毕。// window.onload

> 事件变化触发 onreadytstatechange ,该状态由 `document.readyState` 控制

参看 [资源加载和页面事件load, ready, DOMContentLoaded...
](https://zhuanlan.zhihu.com/p/30283138)

</Answer>

## 事件冒泡机制?

参考 [w3c ui event](https://www.w3.org/TR/uievents/#dom-event-architecture)
冒泡机制是为了解决在如何在 DOM 树上广播事件。整个广播流程参考下图:

![](https://www.w3.org/TR/uievents/images/eventflow.svg)

整个事件从创建到完成的流程如下

1. 事件产生,用户点击等操作,此时会创建一个 `event target` 对象包含出发事件时的相关信息
   * `target` 指向触发事件的元素
   * `currentTarget` 只读属性指向事件分发过程中的当前对象
   * 在回调函数中 `this` 指向 currentTarget.
2. 根据当前触发元素确定传播路径
3. 事件分发,此时时间会在 DOM 树上进行广播,广播分为三个阶段
   1. **捕获阶段** 从传播路径的根元素向目标元素传播,从 window 开始
   2. **目标阶段** 当传播到达事件目标时
   3. **冒泡阶段** 当从事件目标对象向父元素广播时从 window 结束。

 > 事件广播过程会修改 `event target` 相关状态,此外可以利用 `stopPropagation` 对事件传播进行截断。

4. 事件处理阶段,在事件分发过程中若传播路径有元素绑定了回调事件,`event target` 对象作为传入参数触发执行。

参考 [w3c ui event 说明](https://www.w3.org/TR/uievents/images/eventflow.svg)

![](https://www.w3.org/TR/uievents/images/eventflow.svg)

但目标元素触发事件时,事件的分发分为三个阶段:

1. **捕获阶段(capture phase)** 从根元素逐级向目标元素传递
2. **目标阶段(target phase)** 传递到目标元素的阶段
3. **冒泡阶段(bubbling phase)** 从目标元素重新传递到根元素的阶段

## stopImmediatePropagation 和 stopPropagation 区别

## addEventListener 和 attribute onclick

为什么 `{capture:true}` 不是先触发
参见此回答 [Event listeners registered for capturing phase not triggered before bubbling - why?](https://stackoverflow.com/questions/11841330/event-listeners-registered-for-capturing-phase-not-triggered-before-bubbling-w)

* [冒泡和捕获](https://javascript.info/bubbling-and-capturing)

## 什么是事件委托 {#p1-event-delegate}

<Answer>

事件委托是指在父节点集中处理子节点事件

参考 [adv-talk](https://johnresig.com/apps/workshop/adv-talk/#19) 定义。
事件委托一种机制,将原应在多个子节点上绑定的事件回调,统一在父节点上进行绑定。

* 并非所有事件都会冒泡 blur，focus，load 和 unload 事件不冒泡像其他事件
* 管理某些鼠标事件时需要谨慎。如果您的代码正在处理 mousemove 事件，那么您将面临创建性能瓶颈的严重风险，因为 mousemove 事件经常被触发。该 mouseout 事件具有奇怪的行为，难以通过事件委派来管理。

* [Javascript: Closures vs Event Delegation](https://lists.evolt.org/archive/Week-of-Mon-20090209/127331.html)
* [delegating_the](https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html)
* [event delegation](https://humanwhocodes.com/blog/2009/06/30/event-delegation-in-javascript/)
* [stackoverflow event delegation](https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation)
* [ ] [事件委托模式](https://zh.javascript.info/event-delegation)
* [ ] [jquery delegate](https://api.jquery.com/delegate/)
* [ ] [jquery on](https://api.jquery.com/on/#direct-and-delegated-events)
* [ ] [github delegate 源码](https://github.com/dgraham/delegated-events#readme)

* created_at: 2024-10-26T07:48:24Z
* updated_at: 2024-10-26T07:48:24Z
* labels: JavaScript
* milestone: 初

**关键词**：事件委托概念

事件委托（Event Delegation）是一种利用事件冒泡机制，将事件处理程序添加到父元素上，通过判断事件的目标元素来处理子元素事件的方法。

**一、事件委托的原理**

当一个事件在 DOM 元素上触发时，它会从最具体的目标元素开始向上冒泡，经过它的祖先元素，直到到达文档的根元素。事件委托利用这个特性，将事件处理程序添加到一个较高层次的父元素上，而不是为每个子元素单独添加事件处理程序。当事件在子元素上触发时，它会冒泡到父元素，父元素上的事件处理程序可以通过检查事件的目标元素来确定是否应该处理该事件。

**二、事件委托的适用场景**

1. 动态生成的元素

* 当页面中有大量动态生成的元素时，如果为每个元素单独添加事件处理程序，会非常低效，因为每次生成新元素都需要重新添加事件处理程序。而使用事件委托，只需要在父元素上添加一个事件处理程序，就可以处理所有子元素的事件，无论子元素是在页面加载时就存在还是在后续动态生成的。
* 例如，在一个列表中，当用户点击列表项时需要执行某个操作。如果列表项是动态生成的，使用事件委托可以避免为每个列表项单独添加点击事件处理程序。

2. 减少内存占用和提高性能

* 为大量元素添加事件处理程序会占用较多的内存，并且可能会影响页面的性能。事件委托可以减少事件处理程序的数量，从而降低内存占用和提高性能。
* 例如，在一个包含大量按钮的页面中，如果为每个按钮都添加一个点击事件处理程序，会消耗较多的内存。而使用事件委托，只需要在按钮的父元素上添加一个点击事件处理程序，就可以处理所有按钮的点击事件。

3. 统一处理相似元素的事件

* 当有多个相似的元素需要处理相同的事件时，可以使用事件委托将它们的事件处理程序统一添加到一个父元素上，这样可以简化代码并提高可维护性。
* 例如，在一个表格中，所有的单元格都需要处理点击事件，可以将点击事件处理程序添加到表格元素上，然后根据点击的目标单元格进行相应的处理。

</Answer>

## addEventListener绑定事件?参数不同的执行顺序 {#p1-event-add-event-listener}

## mouseEnter、mouseLeave、mouseOver、mouseOut 有什么区别？{#p2-mouse}

这四个事件都与鼠标指针与元素的交互有关，不过它们之间有一些关键的差异：

1. **mouseEnter 和 mouseLeave**：

* `mouseEnter` 事件当鼠标指针进入元素时触发，但不冒泡，即只有指定的元素可以触发此事件，其子元素不能。
* `mouseLeave` 事件则是当鼠标指针离开元素时触发，同样也不冒泡。

2. **mouseOver 和 mouseOut**：

* `mouseOver` 事件当鼠标指针移动到元素或其子元素上时触发，该事件会冒泡，即如果鼠标指针移动到其子元素上，也会触发该元素的`mouseOver`事件。
* `mouseOut` 事件则是当鼠标指针离开元素或其子元素时触发，也会冒泡。

总结一下它们的区别：

* **冒泡**: `mouseOver` 和 `mouseOut` 事件会冒泡（父元素也会响应这个事件），而 `mouseEnter` 和 `mouseLeave` 不会冒泡。
* **对子元素的响应**：`mouseOver` 和 `mouseOut` 会在鼠标指针移动到子元素上时也被触发，而 `mouseEnter` 和 `mouseLeave` 在鼠标指针移动到子元素上时不会被触发。

在处理具有嵌套子元素的元素时，使用 `mouseEnter` 和 `mouseLeave` 可以避免多余的事件触发，因为它们不会在鼠标从父元素移动到子元素时触发事件。(即不会对内部子元素的进入和离开反应敏感)。而 `mouseOver` 和 `mouseOut` 更适合需要监测鼠标指针是否有移动到子元素上的情况。
