# 布局

## Grid 布局 {#p0-grid}

 什么是 grid 布局

CSS Grid 布局是 CSS 中的一种新的布局系统，旨在通过 网格（grid）和 行（row）、列（column）的概念来创建灵活的、高效的、响应式网页布局。CSS Grid 布局可以将一个元素的内容划分为多个网格，根据需要，可以在这些网格中定位元素。与传统的基于盒子模型的布局方式不同，CSS Grid 布局以一种更直观、更高效的方式来处理布局问题。

可以通过 CSS Grid 属性来定义网格和元素的位置，包括大小、间距、对齐方式等等。CSS Grid 布局还支持类似 Flexbox 的弹性布局，例如自适应尺寸、重叠和层叠等特性。最重要的是，因为 CSS Grid 布局与内容的结构分离，所以它能够为设计响应式布局提供出色的支持，而不需要在内容标记中添加过多的 CSS 或者 JavaScript。

 grid 布局有哪些 api

CSS Grid 布局提供了一系列的 API 来实现网格布局，以下是常用的几个属性：

1. `display: grid;`：设置一个元素为网格容器
2. `grid-template-columns`：定义网格中每一列的大小和数量
3. `grid-template-rows`：定义网格中每一行的大小和数量
4. `grid-template-areas`：为网格中的区域命名，以便将子元素分配到特定的区域
5. `grid-column-gap` 和 `grid-row-gap`：定义网格中行和列之间的间距
6. `grid-area`：定义元素应该在网格中的哪个区域，比如指定其所在的行、列和跨越的行列数量
7. `grid-column-start` 和 `grid-column-end`：定义元素开始和结束的列位置，类似地，`grid-row-start` 和 `grid-row-end` 定义元素开始和结束的行位置
8. `grid-column` 和 `grid-row`：简写属性，组合了 `grid-column-start` 、`grid-column-end` 、`grid-row-start` 和 `grid-row-end`，用于同时设置元素在网格中的列和行位置。

这些属性可以帮助我们在网格容器中定义网格，并指定子元素在网格中的位置和大小。还有其他的属性可以进一步调整子元素的位置和大小，如 `justify-self` 和 `align-self` 用于调整子元素的水平和垂直对齐方式，`grid-auto-columns` 和 `grid-auto-rows` 用于指定未被显式指定的网格单元格的大小等等。

 如何使用 grid 布局

CSS Grid 布局可以通过以下步骤来使用：

1. 在父级元素上声明 `display: grid` 属性，将其转换为网格容器。
2. 使用 `grid-template-columns` 和 `grid-template-rows` 属性来定义行和列的网格大小和数量，或者使用 `grid-template-areas` 属性来定义网格中的区域。
3. 使用 `gap` 属性来定义行和列之间的间距。
4. 将子元素放到网格容器中，并使用 `grid-column` 和 `grid-row` 属性来指定子元素在网格中的位置，也可以通过 `grid-area` 属性来指定子元素在网格中的区域。
5. 可以使用其他属性来进一步改变子元素的位置和大小，比如 `justify-self` 和 `align-self` 等属性来设置元素的对齐方式和位置。

下面是一个简单的使用 Grid 布局的示例，创建一个 3x3 网格：

```html
<div class="grid-container">
 <div class="grid-item item1">1</div>
 <div class="grid-item item2">2</div>
 <div class="grid-item item3">3</div>
 <div class="grid-item item4">4</div>
 <div class="grid-item item5">5</div>
 <div class="grid-item item6">6</div>
 <div class="grid-item item7">7</div>
 <div class="grid-item item8">8</div>
 <div class="grid-item item9">9</div>
</div>
```

```css
.grid-container {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 10px;
}

.grid-item {
 background-color: #ddd;
 padding: 20px;
 font-size: 30px;
 text-align: center;
}

.item1 {
 grid-column: 1 / span 2;
 grid-row: 1;
}

.item2 {
 grid-column: 3;
 grid-row: 1 / span 2;
}

.item3 {
 grid-column: 1;
 grid-row: 2 / span 2;
}

.item4 {
 grid-column: 2;
 grid-row: 2;
}

.item5 {
 grid-column: 3;
 grid-row: 3;
}

.item6 {
 grid-column: 2 / span 2;
 grid-row: 4;
}

.item7 {
 grid-column: 1;
 grid-row: 5;
}

.item8 {
 grid-column: 2;
 grid-row: 5;
}

.item9 {
 grid-column: 3;
 grid-row: 5;
}
```

