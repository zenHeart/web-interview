# 杂项

## JavaScript 和 BOM、DOM 、ECMAScript、Nodejs 之间是什么关系 {#p0-object-concept}

**ECMAScript**

`ECMAScript`是`JavaScript`的标准化规范，它定义了`JavaScript`的语法、数据类型、函数、控制流等。`ECMAScript`最早在1997年发布，由欧洲计算机制造商协会（ECMA）负责制定和维护。

`ECMAScript`的目的是为了确保不同厂商的`JavaScript`实现在语法和行为方面保持一致性，以便开发者能够轻松地编写跨平台、跨浏览器的`JavaScript`代码。标准化的`ECMAScript`规范使得开发者可以在不同的`JavaScript`环境中编写相同的代码，而不必担心语法差异和行为不一致性。

`ECMAScript`规范每年进行一次更新，新版本通常包含了新的语法特性、API和改进。在每个`ECMAScript`版本发布之前，由各个浏览器厂商先行实现并测试新特性，然后将其添加到浏览器中。这就是为什么不同浏览器可能对同一版本的`ECMAScript`支持程度不同的原因。

常见的`ECMAScript`版本包括ES5（2009年发布）、ES6（2015年发布，也被称为ES2015）、ES7（2016年发布，也被称为ES2016）等。每个版本都引入了新的语法和功能，使得`JavaScript`变得更加强大和灵活。开发者可以根据目标浏览器的支持情况选择使用不同版本的`ECMAScript`特性。

**JavaScript**是一种高级编程语言，用于为网页添加交互和动态功能。它实现了ECMAScript标准，该标准定义了`JavaScript`的语法、数据类型、函数、控制流等。`JavaScript`是一种解释性脚本语言，代码在运行时由浏览器解析和执行。

**BOM**（Browser Object Model） 是浏览器对象模型，它提供了与浏览器交互的API。`BOM`并不是ECMAScript的一部分，而是浏览器厂商自行实现的一组对象和方法。通过`BOM`，开发者可以操作浏览器窗口、解析URL、发送HTTP请求、控制浏览器历史记录等。其中最常见的`BOM`对象是window对象，它代表了浏览器的窗口或框架。

**DOM**（Document Object Model） 是文档对象模型，它定义了用于访问和操作HTML、XML等文档的API。`DOM`提供了一组对象和方法，用于表示文档的结构和内容。通过`DOM`，开发者可以通过`JavaScript`动态地创建、修改和删除HTML元素，修改样式和属性，处理事件等。`DOM`也不是ECMAScript的一部分，而是由浏览器厂商实现的标准。

**Node.js**是一个基于V8引擎的`JavaScript`运行时环境，使`JavaScript`可以在服务器端运行。与浏览器中的`JavaScript`不同，`Node.js`提供了一组基于事件驱动的API，用于构建高性能和可伸缩的网络应用程序。`Node.js`可以执行文件操作、网络通信、数据库访问等服务器端任务，并且可以通过包管理器npm安装和管理第三方模块。

总结来说，`JavaScript`是一种编程语言，实现了ECMAScript标准。`BOM`和`DOM`是浏览器提供的API，用于与浏览器交互并操作文档。`Node.js`是一个独立的运行时环境，使`JavaScript`可以在服务器端运行，并提供了一组用于构建网络应用程序的API。

## amd、commonjs、esm 理解 {#p0-module-diff}

差异主要有如下几点：

* CommonJS 输出是值的拷贝，即原来模块中的值改变不会影响已经加载的该值，ES6静态分析，动态引用，输出的是值的引用，值改变，引用也改变，即原来模块中的值改变则该加载的值也改变。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 加载的是整个模块，即将所有的接口全部加载进来，ES6 可以单独加载其中的某个接口（方法），
* CommonJS this 指向当前模块，ES6 this 指向undefined

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
ES6 模块的运行机制与 CommonJS 不一样。
JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。
等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

-----------------------------------
> 2023.08.23 补充

下面是一个表格，展示了ES6模块与CommonJS模块之间的差异：

