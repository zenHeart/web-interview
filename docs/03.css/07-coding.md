# 编码题

## 如何实现页面文本不可选中，不可复制 {#p0-text-unselect}

可以通过 CSS 和 JavaScript 结合的方式实现页面文本不可选中和不可复制。

**一、使用 CSS**

可以通过设置 CSS 属性来禁止用户选中页面文本：

```css
body {
 -webkit-user-select: none;
 -moz-user-select: none;
 -ms-user-select: none;
 user-select: none;
}
```

这将禁止在整个页面上进行文本选择。

**二、使用 JavaScript**

如果仅使用 CSS 不能满足需求，可以结合 JavaScript 进一步增强禁止复制的功能。以下是一个示例：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 </head>

 <body>
 <p>这是一些不可选中和不可复制的文本。</p>
 <script>
 document.addEventListener("copy", function (e) {
 e.preventDefault();
 });
 </script>
 </body>
</html>
```

在这个例子中，通过监听`copy`事件并调用`preventDefault()`方法来阻止复制操作。

## 三角形 border {#p0-border-triangle}

在CSS中，你可以使用多种方法来实现三角形。以下是几种常用的方法和相应的代码示例：

1. 使用边框：

```css
.triangle {
 width: 0;
 height: 0;
 border-left: 50px solid transparent;
 border-right: 50px solid transparent;
 border-bottom: 100px solid red;
}
```

这个方法通过设置元素的边框来创建三角形，其中左右边框设为透明，底边框设置为你想要的颜色。

2. 使用伪元素：

```css
.triangle {
 position: relative;
 width: 100px;
 height: 100px;
}

