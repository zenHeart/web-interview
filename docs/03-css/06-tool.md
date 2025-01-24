# css 关联的工具

## css 预处理器  ⭐️⭐️⭐️⭐️⭐️

## 请解释什么是精灵图（css sprites），以及如何实现？  {#p1-css-sprites}

详见 [雪碧图](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#%E8%AF%B7%E9%98%90%E8%BF%B0float%E5%AE%9A%E4%BD%8D%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)

## less 函数如何使用？{#p2-less}

LESS 是一种基于 JavaScript 的 CSS 预处理器，它扩展了 CSS 的功能，提供了变量、嵌套、混合（Mixins）、函数等功能。LESS 中的函数允许你执行计算、转换和操纵值的操作，使得你的样式表更加灵活和动态。

 使用 LESS 函数的基本步骤

1. **定义函数**：你可以定义一个 LESS 函数，它接受参数并执行代码块。

```less
.my-function(@arg) {
 .result {
 width: @arg;
 }
}
```

2. **调用函数**：使用 `@` 前缀后跟函数名和所需的参数列表来调用函数。

```less
.my-class {
 .my-function(200px);
}
```

3. **传递参数**：函数可以接收一个或多个参数。上面的例子只传递一个参数。

 示例：简单的 LESS 函数

```less
// 定义一个 LESS 函数
.pi(@num) {
 .pi-box {
 width: @num3.14159;
 }
}

// 调用这个函数
body {
 .pi(5px);
}
```

在该示例中，`pi` 是一个接受数字参数并返回其圆周长度的 LESS 函数。这个 `pi` 函数在 `body` 选择器内部被调用，并设置了宽度为 5 \* 3.14159 像素。

 LESS 内建函数

LESS 还包括多个内建函数，可以直接在 LESS 代码中使用。以下是一些常见的内建函数示例：

* **`percentage()`**：将值转换成百分比。

 ```less
 margin: percentage(20px / 100px); // 输出 20%
 ```

* **`round()`**：四舍五入数字。

 ```less
 width: round(23.7px); // 输出 24px
 ```

* **`floor()`** 和 **`ceil()`**：向下取整和向上取整。

 ```less
 height: ceil(14.2px); // 输出 15px
 ```

* **`unit()`** 和 **`convert()`**：分别用来获取值的单位和转换单位。

 ```css
 width: convert(10, ms); // 将 10 转换为毫秒
 margin: unit(25, "%"); // 输出 默认单位为 px，这次你却要改成百分比
 ```

* **`color-function()`**：用于操作颜色值的函数，例如 `lighten()`、`darken()`、`saturate()` 等。

 ```less
 background: lighten(#800, 10%); // 将颜色 #800 变亮 10%
 ```

* **`e()`**：允许你将 CSS 代码作为参数传递到 `&` 中，用于可扩展的类选择器。

 ```less
 .borderbox {
 *,
 *:before,
 *:after {
 .box-sizing(border-box);
 }
 }
 ```

 注意事项

* 函数可以返回任意值，包括颜色、数字、字符串和数组。
* 如果想要执行的是一个操作而非函数定义，需要注意的是 LESS 并不像 JavaScript 一样需要用 `function` 关键字声明。

合理使用函数可以极大增加 CSS 的动态性和灵活性，是构建维护性和复用性更强的 CSS 不可或缺的部分。

## husky 作用是啥， 有哪些重要配置 {#p4-husky}

Husky 是一个基于 Node 的 Git 钩子管理工具，用于在你的工作流程中强制执行 Git 钩子。Husky 允许你定义脚本，这些脚本会在不同的 Git 生命周期事件触发时自运行，比如在提交、推送或合并前。

使用 Husky 可以：

1. **保证提交质量**：Husky 可以在你提交代码之前运行代码校验，确保代码符合项目规范，提高代码质量。
2. **维护代码风格**：可以在提交时检查代码风格，确保代码风格一致性。
3. **自动化流程**：支持在推送前执行代码部署、测试脚本，让整个开发流程自动化。
4. **预防错误**：例如在允许推送到远程仓库之前检查代码中是否有遗留的更改。

Husky 的一些重要配置如下：

1. **`npm install husky@latest --save-dev`**: 安装 husky。
2. **`npx husky install`**: 在新建的项目管理下生成 husky 的配置文件。
3. **`npx husky add .husky/*.sh`**: 添加 Git 钩子脚本，这里的 `*.sh` 是你想触发的钩子点，例如：`pre-commit`、`commit-msg` 等。

Husky 支持的钩子包括：

* `apply-patch-msg`: 应用一个补丁到暂存区并生成提交信息时。
* `pre-applypatch`: 打补丁前。
* `post-applypatch`: 打补丁后。
* `pre-commit`: 提交前，常用于检查代码、分析代码风格等。
* `prepare-commit-msg`: 提交准备工作完成后，修改提交信息之前运行。
* `commit-msg`: 检查提交信息有效性。
* `post-commit`: 提交后。
* `pre-rebase`: 回滚操作开始前。
* `post-checkout`: 检出操作后（如切换分支）。
* `post-merge`: 合并和变基操作后。

记得在 `.husky` 文件夹里配置这些钩子脚本，你可以根据项目需求来写自己的 hook 脚本。比如，设置一个 `.husky/pre-commit` 脚本（可能是一个 shell 脚本和 Node.js 脚本的组合），当你尝试提交代码时，Husky 将会运行这个脚本作为 `pre-commit` 钩子。

在一些场景下的 `.husky/pre-commit` 脚本，你可以指定运行如下：

```bash
#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint # 运行 ESLint 检查代码
./node_modules/.bin/pretty-quick # 格式化代码
./node_modules/.bin/tsc # 检查 TypeScript
```

以上脚本将确保代码在提交前通过了 linter 检查，并通过 prettier 快速格式化以及 TypeScript 编译。

使用的时候，请确认你的项目已经有了 Node.js 环境，并且已经安装了 Husky 和相应的代码检查、格式化工具。
