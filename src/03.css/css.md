## 基础

该部分放置 css 相关概念的考察点

### css 选择器优先级如何计算? ⭐️⭐️⭐️⭐️⭐️

详见 [css 选择器优先级](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#css-%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E7%9A%84)

> **tip**
> 选择器优先级属于 css 层叠规则中的部分规则,若要完全理解 css 层叠规则阅读如下规范
>
> * [css 2.2 层叠规则](https://www.w3.org/TR/CSS22/cascade.html#cascade)
> * [层叠和继承](https://www.w3.org/TR/css-cascade-3/#cascading)
> * [slectors-3 Calculating a selector's specificity](https://www.w3.org/TR/selectors-3/#specificity)

### css 盒模型  ⭐️⭐️⭐️⭐️⭐️
<!-- 补充盒模型概念 -->

### BFC (Block Formatting Context 块格式化上下文) ⭐️⭐️⭐️

BFC 是用于 css 块级盒布局的抽象概念。功能上需要掌握

1. 何时会生成 BFC,综合 [mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 和 [css 2.2 bfc](https://www.w3.org/TR/CSS22/visuren.html#block-formatting) 理解
2. bfc 的特征
   1. bfc 会包含子元素,此特性可清除浮动
   2. 同属于一个 bfc 的子元素会出现 margin 塌陷

可以通过 [饥人谷 BFC](https://xiedaimala.com/tasks/4cdc74ef-b8b2-4cbd-aa4e-7a8ee7ad3a16) 理解 BFC。

### IFC(Inline Formatting Context 内联格式化上下文)  ⭐️⭐️⭐️
<!-- TODO: 补充内联格式化模型 -->

## 应用

该部分侧重 css 属性和常见的使用技巧

### position 属性  ⭐️⭐️⭐️⭐️⭐️

* 专有值
  * **static** 默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
  * **relative** 该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）
  * **absolute** 不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并
  * **fixed** 不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。fixed 属性会创建新的层叠上下文。当元素祖先的 transform 属性非 none 时，容器由视口改为该祖先
  * **sticky** 盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。在所有情况下（即便被定位元素为 table 时），该元素定位均不对后续元素造成影响。当元素 B 被粘性定位时，后续元素的位置仍按照 B 未定位时的位置来确定。position: sticky 对 table 元素的效果与 position: relative 相同
* 全局值
  * **initial** 初始值,取决于规范的默认设定,对于 position 属性取 static
  * **inherit** 继承父元素的值
  * **unset** 由于 position 为非集成属性,此处取值和 initial 相同为 static

### flex ⭐️⭐️⭐️⭐️⭐️

### 媒体查询  ⭐️⭐️⭐️⭐️⭐️

### float  ⭐️⭐️⭐️

详见 [float 定位](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#%E8%AF%B7%E9%98%90%E8%BF%B0float%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

注意浮动塌陷的解决方案可概括为两类

1. 采用 clear 属性清除塌陷
2. 创建新的 BFC 清除浮动塌陷

### css 动画

## 经验

该部分侧重 css 使用经验及延伸知识

### css 预处理器  ⭐️⭐️⭐️⭐️⭐️

### 有哪些清除浮动的技术，都适用哪些情况？ ⭐️⭐️⭐️

1. 采用 clear 清除浮动典型代码如下,
    ```css
    <!-- 在父容器添加 clear-float -->
    .clear-float::after {
        content: '';
        clear: both;
        display:block;
    }
    ```
2. 使浮动元素的父容器为 BFC,元素变为 BFC 的方法参考 [mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)  

### 重置 css 和标准化 css 的区别?你会选择哪种?为什么?  ⭐️⭐️

* 重置是为了统一不同浏览器器的默认样式,需要重新定制所有元素的基础表现
* 标准化是部分保留默认样式,并修复不同浏览器的显示差异
    典型应用例如 [normalize css](https://github.com/necolas/normalize.css/)

参考 [stackoverflow](https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css)

### css 选择器性能 ⭐️⭐️

1. css 选择器的查询是从右往左查,基于此提供如下优化策略
    1. 减少匹配深度可以降低查询次数
    2. 避免使用通用或常见的类型选择器,通过 BEM 优化元素类名降低请求
2. 避免触发页面重排(reflow),利用 [css trigger](https://csstriggers.com/) 理解哪些属性会影响重绘或重排

### 请解释什么是精灵图（css sprites），以及如何实现？ ⭐️

详见 [雪碧图](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#%E8%AF%B7%E9%98%90%E8%BF%B0float%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

### 缓动算法 ⭐️

## 题目

该部分放置所有 css 试题

### 水平垂直居中  ⭐️⭐️⭐️⭐️⭐️

答案参见 [css 居中文档](https://www.w3.org/Style/Examples/007/center)

可以参考下表进行记忆

| 居中方式 | 内联元素                 | 块元素 |
| :------- | :----------------------- | :----- |
| 水平居中 | text-align 设置为 center | margin |
|          |                          | 1      |
| 垂直居中 | 当行采用 line-height     | sdf    |

### 用纯CSS创建一个三角形的原理是什么？  ⭐️⭐️⭐️⭐️⭐️

### CSS3实现卡片翻转?

### 常见布局实现

1. 三栏布局
2. 圣杯布局

## 参考资料

* [Front-end-Developer-Interview-Questions/css](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/css-questions/) github 仓库前端面试题
* [front-end-interview-handbook/css](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md) 上面面试题的答案