.triangle:before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 border-width: 0 100px 100px 0;
 border-style: solid;
 border-color: red;
}
```

这个方法使用伪元素 `::before` 来创建三角形，通过设置其边框的宽度和样式来实现。

3. 使用旋转：

```css
.triangle {
 width: 100px;
 height: 100px;
 background-color: red;
 transform: rotate(45deg);
}
```

这个方法创建一个正方形元素，然后通过使用 `transform` 属性的 `rotate` 函数将其旋转45度，从而形成一个三角形。

## CSS3实现卡片翻转?

## 常见布局实现

1. 三栏布局
2. 圣杯布局

[Front-end-Developer-Interview-Questions/css](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/css-questions/) github 仓库前端面试题

* [front-end-interview-handbook/css](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md) 上面面试题的答案

1、要实现行内元素 `<span>、<a>` 等的水平居中：text-align:center;

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

## 实现阿拉伯数字转中文 {#p0-arabic-to-chinese}

将阿拉伯数字转换成中文数字，主要考虑到以下几个转换规则：

1. **基本数字**：0-9 对应的汉字数字。
2. **单位**：十、百、千、万、亿等。
3. **规则**：数字从右到左，每 4 位一小节，小节内部和小节之间的转换规则。

 实现思路

1. 将阿拉伯数字分解成单个数字，从右到左进行处理。
2. 对每 4 位数字进行处理，即一个小节，处理完再根据小节的位置添加对应的单位（万、亿等）。
3. 处理当前小节内部的数字，并添加十、百、千的单位，注意去除连续的零，并且在必要时加入“零”字。
4. 将各个小节合并得到最终结果。

下面的 JavaScript 函数实现了阿拉伯数字到中文数字的基本转换：

```js
const number2text = (number, type = 'upper') => {
  // 配置
  const confs = {
    lower: {
      num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      unit: ['', '十', '百', '千', '万'],
      level: ['', '万', '亿']
    },
    upper: {
      num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
      unit: ['', '拾', '佰', '仟'],
      level: ['', '万', '亿']
    },
    decimal: {
      unit: ['分', '角']
    },
    maxNumber: 999999999999.99
  }

  // 过滤不合法参数
  if (Number(number) > confs.maxNumber) {
    console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`)
    return false
  }

  const conf = confs[type]
  const numbers = String(Number(number).toFixed(2)).split('.')
  const integer = numbers[0].split('')
  const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('')

  // 四位分级
  const levels = integer.reverse().reduce((pre, item, idx) => {
    const level = pre[0] && pre[0].length < 4 ? pre[0] : []
    const value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4]
    level.unshift(value)

    if (level.length === 1) {
      pre.unshift(level)
    } else {
      pre[0] = level
    }

    return pre
  }, [])

  // 整数部分
  const _integer = levels.reduce((pre, item, idx) => {
    let _level = conf.level[levels.length - idx - 1]
    let _item = item.join('').replace(/(零)\1+/g, '$1') // 连续多个零字的部分设置为单个零字

    // 如果这一级只有一个零字，则去掉这级
    if (_item === '零') {
      _item = ''
      _level = ''

      // 否则如果末尾为零字，则去掉这个零字
    } else if (_item[_item.length - 1] === '零') {
      _item = _item.slice(0, _item.length - 1)
    }

    return pre + _item + _level
  }, '')

  // 小数部分
  const _decimal = decimal
    .map((item, idx) => {
      const unit = confs.decimal.unit
      const _unit = item !== '0' ? unit[unit.length - idx - 1] : ''

      return `${conf.num[item]}${_unit}`
    })
    .join('')

  // 如果是整数，则补个整字
  return `${_integer}元` + (_decimal || '整')
}
```

## CSS 中隐藏元素的方法有哪些? {#hide-element}

`opacity: 0`、`visibility: hidden`、`display: none` 都可以使元素不可见，但它们之间有一些区别。

* `opacity: 0`：设置元素透明度为0，元素依然占据原来的空间，并且可以接收到鼠标事件。通常用于实现淡出效果。
* `visibility: hidden`：元素不可见，但是仍然占据原来的空间，并且可以接收到鼠标事件。常用于实现菜单的展开和收起。
* `display: none`：元素不可见，且不占据空间，也不接收鼠标事件。通常用于实现元素的隐藏和显示。

因为这三种属性的区别，它们在使用场景上也有所不同：

* `opacity: 0`：适用于需要实现淡出效果的场景，比如弹出层的显示和隐藏。
* `visibility: hidden`：适用于需要占据原来空间的元素，但不需要显示的场景，比如菜单的展开和收起。
* `display: none`：适用于需要完全隐藏元素的场景，比如实现一个开关，点击开关后可以隐藏或者显示某个元素。

在 CSS 中，隐藏元素可以通过多种方式实现，每种方式有其特定的使用场景。这里列出了一些常用的方法：

 1. `display: none;`

完全移除元素，使其不占据任何空间，也不会在文档流中占位。元素及其所有子元素都不会显示。

```css
.element {
 display: none;
}
```

 2. `visibility: hidden;`

使元素不可见，但它仍然占据原来的空间和位置。与 `display: none;` 不同，`visibility: hidden;` 不会影响文档流的布局。

```css
.element {
 visibility: hidden;
}
```

 3. `opacity: 0;`

设置元素透明度为 `0`，使其完全透明。元素仍然占据空间，并且可以与之互动（例如，点击），除非你另外禁用了元素的互动能力。

```css
.element {
 opacity: 0;
}
```

 4. 使用绝对定位

将元素移出视图区域，例如设置一个非常大的负边距。

```css
.element {
 position: absolute;
 left: -9999px;
}
```

或者使用 `top` 或 `bottom`，将其定位到视窗外部。

 5. `clip` 或 `clip-path`

通过剪裁，使元素的某些部分不可见。`clip-path` 可以更灵活地定义哪些部分可见。

```css
.element {
 clip-path: circle(0);
}
```

 6. `overflow: hidden;` 与尺寸设置

设置元素宽高为 0，并设置 `overflow` 为 `hidden`，这将隐藏元素内容。

```css
.element {
 width: 0;
 height: 0;
 overflow: hidden;
}
```

 7. 将元素的 `height` 或 `width` 设置为 `0` 并结合 `overflow: hidden`

如果你还想保留某些边框或轮廓的样式，可能希望使用 `width` 和 `height` 为 `0` 的方法，加上 `overflow: hidden` 防止内容外泄。

```css
.element {
 width: 0;
 height: 0;
 overflow: hidden;
}
```

 应用场景和选择

* **从 DOM 中完全移除元素**：`display: none;` 适合完全从文档流中移除元素的场景。
* **仍需要保留位置**：`visibility: hidden;` 适合需要隐藏元素但保留其占位的场景。
* **逐渐隐藏**：`opacity: 0;` 适合需要渐变动画效果的场景。
* **临时移除视野或隐藏内容的特定部分**：使用定位或 `clip-path` 方法。

## css 实现打字机效果 {#p3-typing}

主要是对 css 动画的一个实际应用考察

以下是一个使用 CSS 实现简单打字机效果的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <style>
 .typewriter {
 width: 300px;
 border-right: 4px solid black;
 animation: typing 4s steps(30), blink 0.5s step-end infinite;
 white-space: nowrap;
 overflow: hidden;
 }

 @keyframes typing {
 from {
 width: 0;
 }
 to {
 width: 300px;
 }
 }

 @keyframes blink {
 50% {
 border-color: transparent;
 }
 }
 </style>
 </head>

 <body>
 <p class="typewriter">这是一个打字机效果的文本</p>
 </body>
</html>
```

在上述代码中，`.typewriter` 类的元素用于实现打字机效果。

`animation: typing 4s steps(30), blink 0.5s step-end infinite;` 定义了两个动画：

* `typing` 动画用于模拟文字逐个出现的效果，从宽度为 `0` 逐渐增加到 `300px`，`steps(30)` 表示分 30 步完成动画，使文字出现有逐个显示的效果。

* `blink` 动画用于模拟光标闪烁效果，每 `0.5s` 闪烁一次，在 `50%` 进度时，光标（通过右边框实现）变为透明来模拟闪烁。

## css 实现翻牌效果 {#p3-reverse}

主要是考察几个属性的使用

* `transform: rotateY` 用于 Y 轴旋转
* `transition` 用于过度动画

还有一个要点：

* 翻转卡牌的时候，正面在上， 要将背面隐藏； 背面在上， 要将正面隐藏；

效果如下：
![01.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/404f57ed66964d9a8410bed9d3859c77~tplv-73owjymdk6-watermark.image?policy=eyJ2bSI6MywidWlkIjoiNDEyNTAyMzM1Nzg5OTM2NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1720875123&x-orig-sign=VMh9nhfE8JreFH6TyeVg7aOUre4%3D)

**实现比较简单， 直接贴代码**：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <style>
 .card {
 display: flex;
 }

 .flip-card {
 float: left;
 position: relative;
 height: 36vmin;
 width: calc(40vmin / 1.4);
 background-color: white;
 padding: 20px;
 border-radius: calc(40vmin / 20);
 box-shadow: 0 calc(40vmin / 40) calc(40vmin / 10) 0 rgba(0, 0, 0, 0.6);
 overflow: hidden;
 transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
 transform: rotateY(0deg);
 }

 .label:hover .flip-card {
 transform: rotateY(180deg);
 background-color: black;
 transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
 }

 .label:hover .flip-front {
 opacity: 0;
 display: none;
 transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
 }

 .label:hover .flip-end {
 opacity: 1;
 display: block;
 transform: rotateY(180deg);
 color: white;
 font-size: 20px;
 transition: transform 200ms linear, box-shadow 200ms linear, background-color 200ms linear;
 }

 .flip-front {
 width: 100%;
 height: 100%;
 opacity: 1;
 cursor: pointer;
 }

 .flip-end {
 width: 100%;
 height: 100%;
 opacity: 0;
 display: none;
 cursor: pointer;
 }

 .label {
 background-color: white;
 border-radius: calc(40vmin / 20);
 }
 </style>
 </head>
 <body>
 <div class="card">
 <div class="label">
 <div class="flip-card">
 <div class="flip-front">我是正面</div>
 <div class="flip-end">
 在上述代码中，我们创建了一个带有 card 类的容器，内部有一个 card-inner 元素，它包含了 card-front（正面）和
 card-back（背面）两个元素。 当鼠标悬停在 card 元素上时，通过 :hover 选择器将 card-inner 元素绕 Y 轴旋转 180
 度，实现翻牌效果。
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
```

## 全局样式命名冲突和样式覆盖问题怎么解决？{#p0-css-confict}

在前端开发过程中，有几种常见的方法可以解决全局样式命名冲突和样式覆盖问题：

1. 使用命名空间（Namespacing）：给样式类名添加前缀或命名空间，以确保每个组件的样式类名不会冲突。例如，在一个项目中，可以为每个组件的样式类名都添加一个唯一的前缀，例如`.componentA-button`和`.componentB-button`，这样可以避免命名冲突。

2. 使用BEM命名规范：BEM（块、元素、修饰符）是一种常用的命名规范，可以将样式类名分成块（block）、元素（element）和修饰符（modifier）三个部分，以确保样式的唯一性和可读性。例如，`.button`表示一个块，`.button__icon`表示一个元素，`.button--disabled`表示一个修饰符。

3. 使用CSS预处理器：CSS预处理器（如Sass、Less）可以提供变量、嵌套规则和模块化等功能，可以更方便地管理样式并避免命名冲突。例如，可以使用变量来定义颜色和尺寸，使用嵌套规则来组织样式，并将样式拆分成多个模块。

4. 使用CSS模块：CSS模块提供了在组件级别上限定样式作用域的能力，从而避免了全局样式的冲突和覆盖。每个组件的样式定义在组件内部，使用唯一的类名，确保样式的隔离性和唯一性。

5. 使用CSS-in-JS解决方案：CSS-in-JS是一种将CSS样式直接写入JavaScript代码中的方法，通过将样式与组件绑定，可以避免全局样式的冲突问题。一些常见的CSS-in-JS解决方案包括Styled Components、Emotion和CSS Modules with React等。

## CSS 如何实现文本溢出？{#p1-text-overflow}

**单行文本溢出**

在CSS中，可以使用`text-overflow`属性来实现单行文本的溢出省略样式。同时，还需要设置`white-space`属性为`nowrap`，使文本不换行，以及`overflow`属性为`hidden`，隐藏溢出的文本。

以下是一个示例：

```css
.ellipsis {
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
}
```

然后，在HTML中，可以将这个类应用到指定的元素上：

```html
<p class="ellipsis">这是一段很长的文本，如果超过指定的宽度，就会显示省略号。</p>
```

这样，如果文本超过了指定的宽度，就会自动显示省略号。

----------------

**多行文本溢出**

CSS中没有直接的属性可以实现省略样式。但是，可以使用一些技巧来实现多行文本的省略样式。其中一种常用的方法是使用`-webkit-line-clamp`属性和`-webkit-box-orient`属性来限制显示的行数，并且设置`display`属性为`-webkit-box`以创建一个块级容器。

以下是一个示例：

```css
.ellipsis-multiline {
 display: -webkit-box;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 3; // 设置显示的行数 */
 overflow: hidden;
 text-overflow: ellipsis;
}
```

然后，在HTML中，将这个类应用到指定的元素上：

```html
<div class="ellipsis-multiline">
 这是一个多行文本的示例，如果文本内容超过了指定的行数，就会显示省略号。这是一个多行文本的示例，如果文本内容超过了指定的行数，就会显示省略号。这是一个多行文本的示例，如果文本内容超过了指定的行数，就会显示省略号。
</div>
```

请注意，`-webkit-line-clamp`属性只在某些WebKit浏览器中（如Chrome和Safari）支持。在其他浏览器中，可能需要使用其他解决方案来实现多行文本的省略样式。

## 实现页面顶部， 自定义滚动进度条样式 {#p0-custom-scrool}

要实现页面顶部的自定义滚动进度条样式，可以按照以下步骤进行：

1. 在HTML中添加滚动进度条的容器元素，通常可以使用一个`<div>`元素作为容器，放在页面顶部的合适位置。

```html
<div id="scroll-progress"></div>
```

2. 在CSS中定义滚动进度条的样式。可以使用背景颜色、高度、透明度等属性来自定义样式。

```css
#scroll-progress {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 5px;
 background-color: #f00; // 自定义进度条颜色 */
 opacity: 0.7; // 自定义进度条透明度 */
 z-index: 9999; // 确保进度条显示在最顶层 */
}
```

3. 使用JavaScript来监听页面滚动事件，并更新滚动进度条的宽度。

```js
const scrollProgress = document.getElementById('scroll-progress')
let requestId

function updateScrollProgress () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const progress = (scrollTop / (scrollHeight - window.innerHeight)) * 100
  scrollProgress.style.width = progress + '%'
  requestId = null
}

function scrollHandler () {
  if (!requestId) {
    requestId = requestAnimationFrame(updateScrollProgress)
  }
}

window.addEventListener('scroll', scrollHandler)
```

以上就是一个简单的实现页面顶部自定义滚动进度条样式的方法。根据自己的需求，可以调整CSS样式和JavaScript的逻辑来实现不同的效果。

完整代码：

```html
<!DOCTYPE html>
<html>
<head>
 <title>自定义滚动进度条样式</title>
 <style>
 #scroll-progress {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 5px;
 background-color: #f00; // 自定义进度条颜色 */
 opacity: 0.7; // 自定义进度条透明度 */
 z-index: 9999; // 确保进度条显示在最顶层 */
 }
 </style>
</head>
<body>
<div id="scroll-progress"></div>

<!-- 假设有很长的内容 -->
<div style="height: 2000px;"></div>

<script>
 var scrollProgress = document.getElementById('scroll-progress');
 var requestId;

 function updateScrollProgress() {
 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
 var progress = (scrollTop / (scrollHeight - window.innerHeight))100;
 scrollProgress.style.width = progress + '%';
 requestId = null;
 }

 function scrollHandler() {
 if (!requestId) {
 requestId = requestAnimationFrame(updateScrollProgress);
 }
 }

 window.addEventListener('scroll', scrollHandler);
</script>
</body>
</html>
```

## css 隐藏元素的方法有哪些 {#p0-hide-element}

有多种方法可以隐藏元素的CSS。

1. `display: none;`：将元素完全隐藏，不占据任何空间。
2. `visibility: hidden;`：将元素隐藏，但仍占据空间。
3. `opacity: 0;`：将元素透明化，但仍占据空间。
4. `position: absolute; left: -9999px;`：将元素定位到屏幕外部，不显示在可见区域。
5. `height: 0; width: 0; overflow: hidden;`：将元素高度和宽度设为0，同时隐藏溢出内容。
6. `clip-path: polygon(0 0, 0 0, 0 0);`：使用剪切路径将元素隐藏。

这些方法可以根据具体的需求选择合适的方式来隐藏元素。使用 `display: none;` 是最常见和常用的隐藏元素的方法，它会完全移除元素并且不占据页面空间。而其他方法则可以根据需要在元素隐藏的同时保留占位空间或其他特殊效果。

**`display: none;`、`visibility: hidden;` 和 `opacity: 0;` 区别是啥**

`display: none;`、`visibility: hidden;` 和 `opacity: 0;` 是用于隐藏元素的CSS属性，它们之间有一些区别：

1. `display: none;`：该属性会完全移除元素，并且不占据页面空间。隐藏后的元素在文档流中不可见，也不会影响其他元素的布局。相当于元素被完全移除了，无法通过任何方式找到它。当需要彻底从页面中移除元素时，可以使用该属性。

2. `visibility: hidden;`：该属性会将元素隐藏，但仍然占据页面空间。隐藏后的元素在文档流中保留了位置，仅仅是不可见了。元素隐藏后不会影响其他元素的布局。可以通过JavaScript或其他方式找到该元素，并且可以在需要时将其重新显示。

3. `opacity: 0;`：该属性将元素设置为完全透明。元素仍然占据页面空间，但是不可见。透明元素在文档流中保留位置，并且不会影响其他元素的布局。可以通过JavaScript或其他方式找到该元素，并在需要时将其重新设置为可见。

综上所述，`display: none;` 完全移除元素并且不占据空间，`visibility: hidden;` 保留元素位置但不可见，`opacity: 0;` 使元素透明但仍然占据空间。根据具体需求选择合适的属性来隐藏元素。

## H5 如何解决移动端适配问题 {#p0-responsive-design}

移动端适配问题是指如何让网页在不同的移动设备上显示效果相同。下面是一些常见的 H5 移动端适配方案：

1. 使用 viewport 标签

通过设置 viewport 标签的 meta 属性，来控制页面的缩放比例和宽度，以适配不同的设备。例如：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

其中 `width=device-width` 表示设置 viewport 的宽度为设备宽度，`initial-scale=1.0` 表示初始缩放比例为 1。

2. 使用 CSS3 的媒体查询

通过 CSS3 的媒体查询，根据不同的设备宽度设置不同的样式，以适配不同的设备。例如：

```arduino
arduinoCopy code@media screen and (max-width: 640px) {
 // 样式 */
}
```

其中 `max-width` 表示最大宽度，当屏幕宽度小于等于 640px 时，应用这些样式。

3. 使用 rem 单位

通过将 px 转化为 rem 单位，根据不同的设备字体大小设置不同的样式，以适配不同的设备。例如：

```css
html {
 font-size: 16px;
}

@media screen and (max-width: 640px) {
 html {
 font-size: 14px;
 }
}

<div {
 width: 10rem;
}
```

其中 `font-size: 16px` 表示将网页的基准字体大小设置为 16px，`font-size: 14px` 表示在屏幕宽度小于等于 640px 时将基准字体大小设置为 14px，`div` 元素的 `width: 10rem` 表示该元素的宽度为 10 个基准字体大小。

4. 使用 flexible 布局方案

通过使用 flexible 布局方案，将 px 转化为 rem 单位，并且动态计算根节点的字体大小，以适配不同的设备。例如使用 lib-flexible 库：

```html
arduinoCopy code// index.html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.4/flexible.js"></script>

// index.js
import 'lib-flexible/flexible.js'
```

其中 `flexible.js` 会在页面加载时动态计算根节点的字体大小，并将 px 转化为 rem 单位。在样式中可以直接使用 px 单位，例如：

```css
<div {
 width: 100px;
 height: 100px;
}
```

这个 div 元素的大小会根据设备屏幕的宽度进行适配。

可以通过根据请求来源（User-Agent）来判断访问设备的类型，然后在服务器端进行适配。例如，可以在服务器端使用 Node.js 的 Express 框架，在路由中对不同的 User-Agent 进行判断，返回不同的页面或数据。具体实现可以参考以下步骤：

1. 根据 User-Agent 判断访问设备的类型，例如判断是否为移动设备。可以使用第三方库如 ua-parser-js 进行 User-Agent 的解析。

2. 如果是移动设备，可以返回一个 H5 页面或接口数据。

3. 如果是 PC 设备，可以返回一个 web 应用页面或接口数据。

具体实现方式还取决于应用的具体场景和需求，以上只是一个大致的思路。

## 实现 table header 吸顶， 有哪些实现方式？ {#p0-table-stick}

实现 table header 吸顶的方法有多种，以下是一些基于 CSS 的实现方式：

1. 使用 position: sticky 属性：在表格头部的 CSS 中，使用 position: sticky 属性可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: sticky;
 top: 0;
 background-color: #fff;
 }
 ```

2. 使用 CSS transform 属性：在表格头部的 CSS 中，使用 CSS transform 属性可以使表格头部保持固定位置，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: relative;
 z-index: 1;
 }
 thead {
 position: fixed;
 top: 0;
 visibility: hidden;
 z-index: 2;
 transform: translateY(0);
 }
 tbody {
 margin-top: 50px;
 }
 ```

3. 使用 JavaScript 和 CSS：使用 JavaScript 和 CSS 可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```html
 htmlCopy code<div class="table-wrapper">
 <table>
 <thead>
 <tr>
 <th>Column 1</th>
 <th>Column 2</th>
 <th>Column 3</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>Row 1, Column 1</td>
 <td>Row 1, Column 2</td>
 <td>Row 1, Column 3</td>
 </tr>
 <tr>
 <td>Row 2, Column 1</td>
 <td>Row 2, Column 2</td>
 <td>Row 2, Column 3</td>
 </tr>
 ...
 </tbody>
 </table>
 </div>
 <script>
 window.onscroll = function() {
 var header = document.querySelector(".table-wrapper thead");
 if (window.pageYOffset > 150) {
 header.classList.add("sticky");
 } else {
 header.classList.remove("sticky");
 }
 };
 </script>
 <style>
 .table-wrapper {
 position: relative;
 }
 .table-wrapper thead {
 position: fixed;
 top: 0;
 z-index: 1;
 background-color: #fff;
 }
 .table-wrapper th {
 height: 50px;
 }
 .table-wrapper.sticky thead {
 position: absolute;
 top: 50px;
 }
 </style>
 ```

通过以上方法的一些组合使用，可以实现 table header 吸顶，提升表格的用户体验和易用性。

实现 table header 吸顶的方法有多种，以下是一些基于 CSS 的实现方式：

1. 使用 position: sticky 属性：在表格头部的 CSS 中，使用 position: sticky 属性可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: sticky;
 top: 0;
 background-color: #fff;
 }
 ```

2. 使用 CSS transform 属性：在表格头部的 CSS 中，使用 CSS transform 属性可以使表格头部保持固定位置，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: relative;
 z-index: 1;
 }
 thead {
 position: fixed;
 top: 0;
 visibility: hidden;
 z-index: 2;
 transform: translateY(0);
 }
 tbody {
 margin-top: 50px;
 }
 ```

