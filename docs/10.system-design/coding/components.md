# 组件库设计

## 虚拟列表 {#p0-virtual-list}

虚拟滚动（Virtual Scrolling）是一种性能优化的手段，通常用于处理长列表的显示问题。在传统的滚动加载中，当面对成千上万项的长列表时，直接在 DOM 中创建并展示所有项会导致严重的性能问题，因为浏览器需要渲染所有的列表项。而虚拟滚动的核心原理是仅渲染用户可视范围内的列表项，以此减少 DOM 操作的数量和提高性能。

实现虚拟滚动，我们需要：

1. 监听滚动事件，了解当前滚动位置。
2. 根据滚动位置计算当前应该渲染哪些列表项目（即在视口内的项目）。
3. 只渲染那些项目，并用占位符（比如一个空的 div）占据其它项目应有的位置，保持滚动条大小不变。
4. 当用户滚动时，重新计算并渲染新的项目。

 基础版本实现

以下是一个简单的虚拟滚动实现的 JavaScript 代码示例：

```js
class VirtualScroll {
  constructor (container, itemHeight, totalItems, renderCallback) {
    this.container = container // 容器元素
    this.itemHeight = itemHeight // 每个项的高度
    this.totalItems = totalItems // 总列表项数
    this.renderCallback = renderCallback // 渲染每一项的回调函数

    this.viewportHeight = container.clientHeight // 视口高度
    this.bufferSize = Math.ceil(this.viewportHeight / itemHeight) * 3 // 缓冲大小
    this.renderedItems = [] // 已渲染项的数组

    this.startIndex = 0 // 当前渲染的开始索引
    this.endIndex = this.bufferSize // 当前渲染的结束索引

    container.addEventListener('scroll', () => this.onScroll())
    this.update()
  }

  onScroll () {
    const scrollTop = this.container.scrollTop
    const newStartIndex = Math.floor(scrollTop / this.itemHeight) - this.bufferSize / 2
    const newEndIndex = newStartIndex + this.bufferSize

    if (newStartIndex !== this.startIndex || newEndIndex !== this.endIndex) {
      this.startIndex = Math.max(0, newStartIndex)
      this.endIndex = Math.min(this.totalItems, newEndIndex)
      this.update()
    }
  }

  update () {
    // 清空已有内容
    this.container.innerHTML = ''

    // 计算并设置容器的总高度
    const totalHeight = this.totalItemsthis.itemHeight
    this.container.style.height = `${totalHeight}px`

    // 渲染视口内的项
    const fragment = document.createDocumentFragment()
    for (let i = this.startIndex; i < this.endIndex; i++) {
      const item = this.renderCallback(i)
      item.style.top = `${ithis.itemHeight}px`
      fragment.appendChild(item)
    }
    this.container.appendChild(fragment)
  }
}

// 创建一个列表项的函数
function createItem (index) {
  const item = document.createElement('div')
  item.className = 'list-item'
  item.innerText = `Item ${index}`
  item.style.position = 'absolute'
  item.style.width = '100%'
  return item
}

// 初始化虚拟滚动
const container = document.querySelector('.scroll-container') // 容器元素需要预先在HTML中定义
const virtualScroll = new VirtualScroll(container, 30, 10000, createItem)
```

这个例子中，我们创建了一个`VirtualScroll`类，通过传入容器、项高度、总项数和渲染回调函数来进行初始化。该类的`update`方法用于渲染出当前可视范围内部分的项目，并将它们放到文档碎片中，然后一次性添加到容器中。这样可以避免多次直接操作 DOM，减少性能消耗。当滚动时，`onScroll`方法将计算新的`startIndex`和`endIndex`，然后调用`update`方法进行更新。请注意，实际应用可能需要根据具体情况调整缓冲区大小等参数。

 进阶版本：使用 IntersectionObserver 来实现

使用 `IntersectionObserver` 实现虚拟滚动就意味着我们会依赖于浏览器的 API 来观察哪些元素进入或离开视口（viewport），而非直接监听滚动事件。这样我们只需在需要时渲染或回收元素。

以下是一个简化版使用 `IntersectionObserver` 来实现虚拟滚动的例子：

