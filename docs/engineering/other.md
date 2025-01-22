# 杂项

## eslint 该如何配置 {#p2-eslint-config}

在前端项目中，配置 ESLint 可以帮助你保持代码风格的一致性和提高代码质量。以下是配置 ESLint 的一般步骤：

**一、安装 ESLint**

1. 首先，确保你已经安装了 Node.js 和 npm（或 yarn）。
2. 在项目目录中，使用以下命令安装 ESLint：

* 使用 npm：`npm install eslint --save-dev`
* 使用 yarn：`yarn add eslint --dev`

**二、初始化 ESLint 配置**

1. 在项目根目录下，运行以下命令来初始化 ESLint 配置：

* `npx eslint --init`

 这个命令会引导你通过一系列问题来生成一个基本的 ESLint 配置文件。你可以根据项目的需求选择不同的选项，例如：

* 选择编程语言（JavaScript、TypeScript 等）。
* 选择代码运行的环境（浏览器、Node.js 等）。
* 选择风格指南（例如，Airbnb、Standard 等）。

2. 回答完问题后，ESLint 会在项目根目录下生成一个`.eslintrc.*`文件（可能是`.eslintrc.js`、`.eslintrc.json`或`.eslintrc.yaml`等，具体取决于你的选择）。

**三、配置文件选项详解**

1. **解析器（Parser）**：

* 根据你使用的编程语言，可能需要指定一个解析器。例如，对于 TypeScript 项目，你可以使用`@typescript-eslint/parser`。
* 在`.eslintrc.*`文件中，可以这样配置：

 ```javascript
 module.exports = {
   parser: '@typescript-eslint/parser'
 }
 ```

2. **插件（Plugins）**：

* ESLint 插件可以提供额外的规则和功能。例如，`@typescript-eslint/eslint-plugin`是用于 TypeScript 的插件。
* 配置插件如下：

 ```javascript
 module.exports = {
   plugins: ['@typescript-eslint']
 }
 ```

3. **规则（Rules）**：

* 规则用于定义代码的风格和质量要求。每个规则都有一个可配置的选项，可以设置为`off`（关闭规则）、`warn`（警告）或`error`（错误）。
* 例如，以下配置禁止使用未声明的变量，并要求使用分号：

 ```javascript
 module.exports = {
   rules: {
     'no-undef': 'error',
     semi: ['error', 'always']
   }
 }
 ```

4. **环境（Environments）**：

* 指定代码运行的环境，以便 ESLint 可以正确地识别全局变量和内置模块。
* 例如，如果你的代码在浏览器中运行，可以配置`browser`环境：

 ```javascript
 module.exports = {
   env: {
     browser: true
   }
 }
 ```

**四、在项目中使用 ESLint**

1. **命令行使用**：

* 可以在命令行中使用`eslint`命令来检查项目中的文件。例如：
* `npx eslint.`将检查当前目录下的所有文件。

2. **集成到编辑器**：

* 许多代码编辑器都有 ESLint 插件，可以在编辑代码时实时显示错误和警告。
* 配置编辑器的 ESLint 插件，使其使用项目中的`.eslintrc.*`文件进行代码检查。

3. **集成到构建工具**：

* 可以将 ESLint 集成到构建工具（如 Webpack、Gulp 等）中，以便在构建过程中自动检查代码。
* 例如，对于 Webpack，可以使用`eslint-webpack-plugin`插件来集成 ESLint。

## eslint 有哪些实用的插件， 该如何配置 {#p2-eslint-plugin}

ESLint 有很多实用的插件，可以帮助提高代码质量和开发效率。以下是一些常见的 ESLint 插件及配置方法：

**一、常见插件介绍**

1. `eslint-plugin-import`：

* 作用：用于检查和规范导入语句。可以确保导入路径的正确性、防止重复导入、检查导入顺序等。
* 例如，它可以检测未使用的导入、循环导入等问题，并给出相应的错误提示。

2. `eslint-plugin-vue`：

* 作用：专门为 Vue.js 项目设计的插件。可以检查 Vue 单文件组件（`.vue`文件）中的模板、脚本和样式部分的代码规范。
* 例如，它可以检测模板中的错误使用的指令、脚本中的未定义变量等问题。

3. `eslint-plugin-prettier`：

* 作用：将 Prettier 的代码格式化规则集成到 ESLint 中，确保代码在风格上的一致性。
* 例如，它可以自动修复代码的缩进、空格、换行等格式问题，使代码更加美观易读。

4. `eslint-plugin-jsx-a11y`：

* 作用：用于检查 React 和 Vue 等框架中的 JSX 代码的可访问性问题。
* 例如，它可以检测图像是否缺少替代文本、表单元素是否有正确的标签等问题，以提高应用的可访问性。

**二、配置方法**

1. 安装插件：

* 使用 npm 或 yarn 安装所需的插件。例如，安装`eslint-plugin-import`插件：

 ```bash
 npm install eslint-plugin-import --save-dev
 ```

* 或者使用 yarn：

 ```bash
 yarn add eslint-plugin-import --dev
 ```

2. 创建`.eslintrc`文件：

* 在项目根目录下创建一个`.eslintrc`文件，用于配置 ESLint。

3. 配置插件：

