# 函数

## 箭头函数的典型使用?

1. **简洁的语法形式**：箭头函数使用了更简洁的语法形式，省略了传统函数声明中的`function`关键字和大括号。它通常可以在更少的代码行数中表达相同的逻辑。
2. **没有自己的this**：箭头函数没有自己的`this`绑定，它会捕获所在上下文的`this`值。这意味着箭头函数中的`this`与其定义时所在的上下文中的`this`保持一致，而不是在函数被调用时动态绑定。这可以避免传统函数中常见的`this`指向问题，简化了对`this`的使用和理解。
3. **没有`arguments`对象**：箭头函数也没有自己的`arguments`对象。如果需要访问函数的参数，可以使用剩余参数（Rest Parameters）或使用展开运算符（Spread Operator）将参数传递给其他函数。
4. **无法作为构造函数**：箭头函数不能用作构造函数，不能使用`new`关键字调用。它们没有`prototype`属性，因此无法使用`new`关键字创建实例。
5. **隐式的返回值**：如果箭头函数的函数体只有一条表达式，并且不需要额外的处理逻辑，那么可以省略大括号并且该表达式将隐式作为返回值返回。
6. **不能绑定自己的this、super、new.target**：由于箭头函数没有自己的`this`绑定，也无法使用`super`关键字引用父类的方法，也无法使用`new.target`获取构造函数的引用。

**作用**

1. **简化普通函数**：箭头函数提供了更简洁的语法形式，可以在需要定义函数的地方使用更短的代码来表达同样的逻辑。这可以提高代码的可读性和维护性。
2. **保留上下文**：箭头函数没有自己的`this`绑定，它会捕获所在上下文的`this`值。这意味着在箭头函数中，`this`的值是在函数定义时确定的，而不是在函数被调用时动态绑定。这种特性可以避免传统函数中的`this`绑定问题，并使代码更易于理解和维护。

**使用场景**

1. 简化函数表达式：当需要定义一个简单的函数表达式时，可以使用箭头函数代替传统的函数表达式，减少代码量。

 ```js
 // 传统函数表达式
 const sum = function(a, b) {
 return a + b;
 };

 // 箭头函数
 const sum = (a, b) => a + b;
 ```

2. 箭头函数作为回调函数：当需要传递回调函数时，箭头函数可以提供更简洁的语法形式，同时保留外层上下文中的`this`。

 ```js
 // 传统回调函数
 someFunction(function () {
   console.log(this) // 外层上下文的this
 })
 
 // 箭头函数作为回调函数
 someFunction(() => {
   console.log(this) // 外层上下文的this
 })
 ```

3. 简化函数中的`this`绑定问题：由于箭头函数没有自己的`this`绑定，可以避免使用传统函数中常见的`bind`、`call`或`apply`等方法来绑定`this`。

 ```js
 // 传统函数中的this绑定
 const obj = {
 value: 42,
 getValue: function() {
 setTimeout(function() {
 console.log(this.value); // undefined，因为此时this指向全局对象
 }, 1000);
 }
 };

 // 使用箭头函数避免this绑定问题
 const obj = {
 value: 42,
 getValue: function() {
 setTimeout(() => {
 console.log(this.value); // 42，箭头函数捕获了外层上下文的this
 }, 1000);
 }
 };

 // ```
 ```

## call,apply,bind 区别？ {#p0-call-apply-bind}

<Answer>

call、apply 和 bind 都是 JavaScript 中用于改变函数执行上下文（即 this 指向）的方法，它们的区别和用法如下：

all

call 方法可以改变函数的 this 指向，同时还能传递多个参数。
**call 方法的语法如下：**

```js
fun.call(
  thisArg, arg1, arg2 // ...
)
```

fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
arg1, arg2, ...：传递给函数的参数列表。

**call 方法的使用示例：**

```js
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(`Hello, ${this.name}!`)
  }
}

const person2 = {
  name: 'Bob'
}

