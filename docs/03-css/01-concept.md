# 概念

## css 选择器优先级如何计算? {#p0-css-selector-priority}

详见 [css 选择器优先级](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#css-%E9%80%89%E6%8B%A9%E5%99%A8%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%E6%98%AF%E5%A6%82%E4%BD%95%E8%AE%A1%E7%AE%97%E7%9A%84)

> **tip**
> 选择器优先级属于 css 层叠规则中的部分规则,若要完全理解 css 层叠规则阅读如下规范
>
> * [css 2.2 层叠规则](https://www.w3.org/TR/CSS22/cascade.html#cascade)
> * [层叠和继承](https://www.w3.org/TR/css-cascade-3/#cascading)
> * [slectors-3 Calculating a selector's specificity](https://www.w3.org/TR/selectors-3/#specificity)

### css 盒模型 {#p0-css-box-model}

CSS3 中的盒模型有以下两种：标准盒子模型、IE 盒子模型

盒模型都是由四个部分组成的，分别是 margin、border、padding 和 content。

**在标准盒模型性中**

![画板 (5)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bdd6da8a5db4f188a9a7d79c30ebcb6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:
宽 = `width + padding2 + border2 + margin2`
高 = `height + padding2 + border2 + margin2`

盒模型实际大小:
宽 = `width + padding2 + border2`
高 = `height + padding2 + border2`

**在 IE 盒模型性中**

![画板 (4)_看图王.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bc8aaa0306845e4a03ef9e78f55a9d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

盒子在网页中实际占用:
宽 = `width + margin2`
高 = `height + margin2`

盒模型实际大小:
宽 = `width`
高 = `height`

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

* `box-sizeing: content-box`表示标准盒模型
* `box-sizeing: border-box`表示 IE 盒模型

## BFC (Block Formatting Context 块格式化上下文) {#p0-bfc}

BFC 是用于 css 块级盒布局的抽象概念。功能上需要掌握

1. 何时会生成 BFC,综合 [mdn bfc](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 和 [css 2.2 bfc](https://www.w3.org/TR/CSS22/visuren.html#block-formatting) 理解
2. bfc 的特征
   1. bfc 会包含子元素,此特性可清除浮动
   2. 同属于一个 bfc 的子元素会出现 margin 塌陷

可以通过 [饥人谷 BFC](https://xiedaimala.com/tasks/4cdc74ef-b8b2-4cbd-aa4e-7a8ee7ad3a16) 理解 BFC。

## IFC(Inline Formatting Context 内联格式化上下文)  {#p1-ifc}

## css 选择器性能 {#p1-css-selector-performance}

1. css 选择器的查询是从右往左查,基于此提供如下优化策略
    1. 减少匹配深度可以降低查询次数
    2. 避免使用通用或常见的类型选择器,通过 BEM 优化元素类名降低请求
2. 避免触发页面重排(reflow),利用 [css trigger](https://csstriggers.com/) 理解哪些属性会影响重绘或重排

## 内联加载样式和外联加载样式有啥区别 {#p1-inline-load-style-and-external-load-style}

内联样式（Inline Style）和外联样式（External Style）是 CSS 应用在 HTML 文档中的两种不同方法，它们主要的区别在于如何将 CSS 规则与 HTML 元素关联起来。

 内联样式

* **定义方式**：通过元素的`style`属性直接在 HTML 标签内定义 CSS 样式。
* **优先级**：内联样式的优先级高于外联样式和嵌入样式（在`<head>`标签内的`<style>`标签中定义的样式），因为它是直接应用到元素上的。
* **应用场景**：适合对单个元素进行样式定义，或者进行快速测试。但如果用于大量元素的样式定义，会使 HTML 文档变得非常臃肿，难以维护。
* **示例**：

```html
<div style="color: blue; font-size: 14px;">这是一段内联样式的文本。</div>
```

 外联样式

* **定义方式**：将 CSS 样式定义在一个外部的`.css`文件中，然后通过`<link>`标签在 HTML 的`<head>`中引用。
* **优先级**：一般情况下，外联样式的优先级低于内联样式。但在多个样式之间的优先级还取决于选择器的具体性、样式定义的顺序等因素。
* **应用场景**：适合网站或应用的全局样式定义，能够实现样式的复用和统一管理，便于维护和更新。
* **示例**：

```html
<!-- HTML文件中引用 -->
<link rel="stylesheet" href="style.css" />

/* style.css文件中定义样式 */ div { color: red; font-size: 16px; }
```

 主要区别

1. **加载方式**：内联样式直接写在 HTML 元素的`style`属性中，而外联样式则放在单独的 CSS 文件中，通过`<link>`标签引入。
2. **复用性**：外联样式可以被多个 HTML 页面共享，提高了样式的复用性；内联样式只作用于具体的元素，无法复用。
3. **维护性**：外联样式易于维护和更新，只需修改一个 CSS 文件即可影响引用该 CSS 文件的所有页面；内联样式则需要逐个元素修改，维护成本较高。
4. **优先级**：内联样式的优先级高于外联样式和嵌入式样式，因为它更“接近”元素。
5. **性能影响**：外联样式可利用浏览器缓存，有助于减少页面加载时间；而大量使用内联样式会增加 HTML 文档的大小，可能对性能产生不利影响。

通常，推荐使用外联样式来实现样式的规范化管理和复用，特别是在大型项目和团队协作的场景中。内联样式则适用于对单个元素快速测试样式或进行特殊样式覆盖的情况。
