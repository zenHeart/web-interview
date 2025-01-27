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

下面是一个简单的 JavaScript 函数，用于解析 URL 参数并返回一个包含参数键值对的对象：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      params[key] = decodeURIComponent(value)
    })
  }

  return params
}
```

这个函数接受一个 URL 字符串作为参数，并返回解析后的参数对象。例如：

```javascript
const url = 'https://example.com?name=John&age=30&city=New%20York'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", city: "New York" }
```

这个函数的实现思路是先从 URL 字符串中提取查询字符串部分，然后将查询字符串按照 `&` 分割成键值对数组。接着遍历键值对数组，将每个键值对按照 `=` 分割，然后将键和值存储到结果对象 `params` 中，注意要对值进行 URL 解码以处理特殊字符。最后返回解析后的参数对象。

 进阶 - 支持json字符串参数

如果要支持复杂的 JSON 字符串作为查询参数，可以使用 `JSON.parse()` 方法解析 JSON 字符串，并在解析后的对象中处理参数。

下面是一个修改后的函数，支持解析复杂的 JSON 字符串作为查询参数：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      const decodedValue = decodeURIComponent(value)

      try {
        params[key] = JSON.parse(decodedValue)
      } catch (error) {
        // 如果解析 JSON 失败，则将原始字符串存储到参数对象中
        params[key] = decodedValue
      }
    })
  }

  return params
}
```

现在，如果查询参数是一个 JSON 字符串，它将被解析为相应的 JavaScript 对象，并作为参数对象的值。如果解析失败（例如，不是有效的 JSON 字符串），则将保留原始字符串作为值存储在参数对象中。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address={"city":"New York","zipcode":10001}'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 } }
```

 再次进阶-支持更复杂的场景， 比如嵌套对象， 数组

下面是修改后的函数，支持解析复杂的查询参数，包括嵌套对象和数组：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      const decodedValue = decodeURIComponent(value)

      const keys = key.split('.')
      let current = params

      for (let i = 0; i < keys.length; i++) {
        const nestedKey = keys[i]
        const isArray = /\[\]$/.test(nestedKey)

        if (isArray) {
          const arrayKey = nestedKey.slice(0, -2)

          if (!current[arrayKey]) {
            current[arrayKey] = []
          }

          if (i === keys.length - 1) {
            current[arrayKey].push(parseValue(decodedValue))
          } else {
            const newIndex = current[arrayKey].length
            if (!current[arrayKey][newIndex]) {
              current[arrayKey][newIndex] = {}
            }
            current = current[arrayKey][newIndex]
          }
        } else {
          if (i === keys.length - 1) {
            current[nestedKey] = parseValue(decodedValue)
          } else {
            if (!current[nestedKey]) {
              current[nestedKey] = {}
            }
            current = current[nestedKey]
          }
        }
      }
    })
  }

  return params
}

function parseValue (value) {
  try {
    return JSON.parse(value)
  } catch (error) {
    // 解析失败，则返回原始值
    return value
  }
}
```

现在，该函数可以正确解析包含嵌套对象和数组的查询参数。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address.city=New%20York&address.zipcode=10001&tags[]=tag1&tags[]=tag2'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 }, tags: ["tag1", "tag2"] }
```

在这个修改后的函数中，当遇到嵌套对象时，它会递归创建相应的对象属性。当遇到数组时，它会创建一个数组，并将值添加到数组中。

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

```javascript
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

```javascript
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

```javascript
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

## 查找页面出现次数最多的 HTML 标签 {#p0-find-most-frequent-html-tag}

```html
<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
</head>

<body>
 <div>Some content</div>
 <p>Another paragraph</p>
 <p>Another paragraph</p>
 <p>Another paragraph</p>
 <div>More div content</p>
 <span>Span element</span>
 <script>
 function findMostFrequentTag() {
 const allElements = document.getElementsByTagName('*');
 const tagCount = {};
 for (let i = 0; i < allElements.length; i++) {
 const tagName = allElements[i].tagName;
 if (tagCount[tagName]) {
 tagCount[tagName]++;
 } else {
 tagCount[tagName] = 1;
 }
 }
 let mostFrequentTag = null;
 let maxCount = 0;
 for (const tag in tagCount) {
 if (tagCount[tag] > maxCount) {
 mostFrequentTag = tag;
 maxCount = tagCount[tag];
 }
 }
 return mostFrequentTag;
 }
 const mostFrequent = findMostFrequentTag();
 console.log(`The most frequent tag is: ${mostFrequent}`);
 </script>
</body>

</html>
```

## 实现一个缓存函数 {#p0-cache-function}

以下是使用 JavaScript 实现一个`once`函数的方法：

```javascript
function once (func) {
  let hasRun = false
  let result
  return function () {
    if (!hasRun) {
      result = func.apply(this, arguments)
      hasRun = true
    }
    return result
  }
}
```

你可以这样使用这个函数：

```javascript
function expensiveOperation () {
  console.log('执行了昂贵的操作')
  return 42
}

const memoizedOperation = once(expensiveOperation)

console.log(memoizedOperation()) // 执行了昂贵的操作，返回 42
console.log(memoizedOperation()) // 直接返回上次的结果 42，不再执行昂贵的操作
```

在这个实现中，`once`函数接收一个函数作为参数，并返回一个新的函数。新函数会记住第一次调用时的结果，后续调用直接返回这个结果，而不会再次执行传入的函数。

## 大文件上传 {#p0-large-file-upload}

分片上传是一种将大文件分割成多个小片段进行上传的方法，在分片上传过程中校验文件完整性非常重要，可以确保上传的文件在服务器端能够正确地组合成完整的文件。以下是一些校验文件完整性的思路：

**一、使用哈希算法**

1. **计算文件哈希值**：

* 在客户端上传文件之前，先对整个文件计算哈希值。常用的哈希算法有 MD5、SHA-1、SHA-256 等。
* 例如，使用 JavaScript 的`crypto-js`库计算文件的 MD5 哈希值：

 ```javascript
 import CryptoJS from 'crypto-js'
 
 const calculateFileHash = async (file) => {
   const fileReader = new FileReader()
   return new Promise((resolve, reject) => {
     fileReader.onload = (event) => {
       const hash = CryptoJS.MD5(event.target.result)
       resolve(hash.toString())
     }
     fileReader.onerror = reject
     fileReader.readAsArrayBuffer(file)
   })
 }
 ```

2. **上传过程中携带哈希值**：

* 在进行分片上传时，将文件的哈希值作为一个参数一起上传给服务器。
* 可以在每个分片的请求中携带哈希值，或者在上传开始时先将哈希值发送给服务器。

3. **服务器端校验**：

* 服务器在接收到所有分片并组合成完整文件后，再次计算文件的哈希值，并与客户端上传的哈希值进行比较。
* 如果两个哈希值一致，则说明文件完整无误；如果不一致，则说明文件在上传过程中可能出现了问题。

**二、校验和（Checksum）**

1. **计算校验和**：

* 除了哈希算法，还可以使用校验和来校验文件完整性。校验和是通过对文件的每个字节进行特定的数学运算得到的一个值。
* 例如，可以使用简单的累加校验和算法，将文件的每个字节的值相加得到一个总和作为校验和。

2. **上传和校验**：

* 在客户端计算文件的校验和，并在分片上传时将校验和发送给服务器。
* 服务器在组合完文件后，计算文件的校验和并与客户端上传的校验和进行比较，以确定文件的完整性。

**三、文件大小比较**

1. **记录文件大小**：

* 在客户端上传文件之前，记录文件的大小。可以通过`File`对象的`size`属性获取文件的大小。

2. **服务器端验证**：

* 服务器在接收到所有分片并组合成完整文件后，检查文件的大小是否与客户端上传的文件大小一致。
* 如果大小一致，则说明文件可能是完整的；如果不一致，则说明文件在上传过程中出现了问题。

**四、上传状态跟踪**

1. **客户端跟踪上传状态**：

* 在客户端，可以使用一个数据结构来跟踪每个分片的上传状态，例如使用一个数组记录每个分片是否成功上传。
* 当所有分片都成功上传后，可以认为文件上传完整。

2. **服务器端确认**：

* 服务器在接收到每个分片时，可以回复一个确认消息给客户端。客户端根据服务器的确认消息来更新上传状态。
* 当客户端收到服务器对所有分片的确认后，可以确定文件上传完整。

## 前端需要加载一个大体积的文件时， 一般有哪些优化思路 {#p1-large-file-optimization}

当前端需要加载大体积文件时，可以从以下几个方面进行优化：

**一、文件压缩**

1. **服务器端压缩**：

* 在服务器上配置文件压缩功能，如使用 Gzip 或 Brotli 压缩算法对文件进行压缩后再传输。这样可以显著减少文件的大小，降低传输时间。
* 例如，在 Nginx 服务器中，可以通过配置开启 Gzip 压缩：

 ```nginx
 gzip on;
 gzip_comp_level 6;
 gzip_types text/plain text/css application/javascript application/json image/svg+xml;
 ```

2. **客户端解压缩**：

* 现代浏览器通常支持对 Gzip 和 Brotli 压缩的文件进行自动解压缩。当浏览器接收到压缩后的文件时，会自动解压缩并使用。
* 无需额外的客户端代码，浏览器会自动处理压缩文件的解压缩过程，提高文件加载速度。

**二、文件分割与懒加载**

1. **文件分割**：

* 将大体积文件分割成多个较小的文件。例如，对于一个大型的 JavaScript 库，可以将其拆分成多个模块，根据需要逐步加载。
* 这样可以避免一次性加载整个大文件，减少初始加载时间。
* 例如，使用 Webpack 等构建工具可以将代码分割成多个 chunk，根据路由或特定条件进行加载。

2. **懒加载**：

* 对于不是立即需要的文件或资源，可以采用懒加载的方式。当用户实际需要使用该资源时，再进行加载。
* 例如，对于图片、视频等资源，可以在用户滚动到可视区域时再进行加载，避免在页面初始加载时加载所有资源。
* 对于 JavaScript 模块，可以使用动态导入（dynamic import）的方式实现懒加载：

 ```javascript
 const loadModule = async () => {
   const module = await import('./largeModule.js')
 // 使用加载的模块
 }
 ```