person.sayHello.call(person2) // 输出：Hello, Bob!
```

pply

apply 方法和 call 方法类似，它也可以改变函数的 this 指向，但是它需要传递一个数组作为参数列表。
**apply 方法的语法如下：**

```js
fun.apply(thisArg, [argsArray])
```

fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
argsArray：传递给函数的参数列表，以数组形式传递。

**apply 方法的使用示例：**

```js
const person = {
  name: 'Alice',
  sayHello: function (greeting) {
    console.log(`${greeting}, ${this.name}!`)
  }
}

const person2 = {
  name: 'Bob'
}

person.sayHello.apply(person2, ['Hi']) // 输出：Hi, Bob!
```

ind

bind 方法和 call、apply 方法不同，它并不会立即调用函数，而是返回一个新的函数，这个新函数的 this 指向被绑定的对象。
**bind 方法的语法如下：**

```js
// fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

fun：要调用的函数。
thisArg：函数内部 this 指向的对象。
arg1, arg2, ...：在调用函数时，绑定到函数参数的值。

**bind 方法的使用示例：**

```js
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(`Hello, ${this.name}!`)
  }
}

const person2 = {
  name: 'Bob'
}

const sayHelloToBob = person.sayHello.bind(person2)
sayHelloToBob() // 输出：Hello, Bob!
```

**参数传递**
在使用 bind 方法时，我们可以通过传递参数来预先填充函数的一些参数，这样在调用函数时只需要传递剩余的参数即可。

```js
const person = {
  name: 'Alice',
  sayHello: function (greeting, punctuation) {
    console.log(`${greeting}, ${this.name}, ${punctuation}`)
  }
}

const person2 = {
  name: 'Bob'
}

const sayHelloToBob = person.sayHello.bind(person2)

sayHelloToBob(1, 2) // 输出：1, Bob, 2
```

**再举一个例子：**

```js
this.x = 9 // 在浏览器中，this 指向全局的 "window" 对象
const module = {
  x: 81,
  getX: function () { return this.x }
}

module.getX() // 81

const retrieveX = module.getX
retrieveX()
// 返回 9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
const boundGetX = retrieveX.bind(module)
boundGetX() // 81
```

`call,apply,bind` 是函数对象三个重要的原型方法,用来动态改变 js 函数执行时的 this 的指向

* 相同点
  * 都是用来改变 this 的值
* 不同点
  * call,apply 传参方式不同,直接返回执行结果
    * call 调用格式 `function.call(thisArg, arg1, arg2, ...)`
    * apply 调用格式 `func.apply(thisArg, [argsArray])`
  * bind 调用格式为 `function.bind(thisArg[, arg1[, arg2[, ...]]])` 返回的是函数

引擎是如何实现对执行环境动态改变的？

</Answer>

## IIFE 是什么？

<Answer>
IIFE 是立即执行函数表达式。

要理解 IIFE 必须知晓函数申明和函数表达式的区别。一个最简单的判别方法是若 **function** 关键字未出现一行的开头则且不属于上一行的组成部分则为函数申明否则为函数表达式。

所以只要函数表达式被立即调用则称之为 IIFE.

此外函数表达式和函数申明具有如下区别

1. 函数表达式不会被提升
2. 函数表达式的标识符是可省略的
3. 函数表达式的标识符作用域为该函数体,外部执行环境无法使用
4. 具名函数表达式的名称作为函数名,匿名函数名称取决于申明方式

推荐阅读:

