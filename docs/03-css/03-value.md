# 值

## display block 和 display inline 区别

## display float 理解

## display none 和 vsibility hidden 区别

## px 如何转为 rem {#p2-px-rem}

`px`（像素）转换为 `rem`（根元素字体大小的相对单位）需要先确定一个基准的根元素字体大小。

通常，我们将根元素（`<html>`）的字体大小设置为一个特定的值，比如 `16px`（这是常见的默认值，但您可以根据设计需求进行修改）。

假设根元素的字体大小为 `16px`，那么转换公式为：`rem 值 = px 值 / 16` 。

例如，如果有一个元素的宽度为 `100px`，转换为 `rem` 就是：`100 / 16 = 6.25rem` 。

在实际开发中，可以使用预处理器（如 Sass、Less）或者 JavaScript 来实现自动转换。

**追问：可有什么办法让 px 自动转为 rem， 在开发中就直接使用 px**

在前端开发中，要实现输入 `px` 但自动转换为 `rem` ，可以通过以下几种方式：

1. 使用 CSS 预处理器（如 Sass、Less）

* Sass：

```scss
@function pxToRem($pxValue) {
 @return $pxValue / 16 + rem;
}

.element {
 width: pxToRem(100);
}
```

* Less：

```less
.pxToRem(@pxValue) {
 @remValue: @pxValue / 16;
 @return @remValue + rem;
}

.element {
 width: pxToRem(100);
}
```

1. 使用构建工具（如 Webpack）的插件

* 例如 `postcss-pxtorem` 插件，它可以在构建过程中自动将 `px` 转换为 `rem` 。您需要在配置中设置根元素的字体大小等相关参数。

2. 自己编写脚本进行转换

* 可以在开发过程中使用 JavaScript 脚本来处理样式表中的 `px` 值，并将其转换为 `rem` 。但这种方式相对复杂，并且可能会影响开发效率。

## CSS 属性计算函数 Calc 介绍一下 {#p2-calc}

CSS 属性计算函数 `calc()` 是用来进行动态的尺寸计算以及数值混合运算的一种函数。它增强了纯 CSS 的灵活性，允许你在属性值的设置中直接执行基础的加（`+`）、减（`-`）、乘（`*`）、除（`/`）运算。

`calc()` 函数用于各种 CSS 属性，如 `width`、`height`、`margin`、`padding`、`top`、`right`、`bottom`、`left`、`font-size` 等。以下是 `calc()` 函数的基本语法：

```css
property: calc(expression);
```

其中，`expression` 可以包括：

* 其他 CSS 单位值
* 数字常量
* 括号来控制运算顺序

 基础示例

```css
.element {
 width: calc(100% - 50px); // 宽度是容器宽度减50px
 padding: calc(1em + 10px); // 上下内边距是当前字体尺寸的1em加上10px
 margin: calc(10px / 2); // 外边距为5px
 font-size: calc(12px + 2vw); // 根据视窗宽度改变字体大小
}
```

 高级用法

使用 `calc()` 的同时可以嵌套使用 `min()` 和 `max()` 函数，这种组合对响应式设计非常有用。

```css
.element {
 width: calc(min(100%, 500px)); // 宽度始终是容器的100%，但不超过500px
 font-size: calc(max(12px, 1vw)); // 在某些实现中此用法可能不生效
}
```

 括号

如果要进行优先级计算，你需要使用括号，比如在多重运算中：

```css
.element {
 width: calc(25% + (2em(100vw - 200px) / 2));
}
```

 注意事项

* 在进行除法运算时，要注意除数不能为零。
* CSS 变量可以在 `calc()` 中使用，使得你能够进行更灵活的样式控制。
* `calc()` 必须确保表达式的两侧是兼容的单位，比如不能将像素（`px`）和百分比（`%`）相除。
* 我很遗憾要指出一个小误导：`calc()` 并不是 CSS 的原生属性，尽管它是 CSS 核心语法的一部分，它的适用性非常广泛。

 兼容性

截至我的知识更新点（2023 年），`calc()` 得到了现代浏览器的广泛支持，包括 Chrome、Firefox、Safari、Edge 以及旧的 Internet Explorer 版本。唯一的例外是 Windows Phone 中的老版本浏览器。

 实际应用场景

`calc()` 的一个常见用途是在响应式设计中，你可以用 `calc()` 来设置一个固定宽度和视口宽度的融合：

```css
.container {
 width: calc(100% - 20px); /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 虚拟列不存在时，容器宽度为屏幕宽度减去20px */
}
.grid {
 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 这部分代码创建一个栅格布局，其中每一格至少宽250px，每列最大填充至填满屏幕，如果没有空间填满则按最小宽度计算 */
}
```

通过 `calc()` 函数，开发人员可以设计出更加灵活和响应用户屏幕大小的界面布局。
