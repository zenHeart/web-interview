# 标签

## doctype(文档类型) 的作用是什么？ {#p0-doctype}

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

`<!DOCTYPE html>` 是 HTML5 的文档类型声明（Document Type Declaration），它的作用是告诉浏览器当前文档使用的是 HTML5 规范。

具体来说，`<!DOCTYPE html>` 的作用有以下几个方面：

1. 指定文档类型：文档类型声明告诉浏览器当前文档所使用的 HTML 版本，即 HTML5。这样浏览器就可以按照 HTML5 的规范来解析和渲染文档。

2. 规范浏览器行为：文档类型声明还可以影响浏览器的行为。HTML5 的文档类型声明告诉浏览器以标准模式（standards mode）来解析文档，以确保一致的行为和渲染结果。

3. 提供更好的兼容性：使用 `<!DOCTYPE html>` 可以确保文档在不同浏览器中具有一致的处理方式。不同的浏览器对不同版本的 HTML 有不同的处理方式，而使用 HTML5 的文档类型声明可以使浏览器以最新的标准模式来解析文档，提供更好的兼容性和一致性。

总结来说，`<!DOCTYPE html>` 是 HTML5 的文档类型声明，它告诉浏览器当前文档使用的是 HTML5 规范，以规范浏览器的行为，并提供更好的兼容性和一致性。在编写 HTML5 文档时，通常将 `<!DOCTYPE html>` 放置在文档的开头作为文档类型声明。

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

## meta {#p0-meta-tag}

## HTML5 中 meta 标签作用是啥 {#p0-meta}

HTML 5 中的 meta 标签是一个非常常用的标签，它可以用来描述一个 HTML 文档的一些基本信息与配置，包括字符编码、页面关键词、作者、视口大小等。具体来说，meta 标签可用于以下几个方面：

1.描述文档内容：通过设置 meta 标签中的一些属性，可以描述文档的主体内容、作者、关键词和摘要等信息，以便搜索引擎索引和显示。

2.控制页面行为：指定 meta 标签中的属性值可以控制页面的默认行为，比如设置视口大小可以实现响应式设计。

3.声明字符编码：通过设置 meta 标签中的 charset 属性值，可以声明文档中使用的字符编码格式，帮助浏览器正确地解读页面内容。

4.防止 XSS 攻击：设置 meta 标签的 http-equiv 属性为 content-security-policy，可以提高页面的安全性，保护页面免受跨站脚本攻击(XSS)。

5.提供缓存机制：设置一些 meta 标签属性(如cache-control、expires、pragma)，可以控制浏览器缓存页面内容的时间和方式。

## header 的作用 {#p1-header-tag}

## 请解释 `<script>、<script async> 和 <script defer>` 的区别 {#p0-script-async-defer}

`defer` 和 `async` 是用于控制脚本加载和执行的 HTML `<script>` 标签属性。

`defer` 和 `async` 的主要区别在于它们对脚本的加载和执行的影响。

* `defer` 属性告诉浏览器立即下载脚本，但延迟执行，等到文档加载完成后再按照它们在页面中出现的顺序依次执行。这意味着脚本不会阻止文档的解析和渲染，并且它们也不会阻止其他脚本的执行。如果多个脚本都使用 `defer` 属性，则它们将按照它们在页面中出现的顺序依次执行。

* `async` 属性告诉浏览器立即下载脚本，但它们不一定按照它们在页面中出现的顺序执行。它们将在下载完成后立即执行。这意味着脚本不会阻止文档的解析和渲染，但可能会阻止其他脚本的执行。如果多个脚本都使用 `async` 属性，则它们将按照它们下载完成的顺序依次执行。

需要注意的是，当使用 `defer` 和 `async` 属性时，浏览器的支持情况可能不同。一些较旧的浏览器可能不支持这些属性，或者仅支持 `defer` 而不支持 `async`。因此，为了确保脚本的兼容性，建议在使用 `defer` 和 `async` 属性时，同时提供一个备用脚本，并考虑使用特性检测来检查浏览器是否支持这些属性。

在浏览器中，可以通过预加载 JavaScript 脚本来提高性能和用户体验。预加载是指在浏览器解析完当前页面之前，提前加载并解析相关资源（例如 JavaScript 文件、CSS 文件等）。这样可以在用户请求访问其他页面时，减少资源加载的时间和延迟，从而提高页面加载速度和用户体验。

以下是两种预加载 JavaScript 脚本的方法：

1. defer 属性

