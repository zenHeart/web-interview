# 标签

## doctype(文档类型) 的作用是什么？ {#p0-doctype}

<Answer>

在 html 标准未统一之前,浏览器都有自己的渲染规则，在标准统一后,为了兼容旧版本,存在两种渲染模式。

* **quirks mode** 怪异模式,浏览器自行决定
* **almost standards mode** 几乎标准模式,浏览器自行决定
* **standards mode** 标准模式,尽可能遵守 html 规范

> doctype 就是用来限定文档的渲染模式

可以利用 `document.doctype` 获取该配置

此外还存在如下 [DTD](https://www.w3.org/QA/2002/04/valid-dtd-list.html)

* [quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
* [doctype](https://hsivonen.fi/doctype)
* [whatwg](https://quirks.spec.whatwg.org)

</Answer>

## 说一下什么是语义化标签 {#p0-semantic-tag}

在 HTML 中，语义化标签是具有明确含义的标签，它们可以更好地描述网页的结构和内容，提高代码的可读性、可维护性以及对搜索引擎的优化。以下是一些常见的语义化标签：

**一、文档结构相关标签**

1. `<header>`：

* 定义文档的页眉部分，通常包含网站的标志、导航栏、搜索框等。
* 例如：

 ```html
 <header>
 <h1>My Website</h1>
 <nav>
 <ul>
 <li><a href="#">Home</a></li>
 <li><a href="#">About</a></li>
 <li><a href="#">Contact</a></li>
 </ul>
 </nav>
 </header>
 ```

2. `<nav>`：

* 用于定义导航链接的部分，可以包含网站的主要导航菜单、侧边栏导航等。
* 例如：

 ```html
 <nav>
 <ul>
 <li><a href="#">Page 1</a></li>
 <li><a href="#">Page 2</a></li>
 <li><a href="#">Page 3</a></li>
 </ul>
 </nav>
 ```

3. `<footer>`：

* 定义文档的页脚部分，通常包含版权信息、联系方式、相关链接等。
* 例如：

 ```html
 <footer>
 <p>Copyright © 2024. All rights reserved.</p>
 </footer>
 ```

4. `<main>`：

* 表示文档的主要内容部分，每个页面应该只有一个`<main>`元素。
* 例如：

 ```html
 <main>
 <article>
 <h2>Article Title</h2>
 <p>Article content goes here.</p>
 </article>
 </main>
 ```

**二、内容组织相关标签**

1. `<article>`：

* 表示一个独立的、完整的内容块，如一篇博客文章、新闻报道、论坛帖子等。
* 例如：

 ```html
 <article>
 <h2>News Article</h2>
 <p>Article text here.</p>
 </article>
 ```

2. `<section>`：

* 用于对页面内容进行分组和划分，通常包含一个主题相关的内容块。
* 例如：

 ```html
 <section>
 <h2>Section Title</h2>
 <p>Section content goes here.</p>
 </section>
 ```

3. `<aside>`：

* 表示与主要内容相关但可以独立存在的侧边栏内容，如广告、相关链接、注释等。
* 例如：

 ```html
 <main>
 <article>
 <h2>Main Article</h2>
 <p>Article content.</p>
 </article>
 <aside>
 <h3>Related Links</h3>
 <ul>
 <li><a href="#">Link 1</a></li>
 <li><a href="#">Link 2</a></li>
 </ul>
 </aside>
 </main>
 ```

**三、文本内容相关标签**

1. `<h1>`到`<h6>`：

* 标题标签，用于表示不同级别的标题，`<h1>`为最高级别，`<h6>`为最低级别。
* 例如：

 ```html
 <h1>Main Title</h1>
 <h2>Subtitle</h2>
 ```

2. `<p>`：

* 段落标签，用于包含文本段落。
* 例如：

 ```html
 <p>This is a paragraph of text.</p>
 ```

3. `<strong>`和`<em>`：

* `<strong>`用于表示强烈强调的文本，通常显示为粗体。`<em>`用于表示强调的文本，通常显示为斜体。
* 例如：

 ```html
 <p>This is <strong>very important</strong> text. And this is <em>emphasized</em> text.</p>
 ```

4. `<blockquote>`：

* 引用块标签，用于引用大段的文本内容。
* 例如：

 ```html
 <blockquote>
 <p>“This is a long quote from someone.”</p>
 </blockquote>
 ```

5. `<q>`：

* 短引用标签，用于引用简短的文本内容，通常会自动加上引号。
* 例如：

 ```html
 <p>He said, <q>Hello!</q></p>
 ```

## meta 标签的作用 {#p0-meta-tag}

## header 的作用 {#p1-header-tag}

## 请解释 `<script>、<script async> 和 <script defer>` 的区别 {#p0-script-async-defer}

<Answer>
async:

* 异步加载
* 加载完立即执行
* 不保证执行顺序

defer:

* 异步加载
* DOM 解析完成后执行
* 按照顺序执行

</Answer>

## 为什么通常推荐将 CSS `<link>` 放置在 `<head></head>` 之间，而将 JS `<script>` 放置在 `</body>` 之前？你知道有哪些例外吗？{#p2-css-link-js-script}

## html 元素类型 {#p2-html-element-type}

**一、块级元素**

1. 特点：

* 独占一行，在页面中垂直布局。
* 可以设置宽度、高度、外边距（margin）和内边距（padding）等属性。
* 即使不设置宽度，也会自动占据整行的宽度。

2. 常见的块级元素有：

* `<div>`：通用的块级容器元素，可用于划分页面的不同部分。
* `<p>`：段落元素，用于包含文本段落。
* `<h1>`到`<h6>`：标题元素，用于表示不同级别的标题。
* `<ul>`和`<ol>`：无序列表和有序列表元素。
* `<li>`：列表项元素，用于包含在`<ul>`或`<ol>`中。
* `<blockquote>`：引用块元素，用于引用大段文本。
* `<form>`：表单元素，用于包含表单控件。
* `<table>`：表格元素，用于创建表格结构。

**二、行内元素**

1. 特点：

* 不会独占一行，多个行内元素可以在同一行内水平排列。
* 宽度和高度由内容决定，不能直接设置宽度和高度。
* 可以设置内边距和外边距，但上下边距的效果可能与块级元素不同。

2. 常见的行内元素有：

* `<span>`：通用的行内容器元素，可用于包裹文本或其他行内元素。
* `<a>`：链接元素，用于创建超链接。
* `<img>`：图像元素，用于插入图片。
* `<strong>`和`<em>`：强调元素，分别用于表示强烈强调和强调的文本。
* `<input>`：输入框元素，用于表单中的用户输入。
* `<button>`：按钮元素，用于触发特定的操作。
* `<label>`：标签元素，通常与表单控件关联。

此外，还有一些元素具有特殊的显示特性，既可以表现为块级元素，也可以表现为行内元素，例如`<li>`元素在某些情况下可以作为块级元素显示，也可以通过 CSS 设置为行内元素显示。通过 CSS 的`display`属性，可以改变元素的默认显示方式，将块级元素转换为行内元素，或将行内元素转换为块级元素。

HTML 中的行内元素（Inline elements）和块级元素（Block-level elements）在布局行为、外观以及如何参与文档流方面有所不同。以下是它们的主要区别：

| 特性 | 块级元素(Block-level elements) | 行内元素(Inline elements) |
| ------------------- | -------------------------------------- | ----------------------------------------------- |
| **布局** | 通常开始于新的一行 | 在同一行内水平排列 |
| **宽度** | 默认填满父容器宽度 | 宽度由内容决定 |
| **高度** | 可以设置高度 | 高度通常由内容决定 |
| **外边距(margin)** | 可以设置上下左右的外边距 | 只能设置左右外边距 |
| **内边距(padding)** | 可以设置上下左右的内边距 | 只能设置左右内边距 |
| **内容** | 可以包含其他块级或行内元素 | 通常包含文本或数据 |
| **堆叠方式** | 垂直堆叠 | 水平方堆放齐 |
| **盒模型** | 表现为完整的盒子模型 | 只表现部分盒子模型 |
| **换行** | 前后有换行空间 | 默认没有前后换行空间 |
| **常见标签** | `<div>`, `<p>`, `<section>`, `<h1>` 等 | `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` 等 |

即使块级元素和行内元素默认特征不同，你还是可以通过 **CSS 的`display`属性来更改它们的行为**。例如，`display: inline;`会让块级元素表现得像行内元素，并且它们将在其父容器的同一行内显示。另一方面，`display: block;`会让行内元素表现得像块级元素。

## iframe有那些缺点？ {#p1-iframe-disadvantages}

## 页面导入样式时，使用link和@import有什么区别？ {#p2-link-import}

## a 标签保存文件 {#p2-a-tag-save-file}

在浏览器中，通常情况下无法直接通过点击一个`<a>`标签将其指向的内容保存为文件。但是可以通过一些特定的方法来实现类似的功能：

**一、使用服务器端响应**

1. 服务器端生成文件：如果要让用户下载一个文件，可以在服务器端生成该文件，并设置适当的响应头，让浏览器将响应内容视为一个文件进行下载。

* 例如，在后端使用 Node.js 和 Express 框架，可以这样设置响应头来提供一个文件下载：

```javascript
const express = require('express')
const app = express()
const fs = require('fs')

app.get('/download', (req, res) => {
  const fileStream = fs.createReadStream('path/to/your/file')
  res.setHeader('Content-disposition', 'attachment; filename=yourFileName.ext')
  res.setHeader('Content-type', 'application/octet-stream')
  fileStream.pipe(res)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

* 在上面的例子中，当用户访问`/download`路径时，服务器会将指定的文件以附件的形式提供给浏览器进行下载。

2. `<a>`标签链接到服务器端路径：在前端，可以使用一个`<a>`标签链接到服务器端提供文件下载的路径。

```html
<a href="/download">下载文件</a>
```

**二、使用 JavaScript 和 Blob 对象**

1. 创建 Blob 对象：可以使用 JavaScript 创建一个 Blob 对象，该对象包含要保存的文件内容。

* 例如：

```javascript
const data = 'This is the content of the file'
const blob = new Blob([data], { type: 'text/plain' })
```

2. 创建临时 URL：使用`URL.createObjectURL()`方法创建一个临时的 URL，指向创建的 Blob 对象。

* `const url = URL.createObjectURL(blob);`

3. 使用`<a>`标签和 JavaScript：创建一个隐藏的`<a>`标签，设置其`href`属性为临时 URL，并模拟点击该标签来触发下载。

* 例如：

```javascript
const a = document.createElement('a')
a.style.display = 'none'
a.href = url
a.download = 'yourFileName.txt'
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
URL.revokeObjectURL(url)
```

这种方法的局限性在于，它只能在浏览器的安全限制范围内工作，并且可能受到同源策略的限制。此外，不同浏览器对于这种方法的支持程度也可能有所不同。

## HTML 中的 input 标签有哪些 type {#p2-input-tag-type}

* created_at: 2024-10-18T15:07:49Z
* updated_at: 2024-10-18T15:07:49Z
* labels: web应用场景
* milestone: 初

**关键词**：input 标签 type 属性

HTML 中的`<input>`标签有多种`type`属性值，以下是一些常见的类型：

**一、文本输入类型**

1. `text`：

* 用于输入单行文本。这是最常见的输入类型之一，用户可以在输入框中输入任何文本内容。
* 例如：`<input type="text">`。

2. `password`：

* 用于输入密码，输入的内容会以掩码形式显示，以保护密码的安全性。
* 例如：`<input type="password">`。

**二、数值输入类型**

1. `number`：

* 用于输入数值。可以设置最小值、最大值、步长等属性来限制输入的范围。
* 例如：`<input type="number" min="0" max="100" step="1">`。

2. `range`：

* 以滑块的形式显示，用户可以通过拖动滑块来选择一个数值范围内的值。
* 例如：`<input type="range" min="0" max="100">`。

**三、日期和时间输入类型**

1. `date`：

* 用于选择日期。通常会显示一个日期选择器，方便用户选择日期。
* 例如：`<input type="date">`。

2. `time`：

* 用于选择时间。可以选择小时、分钟和秒。
* 例如：`<input type="time">`。

3. `datetime-local`：

* 用于选择日期和时间，包括本地时区信息。
* 例如：`<input type="datetime-local">`。

**四、选择类型**

1. `checkbox`：

* 复选框，用户可以选择多个选项。
* 例如：`<input type="checkbox">`。

2. `radio`：

* 单选按钮，用户只能选择一个选项。通常多个单选按钮具有相同的`name`属性，以确保只能选择其中一个。
* 例如：`<input type="radio" name="option">`。

3. `select`：

* 下拉列表，用户可以从预定义的选项中选择一个值。可以使用`<option>`标签来定义选项。
* 例如：

```html
<select>
 <option value="option1">Option 1</option>
 <option value="option2">Option 2</option>
</select>
```

**五、按钮类型**

1. `submit`：

* 提交按钮，用于提交表单数据。通常与`<form>`标签一起使用。
* 例如：`<input type="submit" value="Submit">`。

2. `reset`：

* 重置按钮，用于重置表单中的所有输入字段为初始状态。
* 例如：`<input type="reset" value="Reset">`。

3. `button`：

* 普通按钮，可以通过 JavaScript 为其添加自定义的行为。
* 例如：`<input type="button" value="Click Me">`。

**六、其他类型**

1. `email`：

* 用于输入电子邮件地址。浏览器可能会对输入的内容进行有效性验证。
* 例如：`<input type="email">`。

2. `url`：

* 用于输入 URL 地址。浏览器可能会对输入的内容进行有效性验证。
* 例如：`<input type="url">`。

3. `search`：

* 用于输入搜索关键词。通常会显示一些特定的样式，如圆角等。
* 例如：`<input type="search">`。

4. `hidden`：

* 隐藏输入字段，用于在表单中传递数据，但不会在页面上显示给用户。
* 例如：`<input type="hidden" value="some-value">`。

5. `color`：

* 用于选择颜色。通常会显示一个颜色选择器。
* 例如：`<input type="color">`。

6. `file`：

* 用于上传文件。可以设置`multiple`属性允许选择多个文件。
* 例如：`<input type="file">`或`<input type="file" multiple>`。
