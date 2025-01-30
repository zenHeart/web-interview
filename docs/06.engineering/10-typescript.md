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

```ts
class Parent {}
class Child extends Parent {}

// 逆变：参数具有逆变的特性
const fn1: (param: Parent) => void = (child: Child) => {
  // no
}
```

 双向协变（Bivariance）

* **定义**：如果类型 `A` 可以赋值给类型 `B`，或者类型 `B` 可以赋值给类型 `A`，则类型 `A` 与 `B` 是双向协变的。
* **应用场景**：TypeScript 中函数参数的默认行为。意味着如果有两个函数，其参数类型分别是彼此的父类型或子类型，这两个函数类型被认为是兼容的。
* **注意事项**：这种设计是出于实用和方便考虑，但可能会导致类型系统的一些不直观行为，特别是在函数参数类型检查上。

**代码示例**

默认情况下，TypeScript 中的函数参数是双向协变的：

```ts
function fnA (param: Animal) {
  // nop
}
function fnD (param: Dog) {
  // nop
}

// 双向协变：尽管参数类型不完全相同，但两个函数类型在TS中是兼容的
// eslint-disable-next-line
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

**`never` 是其他任意类型的子类型的类型被称为底部类型(bottom type)。**

在 TypeScript 中，`never` 类型便为空类型和底部类型。`never` 类型的变量无法被赋值，与其他类型求交集为自身，求并集不参与运算。

 应用一: 联合类型中的过滤

**never在联合类型中会被过滤掉：**

```typescript
type Exclude<T, U> = T extends U ? never : T;

// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>

T | never // 结果为T
T & never // 结果为never
```

取一个映射类型中所有value为指定类型的key。例如，已知某个React组件的props类型，我需要“知道”（编程意义上）哪些参数是function类型。

```typescript
interface SomeProps {
 a: string
 b: number
 c: (e: MouseEvent) => void
 d: (e: TouchEvent) => void
}
// 如何得到 'c' | 'd' ？

type GetKeyByValueType<T, Condition> = {
 [K in keyof T]: T[K] extends Condition ? K : never
} [keyof T];

type FunctionPropNames = GetKeyByValueType<SomeProps, Function>; // 'c' | 'd'
```

运算过程如下：

```ts
// 开始
{
 a: string
 b: number
 c: (e: MouseEvent) => void
 d: (e: TouchEvent) => void
}
// 第一步，条件映射
{
 a: never
 b: never
 c: 'c'
 d: 'd'
}
// 第二步，索引取值
never | never | 'c' | 'd'
// never的性质
'c' | 'd'
```

 应用二：防御性编程

举个具体点的例子，当你有一个 union type:

```typescript
interface Foo { type: 'foo' }
interface Bar { type: 'bar' }
type All = Foo | Bar
```

在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

```typescript
function handleValue (val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      // const exhaustiveCheck: never = val
      break
  }
}
```

注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

`type All = Foo | Bar | Baz`

然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

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

在 TypeScript 中，`any`和`unknown`都代表可以赋予任何类型的值，但它们在使用上有明显的不同。

1. **最不安全的类型**：`any`类型是 TypeScript 类型系统的逃逸舱口，使用`any`可以让任何表达式绕过类型检查，转而采用 JavaScript 动态类型的行为。
2. **类型放弃**：当你把一个值声明为`any`类型，你本质上在告诉 TypeScript 编译器：“信任我，我知道我在做什么。”编译器不会对`any`类型的值进行类型检查，这意味着你可以对它执行任何操作，无论它的实际类型。

```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // okay, definitely a boolean

notSure.ifItExists() // okay, toExist might exist at runtime
```

上述代码没有错误，因为`notSure`被声明为`any`类型。

 unknown 类型

1. **类型安全的 any**：与`any`相比，`unknown`类型是类型安全的。它标志着一个值可以是任何类型，但与`any`不同的是，当值被声明为`unknown`时，你无法对该值执行任意的操作。

2. **需要断言或类型细化**：在对`unknown`类型的值执行大部分操作之前，你需要使用类型断言或类型守卫来细化类型。这迫使开发者更积极地处理`unknown`类型的值，因此可以防止潜在的错误。

```typescript
let unsure: unknown = 4
unsure = 'maybe a string instead'
unsure = false; // okay, still uncertain

// unsure.ifItExists(); // Error: Object is of type 'unknown'.
// 下面是对unknown类型进行类型断言的示例
(unsure as string).length // okay, we have asserted that unsure is a string