`<script>` 标签的 `defer` 属性可以告诉浏览器，让 JavaScript 文件在页面文档解析完成之后再执行。这种方式可以保证页面不会因为脚本加载和执行而被阻塞，同时又能够保证脚本能够按照正确的顺序执行（即按照在 HTML 中出现的顺序，因为 `defer` 属性会按照这个顺序依次加载和执行）。

```html
<!DOCTYPE html>
<html>
 <head>
 <title>My Page</title>
 <script src="script1.js" defer></script>
 <script src="script2.js" defer></script>
 </head>
 <body>
 ...
 </body>
</html>
```

2. prefetch 和 preload

预加载的另一种方法是使用 `Link` 标签的 `prefetch` 或 `preload` 属性。这种方法可以在不影响当前页面加载的情况下，预先加载需要后续页面需要的 JavaScript 文件和其他资源。

其中，`prefetch` 属性指示浏览器预先加载并缓存 JavaScript 文件，但不会立即执行文件。而 `preload` 属性则会在浏览器空闲时立即加载文件，并且可以指定文件的类型、优先级等属性。

```html
<head>
 <title>My Page</title>
 <link rel="prefetch" href="script1.js" />
 <link rel="preload" href="script2.js" as="script" />
</head>
```

需要注意的是，使用 `prefetch` 和 `preload` 属性时，应该避免将其用于太多的资源文件，否则可能会引发网络瓶颈和性能问题。可以在需要优化的资源文件上使用这些属性，并通过测试和性能分析来调整其预加载的优先级和时机，以达到最优化的预加载效果。

async:

* 异步加载
* 加载完立即执行
* 不保证执行顺序

defer:

* 异步加载
* DOM 解析完成后执行
* 按照顺序执行

在HTML中，`<script>`标签用于引入或嵌入JavaScript代码。`<script>`标签可以使用以下属性来调整脚本的行为：

**常用属性**

1. `src`：指定要引入的外部JavaScript文件的URL。例如：`<script src="script.js"></script>`。通过这个属性，浏览器会下载并执行指定的外部脚本文件。

2. `async`：可选属性，用于指示浏览器异步加载脚本。这意味着脚本会在下载的同时继续解析HTML文档，不会阻塞其他资源的加载。例如：`<script src="script.js" async></script>`。

3. `defer`：可选属性，用于指示浏览器延迟执行脚本，直到文档解析完成。这样可以确保脚本在文档完全呈现之前不会执行。例如：`<script src="script.js" defer></script>`。

4. `type`：指定脚本语言的MIME类型。通常是`text/javascript`或者`module`（用于ES6模块）。如果未指定该属性，浏览器默认将其视为JavaScript类型。例如：`<script type="text/javascript">...</script>`。

5. `charset`：指定外部脚本文件的字符编码。例如：`<script src="script.js" charset="UTF-8"></script>`。

6. `integrity`：用于指定外部脚本文件的Subresource Integrity（SRI）。SRI可以确保浏览器在加载脚本时验证其完整性，防止通过恶意更改文件来执行潜在的攻击。例如：`<script src="script.js" integrity="sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng="></script>`。

**不常用属性**

7. `crossorigin`：正常的 script 元素将最小的信息传递给 window.onerror，用于那些没有通过标准 CORS 检查的脚本。要允许对静态媒体使用独立域名的网站进行错误记录，请使用此属性。参见 CORS 设置属性。

8. `fetchpriority`：提供一个指示，说明在获取外部脚本时要使用的相对优先级。

9. `nomodule`： 这个布尔属性被设置来标明这个脚本不应该在支持 ES 模块的浏览器中执行。实际上，这可用于在不支持模块化 JavaScript 的旧浏览器中提供回退脚本。

10. `nonce`: 在 `script-src Content-Security-Policy (en-US)` 中允许脚本的一个一次性加密随机数（nonce）。服务器每次传输策略时都必须生成一个唯一的 nonce 值。提供一个无法猜测的 nonce 是至关重要。

11. `referrerpolicy`: 表示在获取脚本或脚本获取资源时，要发送哪个 referrer。