在这个示例中，我们创建了一个包含 9 个子元素的网格容器。通过设置网格容器的 `grid-template-columns` 和 `grid-template-rows` 属性，我们定义了一个 3x3 的网格，并通过 `gap` 属性设置了行和列的间距。然后，我们使用 `grid-column` 和 `grid-row` 属性来指定每个子元素在网格中的位置，或使用 `grid-area` 属性来指定子元素在网格中的区域。通过这些属性的值，我们可以指定每个子元素跨越多少行和多少列，或者指定一个子元素占据网格中的多个区域。

CSS Grid 布局是一种强大的二维网格布局系统，它允许开发者以更灵活的方式创建复杂的网页布局。通过将页面划分为行和列，开发者可以精确控制元素的位置和尺寸，并在不同屏幕尺寸下实现响应式布局。

以下是 CSS Grid 布局的一些关键概念和特性：

1. 网格容器（Grid Container）：使用 `display: grid;` 将一个元素设置为网格容器。它是网格布局的父元素，内部的子元素将参与布局。

2. 网格项目（Grid Item）：网格容器中的子元素称为网格项目。每个网格项目可以占据一个或多个网格单元，形成网格布局。

3. 网格行（Grid Row）和网格列（Grid Column）：网格布局由行和列组成。通过定义网格行和网格列，可以将网格划分为不同的区域。

4. 网格单元（Grid Cell）：网格单元是网格中的每个交叉点，形成的矩形区域。网格项目可以跨越多个网格单元。

5. 网格线（Grid Line）：网格线是划分网格行和网格列的线条。可以通过指定网格线的位置和名称来控制布局。

6. 网格轨道（Grid Track）：网格轨道是相邻网格线之间的空间，用于确定网格单元的尺寸和位置。

通过使用 CSS 属性和值，可以对网格布局进行进一步控制，例如：

* `grid-template-rows` 和 `grid-template-columns`：用于定义网格的行和列的大小和数量。
* `grid-gap`：用于设置网格行和列之间的间隔。
* `grid-auto-rows` 和 `grid-auto-columns`：用于定义自动创建的行和列的大小。
* `grid-template-areas`：用于定义网格布局的区域和位置。
* `grid-column-start`、`grid-column-end`、`grid-row-start` 和 `grid-row-end`：用于控制网格项目在网格中的位置。

CSS Grid 布局的优势包括：

* 灵活的布局：通过定义网格行和列，可以实现复杂的布局需求，如等宽列、自适应布局、多列换行等。
* 响应式设计：可以使用媒体查询和自动调整来实现在不同屏幕尺寸下的布局变化。
* 简化的嵌套布局：与传统的 float 和 position 布局相比，CSS Grid 布局可以更轻松地实现多层嵌套的布局。
* 对齐和对称：通过对网

格行和列进行对齐和调整，可以实现元素的水平和垂直对齐，以及对称布局。

总之，CSS Grid 布局为开发者提供了更强大、灵活和直观的布局工具，使网页布局更加简单和可控，同时具备响应式和可扩展性。

当涉及到 CSS Grid 布局的属性和值时，以下是一些常用的属性和相应的作用的表格示例：

下面是CSS Grid布局中常用的属性和值，以及它们的作用：

