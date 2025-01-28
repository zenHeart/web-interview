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

```javascript
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

## 157 CSS 文档流 是什么概念？

* created_at: 2023-03-26T06:27:52Z
* updated_at: 2023-03-26T06:27:53Z
* labels: CSS
* milestone: 初

CSS 的文档流（Document Flow）是指文档中元素按照其在 HTML 中出现的顺序自上而下布局的方式，也称为常规流（Normal Flow）或默认流。文档流定义了元素的布局顺序和定位方式，包括元素的位置、大小、间距等属性。

在文档流中，每个元素都会占据一定的空间并尽可能充满其包含块的宽度。每个元素的位置都会受到前面元素的影响，如果前面的元素发生位置变化，那么后面的元素的位置也会发生相应的变化。

文档流中的元素按照下面的规则排列：

1. 块级元素：块级元素会独占一行，并在前面自动添加一个垂直间距。例如：`<p>`、`<div>`、`<h1>` 等。

2. 行内元素：行内元素会在一行中排列，并且宽度根据内容自适应。例如：`<a>`、`<span>`、`<img>` 等。

3. 行内块级元素：行内块级元素与行内元素类似，但是它可以设置宽度、高度等块级元素的属性。例如：`<input>`、`<button>`、`<textarea>` 等。

文档流是 CSS 中最基本、最重要的概念之一，它决定了网页的整体布局和排版方式，也是实现网页布局的基础。在实际开发中，我们需要理解文档流的特性和工作原理，以便更好地掌握网页布局和样式的设计。

## 158 CSS 中 position 常见属性有哪些，大概讲一下？

* created_at: 2023-03-26T06:29:30Z
* updated_at: 2023-03-26T06:29:31Z
* labels: CSS
* milestone: 初

CSS 中 `position` 属性用于指定元素的定位方式，它有以下常见的属性值：

1. `static`：默认值，元素在文档流中正常排列。

2. `relative`：元素在文档流中正常排列，但是可以通过设置 `top`、`right`、`bottom`、`left` 属性相对于其正常位置进行偏移，不会影响其它元素的位置。

3. `absolute`：元素脱离文档流，相对于最近的非 `static` 定位的祖先元素进行定位，如果没有则相对于 `<html>` 元素进行定位。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移，如果祖先元素发生位置变化，则元素的位置也会发生相应的变化。

4. `fixed`：元素脱离文档流，相对于浏览器窗口进行定位，始终保持在窗口的固定位置，不会随页面滚动而滚动。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移。

5. `sticky`：元素在文档流中正常排列，当元素滚动到指定的位置时，停止滚动并固定在该位置，直到其祖先元素发生滚动时才会取消固定。通过设置 `top`、`right`、`bottom`、`left` 属性和 `z-index` 属性进行设置。

以上是 `position` 属性的常见属性值和简单说明，不同的值会对元素进行不同的定位方式，开发人员可以根据需要选择合适的值来实现页面布局。

## 159 [Vue] 父子组件通信方式有哪些？

* created_at: 2023-03-26T06:34:56Z
* updated_at: 2023-03-26T06:35:48Z
* labels: web框架
* milestone: 中

Vue 父子组件通信

* Prop（常用）
* $emit (组件封装用的较多)
* .sync语法糖 （较少）
* $attrs & $listeners (组件封装用的较多)
* provide & inject （高阶组件/组件库用的较多）
* slot-scope & v-slot （vue@2.6.0+）新增
* scopedSlots 属性
* 其他方式通信

具体使用场景参考链接：[资料](https://juejin.cn/post/6844903700243316749)

## 160 什么是洋葱模型？

* created_at: 2023-03-26T06:38:58Z
* updated_at: 2023-03-26T06:38:58Z
* labels: web框架
* milestone: 中

说到洋葱模型，就必须聊一聊中间件，中间件这个概念，我们并不陌生，比如平时我们用的 `redux`、`express` 、`koa` 这些库里，都离不开中间件。

那 `koa` 里面的中间件是什么样的呢？其本质上是一个函数，这个函数有着特定，单一的功能，`koa`将一个个中间件注册进来，通过**组合**实现强大的功能。

先看 `demo` ：

```js
// index.js
const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use(async (ctx, next) => {
  console.log('1')
  await next()
  console.log('2')
})
// 中间件2
app.use(async (ctx, next) => {
  console.log('3')
  await next()
  console.log('4')
})
// 中间件3
app.use(async (ctx, next) => {
  console.log('5')
  await next()
  console.log('6')
})
app.listen(8002)
```

先后注册了三个中间件，运行一下`index.js` ，可以看到输出结果为：

```js
1
3
5
6
4
2
```

没接触过洋葱模型的人第一眼可能会疑惑，为什么调用了一个 `next` 之后，直接从`1` 跳到了 `3` ，而不是先输出`1` ，再输出`2`呢。 其实这就是洋葱模型特点，下图是它的执行过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80798be002944d67a46c456d4af3c03c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 一开始我们先后注册了三个中间件，分别是中间件1，中间件2，中间件3，调用`listen`方法，打开对应端口的页面，触发了中间件的执行。

首先会先执行第一个中间件的 `next` 的前置语句，相当于 `demo` 里面的 `console.log('1')` ，当调用 `next()` 之后，会直接进入第二个中间件，继续重复上述逻辑，直至最后一个中间件，就会执行 `next` 的后置语句，然后继续上一个中间件的后置语句，继续重复上述逻辑，直至执行第一个中间件的后置语句，最后输出。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935675e49480426eb517a68c224673c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 正是因为它这种执行机制，才被称为**洋葱模型**。

## 161 如何实现洋葱模式？

* created_at: 2023-03-26T06:44:01Z
* updated_at: 2023-03-26T06:44:02Z
* labels: web框架
* milestone: 高

**思路**

* 首先调用 `use` 方法收集中间件，调用 `listen` 方法执行中间件。
* 每一个中间件都有一个`next`参数（暂时不考虑ctx参数），`next`参数可以控制进入下一个中间件的时机。

**需要解决的问题**

* 最后一个中间件调用next如何处理
* 如何解决同一个中间件多次调用next

**完整代码**

其中最精华的部分就是`compose`函数，细数一下，只有`11`行代码，1比1还原了`koa`的`compose`函数（去除了不影响主逻辑判断）。

> koa是利用koa-compose这个库进行组合中间件的，在koa-compose里面，next返回的都是一个promise函数。

```js
function Koa () {
  this.middleares = []
}
Koa.prototype.use = function (middleare) {
  this.middleares.push(middleare)
  return this
}
Koa.prototype.listen = function () {
  const fn = compose(this.middleares)
}
function compose (middleares) {
  let index = -1
  const dispatch = (i) => {
    if (i <= index) throw new Error('next（） 不能调用多次')
    index = i
    if (i >= middleares.length) return
    const middleare = middleares[i]
    return middleare('ctx', dispatch.bind(null, i + 1))
  }
  return dispatch(0)
}

const app = new Koa()
app.use(async (ctx, next) => {
  console.log('1')
  next()
  console.log('2')
})
app.use(async (ctx, next) => {
  console.log('3')
  next()
  console.log('4')
})
app.use(async (ctx, next) => {
  console.log('5')
  next()
  console.log('6')
})

app.listen()
```

**使用**

```js
const Koa = require('koa')
const app = new Koa()

// 中间件过多，可以创建一个middleares文件夹，将cors函数放到middleares/cors.js文件里面
const cors = () => {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    await next()
  }
}

app.use(cors())
app.use(async (ctx, next) => {
  console.log('第一个中间件', ctx.request.method, ctx.request.url)
  await next()
  ctx.body = 'hello world'
})
```

`koa`的中间件都是有固定模板的，首先是一个函数，并且返回一个`async`函数（闭包的应用），这个`async`函数有两个参数，一个是`koa`的`context`，一个是`next`函数。

## 164 [koa] 中间件的异常处理是怎么做的？

* created_at: 2023-03-26T07:34:30Z
* updated_at: 2023-03-26T07:34:30Z
* labels: web框架
* milestone: 中

在 Koa 中，中间件函数的异常处理可以通过两种方式来实现：

1. 使用 `try...catch` 捕获异常：在中间件函数中使用 `try...catch` 语句来捕获异常，然后通过 `ctx.throw()` 方法抛出异常信息，例如：

```vbnet
vbnetCopy codeasync function myMiddleware(ctx, next) {
 try {
 await next();
 } catch (err) {
 ctx.throw(500, 'Internal Server Error');
 }
}
```

在这个例子中，`await next()` 表示调用下一个中间件函数，如果这个函数抛出异常，就会被捕获到，然后通过 `ctx.throw()` 方法抛出一个包含错误状态码和错误信息的异常。

2. 使用 Koa 的错误处理中间件：Koa 提供了一个错误处理中间件 `koa-json-error`，可以通过在应用程序中使用该中间件来处理异常。这个中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 注册错误处理中间件
app.use(jsonError())

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，`koa-json-error` 中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。开发人员可以通过自定义错误处理函数来处理异常，例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 自定义错误处理函数
function errorHandler (err, ctx) {
  ctx.status = err.status || 500
  ctx.body = {
    message: err.message,
    status: ctx.status
  }
}

// 注册错误处理中间件
app.use(jsonError(errorHandler))

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，我们自定义了一个错误处理函数 `errorHandler`，将错误信息格式化为 JSON 格式，并设置响应状态码。然后将这个函数作为参数传递给 `koa-json-error` 中间件，用于处理异常。

## 168 [koa] 在没有async await 的时候, koa是怎么实现的洋葱模型？

* created_at: 2023-03-26T07:51:12Z
* updated_at: 2023-03-26T07:51:12Z
* labels: web框架
* milestone: 高

在没有 `async/await` 的时候，Koa 通过使用 ES6 的生成器函数来实现洋葱模型。具体来说，Koa 中间件函数是一个带有 `next` 参数的生成器函数，当中间件函数调用 `next` 方法时，它会挂起当前的执行，转而执行下一个中间件函数，直到执行完最后一个中间件函数，然后将执行权返回到前一个中间件函数，继续执行下面的代码。这个过程就像一层一层剥开洋葱一样，因此被称为洋葱模型。

下面是一个使用生成器函数实现的简单的 Koa 中间件函数：

```javascript
function * myMiddleware (next) {
  // 中间件函数的代码
  console.log('Start')
  yield next
  console.log('End')
}
```

在这个中间件函数中，`yield next` 表示挂起当前的执行，执行下一个中间件函数。假设我们有两个中间件函数 `middleware1` 和 `middleware2`，它们的代码如下：

```javascript
function * middleware1 (next) {
  console.log('middleware1 Start')
  yield next
  console.log('middleware1 End')
}

function * middleware2 (next) {
  console.log('middleware2 Start')
  yield next
  console.log('middleware2 End')
}
```

我们可以使用 `compose` 函数将它们组合成一个洋葱模型：

```scss
scssCopy codeconst compose = require('koa-compose');

const app = compose([middleware1, middleware2]);