```js
class VirtualScroll {
  constructor (container, itemHeight, totalItems, renderItem) {
    this.container = container
    this.itemHeight = itemHeight
    this.totalItems = totalItems
    this.renderItem = renderItem

    this.observer = new IntersectionObserver(this.onIntersection.bind(this), {
      root: this.container,
      threshold: 1.0
    })

    this.items = new Map()

    this.init()
  }

  init () {
    // 填充初始屏幕的元素
    for (let i = 0; i < this.totalItems; i++) {
      const placeholder = this.createPlaceholder(i)
      this.container.appendChild(placeholder)
      this.observer.observe(placeholder)
    }
  }

  createPlaceholder (index) {
    const placeholder = document.createElement('div')
    placeholder.style.height = `${this.itemHeight}px`
    placeholder.style.width = '100%'
    placeholder.dataset.index = index // store index
    return placeholder
  }

  onIntersection (entries) {
    entries.forEach((entry) => {
      const index = entry.target.dataset.index
      if (entry.isIntersecting) {
        const rendered = this.renderItem(index)
        this.container.replaceChild(rendered, entry.target)
        this.items.set(index, rendered)
      } else if (this.items.has(index)) {
        const placeholder = this.createPlaceholder(index)
        this.container.replaceChild(placeholder, this.items.get(index))
        this.observer.observe(placeholder)
        this.items.delete(index)
      }
    })
  }
}

// Render item function
function renderItem (index) {
  const item = document.createElement('div')
  item.classList.add('item')
  item.textContent = `Item ${index}`
  item.dataset.index = index
  item.style.height = '30px' // Same as your itemHeight in VirtualScroll
  return item
}

// Example usage:
const container = document.getElementById('scroll-container') // This should be a predefined element in your HTML
const itemHeight = 30 // Height of each item
const itemCount = 1000 // Total number of items you have

const virtualScroll = new VirtualScroll(container, itemHeight, itemCount, renderItem)
```

在这里我们创建了一个 `VirtualScroll` 类，构造函数接收容器元素、每个项的高度、总项目数和用于渲染每个项目的函数。我们在初始化方法中，为每个项目创建了一个占位符元素，并且向 `IntersectionObserver` 注册了这些占位元素。

当一个占位元素进入到视口中时，我们就会渲染对应的项，并且将它替换这个占位符。当一个项离开视口，我们又会将它替换回原来的占位符并取消它的注册。

这种方法的优势包括：

* 不需要绑定滚动事件，防止滚动性能问题。
* 浏览器会自动优化观察者的回调。
* 不需要手动计算当前应该渲染的项目，当用户快速滚动时也不会遇到空白内容。

## 实现一个拖曳列表组件 {#p1-drag-list}


## （Ant Design）的 Tooltip 组件是如何实现的 {#p0-tooltip}

Antd（Ant Design）的 Tooltip 组件是通过 CSS 和 JavaScript 结合实现的。

在 CSS 方面，Tooltip 组件使用了绝对定位和一些样式规则来定义 Tooltip 的外观。它通常包括一个触发元素和一个浮动在触发元素旁边的提示框。通过设置样式属性，如 position: absolute、top、left、display 等，可以控制提示框的位置、显示和隐藏等。

在 JavaScript 方面，Tooltip 组件通过事件监听和操作 DOM 元素来实现交互行为。当鼠标悬停在触发元素上时，会触发相应的事件处理函数。在事件处理函数中，通常会修改提示框元素的样式或类名，以实现显示或隐藏提示框的效果。同时，还可以根据鼠标位置调整提示框的位置，使其相对于触发元素居中或显示在特定的位置。

另外，Tooltip 组件还支持一些额外的配置选项，如延迟显示、自定义内容等。这些选项可以通过传递属性或配置项给 Tooltip 组件来进行设置。

**Tooltip 组件的动态偏移样式计算**

1. 监听触发元素的事件：Tooltip 组件通常在触发元素上监听鼠标悬停或点击等事件。

2. 获取触发元素的位置信息：在事件处理函数中，通过 DOM 操作获取触发元素的位置信息，包括宽度、高度、左偏移和上偏移等。

3. 计算偏移样式：根据触发元素的位置信息，结合组件配置项或属性中的偏移参数，计算出提示框相对于触发元素的偏移样式。

4. 设置提示框的样式：通过修改提示框元素的样式属性，如 top、left、transform 等，将计算得到的偏移样式应用于提示框，使其出现在预期的位置。

具体实现上述步骤的方式可以有多种，取决于具体的实现框架或库。一种常见的方式是使用 JavaScript 来监听事件、获取位置信息和设置样式，配合 CSS 来定义样式规则。

在实际开发中，可以使用一些常见的技术手段来计算动态偏移样式，例如：