// 或者使用类型守卫
if (typeof unsure === 'string') {
  console.log(unsure.length) // okay, we have checked it's a string
}
```

如你所见，你不能像处理`any`类型那样直接调用 unknown 类型的方法或属性，必须先进行类型检查。

 总结

`unknown`类型是`any`类型的类型安全对应物。当不确定一个值的类型时应首选使用`unknown`。这样，你会被迫在对该值执行操作之前进行适当的类型检查。这增加了一层类型安全性，可以帮助避免错误。相比之下，`any`类型则完全放弃了类型检查，通常应该尽量避免。

1. **void**：

 `void`类型用于标记函数没有任何返回值。这意呑着函数可能执行了一些操作但是没有返回任何内容。这不同于返回`undefined`或`null`，尽管在没有明确返回值时，JavaScript 函数默认返回`undefined`。

 如果一个函数的返回类型是`void`，它可能有一个`return`语句，但`return`语句不能返回任何值（或者根本就没有`return`语句）。

 例子：

 ```typescript
 function greet (): void {
   console.log('Hello, World!')
 }
 ```

 这个函数打印一个字符串到控制台，但不返回任何值。

2. **never**：

 `never`类型表示永远不会返回任何值。它通常用于两种情况：函数总是抛出一个错误，这样就不会有返回值；或者函数有一个无法达到的终点，比如无限循环。

 例子：

 ```typescript
 function throwError (errorMsg: string): never {
   throw new Error(errorMsg)
 }

 function infiniteLoop (): never {
   while (true) {
     // nop
   }
 }
 ```

 这两个函数都不会正常结束：`throwError`函数会抛出异常，而`infiniteLoop`函数会永远循环。在这两种情况中，返回类型`never`正确地表明函数不会有任何返回执行路径。

总结来说，`void`用于没有返回值的函数，这意味着函数的执行结束后不会给调用者任何值；而`never`表示函数永远不会有一个正常的结束，因此不会给调用者任何机会获得它的返回值。它们在类型系统中表达了不同的概念和意图。

## TS 中的泛型 {#p1-ts-generic}

TypeScript 的泛型是一种工具，它能够使代码更加灵活，能够适配多种类型而非单一的类型。泛型可以创建可重用的组件，这些组件可以支持多种类型的数据，而不失去类型检查时的安全性。

 泛型的基本概念

在 TypeScript 中, 泛型使用一个类型变量，常见的类型变量有 `T`,`U`,`V` 等。通过类型变量，你可以创建一个可以适应任何类型的组件（比如函数、接口或类）。类型变量像是函数或类的一个特殊参数，但这个参数是类型而非具体的值。

 泛型的使用场景

1. **函数**：你可以创建一个泛型函数，该函数可以接受任意类型的参数，同时保证输入参数和返回参数类型相同：

```typescript
function identity<T> (arg: T): T {
  return arg
}
```

这里 `T` 用作类型变量，可以捕获用户提供的类型（比如 `number`），然后这个类型将被用于函数的参数和返回类型。

2. **接口**：使用泛型定义接口可以创建可用于多种类型的接口。

```typescript
interface GenericIdentityFn<T> {
 (arg: T): T;
}

function identity<T> (arg: T): T {
  return arg
}

const myIdentity: GenericIdentityFn<number> = identity
```

这里 `GenericIdentityFn` 接口定义了一个属性，它是一个接收 `T` 类型参数并返回 `T` 类型的函数。

3. **type**：`type` 关键字可以用来创建类型别名，它确实支持泛型。你可以为类型别名定义泛型参数，然后在使用该类型别名时指定具体的类型。

下面是使用泛型的类型别名的例子：

```typescript
// 这里定义了一个带有泛型参数 T 的类型别名
type Container<T> = {
 value: T;
};

// 可以这样使用类型别名
const numberContainer: Container<number> = { value: 1 }
const stringContainer: Container<string> = { value: 'Hello' }

// 使用类型别名定义函数类型
type ReturnFunction<T> = () => T;

// 这个函数返回一个数字
const myFunction: ReturnFunction<number> = () => 42

// 使用带有两个参数的泛型
type KeyValue<K, V> = {
 key: K;
 value: V;
};

const keyValue: KeyValue<string, number> = { key: 'testKey', value: 123 }
```

通过使用泛型，`type` 可以定义灵活的类型别名，使得别名能够用于各种不同的数据类型，同时保持类型的安全性。这使得你可以在类型别名中使用泛型来捕获传递给别名的类型信息。

4. **类**：泛型也可以用于类定义中，使得类可以灵活地与多种类型协作。

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

const myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}
```

这里，`GenericNumber<T>` 类具有一个类型为 `T` 的属性 `zeroValue` 和一个用两个 `T` 类型参数返回 `T` 类型的方法 `add`。

 泛型约束

有时你可能希望对泛型进行限制，只允许使用满足特定接口的类型。这称为泛型约束。

```typescript
interface Lengthwise {
 length: number;
}

function loggingIdentity<T extends Lengthwise> (arg: T): T {
  console.log(arg.length) // Now we know it has a .length property, so no more error
  return arg
}
```

在这里，我们约束了类型 `T` 必须遵从 `Lengthwise` 接口，确保传入的类型具有 `length` 属性。

 泛型中使用类型参数

你还可以在泛型中使用类型参数本身。

```typescript
function getProperty<T, K extends keyof T> (obj: T, key: K) {
  return obj[key]
}

const x = { a: 1, b: 2, c: 3 }

getProperty(x, 'a') // Okay
getProperty(x, 'm') // Error: Argument of type '"m"' isn't assignable to '"a" | "b" | "c"'
```