| 属性 | 值 | 作用 |
|-----------------------|---------------------------------------|------------------------------------------------------------|
| `display` | `grid` | 将元素设置为网格容器 |
| `grid-template-rows` | `value` | 定义网格的行的大小和数量 |
| `grid-template-columns` | `value` | 定义网格的列的大小和数量 |
| `grid-gap` | `length` or `percentage` | 设置网格行和列之间的间距 |
| `grid-auto-rows` | `value` | 定义自动创建的行的大小 |
| `grid-auto-columns` | `value` | 定义自动创建的列的大小 |
| `grid-template-areas` | `none`, `name`, `row`, `column`, `.` | 定义网格布局的区域和位置 |
| `grid-column-start` | `line`, `span n`, `auto` | 控制网格项目的开始列位置 |
| `grid-column-end` | `line`, `span n`, `auto` | 控制网格项目的结束列位置 |
| `grid-row-start` | `line`, `span n`, `auto` | 控制网格项目的开始行位置 |
| `grid-row-end` | `line`, `span n`, `auto` | 控制网格项目的结束行位置 |
| `justify-items` | `start`, `end`, `center`, `stretch` | 水平方向上设置网格项目的对齐方式 |
| `align-items` | `start`, `end`, `center`, `stretch` | 垂直方向上设置网格项目的对齐方式 |
| `justify-content` | `start`, `end`, `center`, `stretch`, `space-between`, `space-around` | 设置网格容器内网格项目在主轴上的对齐方式 |
| `align-content` | `start`, `end`, `center`, `stretch`, `space-between`, `space-around` | 设置网格容器内网格项目在交叉轴上的对齐方式 |
| `grid-template` | `none`, `name`, `row`, `column`, `.` | 一个简写属性，可以同时设置`grid-template-rows`和`grid-template-columns`属性 |
| `grid-auto-flow` | `row`, `column`, `dense` | 设置自动布局算法和顺序 |

这些属性和值可以用于创建网格布局，并控制网格项目在网格中的位置和尺寸。通过定义网格的行和列，以及对齐方式，可以实现灵活的网页布局。可以通过设置网格的大小、间距和自动创建行列等属性，实现不同的布局需求。同时，通过调整网格项目的起始和结束位置，以及对齐方式，可以精确控制元素在网格中的放置方式。

## 水平垂直居中  {#p0-css-center}

垂直居中的方案

1、

```
line-height: 200px;
vertical-align: middle;
```

2、CSS Table

```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin

```
#parent {position: relative;}
#child {
 position: absolute;
 top: 50%;
 left: 50%;
 height: 30%;
 width: 50%;
 margin: -15% 0 0 -25%;
}
```

4、Absolute Positioning and Stretching

```
#parent {position: relative;}
#child {
position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 width: 50%;
 height: 30%;
 margin: auto;
}
```

5、Equal Top and Bottom Padding

```
#parent {
 padding: 5% 0;
}
#child {
 padding: 10% 0;
}
```

答案参见 [css 居中文档](https://www.w3.org/Style/Examples/007/center)

可以参考下表进行记忆

| 居中方式 | 内联元素                 | 块元素 |
| :------- | :----------------------- | :----- |
| 水平居中 | text-align 设置为 center | margin |
|          |                          | 1      |
| 垂直居中 | 当行采用 line-height     | sdf    |

水平垂直居中定位

直居中的方案

1、

```
line-height: 200px;
vertical-align: middle;
```

2、CSS Table

```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin

```
#parent {position: relative;}
#child {
 position: absolute;
 top: 50%;
 left: 50%;
 height: 30%;
 width: 50%;
 margin: -15% 0 0 -25%;
}
```

4、Absolute Positioning and Stretching

```
#parent {position: relative;}
#child {
position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 width: 50%;
 height: 30%;
 margin: auto;
}
```

5、Equal Top and Bottom Padding

```
#parent {
 padding: 5% 0;
}
#child {
 padding: 10% 0;
}
```

平居中的方案

1、要实现行内元素`<span>、<a>`等的水平居中：text-align:center;

2、要实现块状元素（display:block）的水平居中: margin:0 auto;

3、多个水平排列的块状元素的水平居中:

```
#container{
 text-align:center;
}
#center{
 display:inline-block;
}
```

4、flexbox

```
#container {
 display: flex;
}
#container {
 display: inline-flex;
}
```

5、一直宽度水平居中:绝对定位与负边距实现。

```
#container{
 position:relative;
}

#center{
 width:100px;
 height:100px;
 position:absolute;
 top:50%;
 left:50%;
 margin:-50px 0 0 -50px;
}
```

6、绝对定位与margin：

```
#container{
 position:relative;
}
#center{
 position:absolute;
 margin:auto;
 top:0;
 bottom:0;
 left:0;
 right:0;
}
```

知高度和宽度元素的水平垂直居中

1、当要被居中的元素是inline或者inline-block元素

```
 #container{
 display:table-cell;
 text-align:center;
 vertical-align:middle;
}

#center{

}
```

2、利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。

```
#container{
 position:relative;
}
#center{
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
```

3、flex

```
#container{
 display:flex;
 justify-content:center;
 align-items: center;
}

#center{

}
```

