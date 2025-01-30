# 属性

## attribute property 区别? {#p0-attribute-property}

<Answer>

1. 从规范的角度 `attributes` 由 html 定义,`properties` 由 dom 定义
   * 少数 html `attribute` 有对应 `id` 映射,例如 id

 > 非自定义的 property 或attribute的变化多数是联动的

* 自定义 `attribute`,`colspan` 等无映射,需使用 `getAttribute` 获得

2. `attribute` 用于初始化 dom 对象的 `property`,`property` 可以修改
1. 在表单中 getAttribute 访问的 value 属性为初始值,而 `value` 属性访问获得的是当前值

 > 带有默认值的attribute不随property变化而变化。但是修改 attribute 会修改 `property`

3. 自定义属性采用 `data-` 定义,利用 dataset 获取。
4. `attribute` 大小写不敏感,值均为字符串格式
5. `style` attribute 为字符串,但是 `property` 为对象格式
6. `href` `attribute` 为设定值,`property` 为完整路径

attribute 方法

1. `elem.hasAttribute(name)` 检查是否存在该属性
2. `elem.getAttribute(name)` 获取属性值
3. `elem.setAttribute(name)` 设置属性值
4. `elem.removeAttribute(name)` 删除属性值

> `elem.attributes` 读取所有属性值

总结:

1. `attribute` 有 html 标签申明,值为字符串,大小写不敏感
2. `properties` 是 DOM 元素中所包含的信息,值有多种可能,大小写敏感