app();
```

在这个例子中，`compose` 函数将 `middleware1` 和 `middleware2` 组合成一个函数 `app`，然后调用这个函数即可执行整个中间件链。执行的结果如下：

```sql
sqlCopy codemiddleware1 Start
middleware2 Start
middleware2 End
middleware1 End
```

可以看到，这个结果与洋葱模型的特点相符。

## 169 [koa] body-parser 中间件实现原理？

* created_at: 2023-03-26T07:53:06Z
* updated_at: 2023-03-26T07:53:06Z
* labels: web框架
* milestone: 高

Koa 中间件 `koa-bodyparser` 的原理是将 HTTP 请求中的 `request body` 解析成 JavaScript 对象，并将其挂载到 `ctx.request.body` 属性上，方便后续的处理。

具体来说，`koa-bodyparser` 中间件会监听 HTTP 请求的 `data` 事件和 `end` 事件，然后将请求中的数据流解析成一个 JavaScript 对象，并将其作为参数传递给 `ctx.request.body` 属性，最后调用 `await next()`，将控制权交给下一个中间件。

在实现过程中，`koa-bodyparser` 中间件会根据请求头中的 `Content-Type` 字段来判断请求体的类型，支持解析的请求体类型有 `application/json`、`application/x-www-form-urlencoded` 和 `multipart/form-data`。对于其他类型的请求体，`koa-bodyparser` 会将其解析成一个空对象 `{}`。

下面是一个简单的 `koa-bodyparser` 中间件的实现示例：

```javascript
function bodyParser () {
  return async (ctx, next) => {
    if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
      let data = ''
      ctx.req.on('data', (chunk) => {
        data += chunk
      })
      ctx.req.on('end', () => {
        if (ctx.request.headers['content-type'] === 'application/json') {
          ctx.request.body = JSON.parse(data)
        } else if (ctx.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
          ctx.request.body = querystring.parse(data)
        } else if (ctx.request.headers['content-type'].startsWith('multipart/form-data')) {
          // 解析 multipart/form-data 请求体
          // ...
        } else {
          ctx.request.body = {}
        }
        return next()
      })
    } else {
      return next()
    }
  }
}
```

在这个实现中，如果请求方法为 `POST` 或者 `PUT`，则开始监听 `data` 事件和 `end` 事件，将请求体数据解析成一个 JavaScript 对象并挂载到 `ctx.request.body` 上，最后调用 `next()` 将控制权交给下一个中间件。对于其他请求方法，则直接调用 `next()` 交给下一个中间件处理。注意，这个实现只支持解析 `application/json` 和 `application/x-www-form-urlencoded` 类型的请求体，对于其他类型的请求体需要进行特殊处理。

## 170 文件上传和上传文件解析的原理是啥？

* created_at: 2023-03-26T07:57:45Z
* updated_at: 2023-03-26T07:57:46Z
* labels: 网络, 浏览器
* milestone: 高

 前端如何上传图片等文件

在前端上传图片或其他文件字段，一般使用 HTML 中的 `<input>` 元素，并设置 `type="file"`，这样就可以让用户选择本地的文件进行上传。

例如：

```html
htmlCopy code<form enctype="multipart/form-data">
 <input type="file" name="image" accept="image/*">
 <input type="submit" value="上传">
</form>
```

在这个例子中，`<form>` 元素的 `enctype` 属性设置为 `multipart/form-data`，这样就可以将文件作为二进制数据进行上传。

当用户选择了本地的文件后，提交表单时就会将文件作为 `FormData` 对象的一部分进行发送。在 JavaScript 中，可以通过 `FormData` 构造函数来创建一个 `FormData` 对象，并使用 `append()` 方法向其中添加上传的文件数据。例如：

```javascript
const formData = new FormData()
const fileInput = document.querySelector('input[type="file"]')
formData.append('image', fileInput.files[0])
```

这样就可以将文件数据添加到 `formData` 对象中，然后使用 `fetch()` 方法或其他方式将其发送到后端进行处理。

需要注意的是，由于安全原因，浏览器限制了用户上传文件的大小和类型。可以使用 `accept` 属性来限制文件的类型，例如 `accept="image/*"` 表示只允许上传图片类型的文件。可以使用 `multiple` 属性来允许用户选择多个文件进行上传。同时，还需要在后端对上传的文件进行处理和验证，以确保安全性和正确性。

 后端如何解析？koa 为例

在 Koa 中解析上传的文件需要使用一个叫做 `koa-body` 的中间件，它可以自动将 `multipart/form-data` 格式的请求体解析成 JavaScript 对象，从而获取到上传的文件和其他表单数据。

以下是一个使用 `koa-body` 中间件解析上传文件的例子：

```javascript
const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

// 注册 koa-body 中间件
app.use(koaBody({
  multipart: true // 支持上传文件
}))

// 处理上传文件的请求
app.use(async (ctx) => {
  const { files, fields } = ctx.request.body // 获取上传的文件和其他表单数据
  const file = files && files.image // 获取上传的名为 image 的文件

  if (file) {
    console.log(`Received file: ${file.name}, type: ${file.type}, size: ${file.size}`)
    // 处理上传的文件
  } else {
    console.log('No file received')
  }

  // 返回响应
  ctx.body = 'Upload success'
})

app.listen(3000)
```

在上述代码中，使用 `koa-body` 中间件注册了一个解析请求体的函数，并在请求处理函数中获取到了上传的文件和其他表单数据。其中，`files` 对象包含了所有上传的文件，`fields` 对象包含了所有非文件类型的表单数据。

可以根据实际需要从 `files` 对象中获取到需要处理的文件，例如上面的例子中使用了 `files.image` 来获取名为 `image` 的上传文件。可以使用上传文件的属性，如 `name`、`type` 和 `size` 来获取文件的信息，并进行处理。最后返回响应，表示上传成功。

需要注意的是，`koa-body` 中间件需要设置 `multipart: true` 才能支持上传文件。另外，在处理上传文件时需要注意安全性和正确性，可以使用第三方的文件上传处理库来进行处理。

 解析上传文件的原理是啥？

在 HTTP 协议中，上传文件的请求通常使用 `multipart/form-data` 格式的请求体。这种格式的请求体由多个部分组成，每个部分以一个 boundary 字符串作为分隔符，每个部分都代表一个字段或一个文件。

对于一个上传文件的请求，浏览器会将请求体按照 `multipart/form-data` 格式构造，其中每个部分都有一些描述信息和内容，例如文件名、文件类型、文件大小、内容等。

服务器端需要对这些部分进行解析，提取出所需要的信息。常见的解析方式有两种：

1. 手动解析：根据 `multipart/form-data` 格式的规范，按照 boundary 字符串将请求体切分为多个部分，然后解析每个部分的头部和内容，提取出文件名、文件类型、文件大小等信息。这种方式比较麻烦，需要手动处理较多的细节，容易出错。

2. 使用第三方库：可以使用第三方的解析库，如 `multer`、`formidable`、`busboy` 等，来方便地解析 `multipart/form-data` 格式的请求体。这些库通常会将解析出的信息存储到一个对象中，方便进一步处理。

在 Node.js 中，使用 `http` 模块自己实现 `multipart/form-data` 的解析比较麻烦，常见的做法是使用第三方库来解析上传文件，例如在 Koa 中使用 `koa-body` 中间件就可以方便地处理上传文件。

## 171 [Vue] 响应式数据流驱动页面 和 传统的事件绑定命令式驱动页面， 有何优劣？

* created_at: 2023-03-26T08:04:06Z
* updated_at: 2023-03-26T08:04:21Z
* labels: web框架
* milestone: 初

Vue 响应式数据流驱动页面和传统的事件绑定命令式驱动页面是两种不同的前端开发方式，它们的优劣势主要体现在代码编写方式、页面效果、开发效率和维护难度上。

* 响应式数据流驱动页面：Vue 使用响应式的数据流来驱动页面的渲染和更新。Vue 的响应式系统会自动侦测数据的变化，并且重新渲染页面，开发者只需要专注于数据和页面的关系，而不用手动操作 DOM 元素。相比传统的命令式开发方式，响应式数据流驱动页面的代码更简洁、易于维护，开发效率更高。同时，Vue 的组件化开发模式也可以让开发者轻松地实现组件复用和代码复用。

* 传统的事件绑定命令式驱动页面：传统的事件绑定命令式驱动页面是通过手动绑定事件和操作 DOM 元素来实现页面交互效果。这种开发方式需要编写大量的事件处理函数和 DOM 操作代码，容易出现逻辑混乱和代码冗余的问题。同时，由于每个事件都需要手动绑定和处理，开发效率也会受到一定的影响。

综上所述，响应式数据流驱动页面和传统的事件绑定命令式驱动页面都有其优缺点，选择何种开发方式需要根据具体的需求和实际情况来决定。一般来说，响应式数据流驱动页面更适合用于构建数据驱动的、组件化的页面，而传统的事件绑定命令式驱动页面更适合用于构建交互性强、动态性高的页面。

## 172 es6 class 装饰器是如何实现的？

* created_at: 2023-03-26T08:06:20Z
* updated_at: 2023-03-26T08:06:21Z
* labels: JavaScript
* milestone: 高

ES6 中的装饰器是一种特殊的语法，用于动态修改类的行为。在 JavaScript 中，装饰器本质上是一个函数，它可以接受一个类作为参数，并返回一个新的类，实现了类的增强或修改。装饰器可以被用于类、方法、属性等各种地方，可以方便地实现类似 AOP、元编程等功能。

装饰器是 ES7 中的一个提案，目前还没有正式纳入标准。在 ES6 中使用装饰器需要借助第三方库，如 babel-plugin-transform-decorators-legacy。

装饰器实现的基本原理是，在装饰器函数和被装饰对象之间建立一个代理层，通过代理层来实现装饰器的逻辑。在类的装饰器中，装饰器函数的第一个参数是被装饰的类本身，装饰器函数内部可以访问、修改该类的属性和方法。在方法和属性的装饰器中，装饰器函数的第一个参数分别是被装饰的方法或属性所在的类的原型对象，装饰器函数内部可以访问、修改该方法或属性的属性描述符等信息。

以下是一个简单的装饰器示例，用于给类的方法添加一个计时器：

```javascript
function timer(target, name, descriptor) {
 const originalMethod = descriptor.value;
 descriptor.value = function (...args) {
 console.time(name);
 const result = originalMethod.apply(this, args);
 console.timeEnd(name);
 return result;
 };
 return descriptor;
}