## CSS 如何实现固定长宽比的元素 {#p2-css-fixed-aspect-ratio}

在 CSS 中，可以通过以下几种方式实现固定长宽比的元素：

**一、使用 padding 实现**

1. 原理：

* 利用元素的`padding`属性以百分比形式设置时是相对于父元素宽度的特点，通过设置`padding-top`或`padding-bottom`来实现固定的长宽比。

2. 示例代码：

 ```html
 <div class="aspect-ratio-box">
 <!-- 这里可以放置内容 -->
 </div>
 ```

 ```css
 .aspect-ratio-box {
 width: 100%;
 position: relative;
 padding-top: 56.25%; // 16:9 的长宽比，9/16 = 0.5625，即 56.25% */
 }
 .aspect-ratio-box >{
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 }
 ```

* 在这个例子中，设置了一个容器元素，通过`padding-top`为`56.25%`实现了 16:9 的长宽比。容器内的子元素通过绝对定位填充整个容器。

**二、使用伪元素和`vw`单位实现**

1. 原理：

* 利用伪元素`::before`或`::after`，并设置其`content`属性为空，通过设置其`height`或`width`为相对于视口宽度（`vw`单位）的百分比来实现固定长宽比。

2. 示例代码：

 ```html
 <div class="aspect-ratio-box-vw">
 <!-- 这里可以放置内容 -->
 </div>
 ```

 ```css
 .aspect-ratio-box-vw {
 width: 100%;
 position: relative;
 }
 .aspect-ratio-box-vw::before {
 content: "";
 display: block;
 padding-top: 56.25%; // 16:9 的长宽比 */
 }
 .aspect-ratio-box-vw >{
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 }
 ```

* 这个方法与第一种类似，但是使用了伪元素和`padding-top`相对于视口宽度的特点来实现长宽比。

**三、使用 CSS Grid 实现**

1. 原理：

* 通过 CSS Grid 布局，设置一个网格容器，并定义其中一个维度的大小，然后让另一个维度自动填充以实现固定长宽比。

2. 示例代码：

 ```html
 <div class="aspect-ratio-grid">
 <!-- 这里可以放置内容 -->
 </div>
 ```

 ```css
 .aspect-ratio-grid {
 width: 100%;
 height: 0;
 padding-bottom: 56.25%; // 16:9 的长宽比 */
 display: grid;
 }
 .aspect-ratio-grid >{
 grid-row: 1;
 grid-column: 1;
 }
 ```

* 在这个例子中，设置容器的`padding-bottom`为`56.25%`来实现 16:9 的长宽比，然后使用 CSS Grid 布局将子元素放置在网格的第一个单元格中。

## css 如何实现分栏布局 {#p2-css-column-layout}

在前端布局中，可以通过 CSS 实现分栏布局。以下是几种常见的实现方式：

**一、使用`float`属性**

1. **基本原理**：

* `float`属性可以让元素向左或向右浮动，从而实现多栏布局。通过将多个元素设置为浮动，可以让它们并排显示。
* 例如，可以将一个容器中的子元素设置为左浮动或右浮动，以实现两栏或多栏布局。

2. **示例代码**：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <style>
 .column {
 width: 50%;
 float: left;
 }
 </style>
 </head>

 <body>
 <div class="container">
 <div class="column">
 <p>左栏内容</p>
 </div>
 <div class="column">
 <p>右栏内容</p>
 </div>
 </div>
 </body>
</html>
```

在这个例子中，使用`float: left`将两个`.column`元素设置为左浮动，从而实现两栏布局。每个栏的宽度为`50%`。

**二、使用`flexbox`布局**

1. **基本原理**：

* `flexbox`（Flexible Box Layout）是一种弹性布局模型，可以轻松地实现分栏布局。通过设置容器的`display`属性为`flex`，可以将容器内的子元素进行弹性布局。
* 可以使用`flex-direction`属性来控制子元素的排列方向，例如设置为`row`可以实现水平排列，设置为`column`可以实现垂直排列。

2. **示例代码**：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <style>
 .container {
 display: flex;
 }

 .column {
 flex: 1;
 }
 </style>
 </head>

 <body>
 <div class="container">
 <div class="column">
 <p>左栏内容</p>
 </div>
 <div class="column">
 <p>右栏内容</p>
 </div>
 </div>
 </body>
</html>
```

