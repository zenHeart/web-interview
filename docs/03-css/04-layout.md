# 布局

## 水平垂直居中?

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
 padding-top: 56.25%; /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 16:9 的长宽比，9/16 = 0.5625，即 56.25% */
 }
 .aspect-ratio-box > issues_data.csv proCollectionInterviewQuesiont.sh {
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
 padding-top: 56.25%; /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 16:9 的长宽比 */
 }
 .aspect-ratio-box-vw > issues_data.csv proCollectionInterviewQuesiont.sh {
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
 padding-bottom: 56.25%; /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 16:9 的长宽比 */
 display: grid;
 }
 .aspect-ratio-grid > issues_data.csv proCollectionInterviewQuesiont.sh {
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
