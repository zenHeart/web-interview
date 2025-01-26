# 杂项

## iterator ? {#p0-iterator}

在 JavaScript 中，Iterator（迭代器）对象具有以下特征：

**一、定义与目的**

1. **实现特定迭代行为**：

* Iterator 对象是为了实现对可迭代对象（如数组、字符串、集合等）的遍历操作而设计的。它提供了一种标准化的方式来依次访问可迭代对象中的元素。

**二、主要特征**

1. **具有`next()`方法**：

* Iterator 对象必须有一个`next()`方法。每次调用这个方法，它会返回一个对象，该对象包含两个属性：
* `value`：表示当前迭代位置的元素值。如果迭代已经完成，这个值为`undefined`。
* `done`：一个布尔值，表示迭代是否已经完成。如果迭代完成，`done`为`true`；否则为`false`。
* 例如：

 ```javascript
 const iterable = [1, 2, 3]
 const iterator = iterable[Symbol.iterator]()
 console.log(iterator.next()) // { value: 1, done: false }
 console.log(iterator.next()) // { value: 2, done: false }
 console.log(iterator.next()) // { value: 3, done: false }
 console.log(iterator.next()) // { value: undefined, done: true }
 ```

2. **与可迭代对象关联**：

* Iterator 对象通常是由可迭代对象通过调用其`Symbol.iterator`方法生成的。不同的可迭代对象可以生成不同的 Iterator 对象，但它们都遵循相同的`next()`方法约定。
* 例如，数组的`Symbol.iterator`方法会返回一个 Iterator 对象，用于遍历数组的元素。

3. **单向遍历**：

* Iterator 对象通常只能进行单向遍历，即从可迭代对象的起始位置依次访问到结束位置，不能反向遍历。一旦迭代完成，再次调用`next()`方法将始终返回`{ value: undefined, done: true }`。

4. **可用于各种迭代场景**：

* Iterator 对象可以与`for...of`循环、扩展运算符（`...`）、解构赋值等语言特性一起使用，使得对可迭代对象的遍历更加简洁和方便。
* 例如：

 ```javascript
 const iterable = [1, 2, 3]
 for (const value of iterable) {
   console.log(value)
 }
 ```

* 这里的`for...of`循环内部会自动调用可迭代对象的`Symbol.iterator`方法获取 Iterator 对象，并依次调用其`next()`方法来遍历元素。

Iterator 对象在 JavaScript 中提供了一种灵活和统一的方式来遍历可迭代对象，通过`next()`方法和特定的返回值格式，实现了对可迭代对象的有序访问和迭代控制。

 1、Iterator 的概念

JavaScript 原有的表示 “ 集合 ” 的数据结构，主要是数组（ Array ）和对象（ Object ）， ES6 又添加了 Map 和 Set 。
这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是 Map ， Map 的成员是对象。
这样就需要一种统一的接口机制，来处理所有不同的数据结构。
遍历器（ Iterator ）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环， Iterator 接口主要供for...of消费。

Iterator 的遍历过程是这样的。

* （ 1 ）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
* （ 2 ）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
* （ 3 ）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
* （ 4 ）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。
具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

 2、数据结构的默认 Iterator 接口

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
在 ES6 中，有三类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、 Set 和 Map 结构。

实例：

```javascript
const arr = ['a', 'b', 'c']
const iter = arr[Symbol.iterator]()
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面提到，原生就部署 Iterator 接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

 3、调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

 3.1、解构赋值

对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
实例1：

```javascript
const set = new Set().add('a').add('b').add('c')
const [x, y] = set
// x='a'; y='b'
const [first, ...rest] = set
// first='a'; rest=['b','c'];
```

 3.2、扩展运算符

扩展运算符（ ... ）也会调用默认的 iterator 接口。
实例2：

```javascript
// 例一
const str = 'hello';
[...str] // ['h','e','l','l','o']
// 例二
const arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

 3.3、yield*

yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
实例3：

```javascript
const generator = function * () {
  yield 1
  yield * [2, 3, 4]
  yield 5
}
const iterator = generator()
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

 3.4、其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

* for...of
* Array.from()
* Map(), Set(), WeakMap(), WeakSet() （比如new Map([['a',1],['b',2]])）
* Promise.all()
* Promise.race()

 4、Iterator 接口与 Generator 函数

Symbol.iterator方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
实例：

```js
const myIterable = {}
myIterable[Symbol.iterator] = function * () {
  yield 1
  yield 2
  yield 3
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法
const obj = {
  [Symbol.iterator] () {
  // yield 'hello';
  // yield 'world';
  }
}
for (const x of obj) {
  console.log(x)
}
// hello
// world
```

## amd、commonjs、esm 理解

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

```javascript
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

```javascript
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

```javascript
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