在这个例子中，将容器的`display`属性设置为`flex`，然后将子元素的`.column`类设置为`flex: 1`，使每个子元素占据相等的空间，实现两栏布局。

**三、使用`grid`布局**

1. **基本原理**：

* `grid`（Grid Layout）是一种网格布局模型，可以更精细地控制布局。通过设置容器的`display`属性为`grid`，可以将容器划分为网格，然后将子元素放置在网格中的特定位置。
* 可以使用`grid-template-columns`和`grid-template-rows`属性来定义网格的列和行，以及使用`grid-column`和`grid-row`属性来指定子元素在网格中的位置。

2. **示例代码**：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <style>
 .container {
 display: grid;
 grid-template-columns: 1fr 1fr;
 }

 .column {
 padding: 10px;
 }
 </style>
 </head>

 <body>
 <div class="container">
 <div class="column">
 <p>左栏内容</p>
 </div>
 <div class="column">
 <p>右栏内容</p>
 </div>
 </div>
 </body>
</html>
```

## 有哪些清除浮动的技术，都适用哪些情况？  {#p1-clear-float}

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

## 重置 css 和标准化 css 的区别?你会选择哪种?为什么?  {#p1-reset-css}

* 重置是为了统一不同浏览器器的默认样式,需要重新定制所有元素的基础表现
* 标准化是部分保留默认样式,并修复不同浏览器的显示差异
    典型应用例如 [normalize css](https://github.com/necolas/normalize.css/)

参考 [stackoverflow](https://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css)

## 瀑布流布局 {#waterfull}

 瀑布流布局

当前主流的一些软件当中我们常常可以看见这样的一种布局,该布局可以将大小不一的图片完整的显示在页面上，并且在杂乱的布局中保持着一定的美感。（如下图:）

![Screenshot_2024-04-23-23-12-35-519_com.jingdong.a.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4e450f7ba984760833bb58e9ff2f5ce~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1440&h=3200&s=1715452&e=jpg&b=f7efed)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd2338600ce942ab8f0347d1bf8efbed~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1860&h=890&s=1332320&e=png&b=f8f4f3)

 HTML 与 CSS 部分

1. div#container 作为所有图片的容器
2. div.box 作为每个图片的容器
3. div.box-img 包裹 img 标签
4. img 负责显示图片
5. 多个 div.box 排列图片
6. 重复上述结构,排列了多行图片
7. 主容器使用相对定位占据文档流中的位置而其子标签 box 使用浮动式布局

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Document</title>
 <style>
{
 margin: 0;
 padding: 0;
 }

 #container {
 position: relative;
 }

 .box {
 float: left;
 padding: 5px;
 }

 .box-img {
 width: 150px;
 padding: 5px;
 border: 1px solid #dd9f9f;
 }

 img {
 width: 100%;
 }
 </style>
 </head>

 <body>
 <div id="container">
 <div class="box">
 <div class="box-img">
 <img src="./img/1.webp" alt="" />
 </div>
 </div>
 ......省略了19个box
 </div>
 <script src="index.js"></script>
 </body>
</html>
```

此时的页面:

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4948c01e92814e9583a34ea2ce4bbd42~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1928&h=1040&s=1053345&e=png&b=ffffff)

 JavaScript 部分

 实现原理

1.使用一个父容器 container 包裹子容器 box

2.图片容器 box-img 包裹在容器 box 中，用来展示

3.通过 js 获取父容器的 DOM 结构，再获取其子元素图片容器 box

4.将其按照瀑布流的规则使用绝对定位放置

5.获取屏幕大小计算该屏幕最多能放下几张图片，将前 n 张图片放在第一行

6.使用一个 heightArr 高度数组,在放置的时候记录每一列图片的高度,后面的图片放置在高度最低的那一列

 图解

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2e0b52959ea49df9cb63ab2a5aa9bd2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=905&h=636&s=34819&e=png&b=ffffff)

 js 代码实现