3. 使用 JavaScript 和 CSS：使用 JavaScript 和 CSS 可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```html
 htmlCopy code<div class="table-wrapper">
 <table>
 <thead>
 <tr>
 <th>Column 1</th>
 <th>Column 2</th>
 <th>Column 3</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>Row 1, Column 1</td>
 <td>Row 1, Column 2</td>
 <td>Row 1, Column 3</td>
 </tr>
 <tr>
 <td>Row 2, Column 1</td>
 <td>Row 2, Column 2</td>
 <td>Row 2, Column 3</td>
 </tr>
 ...
 </tbody>
 </table>
 </div>
 <script>
 window.onscroll = function() {
 var header = document.querySelector(".table-wrapper thead");
 if (window.pageYOffset > 150) {
 header.classList.add("sticky");
 } else {
 header.classList.remove("sticky");
 }
 };
 </script>
 <style>
 .table-wrapper {
 position: relative;
 }
 .table-wrapper thead {
 position: fixed;
 top: 0;
 z-index: 1;
 background-color: #fff;
 }
 .table-wrapper th {
 height: 50px;
 }
 .table-wrapper.sticky thead {
 position: absolute;
 top: 50px;
 }
 </style>
 ```

通过以上方法的一些组合使用，可以实现 table header 吸顶，提升表格的用户体验和易用性。

