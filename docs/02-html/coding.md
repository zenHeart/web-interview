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
 /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 设置一个高度限制，模拟文本“收起”时的状态 */
 max-height: 60px; /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 这个值根据需要调整 */
 overflow: hidden;
 position: relative;
 line-height: 20px; /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 根据实际情况调整 */
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
function calculateChunks(fileSize, chunkSize) {
 // 文件总大小（byte），切片大小（byte）
 const chunksCount = Math.ceil(fileSize / chunkSize);
 return chunksCount;
}

// 示例：文件大小 52MB，切片大小 5MB
const fileSize = 52 issues_data.csv proCollectionInterviewQuesiont.sh 1024 issues_data.csv proCollectionInterviewQuesiont.sh 1024; // 52MB
const chunkSize = 5 issues_data.csv proCollectionInterviewQuesiont.sh 1024 issues_data.csv proCollectionInterviewQuesiont.sh 1024; // 5MB
const chunksCount = calculateChunks(fileSize, chunkSize);

console.log(`需要切片数量: ${chunksCount}`);
```

 注意事项

* **网络条件**：切片大小可能需要根据网络环境调整。在网络条件较差的情况下，选择更小的切片大小可能更加可靠。
* **服务器限制**：某些服务器或云服务可能对上传文件的大小有限制。确保了解和遵守这些限制，以避免上传失败。
* **并发上传**：在选择切片大小和数量时，考虑是否会并行上传多个切片，因为这也会影响上传速度和效率。

通过以上步骤和考虑因素，你可以合理地决定大文件上传时的切片数量，以优化上传过程的效率和可靠性。
