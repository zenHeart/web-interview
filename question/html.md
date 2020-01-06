# html

此处汇总所有 html 相关面试问题。
若该问题过于复杂会单独拎出做详细讲解。

## doctype(文档类型) 的作用是什么？

在 html 标准未统一之前,浏览器都有自己的渲染规则，在标准统一后,为了兼容旧版本,存在两种渲染模式。

-   **quirks mode** 怪异模式,浏览器自行决定
-   **standards mode** 标准模式,尽可能遵守 html 规范

> doctype 就是用来限定文档的渲染模式

可以利用 `document.doctype` 获取该配置

此外还存在如下 [DTD](https://www.w3.org/QA/2002/04/valid-dtd-list.html)

详见：

-   [ ] [quirks mode](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)
-   [ ] <https://hsivonen.fi/doctype/>
-   [ ] <https://quirks.spec.whatwg.org/>

## 浏览器标准模式 (standards mode) 、几乎标准模式（almost standards mode）和怪异模式 (quirks mode) 之间的区别是什么？

此问题知识点同上

## HTML 和 XHTML 有什么区别？

<!-- TODO: 可遗留问题 -->

## 如果页面使用 ‘application/xhtml+xml’ 会有什么问题吗？

<!-- TODO:xhtml 区别 -->

## 如果网页内容需要支持多语言，你会怎么做？

1. 采用语言代码划分不同命名空间，标准参见 [List of ISO 639-1 codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

## data- 属性的好处是什么？

-   <https://h5bp.org/Front-end-Developer-Interview-Questions/translations/chinese/>

## 长列表渲染解决方案?