> 参考 [attributes 和 properties](https://javascript.info/dom-attributes-and-properties)

</Answer>

## data- 属性的好处是什么？{#p1-data-attribute}

HTML 中前缀为 `data-` 开头的元素属性被称为自定义数据属性（Custom Data Attributes）或者数据属性（Data Attributes）。

这些属性的命名以 `data-` 开头，后面可以跟上任意自定义的名称。这样的属性可以用来存储与元素相关的自定义数据，以便在 JavaScript 或 CSS 中进行访问和操作。

自定义数据属性的命名应该遵循以下规则：

* 属性名必须以 `data-` 开头。
* 属性名可以包含任意`字母、数字、连字符（-）、下划线（_）和小数点（.）`。
* 属性名不应该包含大写字母，因为 HTML 属性名是不区分大小写的。

通过自定义数据属性，我们可以在 HTML 元素中嵌入自定义的数据，然后在 JavaScript 中使用 `getAttribute()` 方法或直接通过元素对象的 `dataset` 属性来访问这些数据。

例如，在 HTML 中定义了一个自定义数据属性 `data-color="red"`：

```html
<div id="myDiv" data-color="red"></div>
```

在 JavaScript 中可以通过以下方式获取该自定义数据属性的值：

```javascript
const myDiv = document.getElementById('myDiv')
const color = myDiv.getAttribute('data-color') // 获取属性值为 "red"
const dataset = myDiv.dataset // 获取包含所有自定义数据属性的对象 { color: "red" }
const colorValue = dataset.color // 获取属性值为 "red"
```

通过自定义数据属性，我们可以将相关的数据绑定到 HTML 元素上，方便在 JavaScript 中进行处理和操作，增强了 HTML 和 JavaScript 之间的交互性。

* [data-](https://h5bp.org/Front-end-Developer-Interview-Questions/translations/chinese)

## src 和 href 有什么区别 {#p0-src-href}

下面是一个表格，展示了`src`和`href`属性之间的异同点：

| 特点 | src属性 | href属性 |
|----------------|----------------------------------------|----------------------------------------|
| 适用标签 | `<script>、<img>、<audio>`等 | `<a>、<link>`等 |
| 加载时间 | 标签加载时立即执行 | 用户与链接交互时加载 |
| 对页面功能的影响 | 对页面功能至关重要，不能加载或加载错误会影响页面 | 不会直接影响页面功能，无法加载或加载错误时链接无效 |
| 资源类型 | 脚本文件、图像文件、音频文件等 | HTML文件、CSS文件、图像文件、音频文件等 |
| 是否必须有效链接 | 是 | 否 |
| 作用 | 嵌入外部资源 | 指向其他页面或资源 |

请注意，这些是`src`和`href`属性的一般规则，但某些特定标签可能会有不同的行为。

`src` 和 `href` 是两个在 HTML 中常用的属性，它们具有不同的作用和用途，主要区别如下：

1. 用途：

* `src` 属性用于指定嵌入资源的 URL，如图片、音频、视频等。
* `href` 属性用于创建超链接，定义链接到的目标 URL 地址。

2. 资源加载：

* `src` 属性用于指定需要加载的资源，浏览器会根据 `src` 属性的值去请求资源，并将其嵌入到文档中。例如，`<img>`、`<script>`、`<iframe>` 等标签使用 `src` 属性加载外部资源。
* `href` 属性用于指定链接的目标 URL，通过点击链接，浏览器会导航到指定的 URL 地址。例如，`<a>`、`<link>`、`<link rel="stylesheet">` 等标签使用 `href` 属性创建超链接或引入外部样式表。

3. 标签使用：

* `src` 属性主要用于嵌入资源的标签，如 `<img>`、`<script>`、`<audio>`、`<video>` 等。
* `href` 属性主要用于超链接标签，如 `<a>`，以及用于引入外部资源的标签，如 `<link>`。

4. 加载顺序：

* `src` 属性的资源会按照标签在文档中的顺序依次加载，其中某些标签可能会阻塞页面的渲染，比如 `<script>` 标签会阻塞页面的解析和渲染。
* `href` 属性的资源加载不会阻塞页面的解析和渲染，通常用于引入外部样式表或字体等。

总结：

* `src` 属性用于嵌入资源的标签，指定需要加载的资源。
* `href` 属性用于创建超链接的标签，指定链接的目标 URL 或引入外部资源的 URL。

需要根据具体的使用场景和标签来选择使用 `src` 还是 `href` 属性。

## crossorigin 的作用是什么 {#p1-crossorigin}

`crossorigin` 属性在 `<audio>、<img>、<link>、<script> 和 <video>` 元素中有效，它们提供对 CORS 的支持，定义该元素如何处理跨源请求，从而实现对该元素获取数据的 CORS 请求的配置。根据元素的不同，该属性可以是一个 CORS 设置属性。

**属性值**

`crossorigin` 属性有以下几个取值选项，每个选项的作用如下：

1. `anonymous`：表示跨域请求不发送凭证信息（如 cookie、HTTP 认证信息）。这是默认值，适用于无需发送凭证的跨域请求，可提高安全性。
2. `use-credentials`：表示跨域请求发送凭证信息。适用于需要发送凭证的跨域请求，但需要服务器配置支持，并且需要设置 `Access-Control-Allow-Credentials` 头为 `true`。
3. `null`：表示不返回跨域资源，并在控制台中报告错误，而不加载跨域资源。适用于跨域资源加载失败时的错误处理。

这些取值选项用来在 HTML 中指定跨域资源请求的行为，通过设置不同的取值选项，可以控制是否发送凭证、如何处理跨域资源加载失败等。

**作用**

`crossorigin` 属性是 HTML 中用来控制跨域资源请求行为的属性。它用于指定浏览器在加载跨域资源时如何处理跨域请求。

主要作用有以下几点：

1. 跨域资源请求：当在 HTML 中引用跨域的资源（如图片、音频、视频、脚本、样式表等）时，浏览器会发送跨域请求。`crossorigin` 属性可以控制这些跨域请求的行为。
2. 控制凭证的发送：默认情况下，跨域请求会发送用户凭证（如 cookie、HTTP 认证信息）。通过 `crossorigin` 属性，可以控制资源请求时是否发送凭证信息。
3. 防止资源污染：当加载跨域的脚本文件时，如果不使用 `crossorigin` 属性，可能会导致脚本文件被污染从而引发安全问题。使用 `crossorigin` 属性可以确保加载的脚本是可信任的。
4. 错误处理：`crossorigin` 属性还可以用来处理跨域请求中可能发生的错误。通过设置不同的取值选项，可以在跨域请求出现错误时进行相应的处理。

**资源加载错误处理方式**

`crossorigin` 属性在错误处理方面有不同的行为，取决于属性的取值选项：

1. 当 `crossorigin` 属性值为 `anonymous` 或未设置时，如果跨域资源加载失败，浏览器会忽略加载失败，不会报告任何错误，也不会影响页面的正常渲染。

2. 当 `crossorigin` 属性值为 `use-credentials` 时，如果跨域资源加载失败，浏览器会在控制台报告错误，并且不会加载跨域资源。这样可以确保在有凭证的情况下，不加载错误的或未授权的跨域资源。

3. 当 `crossorigin` 属性值为 `null` 时，如果跨域资源加载失败，浏览器会在控制台报告错误，并且不加载跨域资源。这种设置适用于当跨域资源加载失败时要显示错误信息，并且不加载其他资源。

总之，通过设置 `crossorigin` 属性，可以控制跨域资源加载失败时的错误处理行为，从而在不同的情况下选择合适的错误处理方式。

## html rel 属性 的参数 preload和prefetch 的作用是什么 {#p0-rel}

`rel` 属性定义了所链接的资源与当前文档的关系，在 `<a>、<area> 和 <link>` 元素上有效。支持的值取决于拥有该属性的元素。

`preload和prefetch`是浏览器提供的两种对静态资源预下载的方式，对于优化页面的渲染速度是很有作用的。

 preload - 立即下载

preload针对的是当前页面需要加载的资源，使用preload加载的资源会提前下载，但是并不会立即执行，`而且等到使用的时候才会执行`。

**preload 使用方式**

preload是`<link>`元素中rel属性的一个值，所以需要使用link标签来实现资源的预加载

```html
<link rel="preload" as="script" href='https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js'>
```

对于预加载的资源来说，一般需要设置以下三个属性：

* `rel`: preload或者prefetch，表示预加载的方式。必填（rel的值很多，这里只考虑预加载的情况）
* `as`: 表示预加载资源的类型。必填
* `href`: 表示预加载资源的地址。必填

当预加载的是字体资源时，必须加上`crossorigin`属性

**preload的好处**

* 能够分离资源的下载和执行
* 能够提高资源的下载优先级
* 能够支持多种资源的预下载，比如脚本，样式，图片等等

**preload VS defer**

和preload一样，defer的script资源也会将下载和执行过程分离。不同的是，preload的资源是由开发者来确定何时执行，defer的script资源是由浏览器来决定何时执行。

除此之外，defer和preload相比还有以下缺点：

只能支持script资源

**preload VS 预解析操作**

在分析页面渲染流程的时候我们提到过浏览器的一个优化操作，就是预解析操作。当浏览器获取到HTML文件之后，会分析其中依赖哪些外部资源，并提前下载这些外部资源。

看上去这个功能和preload基本上是一样的，可以达到同样的效果。

但是浏览器预解析操作有一个缺陷：就是只能预下载HTML文件中引入的静态资源，对于当前页面动态加载的资源是无能为力的。但是preload可以解析这个问题。

 prefetch - 有空才下载

prefetch针对的资源是用户下个浏览的页面需要的资源，可以在当前页面开始预下载，提高下个页面渲染的速度。

在使用上，prefetch和preload基本是一致的。

 preload VS prefetch

preload 和 prefetch在使用上是有很大的不同的。

* **preload针对的资源是当前页面需要的资源，下载的优先级很高**
* **prefetch针对的资源是下个页面需要的资源，下载的优先级很低，有空的时候才下载**

所以开发者是使用的时候需要区分场景，避免浪费用户的带宽资源。
