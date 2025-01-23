# typescript

## tsconfig.json 中有哪些重用的配置项 {#p2-typescript-config}

`tsconfig.json`是 TypeScript 项目的配置文件，它指定了用于编译该项目的根文件及编译器选项。以下是一些重要的配置项和它们的作用：

 `compilerOptions`

这部分包含了一系列用来告诉 TypeScript 编译器如何编译代码的标志。

* **`target`**: 设置编译后的 JavaScript 目标版本，比如`"ES5"`、`"ES6"`等。
* **`module`**: 指定生成的代码所使用的模块系统，如`"CommonJS"`、`"AMD"`、`"System"`、`"UMD"`、`"ES6"`、`"ES2015"`等。
* **`lib`**: 指定编译过程中需要包含的库文件的列表，如`["dom", "es6"]`等。
* **`outDir`**: 指定输出目录，编译后的文件将放在这个目录下。
* **`outFile`**: 将所有文件输出到一个文件中，仅在`module`为`"system"`或`"amd"`时有效。
* **`rootDir`**: 指定输入文件的根目录，用于控制输出目录结构。
* **`allowJs`**: 允许编译`.js`文件，让 TypeScript 和 JavaScript 代码可以共存。
* **`checkJs`**: 允许在`.js`文件中报告错误。
* **`jsx`**: 在`.tsx`文件中支持 JSX，例如："react"、"preserve"等。
* **`declaration`**: 生成相应的`.d.ts`文件。
* **`sourceMap`**: 生成相应的`.map`文件，用于调试。
* **`strict`**: 启用所有严格类型检查选项。
* **`noImplicitAny`**: 不允许具有隐式`any`类型的表达式和声明。
* **`strictNullChecks`**: 在严格的`null`检查模式下，`null`和`undefined`值不包含在任何类型里，只允许用作它们各自的类型使用。
* **`esModuleInterop`**: 通过为所有导入创建命名空间对象，实现 CommonJS 和 ES 模块之间的互操作性。

 `files`、`include`和`exclude`

这三个配置项控制 TypeScript 编译器应该编译哪些文件：

* **`files`**: 指定一个确切的文件列表，只有这些文件会被编译。
* **`include`**: 指定一个匹配模式列表，编译器会编译匹配上的文件。
* **`exclude`**: 指定一个匹配模式列表以排除某些文件。

 示例`tsconfig.json`

```json
{
 "compilerOptions": {
 "target": "es5",
 "module": "commonjs",
 "strict": true,
 "jsx": "react",
 "outDir": "./dist",
 "esModuleInterop": true,
 "sourceMap": true,
 "allowJs": true,
 "skipLibCheck": true
 },
 "include": ["src/**/*"],
 "exclude": ["node_modules", "**/*.spec.ts"]
}
```

这只是`tsconfig.json`中常用配置项的概览。根据项目的不同需求，可能会有更多的配置项需要了解和调整。通过适当配置`tsconfig.json`文件，可以有效控制 TypeScript 项目的编译过程。

## JS 项目逐步迁移到 TS 项目，该如何做 {#p2-js-migrate-to-ts}

在 JavaScript 项目迁移到 TypeScript 的过程中确实会出现大量 JS 和 TS 文件共存的情况。要配置项目以使它们兼容并顺利运行，你需要进行以下设置：

 1. 初始化 TypeScript 配置

首先，创建`tsconfig.json`文件来配置 TypeScript 编译选项。可以通过运行`npx tsc --init`来自动生成一个基础的配置文件。为了使 JavaScript 和 TypeScript 文件共存，你需要确保`tsconfig.json`中包含以下配置：

```json
{
 "compilerOptions": {
 "allowJs": true, // 允许编译JavaScript文件
 "checkJs": false, // 禁用对JS文件的检查，使迁移更加平滑
 "outDir": "./dist", // 指定输出目录
 "target": "es5", // 目标编译版本
 "module": "commonjs", // 模块化标准，根据项目情况调整
 "strict": false, // 可以开始时设置为false，逐步提高严格性
 "esModuleInterop": true
 },
 "include": [
 "src/**/*" // 指定项目源代码目录
 ]
}
```

 2. 配置构建工具

如果你的项目是基于 React 的，并且你希望在迁移过程中同时使用 TypeScript 和 Babel 来处理 JSX 和最新的 JavaScript 特性，以下是对上面 Webpack 示例的补充，以支持这些需求：

 2.1. 安装必要的包

首先，你需要安装与 React、TypeScript、Babel 相关的 npm 包：

```bash
npm install --save react react-dom
npm install --save-dev typescript @types/react @types/react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev ts-loader @babel/core @babel/preset-env @babel/preset-react babel-loader
```

 2.2. 配置 Babel

创建或更新项目根目录下的`.babelrc`或`babel.config.json`文件，以包含 React 的预设和对最新 ECMAScript 特性的支持：

