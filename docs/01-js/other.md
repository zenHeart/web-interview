# 杂项

## iterator ?

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

## amd、commonjs、esm 理解

## 实现一个 sum 函数，支持任意个参数的累加，在 console.log 时输出结果？{#p1-sum-function}

```js
// example1
console.log(sum(1)(2)(3, 4)) // 10

// example2
console.log(sum(1, 2, 3, 4)) // 10
```

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