在这个示例中，`getProperty` 函数有两个参数：`obj` 和 `key`，`obj` 是对象 `T`，`key` 是 `T` 中键的集合 `keyof T` 的成员。

通过泛型，TypeScript 允许你在保持类型安全的同时创建灵活，可适用于多种类型的组件。这样你就能够写出更加通用且易于复用的代码。

## utils tools {#p1-utils}

TypeScript 提供了许多内置的类型方法和工具类型，用于处理和操作类型。以下是其中一些常用的内置类型方法：

 分类

1. **Utility Types（工具类型）**：

* **Partial\<T>**: 将类型 T 的所有属性变为可选。
* **Required\<T>**: 将类型 T 的所有属性变为必选。
* **Readonly\<T>**: 将类型 T 的所有属性变为只读。
* **Record\<K, T>**: 创建一个具有指定键类型 K 和值类型 T 的新对象类型。
* **Pick\<T, K>**: 从类型 T 中选择指定属性 K 形成新类型。
* **Omit\<T, K>**: 从类型 T 中排除指定属性 K 形成新类型。
* **Exclude\<T, U>**: 从类型 T 中排除可以赋值给类型 U 的类型。
* **Extract\<T, U>**: 从类型 T 中提取可以赋值给类型 U 的类型。
* **NonNullable\<T>**: 从类型 T 中排除 null 和 undefined 类型。
* **ReturnType\<T>**: 获取函数类型 T 的返回类型。
* **Parameters\<T>**: 获取函数类型 T 的参数类型组成的元组类型。

2. **条件判定类型**：

* **Conditional Types（条件类型）**: 根据类型关系进行条件判断生成不同的类型。
* **Distribute Conditional Types（分布式条件类型）**: 分发条件类型，允许条件类型在联合类型上进行分发。

3. **Mapped Types（映射类型）**：根据已有类型创建新类型，通过映射类型可以生成新的类型结构。

4. **Template Literal Types（模板文字类型）**：使用字符串模板创建新类型。

5. **类型推断关键字**：

* **keyof关键字**：关键字允许在泛型条件类型中推断类型变量。
* **instanceof**：运算符用于检查对象是否是特定类的实例。
* **in**：用于检查对象是否具有特定属性。
* **type guards**：类型守卫是自定义的函数或条件语句，用于在代码块内缩小变量的类型范围。
* **as**：用于类型断言，允许将一个变量断言为特定的类型。

这些工具类型和方法使得在 TypeScript 中能够更灵活地操作和利用类型系统，增强了类型的安全性和可读性。

 Utility Types（工具类型）介绍

当涉及到 TypeScript 中的这些工具类型时，它们都是为了便捷地处理和操作类型而设计的。让我为你逐个介绍并提供代码示例：

 1. Partial\<T>

这个类型将类型 `T` 的所有属性变为可选。

示例：

```typescript
interface User {
 name: string;
 age: number;
}

type PartialUser = Partial<User>;
// PartialUser 的类型为 { name?: string; age?: number; }

const partialUserData: PartialUser = {} // 全部属性变为可选
```

 2. Required\<T>

与 `Partial` 相反，该类型将类型 `T` 的所有属性变为必选。

示例：

```typescript
interface PartialUser {
 name?: string;
 age?: number;
}

type RequiredUser = Required<PartialUser>;
// RequiredUser 的类型为 { name: string; age: number; }

const requiredUserData: RequiredUser = { name: 'John', age: 25 } // 全部属性变为必选
```

 3. Readonly\<T>

将类型 `T` 的所有属性变为只读。 一旦复制之后是不允许更改的。

示例：

```typescript
interface User {
 name: string;
 age: number;
}

type ReadonlyUser = Readonly<User>;
// ReadonlyUser 的类型为 { readonly name: string; readonly age: number; }

const user: ReadonlyUser = { name: 'Alice', age: 30 }
// user.name = 'Bob'; // 这里会报错，因为属性是只读的
```

 4. Record\<K, T>

该类型创建一个具有指定键类型 `K` 和值类型 `T` 的新对象类型。

示例：

```typescript
type PageInfo = {
 title: string;
};

type Page = 'home' | 'about' | 'contact';

const pages: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contact: { title: 'Contact' }
}
// pages 的类型为 { home: PageInfo; about: PageInfo; contact: PageInfo; }
```

 5. Pick\<T, K>

从类型 `T` 中选择指定属性 `K` 形成新类型。

示例：

```typescript
interface User {
 name: string;
 age: number;
 email: string;
}

type UserBasicInfo = Pick<User, 'name' | 'email'>;
// UserBasicInfo 的类型为 { name: string; email: string; }

const basicUserInfo: UserBasicInfo = { name: 'Sarah', email: 'sarah@example.com' }
```

 6. Omit\<T, K>

与 `Pick` 相反，该类型从类型 `T` 中排除指定属性 `K` 形成新类型。

示例：

```typescript
interface User {
 name: string;
 age: number;
 email: string;
}

type UserWithoutAge = Omit<User, 'age'>;
// UserWithoutAge 的类型为 { name: string; email: string; }

const userWithoutAge: UserWithoutAge = { name: 'Alex', email: 'alex@example.com' }
```