* 使用 CSS 的 position: absolute 将提示框定位在触发元素的相对位置上。
* 使用 JavaScript 的 getBoundingClientRect() 方法获取触发元素的位置信息，包括宽度、高度、左偏移和上偏移等。
* 结合触发元素的位置信息和组件配置项中的偏移参数，通过计算得到最终的偏移值。
* 将计算得到的偏移值应用于提示框的样式属性，如 top、left、transform 等，使其相对于触发元素进行动态偏移。

需要注意的是，具体的实现方式可能因框架、库或组件的不同而有所差异，但核心思想是通过监听事件、获取位置信息和计算样式来实现动态偏移效果。

## 长列表渲染解决方案? {#p0-long-list-rendering}

## 写一个幻灯片效果 {#p0-slide-effect}

## 实现两个可以拖曳的节点连线

## 主题切换 {#p0-multi-theme-color}

1. 使用 CSS 变量：通过定义一些变量来控制颜色、字体等，然后在切换主题时动态修改这些变量的值。

2. 使用 class 切换：在 HTML 的根元素上添加不同的 class 名称，每个 class 名称对应不同的主题样式，在切换主题时切换根元素的 class 名称即可。

3. 使用 JavaScript 切换：使用 JavaScript 动态修改页面的样式，如修改元素的背景颜色、字体颜色等。

4. 使用 Less/Sass 等 CSS 预处理器：通过预处理器提供的变量、函数等功能来实现主题切换。

需要注意的是，无论采用哪种方式实现，都需要在设计页面样式时尽量遵循一些规范，如不使用绝对的像素值，使用相对单位等，以便更好地适应不同的屏幕大小和分辨率。

 以 less 举例， 详细讲述一下具体操作流程

通过 Less 实现网页换肤可以使用 CSS 变量和 Less 变量。CSS 变量的语法如下：

```css
:root {
 --primary-color: #007bff;
}

.btn {
 background-color: var(--primary-color);
}
```

而 Less 变量则是通过 Less 预编译器提供的变量语法来实现的，如下所示：

```less
lessCopy code@primary-color: #007bff;

.btn {
 background-color: @primary-color;
}
```

通过 Less 变量来实现网页换肤的方式可以在运行时使用 JavaScript 来修改 Less 变量的值，从而实现换肤效果。具体步骤如下：

1. 使用 Less 预编译器来编译 Less 文件为 CSS 文件。
2. 在 HTML 文件中引入编译后的 CSS 文件。
3. 在 JavaScript 中动态修改 Less 变量的值。
4. 使用 JavaScript 将新的 Less 变量值注入到编译后的 CSS 文件中。
5. 将注入后的 CSS 样式应用到页面上。

以下是一段实现通过 Less 变量来实现网页换肤的示例代码：

```less
// base.less 文件
@primary-color: #007bff;

.btn {
 background-color: @primary-color;
}

// dark.less 文件
@primary-color: #343a40;
```

```html
<!-- index.html 文件 -->
<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
 <title>网页换肤示例</title>
 <link rel="stylesheet/less" type="text/css" href="base.less">
 <link rel="stylesheet/less" type="text/css" href="dark.less">
</head>
<body>
 <button class="btn">按钮</button>
 <script src="less.min.js"></script>
 <script>
 function changeSkin() {
 // 修改 Less 变量的值
 less.modifyVars({
 '@primary-color': '#28a745'
 }).then(() => {
 console.log('换肤成功');
 }).catch(() => {
 console.error('换肤失败');
 });
 }
 </script>
</body>
</html>
```

在上面的示例代码中，我们引入了两个 Less 文件，一个是 `base.less`，一个是 `dark.less`。其中 `base.less` 定义了一些基础的样式，而 `dark.less` 则是定义了一个暗黑色的主题样式。在 JavaScript 中，我们使用 `less.modifyVars` 方法来修改 Less 变量的值，从而实现了换肤的效果。当然，这只是一个简单的示例代码，实际的换肤功能还需要根据实际需求来进行设计和实现。

页面主题色切换通常涉及到修改网页中的颜色方案，以提供不同的视觉体验，例如从明亮模式切换到暗黑模式。实现这一功能，可以通过配合使用 CSS、JavaScript 和本地存储来进行。以下是实施页面主题色切换的几种方法：

 使用 CSS 自定义属性

1. 定义一套主题变量：

```css
:root {
 --primary-color: #5b88bd; // 明亮主题色 */
 --text-color: #000; // 明亮主题文本颜色 */
}

[data-theme="dark"] {
 --primary-color: #1e2a34; // 暗黑主题色 */
 --text-color: #ccc; // 暗黑主题文本颜色 */
}
```