```json
{
 "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

如果你使用 TypeScript，你还可以在 Babel 配置中添加`@babel/preset-typescript`，这样 Babel 也可以直接处理`.ts`和`.tsx`文件：

```json
{
 "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
}
```

 2.3. 配置 Webpack

更新`webpack.config.js`配置以使用`babel-loader`，并确保它能够正确处理`.js`和`.jsx`以及`.ts`和`.tsx`文件：

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.tsx', // 假设你的入口文件是一个TypeScript文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // 添加.ts 和 .tsx 作为解析扩展名，确保导入时可以省略扩展名
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // 同时匹配 TS(TSX) 和 JS(JSX) 文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // 使用Babel加载器处理
          options: {
            // 在此传递Babel预设也是可行的，但最好在Babel配置文件中统一配置
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      }
    ]
  },
  // 如果你需要的话，加入source map支持
  devtool: 'source-map',
  // 配置 webpack-dev-server
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```

通过上述配置，Webpack 将能够正确地处理你的 React 项目中的`.js`、`.jsx`、`.ts`和`.tsx`文件。Babel 会负责转译 JSX 和 TypeScript，而 Webpack 会负责打包它们。

 3. 逐步迁移

开始逐步将`.js`文件重命名为`.ts`文件，并解决任何类型错误。这可以逐个文件进行，以避免项目变得不可管理。一般建议先从项目的底层（即不依赖其他文件或依赖较少的文件）开始迁移，逐步向上。

 4. Linting

为了保证代码质量，在项目中配置 ESLint 是个好主意。如果还没有配置 ESLint，你可以如下安装:

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

然后，在`.eslintrc`文件中配置 ESLint 来支持 TS：

```json
{
 "parser": "@typescript-eslint/parser",
 "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
 "parserOptions": {
 "ecmaVersion": 2020,
 "sourceType": "module"
 },
 "rules": {
 // 自定义规则
 }
}
```

 5. 运行和测试

确保你的运行和测试脚本兼容 TS 文件。可能需要配置或更新一些依赖，比如使用`ts-node`而不是`node`来运行 TS 文件，或者更新 Jest 配置以支持 TS。

通过上述步骤，你的项目应该能够在迁移到 TypeScript 的同时继续正常运行和构建。记住，这是一个逐步的过程，不需要急于一时完成所有迁移。

## TypeScript 中 any、never、unknown、null & undefined 和 void 有什么区别 {#p3-typescript-any-never-unknown-null-undefined-and-void}

在 TypeScript 中，`any`、`never`、`unknown`、`null` & `undefined` 以及 `void` 都是类型系统的一部分，各自具有不同的用途和含义，下面是它们的主要区别：

 `any`

* **含义**：`any` 类型表示任何 JavaScript 值都可以赋值给它。使用 `any` 类型，可以绕过 TypeScript 的静态类型检查。
* **用途**：适用于你不想给变量设置具体类型的情况，或者在迁移旧 JavaScript 项目到 TypeScript 时临时使用。
* **示例**：

 ```typescript
 let anything: any = 'Hello world'
 anything = 25 // ok
 anything = false // ok
 ```

 `never`

* **含义**：`never` 类型表示永远不存在的值的类型。例如，`never` 类型是那些总是抛出异常或根本就不会有返回值的函数表达式或箭头函数的返回类型。
* **用途**：`never` 用于表示那些总是异常或无限循环的函数返回类型，或者用在永远不可能有匹配结果的类型守卫条件。
* **示例**：

 ```typescript
 function error (message: string): never {
   throw new Error(message)
 }
 ```

 `unknown`

* **含义**：`unknown` 类型表示任何值。它类似于 `any`，但是更安全，因为对 `unknown` 类型的值执行大多数操作都是不允许的，直到我们通过类型检查缩小了该值的类型。
* **用途**：当我们不确定将要使用的变量的类型时可以使用 `unknown` 类型，它是 `any` 类型的类型安全等价物。
* **示例**：

 ```typescript
 let uncertainValue: unknown = 4
 uncertainValue = 'maybe a string instead'
 // TypeScript会阻止你执行不安全的操作
 // console.log(uncertainValue.length); // Error
 ```

 `null` & `undefined`

* **含义**：`null` 和 `undefined` 在 TypeScript 里分别有各自的类型，分别叫做 `null` 和 `undefined`。`null` 是一个表示无值的特殊值，而 `undefined` 表示未定义。
* **用途**：`null` 和 `undefined` 分别用于表示变量的“空”或“未定义”状态。
* **示例**：

 ```typescript
 const empty = null
 const notDefined = undefined
 ```

 `void`

* **含义**：`void` 类型与 `any`、`never` 和 `unknown` 不同，它表示没有任何类型。在函数中使用 `void` 类型，表示该函数没有返回值。
* **用途**：主要用在没有返回值的函数的返回类型注解上。
* **示例**：

 ```typescript
 function warnUser (): void {
   console.log('This is a warning message')
 }
 ```

总结如下：

* `any` 允许你对值执行任何操作，但是使用它会放弃类型检查的保护。
* `never` 用于函数永远不会正常结束的返回类型。
* `unknown` 用在不确定类型时，比 `any` 更安全因为它不允许你随便操作这个值。
* `null` 和 `undefined` 用于表示没有值或值未定义。
* `void` 用于没有返回任何值的函数。