**三、缓存策略**

1. **浏览器缓存**：

* 设置合理的缓存策略，让浏览器缓存已经加载过的文件。这样，当用户再次访问时，可以直接从缓存中读取文件，而无需再次从服务器下载。
* 可以通过设置 HTTP 响应头来控制缓存，例如：

 ```nginx
 location / {
 add_header Cache-Control "max-age=3600";
 }
 ```

* 上述配置将设置文件的缓存时间为 1 小时。

2. **缓存更新机制**：

* 当文件内容发生变化时，需要确保浏览器能够获取到最新的版本。可以通过在文件名中添加版本号或哈希值来实现缓存更新。
* 例如，将文件名改为`largeFile_v1.2.js`或`largeFile_abc123.js`，当文件内容变化时，更新版本号或哈希值，浏览器会认为这是一个新的文件并进行下载。

**四、优化加载顺序**

1. **关键资源优先加载**：

* 确定哪些资源是页面加载的关键资源，优先加载这些资源。对于大体积文件，如果不是关键资源，可以延迟加载。
* 例如，对于一个图片库应用，先加载页面的基本结构和导航部分，图片可以在用户交互时再进行加载。

2. **异步加载**：

* 使用异步加载的方式加载大体积文件。例如，对于 JavaScript 文件，可以使用`<script async>`标签或动态创建`<script>`标签并插入到页面中进行异步加载。

```html

<script async src="largeScript.js"></script>

```

* 这样可以避免阻塞页面的渲染，提高用户体验。

**五、CDN 加速**

1. **使用内容分发网络（CDN）**：

* 将大体积文件托管在 CDN 上，利用 CDN 的分布式节点，可以让用户从离自己最近的节点获取文件，减少网络延迟，提高加载速度。
* 例如，将图片、视频、静态文件等托管在 CDN 上，通过 CDN 的 URL 进行访问。

2. **CDN 缓存**：

* CDN 通常会对文件进行缓存，进一步提高文件的加载速度。当文件内容发生变化时，需要及时更新 CDN 上的缓存。
* 可以通过设置 CDN 的缓存策略或使用版本号等方式来管理 CDN 缓存。

## 计算一段文本渲染之后的长度 {#p2-calculate-the-length-of-a-piece-of-text-after-rendering}

> 追加描述
> 需要根据这个长度来动态计算文本是否折叠， 所以这个文本没有计算出长度是否折叠之前，还不能在用户可视区域渲染出来

要在 JavaScript 中计算一段文本渲染之后的长度，可以通过几种方法来实现。这里的“长度”可以是文本渲染后的像素宽度，它取决于具体的字体、字号、文本内容等因素。以下是一些可行的方法：

 1. 创建一个临时元素来计算文本尺寸

这个方法涉及到创建一个与目标文本拥有相同样式（字体、字号等）的临时 DOM 元素，将目标文本内容设置到临时元素中，然后插入到文档流（不可见状态下）来测量其尺寸。测量完成后，再从文档中移除该临时元素。

```javascript
function getTextWidth (text, font) {
  // 创建一个临时的span元素
  const tempEl = document.createElement('span')
  tempEl.style.visibility = 'hidden' // 确保元素不可见
  tempEl.style.whiteSpace = 'nowrap' // 防止文本换行
  tempEl.style.font = font // 应用字体样式
  tempEl.textContent = text

  document.body.appendChild(tempEl)
  const width = tempEl.offsetWidth // 获取元素的宽度
  document.body.removeChild(tempEl)

  return width
}

// 示例用法
const font = '16px Arial'
const text = '这是一段测试文本'
console.log(getTextWidth(text, font))
```

 2. 使用 Canvas 的 measureText 方法

如果你不想与 DOM 打交道，也可以使用 Canvas 的 API 来测量文本宽度。`CanvasRenderingContext2D.measureText()` 方法返回一个对象，该对象包含了给定文本渲染后的宽度（以像素为单位）。

```javascript
function measureTextWidth (text, font) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = font // 应用字体样式，格式与 CSS font 属性相同
  const metrics = ctx.measureText(text)
  return metrics.width
}

// 示例用法
const font = '16px Arial'
const text = '这是一段测试文本'
console.log(measureTextWidth(text, font))
```

 注意事项

* 尽量在文档加载完毕后使用这些方法，特别是如果你依赖于页面上的样式信息时。
* 如果文本在页面上多次出现且样式一致，可以考虑缓存测量结果来提升性能。

## 长文本场景，中间显示省略号..., 两端正常展示 {#p3-long-text-scene-middle-display-ellipsis-in-two-directions-normal-display}

在前端处理长文本且需要在中间显示省略号（...），两端保留完整文本的情况，通常有下面几种方法可以达到效果：

 1. 纯 CSS 解决方案（对于单行文本）

对于单行的文本，可以使用 CSS 的`text-overflow`属性来实现，但这种方法一般只能实现末尾的省略号，无法直接实现中间省略的效果。

 2. JavaScript + CSS

当需要在文本中间显示省略号时，就需要结合使用 JavaScript 和 CSS 来处理。以下是一种可能的实现方法：

1. **确定保留文本的长度。** 首先确定需要在文本的开始和结束保留多少字符。
2. **使用 JavaScript 计算并处理文本。** 根据上面确定的长度，使用 JavaScript 截取字符串，并添加省略号。
3. **使用 CSS 来保证文本的美观展示。**

下面是一个简单的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Document</title>
 <style>
 .text-container {
 width: 60%;
 white-space: nowrap;
 overflow: hidden;
 text-overflow: ellipsis;
 margin: 20px auto;
 }
 </style>
 </head>
 <body>
 <div id="text" class="text-container">
 <!-- 动态生成的文本会放在这里 -->
 </div>

 <script>
 function truncateText(selector, text, frontLen, backLen) {
 const totalLen = frontLen + backLen;
 if (text.length > totalLen) {
 const startText = text.substr(0, frontLen);
 const endText = text.substr(-backLen);
 document.querySelector(selector).textContent = `${startText}...${endText}`;
 } else {
 document.querySelector(selector).textContent = text;
 }
 }

 const exampleText = "这是一个长文本示例，需要在中间显示省略号，同时保留两端的文本内容。";
 truncateText("#text", exampleText, 10, 10);
 </script>
 </body>
</html>
```

在这个例子中，`truncateText`函数接收一个选择器（在这里是指容器的 ID）、要处理的文本、前端和后端应保留文本的长度。函数计算并生成了新的文本内容，其中间部分被省略号（...）替代。

这个方法给予了你灵活性去确定前后端保留的文本长度，以及省略的部分。但需要注意，这是针对简单场景的解决方案，对于更复杂的布局或特殊字体，可能需要更细致的处理来保证良好的显示效果。

 其他复杂实现可以参考下面的文档

* [资料](https://juejin.cn/post/7329967013923962895)

## 要实时统计用户浏览器窗口大小，该如何做

要实时统计用户浏览器窗口大小，可以利用 JavaScript 中的 `resize` 事件。当浏览器窗口尺寸变化时，此事件会被触发。通过侦听此事件，可以实时获取并处理浏览器窗口的宽度和高度。

 基础示例

下面是一个简单的示例，展示如何使用 `resize` 事件来获取并打印当前浏览器窗口的宽度和高度：

```javascript
// 定义一个函数来处理窗口大小变化
function handleResize () {
  const width = window.innerWidth
  const height = window.innerHeight
  console.log(`当前窗口大小：宽度 = ${width}, 高度 = ${height}`)
}

// 在窗口 resize 事件上添加监听器
window.addEventListener('resize', handleResize)

