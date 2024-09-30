## 什么是事件委托

事件委托是指在父节点集中处理子节点事件

参考 <https://johnresig.com/apps/workshop/adv-talk/#19> 定义。
事件委托一种机制,将原应在多个子节点上绑定的事件回调,统一在父节点上进行绑定。

## 注意事项

-   并非所有事件都会冒泡 blur，focus，load 和 unload 事件不冒泡像其他事件
-   管理某些鼠标事件时需要谨慎。如果您的代码正在处理 mousemove 事件，那么您将面临创建性能瓶颈的严重风险，因为 mousemove 事件经常被触发。该 mouseout 事件具有奇怪的行为，难以通过事件委派来管理。

## 典型示例

### demo

### jquery

```js
$('#thing').click(
    $.delegate({
        '.quit': function() {
            /* do quit stuff */
        },
        '.edit': function() {
            /* do edit stuff */
        }
    })
);
```

### 列表循环

资料来源于 [Javascript: Closures vs Event Delegation](https://lists.evolt.org/archive/Week-of-Mon-20090209/127331.html)

### focus blur 委派

参加 <https://www.quirksmode.org/blog/archives/2008/04/delegating_the.html>

## 参考资料

-   [event delegation](https://humanwhocodes.com/blog/2009/06/30/event-delegation-in-javascript/)
-   [stackoverflow event delegation](https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation)
-   [ ] [事件委托模式](https://zh.javascript.info/event-delegation)
-   [ ] [jquery delegate](https://api.jquery.com/delegate/)
-   [ ] [jquery on](https://api.jquery.com/on/#direct-and-delegated-events)
-   [ ] [github delegate 源码](https://github.com/dgraham/delegated-events#readme)
