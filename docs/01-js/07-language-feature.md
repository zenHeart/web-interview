# 语言特性

## 解构复制对象， 是深拷贝还是浅拷贝 {#p2-destructuring-copy-object}

**浅拷贝**

举例：

```javascript
const obj = {
  prop1: 'value1',
  prop2: {
    nestedProp: 'nestedValue'
  }
}

// 使用扩展运算符进行复制
const obj2 = { ...obj }

console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)

// 修改基本类型属性
obj2.prop1 = 'newValue1'
console.log('修改基本类型属性后：')
console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)

// 修改嵌套对象的属性
obj2.prop2.nestedProp = 'newNestedValue'
console.log('修改嵌套对象属性后：')
console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)
```

解释如下：

1. 首先定义了一个对象`obj`，它包含一个基本类型属性`prop1`和一个嵌套对象属性`prop2`。
2. 使用扩展运算符`{...obj}`创建了一个新的对象`obj2`，这看起来像是对`obj`进行了复制。
3. 当修改`obj2`的基本类型属性`prop1`时，原始对象`obj`的`prop1`不受影响。这是因为基本类型的值在复制时是按值复制的。
4. 然而，当修改`obj2`的嵌套对象属性`prop2.nestedProp`时，原始对象`obj`的`prop2.nestedProp`也被修改了。这是因为扩展运算符对于嵌套对象只是复制了引用，而不是创建一个全新的嵌套对象副本，所以这是浅拷贝的行为。

## for...of、for...in、for 循环， 三者有什么区别 {#p0-loop}

**关键词**：for...in遍历、for...of遍历

以下是 `for...of`、`for...in` 和 `for` 循环的区别对比表格：

| 特性 | for...of 循环 | for...in 循环 | for 循环 |
|------------------|----------------------------------------------------------------|-----------------------------------------------------------|------------------------------------------------------------|
| 遍历对象类型 | 可以遍历可迭代对象（如数组、字符串、Set、Map、Generator 等） | 可以遍历对象的可枚举属性 | 不适用于直接遍历对象，适用于遍历数组或固定个数的循环 |
| 遍历数组 | 遍历数组的元素 | 遍历数组的索引 | 遍历数组的索引或值 |
| 遍历字符串 | 遍历字符串的字符 | 遍历字符串的索引 | 遍历字符串的索引或字符 |
| 遍历 Set | 遍历 Set 的值 | 不适用 | 不适用 |
| 遍历 Map | 遍历 Map 的键值对 | 不适用 | 不适用 |
| 遍历对象 | 不适用 | 遍历对象的可枚举属性及其对应的值 | 不适用 |
| 遍历 Generator | 遍历 Generator 生成的值 | 不适用 | 不适用 |
| 遍历可迭代对象 | 遍历可迭代对象的元素 | 不适用 | 不适用 |
| 适用范围 | 适用于需要遍历可迭代对象的场景 | 适用于需要遍历对象的可枚举属性的场景 | 适用于需要手动控制循环次数的场景 |
| 遍历顺序 | 按照可迭代对象的顺序进行遍历 | 不保证顺序 | 按照循环次数进行遍历 |

需要注意的是，`for...of` 循环只能用于可迭代对象，并且会遍历对象的迭代器方法（即 `Symbol.iterator`），而 `for...in` 循环会遍历对象的所有可枚举属性，包括原型链上的属性。

对于遍历数组的场景，可以使用 `for...of` 循环遍历数组的元素，也可以使用 `for` 循环遍历数组的索引或值。具体选择哪种方式取决于遍历的目的和需求。

以下是一个使用不同循环方式遍历数组的示例：

```javascript
const arr = [1, 2, 3]

console.log('for...of 循环:')
for (const element of arr) {
  console.log(element)
}

console.log('for...in 循环:')
for (const index in arr) {
  console.log(arr[index])
}

console.log('for 循环:')
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```

输出结果为：

```
for...of 循环:
1
2
3
for...in 循环:
1
2
3
for 循环:
1
2
3
```

## 对象冻结 {#p0-freeze}

