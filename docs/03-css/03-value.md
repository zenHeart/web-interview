# 值

## display

CSS 中的`display`属性是一个非常重要的属性，它用于设置一个元素的显示类型。这个属性决定了元素是如何显示以及与其他元素如何交互。以下是一些常见的`display`属性值及其含义：

1. `none`：元素不会被显示。

2. `block`：元素显示为块级元素，此类元素会新起一行。

3. `inline`：元素不会新起一行，其宽度只占据它的内容宽度。

4. `inline-block`：元素横排显示，但是同时具备块级元素的特性，比如可以设置宽高。

5. `flex`：元素会变成弹性容器（flex container），其子元素会成为弹性项（flex items）。这个值允许使用弹性盒子布局（flexbox）。

6. `grid`：元素会变成网格容器，其子元素会成为网格项。它开启了网格布局。

7. `table`、`table-row`、`table-cell` 等：这些值让元素表现得像表格元素一样。

8. `list-item`：元素会表现为列表项（像`<li>`元素一样）。

另外还有一些新的、较少使用或是实验性的`display`属性值，例如：

* `inline-flex`: 使元素的内容为弹性容器，与`flex`相似，但是元素自身会像`inline`元素一样排列。
* `inline-grid`: 类似于`grid`, 但是元素自身表现为`inline`级别。

CSS3 引入了更多复杂的布局模式，包括上述的`flex`和`grid`以及其他的一些属性值。根据您使用的 CSS 版本，可能还有更多其他属性值存在。这些布局模式为网页布局提供了更为强大和灵活的控制手段。

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

## calc  {#p2-calc}

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
 width: calc(100% - 20px); /* 虚拟列不存在时，容器宽度为屏幕宽度减去20px */
}
.grid {
 grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 // 这部分代码创建一个栅格布局，其中每一格至少宽250px，每列最大填充至填满屏幕，如果没有空间填满则按最小宽度计算 */
}
```

通过 `calc()` 函数，开发人员可以设计出更加灵活和响应用户屏幕大小的界面布局。

是的，CSS 支持计算值，这可以通过 `calc()` 函数实现。`calc()` 允许你进行数学运算，计算 CSS 属性值。这个功能非常有力，因为它可以混合使用不同的单位，并且可以用在几乎任何需要数值的地方。

以下是 `calc()` 函数的一些应用示例：

1. **基本运算**：可以执行加 (`+`)、减 (`-`)、乘 (`*`) 和除 (`/`) 四种基本运算。

 ```css
 .element {
 width: calc(100% - 80px);
 }
 ```

2. **混合单位**：`calc()` 函数可以混合使用像素、百分比、em、rem 等单位。

 ```css
 .element {
 margin-top: calc(50vh - 50px);
 }
 ```

3. **嵌套**：你可以在 `calc()` 里面嵌套另一个 `calc()`。

 ```css
 .element {
 width: calc(100% - calc(50px + 2em));
 }
 ```

4. **环境变量**：结合 CSS 变量 (Custom Properties) 使用。

 ```css
 :root {
 --main-padding: 10px;
 }

 .element {
 padding: calc(var(--main-padding)2);
 }
 ```

5. **动态值调整**：用于某些动态大小的调整。

 ```css
 .element {
 position: absolute;
 bottom: calc(50% - 20px);
 }
 ```

当使用 `calc()` 时有一些规则需要注意，例如:

* 运算符之间需要有空格。`calc(50% -50px)` 是无效的，而 `calc(50% - 50px)` 是有效的。
* 不能进行 0 除运算，也就是说分母不能为 0。
* 在进行乘法和除法时，至少有一个值必须是数值（即不带单元的数字）。

总的来说，`calc()` 是一个强大的 CSS 工具，可以在响应式设计和复杂布局管理中提供极大的帮助。

## line-gradient {#p0-line-gradient}

在 CSS 中，设置渐变色可以使用`background`属性和相应的渐变函数。CSS 提供两种类型的渐变：线性渐变（`linear-gradient`）和径向渐变（`radial-gradient`）。以下是如何分别设置这两种渐变色的示例。

 线性渐变（Linear Gradient）

线性渐变是从一个点到另一个点的颜色过渡。它可以通过以下方式设置：

```css
.element {
 background: linear-gradient(direction, color-stop1, color-stop2, ...);
}
```

* `direction`：定义渐变的方向，可以是角度（如`45deg`）或预定义的关键词（如`to bottom`, `to top`, `to right`, `to left`）。
* `color-stop1`，`color-stop2`，...：渐变中颜色停止点，至少需要两个。

**示例**：

```css
.box {
 width: 200px;
 height: 200px;
 background: linear-gradient(to right, blue, red);
}
```

这个例子创建了一个从蓝色到红色的水平渐变。

 径向渐变（Radial Gradient）

径向渐变是从一个中心点向外的颜色过渡。它可以通过以下方式设置：

```css
.element {
 background: radial-gradient(shape size, color-stop1, color-stop2, ...);
}
```

* `shape`：定义渐变的形状，可以是`circle`或`ellipse`。
* `size`：定义渐变的大小，可以是`closest-corner`, `farthest-corner`, `closest-side`, `farthest-side`，或者具体的长度值。
* `color-stop1`，`color-stop2`，...：同样表示渐变中的颜色停止点。

**示例**：

```css
.circle {
 width: 200px;
 height: 200px;
 background: radial-gradient(circle, white, yellow, red);
}
```

这个例子创建了一个圆形的径向渐变，从白色到黄色再到红色。

 重复渐变（Repeating Gradients）

另外，CSS 中的渐变还可以设置为重复渐变，只需在渐变函数后面添加关键词`repeating`：

```css
.gradient {
 background: repeating-linear-gradient(to bottom, blue, white 20px, white 40px);
}
```

这个例子创建了一个向下的线性渐变，颜色从蓝色开始，在 20px 处变化为白色，并在 40px 处结束，然后重复该模式。

**注意**：各种渐变效果在不同的浏览器中可能需要添加特定的浏览器前缀