class MyClass {
 @timer
 myMethod() {
 // do something
 }
}
```

在上面的示例中，timer 函数就是一个装饰器函数，它接受三个参数，分别是被装饰的方法所在类的原型对象、被装饰的方法的名称、被装饰的方法的属性描述符。在 timer 函数内部，将被装饰的方法替换为一个新的方法，新方法先执行 console.time() 方法，再执行原始方法，最后执行 console.timeEnd() 方法。最后将新的属性描述符返回，完成方法的装饰。

通过类似这种方式，我们可以方便地实现各种类型的装饰器，以增强或修改类的行为。

## 174 Promise then 第二个参数和 Promise.catch 的区别是什么?

* created_at: 2023-03-26T08:10:06Z
* updated_at: 2023-03-26T08:10:06Z
* labels: JavaScript
* milestone: 高

`Promise.then()` 方法可以接受两个参数，第一个参数是 `onFulfilled` 回调函数，第二个参数是 `onRejected` 回调函数。当 Promise 状态变为 `fulfilled` 时，将会调用 `onFulfilled` 回调函数；当 Promise 状态变为 `rejected` 时，将会调用 `onRejected` 回调函数。其中，第二个参数 `onRejected` 是可选的。

`Promise.catch()` 方法是一个特殊的 `Promise.then()` 方法，它只接受一个参数，即 `onRejected` 回调函数。如果 Promise 状态变为 `rejected`，则会调用 `onRejected` 回调函数；如果状态变为 `fulfilled`，则不会调用任何回调函数。因此，`Promise.catch()` 方法可以用来捕获 Promise 中的错误，相当于使用 `Promise.then(undefined, onRejected)`。

区别主要在于使用的方式不同。`Promise.then(onFulfilled, onRejected)` 可以同时传递两个回调函数，用来处理 Promise 状态变为 `fulfilled` 或者 `rejected` 的情况；而 `Promise.catch(onRejected)` 则只能用来处理 Promise 状态变为 `rejected` 的情况，并且使用更加简洁明了。

## 175 Promise finally 怎么实现的？

* created_at: 2023-03-26T08:11:20Z
* updated_at: 2023-03-26T08:11:20Z
* labels: JavaScript
* milestone: 高

`Promise.finally()` 方法是在 ES2018 中引入的，用于指定不管 Promise 状态如何都要执行的回调函数。与 `Promise.then()` 和 `Promise.catch()` 不同的是，`Promise.finally()` 方法不管 Promise 是成功还是失败都会执行回调函数，而且不会改变 Promise 的状态。如果返回的值是一个 Promise，那么 `Promise.finally()` 方法会等待该 Promise 执行完毕后再继续执行。

`Promise.finally()` 方法的实现思路如下：

1. `Promise.finally()` 方法接收一个回调函数作为参数，返回一个新的 Promise 实例。

2. 在新的 Promise 实例的 `then()` 方法中，首先调用原 Promise 的 `then()` 方法，将原 Promise 的结果传递给下一个 `then()` 方法。

3. 在新的 Promise 实例的 `then()` 方法中，调用回调函数并将原 Promise 的结果传递给回调函数。

4. 如果回调函数返回一个 Promise，则需要在新的 Promise 实例的 `then()` 方法中等待该 Promise 执行完毕，再将结果传递给下一个 `then()` 方法。

5. 在新的 Promise 实例的 `finally()` 方法中，返回一个新的 Promise 实例。

下面是一个简单的实现示例：

```javascript
Promise.prototype.finally = function (callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
```

这个实现方法中，使用了 `Promise.resolve()` 来返回一个新的 Promise 实例，因此可以避免了 Promise 链的状态改变。另外，由于 `finally()` 方法只是在 Promise 链的最后执行回调函数，因此不需要使用异步函数。

## 178 [React] useRef、ref、forwardsRef 的区别是什么?

* created_at: 2023-03-26T08:29:41Z
* updated_at: 2023-03-26T08:36:50Z
* labels: web框架
* milestone: 中

在 React 中，`ref` 是一种用于访问 DOM 元素或组件实例的方法，`useRef` 和 `forwardRef` 是 `ref` 的两个相关 Hook 和高阶组件。

1. `ref`：`ref` 是 React 中用于访问 DOM 元素或组件实例的方法。在函数组件中，可以使用 `useRef` Hook 来创建一个 `ref` 对象，然后将其传递给需要引用的元素或组件。在类组件中，可以直接在类中定义 `ref` 属性，并将其设置为元素或组件的实例。

2. `useRef`：`useRef` 是 React 中的 Hook，用于创建一个 `ref` 对象，并在组件生命周期内保持其不变。`useRef` 可以用于访问 DOM 元素或组件实例，并且在每次渲染时都会返回同一个 `ref` 对象。通常情况下，`useRef` 更适合用于存储不需要触发重新渲染的值，例如定时器的 ID 或者其他副作用。

3. `forwardRef`：`forwardRef` 是一个高阶组件，用于将 `ref` 属性转发给其子组件。通常情况下，如果一个组件本身并不需要使用 `ref` 属性，但是其子组件需要使用 `ref` 属性，那么可以使用 `forwardRef` 来传递 `ref` 属性。`forwardRef` 接受一个函数作为参数，并将 `ref` 对象作为第二个参数传递给该函数，然后返回一个新的组件，该组件接受 `ref` 属性并将其传递给子组件。

简而言之，`ref` 是 React 中访问 DOM 元素或组件实例的方法，`useRef` 是一个 Hook，用于创建并保持一个不变的 `ref` 对象，`forwardRef` 是一个高阶组件，用于传递 `ref` 属性给子组件。

## 179 [React] useEffect的第二个参数，如何判断依赖是否发生变化？

* created_at: 2023-03-26T08:36:21Z
* updated_at: 2023-03-26T08:37:57Z
* labels: web框架
* milestone: 高

`useEffect`的第二个参数是一个依赖数组，用于判断副作用函数的依赖是否发生变化。React使用JavaScript的`Object.is`方法来判断依赖项是否发生变化。在比较依赖项时，React首先检查依赖项的值是否相等。如果依赖项的值是引用类型，React会比较它们的引用地址，而不是比较它们的属性值。因此，在比较引用类型时，即使对象具有相同的属性值，但它们的引用地址不同，React仍然认为它们是不同的。

需要注意的是，如果依赖项是一个数组或对象，由于它们是引用类型，因此即使数组或对象中的元素或属性没有发生变化，但数组或对象本身的引用地址发生变化，也会导致React重新执行副作用函数。在这种情况下，我们可以使用`useCallback`和`useMemo`来缓存回调函数和计算结果，以便避免在依赖数组发生变化时重新计算和创建。

## 180 HTTP协议的不同版本的主要特点有哪些？

* created_at: 2023-03-26T09:10:32Z
* updated_at: 2023-03-26T09:16:48Z
* labels: 网络
* milestone: 高

HTTP协议的不同版本的主要特点如下表所示：

|版本|发布时间|主要特点|
|---|---|---|
|HTTP/0.9|1991年|只支持GET方法，没有Header和Body|
|HTTP/1.0|1996年|引入Header、POST方法、响应码、缓存等特性|
|HTTP/1.1|1999年|引入持久连接、管道化请求、分块传输编码、Host头、缓存控制等特性|
|HTTP/2|2015年|引入二进制分帧、头部压缩、流量控制、多路复用等特性|
|HTTP/3|2021年|引入QUIC协议，改进网络传输性能|

需要注意的是，HTTP/1.x和HTTP/2都支持TLS加密传输，即HTTPS协议。HTTP/3则是基于QUIC协议的，使用TLS 1.3进行加密传输。

## 181 http1.1 持久连接 和 http2 的多路复用有什么区别？

* created_at: 2023-03-26T09:12:29Z
* updated_at: 2023-03-26T09:12:30Z
* labels: 网络
* milestone: 高

HTTP/1.1和HTTP/2都是HTTP协议的不同版本，在网络传输和性能方面有很大的差别。

HTTP/1.1使用的是“管线化请求”和“持久连接”来提高性能，而HTTP/2则引入了更多的特性，其中最重要的特性是“多路复用”。

“管线化请求”是HTTP/1.1提出的一种优化方法，它可以让浏览器同时发出多个请求，从而避免了HTTP/1.1中因为请求阻塞导致的性能问题。但是，由于HTTP/1.1的“管线化请求”存在“队头阻塞”（head-of-line blocking）问题，即前面一个请求没有得到响应时，后面的请求必须等待，导致性能并没有得到很大提升。

“持久连接”是HTTP/1.1中另一种提高性能的方法，它可以在一个TCP连接中传输多个HTTP请求和响应，避免了每个请求都需要建立和关闭连接的开销。但是，由于HTTP/1.1中的“持久连接”是按顺序发送请求和响应的，所以依然存在“队头阻塞”的问题。

HTTP/2则引入了“多路复用”（multiplexing）这一特性，可以在一个TCP连接上同时传输多个HTTP请求和响应，避免了“队头阻塞”问题。它使用二进制分帧（binary framing）技术将HTTP请求和响应分成多个帧（frame），并使用流（stream）来标识不同的请求和响应，从而实现了更高效的网络传输和更低的延迟。此外，HTTP/2还引入了头部压缩（header compression）和服务器推送（server push）等特性。

因此，HTTP/2的多路复用比HTTP/1.1的管线化请求和持久连接更为高效、灵活，能够更好地支持现代Web应用的性能要求。

## 182 http3 QUIC 是什么协议？

* created_at: 2023-03-26T09:13:35Z
* updated_at: 2023-03-26T09:13:40Z
* labels: 网络
* milestone: 中

HTTP/3（或称为HTTP-over-QUIC）是一个基于QUIC协议的新版本的HTTP协议。QUIC（Quick UDP Internet Connections）是由Google设计的一个基于UDP协议的传输层协议，旨在解决HTTP/2协议存在的一些问题。

HTTP/3中引入了QUIC的一些特性，如0-RTT连接建立、基于UDP的传输、数据流多路复用和快速恢复等，这些特性有助于提高性能和安全性。与HTTP/2相比，HTTP/3采用了新的二进制编码协议（QUIC Crypto）来加密和验证数据，以提供更好的安全性。

此外，HTTP/3还可以更好地适应现代网络环境下的多元化应用需求。由于QUIC协议基于UDP协议，因此可以更好地适应移动网络和高丢包率网络等不稳定的网络环境。同时，HTTP/3可以更好地支持多媒体内容和实时通信等应用场景。

## 183 HTTP/3 是基于 UDP 的协议， 那么他是如何保障安全性的？

* created_at: 2023-03-26T09:18:32Z
* updated_at: 2024-07-05T09:52:10Z
* labels: 网络
* milestone: 资深

HTTP/3是基于UDP的协议，因此在设计时需要考虑安全性问题。为了保障安全性，HTTP/3使用了一个新的加密协议——QUIC Crypto。

QUIC Crypto使用了一种名为"0-RTT安全连接"的机制，允许客户端在第一次请求时就可以建立安全连接，从而减少连接建立的延迟。此外，HTTP/3还使用了数字证书来验证服务器身份，以确保通信的安全性。

在HTTP/3中，每个数据包都使用一个独特的标识符（Connection ID）来标识。这个标识符会在每个数据包中包含，以便服务器能够识别它们。这种方式可以防止攻击者进行连接欺骗，从而提高了安全性。

另外，HTTP/3还使用了一些其他的技术来提高安全性，如0-RTT加密、零轮延迟、源地址验证、密钥派生和更新等。

综上所述，HTTP/3采用了一系列安全机制来保护通信安全，使其能够在基于UDP的网络环境下运行，并提供更好的性能和安全性。

## 184 前端如何防止加载外域脚本？

* created_at: 2023-03-26T09:24:28Z
* updated_at: 2023-03-26T09:24:29Z
* labels: 网络
* milestone: 高

前端可以通过以下方式防止加载外域脚本：

1. 使用 Content Security Policy (CSP)：CSP 是一个 HTTP 头，可以限制页面可以从哪些源加载资源。通过 CSP，可以禁止加载外域脚本，从而防止 XSS 攻击等安全问题。

2. 使用 Subresource Integrity (SRI)：SRI 是一个浏览器功能，可以确保在加载外部资源时，它们的内容没有被篡改过。通过在 script 标签中添加 integrity 属性，可以指定资源的校验和，浏览器会校验资源是否与 integrity 值匹配，从而确保资源没有被篡改过。

3. 避免使用动态脚本加载：使用 document.createElement('script') 创建 script 元素，并手动设置其 src 属性，可以避免使用 eval() 动态执行脚本。动态加载脚本的方式可能会受到中间人攻击，从而加载恶意脚本。

4. 避免使用不安全的协议加载资源：使用 HTTPS 加载资源可以确保资源在传输过程中不会被篡改。避免使用 HTTP 或者 file 协议加载资源，这些协议容易受到中间人攻击。

综上，前端可以通过以上方式防止加载外域脚本，提高应用程序的安全性。

## 185 TypeScript is 这个关键字是做什么呢？

* created_at: 2023-03-26T09:26:44Z
* updated_at: 2023-03-26T09:26:45Z
* labels: TypeScript
* milestone: 初

`is` 是 TypeScript 中的一个关键字，用于创建类型保护。在 TypeScript 中，类型保护是一种用于确定变量是否符合某种类型的方法。当我们使用 `is` 关键字创建一个类型保护时，它会在运行时对变量进行判断，然后返回一个布尔值。

具体来说，我们可以通过定义一个返回值为布尔类型的函数，并在函数内部进行类型判断来创建类型保护。比如：

```csharp
csharpCopy codefunction isString(value: any): value is string {
 return typeof value === 'string';
}
```

在这个例子中，我们定义了一个名为 `isString` 的函数，它接收一个任意类型的参数 `value`，并通过 `typeof` 运算符判断 `value` 是否为字符串。如果是字符串，函数返回 `true`，否则返回 `false`。

使用时，我们可以通过将变量传递给 `isString` 函数来判断变量是否为字符串类型：

```rust
rustCopy codeconst str = 'hello';
if (isString(str)) {
 console.log(str.length);
}
```

在这个例子中，由于 `str` 是字符串类型，所以 `isString(str)` 返回 `true`，`if` 语句内的代码会被执行，输出字符串的长度。如果 `str` 不是字符串类型，`isString(str)` 返回 `false`，`if` 语句内的代码不会被执行。

这样，在使用变量之前进行类型保护，可以避免在运行时出现类型错误，提高代码的健壮性。

## 186 中间人攻击是什么？

* created_at: 2023-03-26T09:29:08Z
* updated_at: 2023-03-26T09:29:09Z
* labels: 网络
* milestone: 高

中间人攻击（Man-in-the-Middle Attack, MITM），也称中间攻击，是指黑客通过拦截通信过程中的数据，然后在两个通信的用户之间进行欺骗和篡改的攻击方式。在 HTTPS 中，如果黑客能够截获用户和服务器之间的通信，那么他就可以使用类似于伪造证书、中断连接、插入恶意代码等方式，对数据进行篡改或窃取用户敏感信息。

为了防止中间人攻击，在 HTTPS 中通常采用数字证书认证机制，即服务器会向可信的第三方机构申请数字证书，证明其身份的真实性。当用户访问该服务器时，服务器会把自己的数字证书发送给用户，用户的浏览器会验证该证书是否由可信的第三方机构签发，是否过期等，如果验证通过，则可以建立安全的 HTTPS 连接。如果数字证书无效，则会弹出警告页面，提示用户存在安全风险。

## 187 前端单页应用 History 路由模式， 需要如何配置 nginx？

* created_at: 2023-03-26T09:30:59Z
* updated_at: 2023-04-03T01:27:28Z
* labels: 工程化
* milestone: 高

前端单页应用使用 History 路由模式，需要将路由的控制交给前端，而不是后端处理，因此需要配置 nginx 让其将所有请求都指向 index.html 页面，让前端来处理路由。

具体配置可以参考以下 nginx 配置：

```bash
bashCopy codeserver {
 listen 80;
 server_name example.com; # 域名或 IP 地址

 location / {
 root /path/to/your/app; # 项目根目录
 index index.html;
 try_files $uri $uri/ /index.html; # 将所有请求都指向 index.html 页面
 }
}
```

以上配置中，`try_files` 指令会尝试将请求映射到对应的文件，如果找不到，则会将请求转发到 `/index.html` 页面，由前端来处理路由。同时，`root` 指令需要指向前端应用的根目录。

## 188 前端如何实现截图？

* created_at: 2023-03-26T09:34:41Z
* updated_at: 2023-09-12T03:31:44Z
* labels: web应用场景
* milestone: 中

前端实现截图需要使用 HTML5 的 Canvas 和相关 API，具体步骤如下：

1. 首先在页面中创建一个 Canvas 元素，并设置其宽高和样式。
2. 使用 Canvas API 在 Canvas 上绘制需要截图的内容，比如页面的某个区域、某个元素、图片等。
3. 调用 Canvas API 中的 `toDataURL()` 方法将 Canvas 转化为 base64 编码的图片数据。
4. 将 base64 编码的图片数据传递给后端进行处理或者直接在前端进行显示。

以下是一个简单的例子，实现了对整个页面的截图：

```html
<!DOCTYPE html>
<html>
 <head>
 <meta charset="UTF-8">
 <title>截图示例</title>
 <style>
 #canvas {
 position: fixed;
 left: 0;
 top: 0;
 z-index: 9999;
 }
 </style>
 </head>
 <body>
 <h1>截图示例</h1>
 <p>这是一个简单的截图示例。</p>
 <button id="btn">截图</button>
 <canvas id="canvas"></canvas>
 <script>
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 const btn = document.getElementById('btn');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 btn.addEventListener('click', () => {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.drawImage(document.documentElement, 0, 0);
 const imgData = canvas.toDataURL();
 console.log(imgData);
 });
 </script>
 </body>