**冻结对象**

要冻结一个 JavaScript 对象，以防止别人更改它，可以使用`Object.freeze()`方法。`Object.freeze()`方法会递归地冻结一个对象的所有属性，使其变为只读的，并防止更改、删除或添加新属性。以下是使用`Object.freeze()`方法冻结对象的示例：

```javascript
const obj = {
  prop1: 1,
  prop2: 'Hello'
}

Object.freeze(obj)

// 尝试更改属性的值
obj.prop1 = 2 // 不会生效，obj.prop1仍然为1

// 尝试删除属性
delete obj.prop2 // 不会生效，obj仍然包含prop2属性

// 尝试添加新属性
obj.prop3 = true // 不会生效，obj不会添加新属性

console.log(obj)
```

在上述示例中，通过调用`Object.freeze(obj)`方法，将`obj`对象冻结，使其变为只读。此后，无论是更改、删除还是添加属性，都不会对对象产生任何影响。最后，通过`console.log(obj)`输出对象，可以看到对象保持不变，即使尝试进行更改。

需要注意的是，`Object.freeze()`方法只会冻结对象的直接属性，而不会冻结嵌套对象的属性。如果需要递归地冻结嵌套对象的属性，可以编写一个递归函数来处理。

**深度冻结**

要冻结嵌套属性，可以使用一个递归函数来处理。该函数会遍历对象的所有属性，并对每个属性进行冻结。以下是一个示例：

```javascript
function deepFreeze (obj) {
  // 首先冻结当前对象
  Object.freeze(obj)

  // 遍历对象的所有属性
  for (const key of Object.keys(obj)) {
    const value = obj[key]

    // 如果属性是对象类型，则递归调用deepFreeze函数
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value)
    }
  }

  return obj
}

const obj = {
  prop1: 1,
  prop2: {
    nestedProp1: 'Hello',
    nestedProp2: [1, 2, 3]
  }
}

const frozenObj = deepFreeze(obj)

// 尝试更改嵌套属性的值
frozenObj.prop2.nestedProp1 = 'World' // 不会生效，嵌套属性仍然为'Hello'

console.log(frozenObj)
```

在上述示例中，我们定义了一个名为`deepFreeze`的递归函数。该函数首先会对当前对象进行冻结（调用`Object.freeze(obj)`），然后遍历对象的所有属性。如果属性是对象类型，则递归调用`deepFreeze`函数，对嵌套对象进行冻结。

通过调用`deepFreeze(obj)`函数，我们将`obj`对象及其嵌套属性都冻结，并将结果赋值给`frozenObj`。尝试更改嵌套属性的值后，输出`frozenObj`，可以看到对象保持不变，嵌套属性的值没有被更改。

需要注意的是，`deepFreeze`函数并不会修改原始对象，而是返回一个新的冻结对象。如果需要修改原始对象，可以将冻结的属性逐个复制到一个新对象中。

## eval 了解多少？ {#p1-eval}

`eval()` 是 JavaScript 的一个全局函数，用于解析并执行字符串代码。

它接受一个字符串参数，该字符串包含 JavaScript 表达式或语句。在 `eval` 函数执行期间，该字符串的内容将被视为有效 JavaScript 代码，并运行当前作用域中的变量和函数。`eval()` 函数返回执行结果的值。

举个例子：

```js
const x = 1
const y = 2
const result = eval('x + y') // 将字符串作为代码执行
console.log(result) // 输出 3
```

`eval()` 常被认为是一个危险的函数，原因是它可以执行任何字符串。如果 `eval()` 执行了用户输入的文本，攻击者可能会注入恶意代码，从而窃取敏感信息或操纵应用程序。因此，最好不要在程序中使用 `eval()` 函数，除非你非常明确及了解其潜在风险。

除了 `eval()`，JavaScript 还提供了其他如 `Function()` 构造函数或 `setTimeout()` 等能够执行字符代码的方法，但它们的使用都需要非常小心。

 eval 的性能为何比静态编写和编译的代码要慢