* [Named function expressions demystified](https://kangax.github.io/nfe/)

</Answer>

## generator

1. generator 是迭代器
2. 用来实现协程
3. 典型使用场景

enerator 基本概念

ES6中的 Generator（生成器）是一种特殊类型的函数，它可以被暂停和恢复。这意味着在调用Generator函数时，它不会立即执行，而是返回一个可暂停执行的Generator对象。在需要的时候，可以通过调用.next()方法来恢复函数的执行。这使得我们能够编写更具表现力和灵活性的代码。

Generator函数使用特殊的语法：在函数关键字后面添加一个星号(*)。Generator函数中可以使用一个新的关键字yield，用于将函数的执行暂停，并且可以将一个值返回给调用者。

以下是一个简单的 Generator 函数的例子：

```js
function * generateSequence () {
  yield 1
  yield 2
  yield 3
}

const generator = generateSequence()

console.log(generator.next().value) // 1
console.log(generator.next().value) // 2
console.log(generator.next().value) // 3
```

在上面的例子中，generateSequence()是一个Generator函数，它定义了一个简单的数列生成器。在函数中，使用了yield关键字，以便能够暂停函数执行。最后，我们通过调用generator.next()方法来恢复函数的执行，并逐步返回生成器中的每一个值。

Generator函数也可以接收参数，并且可以在每次迭代时使用不同的参数值。这使得它们能够以更灵活的方式生成数据。

以下是一个带参数的Generator函数的例子：

```js
function * generateSequence (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

const generator = generateSequence(1, 5)

console.log(generator.next().value) // 1
console.log(generator.next().value) // 2
console.log(generator.next().value) // 3
console.log(generator.next().value) // 4
console.log(generator.next().value) // 5
```

Generator是一种非常有用的工具，它能够帮助我们编写更灵活和表达力强的代码。它们在异步编程、迭代器和生成器等场景中得到了广泛的应用。

 async/await 有啥关系？

Generator 和 async/await 都是 ES6 中引入的异步编程解决方案，它们本质上都是利用了 JavaScript 中的协程（coroutine）。

Generator 和 async/await 都是 JavaScript 中用于异步编程的方式，它们的本质相同，都是利用了生成器函数的特性来实现异步操作。

在 ES5 中，JavaScript 使用回调函数实现异步编程，但是这样会导致回调嵌套过深，代码可读性差、难以维护。Generator 和 async/await 的出现解决了这个问题，它们让异步编程更加像同步编程，使代码可读性和可维护性得到了大幅提升。

**Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。而 async/await 则是基于 Promise 实现的语法糖，可以使异步代码看起来像同步代码，代码结构更加清晰明了。**

在使用上，Generator 和 async/await 都需要通过一些特定的语法来实现异步操作，不同的是 async/await 通过 await 关键字等待 Promise 对象的解决，而 Generator 则是通过 yield 关键字暂停函数执行，并返回一个 Generator 对象，通过 next 方法控制函数的继续执行和结束。另外，async/await 可以更好地处理 Promise 的错误，而 Generator 需要使用 try/catch 语句来捕获错误。

Generator 和 async/await 可以互相转换，这意味着我们可以使用 Generator 来实现 async/await 的功能，也可以使用 async/await 来调用 Generator 函数。

```js
function * gen () {
  yield 1
  yield 2
  yield 3
}

async function test1 () {
  for await (const x of gen()) {
    console.log(x)
  }
}

test1() // 输出 1, 2, 3
```

在上面的代码中，`for await...of` 循环语句可以遍历 `Generator` 函数生成的迭代器，从而实现异步迭代。注意在调用 for await...of 时需要使用 yield* 关键字来进行委托。

Generator 函数使用 await 调用示例：

```js
function * generator () {
  const result1 = yield asyncTask1()
  const result2 = yield asyncTask2(result1)
  return result2
}

async function runGenerator () {
  const gen = generator()
  const result1 = await gen.next().value
  const result2 = await gen.next(result1).value
  const finalResult = await gen.next(result2).value
  console.log(finalResult)
}

runGenerator()
```

在 JavaScript 中，有三种类型的迭代器：

* **Array Iterator（数组迭代器）**：通过对数组进行迭代以访问其元素。

* **String Iterator（字符串迭代器）**：通过对字符串进行迭代以访问其字符。

* **Map Iterator（映射迭代器）和 Set Iterator（集合迭代器）**：通过对 Map 和 Set 数据结构进行迭代以访问其键和值。

此外，在 ES6 中，我们还可以使用自定义迭代器来迭代对象中的元素。我们可以使用 Symbol.iterator 方法来创建自定义迭代器，该方法返回一个具有 next 方法的迭代器对象。

另外，`Generator` 函数可以看作是一种特殊的迭代器，它能够暂停执行和恢复执行，使得我们可以通过控制迭代器的执行来生成序列。

rray Iterator（数组迭代器）有哪些迭代方法？

Array Iterator（数组迭代器）是针对 JavaScript 数组的迭代器，它可以通过 `Array.prototype[Symbol.iterator]()` 方法来获取。

获取到数组迭代器后，我们可以使用以下迭代方法：

`next()`: 返回一个包含 value 和 done 属性的对象，value 表示下一个元素的值，done 表示是否迭代结束。

`return()`: 用于提前终止迭代，并返回给定的值。

`throw()`: 用于向迭代器抛出一个异常。

下面是一个使用迭代器的示例代码：

```js
const arr = ['a', 'b', 'c']
const iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: 'a', done: false }
console.log(iterator.next()) // { value: 'b', done: false }
console.log(iterator.next()) // { value: 'c', done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

除了以上的迭代方法，还可以通过 for...of 语句来使用迭代器，如下所示：

```js
const arr = ['a', 'b', 'c']
for (const item of arr) {
  console.log(item)
}
// output:
// a
// b
// c
```

另外，数组迭代器除了上述的迭代方法，还可以使用 forEach()、map()、filter()、reduce() 等常见数组方法进行迭代操作；

tring Iterator（字符串迭代器） 有哪些迭代方法？

`String Iterator` 是 ES6 引入的一种迭代器，可以用于遍历字符串。String Iterator 没有自己的迭代方法，但可以使用通用的迭代方法。以下是 String Iterator 可以使用的迭代方法：

`next()`：返回迭代器的下一个值，格式为 `{value: string, done: boolean}`。
`Symbol.iterator`：返回一个迭代器对象，可以使用 for...of 循环来遍历字符串。

示例代码如下：

```js
const str = 'hello'
const strIterator = str[Symbol.iterator]()

console.log(strIterator.next()) // { value: 'h', done: false }
console.log(strIterator.next()) // { value: 'e', done: false }
console.log(strIterator.next()) // { value: 'l', done: false }
console.log(strIterator.next()) // { value: 'l', done: false }
console.log(strIterator.next()) // { value: 'o', done: false }
console.log(strIterator.next()) // { value: undefined, done: true }

for (const char of str) {
  console.log(char)
}
// Output:
// h
// e
// l
// l
// o
```

ap Iterator（映射迭代器）和 Set Iterator（集合迭代器）有哪些迭代方法？

**Map Iterator 和 Set Iterator 都有以下迭代方法：**
`next()`: 返回迭代器中下一个元素的对象，对象包含 value 和 done 两个属性。value 属性是当前元素的值，done 属性表示迭代器是否已经迭代完成。
`Symbol.iterator`: 返回迭代器本身，使其可被 for...of 循环使用。

**Map Iterator 还有以下方法：**
`entries()`: 返回一个新的迭代器对象，该迭代器对象的元素是 [key, value] 数组。
`keys()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Map 中的键名。
`values()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Map 中的键值。

**Set Iterator 还有以下方法：**
`entries()`: 返回一个新的迭代器对象，该迭代器对象的元素是 [value, value] 数组。
`keys()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Set 中的值。
`values()`: 返回一个新的迭代器对象，该迭代器对象的元素是 Set 中的值。

**Map Iterator 使用举例**

```js
const myMap = new Map()
myMap.set('key1', 'value1')
myMap.set('key2', 'value2')
myMap.set('key3', 'value3')

const mapIterator = myMap.entries()

console.log(mapIterator.next().value) // ["key1", "value1"]
console.log(mapIterator.next().value) // ["key2", "value2"]
console.log(mapIterator.next().value) // ["key3", "value3"]
console.log(mapIterator.next().value) // undefined
```

**Set Iterator 使用举例**

```js
const mySet = new Set(['apple', 'banana', 'orange'])

// 使用 for...of 循环遍历 Set
for (const item of mySet) {
  console.log(item)
}

// 使用 Set 迭代器手动遍历 Set
const setIterator = mySet.values()
let next = setIterator.next()
while (!next.done) {
  console.log(next.value)
  next = setIterator.next()
}
```

## async await 原理，手写 async 函数?

1. ES8 引入的特性来简化 promise 的使用
2. 采用 迭代器可以实现 async await 方法模拟