</html>
```

这个例子中，在页面中创建了一个 `canvas` 元素，并设置其宽高和样式，将其放在页面最上方。在点击“截图”按钮时，通过 `toDataURL()` 方法将整个页面的截图转换为 base64 编码的图片数据，并打印到控制台上。

## 189 当QPS达到峰值时, 该如何处理？

* created_at: 2023-03-26T09:36:22Z
* updated_at: 2023-03-26T09:36:22Z
* labels: web应用场景
* milestone: 中

当QPS达到峰值时，可以从以下几个方面来进行优化：

1. 数据库优化：数据库的优化包括优化SQL语句、使用索引、避免全表扫描、分表分库等措施，以提高数据库的读写性能。

2. 缓存优化：缓存可以降低对数据库的访问频率，提高响应速度。可以使用Redis、Memcached等缓存技术，减轻服务器负载。

3. 代码优化：优化代码可以提高代码的执行效率，减少不必要的开销。可以通过一些优化手段，如减少不必要的代码执行、避免循环嵌套、避免不必要的递归调用等来提高代码的性能。

4. 负载均衡：负载均衡可以将请求分发到多个服务器上，减少单个服务器的负载，提高整个系统的性能和可用性。

5. 异步处理：将一些计算量大、耗时长的操作异步处理，减少对主线程的阻塞，提高响应速度。

6. CDN加速：使用CDN技术可以将静态资源缓存到CDN节点上，提高资源的加载速度，减少服务器的负载。

7. 硬件升级：可以通过升级服务器硬件，增加带宽等方式来提高系统的处理能力。

以上是一些常见的优化手段，需要根据具体情况进行选择和实施。

## 190 js 超过 Number 最大值的数怎么处理？

* created_at: 2023-03-26T09:39:36Z
* updated_at: 2023-03-26T09:39:37Z
* labels: web应用场景
* milestone: 中

 js 超过 Number 最大值的数怎么处理

在 JavaScript 中，超过 `Number.MAX_VALUE` 的数值被认为是 `Infinity`（正无穷大）。如果要处理超过 `Number.MAX_VALUE` 的数值，可以使用第三方的 JavaScript 库，如 `big.js` 或 `bignumber.js`，这些库可以处理任意精度的数值。

例如，使用 `big.js` 库可以将两个超过 `Number.MAX_VALUE` 的数相加：

```javascript
const big = require('big.js')

const x = new big('9007199254740993')
const y = new big('100000000000000000')

const result = x.plus(y)

console.log(result.toString()) // 输出：100009007194925474093
```

这里创建了两个 `big.js` 对象 `x` 和 `y`，分别存储超过 `Number.MAX_VALUE` 的数值。通过 `plus` 方法将它们相加，得到了正确的结果。最后，通过 `toString` 方法将结果转换为字符串。

 如果不依赖外部库，咋处理

JavaScript 中，数值超过了 Number 最大值时，可以使用 BigInt 类型来处理，它可以表示任意精度的整数。

使用 BigInt 类型时，需要在数值后面添加一个 `n` 后缀来表示 BigInt 类型。例如：

```javascript
const bigNum = 9007199254740993n // 注意：数字后面添加了 'n' 后缀
```

注意，BigInt 类型是 ECMAScript 2020 新增的特性，因此在某些浏览器中可能不被支持。如果需要在不支持 BigInt 的环境中使用 BigInt，可以使用 polyfill 或者第三方库来实现。

## 191 ['1', '2', '3'].map(parseInt) 结果是啥，为什么？

* created_at: 2023-03-26T09:59:54Z
* updated_at: 2023-03-26T09:59:54Z
* labels: JavaScript
* milestone: 中

执行 `['1', '2', '3'].map(parseInt)` 会得到 `[1, NaN, NaN]`，这个结果可能和人们预期的不一样。

这是因为 `map` 方法会传入三个参数：当前遍历到的元素、当前遍历到的索引、原数组本身。而 `parseInt` 函数则接受两个参数：需要被解析的值、用于解析的进制数。在执行 `['1', '2', '3'].map(parseInt)` 时，实际传入 `parseInt` 的参数如下：

* `'1'`、`0`（表示解析为十进制）：解析后得到数字 `1`。
* `'2'`、`1`（表示解析为一进制）：解析后得到 `NaN`。
* `'3'`、`2`（表示解析为二进制）：解析后得到 `NaN`。

所以结果为 `[1, NaN, NaN]`。

## 192 介绍下深度优先遍历和广度优先遍历，如何实现？

* created_at: 2023-03-26T10:03:39Z
* updated_at: 2023-03-26T10:03:40Z
* labels: JavaScript
* milestone: 中

深度优先遍历（Depth-First-Search，DFS）和广度优先遍历（Breadth-First-Search，BFS）是图和树的两种遍历方式。

 深度优先遍历（DFS）

深度优先遍历采用深度优先的策略遍历整张图或树，即从当前节点开始，先访问其所有子节点，再依次访问子节点的子节点，直到遍历完整张图或树。

DFS 可以使用递归或栈来实现。

递归实现：

```javascript
function dfsRecursive (node, visited) {
  if (!node || visited.has(node)) {
    return
  }
  visited.add(node)
  console.log(node.value)
  for (let i = 0; i < node.children.length; i++) {
    dfsRecursive(node.children[i], visited)
  }
}
```

栈实现：

```javascript
function dfsStack (node) {
  const visited = new Set()
  const stack = [node]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current || visited.has(current)) {
      continue
    }
    visited.add(current)
    console.log(current.value)
    for (let i = current.children.length - 1; i >= 0; i--) {
      stack.push(current.children[i])
    }
  }
}
```

 广度优先遍历（BFS）

广度优先遍历采用广度优先的策略遍历整张图或树，即从当前节点开始，先访问所有相邻节点，再访问所有相邻节点的相邻节点，以此类推，直到遍历完整张图或树。

BFS 可以使用队列来实现。

队列实现：

```javascript
function bfsQueue (node) {
  const visited = new Set()
  const queue = [node]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || visited.has(current)) {
      continue
    }
    visited.add(current)
    console.log(current.value)
    for (let i = 0; i < current.children.length; i++) {
      queue.push(current.children[i])
    }
  }
}
```

总的来说，深度优先遍历和广度优先遍历都有自己的应用场景，比如：

* 深度优先遍历通常用于寻找一条路径，或者对树的节点进行递归操作。
* 广度优先遍历通常用于寻找最短路径，或者对图进行层级遍历操作。

## 193 请分别用深度优先思想和广度优先思想实现一个拷贝函数？

* created_at: 2023-03-26T10:05:58Z
* updated_at: 2023-03-26T10:05:59Z
* labels: JavaScript
* milestone: 中

深度优先思想实现拷贝函数可以采用递归的方式遍历对象或数组，对每个元素进行复制。如果当前元素是一个对象或数组，则递归调用拷贝函数，如果是基本数据类型则直接进行复制。以下是一个用深度优先思想实现拷贝函数的示例代码：

```javascript
function deepClone (obj) {
  // 如果obj是基本数据类型或null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result
  // 判断obj是数组还是对象
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  // 递归遍历obj的每个属性或元素，并进行拷贝
  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}