```javascript
// 获取用户屏幕宽度，决定一行几张图
// 操作下一张图，放到上一行最矮的列下
imgLocation('container', 'box')

function imgLocation (parent, content) {
  const cparent = document.getElementById(parent)
  const ccontent = getChildElement(cparent, content) // document.querySelectorAll('#container .box')
  // console.log(ccontent)
  const imgWidth = ccontent[0].offsetWidth
  const num = Math.floor(document.documentElement.clientWidth / imgWidth)
  cparent.style.width = `${imgWidthnum}px`
  // 要操作的是哪张，每一列的高度

  const BoxHeightArr = []
  for (let i = 0; i < ccontent.length; i++) {
    if (i < num) {
      // 记录第一行
      BoxHeightArr[i] = ccontent[i].offsetHeight
    } else {
      // 开始操作，找到最矮的高度及列数
      minHeight = Math.min.apply(null, BoxHeightArr)
      const minIndex = BoxHeightArr.indexOf(minHeight)

      // 摆放图片位置
      ccontent[i].style.position = 'absolute'
      ccontent[i].style.top = minHeight + 'px'
      ccontent[i].style.left = ccontent[minIndex].offsetLeft + 'px'
      // 更新这一列图片高度
      BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight
    }
  }
  console.log(BoxHeightArr)
}

function getChildElement (parent, child) {
  // 获取parent中所有child
  const childArr = []
  const allChild = parent.getElementsByTagName('*')
  // 找出所有box
  for (let i = 0; i < allChild.length; i++) {
    if (allChild[i].className === child) {
      childArr.push(allChild[i])
    }
  }
  return childArr
}
```

 最终效果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e9ec489a484120b12c43fe87b532e7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=911&s=1021235&e=png&b=fefcfc)

## 栅格布局是什么，如何实现 {#p0-grid-column}

CSS 栅格布局是一种用于创建响应式网格系统的布局技术。它基于将页面分为等宽的列，并使用行来组织内容。栅格布局提供了一种灵活的方式来创建自适应的网格布局，以便在不同屏幕尺寸和设备上显示良好。

实现 CSS 栅格布局的方法有多种，以下是一种常见的实现方式：

1. HTML 结构：使用 `<div>` 元素创建栅格布局的容器，并在容器内添加栅格列元素。

```html
<div class="grid-container">
 <div class="grid-item">Item 1</div>
 <div class="grid-item">Item 2</div>
 <div class="grid-item">Item 3</div>
 <!-- ... -->
</div>
```

2. CSS 样式：为容器和栅格列元素定义样式。

```css
.grid-container {
 display: grid;
 grid-template-columns: repeat(3, 1fr); // 创建三列，每列等宽 */
 gap: 10px; // 列之间的间隔 */
}

.grid-item {
 background-color: #ccc;
 padding: 10px;
}
```

上述示例中，通过设置 `display: grid;` 将容器设为栅格布局。使用 `grid-template-columns` 定义栅格的列数和宽度，这里使用 `repeat(3, 1fr)` 表示创建三列，每列宽度相等。通过 `gap` 属性设置列之间的间隔。栅格列元素则可以按需添加，根据需要进行样式设置。

通过以上方式，可以快速实现简单的 CSS 栅格布局。根据实际需求，还可以添加更多的样式和调整布局参数，如自适应布局、媒体查询等，以适应不同的屏幕尺寸和设备。

## css 中 三栏布局的实现方案 的实现方案有哪些？

三栏布局指的是在一个页面中，将内容分为左、中、右三栏，并使它们具有相应的宽度和高度。实现三栏布局有多种方案，以下是其中的几种：

1. 使用浮动

```css
cssCopy code.left {
 float: left;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 float: right;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 margin: 0 200px;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，左栏和右栏使用浮动来实现，中间栏使用 `margin` 来占据剩余的宽度。

2. 使用绝对定位

```css
cssCopy code.container {
 position: relative;
 height: 100%;
}

.left {
 position: absolute;
 left: 0;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 position: absolute;
 right: 0;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 position: absolute;
 left: 200px;
 right: 200px;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，左栏和右栏使用绝对定位来实现，中间栏使用左右 `padding` 来占据剩余的宽度。

3. 使用Flexbox布局

```css
cssCopy code.container {
 display: flex;
 height: 100%;
}

.left {
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 flex: 1;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，父容器使用Flexbox布局，左、中、右三栏都是Flex项，中间栏使用 `flex: 1` 来占据剩余的宽度。

这些方案都可以实现三栏布局，但每种方案都有自己的优缺点。在选择方案时，需要考虑浏览器兼容性、性能、可维护性和可扩展性等因素。
