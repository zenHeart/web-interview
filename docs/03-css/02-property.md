# 属性

## flex {#p0-flex}

## 媒体查询 {#p0-media-query}

## z-index: 999 元素一定会置于 z-index: 0 元素之上吗 {#p2-z-index}

设置了`z-index: 999`的元素不一定会置于`z-index: 0`的元素之上。

**一、z-index 的作用机制**

1. `z-index`属性用于控制元素在 z 轴上的堆叠顺序，即决定了元素在垂直于屏幕平面的方向上的前后显示顺序。
2. 只有当元素的定位属性（如`position: relative`、`position: absolute`、`position: fixed`）被设置时，`z-index`才会生效。

**二、影响堆叠顺序的其他因素**

1. 元素的堆叠上下文：

* 元素会根据其所在的堆叠上下文进行堆叠。堆叠上下文是一个三维的概念，包含一组元素，这些元素按照特定的规则进行堆叠。
* 创建堆叠上下文的因素包括：设置了定位属性和`z-index`的元素、`opacity`小于 1 的元素、`transform`属性不为`none`的元素等。
* 如果一个元素处于一个具有更高堆叠顺序的堆叠上下文中，即使它的`z-index`值较低，也可能会被置于另一个堆叠上下文中具有较低`z-index`值的元素之下。

2. 元素的 HTML 结构顺序：

* 在没有设置`z-index`或堆叠上下文的情况下，元素的堆叠顺序通常遵循 HTML 结构的顺序。后出现的元素会覆盖先出现的元素。

**三、示例说明**

1. 以下是一个示例代码：

```html
<!DOCTYPE html>
<html>
 <head>
 <style>
 .parent {
 position: relative;
 z-index: 1;
 }

 .child1 {
 position: absolute;
 z-index: 999;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 .child2 {
 position: absolute;
 z-index: 0;
 background-color: blue;
 width: 100px;
 height: 100px;
 }
 </style>
 </head>

 <body>
 <div class="parent">
 <div class="child1"></div>
 <div class="child2"></div>
 </div>
 </body>
</html>
```

在这个例子中，`.child1`设置了`z-index: 999`，`.child2`设置了`z-index: 0`，并且它们都在一个具有`z-index: 1`的父元素中。由于父元素创建了一个堆叠上下文，`.child1`和`.child2`会在这个堆叠上下文中按照它们的`z-index`值进行堆叠，所以`.child1`会显示在`.child2`之上。

但是，如果将父元素的`z-index`值设置为 0，或者去除父元素的定位属性，那么`.child1`和`.child2`的堆叠顺序可能会发生变化，具体取决于浏览器的默认行为和 HTML 结构的顺序。

## margin 塌陷

## position 属性 {#p0-position}

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

## float   {#p0-float}

详见 [float 定位](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#%E8%AF%B7%E9%98%90%E8%BF%B0float%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

注意浮动塌陷的解决方案可概括为两类

1. 采用 clear 属性清除塌陷
2. 创建新的 BFC 清除浮动塌陷