```

广度优先思想实现拷贝函数可以使用队列的方式，将每个元素放入队列中，然后循环遍历队列。如果当前元素是一个对象或数组，则将其属性或元素放入队列中，然后继续循环遍历队列。如果是基本数据类型则直接进行复制。以下是一个用广度优先思想实现拷贝函数的示例代码：

```javascript
function breadthClone (obj) {
  // 如果obj是基本数据类型或null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result
  // 判断obj是数组还是对象
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  const queue = [obj]
  const resQueue = [result]

  // 循环遍历队列
  while (queue.length > 0) {
    const curObj = queue.shift()
    const curRes = resQueue.shift()

    // 遍历当前元素的每个属性或元素，并进行拷贝
    for (const key in curObj) {
      const val = curObj[key]
      if (typeof val === 'object' && val !== null) {
        // 如果当前属性或元素是一个对象或数组，则将其放入队列中
        const newVal = Array.isArray(val) ? [] : {}
        curRes[key] = newVal
        queue.push(val)
        resQueue.push(newVal)
      } else {
        // 如果是基本数据类型则直接进行复制
        curRes[key] = val
      }
    }
  }

  return result
}
```

## 194 JavaScript 异步解决方案的发展历程主要有哪些阶段？

* created_at: 2023-03-26T10:24:28Z
* updated_at: 2023-03-26T10:24:29Z
* labels: JavaScript
* milestone: 高

JavaScript异步解决方案的发展历程主要有以下几个阶段：

1. 回调函数

最初，JavaScript采用回调函数的方式来解决异步编程问题。回调函数即在异步任务完成后调用的回调函数。例如，`setTimeout`函数就是一个使用回调函数的例子。

```javascript
setTimeout(() => {
  console.log('Hello, world!')
}, 1000)
```

回调函数的优点是简单易懂，缺点是嵌套层次多、代码难以维护。

2. jQuery.Deferred()

jQuery.Deferred()是jQuery提供的一种异步编程解决方案。它是一种Promise风格的API，使得异步操作可以更加简单和可读性更高。

jQuery.Deferred()可以用于串行和并行异步操作的组织和控制，避免了回调地狱和代码复杂性。

在使用过程中，通过使用jQuery.Deferred()的resolve()和reject()方法来决定异步操作的成功或失败，并且可以使用then()方法添加成功和失败的回调函数。

jQuery.Deferred()主要的优点包括：

* 简单易用：可以通过链式操作来组织和控制异步操作。
* 可读性高：可以使用then()方法添加成功和失败的回调函数，使代码的意图更加明确。
* 良好的兼容性：jQuery.Deferred()已经成为了jQuery的一部分，可以与其他jQuery的功能和插件良好地协作。

而缺点则包括：

* jQuery.Deferred()不能被取消，且对于异步操作的结果状态只能被设置一次。
* 依赖于jQuery库：因为jQuery.Deferred()是jQuery的一部分，所以需要依赖于jQuery库，不适合非jQuery项目。

3. Promise

Promise是ES6引入的一种异步编程解决方案，用于解决回调函数的嵌套问题。Promise是一个对象，表示异步操作的最终完成或失败。它有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise的优点是解决了回调函数嵌套的问题，使得代码可读性和可维护性更好。缺点是语法相对复杂。

```javascript
// Promise示例
function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

fetchData().then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

4. Generator

Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。

5. Async/Await

ES8引入了Async/Await语法，使得异步编程更加简单和可读。Async/Await是基于Promise实现的，可以看作是对Promise的一种封装。Async/Await语法可以让异步代码像同步代码一样书写，让代码的可读性更高。

```javascript
// Async/Await示例
async function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

async function run () {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

run()
```

Async/Await 的优点是语法简单易懂、可读性好，缺点是需要掌握Promise的基本用法。

综上，JavaScript 异步编程方案的发展历程从最初的回调函数到Promise再到Async/Await，每个阶段都解决了前一阶段存在的问题，使得异步编程更加方便和易读。但是，不同方案都有自己的优缺点，需要根据实际情况选择使用。

## 195 Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

* created_at: 2023-03-26T10:26:27Z
* updated_at: 2023-03-26T10:26:28Z
* labels: JavaScript
* milestone: 中

Promise 构造函数是同步执行的，而 then 方法是异步执行的。

在 Promise 构造函数中，Promise 的状态（pending/resolved/rejected）是同步确定的。但是 Promise 中的异步操作可能还没有完成，因此 Promise 对象本身的值可能还没有可用的值。所以，当我们在构造函数中使用 resolve/reject 时，它们并不会立即触发 then 中注册的回调函数执行。

而 then 方法则是异步执行的。当我们在一个 Promise 对象上调用 then 方法并注册了回调函数时，这些回调函数并不会立即执行。相反，它们会被添加到一个任务队列中，等到当前 JavaScript 上下文中的所有同步代码执行完成后再执行。

这也是 Promise 非常重要的特性之一，即能够在异步任务完成后执行回调函数，避免了回调地狱等问题。

## 196 如何从 http1.1 迁移到 http2 ?

* created_at: 2023-03-26T10:37:43Z
* updated_at: 2023-03-26T10:37:43Z
* labels: JavaScript
* milestone: 高

从 HTTP 1.1 迁移到 HTTP/2 通常需要进行以下步骤：

1. 升级服务器：首先，你需要将你的服务器升级到支持 HTTP/2。大多数主流服务器，如Apache、Nginx等，都已经支持 HTTP/2。

2. 使用 HTTPS：HTTP/2 只支持加密连接，因此需要使用 HTTPS。所以，你需要获得一个 SSL 证书，并使用 HTTPS 连接来替代原来的 HTTP 连接。

3. 修改网页代码：为了利用 HTTP/2 的多路复用特性，你需要将网页中的多个小文件（例如 CSS、JavaScript、图像等）合并为一个文件，以减少请求的数量。此外，你还需要避免在一个请求中同时传输大量数据，以免阻塞其他请求的传输。

4. 配置服务器：为了使 HTTP/2 能够充分发挥性能，你需要进行一些服务器配置，例如启用 HTTP/2、调整 TLS 版本和密码套件等。

需要注意的是，HTTP/2 是一个复杂的协议，迁移过程中需要仔细审查每一个步骤，并且对性能进行监测和测试，以确保迁移后的网站性能更好。

## 197 A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态？(了解即可)

* created_at: 2023-03-26T10:46:47Z
* updated_at: 2023-03-26T10:46:48Z
* labels: 网络, 网易
* milestone: 高

当 B 机器重启时，TCP 连接会被断开，此时 A 机器会检测到 TCP 连接异常断开，将 TCP 状态修改为 FIN\_WAIT\_1 状态。A 机器会继续等待来自 B 机器的响应，如果等待的时间超过了一定时间（通常为几分钟），A 机器会放弃等待并关闭 TCP 连接，将 TCP 状态修改为 CLOSED 状态。

## 198 介绍下观察者模式和订阅-发布模式的区别？

* created_at: 2023-03-26T10:53:14Z
* updated_at: 2023-03-26T10:53:15Z
* labels: JavaScript, 网易, 阿里巴巴
* milestone: 高

观察者模式和订阅-发布模式都属于事件模型，它们都是为了解耦合而存在，但是它们之间还是有一些不同之处的：

1. 观察者模式中，主题（被观察者）和观察者之间是直接联系的，观察者订阅主题，主题状态发生变化时会直接通知观察者；而订阅-发布模式中，发布者和订阅者之间没有直接的联系，发布者发布消息到消息中心，订阅者从消息中心订阅消息。

2. 在观察者模式中，主题和观察者是一对多的关系，一个主题可以有多个观察者，而在订阅-发布模式中，发布者和订阅者是多对多的关系，一个发布者可以有多个订阅者，一个订阅者也可以订阅多个发布者。

3. 在观察者模式中，主题状态发生变化时，观察者会被直接通知，通知的方式可以是同步或异步的，观察者可以决定如何处理通知；而在订阅-发布模式中，消息是通过消息中心进行传递的，订阅者从消息中心订阅消息，发布者发布消息到消息中心，消息中心再将消息发送给订阅者，这个过程是异步的，订阅者不能决定何时接收消息。

4. 在观察者模式中，主题和观察者之间存在强耦合关系，如果一个观察者被移除，主题需要知道这个观察者的身份；而在订阅-发布模式中，发布者和订阅者之间没有强耦合关系，发布者不需要知道订阅者的身份，订阅者也不需要知道发布者的身份。

综上所述，观察者模式和订阅-发布模式都是事件模型，但它们之间的区别在于关注点的不同，观察者模式更关注主题和观察者之间的交互，而订阅-发布模式更关注发布者和订阅者之间的交互。

## 199 手写 观察者模式

* created_at: 2023-03-26T10:55:18Z
* updated_at: 2023-10-13T04:26:57Z
* labels: JavaScript, 网易, 阿里巴巴, 代码实现/算法
* milestone: 中

观察者模式（又称发布-订阅模式）是一种行为型设计模式，它定义了对象之间的一对多依赖关系，使得当一个对象的状态发生改变时，其相关的依赖对象都能够得到通知并被自动更新。

在 JavaScript 中实现观察者模式，可以分为以下几个步骤：

1. 创建一个主题对象（Subject），用来存储观察者对象，并提供添加、删除、通知观察者的接口。

2. 创建观察者对象（Observer），它有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。

下面是一个简单的示例：

```javascript
class Subject {
  constructor () {
    this.observers = []
  }

  // 添加观察者
  addObserver (observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  removeObserver (observer) {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  // 通知观察者
  notifyObservers () {
    this.observers.forEach(observer => observer.update())
  }
}

class Observer {
  constructor (name) {
    this.name = name
  }

  update () {
    console.log(`${this.name} received the notification.`)
  }
}

const subject = new Subject()
const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notifyObservers()
// Output:
// Observer 1 received the notification.
// Observer 2 received the notification.
```

在这个示例中，Subject 是主题对象，Observer 是观察者对象。Subject 提供了添加、删除、通知观察者的接口，Observer 有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。在使用时，我们可以通过调用 Subject 的 addObserver 方法，将 Observer 对象添加到主题对象中。当主题对象的状态发生改变时，我们可以调用 notifyObservers 方法，通知所有的观察者对象进行更新。

以上仅是一个简单的示例，实际应用中还需要考虑更多的细节问题。

## 200 手写订阅-发布模式

* created_at: 2023-03-26T10:56:48Z
* updated_at: 2023-09-25T11:48:11Z
* labels: JavaScript, 网易, 阿里巴巴, 代码实现/算法
* milestone: 高

订阅-发布模式是一种常用的设计模式，它可以实现对象间的解耦，让它们不需要相互知道对方的存在，只需要关注自己需要订阅的事件即可。当一个对象的状态发生变化时，它可以发布一个事件通知其他对象，其他对象可以订阅该事件，当事件发生时得到通知并执行相应的处理。

在 JavaScript 中，订阅-发布模式也被称为事件模型。事件模型由两个主要组件组成：事件触发器和事件监听器。事件触发器负责触发事件，而事件监听器则负责监听事件并执行相应的回调函数。

下面是一个简单的实现订阅-发布模式的例子：

```javascript
class EventEmitter {
  constructor () {
    this._events = {}
  }

  on (event, listener) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(listener)
  }

  emit (event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((listener) => listener(...args))
    }
  }

  off (event, listener) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter((l) => l !== listener)
    }
  }
}
```

这个实现包括三个方法：

* `on(event, listener)`：订阅事件，当事件被触发时执行监听器 `listener`；
* `emit(event, ...args)`：触发事件，并将参数 `...args` 传递给监听器；
* `off(event, listener)`：取消订阅事件，不再执行监听器 `listener`。

使用方法如下：

```javascript
const emitter = new EventEmitter()

// 订阅事件
emitter.on('event', (arg1, arg2) => {
  console.log(`event: ${arg1}, ${arg2}`)
})

// 触发事件
emitter.emit('event', 'hello', 'world')

// 取消订阅事件
emitter.off('event')
```

以上代码将输出：

```csharp
csharpCopy codeevent: hello, world
```

订阅-发布模式在事件驱动的系统中非常常见，例如浏览器中的 DOM 事件、Node.js 中的异步 IO 事件等。

## 201 Redux 和 Vuex 的设计思想是什么？

* created_at: 2023-03-26T14:01:52Z
* updated_at: 2023-03-26T14:01:53Z
* labels: JavaScript, 字节跳动
* milestone: 高

Redux和Vuex都是用于在前端应用中管理状态的JavaScript库。它们的设计思想都基于Flux架构，强调单向数据流的概念，以避免数据的混乱和不可预测的状态变化。

Redux的设计思想可以总结为三个原则：

1. 单一数据源：Redux中所有的状态数据都保存在单一的store对象中，便于管理和维护。