实现 table header 吸顶的方法有多种，以下是一些基于 CSS 的实现方式：

1. 使用 position: sticky 属性：在表格头部的 CSS 中，使用 position: sticky 属性可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: sticky;
 top: 0;
 background-color: #fff;
 }
 ```

2. 使用 CSS transform 属性：在表格头部的 CSS 中，使用 CSS transform 属性可以使表格头部保持固定位置，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: relative;
 z-index: 1;
 }
 thead {
 position: fixed;
 top: 0;
 visibility: hidden;
 z-index: 2;
 transform: translateY(0);
 }
 tbody {
 margin-top: 50px;
 }
 ```

3. 使用 JavaScript 和 CSS：使用 JavaScript 和 CSS 可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```html
 htmlCopy code<div class="table-wrapper">
 <table>
 <thead>
 <tr>
 <th>Column 1</th>
 <th>Column 2</th>
 <th>Column 3</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>Row 1, Column 1</td>
 <td>Row 1, Column 2</td>
 <td>Row 1, Column 3</td>
 </tr>
 <tr>
 <td>Row 2, Column 1</td>
 <td>Row 2, Column 2</td>
 <td>Row 2, Column 3</td>
 </tr>
 ...
 </tbody>
 </table>
 </div>
 <script>
 window.onscroll = function() {
 var header = document.querySelector(".table-wrapper thead");
 if (window.pageYOffset > 150) {
 header.classList.add("sticky");
 } else {
 header.classList.remove("sticky");
 }
 };
 </script>
 <style>
 .table-wrapper {
 position: relative;
 }
 .table-wrapper thead {
 position: fixed;
 top: 0;
 z-index: 1;
 background-color: #fff;
 }
 .table-wrapper th {
 height: 50px;
 }
 .table-wrapper.sticky thead {
 position: absolute;
 top: 50px;
 }
 </style>
 ```