// 初始化时执行一次，确保获取初始窗口大小
handleResize()
```

 节流优化

如果你担心 `resize` 事件触发得太频繁，可能会影响页面性能，可以引入“节流”（throttle）机制来限制事件处理函数的执行频率。节流确保了即使事件持续触发，事件处理函数也只在每隔一段时间执行一次。

以下是如何应用节流优化的示例：

```javascript
function throttle (fn, wait) {
  let inThrottle, lastFn, lastTime
  return function () {
    const context = this
    const args = arguments
    if (!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}

// 使用节流函数包装我们的处理器
const throttledHandleResize = throttle(handleResize, 100)

// 添加节流化的事件监听
window.addEventListener('resize', throttledHandleResize)
```

这个 `throttle` 函数通过确保被包装的 `handleResize` 函数在指定的时间间隔（本例中为 100 毫秒）内最多只执行一次，来减少 `resize` 事件处理函数的调用频率。

 应用场景

这样实时统计用户浏览器窗口大小的方法可以用于多种应用场景，如响应式布局调整、基于窗口大小动态加载资源、或者其他需要根据视窗大小变化进行调整的交互效果实现。

使用这种方法时，重要的是平衡事件处理函数的执行频率和页面的性能，特别是当你的窗口大小调整处理函数中包含复杂操作时。通过合理利用“节流”或“防抖”（debounce）技术，可以有效地解决这个问题。

## 如何实现鼠标拖拽 {#p2-mouse-drag}

**关键词**：拖拽 api、`mousedown`、`mousemove`和`mouseup`事件

实现鼠标拖拽功能通常涉及到监听和处理鼠标事件，比如：`mousedown`、`mousemove`和`mouseup`事件。下面是一个基本的步骤指南以及一个简易的示例代码（使用 HTML 和 JavaScript），展示了如何实现一个元素的鼠标拖拽功能。

 基本步骤

1. **监听`mousedown`事件：** 当用户按下鼠标按钮时，记录被拖拽元素的初始位置，并设置一个标志（如`isDragging`）表示拖拽开始。

2. **监听`mousemove`事件：** 当用户移动鼠标时，如果拖拽已开始，则根据鼠标当前位置和初始位置的差值，更新被拖拽元素的位置。

3. **监听`mouseup`事件：** 当用户释放鼠标按钮时，清除拖拽开始的标志（如`isDragging`），表示拖拽结束。

 示例代码

这里是一个简单的 HTML 和 JavaScript 示例，演示了如何让一个`div`元素可拖拽：

```html
<!DOCTYPE html>
<html>
 <head>
 <title>鼠标拖拽示例</title>
 <style>
 #draggable {
 width: 100px;
 height: 100px;
 background-color: red;
 position: absolute;
 cursor: pointer;
 }
 </style>
 </head>
 <body>
 <div id="draggable"></div>

 <script>
 // 获取元素
 var draggable = document.getElementById("draggable");
 var isDragging = false;
 var offset = { x: 0, y: 0 };

 draggable.addEventListener("mousedown", function (e) {
 isDragging = true;
 offset.x = e.clientX - draggable.getBoundingClientRect().left;
 offset.y = e.clientY - draggable.getBoundingClientRect().top;
 });

 document.addEventListener("mousemove", function (e) {
 if (isDragging) {
 draggable.style.left = e.clientX - offset.x + "px";
 draggable.style.top = e.clientY - offset.y + "px";
 }
 });

 document.addEventListener("mouseup", function () {
 isDragging = false;
 });
 </script>
 </body>
</html>
```

 注意事项

* 这个示例仅作为演示使用，实际应用可能需要更多的错误处理和边界条件判断。
* 为了防止拖拽时的文本选中现象，可能需要监听并阻止`mousemove`事件的默认行为。
* 记得附加适当的样式（如`cursor: move;`），提升用户体验。

根据你的需要，这个基本的逻辑和代码可以进行调整和扩展，以实现更复杂的拖拽功能。

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

```javascript
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

```javascript
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

```javascript
window.addEventListener('unload', (event) => {
  // 执行简短的同步操作，例如发送统计信息
  // 注意：这种情况下 navigator.sendBeacon 是更好的选择
})
```

 使用 `navigator.sendBeacon`

对于在页面卸载时需要发送数据到服务器的情况，使用 `navigator.sendBeacon` 方法是一种更可靠的方式。它有效地解决了通过异步 AJAX 请求可能导致的数据不被送出的问题。

```javascript
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

## 大文件切片上传的时候，确定切片数量的时候，有那些考量因素 {#p2-big-file-slice-upload}

大文件切片上传时，切片数量取决于几个关键因素：文件总大小、每个切片的大小（即切片大小），以及任何特定于应用或服务的限制。计算切片数量的过程包括确定合理的切片大小，然后根据文件总大小来计算需要多少个这样大小的切片。以下是一些步骤和考虑因素，可以帮助你确定切片数量：

 1. 确定切片大小

* **切片大小**：首先，需要确定每个切片的大小。这通常是一个权衡的结果，考虑到效率、可靠性和服务器限制。太小的切片会增加请求的数量，降低效率；而太大的切片可能会增加单个请求失败的风险，并且对于每次请求消耗更多的内存和带宽。
* 通常，切片大小选取在 `1MB` 至 `10MB` 之间比较合适，当然这取决于具体应用和网络环境。

 2. 计算切片数量

* **文件总大小**：知道文件的总大小后，可以通过简单的数学计算来决定切片的数量。公式如下：

 ```
 切片数量 = 向上取整（文件总大小 / 每个切片的大小）
 ```

* 例如，如果文件是 `50MB`，每个切片大小为 `5MB`，则切片数量为 `10`。

 3. 考虑特殊情况

* 最后一个切片可能会小于你设定的标准切片大小，这是正常情况，需要在上传逻辑中进行处理。

 4. 示例代码

```javascript
function calculateChunks (fileSize, chunkSize) {
  // 文件总大小（byte），切片大小（byte）
  const chunksCount = Math.ceil(fileSize / chunkSize)
  return chunksCount
}

// 示例：文件大小 52MB，切片大小 5MB
const fileSize = 5210241024 // 52MB
const chunkSize = 510241024 // 5MB
const chunksCount = calculateChunks(fileSize, chunkSize)

console.log(`需要切片数量: ${chunksCount}`)
```

 注意事项

* **网络条件**：切片大小可能需要根据网络环境调整。在网络条件较差的情况下，选择更小的切片大小可能更加可靠。
* **服务器限制**：某些服务器或云服务可能对上传文件的大小有限制。确保了解和遵守这些限制，以避免上传失败。
* **并发上传**：在选择切片大小和数量时，考虑是否会并行上传多个切片，因为这也会影响上传速度和效率。

通过以上步骤和考虑因素，你可以合理地决定大文件上传时的切片数量，以优化上传过程的效率和可靠性。

## 移动端如何实现下拉滚动加载（顶部加载） {#p1-scroll-loading}

 原理

![prinple.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506932c16c034452b90ae01decabf62c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=825&h=359&s=455756&e=png&b=ffffff)

如图所示，蓝色框代表视口，绿色框代表容器，橙色框代表加载动画。最开始时，加载动画处于视口外；开始下拉之后，容器向下移动，加载动画从上方进入视口；结束下拉后，容器又开始向上移动，加载动画也从上方退出视口。

 核心逻辑

看完布局代码，我们再看逻辑代码。逻辑代码中，我们要监听用户的手指滑动、实现下拉手势。我们需要用到三个事件：

* [touchstart](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchstart_event) 代表触摸开始;
* [touchmove](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchmove_event) 代表触摸移动;
* [touchend](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/touchend_event) 代表触摸结束。

从 `touchstart` 和 `touchmove` 事件中我们可以获取手指的坐标，比如 `event.touches[0].clientX` 是手指相对视口左边缘的 X 坐标，`event.touches[0].clientY` 是手指相对视口上边缘的 Y 坐标；从 `touchend` 事件中我们则无法获得 `clientX` 和 `clientY`。

我们可以先记录用户手指 touchstart 的 clientY 作为开始坐标，记录用户最后一次触发 touchmove 的 clientY 作为结束坐标，二者相减就得到手指移动的距离 distanceY。

设置手指移动多少距离，容器就移动多少距离，就得到了我们的逻辑代码：

```js
const box = document.getElementById('box')
const loader = document.getElementById('loader')
let startY = 0; let endY = 0; let distanceY = 0

function start (e) {
  startY = e.touches[0].clientY
}

function move (e) {
  endY = e.touches[0].clientY
  distanceY = endY - startY
  box.style = `
 transform: translateY(${distanceY}px);
 transition: all 0.3s linear;
 `
}

function end () {
  setTimeout(() => {
    box.style = `
 transform: translateY(0);
 transition: all 0.3s linear;
 `
    loader.className = 'loading'
  }, 1000)
}

box.addEventListener('touchstart', start)
box.addEventListener('touchmove', move)
box.addEventListener('touchend', end)
```

逻辑代码实现一个简陋的下拉效果，当然现在还有很多缺陷。

![pull-down-basic.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fdc67efc50947e8bceb590b1e4d3df5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=375&h=400&s=204176&e=gif&f=48&b=efefef)

 存在的 6 个个缺陷

* 没有最小、最大距离限制
* 加载动画没有停留在视口顶部
* 重复触发
* 没有限制方向
* 没有阻止原生滚动
* 没有阻止 iOS 橡皮筋效果

## （电梯导航）该如何实现 {#p0-elevator-nav}

思路很简单， 利用 scrollIntoView 进行导航滚动、利用 IntersectionObserver 进行可视区判断；

具体实现：

* 第一步：点击右边的导航菜单，利用 scrollIntoView 方法使内容区域对应的元素出现在可视区域中。

```javascript
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

```javascript
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

## 如何在划词选择的文本上添加右键菜单（划词：鼠标滑动选择一组字符， 对组字符进行操作）{#p2-huaci}

> 主要考察 dom 方法， `getSelection`
> 属于很冷门知识， 只会在做过富文本的同学面试过程中可能会问得到。

要在划词选择的文本上添加右键菜单，可以按照以下步骤进行操作：

1. 监听鼠标右键事件
 在文档或富文本区域上添加 `contextmenu` 事件的监听。

```javascript
document.addEventListener('contextmenu', function (event) {
  // 阻止默认的浏览器右键菜单
  event.preventDefault()

  // 在此处显示自定义右键菜单
  showCustomMenu(event)
})
```

2. 显示自定义右键菜单
 创建一个自定义的菜单元素，并根据选择的文本设置菜单选项。

```javascript
function showCustomMenu (event) {
  const customMenu = document.createElement('div')
  customMenu.style.position = 'absolute'
  customMenu.style.left = event.clientX + 'px'
  customMenu.style.top = event.clientY + 'px'

  // 添加菜单选项
  const menuItem1 = document.createElement('div')
  menuItem1.textContent = '复制'
  menuItem1.addEventListener('click', function () {
    // 处理复制操作
    copySelectedText()
  })
  customMenu.appendChild(menuItem1)

  // 可以添加更多的菜单选项

  document.body.appendChild(customMenu)
}
```

3. 处理菜单选项的操作
 例如，实现复制选中文本的功能。

```javascript
function copySelectedText () {
  const selection = window.getSelection()
  if (selection) {
    const range = selection.getRangeAt(0)
    const clipboardData = new ClipboardEvent('copy', {
      clipboardData: { text: range.toString() },
      bubbles: true
    }).clipboardData
    document.execCommand('copy', false, clipboardData)
  }
}
```

4. 隐藏右键菜单
 当用户点击菜单之外的区域时，隐藏自定义右键菜单。

```javascript
document.addEventListener('click', function (event) {
  const customMenu = document.querySelector('.custom-menu')
  if (customMenu && !customMenu.contains(event.target)) {
    customMenu.remove()
  }
})
```

## 富文本里面， 是如何做到划词的（鼠标滑动选择一组字符， 对组字符进行操作） {#p3-richtext-huaci}

> 主要考察 dom 方法， `getSelection`
> 属于很冷门知识， 只会在做过富文本的同学面试过程中可能会问得到。

在富文本环境中实现划词（鼠标滑动选择一组字符并对其进行操作）通常涉及以下几个关键步骤和技术：

1. 事件监听

* 监听鼠标按下、鼠标移动和鼠标松开这三个主要的鼠标事件。当鼠标按下时，标记选择的开始；在鼠标移动过程中，根据鼠标的位置更新选择范围；鼠标松开时，确定最终的选择。

2. 选择范围计算

* 使用浏览器提供的 `Selection` 对象来获取和管理选择的范围。在鼠标移动过程中，不断更新 `Selection` 对象的范围。

3. 操作处理

* 一旦选择完成，可以根据具体的需求对选中的字符进行操作。例如，修改样式（如加粗、变色）、获取选中的文本内容、执行复制粘贴等操作。

以下是一个简单的 JavaScript 示例，展示了如何获取选中的文本：

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Document</title>
 </head>

 <body>
 <p>这是一段示例文本，您可以尝试选中一部分。</p>

 <script>
 document.addEventListener("mouseup", function () {
 const selection = window.getSelection();
 if (selection) {
 const selectedText = selection.toString();
 console.log("选中的文本: ", selectedText);
 }
 });
 </script>
 </body>
</html>
```

## 扫码登录？{#p0-scan}

扫码登录的实现原理核心是基于一个中转站，该中转站通常由应用提供商提供，用于维护手机和PC之间的会话状态。

整个扫码登录的流程如下：

1. 用户在PC端访问应用，并选择使用扫码登录方式。此时，应用生成一个随机的认证码，并将该认证码通过二维码的形式显示在PC端的页面上。

2. 用户打开手机上的应用，并选择使用扫码登录方式。此时，应用会打开手机端的相机，用户可以对着PC端的二维码进行扫描。

3. 一旦用户扫描了二维码，手机上的应用会向应用提供商的中转站发送一个请求，请求包含之前生成的随机认证码和手机端的一个会话ID。

4. 中转站验证认证码和会话ID是否匹配，如果匹配成功，则该中转站将用户的身份信息发送给应用，并创建一个PC端和手机端之间的会话状态。

5. 应用使用收到的身份信息对用户进行认证，并创建一个与该用户关联的会话状态。同时，应用返回一个通过认证的响应给中转站。

6. 中转站将该响应返回给手机端的应用，并携带一个用于表示该会话的令牌，此时手机和PC之间的认证流程就完成了。

7. 当用户在PC端进行其他操作时，应用将会话令牌附加在请求中，并通过中转站向手机端的应用发起请求。手机端的应用使用会话令牌（也就是之前生成的令牌）来识别并验证会话状态，从而允许用户在PC端进行需要登录的操作。

## 不同标签页或窗口间的 【主动推送消息机制】 的方式有哪些？

**BroadcastChannel API**

[资料](https://juejin.cn/post/7307057492059471899)

`BroadcastChannel API` 是一种在相同源的不同浏览器上下文之间实现简单高效通信的方法。这意味着它可以在同一网站的多个标签页或窗口之间发送消息。这是由 HTML5 规范引入的，用于改进 Web Workers 中的通信方法。

下面是如何使用 `BroadcastChannel API` 的基本指南及几个示例。

**创建与发送消息**

```javascript
// 在任何一个 tab 或 iframe 中创建一个广播频道
const channel = new BroadcastChannel('my-channel-name')

// 发送一个消息到频道
channel.postMessage('Hello from a tab!')
```

**监听消息**

```javascript
// 监听这个频道的消息
channel.addEventListener('message', function (event) {
  if (event.data === 'Hello from a tab!') {
    console.log('Message received: ', event.data)
  }
})
```

**实现频道消息通信**

假设你有两个标签页，并且你想更新每个标签页来显示另一个标签页中发生的事情，比如用户数量计数器：

```javascript
// 在第一个标签页中
self.addEventListener('load', () => {
  const channel = new BroadcastChannel('visitor-channel')
  let visitorCount = 0

  // 定时发送随机的用户活动消息
  setInterval(function () {
    visitorCount++
    channel.postMessage(`Visitor count increased to: ${visitorCount}`)
  }, 5000)
})

// 在另一个标签页中
self.addEventListener('load', () => {
  const channel = new BroadcastChannel('visitor-channel')

  // 监听消息来更新用户数量
  channel.addEventListener('message', function (event) {
    if (event.data.startsWith('Visitor count')) {
      // 用接收到的用户数量更新显示
      updateVisitorCountDisplay(event.data)
    }
  })

  // 这个方法将设置标签页上的用户计数显示
  function updateVisitorCountDisplay (message) {
    // 这里写用于更新显示的代码
    console.log(message)
  }
})
```

在这个例子中，一个标签页通过定期发送新的消息来模拟用户活动的增加，这个消息在所有监听该频道的上下文中传递。另一个或多个标签页将监听这个频道来接收和响应这些更新。

**注意事项：**

* 频道内的通信 **仅在同源浏览器上下文**（具有相同的协议、域名和端口号）之间有效，也就是说，不同的网站之间的通信是不被允许的，以保护每个网站的安全性。
* 频道中的通信是 **单向的**，你可以通过频道向所有连接

 **Service Workers**

利用 Service Workers，各个标签页可以通过 `clients.matchAll()` 方法找到所有其他客户端（如打开的标签页），然后使用 `postMessage` 发送消息。

这个方法相比 `BroadcastChannel` 更加灵活，因为 Service Workers 可以通过 `Focus` 和 `Navigate` 事件来控制页面的焦点和导航等。

`ServiceWorkers` 提供了在后台运行脚本的能力，这些脚本可以在网络受限或没有网络的情况下运行。当你用 `ServiceWorkers` 进行页面间的通信，你可以利用它们来推送消息到打开的 `Clients`（如浏览器标签页）。

要使用 `ServiceWorkers` 实现从不同 Tab 中主动推送信息，可以通过以下几个步骤：

**1. 编写 ServiceWorker 文件**

首先，创建名为 `sw.js` 的 ServiceWorker 文件。这个文件在你的网站目录下，会在用户访问网站时注册并激活。

```javascript
// sw.js

self.addEventListener('message', (event) => {
  if (event.data === 'New message from another tab') {
    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then((windowClients) => {
        windowClients.forEach((client) => {
          client.postMessage('New message for ' + client.id)
        })
      })
  }
})
```

**2. 在主页面注册 ServiceWorker**

在主页面（index.html）通过 JavaScript 注册这个 ServiceWorker 文件。

```javascript
// index.html

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error)
    })
}
```

**3. 监听 `message` 事件**

在主页面使用 `navigator.serviceWorker.controller` 来检查是否已经有 ServiceWorker 主动控制。

```javascript
if (navigator.serviceWorker.controller) {
  // Post a message to the ServiceWorker
  navigator.serviceWorker.controller.postMessage('This is from main page')
}
```

**4. 从其他 Tab 推送消息**

在其他 Tab 上，一旦 ServiceWorker 被该页面控制后，可以通过同样的 `postMessage` 方法发送消息。

 **SharedWorker**

SharedWorker 提供了一种更传统的跨文档通信机制，在不同文档间共享状态和数据。你需要创建一个 `SharedWorker` 对象，并在所有的文档里监听来自该 worker 的消息。

简单场景的 SharedWorker 的使用步骤：

1. **创建和连接**:

```javascript
// 创建一个 SharedWorker，并指定要加载的脚本
const myWorker = new SharedWorker('worker.js')
// 开启端口通信
myWorker.port.start()
```

2. **端口通信**: 使用端口接收和发送消息

```javascript
// 发送数据给worker
myWorker.port.postMessage({ command: 'start', data: [1, 2, 3] })