当涉及到 `Exclude<T, U>` 和 `Extract<T, U>` 时，让我们进一步丰富例子来更好地说明它们的用法。

 7. Exclude\<T, U>

`Exclude<T, U>` 从类型 `T` 中排除可以赋值给类型 `U` 的类型。

举例：

```typescript
type T = string | number | boolean;
type U = string | boolean;

type OnlyNumber = Exclude<T, U>;
// OnlyNumber 的类型为 number

const example1: OnlyNumber = 10 // 可以赋值，因为只有 number 类型被提取
// const example2: OnlyNumber = 'Hello'; // 这行会报错，因为 string 类型被排除
// const example3: OnlyNumber = true; // 这行也会报错，因为 boolean 类型被排除

function printValue (val: OnlyNumber) {
  console.log(val)
}

printValue(20) // 可以传入，因为参数类型为 OnlyNumber
// printValue('Hi'); // 这行会报错，因为参数类型不是 OnlyNumber
```

在这个例子中，`T` 是 `string | number | boolean`，`U` 是 `string | boolean`。`Exclude<T, U>` 从 `T` 中排除了 `U` 中包含的类型，所以 `OnlyNumber`
的类型就只有 `number`。这个类型可以在函数参数上提供类型安全性，确保只接受特定类型的参数。

 8. Extract\<T, U>

`Extract<T, U>` 从类型 `T` 中提取可以赋值给类型 `U` 的类型。

举例：

```typescript
type T = string | number | boolean;
type U = string | boolean;

type OnlyStringOrBoolean = Extract<T, U>;
// OnlyStringOrBoolean 的类型为 string | boolean

const example1: OnlyStringOrBoolean = 'Hello' // 可以赋值，因为 string 类型被提取
const example2: OnlyStringOrBoolean = true // 也可以赋值，因为 boolean 类型也被提取
// const example3: OnlyStringOrBoolean = 10; // 这行会报错，因为 number 类型被排除

function printValue (val: OnlyStringOrBoolean) {
  console.log(val)
}

printValue('Hey') // 可以传入，因为参数类型为 OnlyStringOrBoolean
printValue(true) // 也可以传入，因为参数类型为 OnlyStringOrBoolean
// printValue(30); // 这行会报错，因为参数类型不是 OnlyStringOrBoolean
```

在这个例子中，`T` 是 `string | number | boolean`，`U` 是 `string | boolean`。`Extract<T, U>` 从 `T` 中提取了 `U`
中包含的类型，所以 `OnlyStringOrBoolean` 的类型就是 `string | boolean`。这个类型可以用在函数参数上，确保只接受特定的类型作为参数，提高代码的类型安全性。

 9. NonNullable\<T>

`NonNullable<T>` 类型从类型 `T` 中排除 `null` 和 `undefined` 类型。

示例：

```typescript
type T = string | null | undefined;

type NonNullString = NonNullable<T>;
// NonNullString 的类型为 string

const example: NonNullString = 'Hello' // 可以赋值，因为 null 和 undefined 被排除
// const example2: NonNullString = null; // 这行会报错，因为 null 被排除
```

在这个例子中，`NonNullable` 从 `string | null | undefined` 中排除了 `null` 和 `undefined` 类型，只保留了 `string` 类型。

 10. ReturnType\<T>

`ReturnType<T>` 类型获取函数类型 `T` 的返回类型。

示例：

```typescript
function greet (): string {
  return 'Hello!'
}

type GreetReturnType = ReturnType<typeof greet>;
// GreetReturnType 的类型为 string

const result: GreetReturnType = 'Hi' // 可以赋值，因为函数的返回类型是 string
// const result2: GreetReturnType = 10; // 这行会报错，因为类型不匹配
```

`ReturnType` 获取了 `greet` 函数的返回类型，因此 `GreetReturnType` 就是 `string` 类型。

 11. Parameters\<T>

`Parameters<T>` 类型获取函数类型 `T` 的参数类型组成的元组类型。

示例：

```typescript
function greet (name: string, age: number): void {
  console.log(`Hello, ${name}! You are ${age} years old.`)
}

type GreetFunctionParams = Parameters<typeof greet>;
// GreetFunctionParams 的类型为 [string, number]

const example: GreetFunctionParams = ['Alice', 30] // 可以赋值，因为参数类型匹配
// const example2: GreetFunctionParams = ['Bob', '20']; // 这行会报错，因为参数类型不匹配
```

`Parameters` 获取了 `greet` 函数的参数类型组成的元组类型 `[string, number]`，因此 `GreetFunctionParams` 就是包含了函数参数类型的元组类型。

 条件判定类型

条件类型是 TypeScript 中强大且灵活的类型构造方式，它允许根据类型关系进行条件判断生成不同的类型。分布式条件类型是条件类型的一种特殊形式，它允许条件类型在联合类型上进行分发，以便更精确地推断和处理类型。

 Conditional Types（条件类型）

条件类型基于输入的类型关系来确定最终的类型。它使用 `infer` 关键字来推断和定义类型。条件类型通常结合了 TypeScript 中的`extends`关键字，这样就可以根据条件来确定最终的类型。