可以参考文档：[资料](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

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

## iframe {#p0-iframe-disadvantages}

`<iframe>` 标签是 HTML 中的内嵌框架元素，它具有一些优点和缺点，如下所示：

优点：

1. 分隔内容：`<iframe>` 允许将不同的 HTML 文档嵌入到当前文档中，实现内容的分隔和独立。每个 `<iframe>` 都有自己的文档上下文，可以在不同的 `<iframe>` 中加载和操作不同的内容。
2. 并行加载：每个 `<iframe>` 是独立的，可以并行加载，这样可以提高页面加载速度和性能。
3. 代码隔离：`<iframe>` 中的内容与主页面的内容相互隔离，可以避免一些 CSS 样式或 JavaScript 代码的冲突，提高代码的可维护性和可靠性。
4. 安全性：由于 `<iframe>` 是独立的文档上下文，可以用于实现一些安全隔离的措施，例如加载来自不可信源的内容，可以将其放置在 `<iframe>` 中，以保护主页面的安全性。

缺点：

1. SEO 不友好：搜索引擎对 `<iframe>` 中的内容索引能力较弱，可能影响页面的搜索引擎优化。
2. 高度难以控制：`<iframe>` 的高度默认会根据内容的高度自动调整，如果内容高度动态变化，可能导致页面布局出现问题。
3. 页面性能：每个 `<iframe>` 都会增加页面的请求量和渲染成本，特别是当页面中存在大量的 `<iframe>` 时，会影响页面的性能。
4. 安全性风险：如果在 `<iframe>` 中加载来自不受信任的源的内容，可能存在安全风险，例如跨域脚本攻击（XSS）。

**应用场景**

`<iframe>` 元素在以下场景中常被使用：

1. 嵌入其他网页：通过 `<iframe>` 可以将其他网页嵌入到当前页面中。这在一些需要展示其他网页内容的情况下非常有用，例如嵌入地图、视频、社交媒体小部件等。

2. 广告展示：广告平台通常会提供 `<iframe>` 代码片段，用于在页面上嵌入广告内容。这样可以实现广告与页面的分离，保持页面结构简洁，并且提供安全隔离，防止广告脚本对页面产生负面影响。

3. 安全隔离：通过将不受信任的内容放置在 `<iframe>` 中，可以实现安全隔离，防止不受信任的内容对主页面进行攻击。这在加载来自第三方或不可信任源的内容时非常有用。

4. 无刷新文件上传：在需要实现文件上传的场景中，可以使用 `<iframe>` 创建一个隐藏的表单，并通过该表单实现文件上传操作。由于 `<iframe>` 的独立上下文，可以实现无刷新上传，同时避免页面刷新带来的不良用户体验。

5. 跨域通信：通过使用 `<iframe>` 和窗口通信 API（如 `postMessage`），可以实现跨域的安全通信。这在需要在不同域之间进行数据交互或嵌入第三方内容时非常有用。

请注意，尽管 `<iframe>` 在上述场景中有用，但也要注意潜在的性能问题、安全风险以及对 SEO 的影响。因此，在使用 `<iframe>` 时需要谨慎权衡利弊，并根据具体需求选择适当的解决方案。

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

## link 标签有 那些属性，作用都是啥？ {#p0-link}

link标签有以下几个常用的属性：

1. href：指定所链接文档的URL地址，可以是一个外部CSS文件的URL或者其他文档的URL。
2. rel：用于定义当前文档与所链接文档之间的关系。常用的取值有stylesheet（指定所链接文档是一个外部CSS文件）、icon（指定所链接文档是一个图标文件）、preconnect（预连接到指定的URL，加快页面加载速度）等等。
3. type：指定所链接文档的MIME类型。常用的取值有text/css（链接一个外部CSS文件）、image/x-icon（链接一个图标文件）等等。
4. media：指定链接的文档在哪些媒体设备上生效。常用的取值有print（应用于打印样式）和screen（应用于屏幕样式）。
5. crossorigin：用于指定跨域资源的处理方式。常用的取值有anonymous（允许跨域请求，但不发送凭据）和use-credentials（允许跨域请求，并发送凭据）。
6. integrity：用于指定链接的文档的完整性校验值，以确保外部资源不被篡改。通常结合subresource integrity（SRI）一起使用。
7. as：用于指定所链接资源的预期用途，以优化资源的加载方式。常用的取值有image（图片资源）、font（字体资源）、script（脚本资源）等等。

link标签的作用是在HTML文档中引入外部资源，例如外部CSS文件、图标文件等。通过link标签，可以将外部资源与HTML文档关联起来，使得浏览器能够正确加载和渲染页面所需的样式和其他资源。

## web components 了解多少 {#p0-web-components}

`Web Components` 是一套不同的技术，允许您创建可重用的定制元素并且在您的 web 应用中使用它们

 三要素

1. `Custom elements`（自定义元素）： 一组 `JavaScript` API，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
通过 `class A extends HTMLElement {}` 定义组件，
通过 `window.customElements.define('a-b', A)` 挂载已定义组件。
1. `Shadow DOM`（影子 DOM ）：一组 `JavaScript` API，用于将封装的“影子” DOM 树附加到元素（**与主文档 DOM 分开呈现**）并控制其关联的功能。
通过这种方式，您可以**保持元素的功能私有**，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
使用 `const shadow = this.attachShadow({mode : 'open'})` 在 `WebComponents` 中开启。
1. `HTML templates`（HTML 模板）`slot` ：`template` 可以简化生成 `dom` 元素的操作，不再需要 `createElement` 每一个节点。

虽然 `WebComponents` 有三个要素，但却不是缺一不可的，`WebComponents`

>借助 `shadow dom` 来实现**样式隔离**，
>借助 `templates` 来**简化标签**的操作。

 内部生命周期函数（4个）

1. `connectedCallback`: 当 `WebComponents`**第一次**被挂在到 `dom` 上是触发的钩子，并且只会触发一次。
类似 `React` 中的 `useEffect(() => {}, [])`，`componentDidMount`。
2. `disconnectedCallback`: 当自定义元素与文档 `DOM`**断开连接**时被调用。
3. `adoptedCallback`: 当自定义元素被**移动**到新文档时被调用。
4. `attributeChangedCallback`: 当自定义元素的被监听属性变化时被调用。

 组件通信

 传入复杂数据类型

* 传入一个 `JSON` 字符串配饰`attribute`

`JSON.stringify`配置指定属性
在组件`attributeChangedCallback`中判断对应属性，然后用`JSON.parse()`获取

* 配置DOM的`property`属性

`xx.dataSource = [{ name: 'xxx', age: 19 }]`
但是，自定义组件中没有办法监听到这个属性的变化
如果想实现，复杂的结构，不是通过配置，而是在定义组件时候，就确定

 状态的双向绑定

```kotlin
<wl-input id="ipt"
 :value="data"
 @change="(e) => { data = e.detail }">
</wl-input>

// js
(function () {
 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 .wl-input {

 }
 </style>
 <input type="text" id="wlInput">
 `
 class WlInput extends HTMLElement {
 constructor() {
 super()
 const shadow = this.attachShadow({
 mode: 'closed'
 })
 const content = template.content.cloneNode(true)
 this._input = content.querySelector('#wlInput')
 this._input.value = this.getAttribute('value')
 shadow.appendChild(content)
 this._input.addEventListener("input", ev => {
 const target = ev.target;
 const value = target.value;
 this.value = value;
 this.dispatchEvent(
 new CustomEvent("change", { detail: value })
 );
 });
 }
 get value() {
 return this.getAttribute("value");
 }
 set value(value) {
 this.setAttribute("value", value);
 }
 }
 window.customElements.define('wl-input', WlInput)
})()

