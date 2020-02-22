参考 [w3c ui event 说明](https://www.w3.org/TR/uievents/images/eventflow.svg)

![](https://www.w3.org/TR/uievents/images/eventflow.svg)

但目标元素触发事件时,事件的分发分为三个阶段:

1. **捕获阶段(capture phase)** 从根元素逐级向目标元素传递
2. **目标阶段(target phase)** 传递到目标元素的阶段
3. **冒泡阶段(bubbling phase)** 从目标元素重新传递到根元素的阶段