当谈到 TypeScript 中的条件类型时，让我们通过更多的例子来深入了解它们的应用和灵活性。

**1. 根据输入类型选择不同的类型**
条件类型基于输入的类型关系来确定最终的类型。它使用 infer 关键字来推断和定义类型。条件类型通常结合了 TypeScript 中的extends关键字，这样就可以根据条件来确定最终的类型。

示例：

```typescript
type TypeName<T> =
 T extends string ? 'string' :
 T extends number ? 'number' :
 T extends boolean ? 'boolean' :
 'other';

type A = TypeName<string>; // A 的类型为 "string"
type B = TypeName<number>; // B 的类型为 "number"
type C = TypeName<boolean>; // C 的类型为 "boolean"
type D = TypeName<object>; // D 的类型为 "other"
type E = TypeName<string | number>; // E 的类型为 "string" | "number"
```

在这个例子中，`TypeName<T>` 条件类型根据传入的类型 `T` 来确定最终返回的类型字符串。如果 `T` 是 `string`、`number` 或 `boolean` 类型，则返回对应的类型字符串，否则返回 `"other"`。

**2. 条件类型中使用 `infer` 关键字**

`infer` 关键字通常与`extends`结合使用，用于在条件类型内部声明一个类型变量，并从中提取或推断出一个类型。 它允许我们在泛型条件类型中推断出待推断类型的部分。

具体左右有以下两点：

1. TypeScript 支持 infer 来提取类型的一部分，通过模式匹配的方式。
示例：

```typescript
type ExtractReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet (): string {
  return 'Hello!'
}

type GreetReturnType = ExtractReturnType<typeof greet>;
// GreetReturnType 的类型为 string
```

这个例子中的 `ExtractReturnType<T>` 条件类型获取函数类型 `T` 的返回类型。它使用了 `infer` 关键字来推断函数的返回类型，如果 `T` 是一个函数类型，则返回其返回类型，否则返回 `never`。

2. `infer extends` 用来做类型转换，比如 string 转 number、转 boolean 等；

