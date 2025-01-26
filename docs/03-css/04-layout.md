# 布局

## 水平垂直居中  {#p0-css-center}

答案参见 [css 居中文档](https://www.w3.org/Style/Examples/007/center)

可以参考下表进行记忆

| 居中方式 | 内联元素                 | 块元素 |
| :------- | :----------------------- | :----- |
| 水平居中 | text-align 设置为 center | margin |
|          |                          | 1      |
| 垂直居中 | 当行采用 line-height     | sdf    |

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
    if (allChild[i].className == child) {
      childArr.push(allChild[i])
    }
  }
  return childArr
}
```

 最终效果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19e9ec489a484120b12c43fe87b532e7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1920&h=911&s=1021235&e=png&b=fefcfc)