`eval()` 函数解析并执行动态的字符串代码，因此在运行时需要进行代码分析和编译。每次调用 `eval()` 都需要重复执行这些操作，这对性能的影响非常大。同时，由于 `eval()` 执行的代码是字符串形式并不是预编译的机器代码，在执行时可能需要使用更多的内存和 CPU 资源。

相比之下，静态编写的代码在编译时已经被转化为机器代码，因此执行速度会更快。编译器可以进行多项优化，例如移除无用的代码，减少内存分配等。这些优化在运行时是不可能完成的，因此 `eval()` 函数的性能相对较低。

 eval 性能一定就很差吗

不是所有情况下 `eval()` 函数的性能都很差。在某些情况下，`eval()` 的性能可能与静态编写的代码相当。例如，如果动态代码比较简单，并且在程序运行期间只会执行一次，那么使用 `eval()` 不会造成显著的性能损失。但是如果动态代码比较复杂，并且需要经常执行，那么使用 `eval()` 的性能就会显著低于静态编写的代码。

另外，`eval()` 的性能问题还取决于运行时环境的不同。在某些浏览器中，使用 `eval()` 时会导致缓慢的 JavaScript 执行，而在其他浏览器中则表现良好。因此，在编写代码时，应该始终将性能作为一个重要的因素进行考虑，并根据实际情况来选择使用 `eval()` 或其他适当的解决方案。

 eval 有什么优势

`eval()` 函数有以下几个优势：

1. 动态执行代码：`eval()` 函数可以动态地将字符串解析为 JavaScript 代码并执行，从而可以在运行时动态生成代码并执行。这种动态性使得 `eval()` 函数在一些特定的编程场景中非常有用，例如动态计算表达式、动态生成函数等。

2. 灵活性高：由于 `eval()` 函数可以动态解析字符串并执行其中的 JavaScript 代码，因此可以根据需要在运行时动态生成代码，而不必在编写代码时预先定义。这种灵活性使得 `eval()` 函数在一些需要动态生成代码的场景中非常有用。

3. 命名空间：由于 `eval()` 函数会执行其中的 JavaScript 代码，因此代码可以利用当前作用域中的变量和函数，从而可以有效地利用命名空间并提高代码的复用性。

**缺点**

虽然 `eval()` 函数具有上述优势，但它也存在潜在的安全隐患，因此应当避免在应用程序中过度使用 `eval()` 函数，并在使用时注重安全性和可控性。

## const 和 readonly 的区别 {#p1-const-readonly}

TypeScript 中不可变量的实现方法有两种：

使用 ES6 的 const 关键字声明的值类型
被 readonly 修饰的属性
2、TypeScript 中 readonly：

TypeScript 中的只读修饰符，可以声明更加严谨的可读属性。通常在 interface 、 Class 、 type 以及 array 和 tuple 类型中使用它，也可以用来定义一个函数的参数。

3、两者区别：

（1）const 用于变量， readonly 用于属性

（2）const 在运行时检查， readonly 在编译时检查

（3）const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值；
readonly 修饰的属性能确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变。

```typescript
const foo: {
 readonly bar: number;
} = {
  bar: 123
}
function iMutateFoo (foo: { bar: number }) {
  foo.bar = 456
}
iMutateFoo(foo)
console.log(foo.bar) // 456
```

（4）const 保证的不是变量的值不得改动，而是变量指向的那个内存地址不得改动，例如使用 const 变量保存的数组，可以使用 push ， pop 等方法。
但是如果使用 `ReaonlyArray<number>` 声明的数组不能使用 push ， pop 等方法。

## JavaScript 异步解决方案的发展历程主要有哪些阶段？ {#p1-async-history}

JavaScript异步解决方案的发展历程主要有以下几个阶段：

1. 回调函数

最初，JavaScript采用回调函数的方式来解决异步编程问题。回调函数即在异步任务完成后调用的回调函数。例如，`setTimeout`函数就是一个使用回调函数的例子。

```javascript
setTimeout(() => {
  console.log('Hello, world!')
}, 1000)
```