2. 应用自定义属性到 CSS 规则中：

```css
body {
 background-color: var(--primary-color);
 color: var(--text-color);
}
```

3. 使用 JavaScript 动态切换主题：

```js
function toggleTheme () {
  const root = document.documentElement
  if (root.dataset.theme === 'dark') {
    root.dataset.theme = 'light'
  } else {
    root.dataset.theme = 'dark'
  }
}
```

 使用 CSS 类切换

1. 为每个主题创建不同的 CSS 类：

```css
.light-theme {
 --primary-color: #5b88bd;
 --text-color: #000;
}

.dark-theme {
 --primary-color: #1e2a34;
 --text-color: #ccc;
}
```

2. 手动切换 CSS 类：

```js
function toggleTheme () {
  const bodyClass = document.body.classList
  if (bodyClass.contains('dark-theme')) {
    bodyClass.replace('dark-theme', 'light-theme')
  } else {
    bodyClass.replace('light-theme', 'dark-theme')
  }
}
```

 使用 LocalStorage 记录用户主题偏好

```js
// 当用户切换主题时
function saveThemePreference () {
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light')
}

// 页面加载时应用用户偏好
function applyThemePreference () {
  const preferredTheme = localStorage.getItem('theme')

  if (preferredTheme === 'dark') {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

applyThemePreference()
```

 使用媒体查询自动应用暗黑模式

某些现代浏览器支持 CSS 媒体查询`prefers-color-scheme`。你可以使用这个特性来自动根据用户的系统设置应用暗黑模式或明亮模式，而无须 JavaScript：

```css
@media (prefers-color-scheme: dark) {
 :root {
 --primary-color: #1e2a34; // 暗黑主题色 */
 --text-color: #ccc; // 暗黑主题文本颜色 */
 }
}

@media (prefers-color-scheme: light) {
 :root {
 --primary-color: #5b88bd; // 明亮主题色 */
 --text-color: #000; // 明亮主题文本颜色 */
 }
}
```

通过以上方法，开发人员能够为前端页面提供灵活的主题色切换功能，从而增强用户体验。

在前端处理一个页面有多个主题色可供选择的场景，可以通过以下几种方式实现：

**一、使用 CSS 变量**

1. **定义 CSS 变量**：

* 在 CSS 中，可以使用`--`来定义变量。例如，可以定义一些代表主题色的变量：

```css
:root {
 --primary-color: #007bff;
 --secondary-color: #6c757d;
}
```

* 这里定义了两个变量`--primary-color`和`--secondary-color`，分别代表主色和辅助色。

2. **在 CSS 中使用变量**：

* 然后在 CSS 规则中使用这些变量：

```css
.button {
 background-color: var(--primary-color);
 color: white;
}
```

* 在这个例子中，`.button`类的按钮背景颜色使用了`--primary-color`变量定义的颜色。

3. **在 JavaScript 中切换主题**：

* 在 JavaScript 中，可以通过修改`document.documentElement.style`来改变 CSS 变量的值，从而切换主题色：

```js
const setTheme = (theme) => {
  document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
  document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor)
}

const theme1 = {
  primaryColor: '#007bff',
  secondaryColor: '#6c757d'
}

const theme2 = {
  primaryColor: '#ff5733',
  secondaryColor: '#999999'
}

// 切换到主题 1
setTheme(theme1)

// 切换到主题 2
setTheme(theme2)
```

* 在这个例子中，`setTheme`函数接受一个主题对象，然后通过`document.documentElement.style.setProperty`方法修改 CSS 变量的值。可以定义多个主题对象，然后根据用户的选择切换主题。

**二、使用预处理器（如 Sass、Less）**

1. **定义变量和混合**：

* 在 Sass 或 Less 中，可以定义变量来代表主题色。例如，在 Sass 中：

```scss
$primary-color: #007bff;
$secondary-color: #6c757d;

.button {
 background-color: $primary-color;
 color: white;
}
```

* 这里定义了变量`$primary-color`和`$secondary-color`，并在`.button`类中使用了这些变量。

2. **创建多个主题文件**：

* 可以创建多个主题文件，每个文件定义不同的变量值。例如，创建`theme1.scss`和`theme2.scss`两个文件，分别定义不同的主题色。

3. **在 JavaScript 中切换主题文件**：