| 特点 | ES6模块 | CommonJS模块 |
|------------------------------|-------------------------------------------|-------------------------------------------|
| 语法 | 使用`import`和`export`语法 | 使用`require`和`module.exports`语法 |
| 动态导入 | 支持动态导入，可以根据条件导入不同的模块 | 不支持动态导入，导入的模块在脚本加载时确定 |
| 导入和导出的类型 | 可以导入和导出变量、函数、类、默认导出等多种类型 | 只能导入和导出整个模块对象 |
| 导入方式 | 可以使用命名导入和默认导入方式 | 只支持命名导入方式 |
| 导出方式 | 可以使用命名导出和默认导出方式 | 只支持命名导出方式 |
| 模块加载时机 | 在编译时就会生成所有模块的依赖关系，可以进行静态分析 | 在运行时加载模块，无法进行静态分析 |
| 模块间的关系 | 每个ES6模块都有自己的作用域，相互之间没有依赖关系 | 模块之间共享相同的作用域，可以直接访问和修改导出的变量和函数 |
| 浏览器支持 | 部分浏览器原生支持，可以使用Babel转译实现兼容性 | 不支持，需要使用工具如Browserify、Webpack进行转译和打包 |
| Node.js使用 | 需要使用`--experimental-modules`标志启用ES模块支持 | 原生支持CommonJS模块 |

请注意，这些是一般规则，具体的差异可能因为不同的运行环境和工具而有所不同。

AMD（Asynchronous Module Definition）和CMD（Common Module Definition）都是JavaScript模块化方案。它们的主要区别在于对依赖的处理方式上不同。

AMD是在require.js推广过程中诞生的，它的特点是提前执行，强调依赖前置。也就是说，在定义模块时就需要声明其所有依赖的模块。它的语法如下：

```js
define(['dependency1', 'dependency2'], function (dependency1, dependency2) {
  // 模块的定义
})
```

CMD是在Sea.js推广过程中诞生的，它和AMD非常相似，但是更加懒惰，是依赖就近，延迟执行。也就是说，在模块中需要用到依赖时，才去引入依赖。它的语法如下：

```js
define(function (require, exports, module) {
  const dependency1 = require('dependency1')
  const dependency2 = require('dependency2')
  // 模块的定义
})
```

简单来说，AMD是提前执行、依赖前置，CMD是延迟执行、依赖就近。两种模块化方案各有优缺点，选择哪种模块化方案需要根据实际情况和个人偏好进行考虑。

## stage0、stage1、stage2 和 stage3 分别代表什么含义？ {#p4-es}

stage0、stage1、stage2 和 stage3 这些术语指的是 ECMAScript 提案的不同阶段。ECMAScript 是 JavaScript 语言的标准化规范，新的特性进入标准之前会通过几个阶段的提案。

这些阶段表示了一个特性在正式成为 ECMAScript 标准的一部分之前的成熟度。这个过程有一个官方的 5 个阶段流程，即从 Stage 0（strawman）到 Stage 4（finished）。下面是这些阶段的含义：

* **Stage 0 - Strawman（稻草人阶段）:** 初始阶段，任何尚未被 TC39（ECMAScript 的标准化组织）官方审议的提案都属于这里。这些都是某个委员或者社区成员提交的想法，还不算是正式的提案。

* **Stage 1 - Proposal（提案阶段）:** 这个阶段的特性是值得进一步探讨的。它们需要有一个形式化的提案和一个负责人。在这个阶段，主要是确定问题和解决方案，以及进行初步探讨。

* **Stage 2 - Draft（草案阶段）:** 一旦一个提案到达这个阶段，它就被认为是初步规格的草案。特性的描述应该足够具体和详细，并且有初步的实现。这个阶段通常需要提案的规格文本和至少一种实验性实现。

* **Stage 3 - Candidate（候选阶段）:** 在候选阶段，提案的规格已经基本完成，并且需要更多的用户反馈来发现潜在问题。通常在这个阶段，实现者和开发者开始在生产环境中尝试使用这些特性，发现问题并提出改善建议。

* **Stage 4 - Finished（完成阶段）:** 当一个提案达到这个阶段，它已经准备好被集成到下一个版本的 ECMAScript 标准中了。这意味着它已经获得了多个独立环境的实现，通过了综合的可行性和稳定性测试，并且已经被 TC39 委员会接受。

开发者们可以根据特性的稳定性和自己的需求，选择使用 Babel 的哪个阶段的预设。然而，请注意，使用较低阶段的提案特性在生产环境中是有风险的，因为它们还没有被完全确定并可能会在将来发生变更。

## JS 严格模式为什么会禁用 with 语句？【热度 {#p2-with}

在 JavaScript 中，严格模式禁用了 with 语句，主要是出于以下三个原因：

1. 性能问题：使用 with 语句会为 JavaScript 解释器带来优化难题。当使用 with 语句时，解释器在编译阶段无法确定对象属性的作用域，因此无法在编译时进行优化。这意味着在执行时需要做额外的作用域查找，可能会降低代码的执行效率。

