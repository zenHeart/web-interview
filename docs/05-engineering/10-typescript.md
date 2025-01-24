# typescript

## 介绍一下 TypeScript 类型兼容——逆变、协变、双向协变和不变 这四个概念 {#po-type}

TypeScript 中的类型系统允许类型之间存在不同的兼容性关系，这在处理复杂的类型结构时非常重要，尤其是涉及到函数类型和类结构的相互作用。以下是对逆变、协变、双向协变和不变这四个概念的解释：

 协变（Covariance）

* **定义**：如果 `A` 类型是 `B` 类型的子类型，则由 `A` 构成的类型 `T<A>` 也是由 `B` 构成的类型 `T<B>` 的子类型。
* **应用场景**：在 TypeScript 中，数组类型是协变的。这意味着如果我们有类型 `string extends object`，那么 `string[] extends object[]` 也成立。
* **函数返回值**：在函数类型中，返回值类型是协变的，意味着函数的返回类型可以是其声明的返回类型的子类型。

**代码示例**：

数组的协变是最常见的例子：

```typescript
class Animal {}
class Dog extends Animal {}

// 协变：Dog是Animal的子类，因此Dog[]也可以赋值给Animal[]
const dogs: Dog[] = [new Dog(), new Dog()]
const animals: Animal[] = dogs // 协变
```

函数返回值的协变：

```typescript
function getAnimal (): Animal {
  return new Animal()
}
function getDog (): Dog {
  return new Dog()
}

// 协变：getDog的返回类型是getAnimal返回类型的子类型
const animalFunction: () => Animal = getDog // 协变
```

 逆变（Contravariance）

* **定义**：在特定情况下，如果 `A` 类型是 `B` 类型的子类型，则由 `B` 构成的类型 `T<B>` 也是由 `A` 构成的类型 `T<A>` 的子类型。
* **应用场景**：主要体现在函数参数中。如果函数 `f` 的参数类型是 `B`，那么一个参数类型为 `A` 的函数可以分配给 `f`，前提是 `A` 是 `B` 的超类型。这意味着函数可以接受更泛化的参数类型。
* **函数参数**：在 TypeScript 的严格模式下，函数参数是双向协变的（见下），但在某些上下文中可以被视为逆变。

**代码示例**

在 TypeScript 中，函数参数在默认情况下是双向协变的，但我们可以使用逆变的方式理解它们在特殊情况下的行为，比如在启用 `--strictFunctionTypes` 标志后，函数参数表现出逆变：

```typescript
class Parent {}
class Child extends Parent {}

// 逆变：参数具有逆变的特性
const fn1: (param: Parent) => void = (child: Child) => {}
```

 双向协变（Bivariance）

* **定义**：如果类型 `A` 可以赋值给类型 `B`，或者类型 `B` 可以赋值给类型 `A`，则类型 `A` 与 `B` 是双向协变的。
* **应用场景**：TypeScript 中函数参数的默认行为。意味着如果有两个函数，其参数类型分别是彼此的父类型或子类型，这两个函数类型被认为是兼容的。
* **注意事项**：这种设计是出于实用和方便考虑，但可能会导致类型系统的一些不直观行为，特别是在函数参数类型检查上。

**代码示例**

默认情况下，TypeScript 中的函数参数是双向协变的：

```typescript
function fnA (param: Animal) {}
function fnD (param: Dog) {}

// 双向协变：尽管参数类型不完全相同，但两个函数类型在TS中是兼容的
let fn: (param: Dog) => void = fnA // 双向协变允许这种赋值
fn = fnD
```

 不变（Invariance）

* **定义**：类型 `T<A>` 仅与类型 `T<B>` 兼容，如果且仅如果 `A` 与 `B` 完全相同。
* **应用场景**：当我们处理类的实例类型时，经常会出现不变性。例如，如果有一个以 `T` 为泛型参数的类 `Container<T>`，则 `Container<string>` 与 `Container<object>` 将不兼容，除非它们具有完全相同的类型。
* **类和接口成员**：在 TypeScript 中，类和接口的成员默认是不变的。这意味着在赋值兼容性方面，类和接口的成员类型必须完全相同。

**代码示例**

对于类的实例类型的兼容性，体现为不变性：

```typescript
interface IContainer<T> {
 value: T;
}

const stringContainer: IContainer<string> = { value: 'Hello, World!' }
const objectContainer: IContainer<object> = { value: { message: 'Hello, World!' } }

// 不变：即使string是object的子类型，以下赋值仍然是不允许的。
// stringContainer = objectContainer; // 错误！
// objectContainer = stringContainer; // 错误！
```

