# 属性

## flex {#p0-flex}

Flex 布局（即 Flexible Box 布局）提供了一种更有效的方式来布置、对齐和分布容器内项目的空间，即使它们的大小是未知或者动态变化的。以下是 Flex 布局中一些常用属性及其作用的简介：

 容器属性（应用于 flex 容器）

1. **`display`**：

* 设置为`flex`或`inline-flex`以启用 flex 布局。
* `flex`使容器成为块级元素；
* `inline-flex`使容器成为行内元素。

2. **`flex-direction`**：

* 确定主轴的方向（即项目的排列方向）。
* 可选值包括`row`（默认，水平方向）、`row-reverse`（水平方向，反向）、`column`（垂直方向）、`column-reverse`（垂直方向，反向）。

3. **`flex-wrap`**：

* 控制容器是单行还是多行，以及如何换行。
* 可选值包括`nowrap`（默认，不换行）、`wrap`（换行，第一行在上方）、`wrap-reverse`（换行，第一行在下方）。

4. **`flex-flow`**：

* 是`flex-direction`和`flex-wrap`两个属性的简写形式。
* 默认值为`row nowrap`。

5. **`justify-content`**：

* 定义了项目在主轴上的对齐方式。
* 可选值包括`flex-start`（默认，起点对齐）、`flex-end`（终点对齐）、`center`（居中对齐）、`space-between`（两端对齐，项目之间的间隔相等）、`space-around`（每个项目两侧的间隔相等）、`space-evenly`（所有项目之间及周围的空间完全相等）。

6. **`align-items`**：

* 定义项目在交叉轴上如何对齐。
* 可选值包括`flex-start`（交叉轴的起点对齐）、`flex-end`（交叉轴的终点对齐）、`center`（交叉轴的中点对齐）、`baseline`（项目的第一行文字的基线对齐）、`stretch`（默认，如果项目未设置高度或设为 auto，将占满整个容器的高度）。

7. **`align-content`**：

* 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
* 可选值和`justify-content`类似，包括：`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`stretch`（默认值）。

 项目属性（应用于 flex 项目）

1. **`order`**：

* 定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

2. **`flex-grow`**：

* 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

3. **`flex-shrink`**：

* 定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

4. **`flex-basis`**：

* 设置或检索弹性盒伸缩基准值，默认值为`auto`，即项目本来的大小。

5. **`flex`**：

* 是`flex-grow`、`flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

6. **`align-self`**：

* 允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。
* 默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。
* 可选的值除了`auto`，还有`flex-start`、`flex-end`、`center`、`baseline`和`stretch`。

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

`position: sticky;` 是 CSS 中的一个定位属性值，它允许元素在页面滚动到某个阈值时“固定”在位置上，而在达到这个阈值之前，元素会像正常文档流中的元素一样表现（也就是说，在特定条件下它表现得像 `position: relative;`，在另一些条件下表现得像 `position: fixed;`）。这种特性使 `sticky` 定位成为实现网页上吸顶或吸底效果的一种非常实用的手段。

 特性

* **吸顶效果**：最常见的用途之一是导航栏吸顶。当用户向下滚动页面时，导航栏到达视口顶部后就会固定在那里，直到用户向上滚动至原始位置。
* **滚动容器**：`sticky` 元素将相对于离其最近的拥有滚动机制（例如，`overflow: auto;` 或 `overflow: scroll;`）的祖先元素进行定位。

 如何使用

要使元素具有 `sticky` 定位，你需要为它指定 `position: sticky;` 以及至少一个“边缘”属性（`top`, `right`, `bottom`, `left`）的值。这个值决定了元素在满足“粘性”条件前与边缘的距离。

 示例

```css
.sticky-element {
 position: -webkit-sticky; 
 position: sticky;
 top: 0;
 z-index: 1000; 
 background-color: white; 
}

.container {
 overflow-y: auto;
 height: 500px; 
}
```

```html
<div class="container">
 <div class="sticky-element">我在滚动时会吸顶</div>
 <!-- 其他内容 -->
</div>
```

 注意事项

* **兼容性**：`position: sticky;` 在大多数现代浏览器上都得到了支持，但在一些旧版浏览器中可能需要使用前缀或不被支持。
* **父元素的 `overflow`**: 如果一个元素的任何父元素具有 `overflow: hidden`、`overflow: scroll` 或 `overflow: auto` 样式，则 `position: sticky` 可能不会生效。
* **祖先的 `display`**: 某些 `display` 值（如 `display: table-cell` 等）也可能影响 `position: sticky` 的行为。
* **使用时机**：虽然 `sticky` 提供了一种便捷的方式来实现吸附效果，但在一些复杂的布局中，可能需要额外的样式调整或脚本支持来达到预期的效果。

通过灵活运用 `position: sticky;`，可以在无需 JavaScript 的情况下，实现许多响应用户滚动的交互效果。

## 885 如何做静态资源预加载【热度: 696】

* created_at: 2024-09-15T07:39:24Z
* updated_at: 2024-09-15T07:39:24Z
* labels: web应用场景, 腾讯
* milestone: 高

**关键词**：资源预加载

 预加载

预加载是指在用户需要数据或资源之前，提前加载这些数据或资源的过程。

这个过程可以提高应用程序或网站的响应速度和用户体验

 预加载的优点

