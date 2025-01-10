## ready 和 load 区别?

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

## 什么是事件委托

事件委托是指在父节点集中处理子节点事件

参考 [adv-talk](https://johnresig.com/apps/workshop/adv-talk/#19) 定义。
事件委托一种机制,将原应在多个子节点上绑定的事件回调,统一在父节点上进行绑定。

* 并非所有事件都会冒泡 blur，focus，load 和 unload 事件不冒泡像其他事件
* 管理某些鼠标事件时需要谨慎。如果您的代码正在处理 mousemove 事件，那么您将面临创建性能瓶颈的严重风险，因为 mousemove 事件经常被触发。该 mouseout 事件具有奇怪的行为，难以通过事件委派来管理。

## 典型示例

### demo

### jquery

```js
// eslint-disable-next-line
$('#thing').click(
  // eslint-disable-next-line
  $.delegate({
    '.quit': function () {
      /* do quit stuff */
    },
    '.edit': function () {
      /* do edit stuff */
    }
  })
)
```

### 列表循环

资料来源于 [Javascript: Closures vs Event Delegation](https://lists.evolt.org/archive/Week-of-Mon-20090209/127331.html)

### focus blur 委派

参加 [delegating_the](https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html)

## 参考资料

* [event delegation](https://humanwhocodes.com/blog/2009/06/30/event-delegation-in-javascript/)
* [stackoverflow event delegation](https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation)
* [ ] [事件委托模式](https://zh.javascript.info/event-delegation)
* [ ] [jquery delegate](https://api.jquery.com/delegate/)
* [ ] [jquery on](https://api.jquery.com/on/#direct-and-delegated-events)
* [ ] [github delegate 源码](https://github.com/dgraham/delegated-events#readme)