---

这些类型兼容性的概念是理解和使用 TypeScript 高级类型系统的基础，尤其是在设计通用库或进行复杂类型转换时。

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

## types 和 typeRoots 作用是什么， 有什么区别？{#types-typesroot}

在 TypeScript 的 `tsconfig.json` 配置文件中，`types` 和 `typeRoots` 是两个与类型声明相关的选项，它们用于控制 TypeScript 编译器如何处理类型声明文件。这两个选项的主要区别在于它们控制的范围：

 typeRoots

`typeRoots` 选项指定了包含类型声明文件的目录列表。默认情况下，TypeScript 会查看所有以 `node_modules/@types` 结尾的目录。通过设置 `typeRoots`，你可以直接告诉 TypeScript 编译器去哪查找类型声明：

```json
{
 "compilerOptions": {
 "typeRoots": ["./node_modules/@types", "./typings"]
 }
}
```

在这个例子中，我们指定了两个 `typeRoots`：默认的 `node_modules/@types` 和另外一个自定义的类型声明目录 `./typings`。

 types

`types` 选项允许你设置在项目中所使用到的类型声明文件列表。这个列表会限制编译器在 `typeRoots` 下查找的声明文件，意味着 `types` 中列出的类型声明会是项目中唯一可以引用的声明。如果没有设置 `types`，你可以使用存在于 `typeRoots` 下面的任何类型声明：

```json
{
 "compilerOptions": {
 "types": ["my-global-types"]
 }
}
```

在这个例子中，`types` 选项限制了项目只能使用名为 `my-global-types` 的类型声明。即使有其他的 `.d.ts` 文件在 `typeRoots` 指定的目录下，它们也无法在不修改这个列表的情况下被引用。

 使用场景区别

* 当你有多个 `d.ts` 文件你想指定给 TypeScript 编译器，而不是每一个单独去处理时，使用 `typeRoots` 更为方便。
* `types` 用于控制引用的类型声明集，如果你是在限制或精心策划的设定下工作，这会很有帮助。

 结合使用

在许多情况下，`typeRoots` 和 `types` 可以联合使用：

1. `typeRoots` 列表包含了所有声明文件的位置。
2. `types` 列表限制 TypeScript 可以引用特定集合的声明（其中未列出的声明则不可用）。

通过合理的配置这两个选项，你可以精确控制在 TypeScript 项目中使用的类型声明，帮助你避免类型定义的混乱。

在 TypeScript 项目中导入 `node_modules` 中定义的全局包，并在你的 `src` 目录下使用它，通常遵循以下步骤：

1. 安装包：
 使用包管理器如 npm 或 yarn 来安装你需要的全局包。

 ```sh
 npm install <package-name>
 # 或者
 yarn add <package-name>
 ```

2. 类型声明：
 确保该全局包具有类型声明。如果该全局包包含自己的类型声明，则 TypeScript 应该能够自动找到它们。如果不包含，则可能需要安装对应的 DefinitelyTyped 声明文件。

 ```sh
 npm install @types/<package-name>
 # 或者，如果它是一个流行的库，一些库可能已经带有自己的类型定义。
 ```

3. 导入包：
 在 TypeScript 文件中，使用 `import` 语句导入全局包。

 ```typescript
 importas PackageName from "<package-name>";
 // 或者
 import PackageName from "<package-name>";
 ```

4. tsconfig.json 配置：
 确保你的 `tsconfig.json` 文件配置得当，以便 TypeScript 能够找到 `node_modules` 中的声明文件。

* 如果包是模块形式的，确保 `"moduleResolution"` 设置为 `"node"`。
* 确保 `compilerOptions` 中的 `"types"` 和 `"typeRoots"` 属性没有配置错误。

5. 使用全局包：
 现在你可以在你的 `src` 目录中的任何文件里使用这个全局包。

记住，最好的做法是不要把包当成全局包来使用，即使它们是全局的。通过显式地导入所需的模块，可以有助于工具如 linters 和 bundlers 更好地追踪依赖关系，并可以在以后的代码分析和维护中发挥重要作用。

此外，全局变量或全局模块通常指的是在项目的多个部分中无需导入就可以直接使用的变量或模块。如果你确实需要将某些模块定义为全局可用，并且无法通过导入来使用，你可能需要更新你的 TypeScript 配置文件（`tsconfig.json`）来包括这些全局声明。但这通常不是一个推荐的做法，因为它可能会导致命名冲突和代码可维护性问题。

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