通过以上方法的一些组合使用，可以实现 table header 吸顶，提升表格的用户体验和易用性。

## CSS 文档流 是什么概念？

CSS 的文档流（Document Flow）是指文档中元素按照其在 HTML 中出现的顺序自上而下布局的方式，也称为常规流（Normal Flow）或默认流。文档流定义了元素的布局顺序和定位方式，包括元素的位置、大小、间距等属性。

在文档流中，每个元素都会占据一定的空间并尽可能充满其包含块的宽度。每个元素的位置都会受到前面元素的影响，如果前面的元素发生位置变化，那么后面的元素的位置也会发生相应的变化。

文档流中的元素按照下面的规则排列：

1. 块级元素：块级元素会独占一行，并在前面自动添加一个垂直间距。例如：`<p>`、`<div>`、`<h1>` 等。

2. 行内元素：行内元素会在一行中排列，并且宽度根据内容自适应。例如：`<a>`、`<span>`、`<img>` 等。

3. 行内块级元素：行内块级元素与行内元素类似，但是它可以设置宽度、高度等块级元素的属性。例如：`<input>`、`<button>`、`<textarea>` 等。

文档流是 CSS 中最基本、最重要的概念之一，它决定了网页的整体布局和排版方式，也是实现网页布局的基础。在实际开发中，我们需要理解文档流的特性和工作原理，以便更好地掌握网页布局和样式的设计。