具体的例子可以参考文章：[资料](https://juejin.cn/post/7133438765317488677)

**3. 条件类型配合泛型使用**

示例：

```typescript
type Diff<T, U> = T extends U ? never : T;

type FilterOut<T, U> = T extends any ? Diff<T, U> : never;

type Result = FilterOut<'a' | 'b' | 'c' | 'd', 'a' | 'c'>;
// Result 的类型为 "b" | "d"
```

在这个例子中，`FilterOut<T, U>` 条件类型根据传入的两个联合类型 `T` 和 `U`，从 `T` 中过滤掉属于 `U` 类型的成员，返回剩余的类型。通过 `Diff<T, U>`
辅助实现了这个操作。这种方式可以在处理类型时非常有用，比如过滤掉某些特定类型。

 Distributive Conditional Types（分布式条件类型）

分布式条件类型是条件类型的一种特殊形式，它在联合类型上进行推断和分发，并返回联合类型中每个成员的条件类型。

示例：

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrArray = ToArray<string>; // StrArray 的类型为 string[]
type NumArray = ToArray<number>; // NumArray 的类型为 number[]
type UnionArray = ToArray<string | number>; // UnionArray 的类型为 (string | number)[]
```

在这个例子中，`ToArray<T>` 条件类型以联合类型 `T` 为输入，并将其分发到联合类型的每个成员上，返回一个数组类型。这种分布式行为使得条件类型在处理联合类型时更加灵活和强大。

条件类型和分布式条件类型为 TypeScript 中的类型系统增加了极大的灵活性和表达能力，允许开发者根据复杂的类型关系来定义和推断类型。

 Mapped Types（映射类型）

`映射类型（Mapped Types）` 是 TypeScript 中一种强大的类型操作，它允许你通过已有类型来创建新类型，通常通过映射现有类型的属性、方法或者创建新的属性来实现。

常见的映射类型是利用 `keyof` 关键字配合索引类型来生成新的类型。一个经典的例子是 `Partial<T>` 类型。它接受一个类型 `T` 并将所有属性设置为可选的：

```typescript
type Partial<T> = {
 [P in keyof T]?: T[P];
};

interface User {
 name: string;
 age: number;
}

type PartialUser = Partial<User>;
// PartialUser 类型为 { name?: string; age?: number; }
```

在这个例子中，`Partial<T>` 使用了映射类型，通过遍历 `T` 类型的所有属性（由 `keyof T` 获取），创建了一个新类型，该类型包含了原类型 `T` 的所有属性，并将它们设为可选的。

除了 `Partial`，还有一些其他常见的映射类型：

* `Readonly<T>`：将类型 `T` 中所有属性设置为只读。
* `Pick<T, K>`：选择类型 `T` 中的特定属性 `K`。
* `Record<K, T>`：根据键类型 `K` 创建一个新类型，其属性为类型 `T`。
* `Exclude<T, U>` 和 `Extract<T, U>`：从类型 `T` 中排除或提取符合类型 `U` 的部分。

映射类型可以使类型操作更加灵活，能够根据现有类型创建出符合特定需求的新类型。这种功能特别适用于工具类型（Utility Types）的定义，使得类型系统更具表现力和可维护性。

 Template Literal Types（模板文字类型）

Template Literal Types（模板文字类型）是 TypeScript 4.1 引入的一项新特性，它允许在类型系统中对字符串文本进行操作和转换。这项功能利用了模板字符串的灵活性，使得可以在类型声明中使用类似于模板字符串的语法。

在模板文字类型中，可以使用模板字符串的 `${}` 语法来动态地创建字符串字面量类型。这使得类型系统更具表现力，能够进行更复杂的字符串类型操作。

举个例子，假设有一个类型 `WelcomeMessage`，用于根据用户类型生成不同的欢迎消息：

```typescript
type User = 'admin' | 'user';

type WelcomeMessage<T extends User> = `Welcome, ${Capitalize<T>}!`;

type AdminWelcome = WelcomeMessage<'admin'>;
// AdminWelcome 类型为 "Welcome, Admin!"

type UserWelcome = WelcomeMessage<'user'>;
// UserWelcome 类型为 "Welcome, User!"
```

在这个例子中，`WelcomeMessage` 是一个模板文字类型，利用了模板字符串中的 `${}` 语法。它动态地根据传入的用户类型（"admin" 或 "user"）生成相应的欢迎消息。这里使用了 `Capitalize<T>` 来确保用户名的首字母大写。

模板文字类型在类型定义中能够进行字符串的拼接、转换等操作，使得在类型层面上能够更灵活地处理和操作字符串类型。

 类型推断关键字

在 TypeScript 中，有几个关键字和操作符用于类型判定。这些关键字和操作符帮助你在代码中进行类型检查、类型判断和类型转换。

1. **typeof**
`typeof` 是一个类型查询操作符，用于获取变量或表达式的类型。它可以返回该值的类型字符串表示。比如 `typeof variable` 返回变量的类型，如 `'number'`、`'string'`、`'object'` 等。

```typescript
const numberVar = 10
type NumberType = typeof numberVar; // NumberType 是 number 类型
```

2. **instanceof**
`instanceof` 运算符用于检查对象是否是特定类的实例。它返回一个布尔值表示检查结果。

```typescript
class Animal {}
class Dog extends Animal {}

const dog = new Dog()
if (dog instanceof Dog) {
  console.log('It is a dog!')
}
```

3. **in**
`in` 关键字用于检查对象是否具有特定属性。它在条件语句中常用于判断对象是否包含某个属性。

```typescript
interface Person {
 name: string;
 age: number;
}

const person: Person = { name: 'Alice', age: 30 }
if ('age' in person) {
  console.log('Person has age property.')
}
```

4. **type guards**
类型守卫是自定义的函数或条件语句，用于在代码块内缩小变量的类型范围。它们可以是 `typeof`、`instanceof` 或者其他自定义条件的组合。

```typescript
function isNumber (value: any): value is number {
  return typeof value === 'number'
}

function process (value: any) {
  if (isNumber(value)) {
    // value 在此处被缩小为 number 类型
    console.log(value.toFixed(2)) // 可以调用 number 类型的方法
  } else {
    console.log('Value is not a number')
  }
}
```

5. **as**
`as` 关键字用于类型断言，允许将一个变量断言为特定的类型。

```typescript
const someValue: any = 'hello'
const length = (someValue as string).length
```

这些关键字和操作符能够在 TypeScript 中进行类型判断、类型检查和类型转换，有助于确保代码的类型安全性和正确性。

## is {#p0-is}

`is` 是 TypeScript 中的一个关键字，用于创建类型保护。在 TypeScript 中，类型保护是一种用于确定变量是否符合某种类型的方法。当我们使用 `is` 关键字创建一个类型保护时，它会在运行时对变量进行判断，然后返回一个布尔值。

具体来说，我们可以通过定义一个返回值为布尔类型的函数，并在函数内部进行类型判断来创建类型保护。比如：

```csharp
csharpCopy codefunction isString(value: any): value is string {
 return typeof value === 'string';
}
```

在这个例子中，我们定义了一个名为 `isString` 的函数，它接收一个任意类型的参数 `value`，并通过 `typeof` 运算符判断 `value` 是否为字符串。如果是字符串，函数返回 `true`，否则返回 `false`。

使用时，我们可以通过将变量传递给 `isString` 函数来判断变量是否为字符串类型：

```rust
rustCopy codeconst str = 'hello';
if (isString(str)) {
 console.log(str.length);
}
```

在这个例子中，由于 `str` 是字符串类型，所以 `isString(str)` 返回 `true`，`if` 语句内的代码会被执行，输出字符串的长度。如果 `str` 不是字符串类型，`isString(str)` 返回 `false`，`if` 语句内的代码不会被执行。

这样，在使用变量之前进行类型保护，可以避免在运行时出现类型错误，提高代码的健壮性。

在 TypeScript 中，`is` 是一种类型谓词（type predicate）语法。它用于在运行时对一个值的类型进行检查，并返回一个布尔值。

`is` 通常与条件类型和类型保护（type guards）一起使用。条件类型可以基于类型谓词 `is` 的结果来进行类型细化，从而在编译时获取更准确的类型推断。

以下是一个示例，展示了如何使用 `is` 进行类型谓词检查：

```typescript
function isString (value: unknown): value is string {
  return typeof value === 'string'
}

function processValue (value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase())
  } else {
    console.log('Value is not a string.')
  }
}