// 监听来自worker的消息
myWorker.port.onmessage = function (event) {
  if (event.data) {
    console.log('Result from worker:', event.data)
  }
}
```

3. **实现 worker 逻辑**:

在 `worker.js` 内，通过 `onconnect` 事件监听端口连接，并在使用 `postMessage` 发送数据的页面之间转发消息。

```javascript
// worker.js

// 自身的事件监听器
self.onconnect = function (event) {
  const port = event.ports[0]

  // 监听端口的消息
  port.onmessage = function (e) {
    if (e.data.command === 'start') {
      const result = someHeavyComputation(e.data.data)
      port.postMessage({ result })
    }
  }
}

// 在这里执行一些开销较大的计算逻辑
function someHeavyComputation (data) {
  // 在这里进行计算...
  return data.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue
  }, 0)
}
```

4. **通知其他页面更新**:

当你希望基于上文提到的 SharedWorker 执行的计算结果通知其他所有的页面更新时，可以利用 `SharedWorkerGlobalScope` 中的 `clients` 对象。

```javascript
// 在 worker.js 中

self.addEventListener('message', (e) => {
  if (e.data === 'Update all clients') {
    // 遍历所有客户端
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        // 发送消息更新它们
        client.postMessage('Please update your state')
      })
    })
  }
})
```

 使用 localStorage 的变更监听

虽然 `localStorage` 没有直接提供跨标签页推送机制，但是可以使用 `window.addEventListener('storage', listener)` 监听 `storage` 事件，实现不同标签页间的通信。

```javascript
// 标签页1修改了 localStorage
localStorage.setItem('someKey', 'someValue')

// 其他标签页监听 storage 事件
window.addEventListener('storage', function (event) {
  if (event.storageArea === localStorage && event.key === 'someKey') {
    console.log(event.newValue)
  }
})
```

 使用 iframe 的 message 事件

如果排他性不是问题（所有标签页都属于同一客户端），可以使用 iframe 来传递消息，父窗口和 iframe 可以使用 DOM 中的 `message` 事件系统相互通信。

要使用 `iframe` 的 `message` 事件实现不同页签之间的通信，你需要两个关键项的配合：父页面和 `iframe` 页面之间的协调工作。这种通信非常灵活，因为你可以根据自己需要进行信息的发送和监听。

**示例步骤：**

**1. 创建一个父页面**

在父页面中，我们创建一个 `iframe` 并监听 `message` 事件。

```html
<!-- parent.html -->

<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <title>Parent Page</title>
 </head>
 <body>
 <iframe src="iframe.html" style="display:none;"></iframe>

 <script>
 // 监听 iframe 发送的 message 事件
 window.addEventListener("message", function (event) {
 if (event.origin !== "http://example.com") {
 // 确保消息源是可信的
 return;
 }
 if (event.data && event.data.greeting) {
 console.log("Message received from iframe:", event.data);
 // 如果iframe向父页面问好（向父页面发送了一条消息）
 // 假设我们还想再向iframe发送一些信息
 document.querySelector("iframe").contentWindow.postMessage(
 {
 response: "Hello iframe! This is the parent window speaking.",
 },
 "http://example.com"
 );
 }
 });
 </script>
 </body>