回调函数的优点是简单易懂，缺点是嵌套层次多、代码难以维护。

2. jQuery.Deferred()

jQuery.Deferred()是jQuery提供的一种异步编程解决方案。它是一种Promise风格的API，使得异步操作可以更加简单和可读性更高。

jQuery.Deferred()可以用于串行和并行异步操作的组织和控制，避免了回调地狱和代码复杂性。

在使用过程中，通过使用jQuery.Deferred()的resolve()和reject()方法来决定异步操作的成功或失败，并且可以使用then()方法添加成功和失败的回调函数。

jQuery.Deferred()主要的优点包括：

* 简单易用：可以通过链式操作来组织和控制异步操作。
* 可读性高：可以使用then()方法添加成功和失败的回调函数，使代码的意图更加明确。
* 良好的兼容性：jQuery.Deferred()已经成为了jQuery的一部分，可以与其他jQuery的功能和插件良好地协作。

而缺点则包括：

* jQuery.Deferred()不能被取消，且对于异步操作的结果状态只能被设置一次。
* 依赖于jQuery库：因为jQuery.Deferred()是jQuery的一部分，所以需要依赖于jQuery库，不适合非jQuery项目。

3. Promise

Promise是ES6引入的一种异步编程解决方案，用于解决回调函数的嵌套问题。Promise是一个对象，表示异步操作的最终完成或失败。它有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise的优点是解决了回调函数嵌套的问题，使得代码可读性和可维护性更好。缺点是语法相对复杂。

```javascript
// Promise示例
function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

fetchData().then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

4. Generator

Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。

5. Async/Await

ES8引入了Async/Await语法，使得异步编程更加简单和可读。Async/Await是基于Promise实现的，可以看作是对Promise的一种封装。Async/Await语法可以让异步代码像同步代码一样书写，让代码的可读性更高。

```javascript
// Async/Await示例
async function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