* 在`.eslintrc`文件中，添加插件的名称到`plugins`数组中，并在`rules`对象中配置相应的规则。
* 例如，配置`eslint-plugin-import`插件：

 ```json
 {
 "plugins": ["import"],
 "rules": {
 "import/no-unresolved": "error",
 "import/order": [
 "error",
 {
 "groups": ["builtin", "external", "internal"],
 "pathGroups": [
 {
 "pattern": "vue",
 "group": "external",
 "position": "before"
 }
 ],
 "pathGroupsExcludedImportTypes": [],
 "alphabetize": {
 "order": "asc",
 "caseInsensitive": true
 }
 }
 ]
 }
 }
 ```

* 上述配置中，`plugins`数组中添加了`import`插件，`rules`对象中配置了两个规则：`import/no-unresolved`用于检查导入的模块是否存在，`import/order`用于规范导入的顺序。

4. 集成到开发流程中：

* 根据你的开发环境和工具，将 ESLint 集成到你的开发流程中。例如，在 VS Code 中，可以安装 ESLint 扩展，并在设置中配置自动修复和实时检查。

## slint 如何集成到 webpack {#p2-eslint-webpack}

要将 ESLint 集成到 Webpack 中，可以按照以下步骤进行操作：

**一、安装必要的包**

1. 确保已经安装了 Webpack 和 ESLint。如果还没有安装，可以使用以下命令进行安装：

* 使用 npm：

 ```
 npm install webpack webpack-cli eslint --save-dev
 ```

* 使用 yarn：

 ```
 yarn add webpack webpack-cli eslint --dev
 ```

2. 安装`eslint-webpack-plugin`插件，这个插件可以将 ESLint 集成到 Webpack 构建过程中。

* 使用 npm：

 ```
 npm install eslint-webpack-plugin --save-dev
 ```

* 使用 yarn：

 ```
 yarn add eslint-webpack-plugin --dev
 ```

**二、配置 ESLint**

1. 在项目根目录下，运行`eslint --init`命令来初始化 ESLint 配置。按照提示选择适合项目的选项，生成`.eslintrc.*`配置文件。

2. 根据项目需求，调整 ESLint 配置文件中的规则、解析器、插件等选项。

**三、配置 Webpack**

1. 在 Webpack 配置文件（通常是`webpack.config.js`）中，引入`eslint-webpack-plugin`插件：

 ```javascript
 const ESLintPlugin = require('eslint-webpack-plugin')
 ```

2. 在 Webpack 配置对象的`plugins`数组中添加`ESLintPlugin`实例：

 ```javascript
 module.exports = {
 // ...其他配置项
   plugins: [
     new ESLintPlugin({
       // 可以在这里配置 ESLintPlugin 的选项，例如指定要检查的文件路径
       files: ['./src/**/*.js']
     })
   ]
 }
 ```

**四、运行 Webpack 构建**

当运行 Webpack 构建时，`eslint-webpack-plugin`会在构建过程中自动运行 ESLint 检查。如果有不符合 ESLint 规则的代码，会在控制台输出错误信息。

## 如何定制化开发一个 eslint 插件， 功能是实现提示检验某一个项目里面的字符串error {#p2-eslint-plugin}

**一、创建插件项目**

1. 创建一个新的目录来存放插件项目，例如`eslint-plugin-custom-string-check`。
2. 在该目录下，运行`npm init`初始化一个 npm 项目。

**二、插件结构**

1. 在项目目录下创建一个`index.js`文件作为插件的入口文件。

2. 定义插件对象：

```javascript
module.exports = {
  rules: {}
}
```

**三、实现规则**

1. 定义规则函数，接收一个参数`options`，这个参数可以包含你要检测的字符串。

```javascript
module.exports = {
  rules: {
    'check-custom-string': (context, options) => {
      return {
        Program (node) {
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText()
          const targetString = options && options.stringToCheck ? options.stringToCheck : null
          if (targetString && text.includes(targetString)) {
            context.report({
              node,
              message: `Found custom string "${targetString}".`
            })
          }
        }
      }
    }
  }
}
```

**四、测试插件**

1. 在项目目录下创建一个`tests`目录。
2. 在`tests`目录下创建一个测试文件，例如`test.js`。

```javascript
const ruleTester = require("eslint").RuleTester;
const rule = require("../index").rules["check-custom-string"];

const ruleTester = new RuleTester();
ruleTester.run("check-custom-string", rule, {
 valid: [
 {
 code: 'const message = "This is a test.";',
 options: { stringToCheck: "errorMessage" },
 },
 ],
 invalid: [
 {
 code: 'const errorMessage = "This is an error.";',
 options: { stringToCheck: "errorMessage" },
 errors: [
 {
 message: 'Found custom string "errorMessage".',
 },
 ],
 },
 ],
});
```

**五、使用插件**

1. 在你的项目中安装这个插件：

```bash
npm install /path/to/your/plugin/eslint-plugin-custom-string-check --save-dev
```

2. 在项目的`.eslintrc`文件中配置插件：

```json
{
 "plugins": ["custom-string-check"],
 "rules": {
 "custom-string-check/check-custom-string": ["error", { "stringToCheck": "yourTargetString" }]
 }
}
```

## 请解释什么是 ARIA 和屏幕阅读器 (screenreaders)，以及如何使网站实现无障碍访问 (accessible)?

## Polyfill 和 shim  ？{#p1-polyfill-shim}

参考 [What is the difference between a shim and a polyfill?](https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill)

## corejs 是做什么用的

## 描述 seo 的最佳实践或你最近使用的技术

## 什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？

## 请谈谈你对网页标准和标准制定机构重要性的理解?