* 在 HTML 中，可以通过`<link>`标签引入不同的 CSS 文件来切换主题。在 JavaScript 中，可以动态地修改`<link>`标签的`href`属性来切换主题文件：

```js
const setTheme = (theme) => {
  const link = document.getElementById('theme-link')
  link.href = theme.href
}

const theme1 = {
  href: 'theme1.css'
}

const theme2 = {
  href: 'theme2.css'
}

// 切换到主题 1
setTheme(theme1)

// 切换到主题 2
setTheme(theme2)
```

* 在这个例子中，`setTheme`函数接受一个主题对象，然后通过修改`<link>`标签的`href`属性来切换主题文件。可以定义多个主题对象，每个对象包含不同的主题文件路径。

**三、使用 JavaScript 动态修改样式**

1. **定义样式类**：

* 在 CSS 中定义多个样式类，每个类代表一种主题。例如：

```css
.theme1 {
 background-color: #007bff;
 color: white;
}

.theme2 {
 background-color: #ff5733;
 color: white;
}
```

* 这里定义了两个样式类`.theme1`和`.theme2`，分别代表不同的主题。

2. **在 JavaScript 中切换样式类**：

* 在 JavaScript 中，可以通过修改元素的`classList`属性来切换样式类，从而切换主题：

```js
const setTheme = (theme) => {
  const element = document.getElementById('my-element')
  element.classList.remove('theme1', 'theme2')
  element.classList.add(theme)
}

// 切换到主题 1
setTheme('theme1')

// 切换到主题 2
setTheme('theme2')
```

* 在这个例子中，`setTheme`函数接受一个主题类名作为参数，然后通过修改元素的`classList`属性来切换主题。首先移除当前元素的所有主题类名，然后添加指定的主题类名。

## 手写 dom 分段渲染 {#p0-domer-render}

分时函数案例：把1秒创建1000个DOM节点，改成每隔200毫秒创建10个节点，这样不用短时间在页面中创建大量的DOM。

```jsx
var timeChunk = function(arr,fn,count,interval) {
 var timer = null;
 var data = null;
 var start = function() {
 for(var i = 0 ; i < Math.min(count || 1 , arr.length) ; i++) {
 fn(arr.shift());
 }
 }
 return function() {
 timer = setInterval(function(){
 if(arr.length == 0) {
 clearInterval(timer);
 timer = null;
 return;
 }
 start();
 }, interval || 200)
 }
}

var arr = [];
for(var i = 0 ; i < 1000 ; i++) {
 arr.push(i);
}

var renderDOMList = timeChunk(arr, function(data) {
 var div = document.createElement('div');
 div.innerHTML = data;
 document.body.appendChild(div);
},10,200);
renderDOMList();
```

## （电梯导航）该如何实现 {#p0-elevator-nav}

思路很简单， 利用 scrollIntoView 进行导航滚动、利用 IntersectionObserver 进行可视区判断；

具体实现：

* 第一步：点击右边的导航菜单，利用 scrollIntoView 方法使内容区域对应的元素出现在可视区域中。

```js
const rightBox = document.querySelector('.rightBox')
rightBox.addEventListener(
  'click',
  function (e) {
    const target = e.target || e.srcElement
    if (target && !target.classList.contains('rightBox')) {
      document.querySelector('.' + target.className.replace('Li', '')).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  },
  false
)
```

* 第二步：页面容器滚动时，当目标元素出现在检测区域内则联动改变对应导航的样式。

```js
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      const target = document.querySelector('.' + entry.target.className + 'Li')

      if (entry.isIntersecting && entry.intersectionRatio > 0.65) {
        document.querySelectorAll('li').forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active')
          }
        })

        if (!target.classList.contains('active')) {
          target.classList.add('active')
        }
      }
    })
  },
  {
    threshold: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]
  }
)
```

