# 编程题

## 取出一个 html 树，并返回标签类型和各标签出现次数？ ⭐️⭐️⭐️

## 拖拽组件设计 ? {#p1-drag-component-design}

## 长列表渲染解决方案? {#p0-long-list-rendering}

## 写一个幻灯片效果 {#p0-slide-effect}

## 实现两个可以拖曳的节点连线

## 实现文本溢出 popover 效果 {#p0-text-overflow-popover}

以下是一种使用 HTML、CSS 和 JavaScript 来实现当文本一行展示不下时通过`popover`展示全部内容的基本方法。假设你在一个网页环境中操作。

1. **HTML 结构**

* 首先，创建一个包含文本的元素，例如一个`span`标签。为这个元素添加一个自定义属性（比如`data-full-text`）来存储完整的文本内容。

 ```html
 <span
 id="textElement"
 data-full-text="这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本"
 >
 这是一段很长很长很长的文本
 </span>
 ```

2. **CSS 样式**

* 为`span`元素设置样式，使其在一行内显示文本，并在文本溢出时隐藏溢出部分。

 ```css
 #textElement {
 white - space: nowrap;
 overflow: hidden;
 text - overflow: ellipsis;
 cursor: pointer;
 }
 ```

* 这里设置`cursor: pointer`是为了让用户知道这个元素是可以点击的，当文本溢出时可以触发`popover`显示完整内容。

3. **JavaScript 功能实现**

* 使用 JavaScript 来检测文本是否溢出。可以通过比较元素的`offsetWidth`和`scrollWidth`来实现。如果`scrollWidth`大于`offsetWidth`，说明文本溢出了。
* 当文本溢出时，创建一个`popover`来显示完整内容。可以使用一些现成的 JavaScript 库（如 Bootstrap 的`popover`插件）或者自己编写简单的`popover`功能。以下是一个使用自定义 JavaScript 实现简单`popover`功能的示例（不依赖第三方库）：

 ```javascript
 document.addEventListener('DOMContentLoaded', function () {
   const textElement = document.getElementById('textElement')
   if (textElement.scrollWidth > textElement.offsetWidth) {
     textElement.addEventListener('click', function () {
       const fullText = this.getAttribute('data-full-text')
       const popover = document.createElement('div')
       popover.className = 'popover'
       popover.textContent = fullText
       document.body.appendChild(popover)
       // 简单的定位，将popover放在被点击元素的下方
       const rect = this.getBoundingClientRect()
       popover.style.left = rect.left + 'px'
       popover.style.top = rect.bottom + 5 + 'px'
     })
   }
 })
 ```

* 同时，你还需要添加一些 CSS 样式来美化`popover`：

 ```css
 .popover {
 position: absolute;
 background - color: white;
 border: 1px solid gray;
 padding: 10px;
 border - radius: 5px;
 z - index: 100;
 }
 ```

上述代码首先检查文本是否溢出。如果溢出，当用户点击该文本元素时，会创建一个`popover`元素并将完整文本内容放入其中，然后将`popover`添加到文档中，并简单地定位在被点击元素的下方。

请注意，这只是一个简单的示例，在实际应用中，你可能需要根据具体的设计要求和项目框架（如使用 Vue.js、React.js 等）来进行更复杂的实现，并且可能需要考虑浏览器兼容性等问题。如果使用像 Bootstrap 这样的框架，实现`popover`功能会更加方便和具有更好的样式一致性。

## 前端如何快速获取页面 url query 参数 {#p0-get-url-query-params}

在前端，可以通过以下几种方式快速获取页面 URL 的查询参数：

**一、使用 URLSearchParams API**

1. **基本用法**：

* `URLSearchParams`是一个内置的 JavaScript API，用于处理 URL 的查询参数。它提供了一种方便的方式来获取、设置和删除查询参数。
* 首先，可以使用`window.location.search`获取 URL 的查询字符串，然后将其传递给`URLSearchParams`构造函数来创建一个`URLSearchParams`对象。
* 例如：

```javascript
const urlParams = new URLSearchParams(window.location.search)
```

2. **获取单个参数值**：

* 可以使用`get`方法来获取指定参数的值。例如，要获取名为`paramName`的参数值，可以使用以下代码：

```javascript
const paramValue = urlParams.get('paramName')
```

3. **遍历所有参数**：

* 可以使用`forEach`方法来遍历所有的参数。例如：

```javascript
urlParams.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})
```

**二、手动解析查询字符串**

1. **基本思路**：

* 如果不使用`URLSearchParams`，也可以手动解析 URL 的查询字符串。首先，获取`window.location.search`，它包含了查询字符串（例如`?param1=value1&param2=value2`）。
* 然后，可以使用字符串的分割和遍历操作来提取参数名和参数值。

2. **示例代码**：

```javascript
const queryString = window.location.search.substring(1)
const params = {}
const paramPairs = queryString.split('&')
paramPairs.forEach((pair) => {
  const [key, value] = pair.split('=')
  if (key) {
    params[key] = decodeURIComponent(value)
  }
})
```

在这个例子中，首先提取查询字符串，然后将其分割成参数对数组。对于每个参数对，再次分割得到参数名和参数值，并将其存储在一个对象中。最后，可以通过`params`对象来访问各个参数的值。

**三、使用第三方库**

1. **库的选择**：

* 有一些第三方库也提供了方便的方法来处理 URL 的查询参数。例如，`qs`库是一个流行的用于处理查询字符串的库。
* 可以使用`npm`或`yarn`安装`qs`库：`npm install qs`或`yarn add qs`。

2. **使用示例**：

```javascript
import qs from 'qs'

const queryString = window.location.search.substring(1)
const params = qs.parse(queryString)
```

在这个例子中，使用`qs.parse`方法将查询字符串解析为一个对象，其中键是参数名，值是参数值。

## 前端如何处理一个页面多主题色可供选择的场景 {#p2-multi-theme-color}

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

```javascript
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

```javascript
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

```javascript
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
