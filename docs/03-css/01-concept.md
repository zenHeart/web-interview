# 概念

## doc flow {#p0-doc-flow}

CSS 的文档流（Document Flow）是指文档中元素按照其在 HTML 中出现的顺序自上而下布局的方式，也称为常规流（Normal Flow）或默认流。文档流定义了元素的布局顺序和定位方式，包括元素的位置、大小、间距等属性。

在文档流中，每个元素都会占据一定的空间并尽可能充满其包含块的宽度。每个元素的位置都会受到前面元素的影响，如果前面的元素发生位置变化，那么后面的元素的位置也会发生相应的变化。

文档流中的元素按照下面的规则排列：

1. 块级元素：块级元素会独占一行，并在前面自动添加一个垂直间距。例如：`<p>`、`<div>`、`<h1>` 等。

2. 行内元素：行内元素会在一行中排列，并且宽度根据内容自适应。例如：`<a>`、`<span>`、`<img>` 等。

3. 行内块级元素：行内块级元素与行内元素类似，但是它可以设置宽度、高度等块级元素的属性。例如：`<input>`、`<button>`、`<textarea>` 等。

文档流是 CSS 中最基本、最重要的概念之一，它决定了网页的整体布局和排版方式，也是实现网页布局的基础。在实际开发中，我们需要理解文档流的特性和工作原理，以便更好地掌握网页布局和样式的设计。

## 选择器 {#p0-selector}

CSS 选择器有以下几种：

1.元素选择器：通过标签名选择元素，例如：`p {}`。

2.类选择器：通过 `.`+类名的形式选择元素，例如：`.my-class {}`。

3.ID 选择器：通过 `#`+ID名的形式选择元素，例如：`#my-id {}`。

4.通配符选择器：通过 `*` 选择所有元素，例如：`* {}`。

5.后代选择器：通过空格 `` 选择某元素下的后代元素，例如：`.my-parent .my-child {}`。

6.子元素选择器：通过 `>` 选择某元素的子元素，例如：`ul > li {}`。

7.相邻兄弟选择器：通过 `+` 选择相邻的后续同级元素，例如：`.my-class + p {}`。

8.通用兄弟选择器：通过 `~` 选择后继的同级元素，例如：`.my-class ~ p {}`。

CSS 选择器的优先级从高到低如下：

1. !important：使用该关键词的属性优先级最高。

2. 行内样式：使用元素的 style 属性设置的样式优先级最高。

3. ID 选择器：指定 ID 的样式优先级高于类选择器和元素选择器。

4. 类选择器和属性选择器：优先级相同。

5. 元素选择器和伪类选择器：优先级相同。

6. 通配符和组合选择器：在没有更具体的选择器时优先级最低。

需要注意，当优先级相同时，后面生效的样式会覆盖前面的样式。针对这种情况，我们可以通过提高选择器的优先级、使用 !important、使用行内样式等方式进行调整。

## css 选择器优先级如何计算? {#p0-css-selector-priority}

