
# 草稿箱

此处汇总所有 html 相关面试问题。
问题分为三类:

* **概念** 关于 HTML 规范等涉及的常见概念及术语
* **应用** web api 等使用问题,例如 DOM, 浏览器存储等
* **编码题** html 相关问题

## 概念

### 事件冒泡? ⭐️⭐️⭐️⭐️⭐️

### doctype(文档类型) 的作用是什么？⭐️⭐️

在 html 标准未统一之前,浏览器都有自己的渲染规则，在标准统一后,为了兼容旧版本,存在两种渲染模式。

* **quirks mode** 怪异模式,浏览器自行决定
* **standards mode** 标准模式,尽可能遵守 html 规范

> doctype 就是用来限定文档的渲染模式

可以利用 `document.doctype` 获取该配置

此外还存在如下 [DTD](https://www.w3.org/QA/2002/04/valid-dtd-list.html)

详见：

* [ ] [quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
* [ ] [doctype](https://hsivonen.fi/doctype)
* [ ] [whatwg](https://quirks.spec.whatwg.org)

浏览器标准模式 (standards mode) 、几乎标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？

### 说明 load,ready,DOMContentLoaded 的区别 ⭐️⭐️⭐️⭐️⭐️

### 事件委托的作用和意义？ ⭐️⭐️⭐️⭐️

### 属性(attribute)和特性(property) 区别? ⭐️⭐️⭐️⭐️

### 什么是渐进式渲染 (progressive rendering)？

### getComputedStyle用法?

### addEventListener绑定事件?参数不同的执行顺序

### DOM 操作

## 应用

### 请解释 `<script>、<script async> 和 <script defer>` 的区别

### 为什么通常推荐将 CSS `<link>` 放置在 `<head></head>` 之间，而将 JS `<script>` 放置在 `</body>` 之前？你知道有哪些例外吗？

### 解释 cookies session storage local storage 的区别 ?⭐️⭐️⭐️

### 如何实现浏览器内多个标签页之间的通信?

### iframe有那些缺点？

### intersection observer api? ⭐️⭐️⭐️

### 页面导入样式时，使用link和@import有什么区别？

### 常见的浏览器内核有哪些？

### 简述一下你对HTML语义化的理解？

### HTML5的离线储存怎么使用，工作原理能不能解释一下？

### html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

### data- 属性的好处是什么？

* [data-](https://h5bp.org/Front-end-Developer-Interview-Questions/translations/chinese)

### 你用过哪些不同的 HTML 模板语言？

## 编码题

## 拖拽组件设计

## 取出一个 html 树，并返回标签类型和各标签出现次数？ ⭐️⭐️⭐️

### 显示列表,返回显示已看过?  ⭐️⭐️⭐️

### 如果网页内容需要支持多语言，你会怎么做？

1. 采用语言代码划分不同命名空间，标准参见 [List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

### 长列表渲染解决方案?

### 写一个幻灯片效果

* Cookie和Session区别？‘

## URL 从解析到渲染过程

1. URL 解析
2. DNS 解析
3. TCP 连接建立
4. 发送 HTTP 请求
5. 服务器处理请求并响应
6. 浏览器解析响应
   * HTML 解析
   * CSS 解析
   * JavaScript 解析
7. 构建 DOM 树和 CSSOM 树
8. 生成渲染树
9. 布局（Layout）
10. 绘制（Paint）

## JavaScript async/defer

async:

* 异步加载
* 加载完立即执行
* 不保证执行顺序

defer:

* 异步加载
* DOM 解析完成后执行
* 按照顺序执行

## 待整理

* 元素的分类
* 元素的属性
* meta 元素
* 测试数据

### 事件循环?  ⭐️⭐️⭐️⭐️⭐️

## 参考资料

* [html5 规范](https://html.spec.whatwg.org)
* [learn-html](https://web.dev/learn/html)