async function run () {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

run()
```

Async/Await 的优点是语法简单易懂、可读性好，缺点是需要掌握Promise的基本用法。

综上，JavaScript 异步编程方案的发展历程从最初的回调函数到Promise再到Async/Await，每个阶段都解决了前一阶段存在的问题，使得异步编程更加方便和易读。但是，不同方案都有自己的优缺点，需要根据实际情况选择使用。

## decorator {#p1-decorator}

ES6 中的装饰器是一种特殊的语法，用于动态修改类的行为。在 JavaScript 中，装饰器本质上是一个函数，它可以接受一个类作为参数，并返回一个新的类，实现了类的增强或修改。装饰器可以被用于类、方法、属性等各种地方，可以方便地实现类似 AOP、元编程等功能。

装饰器是 ES7 中的一个提案，目前还没有正式纳入标准。在 ES6 中使用装饰器需要借助第三方库，如 babel-plugin-transform-decorators-legacy。

装饰器实现的基本原理是，在装饰器函数和被装饰对象之间建立一个代理层，通过代理层来实现装饰器的逻辑。在类的装饰器中，装饰器函数的第一个参数是被装饰的类本身，装饰器函数内部可以访问、修改该类的属性和方法。在方法和属性的装饰器中，装饰器函数的第一个参数分别是被装饰的方法或属性所在的类的原型对象，装饰器函数内部可以访问、修改该方法或属性的属性描述符等信息。

以下是一个简单的装饰器示例，用于给类的方法添加一个计时器：

```ts
function timer (target, name, descriptor) {
  const originalMethod = descriptor.value
  descriptor.value = function (...args) {
    console.time(name)
    const result = originalMethod.apply(this, args)
    console.timeEnd(name)
    return result
  }
  return descriptor
}

class MyClass {
 @timer
  myMethod () {
    // do something
  }
}
```

在上面的示例中，timer 函数就是一个装饰器函数，它接受三个参数，分别是被装饰的方法所在类的原型对象、被装饰的方法的名称、被装饰的方法的属性描述符。在 timer 函数内部，将被装饰的方法替换为一个新的方法，新方法先执行 console.time() 方法，再执行原始方法，最后执行 console.timeEnd() 方法。最后将新的属性描述符返回，完成方法的装饰。

通过类似这种方式，我们可以方便地实现各种类型的装饰器，以增强或修改类的行为。

## 继承方法

 1、借助构造函数实现继承

call和apply改变的是JS运行的上下文:

```javascript
/* 借助构造函数实现继承 */
function Parent (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
}

function Child (name) {
  Parent.call(this, name)
  this.type = 'child1'
}

const child = new Child('yanle')
child.getName()
console.log(child.type)
```

父类的this指向到了子类上面去，改变了实例化的this 指向，导致了父类执行的属性和方法，都会挂在到 子类实例上去；
缺点：父类原型链上的东西并没有被继承；

 2、通过原型链实现继承

```javascript
/* 通过原型链实现继承 */
function Parent2 () {
  this.name = 'parent2'
}

function Child2 () {
  this.type = 'child2'
}

Child2.prototype = new Parent2()
console.log(new Child2())
```

Child2.prototype是Child2构造函数的一个属性，这个时候prototype被赋值了parent2的一个实例，实例化了新的对象Child2()的时候，
会有一个__proto__属性，这个属性就等于起构造函数的原型对象，但是原型对象被赋值为了parent2的一个实例，
所以new Child2的原型链就会一直向上找parent2的原型

var s1=new Child2();
var s2=new Child2();
s1.**proto**===s2.**proto**;//返回true

缺点：通过子类构造函数实例化了两个对象，当一个实例对象改变其构造函数的属性的时候，
那么另外一个实例对象上的属性也会跟着改变（期望的是两个对象是隔离的赛）；原因是构造函数的原型对象是公用的；

 3、组合方式

```javascript
/* 组合方式 */
function Parent3 () {
  this.name = 'parent3'
  this.arr = [1, 2, 3]
}

function Child3 () {
  Parent3.call(this)
  this.type = 'child'
}

Child3.prototype = new Parent3()
const s3 = new Child3()
const s4 = new Child3()
s3.arr.push(4)
console.log(s3, s4)
```

**优点:**这是最通用的使用方法，集合了上面构造函数继承，原型链继承两种的优点。
**缺点:**父类的构造函数执行了2次，这是没有必要的，
constructor指向了parent了

 4、组合继承的优化

```javascript
/* 组合继承的优化1 */
function Parent4 () {
  this.name = 'parent3'
  this.arr = [1, 2, 3]
}

function Child4 () {
  Parent4.call(this)
  this.type = 'child5'
}

Child4.prototype = Parent4.prototype
const s5 = new Child4()
const s6 = new Child4()
```

**缺点：**s5 instaceof child4 //true, s5 instanceof Parent4//true
我们无法区分一个实例对象是由其构造函数实例化，还是又其构造函数的父类实例化的
s5.constructor 指向的是Parent4;//原因是子类原型对象的constructor 被赋值为了父类原型对象的 constructor,所以我们使用constructor的时候，肯定是指向父类的
Child3.constructor 也有这种情况

 5、组合继承的优化2

```javascript
function Parent5 () {
  this.name = 'parent5'
  this.play = [1, 2, 3]
}

function Child5 () {
  Parent5.call(this)
  this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype)
// 这个时候虽然隔离了，但是constructor还是只想的Parent5的，因为constructor会一直向上找
Child5.prototype.constructor = Child5

const s7 = new Child5()
console.log(s7 instanceof Child5, s7 instanceof Parent5)
console.log(s7.constructor)
```

通过Object.create来创建原型中间对象，那么这么来的话，chiild5的对象prototype获得的是parent5 父类的原型对象；
Object.create创建的对象，原型对象就是参数；

 6、ES 中的继承

Class 可以通过extends关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

```js
class Point { // ... */ }

class ColorPoint extends Point {
 constructor(x, y, color) {
 super(x, y); // 调用父类的constructor(x, y)
 this.color = color;
 }

 toString() {
 return this.color + ' ' + super.toString(); // 调用父类的toString()
 }
}
```
