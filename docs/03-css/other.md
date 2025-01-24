# 杂项

## css 新特性 {#p2-css3}

新特性非常多，总结在下面

详情请看文档：[资料](https://juejin.cn/post/7320288231111016498)

 架构基础

* 级联层
* 嵌套
* 作用域
* 选择器 :is() 和 :where()
* 选择器 :has()
* 复杂的第 n-. 选择
* CSS 三角函数
* 子网格 subgrid

 排版

* 首字下沉
* 均衡和美观

 颜色

* 高清色彩空间
* color-mix() 函数
* 相对颜色语法
* 响应浅色或深色模式的 light-dark() 函数

 响应式设计

* 容器查询之尺寸查询
* 容器查询之样式查询
* 容器查询之状态查询
* 更新媒体查询
* 脚本媒体查询
* 降低透明度的媒体查询
* 媒体查询范围

 交互动画

* 视图过渡
* 滚动驱动动效
* 离散属性动画
* @starting-style
* overlay
* 锚点定位
* 动画合成
* 缓动函数 linear()
* Scrollend 事件
* 滚动捕捉

## 样式隔离方式有哪些 {#p1-style-divide}

样式隔离意味着在一个复杂的前端应用中保持组件的样式私有化，使得不同组件之间的样式不会互相影响。以下是一些在前端开发中实现样式隔离的常见方式：

1. CSS 模块（CSS Modules）

CSS 模块是一种在构建时将 CSS 类名局部作用域化的技术。每个类名都是独一无二的，通常通过添加哈希值来实现。当你导入一个 CSS 模块，会得到一个包含生成的类名的对象。这样可以确保样式的唯一性，并防止样式冲突。

2. Shadow DOM

Shadow DOM 是 Web 组件规范的一部分，它允许将一段不受外界影响的 DOM 附加到元素上。在 Shadow DOM 中的样式是局部的，不会影响外部的文档样式。

1. CSS-in-JS 库

CSS-in-JS 是一种技术，允许你用 JavaScript 编写 CSS，并在运行时生成唯一的类名。常见的库有 Styled-components、Emotion 等。这些库通常提供自动的样式隔离，并且还支持主题化和动态样式。

4. 使用 BEM（Block Element Modifier）命名约定

BEM 是一种 CSS 命名方法，通过使用严格的命名规则来保持样式的模块化。通过将样式绑定到特定的类名上，这种方法有助于防止样式泄露。

5. CSS Scoped

在 Vue.js 中，可以为 `<style>` 标签添加 `scoped` 属性，这将使用 Vue 的编译器来实现样式的作用域。虽然这不是一个标准的 Web 特性，但它在 Vue 生态系统中提供了很方便的样式隔离。

6. 使用 iframe

将组件或部分页面放在 iframe 中可以提供非常强的样式和脚本隔离。尽管如此，iframe 通常不是最佳选择，因为它们可能导致性能问题，而且使得组件间的沟通变得更加困难。

7. Web 组件

Web 组件利用了自定义元素和 Shadow DOM 来创建封装的、可复用的组件。在 Web 组件中，可以使用 Shadow DOM 实现真正的样式和脚本隔离。

8. 封装的 CSS 架构

准确使用 CSS 选择器，避免使用全局标签选择器或基础类，而是使用更具体的类选择器可以部分隔离样式。此外，可以设置严格的 CSS 命名策略，不同模块使用不同的命名前缀，以避免名称冲突。

9. PostCSS 插件

使用 PostCSS 插件来处理 CSS，可以自动添加前缀、变量等，从而实现隔离。例如，PostCSS 前缀插件可以自动为 CSS 类添加唯一的前缀。

各种方法有各自的优点和限制，选择哪种方法取决于项目的技术栈、团队的熟悉程度以及特定的项目需求。