2. 状态只读：Redux的状态数据是只读的，唯一的改变方式是通过dispatch一个action来触发reducer函数对状态进行更新。

3. 纯函数更新状态：Redux的reducer函数必须是纯函数，即接收一个旧的状态和一个action对象，返回一个新的状态。通过这种方式，Redux保证了状态的可控和可预测性。

Vuex的设计思想类似于Redux，但又有所不同：

1. 单一数据源：Vuex也采用了单一数据源的思想，将所有状态保存在store对象中。

2. 显示状态修改：和Redux不同的是，Vuex允许组件直接修改状态，但这必须是通过commit一个mutation来实现的，mutation也必须是同步的。

3. 模块化：Vuex提供了模块化机制，可以将store对象分解成多个模块，以提高可维护性和代码复用性。

Redux和Vuex都是通过一些基本概念来实现状态管理：

1. Store：保存状态的对象，整个应用只有一个Store。

2. Action：描述状态变化的对象，由View层发起。

3. Reducer：一个纯函数，接收旧的状态和一个Action对象，返回新的状态。

4. Dispatch：一个函数，用来触发Action。

5. Mutation：类似于Redux的Reducer，但必须是同步的。用来更新状态。

总之，Redux和Vuex都是优秀的状态管理库，通过它们可以有效地管理前端应用的状态，实现数据的单向流动和可预测性。同时，Redux和Vuex都遵循了Flux架构的设计思想，使得状态管理更加规范化和可控。

## 202 浏览器 和 Node 事件循环有区别吗？

* created_at: 2023-03-26T14:04:29Z
* updated_at: 2023-05-15T15:01:54Z
* labels: JavaScript, 字节跳动
* milestone: 中

浏览器和Node.js事件循环在本质上是相同的，它们都是基于事件循环模型实现异步操作。但是它们的实现细节和环境限制有所不同。

在浏览器中，事件循环模型基于浏览器提供的`EventTarget`接口，包括浏览器环境下的DOM、XMLHttpRequest、WebSocket、Web Worker等等，所有的异步任务都会被推入任务队列，等待事件循环系统去处理。

而在Node.js中，事件循环模型则基于Node提供的`EventEmitter`接口，所有的异步任务都会被推入libuv的事件队列中，等待事件循环系统去处理。同时，Node.js还有一个特点是支持I/O操作，也就是在I/O完成之前，会把任务挂起，不会把任务加入到事件队列中，以避免事件队列阻塞。

另外，浏览器中的事件循环系统是单线程的，即所有的任务都在同一个线程中运行，因此需要注意不能有耗时的操作。而Node.js则是多线程的，它可以利用异步I/O等机制来充分利用多核CPU的能力，提高并发处理能力。

---------------

> 2023.05.15 补充

Node.js 和浏览器的 Event Loop 的差异主要体现在以下几个方面：

1.实现方法不同：Node.js 的 Event Loop 实现与浏览器中的不同。Node.js 使用了 libuv 库来实现 Event Loop，而浏览器中通常使用的是浏览器引擎自带的 Event Loop。

2.触发时机不同：Node.js 和浏览器中的 Event Loop 的触发时机也有所不同。浏览器的 Event Loop 在主线程上执行，当主线程空闲时会执行 Event Loop，而 Node.js 的 Event Loop 是在一个单独的线程中运行，与主线程分离。

3.内置的 API 不同：Node.js 的事件机制包含一些在浏览器中没有的 API，比如 fs、http、net 等模块，这些内置的 API 让 Node.js 的 Event Loop 更加强大。

4.在浏览器中，有一些 Web API 是异步的，比如 setTimeout、setInterval、XMLHTTPRequest 等，这些 Web API 在事件队列中注册了一个回调函数，然后在一定时间后由 Event Loop 触发执行。而在 Node.js 中，它们同样存在，但是它们不是 Web API 的一部分。Node.js 通过 Timers、I/O Callbacks、Immediate 和 Close Callbacks 等回调机制来执行类似的任务，这些回调函数同样会被注册到事件队列中等待执行。

总之，Node.js 和浏览器中的 Event Loop 主要差异在于实现方法、触发时机和内置 API 等方面。但无论在哪种环境中，Event Loop 都是 JavaScript 异步编程的基础。

## 203 前端模块化发展历程？

* created_at: 2023-03-26T14:06:45Z
* updated_at: 2023-08-20T14:51:20Z
* labels: 工程化, 腾讯
* milestone: 高

前端模块化是指在前端开发中，通过模块化的方式组织代码，将代码按照一定规则分割成不同的模块，便于管理和维护。

前端模块化的发展历程如下：

1. 早期，前端开发采用的是全局变量的方式进行开发，即将所有代码都放在一个文件中，通过全局变量进行交互。这种方式的问题在于，代码量较大，代码耦合度高，不易维护。

2. 后来，前端开发采用了命名空间的方式进行组织代码，即将代码放在一个命名空间下，通过命名空间进行交互。这种方式解决了全局变量带来的问题，但是在开发大型应用时，仍然存在代码耦合度高、依赖管理不便等问题。

3. 2009年，CommonJS提出了一种新的模块化规范，即将每个模块封装在一个独立的文件中，通过require和exports进行模块之间的依赖管理和导出。这种方式解决了前两种方式带来的问题，但是由于该规范是同步加载模块，不适用于浏览器环境。

4. 2011年，AMD规范提出，即异步模块定义规范，采用异步的方式加载模块，可以在浏览器环境下使用。该规范主要是通过require和define方法进行模块之间的依赖管理和导出。

5. 2013年，CommonJS和AMD的创始人合并了两种规范，提出了新的规范——CommonJS 2.0规范。该规范在CommonJS 1.0的基础上，增加了异步加载的功能，使其可以在浏览器环境下使用。

6. 2014年，ES6（即ECMAScript 2015）正式发布，引入了模块化的支持，即通过import和export语句进行模块之间的依赖管理和导出。ES6的模块化规范具有更好的可读性、可维护性和性能优势，已成为前端开发的主流方式。

7. 同时，还有一些第三方库，如RequireJS、SeaJS等，提供了更加灵活和可扩展的模块化方式，使得前端开发的模块化更加便捷和高效。

-----------------------

 1 函数作为块

最开始的时候，是以函数为块来编程，因为函数有自己的作用域，相对比较独立

```js
function add(a,b){...}
function add1(a,b,c){...}
```

这种形式中，add和add1都是定义在全局作用域中的，会造成很多问题：

1. 污染全局作用域，容易造成命名冲突
2. 定义在全局作用域，数据不安全

 2 namespace模式

使用对象作为独立块编程

```js
var myModule={
 a:1,
 b:2,
 add:function(m,n){...}
}
```

优点：减少了全局变量，有效解决了命名冲突

缺点：

1. 没有私有变量，使用起来很繁琐
2. 数据不安全，模块外面可以随意修改内部的数据

 3 IIFE模式

**使用立即执行函数来创建块，可以形成独立的作用域，外面无法访问，借助window对象来向外暴露接口**

```js
(function($){
 var a=1;
 var b=2;
 function add(m,n){
 ...
 }
 $('#id').addClass('.hehe');
 window.myModule={
 a:a,
 b:b,
 add:add
 }
})()
```

优点：

1. 减少了全局变量，解决了命名冲突
2. 创建了独立的作用域，外部无法轻易修改内部数据

缺点：

**如果多个模块分布在多个js文件中，那么在html文件中就需要引入多个js文件**

1. 会增加多个http请求，增加首屏的时候，降低用户体验
2. **模块之间的引用关系很不明显，难以维护**

 4 CommonJS

最开始出现的模块化方案是在node.js中实现的。node中的模块化方案是根据CommonJS规范实现的。

**CommonJS规定每个文件就是一个模块，以同步的方式引入其他模块**

```js
//a.js
function add(m,n){
 return m+n;
}
module.exports={add:add}


//b.js
const {add} = require('./a.js');
console.log(add(1,2)); // 3
```

这种方式是node端独有的，浏览器端如果想要使用，需要使用 **Browserify** 工具来解析。

 5 AMD和Require.js

CommonJS模块之前是同步引入的，这在服务端是没有什么问题的，因为**文件都是保存在硬盘中，读取文件的速度是非常快的，同步加载带来的阻塞基本可以忽略不计。**

但是如果在浏览器中使用CommonJS的话，因为**js文件是存在服务端需要请求获取，所以同步的方式加载会极大的阻塞页面**，显然是不可取的。

于是诞生了AMD（Asynchronous Module Definition）规范，**一种异步加载的模块方案，使用回调函数来实现**。require.js实现了AMD的规范。

```js
// 定义没有依赖的模块
// a.js
define(function () {
  function add (m, n) {
    return m + n
  }
  return { add }
})

// 定义有依赖的模块
// b.js
define(['a'], function (a) {
  const sum = a.add(1, 2)
  return { sum }
})

// 引用模块
require(['b'], function (b) {
  console.log(b.sum) // 3
})
```

由上面代码分析Require.js的特点

1. 依赖模块的代码都是放在回调函数中，等待模块都加载完成才执行这个回调函数，执行顺序可以保证
2. **内部加载其他模块的时候，使用的是动态添加script标签的方式来实现动态加载**
3. 内部需要缓存模块暴露出来的接口，避免多次执行

**AMD推崇的是依赖前置，提前执行。**

从上面代码可以看出，**在声明一个模块的时候，会在第一时间就将其依赖模块的内部代码执行完毕。而不是在真正使用的地方再去执行。**因此会带来一些资源浪费

```js
define(['a', 'b'], function (a, b) {
  let sum = a.add(1, 2)
  if (false) {
    sum = b.add(1, 2) // b模块是没有被使用的，应该是不需要执行模块内部代码的
  }
  return sum
})
```

 6 CMD和Sea.js

由于require.js自身的一些问题存在，所以后来在国内（玉伯）诞生了CMD（Common Module Definition）和Sea.js。

CMD结合了CommonJS和AMD的特点，也是一种**异步**模块的方案，**提倡就近依赖，延迟执行。**

**需要用到某个模块的时候，才用require引入，模块内部的代码也是在被引入的时候才会执行，声明的时候并没有执行。**

语法设计上比较像CommonJS

```js
// 定义模块 math.js
define(function (require, exports, module) {
  const a = require('./a.js') // 引入模块
  function add (m, n) {
    return m + n
  }
  module.exports = {
    add
  }
})

// 加载模块
seajs.use(['math.js'], function (math) {
  const sum = math.add(1, 2)
})
```

看上面的代码可能会有疑问，模块是异步加载的，但是使用的时候require是同步使用的，没有回调函数，如何能够保证执行的顺序呢？这就不得不提sea.js中的静态依赖分析机制了。

 6.1 Sea.js中的静态依赖分析机制

Sea.js中**模块加载的入口方法是use()方法，执行这个方法会开始加载所有的依赖模块**。然后sea.js中是就近依赖的，它是如何获取依赖模块的呢？

**在define的方法中，如果传入的参数factory是一个函数，内部会执行函数的toString方法，转化成字符串，然后通过正则表达式分析字符串，获取require方法中的参数，通过路径分析去加载依赖的模块**。以此链式分析下去，边分析边加载模块，等待所有的依赖都加载完成之后，才开始调用use的回调函数，正式执行模块内代码。

所以在require方法执行之前，对应的模块已经加载完成了，所以可以直接传入参数，执行模块函数体。

 6.2 Sea.js的特点

1. **就近依赖，延时执行**
2. 内部拥有静态依赖分析机制，保证require之前，模块已经加载完毕，但是函数还没有执行
3. 也是一种异步的模块化方案
4. 内部也有缓存机制，缓存模块暴露的接口
5. 内部加载模块的时候，和require.js一样，也是通过**动态增加script标签**来完成的

 7 ES Module

ES6开始，在语法标准上实现了模块化功能。简称ES Module