```

监听了这个表单的 `input` 事件，并且在每次触发 `input` 事件的时候触发自定义的 `change` 事件，并且把输入的参数回传。

 样式设置

 直接给自定义标签添加样式

```html
<style>
 wl-input{
 display: block;
 margin: 20px;
 border: 1px solid red;
 }
</style>
<wl-input></wl-input>
<script src="./index.js"></script>

```

 定义元素内部子元素设置样式

分为两种场景：

1. 在主 DOM 使用 JS
2. 在 Custom Elements 构造函数中使用 JS

 在主 DOM 使用 JS 给 Shadow DOM 增加 style 标签

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});

 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }

 window.customElements.define("wl-input", WlInput);

 // 给 Shadow DOM 增加 style 标签
 let styleEle = document.createElement("style");
 styleEle.textContent = `
 .input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
 }
 `;
 document.querySelector("wl-input").shadowRoot.appendChild(styleEle);
</script>

```

 在 Custom Elements 构造函数中使用 JS 增加 style 标签

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});
 let styleEle = document.createElement("style");
 styleEle.textContent = `
 .input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
 }
 `;
 this.shadow.appendChild(styleEle);


 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }
 window.customElements.define("wl-input", WlInput);
</script>

```

 引入 CSS 文件

使用 JS 创建 link 标签，然后引入 CSS 文件给自定义元素内部的子元素设置样式

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});
 let linkEle = document.createElement("link");
 linkEle.rel = "stylesheet";
 linkEle.href = "./my_input.css";
 this.shadow.appendChild(linkEle);


 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }
 window.customElements.define("wl-input", WlInput);
</script>

```

样式文件

```css
.input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
}

```
