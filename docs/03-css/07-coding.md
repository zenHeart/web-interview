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

## CSS3实现卡片翻转?

## 常见布局实现

1. 三栏布局
2. 圣杯布局

## 参考资料

* [Front-end-Developer-Interview-Questions/css](https://h5bp.org/Front-end-Developer-Interview-Questions/questions/css-questions/) github 仓库前端面试题
* [front-end-interview-handbook/css](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md) 上面面试题的答案

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