详见 [css 选择器优先级](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#css-%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E7%9A%84)

> **tip**
> 选择器优先级属于 css 层叠规则中的部分规则,若要完全理解 css 层叠规则阅读如下规范
>
> * [css 2.2 层叠规则](https://www.w3.org/TR/CSS22/cascade.html#cascade)
> * [层叠和继承](https://www.w3.org/TR/css-cascade-3/#cascading)
> * [slectors-3 Calculating a selector's specificity](https://www.w3.org/TR/selectors-3/#specificity)

### css 盒模型 {#p0-css-box-model}

CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。

**在标准盒模型性中**

![画板 (5)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bdd6da8a5db4f188a9a7d79c30ebcb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:
宽 = `width + padding2 + border2 + margin2`
高 = `height + padding2 + border2 + margin2`

盒模型实际大小:
宽 = `width + padding2 + border2`
高 = `height + padding2 + border2`

**在 IE 盒模型性中**

![画板 (4)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bc8aaa0306845e4a03ef9e78f55a9d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:
宽 = `width + margin2`
高 = `height + margin2`

盒模型实际大小:
宽 = `width`
高 = `height`

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

* `box-sizeing: content-box`表示标准盒模型
* `box-sizeing: border-box`表示 IE 盒模型

## 介绍下 BFC、IFC、GFC 和 FFC？ {#p0-bfc-ifc-gfc-ffc}

 BFC（Block Formatting Contexts）块级格式化上下文

 什么是BFC？

`BFC` 全称：`Block Formatting Context`， 名为 **块级格式化上下文**。

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

 如何触发BFC？

* 根元素或其它包含它的元素

* 浮动 `float: left/right/inherit`

* 绝对定位元素 `position: absolute/fixed`

* 行内块`display: inline-block`

* 表格单元格 `display: table-cell`

* 表格标题 `display: table-caption`

* 溢出元素 `overflow: hidden/scroll/auto/inherit`

* 弹性盒子 `display: flex/inline-flex`

 BFC布局规则

* 内部的Box会在垂直方向，一个接一个地放置。

* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

* BFC的区域不会与float box重叠。

* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

* 计算BFC的高度时，浮动元素也参与计算

 BFC应用场景

 解决块级元素垂直方向margin重叠

我们来看下面这种情况：

```html
<style>
 .box{
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px auto;
 }
</style>
<body>
 <div class="box">box1</div>
 <div class="box">box2</div>
</body>

```

按我们习惯性思维，上面这个box的`margin-bottom`是`60px`，下面这个box的`margin-top`也是`60px`，那他们垂直的间距按道理来说应该是`120px`才对。（可事实并非如此，我们可以来具体看一下）

这种情况下的margin边距为两者的最大值，而不是两者相加，那么我们可以使用BFC来解决这种margin塌陷的问题。

```html
<style>
 .box{
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px auto;
 }
 .outer_box{
 overflow: hidden;
 }
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 </div>
 <div class="box">南玖</div>
</body>

```

 解决高度塌陷问题

我们再来看这种情况，内部box使用`float`脱离了普通文档流，导致外层容器没办法撑起高度，使得背景颜色没有显示出来。

```html
<style>
 .box{
 float:left;
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px;
 }
 .outer_box{
 background:lightblue;
 }
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 <div class="box">南玖</div>
 </div>
</body>

```

我们可以看到此时的外层容器的高度为0，导致背景颜色没有渲染出来，这种情况我们同样可以使用BFC来解决，可以直接为外层容器触发BFC，我们来看看效果：

```html
<style>
 .box{
 float:left;
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px;
 }
.outer_box{
 display:inline-block;
 background:lightblue;
}
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 <div class="box">南玖</div>
 </div>
</body>

```

 清除浮动

在早期前端页面大多喜欢用浮动来布局，但浮动元素脱离普通文档流，会覆盖旁边内容：

```html
<style>
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
 }
 .container{
 width:500px;
 height:400px;
 background:mediumturquoise;
 }
</style>
<body>
 <div class="outer_box">
 <div class="aside">nanjiu</div>
 <div class="container">南玖</div>
 </div>
</body>

```

我们可以通过触发后面这个元素形成BFC，从而来清楚浮动元素对其布局造成的影响

```html
<style>
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
 }
 .container{
 width:500px;
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
 <div class="outer_box">
 <div class="aside">nanjiu</div>
 <div class="container">南玖</div>
 </div>
</body>
```

 什么是IFC？

`IFC`全称：`Inline Formatting Context`，名为**行级格式化上下文**

 如何触发IFC？

* 块级元素中仅包含内联级别元素

形成条件非常简单，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC。

 IFC布局规则

* 在一个IFC内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部。
* 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
* 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
* 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
* IFC中的`line box`一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的`line box`高度由 CSS 行高计算规则来确定，同个`IFC`下的多个`line box`高度可能会不同。
* 当 `inline boxes`的总宽度少于包含它们的`line box`时，其水平渲染规则由 `text-align` 属性值来决定。
* 当一个`inline box`超过父元素的宽度时，它会被分割成多个`boxes`，这些`boxes`分布在多个`line box`中。如果子元素未设置强制换行的情况下，`inline box`将不可被分割，将会溢出父元素。

 IFC应用场景

 元素水平居中

当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。

```html
<style>
 /* IFC */
 .text_container{
 width: 650px;
 border: 3px solid salmon;
 margin-top:60px;
 text-align: center;
 }
 strong,span{
 margin: 20px;
 background-color: cornflowerblue;
 color:#fff;
 }
</style>
<body>
 <div class="text_container">
 <strong>string 1</strong>
 <span>string 2</span>
 </div>
</body>
```

 多行文本水平垂直居中

创建一个IFC，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。

```html
<style>
.text_container{
 text-align: center;
 line-height: 300px;
 width: 100%;
 height: 300px;
 background-color: turquoise;
 font-size: 0;
 }
 p{
 line-height: normal;
 display: inline-block;
 vertical-align: middle;
 background-color: coral;
 font-size: 18px;
 padding: 10px;
 width: 360px;
 color: #fff;
 }
</style>
<body>
 <div class="text_container">
 <p>
 string 1
 <strong>string 2</strong>
 </p>
 </div>
</body>

```

 GFC（Grid Formatting Contexts）栅格格式化上下文

 什么是GFC？

`GFC`全称：`Grids Formatting Contexts`，名为**网格格式上下文**

> 简介： CSS3引入的一种新的布局模型——Grids网格布局，目前暂未推广使用，使用频率较低，简单了解即可。 Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。 Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

 如何触发GFC？

当为一个元素设置`display`值为`grid`或者`inline-grid`的时候，此元素将会获得一个独立的渲染区域。

 GFC布局规则

通过在`网格容器（grid container）`上定义`网格定义行（grid definition rows）`和`网格定义列（grid definition columns）`属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间（具体可以在MDN上查看）

 GFC应用场景

 任意魔方布局

这个布局使用用GFC可以轻松实现自由拼接效果，换成其他方法，一般会使用相对/绝对定位，或者flex来实现自由拼接效果，复杂程度将会提升好几个等级。

```html
<style>
.magic{
 display: grid;
 grid-gap: 2px;
 width:300px;
 height:300px;
 }
 .magic div{
 border: 1px solid coral;
 }
 .m_1{
 grid-column-start: 1;
 grid-column-end: 3;
 }
 .m_3{
 grid-column-start: 2;
 grid-column-end: 4;
 grid-row-start: 2;
 grid-row-end: 3;
 }
</style>
<body>
 <div class="magic">
 <div class="m_1">1</div>
 <div class="m_2">2</div>
 <div class="m_3">3</div>
 <div class="m_4">4</div>
 <div class="m_5">5</div>
 <div class="m_6">6</div>
 <div class="m_7">7</div>
 </div>
</body>
```

 FFC（Flex Formatting Contexts）弹性格式化上下文

 什么是FFC？

`FFC`全称：`Flex Formatting Contexts`，名为**弹性格式上下文**

> 简介： **CSS3引入了一种新的布局模型——flex布局。** flex是flexible box的缩写，一般称之为**弹性盒模型**。和CSS3其他属性不一样，flexbox并不是一个属性，而是一个模块，包括多个CSS3属性。flex布局提供一种更加有效的方式来进行容器内的项目布局，以适应各种类型的显示设备和各种尺寸的屏幕，使用Flex box布局实际上就是声明创建了FFC(自适应格式上下文)

 如何触发FFC？

当 `display` 的值为 `flex` 或 `inline-flex` 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）

 FFC布局规则

* 设置为 `flex` 的容器被渲染为一个块级元素
* 设置为 `inline-flex` 的容器被渲染为一个行内元素
* 弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局

\*\*⚠️注意：\*\*FFC布局中，float、clear、vertical-align属性不会生效。

> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

 FFC应用场景

这里只介绍它对于其它布局所相对来说更方便的特点，其实flex布局现在是非常普遍的，很多前端人员都喜欢用flex来写页面布局，操作方便且灵活，兼容性好。

 自动撑开剩余高度/宽度

看一个经典两栏布局：左边为侧边导航栏，右边为内容区域，用我们之前的常规布局，可能就需要使用到`css`的`calc`方法来动态计算剩余填充宽度了，但如果使用flex布局的话，只需要一个属性就能解决这个问题：

**calc动态计算方法：**

```html
<style>
.outer_box {
 width:100%;
}
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
}
.container{
 width:calc(100% - 180px);
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
  <div class="outer_box">
 <div class="aside">box1</div>
 <div class="container">box2</div>
 </div>
</body>

```

**使用FFC：**

```html
<style>
.outer_box {
 display:flex;
 width:100%;
}
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
}
.container{
 flex: 1;
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
  <div class="outer_box">
 <div class="aside">box1</div>
 <div class="container">box2</div>
 </div>
</body>
```

 参考文档

* [资料](https://juejin.cn/post/7072174649735381029)

## BFC (Block Formatting Context 块格式化上下文) {#p0-bfc}

BFC 是用于 css 块级盒布局的抽象概念。功能上需要掌握

1. 何时会生成 BFC,综合 [mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 和 [css 2.2 bfc](https://www.w3.org/TR/CSS22/visuren.html#block-formatting) 理解
2. bfc 的特征
   1. bfc 会包含子元素,此特性可清除浮动
   2. 同属于一个 bfc 的子元素会出现 margin 塌陷

可以通过 [饥人谷 BFC](https://xiedaimala.com/tasks/4cdc74ef-b8b2-4cbd-aa4e-7a8ee7ad3a16) 理解 BFC。

BFC是块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。(俗称：**脱离文档流**)

**触发条件**

* position: absolute/fixed：绝对定位
* display: inline-block / table / flex
* float 设置除none以外的值；（只要设置了浮动，当前元素就创建了BFC）
* ovevflow !== visible (可为：hidden、auto、scroll)

**特性和应用**

* 阻止margin重叠：同一个 BFC 下外边距（margin）会发生折叠
* 清除浮动 ：清除内部浮动(清除浮动的原理是两个div都位于同一个 BFC 区域之中)
* 自适应两栏布局：左float+右BFC，是利用了BFC 的区域不会与 float 的元素区域重叠的机制

## IFC(Inline Formatting Context 内联格式化上下文)  {#p1-ifc}

## css 选择器性能 {#p1-css-selector-performance}

1. css 选择器的查询是从右往左查,基于此提供如下优化策略
    1. 减少匹配深度可以降低查询次数
    2. 避免使用通用或常见的类型选择器,通过 BEM 优化元素类名降低请求
2. 避免触发页面重排(reflow),利用 [css trigger](https://csstriggers.com/) 理解哪些属性会影响重绘或重排

## 内联加载样式和外联加载样式有啥区别 {#p1-inline-load-style-and-external-load-style}

内联样式（Inline Style）和外联样式（External Style）是 CSS 应用在 HTML 文档中的两种不同方法，它们主要的区别在于如何将 CSS 规则与 HTML 元素关联起来。

 内联样式

* **定义方式**：通过元素的`style`属性直接在 HTML 标签内定义 CSS 样式。
* **优先级**：内联样式的优先级高于外联样式和嵌入样式（在`<head>`标签内的`<style>`标签中定义的样式），因为它是直接应用到元素上的。
* **应用场景**：适合对单个元素进行样式定义，或者进行快速测试。但如果用于大量元素的样式定义，会使 HTML 文档变得非常臃肿，难以维护。
* **示例**：

```html
<div style="color: blue; font-size: 14px;">这是一段内联样式的文本。</div>
```

 外联样式

* **定义方式**：将 CSS 样式定义在一个外部的`.css`文件中，然后通过`<link>`标签在 HTML 的`<head>`中引用。
* **优先级**：一般情况下，外联样式的优先级低于内联样式。但在多个样式之间的优先级还取决于选择器的具体性、样式定义的顺序等因素。
* **应用场景**：适合网站或应用的全局样式定义，能够实现样式的复用和统一管理，便于维护和更新。
* **示例**：

```html
<!-- HTML文件中引用 -->
<link rel="stylesheet" href="style.css" />

/* style.css文件中定义样式 */ div { color: red; font-size: 16px; }
```

 主要区别

1. **加载方式**：内联样式直接写在 HTML 元素的`style`属性中，而外联样式则放在单独的 CSS 文件中，通过`<link>`标签引入。
2. **复用性**：外联样式可以被多个 HTML 页面共享，提高了样式的复用性；内联样式只作用于具体的元素，无法复用。
3. **维护性**：外联样式易于维护和更新，只需修改一个 CSS 文件即可影响引用该 CSS 文件的所有页面；内联样式则需要逐个元素修改，维护成本较高。
4. **优先级**：内联样式的优先级高于外联样式和嵌入式样式，因为它更“接近”元素。
5. **性能影响**：外联样式可利用浏览器缓存，有助于减少页面加载时间；而大量使用内联样式会增加 HTML 文档的大小，可能对性能产生不利影响。

通常，推荐使用外联样式来实现样式的规范化管理和复用，特别是在大型项目和团队协作的场景中。内联样式则适用于对单个元素快速测试样式或进行特殊样式覆盖的情况。

## css module 是什么？{#p0-css-module}

CSS Modules 是一种用于组织和管理 CSS 的技术。它通过在编译时为每个 CSS 类名生成唯一的标识符，并将它们作为 JavaScript 对象的属性导出。这样，可以确保每个类名在整个应用程序中的唯一性，避免样式冲突。

使用 CSS Modules，可以将 CSS 文件与组件文件绑定在一起，这样每个组件都有自己的 CSS 作用域，样式只会应用于特定的组件，不会影响其他组件。这种隔离性和局部作用域有助于降低样式冲突和维护 CSS 的复杂性。

CSS Modules 还提供了一些其他功能，例如:

1. 局部作用域: CSS Modules 允许在组件中定义局部样式，这些样式仅适用于该组件。这样，可以避免全局样式造成的副作用，并使组件更加可重用。

2. 类名和样式的映射: 使用 CSS Modules，可以通过导入生成的样式对象，将类名映射到组件中的类名，并将其应用于相应的元素。这样可以方便地将样式与组件关联起来，并跟踪样式的变化。

3. 继承和组合: CSS Modules 支持继承和组合样式。可以通过使用类名组合和继承规则，将多个样式应用于同一个元素或组件。

总结来说，CSS Modules 提供了一种更可靠和可维护的方式来管理 CSS，通过实现局部作用域和唯一类名标识符，帮助开发者避免样式冲突和提高样式的可重用性。