</html>
```

**2. 创建一个 iframe 页面**

在 `iframe.html` 页面中，我们需要发送消息到父页面并监听父页面的消息。

```html
<!-- iframe.html -->

<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <title>Iframe Page</title>
 </head>
 <body>
 <script>
 // 假设我们有一些需要发送到父页面的信息
 function sendMessageToParent() {
 parent.postMessage({ greeting: "Hello, I am the iframe!" }, "http://example.com");
 }

 // 当页面加载完成后，发送消息
 window.onload = function () {
 sendMessageToParent();
 };

 // 监听来自父页面的消息
 window.addEventListener("message", function (event) {
 if (event.origin !== "http://example.com") {
 // 反向验证消息源的可信度
 return;
 }
 if (event.data && event.data.response) {
 console.log("Message received from parent:", event.data);
 // 可根据消息实现特定的逻辑
 }
 });
 </script>
 </body>
</html>
```

## 虚拟列表 {#p0-virtual-list}

虚拟滚动（Virtual Scrolling）是一种性能优化的手段，通常用于处理长列表的显示问题。在传统的滚动加载中，当面对成千上万项的长列表时，直接在 DOM 中创建并展示所有项会导致严重的性能问题，因为浏览器需要渲染所有的列表项。而虚拟滚动的核心原理是仅渲染用户可视范围内的列表项，以此减少 DOM 操作的数量和提高性能。

实现虚拟滚动，我们需要：

1. 监听滚动事件，了解当前滚动位置。
2. 根据滚动位置计算当前应该渲染哪些列表项目（即在视口内的项目）。
3. 只渲染那些项目，并用占位符（比如一个空的 div）占据其它项目应有的位置，保持滚动条大小不变。
4. 当用户滚动时，重新计算并渲染新的项目。

 基础版本实现

以下是一个简单的虚拟滚动实现的 JavaScript 代码示例：

```javascript
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

```javascript
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

## 一次性渲染十万条数据还能保证页面不卡顿 {#p1-virtuallist}

原理其实就是 通过 `requestAnimationFrame` 实现分块儿加载。

 requestAnimationFrame + fragment（时间分片）

既然定时器的执行时间和浏览器的刷新率不一致，那么我就可以用`requestAnimationFrame`来解决

`requestAnimationFrame`也是个定时器，不同于`setTimeout`，它的时间不需要我们人为指定，这个时间取决于当前电脑的刷新率，如果是 60Hz ，那么就是 16.7ms 执行一次，如果是 120Hz 那就是 8.3ms 执行一次

> 因此`requestAnimationFrame`也是个宏任务，前阵子面试就被问到过这个

这么一来，每次电脑屏幕 16.7ms 后刷新一下，定时器就会产生 20 个`li`，`dom`结构的出现和屏幕的刷新保持了一致

```js
const total = 100000
const ul = document.getElementById('container')
const once = 20
const page = total / once

function loop (curTotal) {
  if (curTotal <= 0) return

  const pageCount = Math.min(curTotal, once)

  window.requestAnimationFrame(() => {
    for (let i = 0; i < pageCount; i++) {
      const li = document.createElement('li')
      li.innerHTML = ~~(Math.random() * total)
      ul.appendChild(li)
    }
    loop(curTotal - pageCount)
  })
}

loop(total)
```

其实目前这个代码还可以优化一下，每一次`appendChild`都是新增一个新的`li`，也就意味着需要回流一次，总共十万条数据就需要回流十万次

此前讲回流的时候提出过虚拟片段`fragment`来解决这个问题

`fragment`是虚拟文档碎片，我们一次`for`循环产生 20 个`li`的过程中可以全部把真实`dom`挂载到`fragment`上，然后再把`fragment`挂载到真实`dom`上，这样原来需要回流十万次，现在只需要回流`100000 / 20`次

```js
const total = 100000
const ul = document.getElementById('container')
const once = 20
const page = total / once

function loop (curTotal) {
  if (curTotal <= 0) return

  const pageCount = Math.min(curTotal, once)

  window.requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment() // 创建一个虚拟文档碎片
    for (let i = 0; i < pageCount; i++) {
      const li = document.createElement('li')
      li.innerHTML = ~~(Math.random() * total)
      fragment.appendChild(li) // 挂到fragment上
    }
    ul.appendChild(fragment) // 现在才回流
    loop(curTotal - pageCount)
  })
}

loop(total)
```

进阶： 如果做到极致的话， 可以考虑通过动态计算渲染的量， 一次性渲染多少。 会涉及到一些 长任务 等相关知识。
这部分可以参考：[资料](https://juejin.cn/post/7328366295091380262)

 参考文档

[资料](https://juejin.cn/post/7354940230301057033)

## 下载进度

要获取下载进度，可以使用 `XMLHttpRequest` 对象提供的 `onprogress` 事件。

使用 onprogress 事件，可以获取文件的下载进度信息，可以通过 loaded 和 total 属性获取当前已经下载的字节数和文件的总字节数，从而计算出当前的下载进度。

下面是一个使用 onprogress 事件获取文件下载进度的示例代码：

```js
const xhr = new XMLHttpRequest()
xhr.open('GET', 'file.url', true)
xhr.responseType = 'blob'
xhr.onprogress = function (event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100
    console.log(`Downloaded ${percentComplete}%`)
  }
}
xhr.onload = function (event) {
  // 文件下载完成
  const blob = xhr.response
}
xhr.send()
```

在上面的代码中，通过将 XMLHttpRequest 对象的 **responseType 设置为 blob**，来请求一个文件资源，然后监听 onprogress 事件，计算出当前的下载进度，并在控制台输出，最后在 onload 事件中获取到下载的文件内容。

## 手写创建一个 ajax 请求 {#p0-ajax}

一般来说，我们可以使用XMLHttpRequest对象来创建Ajax请求，其流程如下：

1. 创建XMLHttpRequest对象，通过调用其构造函数来实现。
2. 使用open()方法指定请求的方法、URL以及是否异步请求。
3. 使用setRequestHeader()方法设置请求头，例如设置请求的Content-Type。
4. 设置响应的回调函数，一般有onreadystatechange和onload两种方式。
5. 使用send()方法发送请求。

实现如下：

```javascript
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    function handler () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }

    const client = new XMLHttpRequest()
    // 如果是IE的内核ActiveXObject('Microsoft.XMLHTTP');
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    // 如果是post请求：client.setRequestHeader('Content-Type','application/X-WWW-form-urlencoded')
    client.send()
  })
  return promise
}

getJSON('/posts.json').then(function (json) {
  console.log('Contents: ' + json)
}, function (error) {
  console.error(' 出错了 ', error)
})
```

* `xhr.open()` 第一个参数是请求的方法，可以是GET、POST、PUT等；第二个参数是请求的URL；第三个参数表示是否异步请求。

* `setRequestHeader()`方法用于设置请求头，例如设置Content-Type，常见的值有application/json、application/x-www-form-urlencoded等

* `onreadystatechange回调函数`会在XMLHttpRequest对象的状态发生变化时触发

* 最后，调用send()方法发送请求。

调函数一般有哪些？

设置响应的回调函数，一般有 `onreadystatechange` 和 `onload` 两种方式；

在 XMLHttpRequest 对象中，onreadystatechange 和 onload 是两种不同的事件回调函数。

**onreadystatechange** :事件会在 readyState 的值改变时被触发，它会在请求过程中的每个状态改变时都被触发，从而可以通过 readyState
的值来判断请求的过程。一般来说，onreadystatechange 回调函数需要根据 readyState 的不同值做出不同的处理，如：

* readyState 为 1 （UNSENT）：代理被创建，但尚未调用 open() 方法；
* readyState 为 1 （已经调用 open() 方法）时，可以做一些请求初始化的工作；
* readyState 为 2 （已经调用 send() 方法）时，可以获取响应头信息；
* readyState 为 3 （正在接收数据）时，可以获取响应的部分数据；
* readyState 为 4 （已经接收到全部响应数据）时，可以对响应的数据进行处理。

**onload**: 而 onload 事件则是在整个请求过程完成后被触发，表示整个请求已经完成。这个回调函数通常用来处理响应数据，如将响应数据渲染到页面中等。

因此，onreadystatechange 和 onload 这两种回调函数的作用是不同的，需要根据不同的场景进行选择和使用。

## 如何检测网页空闲状态(一定时间内无操作) {#p2-web-idle}

首先，我们要知道什么是空闲？用户一定时间内，没有对网页进行任何操作，则当前网页为空闲状态。

用户操作网页，无非就是通过`鼠标`、`键盘`两个输入设备(暂不考虑手柄等设备)。因而我们可以监听相应的输入事件，来判断网页是否空闲(用户是否有操作网页)。

1. 监听鼠标移动事件`mousemove`；
2. 监听键盘按下事件`mousedown`；
3. 在用户进入网页后，设置延时跳转，如果触发以上事件，则移除延时器，并重新开始。

 网页空闲检测实现

实现点：

1. 需要使用防抖方式实现，避免性能问题
2. 监听`visibilitychange`事件，在页面隐藏时移除延时器，然后页面显示时继续计时，从而解决这个问题。

实现：

```js
/**
网页空闲检测
@param {() => void} callback 空闲时执行，即一定时长无操作时触发
@param {number} [timeout=15] 时长，默认15s，单位：秒
@param {boolean} [immediate=false] 是否立即开始，默认 false
@returns
 */
