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

## stopImmediatePropagation 和 stopPropagation 区别

## addEventListener 和 attribute onclick

为什么 `{capture:true}` 不是先触发
参见此回答 [Event listeners registered for capturing phase not triggered before bubbling - why?](https://stackoverflow.com/questions/11841330/event-listeners-registered-for-capturing-phase-not-triggered-before-bubbling-w)
## 参考资料
* [冒泡和捕获](https://javascript.info/bubbling-and-capturing)