## CSS 中 position 常见属性有哪些，大概讲一下？

CSS 中 `position` 属性用于指定元素的定位方式，它有以下常见的属性值：

1. `static`：默认值，元素在文档流中正常排列。

2. `relative`：元素在文档流中正常排列，但是可以通过设置 `top`、`right`、`bottom`、`left` 属性相对于其正常位置进行偏移，不会影响其它元素的位置。

3. `absolute`：元素脱离文档流，相对于最近的非 `static` 定位的祖先元素进行定位，如果没有则相对于 `<html>` 元素进行定位。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移，如果祖先元素发生位置变化，则元素的位置也会发生相应的变化。

4. `fixed`：元素脱离文档流，相对于浏览器窗口进行定位，始终保持在窗口的固定位置，不会随页面滚动而滚动。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移。

5. `sticky`：元素在文档流中正常排列，当元素滚动到指定的位置时，停止滚动并固定在该位置，直到其祖先元素发生滚动时才会取消固定。通过设置 `top`、`right`、`bottom`、`left` 属性和 `z-index` 属性进行设置。

以上是 `position` 属性的常见属性值和简单说明，不同的值会对元素进行不同的定位方式，开发人员可以根据需要选择合适的值来实现页面布局。

## 未知高度和宽度元素的水平垂直居中的方案有哪些， 简单手写一下？ {#p0-layout}

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
