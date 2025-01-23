# 概念

## css 选择器优先级如何计算? {#p0-css-selector-priority}

详见 [css 选择器优先级](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#css-%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E7%9A%84)

> **tip**
> 选择器优先级属于 css 层叠规则中的部分规则,若要完全理解 css 层叠规则阅读如下规范
>
> * [css 2.2 层叠规则](https://www.w3.org/TR/CSS22/cascade.html#cascade)
> * [层叠和继承](https://www.w3.org/TR/css-cascade-3/#cascading)
> * [slectors-3 Calculating a selector's specificity](https://www.w3.org/TR/selectors-3/#specificity)

### css 盒模型 {#p0-css-box-model}

## BFC (Block Formatting Context 块格式化上下文) {#p0-bfc}

BFC 是用于 css 块级盒布局的抽象概念。功能上需要掌握

1. 何时会生成 BFC,综合 [mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 和 [css 2.2 bfc](https://www.w3.org/TR/CSS22/visuren.html#block-formatting) 理解
2. bfc 的特征
   1. bfc 会包含子元素,此特性可清除浮动
   2. 同属于一个 bfc 的子元素会出现 margin 塌陷

可以通过 [饥人谷 BFC](https://xiedaimala.com/tasks/4cdc74ef-b8b2-4cbd-aa4e-7a8ee7ad3a16) 理解 BFC。

## IFC(Inline Formatting Context 内联格式化上下文)  {#p1-ifc}

## css 选择器性能 {#p1-css-selector-performance}

1. css 选择器的查询是从右往左查,基于此提供如下优化策略
    1. 减少匹配深度可以降低查询次数
    2. 避免使用通用或常见的类型选择器,通过 BEM 优化元素类名降低请求
2. 避免触发页面重排(reflow),利用 [css trigger](https://csstriggers.com/) 理解哪些属性会影响重绘或重排