processValue('hello') // 输出: HELLO
processValue(42) // 输出: Value is not a string.
```

在上述示例中，我们定义了一个 `isString` 函数，它接受一个 `unknown` 类型的值，并使用 `typeof` 运算符检查该值是否为字符串类型。函数返回一个布尔值，指示值是否为字符串类型。

然后，我们定义了一个 `processValue` 函数，它接受一个 `unknown` 类型的值，并通过调用 `isString` 函数进行类型谓词检查。如果值是字符串类型，就将其转换为大写并打印出来；否则，打印出值不是字符串类型的消息。

最后，我们调用 `processValue` 函数两次，一次传入字符串 `'hello'`，一次传入数值 `42`。第一次调用输出 `HELLO`，表示字符串类型的值通过了类型谓词检查；第二次调用输出 `Value is not a string.`，表示数值类型的值未通过类型谓词检查。

因此，`is` 是 TypeScript 中用于类型谓词检查的关键字，用于在运行时对一个值的类型进行判断，并返回一个布尔值。

`is` 是 TypeScript 中的一个关键字，用于创建类型保护。在 TypeScript 中，类型保护是一种用于确定变量是否符合某种类型的方法。当我们使用 `is` 关键字创建一个类型保护时，它会在运行时对变量进行判断，然后返回一个布尔值。

具体来说，我们可以通过定义一个返回值为布尔类型的函数，并在函数内部进行类型判断来创建类型保护。比如：

```csharp
csharpCopy codefunction isString(value: any): value is string {
 return typeof value === 'string';
}
```

在这个例子中，我们定义了一个名为 `isString` 的函数，它接收一个任意类型的参数 `value`，并通过 `typeof` 运算符判断 `value` 是否为字符串。如果是字符串，函数返回 `true`，否则返回 `false`。

使用时，我们可以通过将变量传递给 `isString` 函数来判断变量是否为字符串类型：

```rust
rustCopy codeconst str = 'hello';
if (isString(str)) {
 console.log(str.length);
}
```

在这个例子中，由于 `str` 是字符串类型，所以 `isString(str)` 返回 `true`，`if` 语句内的代码会被执行，输出字符串的长度。如果 `str` 不是字符串类型，`isString(str)` 返回 `false`，`if` 语句内的代码不会被执行。

这样，在使用变量之前进行类型保护，可以避免在运行时出现类型错误，提高代码的健壮性。

## infer {#p0-infer}

在 TypeScript 中，`infer` 是一个用于条件类型中的关键字。它的作用是从待推断的类型中提取特定的类型，并将其赋值给一个类型变量。这个类型变量可以在条件类型的 `true` 分支中使用。

通过使用 `infer` 关键字，我们可以实现一些高级的类型操作，比如从函数类型中提取参数类型、从数组类型中提取元素类型等。

以下是一个示例，展示了如何使用 `infer` 关键字提取函数参数的类型：

```typescript
type ParamType<T> = T extends (param: infer P) => any ? P : never;

function foo (arg: number): void {
  // ...
}

type FooParam = ParamType<typeof foo>; // FooParam 的类型是 number
```

在上述示例中，我们定义了一个条件类型 `ParamType<T>`，它接受一个泛型参数 `T`。在 `extends` 条件语句中，我们检查泛型参数 `T` 是否可以赋值给一个函数类型，并使用 `infer`
关键字提取函数参数的类型并赋值给类型变量 `P`。如果不是函数类型，则返回 `never` 类型。

然后，我们定义了一个函数 `foo`，它接受一个 `number` 类型的参数。通过使用 `typeof foo`，我们获取函数 `foo` 的类型，并使用 `ParamType<typeof foo>`
提取函数参数的类型，赋值给类型变量 `FooParam`。在本例中，`FooParam` 的类型为 `number`。

因此，`infer` 是 TypeScript 中用于条件类型中的关键字，用于类型推断和提取特定类型的操作。

## extends 条件类型定义 {#p0-extends}

在 TypeScript 中，`extends` 关键字不仅仅用于类之间的继承关系，还可以用于条件类型的定义。

条件类型是一种在类型系统中根据条件进行推断的方式。通过使用 `extends` 关键字，可以根据给定的条件选择不同的类型。

以下是一个使用 `extends` 条件语句定义条件类型的示例：

```typescript
type TypeName<T> =
 T extends string ? 'string' :
 T extends number ? 'number' :
 T extends boolean ? 'boolean' :
 'unknown';

