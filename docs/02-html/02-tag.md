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

## iframe有那些缺点？ {#p1-iframe-disadvantages}

## 页面导入样式时，使用link和@import有什么区别？ {#p2-link-import}