* **提升加载速度**：通过提前加载资源，用户在访问页面时可以更快地看到完整内容。
* **提高用户体验**：减少页面加载时的延迟，使用户感到更流畅。
* **优化资源使用**：合理安排资源加载顺序，提高网络利用率。

 WebWorker 实现预加载

下面的示例将展示如何使用 Web Worker 来预加载静态资源。我们将创建一个简单的 Web Worker 脚本，用于在后台预加载一些指定的静态资源（例如图片、CSS、JavaScript 文件等）。这个过程不会阻塞主线程，使得主线程可以继续处理其他任务，如用户交互，从而提升页面的响应性能。

 3 步骤 1：创建 Web Worker 脚本

首先，创建一个 JS 文件作为 Web Worker 的脚本。我们把这个文件命名为 `preloadWorker.js`。

```javascript
// preloadWorker.js

self.addEventListener('message', (e) => {
  const urls = e.data
  urls.forEach((url) => {
    fetch(url)
      .then((response) => {
        // 一个简单的操作，标识资源已被预加载
        if (response.status === 200) {
          postMessage(`Resource preloaded: ${url}`)
        } else {
          postMessage(`Resource failed: ${url}`)
        }
      })
      .catch((error) => {
        postMessage(`Resource fetch error: ${url}`)
        console.error(error)
      })
  })
})
```

这个脚本监听来自主线程的消息，该消息包含了要预加载的资源的 URL 列表。对于每个 URL，它使用 `fetch` 请求该资源。根据请求的结果，它会通过 `postMessage` 向主线程发送一条消息，表明该资源已被预加载，或者载入失败。

 步骤 2：在主线程中使用 Web Worker

接下来，在 HTML 页面中使用这个 Web Worker。

首先，确保在你的 HTML 中引入一个脚本，初始化并使用这个 Web Worker。

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <title>Web Worker Preload Demo</title>
 </head>
 <body>
 <script src="main.js"></script>
 </body>
</html>
```

然后，创建主线程脚本 `main.js` 用于启动和与 Web Worker 交互。

```javascript
// main.js

if (window.Worker) {
  const worker = new Worker('preloadWorker.js')

  const resources = [
    'image.png', // 示例资源，确保替换为实际的 URL
    'style.css',
    'script.js'
  ]

  worker.postMessage(resources)

  worker.onmessage = (e) => {
    console.log(e.data)
  }
} else {
  console.log("Your browser doesn't support web workers.")
}
```

这段脚本首先检查浏览器是否支持 Web Worker。如果支持，它会创建一个指向 `preloadWorker.js` 的新 Worker 实例，然后将要预加载的资源列表发送给这个 Worker。最后，它设置一个事件监听器来接收并处理 Worker 发出的消息。

## float   {#p0-float}

详见 [float 定位](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#%E8%AF%B7%E9%98%90%E8%BF%B0float%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

注意浮动塌陷的解决方案可概括为两类

1. 采用 clear 属性清除塌陷
2. 创建新的 BFC 清除浮动塌陷

## custom-property {#p2-custom-property}

CSS 自定义属性，又称 CSS 变量，是一种在 CSS 样式表中声明可以使用任意值的方法，这样的值在同一份 CSS 代码中可以多次引用并调用来替代特定的内容。使用 CSS 变量可以提高样式表的可维护性和灵活性。以下是如何声明和使用 CSS 变量的步骤：

 声明 CSS 变量

CSS 变量的声明总是以 `--` 开头，跟随变量名。你可以在 CSS 的任何范围内声明变量，包括 `:root`（相当于 HTML 的根），这样所有样式规则都可以访问到。

**示例**：

```css
:root {
 --main-color: #3498db;
 --padding: 8px;
 --transition-speed: 0.3s;
}
```

 使用 CSS 变量

在 CSS 中使用变量时，你需要使用 `var()` 函数，并在括号中提供变量名，可以包含在`--` 前缀之后。

**示例**：

```css
body {
 background-color: var(--main-color);
 padding: var(--padding);
 transition: all var(--transition-speed) ease-in-out;
}
```

 默认值

有时候，你可能想为 CSS 变量提供一个默认值，以防它未被声明时使用。在 `var()` 函数中，你可以添加一个可选的第二个参数作为默认值。

**示例**：

```css
body {
 font-size: var(--font-size, 16px);
}
```

在上面的例子中，如果 `--font-size` 变量没有在任何地方声明，`body` 的 `font-size`将默认使用 `16px`。

 作用域

变量的作用域是根据它们声明的地方确定的：

* 在 `:root` 选择器内声明的变量是全局变量，在任何地方都可以使用。
* 在其他元素或伪类的 CSS 规则中声明的变量会在该元素或这些伪类中局部有效。

**示例**：

```css
button {
 --button-bg-color: #e74c3c;
}

.btn-primary {
 background-color: var(--button-bg-color);
}
```

在上面的例子中，`--button-bg-color` 变量只在 `button` 元素中声明，因此它只在 `button` 下的所有样式规则中可用，`.btn-primary`则是基于这个变量设置的。

CSS 变量是非常强大的工具，特别是当你需要在整个页面上保持一致性，或者是要实现主题应用时。它们有助于实现动态主题，使样式管理更系统化。