完整效果请看下面链接： [资料](https://codepen.io/xingba-coder/pen/ZEdKRKJ)

**参考文档**：[资料](https://juejin.cn/post/7399982698846404649)

## 长文本溢出，展开/收起如何实现 {#p2-long-text-overflow}

长文本溢出展开/收起功能通常需要使用一些 JavaScript 来动态控制文本的显示状态，及 CSS 来处理文本的默认显示样式。以下是一个基本实现示例，展示了如何结合 HTML、CSS 和 JavaScript 来实现这个功能。

 HTML 结构

我们定义一个容器来显示文本，并添加一个用于触发展开/收起操作的按钮。

```html
<div id="textContainer" class="text-overflow">
 这是一段可能很长的文本，我们希望在一开始时只显示部分，点击“展开”按钮后显示全部内容，再次点击则“收起”文本。
</div>
<button id="toggleButton">展开</button>
```

 CSS 样式

使用 CSS 设置文本的默认显示状态为隐藏超出部分，并且用省略号表示溢出。

```css
.text-overflow {
 // 设置一个高度限制，模拟文本“收起”时的状态 */
 max-height: 60px; // 这个值根据需要调整 */
 overflow: hidden;
 position: relative;
 line-height: 20px; // 根据实际情况调整 */
 padding-right: 20px;
}
```

 JavaScript 代码

使用 JavaScript 来控制文本的“展开”和“收起”状态。我们监听按钮的点击事件来切换文本的显示状态。

```js
document.getElementById('toggleButton').addEventListener('click', function () {
  const textContainer = document.getElementById('textContainer')
  const button = document.getElementById('toggleButton')

  // 检查当前是展开还是收起状态
  if (button.textContent === '展开') {
    // 修改文本容器的最大高度以显示全部文本
    textContainer.style.maxHeight = 'none'
    button.textContent = '收起'
  } else {
    // 重新设置最大高度以隐藏文本
    textContainer.style.maxHeight = '60px' // 与CSS中定义的相同
    button.textContent = '展开'
  }
})
```

这只是实现长文本溢出展开/收起的一种基本方法。根据具体需求，这个示例可以进一步扩展或修改，比如添加动画效果使展开/收起操作更平滑，或者根据文本长度动态决定是否显示“展开/收起”按钮等。

还有其他方法可以实现这一功能，包括使用纯 CSS 的技巧（虽然可能不那么灵活），或者利用现成的 JavaScript 库和框架来简化实现过程。

 更有多实现细节， 可以参考以下文档

[资料](https://juejin.cn/post/7407259487193399333)

## 在页面关闭时执行方法，该如何做 {#p3-page-close-exe

cute-method}

在页面关闭时执行特定的方法，你可以使用 `window` 对象的 `beforeunload` 和 `unload` 事件。不过，这两个事件有一些微妙的区别和适用场景。

 使用 `beforeunload` 事件

`beforeunload` 事件在窗口、文档或其资源即将卸载时触发，这一点让它成为在页面关闭前提示用户保存未保存更改的理想选择。在绑定到该事件的处理函数中，你可以执行特定的逻辑，但请注意，按照现代浏览器的安全策略，除非你设置了 `event.returnValue`，否则不会显示自定义的离开提示信息。

```js
window.addEventListener('beforeunload', (event) => {
  // 在这里执行你的清理逻辑或者其他操作
  // 例如，发送一个统计日志
  navigator.sendBeacon('/log', '用户即将离开页面')

  // 显示离开提示（大多数现代浏览器不支持自定义文本）
  event.returnValue = '您确定要离开此页面吗？'
})
```

 使用 `unload` 事件

`unload` 事件在用户即将从页面导航走，或关闭页面时触发。你可以在这个事件的处理函数中执行不能阻止页面卸载的清理逻辑。不过需要注意，这个事件的执行时间非常短，某些操作（例如异步操作）可能无法完成。

```js
window.addEventListener('unload', (event) => {
  // 执行简短的同步操作，例如发送统计信息
  // 注意：这种情况下 navigator.sendBeacon 是更好的选择
})
```

 使用 `navigator.sendBeacon`

对于在页面卸载时需要发送数据到服务器的情况，使用 `navigator.sendBeacon` 方法是一种更可靠的方式。它有效地解决了通过异步 AJAX 请求可能导致的数据不被送出的问题。

```js
window.addEventListener('unload', (event) => {
  navigator.sendBeacon('/log-out', '用户离开')
})
```

 注意事项

* 不是所有浏览器都完全一样地支持这些事件和 `navigator.sendBeacon` 方法。实施时应当考虑兼容性。
* 在 `beforeunload` 和 `unload` 事件中执行大量的同步操作或长时间运行的脚本可能会导致用户体验下降。推荐尽量使用简洁快速的逻辑。
* `beforeunload` 事件可以控制是否提示用户离开页面的确认对话框，但自定义的确认对话框信息可能不被所有浏览器支持。
* 使用 `navigator.sendBeacon` 来发送数据是因为它能在请求中携带足够的数据量，且即使页面卸载过程中也能确保数据被发送。

根据你的应用需求，选择合适的事件和方法，确保页面关闭时能够执行你的逻辑。