const onIdleDetection = (callback, timeout = 15, immediate = false) => {
  let pageTimer
  let beginTime = 0
  const onClearTimer = () => {
    pageTimer && clearTimeout(pageTimer)
    pageTimer = undefined
  }
  const onStartTimer = () => {
    const currentTime = Date.now()
    if (pageTimer && currentTime - beginTime < 100) {
      return
    }

    onClearTimer()
    beginTime = currentTime
    pageTimer = setTimeout(() => {
      callback()
    }, timeout1000)
  }

  const onPageVisibility = () => {
    // 页面显示状态改变时，移除延时器
    onClearTimer()

    if (document.visibilityState === 'visible') {
      const currentTime = Date.now()
      // 页面显示时，计算时间，如果超出限制时间则直接执行回调函数
      if (currentTime - beginTime >= timeout1000) {
        callback()
        return
      }
      // 继续计时
      pageTimer = setTimeout(() => {
        callback()
      }, timeout1000 - (currentTime - beginTime))
    }
  }

  const startDetection = () => {
    onStartTimer()
    document.addEventListener('mousedown', onStartTimer)
    document.addEventListener('mousemove', onStartTimer)
    document.addEventListener('visibilitychange', onPageVisibility)
  }

  const stopDetection = () => {
    onClearTimer()
    document.removeEventListener('mousedown', onStartTimer)
    document.removeEventListener('mousemove', onStartTimer)
    document.removeEventListener('visibilitychange', onPageVisibility)
  }

  const restartDetection = () => {
    onClearTimer()
    onStartTimer()
  }

  if (immediate) {
    startDetection()
  }

  return {
    startDetection,
    stopDetection,
    restartDetection
  }
}
```

 扩展

chrome浏览器其实提供了一个`Idle Detection`API，来实现网页空闲状态的检测，但是这个API还是一个实验性特性，并且Firefox与Safari不支持。

 参考文档

* [资料](https://juejin.cn/post/7344670957405405223)

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

## 不使用 setTimeout 来实现 setInterval {#p1-settimeout-setinterval}

**关键词**：实现setInterval、requestAnimationFrame实现setInterval、setTimeout实现setInterval

如果不使用 `setTimeout` 来实现 `setInterval`，可以使用 `requestAnimationFrame` 函数和时间戳来实现定时循环。下面是实现的代码示例：

**实现方式1**

```javascript
function mySetInterval (callback, interval) {
  let startTime = Date.now()
  let elapsedTime = 0

  function loop () {
    const currentTime = Date.now()
    const deltaTime = currentTime - startTime

    if (deltaTime >= interval) {
      callback()
      startTime = currentTime
    }

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)

  return {
    clear: function () {
      startTime = 0
      elapsedTime = 0
    }
  }
}
```

这个实现中，我们通过 `requestAnimationFrame` 函数来循环执行 `loop` 函数。在 `loop` 函数中，我们获取当前时间戳 `currentTime`，并计算与上一次执行的时间间隔 `deltaTime`
。如果 `deltaTime` 大于等于指定的间隔时间 `interval`，则执行回调函数 `callback`，并更新 `startTime` 为当前时间，以便下一次判断。

最后，返回一个具有 `clear` 方法的对象，用于清除定时器。调用 `clear` 方法时，将 `startTime` 和 `elapsedTime` 重置为初始值。

**实现方式2**

```js
const obj = {
  timer: null,
  setInterval: function (callback, interval) {
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const self = this
    const loop = function () {
      self.timer = requestAnimationFrame(loop)
      endTime = now()
      if (endTime - startTime >= interval) {
        startTime = endTime = now()
        callback && callback()
      }
    }
    this.timer = requestAnimationFrame(loop)
    return this.timer
  },
  clearInterval: function () {
    cancelAnimationFrame(this.timer)
  }
}

let count = 0
const timer = obj.setInterval(() => {
  console.log('interval...')
  count++
  if (count >= 3) {
    obj.clearInterval()
  }
}, 500)
```

**实现方式3**

使用 `setTimeout` 来实现

```ts
/**
setTimeout 版本
 */
function _setIntervalUseTimeout (
  fn: () => void,
  millisec: number,
  count?: number
) {
  let timer: number
  function interval () {
    if (typeof count === 'undefined' || count-- > 0) {
      timer = setTimeout(interval, millisec)
      try {
        fn()
      } catch (e: any) {
        count = 0
        throw e.toString()
      }
    }
  }
  timer = setTimeout(interval, millisec)
  return {
    clear: () => clearTimeout(timer)
  }
}
```

## 如何拦截 web 应用的请求 {#p0-interceptor}

**关键词**：web前端监听请求、前端拦截请求

在前端拦截和处理 Web 应用的所有请求，可以使用以下方法：

1. **使用 Fetch 或 XMLHttpRequest**：在前端代码中使用 Fetch API 或 XMLHttpRequest 对象发送请求。通过拦截 Fetch 或 XMLHttpRequest 对象的 open 和 send 方法，可以在请求发出前进行拦截和修改。这样可以捕获请求的相关信息，并进行相应的处理。

示例代码（使用 Fetch API）：

```javascript
const originalFetch = window.fetch
window.fetch = function (url, options) {
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', url)

  // 可以修改请求的相关信息
  // options.headers['Authorization'] = 'Bearer token';

  return originalFetch.apply(this, arguments)
}
```

2. **使用 Service Worker：Service Worker** 是一种在浏览器背后运行的脚本，可以拦截和处理网络请求。通过注册一个 Service Worker，可以在其中监听和处理请求事件。从而实现拦截和处理 Web 应用的所有请求。

示例代码：

```javascript
self.addEventListener('fetch', function (event) {
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', event.request.url)

  // 可以修改请求的相关信息
  // event.request.headers.set('Authorization', 'Bearer token');

  event.respondWith(fetch(event.request))
})
```

需要注意的是，前端拦截和处理请求只能在客户端进行，对于服务器端的请求无法拦截。此外，拦截和处理请求可能会对性能产生一定的影响，因此要根据实际情况进行权衡和调优。同时，对于一些敏感信息（如密码、个人信息等），应该谨慎处理，确保安全性。

3. **如果是使用是三方请求库， 比如 aixos** ， 可以直接使用三方库提供的能力

是的，使用 axios 也可以拦截请求。axios 提供了拦截器（interceptors）的功能，可以在请求发出前进行拦截和处理。

示例代码：

```javascript
import axios from 'axios'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发出前进行拦截和处理
  console.log('拦截到请求:', config.url)

  // 可以修改请求的相关信息
  // config.headers['Authorization'] = 'Bearer token';

  return config
}, function (error) {
  return Promise.reject(error)
})

// 发送请求
axios.get('/api/data')
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })
```

在上述代码中，通过使用 `interceptors.request` 方法，可以对请求进行拦截和处理。在拦截器函数中，可以修改请求的相关信息，并返回修改后的配置对象。

使用 axios 拦截请求只能在客户端进行，对服务器端的请求无法拦截。同样需要谨慎处理敏感信息，并确保安全性。

## web 网页如何禁止别人移除水印 {#p0-remove-water-pring}

明水印和暗水印的区别

前端水印可以分为明水印和暗水印两种类型。它们的区别如下：

1. 明水印：明水印是通过在文本或图像上覆盖另一层图像或文字来实现的。这种水印会明显地出现在页面上，可以用来显示版权信息或其他相关信息。

2. 暗水印：暗水印是指在文本或图像中隐藏相关信息的一种技术。这种水印不会直接出现在页面上，只有在特殊的程序或工具下才能被检测到。暗水印通常用于保护敏感信息以及追踪网页内容的来源和版本。

 添加明水印手段有哪些

可以参考这个文档： [资料](https://zhuanlan.zhihu.com/p/374734095)

总计一下：

1. 重复的dom元素覆盖实现： 在页面上覆盖一个position:fixed的div盒子，盒子透明度设置较低，设置pointer-events: none;样式实现点击穿透，在这个盒子内通过js循环生成小的水印div，每个水印div内展示一个要显示的水印内容

2. canvas输出背景图： 绘制出一个水印区域，将这个水印通过toDataURL方法输出为一个图片，将这个图片设置为盒子的背景图，通过backgroud-repeat：repeat；样式实现填满整个屏幕的效果。

3. svg实现背景图： 与canvas生成背景图的方法类似，只不过是生成背景图的方法换成了通过svg生成

4. 图片加水印

 css 添加水印的方式， 如何防止用户删除对应的 css ， 从而达到去除水印的目的

使用 CSS 添加水印的方式本身并不能完全防止用户删除对应的 CSS 样式，从而删除水印。但是，可以采取一些措施来增加删除难度，提高水印的防伪能力。以下是一些常见的方法：

1. 调用外部CSS文件：将水印样式单独设置在一个CSS文件内，并通过外链的方式在网站中调用，可以避免用户通过编辑页面HTML文件或内嵌样式表的方式删除水印。

2. 设置样式为 !important：在CSS样式中使用 !important 标记可以避免被覆盖。但是，这种方式会影响网页的可读性，需慎重考虑。

3. 添加自定义类名：通过在CSS样式中加入自定义的class类名，可以防止用户直接删掉该类名，进而删除水印。但是，用户也可以通过重新定义该类名样式来替换水印。

4. 将水印样式应用到多个元素上：将水印样式应用到多个元素上，可以使得用户删除水印较为困难。例如，在网站的多个位置都加上"Power by XXX"的水印样式。

5. 使用JavaScript动态生成CSS样式：可以监听挂载水印样式的dom 节点， 如果用户改变了该 dom , 重新生成 对应的水印挂载上去即可。 这种方法可通过JS动态生成CSS样式，从而避免用户直接在网页源文件中删除CSS代码。但需要注意的是，这种方案会稍稍加重网页的加载速度，需要合理权衡。

6. 混淆CSS代码：通过多次重复使用同一样式，或者采用CSS压缩等混淆手段，可以使CSS样式表变得复杂难懂，增加水印被删除的难度。

7. 采用图片水印的方式：将水印转化为一个透明的PNG图片，然后将其作为网页的背景图片，可以更有效地防止水印被删除。

8. 使用SVG图形：可以将水印作为SVG图形嵌入到网页中进行展示。由于SVG的矢量性质，这种方式可以保证水印在缩放或旋转后的清晰度，同时也增加了删除难度。

 暗水印是如何把水印信息隐藏起来的

暗水印的基本原理是在原始数据（如文本、图像等）中嵌入信息，从而实现版权保护和溯源追踪等功能。暗水印把信息隐藏在源数据中，使得人眼难以察觉，同时对源数据的影响尽可能小，保持其自身的特征。

一般来说，暗水印算法主要包括以下几个步骤：

1. 水印信息处理：将待嵌入的信息经过处理和加密后，转化为二进制数据。

2. 源数据处理：遍历源数据中的像素或二进制数据，根据特定规则对其进行调整，以此腾出空间插入水印二进制数据。

3. 嵌入水印：将水印二进制数据插入到源数据中的指定位置，以某种方式嵌入到源数据之中。

4. 提取水印：在使用暗水印的过程中，需要从带水印的数据中提取出隐藏的水印信息。提取水印需要使用特定的解密算法和提取密钥。

暗水印的一个关键问题是在嵌入水印的过程中，要保证水印对源数据的伤害尽可能的小，同时嵌入水印后数据的分布、统计性质等不应发生明显变化，以更好地保持数据的质量和可视效果。

关于加水印的问题， 可以看这篇文档： [资料](https://github.com/pro-collection/interview-question/issues/351)

关于如何防止移除水印：

可以通过监听 DOM 的变化来检测是否有人删除水印，可以使用 `MutationObserver API`。
`MutationObserver` 可以观察 DOM 树的变化，并在变化发生时触发回调函数。你可以在回调函数中检查是否有水印被删除，然后采取相应的措施。

以下是一个简单的示例代码，演示了如何使用 MutationObserver 监听 DOM 变化：

```javascript
// 目标节点
const targetNode = document.body