2. 代码可读性和维护性：with 语句可以将一个对象的所有属性和方法直接引入到当前作用域中，这可能会带来潜在的命名冲突。如果一个属性在 with 语句内部和外部作用域都有定义，编写和维护代码的人员可能会对此感到困惑。因此，这种语句的使用可以使代码的可读性和维护性降低。

3. 编码错误可能性：with 语句改变了正常的作用域链查找规则，这可能会导致意外的变量分配。例如，如果 with 对象不包含某个属性，那么它可能意外地引用或创建一个全局变量，导致难以追踪的错误。

**其中前两个原因还是比较好理解的，第三个原因， 「编码错误可能性」就需要好好解释下了：**

这里 with 语法， 我就不过多讲解了哈。 如果不知道语法的同学， 我这儿丢一个传送门：

下面的例子展示了`with`语句如何导致潜在的编码错误：

考虑下面的对象和`with`语句：

```js
const person = {
  name: 'Alice',
  age: 25
}

function updatePerson (person) {
// eslint-disable-next-line
//  with (person) {
// eslint-disable-next-line
  name = 'Bob' // 意图是更新person的name属性
  age = 30 // 意图是更新person的age属性
//  }
}

updatePerson(person)

console.log(person) // 输出: { name: 'Bob', age: 30 }，这里看起来没问题
```

看起来这段代码没有问题，并且确实更新了`person`对象；但问题出现在如果`with`中的属性并不存在于对象中：

```js
const person = {
  name: 'Alice',
  age: 25
}

function createNewPerson () {
  let name = 'Charlie'
  let age = 20
  // eslint-disable-next-line
//  with (person) {
  name = 'David' // 本意是更新person的name属性
  age = 35 // 本意是更新person的age属性
  // 由于person没有phone属性，所以这将创建一个全局变量phone
  phone = '123-456-7890'
  //  }

  // 调用者可能预期这里的name和age还是'Charlie'和20 - 因为 with 预期是更改 person 的属性；
  console.log(name, age) // 输出: 'David' 35，而非'Charlie', 20
}

createNewPerson()

console.log(window.phone) // 输出: '123-456-7890'
```

在这个例子里：

* `name`和`age`都是局部变量，但它们被`with(person)`覆盖了，因为`person`对象确实有这样的属性。
* `phone`属性不在`person`对象中，`with`语句创建了一个全局变量`phone`。

这展示了`with`语句如何引入两个潜在的陷阱：

1. **局部变量被意外覆盖：** 函数内部的`name`和`age`变量被覆盖，因为`with`语句使得`person`对象的属性在作用域链中的优先级高于局部变量。

2. **意外的全局变量：** 因为`person`对象中没有`phone`属性，所以`phone`变成了一个全局变量。

这些情况可能会导致难以追踪的错误和未预期的副作用，这正是为何严格模式中不允许使用`with`语句的原因之一。在严格模式中，代码会因试图使用`with`而抛出语法错误，上述的误导性行为就不会发生。

## 递归和尾递归是什么概念? {#p1-recursive}

递归和尾递归都是指在函数内部调用自身的方式，但它们有一些关键的区别。

**概念**

递归是一种函数调用自身的方式。在递归中，函数会不断地调用自身，直到满足某个终止条件才停止递归。递归通常使用在解决可以通过重复拆分为更小的子问题来解决的问题上。但是，递归可能会导致函数调用的层级过深，消耗大量的内存，因为每次递归调用都会在内存中创建一个新的函数调用帧。如果没有正确的终止条件，递归可能会导致无限循环。

尾递归是一种特殊的递归形式，在尾递归中，递归调用是函数的最后一个操作，并且递归调用的结果直接返回，没有进行任何额外的操作。因此，尾递归不会导致函数调用栈的增长，每次递归调用都会覆盖当前的函数帧。尾递归可以避免函数调用栈溢出的问题，因为它在递归调用时不会导致函数调用栈的增长。尾递归通常使用在需要迭代大量数据的情况下，可以有效地优化性能。

要注意，不是所有的递归都可以被优化为尾递归，只有当递归调用是函数的最后一个操作时，才可以进行尾递归优化。在一些编程语言中，编译器或解释器可以自动进行尾递归优化，将尾递归转换为迭代循环，从而提高性能。但在一些语言中，需要显示地使用尾递归优化的技巧，如使用尾递归函数的辅助参数来保存中间结果。

**示例**

下面是一个递归函数的例子，用于计算一个正整数的阶乘：

