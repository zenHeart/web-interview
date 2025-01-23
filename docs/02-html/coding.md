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