// 创建 MutationObserver 实例
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    // 检查是否有子节点被删除
    if (mutation.removedNodes.length > 0) {
      // 在此处判断是否有水印被删除
      // 如果水印被删除，则重新插入水印的 DOM 元素到目标节点
      // 例如： targetNode.appendChild(watermarkElement);
    }
  }
})

// 配置 MutationObserver
const config = { childList: true, subtree: true }

// 开始观察目标节点
observer.observe(targetNode, config)
```

在上述代码中，我们创建了一个 MutationObserver 实例，并通过 `observe` 方法将其绑定到目标节点上。在回调函数中，我们使用 `mutation.removedNodes` 来检查是否有子节点被删除，如果发现水印被删除，则可以采取相应的措施来重新插入水印的 DOM 元素。

需要注意的是，MutationObserver API 是现代浏览器提供的功能，在老旧的浏览器中可能不支持。因此，在实际使用时，你需要对浏览器的兼容性进行测试和处理。

另外，如果水印被删除后立即加回去，你可以在检测到水印被删除时，立即执行插入水印的代码，以确保水印能够迅速地重新出现在页面上。

## 如何实现大文件断点续传 {#p0-break-point-upload}

前端实现断点续传一般涉及到以下几个步骤：

1. 分片上传：将大文件分割成多个小的文件块。可以使用 JavaScript 的 `File` 对象的 `slice` 方法来实现分片。

2. 上传文件块：使用 XMLHttpRequest 或 Fetch API 发送每个文件块到服务器。可以将每个文件块的索引、总文件大小等信息一同发送到服务器。

3. 保存上传进度：在每个文件块上传成功后，可以将已上传的块数、已上传的字节数等信息保存到本地，以便在继续上传时恢复进度。

4. 续传：在继续上传时，先从本地恢复已上传的进度信息。然后根据已上传的字节数，计算出下一个文件块的起始位置，然后继续上传剩余的文件块。

5. 合并文件块：在所有文件块都上传完成后，服务器可以将这些文件块合并为完整的文件。可以通过将所有文件块的内容拼接在一起或使用服务器端的工具进行合并。

需要注意的是，断点续传的实现还需要服务器端的支持。服务器端需要接收和处理分片上传的请求，并保存和管理已上传的文件块，以便在续传时恢复文件的完整性。因此，前端实现断点续传需要和后端进行协作。

## 如何通过设置失效时间清除本地存储的数据？ {#p0-store-expired}

要清除本地存储的数据，可以通过设置失效时间来实现。以下是一种常见的方法：

1. 将数据存储到本地存储中，例如使用localStorage或sessionStorage。

2. 在存储数据时，同时设置一个失效时间。可以将失效时间存储为一个时间戳或特定的日期时间。

3. 在读取数据时，检查当前时间是否超过了失效时间。如果超过了失效时间，则认为数据已过期，需要清除。

4. 如果数据已过期，则使用localStorage.removeItem(key)或sessionStorage.removeItem(key)方法删除该数据。

以下是一个示例代码：

```javascript
// 存储数据
function setLocalStorageData (key, data, expiration) {
  const item = {
    data,
    expiration
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// 读取数据
function getLocalStorageData (key) {
  let item = localStorage.getItem(key)
  if (item) {
    item = JSON.parse(item)
    if (item.expiration && new Date().getTime() > item.expiration) {
      // 数据已过期，清除数据
      localStorage.removeItem(key)
      return null
    }
    return item.data
  }
  return null
}

// 示例用法
const data = { name: 'John', age: 30 }
const expiration = new Date().getTime() + 36001000 // 设置失效时间为当前时间后的1小时
setLocalStorageData('user', data, expiration)

const storedData = getLocalStorageData('user')
console.log(storedData)
```

在示例代码中，setLocalStorageData函数用于存储数据，并接受一个失效时间参数。getLocalStorageData函数用于读取数据，并检查失效时间是否已过期。如果数据已过期，则清除数据。示例中的失效时间设置为当前时间后的1小时。

## 如何判断dom元素是否在可视区域 {#p0-element-visible}

判断 DOM 元素是否在可视区域可以使用以下方法：

1. getBoundingClientRect() 方法

该方法返回元素的大小及其相对于视口的位置，包括 top、right、bottom、left 四个属性。我们可以根据这四个属性来判断元素是否在可视区域内。

```javascript
function isInViewport (element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
 rect.left >= 0 &&
 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Example usage
const element = document.getElementById('my-element')
if (isInViewport(element)) {
  console.log('Element is in viewport')
} else {
  console.log('Element is not in viewport')
}
```

2. IntersectionObserver API

该 API 可以观察元素与其祖先元素或视口交叉的情况，并且可以设置回调函数，当元素的可见性发生变化时会调用该回调函数。

```javascript
function callback (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is in viewport')
    } else {
      console.log('Element is not in viewport')
    }
  })
}

const observer = new IntersectionObserver(callback)

const element = document.getElementById('my-element')
observer.observe(element)
```

使用 IntersectionObserver API 的优点是可以减少不必要的计算和事件监听，提高了性能。

## 移动端如何实现上拉加载，下拉刷新？{#p0-mobile-scroll}

移动端实现上拉加载和下拉刷新通常使用一些特定的库或框架来简化开发。以下是两种常见的实现方式：

1. 使用第三方库：一些流行的移动端UI库（如iScroll、BetterScroll、Ant Design Mobile等）提供了上拉加载和下拉刷新的功能，你可以使用它们来实现。这些库通常提供了易于使用的API和配置选项，可以在你的应用中轻松地集成上拉加载和下拉刷新功能。

2. 自定义实现：如果你想更自定义地实现上拉加载和下拉刷新，可以使用原生的触摸事件（如touchstart、touchmove、touchend等）和滚动事件（如scroll）来监测用户的手势操作和滚动行为，并根据这些事件来触发相应的加载或刷新逻辑。你可以监听触摸事件来检测用户的下拉或上拉手势，当达到一定的阈值时，触发刷新或加载的操作。同时，你还需要监听滚动事件来判断当前滚动位置是否已经到达页面底部，从而触发上拉加载的操作。

当自定义实现上拉加载和下拉刷新时，你可以使用JavaScript和HTML/CSS来编写代码。下面是一个简单的示例，演示了如何通过原生事件来实现上拉加载和下拉刷新的功能：

HTML 结构：

```html
<!DOCTYPE html>
<html>
<head>
 <title>上拉加载和下拉刷新示例</title>
 <style>
 // 用于展示加载和刷新状态的样式 */
 .loading {
 text-align: center;
 padding: 10px;
 background-color: #f1f1f1;
 }

 .refresh {
 text-align: center;
 padding: 10px;
 background-color: #f1f1f1;
 }
 </style>
</head>
<body>
 <div id="content">
 <!-- 内容区域 -->
 </div>
 <div id="loading" class="loading">
 加载中...
 </div>
 <div id="refresh" class="refresh">
 下拉刷新
 </div>

 <script src="your_script.js"></script>
</body>
</html>
```

JavaScript 代码（your_script.js）：

```javascript
// 获取相关元素
const content = document.getElementById('content')
const loading = document.getElementById('loading')
const refresh = document.getElementById('refresh')

let isRefreshing = false
let isLoading = false

// 监听触摸事件
let startY = 0
let moveY = 0
content.addEventListener('touchstart', function (event) {
  startY = event.touches[0].pageY
})

content.addEventListener('touchmove', function (event) {
  moveY = event.touches[0].pageY

  // 下拉刷新
  if (moveY - startY > 100 && !isRefreshing) {
    refresh.innerHTML = '释放刷新'
  }

  // 上拉加载
  const scrollTop = content.scrollTop
  const scrollHeight = content.scrollHeight
  const offsetHeight = content.offsetHeight
  if (scrollTop + offsetHeight >= scrollHeight && !isLoading) {
    loading.style.display = 'block'
  }
})

content.addEventListener('touchend', function (event) {
  // 下拉刷新
  if (moveY - startY > 100 && !isRefreshing) {
    refresh.innerHTML = '刷新中...'
    simulateRefresh()
  }

  // 上拉加载
  const scrollTop = content.scrollTop
  const scrollHeight = content.scrollHeight
  const offsetHeight = content.offsetHeight
  if (scrollTop + offsetHeight >= scrollHeight && !isLoading) {
    loading.style.display = 'block'
    simulateLoad()
  }

  // 重置状态
  startY = 0
  moveY = 0
})

// 模拟刷新
function simulateRefresh () {
  isRefreshing = true
  setTimeout(function () {
    // 刷新完成后的操作
    refresh.innerHTML = '刷新成功'
    isRefreshing = false
  }, 2000)
}