**ES Module是一种静态依赖的模块化方案，模块与模块之间的依赖关系是在编译期完成连接的。**

**前面所说的三种方案都是动态模块化方案，依赖模块都是动态引入的，而且模块都是一个对象。而ES Module中，模块不是一个对象，模块与模块之间也不是动态引入的，而且编译期间静态引入的，所以无法实现条件加载**

```js
//a.js
function add(m,n){
 return m+n;
}
export {add};

// b.js
import {add} from './a.js';
console.log(add(1,2)); //3
```

## 204 AMD 和 CMD 模块化有和区别？

* created_at: 2023-03-26T14:08:39Z
* updated_at: 2023-03-26T14:11:05Z
* labels: 工程化, 腾讯
* milestone: 高

AMD（Asynchronous Module Definition）和CMD（Common Module Definition）都是JavaScript模块化方案。它们的主要区别在于对依赖的处理方式上不同。

AMD是在require.js推广过程中诞生的，它的特点是提前执行，强调依赖前置。也就是说，在定义模块时就需要声明其所有依赖的模块。它的语法如下：

```javascript
define(['dependency1', 'dependency2'], function (dependency1, dependency2) {
  // 模块的定义
})
```

CMD是在Sea.js推广过程中诞生的，它和AMD非常相似，但是更加懒惰，是依赖就近，延迟执行。也就是说，在模块中需要用到依赖时，才去引入依赖。它的语法如下：

```javascript
define(function (require, exports, module) {
  const dependency1 = require('dependency1')
  const dependency2 = require('dependency2')
  // 模块的定义
})
```

简单来说，AMD是提前执行、依赖前置，CMD是延迟执行、依赖就近。两种模块化方案各有优缺点，选择哪种模块化方案需要根据实际情况和个人偏好进行考虑。

## 205 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

* created_at: 2023-03-26T14:10:46Z
* updated_at: 2023-03-26T14:11:39Z
* labels: JavaScript, 百度
* milestone: 初

用 `const` 或 `let` 声明的变量不会挂在在 `window` 对象上，而是在一个称为块级作用域（block scope）的作用域内。这个作用域可以是一个函数、一个代码块（比如 `{}` 之间的语句），或者全局作用域。

在块级作用域中声明的变量无法通过 `window` 对象访问，只能在当前作用域内访问。如果要在全局作用域中访问这个变量，需要显式地将它添加到 `window` 对象上。

以下是一个例子：

```javascript
{
  const foo = 'bar'
  const baz = 'qux'
  const quux = 'corge'
}

console.log(window.foo) // undefined
console.log(window.baz) // undefined
console.log(window.quux) // 'corge'
```

在上面的例子中，`foo` 和 `baz` 声明在一个代码块内，因此它们不会挂在在 `window` 对象上。而 `quux` 声明使用了 `var`，因此它会被挂在在 `window` 对象上。

如果我们希望在全局作用域中访问 `foo` 和 `baz`，可以将它们手动添加到 `window` 对象上：

```javascript
{
  const foo = 'bar'
  const baz = 'qux'
  const quux = 'corge'

  window.foo = foo
  window.baz = baz
}

console.log(window.foo) // 'bar'
console.log(window.baz) // 'qux'
console.log(window.quux) // 'corge'
```

但是，在实际编程中，最好尽量避免将变量挂在在 `window` 对象上，以避免命名冲突和污染全局命名空间。

## 206 浏览器缓存中 Memory Cache 和 Disk Cache， 有啥区别？

* created_at: 2023-03-26T14:24:33Z
* updated_at: 2023-04-12T13:47:16Z
* labels: 网络, 字节跳动
* milestone: 高

 Memory Cache 和 Disk Cache 的区别

在浏览器缓存中，Memory Cache 和 Disk Cache 是两种不同的缓存类型，它们有以下区别：

1. 存储位置：Memory Cache 存储在内存中，而 Disk Cache 存储在硬盘中。
2. 读取速度：Memory Cache 读取速度比 Disk Cache 快，因为内存访问速度比硬盘访问速度快。
3. 存储容量：Memory Cache 存储容量比较小，一般只有几十兆，而 Disk Cache 存储容量比较大，可以有数百兆或者更多。
4. 生命周期：Memory Cache 生命周期短暂，一般只在当前会话中有效，当会话结束或者浏览器关闭时，Memory Cache 就会被清空；而 Disk Cache 生命周期比较长，数据可以被保存很长时间，即使浏览器关闭了，下次打开还可以使用。

一般来说，浏览器在请求资源时，会优先从 Memory Cache 中读取，如果没有找到再去 Disk Cache 中查找。如果两种缓存中都没有找到，则会向服务器发送请求。如果需要强制刷新缓存，可以通过清空浏览器缓存来实现。

 什么情况下资源会缓存在 Memory Cache， 什么情况下会缓存在 Disk Cache ?

浏览器中的缓存是为了提高网页访问速度和减少网络流量而存在的。缓存分为 Memory Cache 和 Disk Cache 两种。

Memory Cache 是浏览器内存缓存，资源会被缓存在内存中，由于内存读取速度快，所以 Memory Cache 的读取速度也较快。资源被缓存在 Memory Cache 中的情况有：

1. 当前页面中通过 `<link>` 或者 `<script>` 标签引入的资源；
2. 当前页面通过 XMLHttpRequest 或 Fetch API 请求获取到的资源。

Disk Cache 是浏览器磁盘缓存，资源会被缓存在磁盘中。由于磁盘读取速度相对内存较慢，所以 Disk Cache 的读取速度也较慢。资源被缓存在 Disk Cache 中的情况有：

1. 当前页面中通过 `<img>` 标签引入的资源；
2. 当前页面中通过 `<audio>` 或 `<video>` 标签引入的资源；
3. 当前页面中通过 `iframe` 加载的资源；
4. 当前页面中通过 `WebSocket` 加载的资源；
5. 通过 `Service Worker` 缓存的资源。

一般来说，比较大的资源会被缓存到 Disk Cache 中，而较小的资源则会被缓存到 Memory Cache 中。如果需要手动清除缓存，可以在浏览器设置中找到相应选项进行操作。

## 207 使用 虚拟DOM 一定会比直接操作 真实 DOM 快吗？

* created_at: 2023-03-27T14:59:24Z
* updated_at: 2023-03-27T14:59:28Z
* labels: 工程化, 百度
* milestone: 高

大家惯有的思维模式下，我们普遍的认为，虚拟DOM一定会比原生DOM要快的多。

但实际上并不是这样。

**仅从React的角度来说 : React的官网可从来都没有说过虚拟DOM会比原生操作DOM更快。**

虚拟DOM和原生操作DOM谁更快这个问题。如果要我来回答的话，**一定是原生DOM比虚拟DOM更快性能更好。**

值得注意的是，**虚拟DOM并不是比原生DOM快，更确切的来说，虚拟DOM是比操作不当的原生DOM快**。实际上，如果对原生DOM的操作得当的话，原生DOM的性能一定优于虚拟DOM。

我们来剖析一下。

 虚拟DOM为什么而存在

**其最核心的思想是提升开发效率而非提升性能**

使用 React/Vue 这些框架的时候，我们不需要去考虑对DOM的操作，只需要关心数据的改变。我们以前还在使用JQ的时候，数据改变之后我们需要调用`$("#id").append(node)`等操作去手动追加DOM。而在使用React/Vue之后，我们只需要关心数据的改变。至于对DOM的一系列动作，在我们的数据改变之后，React/Vue会为我们代劳。这极大程度的提升了我们的开发效率。也是React/Vue的核心思想和初衷。

至于很多人都说，虚拟DOM会比操作原生DOM更快，这个说法并不全面。比如，**首次渲染或者所有节点都需要进行更新的时候。这个时候采用虚拟DOM会比直接操作原生DOM多一重构建虚拟DOM树的操作。这会更大的占用内存和延长渲染时间。**

 举个例子

**首次渲染👇不采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建所有节点

**首次渲染👇采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建虚拟DOM
3. 创建所有节点

不难发现，在首次渲染的时候，采用虚拟DOM会比不采用虚拟DOM要多一个**创建虚拟DOM**的步骤。

> 注意:虚拟DOM的存在，并不是免费的，比对新旧虚拟DOM树的差异会带来一定的性能开销。

**虚拟DOM的优势在于我们更新节点时候。它会检查哪些节点需要更新。尽量复用已有DOM，减少DOM的删除和重新创建。并且这些操作我们是可以通过自己手动操作javascript底层api实现的。只是我们手动操作会非常耗费我们的时间和精力。这个工作由虚拟DOM代劳，会让我们开发更快速便捷。**

 举个例子👇

在采用虚拟DOM的前提下

假设我们有节点A，下辖两个子节点B/C.

然后我们删除了节点C

这个时候会有两棵虚拟DOM树，

一颗是修改前的，A->B/C。

另一颗是修改后的A->B。

`diff算法会去比对两颗树的差异`，然后发现A->B没有更改，那么A->B节点保留，C节点执行删除动作。

那么，A->B两个节点的删除和创建渲染操作就被省略了。

如果不采用虚拟DOM的话。使用JQ那时候的模板.

我们可能会把A->B/C三个节点全部删除.

再全都重新创建。而A->B是完全没有改动的。

他们的删除和创建则完全不必要。

 框架的意义

我们需要知道:不论是React还是Vue或者是Angular。这些框架本身，都是基于原生的基础上创造的。它们，底层依赖的还是javascript，并不是一门新的语言。在他们的底层逻辑下。我们使用框架所做出的一切行为，都会被框架转化为对原生DOM的操作。**框架，只是一个转化语法的工具。**

既然原生DOM可以创造出这些框架。当然我们使用原生DOM自然是可以写出比这些框架更好的性能。

但是:为什么对原生DOM进行操作的性能明明可以比使用框架更好。为什么大家都在使用框架，而没有人去直接对原生DOM进行操作。

这背后涉及`成本`和`普适性`。

如果我们直接去操作真实DOM,当然，我们可以做到在性能上比虚拟DOM更快。但问题是，技术水准能做到这个地步的人，又有多少人呢。不说比虚拟DOM快。即使是做到和虚拟DOM不分上下的性能，拥有这种水平的前端玩家，也是寥寥无几。**基于这样的客观情况下，框架的出现解决了这个问题。**

框架存在的意义 : 在为我们提供只需要关注数据的前提下。框架本身已经做好了底层原理上的性能优化（包括但不限于,对DOM的调用,算法上的优化）已经是高度封装。这样就可以让我们使用一些简单的较为容易理解的技术去做我们原本做不到的事情。 这其实就像调用网上的第三方包，某一个功能，自己写是写不出来，写出来性能也不会很好。但是同样的功能，我们去网上引入其他大神已经封装完成的第三方包。我们就会用，功能就可以实现并且性能上也过得去。

如果让大家直接对DOM进行操作完成比框架更优秀的性能。这绝不是大多数人可以做到的。让大多数可以接受，框架需要做的，就是让大多数人使用尽量使用简单的技术，完成相对困难的操作。这是`普适性`。

并且，如果完成同一个性能效果，需要我们去*精通原生javascript*和*学习框架上的一些简单的API和结构*。明显后者的学习成本更低。如果说使用框架我们所能完成的某一阶段的性能所需要的学习成本是2个月的话。 那么学习javascript完成同一阶段的性能可能需要一年。

框架的初衷就是让用户使用尽量简单的技术，完成相对复杂的工作并提升一定的性能 *（这其中包括但不限于:可维护性，可复用性，渲染效率等）* 。这样，即使我们的水平不是很高，使用框架以后。项目在性能上也能过得去。

总结

1. 虚拟DOM不一定会比操作原生DOM更快。
2. 虚拟DOM的优势在于节点进行改动的时候尽量减少开销
3. React从来没说过虚拟DOM会比原生更快。
4. 框架的本质是提升开发效率，让我们的注意力更集中于数据