let type1: TypeName<string> // 类型为 "string"
let type2: TypeName<number> // 类型为 "number"
let type3: TypeName<boolean> // 类型为 "boolean"
let type4: TypeName<object> // 类型为 "unknown"
```

在上面的例子中，我们定义了一个条件类型 `TypeName`，它根据给定的泛型类型 `T` 来选择不同的类型。如果 `T` 是 `string` 类型，那么返回值类型为 `"string"`；如果 `T` 是 `number`
类型，那么返回值类型为 `"number"`；如果 `T` 是 `boolean` 类型，那么返回值类型为 `"boolean"`；否则返回值类型为 `"unknown"`。

通过上述定义，我们可以根据不同的类型获取它们的类型名称。例如，`type1` 的类型为 `"string"`，`type2` 的类型为 `"number"`，依此类推。

注意，条件类型的定义中可以使用嵌套的 `extends` 关键字，以支持更复杂的条件判断。

## union {#p0-union}

在 TypeScript 中，联合类型是指将多个类型组合到一起形成的新类型。联合类型使用 `|` 符号来表示，表示允许变量具有其中任意一个类型的值。

例如，可以声明一个变量为 `string | number` 类型，表示该变量可以是字符串类型或者数值类型。这样可以增加变量的灵活性，可以在不确定变量具体类型的情况下使用它。

以下是一个使用联合类型的示例：

```typescript
function displayData (data: string | number) {
  console.log(data)
}

displayData('Hello') // 输出: Hello
displayData(123) // 输出: 123
```

在上面的例子中，`displayData` 函数可以接受一个参数，该参数可以是字符串类型或者数值类型。函数内部使用 `console.log` 打印参数的值。

需要注意的是，在使用联合类型的情况下，只能访问所有类型共有的属性和方法，无法访问特定类型独有的属性和方法。如果需要针对不同类型执行不同的操作，可以使用类型断言或类型保护等技术来处理。

## unknown  {#p0-unknown}

`unknown`指的是**不可预先定义的类型**，在很多场景下，它可以替代any的功能同时保留静态检查的能力。

```typescript
const num = 10;
(num as unknown as string).split('') // 注意，这里和any一样完全可以通过静态检查
```

这个时候unknown的作用就跟any高度类似了，你可以把它转化成任何类型，不同的地方是，在静态编译的时候，unknown不能调用任何方法，而any可以。

```typescript
const foo: unknown = 'string'
foo.substr(1) // Error: 静态检查不通过报错
const bar: any = 10
bar.substr(1)
```

unknown的一个使用场景是，避免使用any作为函数的参数类型而导致的静态类型检查bug：

```typescript
function test (input: unknown): number {
  if (Array.isArray(input)) {
    return input.length // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
```

我们在一些无法确定函数参数（返回值）类型中 unknown 使用的场景非常多

```typescript
// 在不确定函数参数的类型时
// 将函数的参数声明为unknown类型而非any
// TS同样会对于unknown进行类型检测，而any就不会
function resultValueBySome (val:unknown) {
  if (typeof val === 'string') {
    // 此时 val 是string类型
    // do someThing
  } else if (typeof val === 'number') {
    // 此时 val 是number类型
    // do someThing
  }
  // ...
}
```

## 枚举和常量枚举的区别 {#p0-enum}

枚举和常量枚举（const枚举）：使用枚举可以清晰地表达意图或创建一组有区别的用例

```typescript
// 枚举
enum Color { Red, Green, Blue }

// 常量枚举
const enum Color { Red, Green, Blue }
```

区别：

1. 枚举会被编译时会编译成一个对象，可以被当作对象使用

```typescript
// 枚举
enum Color {
 Red,
 Green,
 Blue
}

const sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = Color.Red
// 即在运行执行时，它将会查找变量 Color 和 Color.Red
```

2. const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销

```typescript
// 常量枚举
const enum Color {
 Red,
 Green,
 Blue
}

const sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = 0
// 在运行时已经没有 Color 变量
```

由此可见，使用 常量枚举 会有更好的性能。

定义的枚举，在经过编译器编译后是一个对象，这个对象我们可以在程序运行时使用，前面有说到。但有时定义枚举可能只是为了让程序可读性更好，而不需要编译后的代码，即不需要编译成对象。typescript中考虑到这种情况，所以加入了 const enum (完全嵌入的枚举)。

## ts 中 type 和 interface的区别 {#p0-type-interface}

1. 都可以描述一个对象或者函数

* interface

```typescript
interface User {
 name: string
 age: number
}

interface SetUser {
 (name: string, age: number): void;
}
```

* ts

```typescript
type User = {
 name: string
 age: number
};

type SetUser = (name: string, age: number) => void;
```

2. 都允许拓展（extends） interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。

 差异点

* **type**
* type 可以声明基本类型别名，联合类型，元组等类型
* type 语句中还可以使用 typeof 获取实例的 类型进行赋值
* 其他骚操作

```typescript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

* **interface**
* interface 能够声明合并

```typescript
interface User {
 name: string
 age: number
}

interface User {
 sex: string
}

/*
User 接口为 {
 name: string
 age: number
 sex: string
}
*/
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

## alias path?

可以看这个文档： [资料](https://www.miganzi.com/tech/typescript-s-paths-config/)