// 模拟加载
function simulateLoad () {
  isLoading = true
  setTimeout(function () {
    // 加载完成后的操作
    loading.style.display = 'none'
    isLoading = false
  }, 2000)
}
```

上面的代码使用了`touchstart`、`touchmove`和`touchend`事件来监测用户的手势操作，实现了下拉刷新和上拉加载的功能。通过修改`refresh`和`loading`元

素的内容和样式，可以实现相应的状态展示效果。

## 使用 ajax 封装一个上传文件的函数 {#p0-upload-file}

下面是一个使用 AJAX 封装的上传文件函数的示例代码：

```javascript
function uploadFile (file, url, progressCallback, successCallback, errorCallback) {
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  // 将文件添加到 FormData 对象
  formData.append('file', file)

  xhr.open('POST', url, true)

  // 监听上传进度
  xhr.upload.addEventListener('progress', function (event) {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100)
      // 调用进度回调函数
      progressCallback(progress)
    }
  })

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // 上传成功
        // 解析响应数据
        const response = JSON.parse(xhr.responseText)
        // 调用成功回调函数
        successCallback(response)
      } else {
        // 上传失败
        // 创建错误对象
        const error = new Error(`File upload failed with status ${xhr.status}`)
        // 调用错误回调函数
        errorCallback(error)
      }
    }
  }

  // 发送请求
  xhr.send(formData)
}

// 使用示例
const fileInput = document.getElementById('file-input')
const uploadButton = document.getElementById('upload-button')
const progressElement = document.getElementById('progress')
const statusElement = document.getElementById('status')

uploadButton.addEventListener('click', function () {
  const file = fileInput.files[0]
  const url = 'https://api.example.com/upload'

  uploadFile(
    file,
    url,
    function (progress) {
      // 更新进度
      progressElement.textContent = `Upload Progress: ${progress}%`
    },
    function (response) {
      // 上传成功
      statusElement.textContent = 'Upload Successful'
      console.log('Response:', response)
    },
    function (error) {
      // 上传失败
      statusElement.textContent = 'Upload Failed'
      console.error('Error:', error)
    }
  )
})
```

在上述示例代码中，定义了一个 `uploadFile` 函数用于上传文件。该函数接收文件对象、上传 URL、进度回调函数、成功回调函数和错误回调函数作为参数。

函数内部通过创建 `XMLHttpRequest` 对象，将文件添加到 `FormData` 对象，并使用 `POST` 方法发送请求到指定的 URL。同时，通过监听 `upload` 事件来获取上传进度，并调用进度回调函数进行更新。在请求的状态改变时，根据响应状态码判断上传成功与否，并调用相应的回调函数。

使用示例中，通过监听按钮点击事件，获取选择的文件对象，并调用 `uploadFile` 函数进行文件上传。在回调函数中更新进度和状态信息，并处理成功和失败的情况。

## ajax 取消请求 {#p0-cancel}

**`xhr.abort()` 方法用于中止当前的请求**。调用该方法会导致 XHR 对象触发 abort 事件，且触发 readystatechange 事件的处理函数，xhr.readyState 的值将变为 0。

下面是一个示例代码，展示了如何使用标志位实现取消请求的效果：

```javascript
let isRequestCanceled = false

function sendGetRequest (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && !isRequestCanceled) {
      if (xhr.status === 200) {
        // 请求成功
        const response = JSON.parse(xhr.responseText)
        callback(null, response)
      } else {
        // 请求失败
        const error = new Error(`Request failed with status ${xhr.status}`)
        callback(error, null)
      }
    }
  }

  xhr.send()

  // 取消请求
  function cancelRequest () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      xhr.abort()
      isRequestCanceled = true
      callback(new Error('Request canceled'), null)
    }
  }

  // 返回取消请求的函数
  return cancelRequest
}

// 使用示例
const apiUrl = 'https://api.example.com/data'
const cancelRequest = sendGetRequest(apiUrl, (error, response) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Response:', response)
  }
})

// 取消请求
cancelRequest()
```

在上述示例代码中，添加了一个 `cancelRequest` 函数用于取消请求。该函数会在请求发送后立即返回，并中止请求的发送。同时，将标志位 `isRequestCanceled` 设为 true，并通过回调函数返回一个错误对象，表示请求被取消。

需要注意的是，虽然通过标志位模拟了请求的取消，但实际上请求已经发送到服务器并得到了响应。只是在客户端这边忽略了响应结果。在真实的网络请求中，服务器仍然会继续处理请求并返回响应，但客户端会忽略该响应。

**取消ajax请求的意义**

* 已发出的请求可能仍然会到达后端

* 取消后续的回调处理，避免多余的回调处理，以及特殊情况，先发出的后返回，导致回调中的数据错误覆盖

* 取消loading效果，以及该请求的其他交互效果，特别是在单页应用中，A页面跳转到B页面之后，A页面的请求应该取消，否则回调中的一些处理可能影响B页面

* 超时处理，错误处理等都省去了，节约资源

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

## 如何优化大规模 dom 操作的场景 {#p0-batch-dom-operation}

在处理大规模DOM操作的场景中，可以采取以下一些优化策略：

1. 使用批量操作：避免频繁地进行单个DOM操作，而是将多个操作合并为一个批量操作。例如，使用`DocumentFragment`来创建一个离线的DOM片段，将多个元素一次性添加到片段中，然后再将整个片段插入到文档中。这样可以减少DOM操作的次数，提高性能。

2. 避免重复访问和查询：避免在循环或递归操作中重复访问和查询DOM元素。在执行循环或递归操作前，先将需要操作的DOM元素保存在变量中，以减少重复查询的开销。

3. 使用虚拟DOM（Virtual DOM）：虚拟DOM是一种将真实DOM结构映射到JavaScript对象的技术。通过在JavaScript中对虚拟DOM进行操作，然后再将变更应用到真实DOM上，可以减少对真实DOM的直接操作次数，提高性能。常见的虚拟DOM库有React和Vue等。

4. 分割任务：将大规模DOM操作拆分成多个小任务，并使用`requestAnimationFrame`或`setTimeout`等方法在每个任务之间进行异步处理，以避免长时间阻塞主线程，提高页面的响应性能。

5. 使用事件委托：利用事件冒泡机制，将事件处理程序绑定到DOM结构的父元素上，通过事件委托的方式处理子元素的事件。这样可以减少事件处理程序的数量，提高性能。

6. 避免频繁的重绘和重排：DOM的重绘（Repaint）和重排（Reflow）是比较昂贵的操作，会导致页面重新布局和重新渲染。尽量避免频繁地修改样式属性，可以使用CSS类进行批量的样式变更，或使用`display: none`将元素隐藏起来进行操作，最后再显示出来。

7. 使用合适的工具和库：选择合适的工具和库来处理大规模DOM操作的场景。例如，使用专门的数据绑定库或UI框架，如React、Vue或Angular等，它们提供了高效的组件化和数据更新机制，能够优化DOM操作的性能。

通过以上优化策略，可以减少对DOM的频繁操作，提高大规模DOM操作场景下的性能和响应性能。

## 如何实现网页加载进度条？ {#p1-loading}

可以通过 `window.performance` 对象来监听页面资源加载进度。该对象提供了各种方法来获取资源加载的详细信息。

可以使用 `performance.getEntries()` 方法获取页面上所有的资源加载信息。可以使用该方法来监测每个资源的加载状态，计算加载时间，并据此来实现一个资源加载进度条。

下面是一个简单的实现方式：

```javascript
const resources = window.performance.getEntriesByType('resource')
const totalResources = resources.length
let loadedResources = 0

resources.forEach((resource) => {
  if (resource.initiatorType !== 'xmlhttprequest') {
    // 排除 AJAX 请求
    resource.onload = () => {
      loadedResources++
      const progress = Math.round((loadedResources / totalResources) * 100)
      updateProgress(progress)
    }
  }
})

function updateProgress (progress) {
  // 更新进度条
}
```

该代码会遍历所有资源，并注册一个 `onload` 事件处理函数。当每个资源加载完成后，会更新 `loadedResources` 变量，并计算当前的进度百分比，然后调用 `updateProgress()` 函数来更新进度条。需要注意的是，这里排除了 AJAX 请求，因为它们不属于页面资源。

当所有资源加载完成后，页面就会完全加载。

 实现进度条

网页加载进度条可以通过前端技术实现，一般的实现思路是通过监听浏览器的页面加载事件和资源加载事件，来实时更新进度条的状态。下面介绍两种实现方式。

 1. 使用原生进度条

在 HTML5 中提供了 `progress` 元素，可以通过它来实现一个原生的进度条。

```html
<progress id="progressBar" value="0" max="100"></progress>
```

然后在 JavaScript 中，监听页面加载事件和资源加载事件，实时更新 `progress` 元素的 `value` 属性。

```javascript
const progressBar = document.getElementById('progressBar')

window.addEventListener('load', () => {
  progressBar.value = 100
})

document.addEventListener('readystatechange', () => {
  const progress = Math.floor((document.readyState / 4) * 100)
  progressBar.value = progress
})
```

 2. 使用第三方库

使用第三方库可以更加方便地实现网页加载进度条，下面以 `nprogress` 库为例：

1. 安装 `nprogress` 库

```bash
bashCopy codenpm install nprogress --save
```

2. 在页面中引入 `nprogress.css` 和 `nprogress.js`

```html
<link rel="stylesheet" href="/node_modules/nprogress/nprogress.css">
<script src="/node_modules/nprogress/nprogress.js"></script>
```

3. 在 JavaScript 中初始化 `nprogress` 并监听页面加载事件和资源加载事件

```javascript
// 初始化 nprogress
NProgress.configure({ showSpinner: false })

// 监听页面加载事件
window.addEventListener('load', () => {
  NProgress.done()
})

// 监听资源加载事件
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    NProgress.start()
  } else if (document.readyState === 'complete') {
    NProgress.done()
  }
})
```

使用 `nprogress` 可以自定义进度条的样式，同时也提供了更多的 API 供我们使用，比如说手动控制进度条的显示和隐藏，以及支持 Promise 和 Ajax 请求的进度条等等。

## 前端如何实现截图？ {#p0-screenshot}

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

## 文件上传和上传文件解析的原理是啥？

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