## 208 使用迭代的方式实现 flatten 函数？

* created_at: 2023-03-27T15:03:15Z
* updated_at: 2023-03-27T15:03:48Z
* labels: JavaScript, 百度
* milestone: 中

可以使用迭代的方式实现 `flatten` 函数，具体思路如下：

1. 创建一个新数组 `result` 来存放结果。
2. 创建一个栈 `stack`，将原数组作为第一个元素压入栈中。
3. 当栈不为空时，取出栈顶元素，如果该元素是一个数组，则将其展开后的每个元素压入栈中。
4. 如果该元素不是一个数组，则将其加入到 `result` 中。
5. 重复步骤 3 和 4，直到栈为空。

下面是代码实现：

```javascript
function flatten (array) {
  const result = []
  const stack = [array]

  while (stack.length > 0) {
    const item = stack.pop()

    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i])
      }
    } else {
      result.push(item)
    }
  }

  return result.reverse()
}
```

这里使用了一个技巧，就是在将数组元素压入栈中时，从数组的末尾开始遍历，这样就可以保证压入栈中的顺序和展开后的顺序是一致的，最后再将结果翻转一下即可。

## 209 [Redux] 为什么 Redux 的 reducer 中不能做异步操作？

* created_at: 2023-03-27T15:06:54Z
* updated_at: 2023-03-27T15:06:55Z
* labels: web框架, 百度
* milestone: 高

Redux 的 reducer 是纯函数，它的作用是接收一个旧的状态和一个操作，返回一个新的状态，是一个纯粹的状态转换函数，因此在 reducer 中不能执行异步操作，否则会破坏 reducer 的纯函数特性。如果在 reducer 中执行异步操作，会导致 reducer 不可预测和不可重现，因为异步操作的结果是不确定的，而 reducer 必须保证在相同的输入条件下，产生相同的输出结果。同时，在 reducer 中执行异步操作可能会导致应用的状态不一致或者有延迟的问题。

为了解决这个问题，Redux 提供了中间件的机制，比如 `redux-thunk`、`redux-saga` 等，可以在中间件中进行异步操作，然后再将异步操作的结果传递给 reducer 进行状态更新。这样就可以避免在 reducer 中执行异步操作，保证 reducer 的纯函数特性，同时也可以完成异步操作的需求。

## 211 下面代码中 a 在什么情况下会打印 1 ?

* created_at: 2023-03-27T15:13:43Z
* updated_at: 2023-03-27T15:13:44Z
* labels: JavaScript, 京东
* milestone: 中

 问题

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
```

 回答

这是一个经典的面试题，可以通过重写 `valueOf` 或者 `toString` 方法来实现，在这些方法中动态返回变量 a 的值，以满足条件。例如：

```js
const a = {
  i: 1,
  toString: function () {
    return this.i++
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log(1)
}
```

在这个例子中，`a` 被定义为一个对象，有一个属性 `i` 初始化为 1，同时重写了 `toString` 方法，在每次调用时返回 `i` 的值，并且每次返回后将 `i` 自增。这样在比较 `a` 是否等于 1、2、3 的时候，会依次调用 `a.toString()` 方法，得到的结果就是满足条件的 1，依次打印出来。

## 212 [3, 15, 8, 29, 102, 22].sort(), 结果是多少， 为什么？

* created_at: 2023-03-27T15:26:57Z
* updated_at: 2023-03-27T15:26:59Z
* labels: JavaScript, 京东
* milestone: 中

输出结果为：

```js
[102, 15, 22, 29, 3, 8]
```

原因：
`Array.prototype.sort()`

如果没有指明 compareFn ，那么元素会按照转换为的字符串的诸个字符的 Unicode 位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFn），比较的数字会先被转换为字符串，所以在 Unicode 顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFn ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。 备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

参考文档：[资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 213 https 的证书验证过程是什么样的

* created_at: 2023-03-27T16:00:36Z
* updated_at: 2023-09-16T16:59:45Z
* labels: 网络
* milestone: 中

HTTPS的证书验证过程通常包括以下几个步骤：

1. 客户端向服务端发起HTTPS请求，服务端将其公钥证书发送给客户端。
2. 客户端接收到服务端的证书后，首先验证证书是否过期，如果过期，则证书无效，验证失败；如果证书未过期，则进行下一步。
3. 客户端使用CA证书（如系统内置的或者从服务端获取）对服务端证书进行验证，以确定该证书是否是由受信任的CA颁发的。如果验证失败，则证书无效，验证失败；如果验证成功，则进行下一步。
4. 客户端生成一个随机值，使用服务端公钥进行加密，并将加密后的随机值发送给服务端。
5. 服务端接收到客户端的随机值后，使用私钥进行解密，得到随机值。服务端再将随机值作为密钥，使用对称加密算法加密需要传输的数据，并发送给客户端。
6. 客户端接收到服务端发送的加密数据后，使用随机值进行解密，得到明文数据。

以上就是HTTPS证书验证的一般流程。客户端验证服务端证书的方式是通过验证证书的数字签名来确定证书的合法性，如果数字签名验证失败，则证书无效，验证失败。

## 214 this指向与对象继承数组方法：输出以下代码执行的结果并解释为什么？

* created_at: 2023-03-27T16:13:39Z
* updated_at: 2023-03-27T16:13:40Z
* labels: JavaScript, 京东
* milestone: 高

 代码如下

```js
const obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

执行结果如何， 为什么？

 执行结果

代码的执行结果是：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

在代码中，我们创建了一个名为 `obj` 的对象，它包含了一些属性和方法：

* `2` 和 `3` 是对象的属性名，对应的属性值分别为 `3` 和 `4`。
* `length` 属性的值为 `2`。
* `splice` 和 `push` 是对象的两个方法，它们均继承自 `Array.prototype`。

接下来，我们先调用了 `obj.push(1)` 方法，将值 `1` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 4, length: 3, splice: [Function: splice], push: [Function: push] }
```

接着，我们又调用了 `obj.push(2)` 方法，将值 `2` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

可以看出，`obj` 对象的属性值发生了变化。这是因为在调用 `obj.push(1)` 方法时，由于 `obj` 对象继承了 `Array.prototype.push` 方法，因此 `push` 方法中的 `this` 指向的是 `obj` 对象本身，因此将值 `1` 加入到了 `obj` 对象的第二个属性位置上（即 `obj[2] = 1`）。而在调用 `obj.push(2)` 方法时，`push` 方法同样将值 `2` 加入到了 `obj` 对象的第三个属性位置上（即 `obj[3] = 2`）。因此最终得到的 `obj` 对象的状态为 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。

 追问：上面的代码中 obj.push(1)， 为什么会加入到第二个属性位置上？

在 JavaScript 中，数组是一种特殊的对象，其属性名是非负整数，称之为索引(index)，因此可以通过数组语法来访问这些属性。另外，对于非数组对象，其属性名可以是任意字符串。

在给数组对象添加属性时，如果属性名是非负整数，那么会被当作数组元素，会自动维护 `length` 属性；如果属性名是其他字符串，那么则被当作普通的对象属性。

根据这个规则，上述代码中的 `obj` 对象添加了两个属性 `2: 3` 和 `3: 4`，它们的属性名都是非负整数，因此被当作数组元素，被计入了 `length` 属性。而在执行 `obj.push(1)` 时，会向数组中添加一个新的元素，该元素的下标是数组的 `length` 属性值，也就是 `2`，因此添加到了第二个属性位置上。接着执行 `obj.push(2)` 时，同样会向数组中添加一个新的元素，该元素的下标是 `3`，也就是数组的第三个属性位置上。

最终，输出结果为：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

其中，属性 `2` 和 `3` 被分别赋值为 `1` 和 `2`，而原来的值被覆盖了。因此，最终的结果是 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。

## 215 [Vue] 双向绑定和单向数据流原则是否冲突？

* created_at: 2023-03-28T14:39:19Z
* updated_at: 2023-03-28T14:43:42Z
* labels: web框架
* milestone: 中

Vue 的双向绑定和单向数据流原则不冲突，因为它们是针对不同的场景和目的而提出的。

Vue 的双向绑定是指，在模板中通过 `v-model` 指令可以实现表单元素和组件数据之间的双向绑定，当表单元素的值发生变化时，组件数据也会同步更新；反过来，当组件数据发生变化时，表单元素的值也会同步更新。这种双向绑定的机制可以减少手动编写事件监听器的工作量，提高代码的可读性和可维护性。

而单向数据流原则是指，在 Vue 应用中，数据的流动是单向的，即自上而下单向流动。父组件通过 props 把数据传递给子组件，子组件通过 $emit 事件把数据传递给父组件或者其他祖先组件。这种单向数据流的机制使得数据的变化更加可控和可预测，方便进行状态管理和调试。

双向绑定和单向数据流原则虽然在实现机制上有所不同，但它们都是为了解决不同的问题和提高代码的可维护性和可读性。在实际开发中，可以根据实际情况选择合适的机制来使用。

## 216 实现 (5).add(3).minus(2) 功能

* created_at: 2023-03-28T14:41:08Z
* updated_at: 2023-03-28T14:41:09Z
* labels: JavaScript, 百度
* milestone: 中

可以通过在 Number 原型上定义 add 和 minus 方法来实现该功能，代码如下：

```javascript
Number.prototype.add = function (num) {
  return this + num
}

Number.prototype.minus = function (num) {
  return this - num
}

console.log((5).add(3).minus(2)) // 输出6
```

上述代码中，通过在 Number.prototype 上定义 add 和 minus 方法，实现了将数字类型的值转换为 Number 对象，并且可以链式调用这两个方法。最终返回的结果是一个数值类型的值。

## 217 [Vue] 响应式原理中 Object.defineProperty 有什么缺陷

* created_at: 2023-03-28T14:43:24Z
* updated_at: 2024-04-13T14:00:17Z
* labels: web框架, 腾讯
* milestone: 中

Vue 2 中使用`Object.defineProperty`来实现其响应式系统存在一些限制和问题：

1. **深度检测**：
 Vue 2中对于对象的处理是递归的；对于每个属性，Vue会逐层使用`Object.defineProperty`将其转换成 getter/setter。这样，当你访问或修改嵌套较深的属性时（如`a.b.c`），Vue已经提前将`a`、`a.b`和`a.b.c`的属性转换为响应式，能够追踪它们的变化。

2. **数组限制**：
 `Object.defineProperty`无法检测到数组索引的变化，因此Vue重写了数组的变异方法（如`push`、`pop`、`splice`等）来实现对数组的响应式监听。

3. **对象属性添加或删除的限制**：
 因为`Object.defineProperty`只能在初始化的时候应用于属性，当你在一个已经创建的Vue实例上添加新属性时，这个新属性是非响应式的。如果你想要它是响应式的，需要使用`Vue.set()`或`this.$set()`方法添加新属性。

4. **性能问题**：
 因为`Object.defineProperty`是递归地对对象的每一个属性进行处理，所以在处理具有大量属性或深层嵌套对象时，可能会有较大的性能开销。

关于处理`a.b.c`类型的属性，Vue 2内部会递归地遍历对象`a`的所有属性，为它们各自使用`Object.defineProperty`定义getter和setter。如果`b`是`a`的属性，那么同样会针对`b`做这样的处理，以及它的所有属性，包括`c`等。这样，在访问或修改`a.b.c`时，Vue可以追踪到这些变化并触发相关的更新。

```javascript
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 依赖收集等操作
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      val = newVal
      // 触发更新视图等操作
    }
  })

  // 如果val本身还是对象，则递归处理
  if (typeof val === 'object') {
    reactive(val)
  }
}

function reactive (obj) {
  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}
```

在上面的`reactive`函数中，我们将一个对象转换成响应式对象。这是Vue内部实现响应式的简化版原理。不过，Vue的响应式系统要复杂得多，它还涉及依赖收集和派发更新等机制。

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