```js
function factorial (n) {
  if (n === 0) { // 终止条件
    return 1
  } else {
    return nfactorial(n - 1) // 递归调用
  }
}

console.log(factorial(5)) // 输出 120
```

现在，我们将对上述递归函数进行尾递归优化。在这个例子中，我们使用一个辅助参数`result`来保存每次递归调用的结果，并将其作为参数传递给下一次递归调用。这样，递归调用不会导致函数调用栈的增长。

```js
function factorialTail (n, result = 1) {
  if (n === 0) { // 终止条件
    return result
  } else {
    return factorialTail(n - 1, nresult) // 尾递归调用
  }
}

console.log(factorialTail(5)) // 输出 120
```

通过使用尾递归优化，我们可以避免函数调用栈的溢出，并提高函数的性能。

**如何理解：只有当递归调用是函数的最后一个操作时，才可以进行尾递归优化**

在一个函数中，如果递归调用之后还有其他的操作或表达式需要执行，那么这个递归调用就不是尾递归。在这种情况下，函数需要等待递归调用的返回值，然后才能进行下一步操作。

而尾递归是指在函数的最后一步操作中进行的递归调用。这意味着函数在调用自身之后没有其他操作或表达式需要执行，直接返回递归调用的结果。这种情况下，函数可以被优化为尾递归形式，避免函数调用栈的溢出和性能问题。

在尾递归优化的代码示例中，递归调用factorialTail(n - 1, nresult)是函数factorialTail的最后一步操作，它的返回值直接作为函数的返回值，没有其他操作需要执行。因此，这个递归调用是尾递归，可以进行尾递归优化。

## 副作用是什么概念 {#p0-effecitve}

在 JavaScript 中，`副作用（side effect）`是指函数或表达式在执行过程中对外部环境产生的影响，而不仅仅是返回一个值。副作用可能包括但不限于对全局变量、参数、数据结构、文件系统、网络请求等进行修改。

副作用可以是有意为之，也可以是无意之间发生的。在函数式编程中，减少副作用是一种被推崇的编程风格，因为副作用使得代码的行为更难以跟踪和理解，容易引发不可预见的 bug。尽可能减少副作用有助于代码更加可靠、可测试和易于维护。

以下是一些常见的 JavaScript 中可能产生副作用的操作：

1. **修改全局变量**：直接对全局变量进行赋值或修改会导致副作用。
2. **修改函数参数**：修改传入函数的参数值也会引起副作用。
3. **`I/O` 操作**：与文件系统、网络请求等进行交互时，可能会对外部环境产生副作用。
4. **修改数据结构**：对数组、对象等数据结构进行添加、删除或修改操作会改变它们的状态，也属于副作用。

在函数式编程中，函数应该尽量避免产生副作用，而是通过纯函数的方式，根据输入返回一个确定的输出，不修改外部环境的状态。
这样可以提高代码的可测试性、可复用性和可维护性。

## 异步编程的实现方式? {#p0-async-programing}

异步编程的实现方式有以下几种：

1. 回调函数

回调函数是最基本的异步编程方式。在执行异步操作时，将回调函数作为参数传递给异步函数，异步函数在操作完成后将结果传递给回调函数，回调函数再进行下一步操作。例如：

```
function getData(callback) {
 setTimeout(function () {
 callback('Data received');
 }, 1000);
}

getData(function(data) {
 console.log(data); // 'Data received'
});
```

2. Promise

Promise 是一种更高级的异步编程方式。通过 Promise 对象可以管理异步操作的状态、结果与错误。Promise 支持链式调用，使得异步操作的多个步骤可以更加清晰地表达。例如：

```
function getData() {
 return new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

getData().then(function(data) {
 console.log(data); // 'Data received'
});
```

3. Async/await

Async/await 是基于 Promise 的一种语法糖，使异步操作的代码更加简单、易读。通过在函数前面加上 async 关键字，可以将函数变成 async 函数，使用 await 关键字可以等待 Promise 对象的结果。例如：

```
function getData() {
 return new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

async function outputData() {
 const data = await getData();
 console.log(data); // 'Data received'
}

outputData();
```

4. Generator

Generator 是一种能够暂停和恢复执行的函数，可以用来实现异步编程。通过在函数中使用 yield 关键字可以暂停函数的执行，并在需要时恢复执行。例如：

```
function* getData() {
 yield new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

const gen = getData();

gen.next().value.then(function(data) {
 console.log(data); // 'Data received'
});
```

总的来说，异步编程的实现方式有很多，不同的方式适用于不同的情况。在实际编码中，需要根据具体情况选择合适的方式来实现异步操作。
