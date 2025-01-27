# 对象

## 原始封装类型

## 对象的可变和不可变

## 深拷贝和浅拷贝区别?

1. 深拷贝的重点是循环克隆值。

1. 采用 `JSON.parse(JSON.stringfy(obj))` 的方式解决,该解决方案存在如下漏洞
   1. 键值为 undefined 的项会被忽略
   2. 键名为 Symbol 类型会被忽略
   3. 不能序列化函数
   4. 不能解决循环引用对象
详见此文 [javascript 深拷贝](https://dassur.ma/things/deep-copy/)

2. 浅拷贝
   1. Object.assign()
   2. 对象扩展

## instanceof 的使用

## 手写实现四种继承

## Object {#p0-object}

| 方法/属性 | 描述 |
| ------------------------------ | ------------------------------------------------------------ |
| `Object.keys(obj)` | 返回一个由给定对象的所有可枚举自身属性的名称组成的数组 |
| `Object.values(obj)` | 返回一个给定对象所有可枚举属性值的数组 |
| `Object.entries(obj)` | 返回一个给定对象自身可枚举属性的 [key, value] 数组 |
| `Object.assign(target, ...sources)` | 将一个或多个源对象的可枚举属性复制到目标对象，并返回目标对象 |
| `Object.create(proto, [propertiesObject])` | 使用指定的原型对象和属性创建一个新对象 |
| `Object.defineProperty(obj, prop, descriptor)` | 定义对象中的新属性或修改现有属性的配置 |
| `Object.getOwnPropertyDescriptor(obj, prop)` | 返回指定对象上一个自有属性对应的属性描述符 |
| `Object.freeze(obj)` | 冻结一个对象，使其属性无法修改、添加或删除 |
| `Object.is(value1, value2)` | 判断两个值是否相同 |
| `Object.seal(obj)` | 封闭一个对象，防止向对象添加新属性，但允许修改或删除现有属性 |
| `Object.getPrototypeOf(obj)` | 返回指定对象的原型（`__proto__`） |
| `Object.setPrototypeOf(obj, proto)` | 设置指定对象的原型（`__proto__`） |

## Object.create 实现原型继承

## hasOwnProperty 与 instanceof 区别 {#p0-hasOwnProperty-instanceof}

hasOwnProperty 和 instanceof 是两个不同的操作符，用于不同的目的。

1. hasOwnProperty

hasOwnProperty 是一个对象的原型方法，用来检测一个对象自身是否具有指定名称的属性（不会检查原型链上的属性）。其语法如下：

```
object.hasOwnProperty(property)
```

其中，object 是要检测的对象，property 是要检测的属性名。如果对象自身具有指定名称的属性，则返回 true，否则返回 false。

2. instanceof

instanceof 是一个运算符，用来检测一个对象是否是某个类的实例。其语法如下：

```
object instanceof constructor
```

其中，object 是要检测的对象，constructor 是要检测的类（构造函数）。如果对象是指定类的实例，则返回 true，否则返回 false。

举个例子来说，假设有以下代码：

```js
function Person (name) {
  this.name = name
}

const john = new Person('John')

// console.log(john.hasOwnProperty('name')) // true
console.log(john instanceof Person) // true
```

上述代码中，我们创建了一个 Person 类，并使用构造函数创建了一个实例 john。然后我们分别使用 hasOwnProperty 和 instanceof 操作符检测 john 对象是否具有 name 属性和是否是 Person 类的实例，得到的结果分别为 true 和 true。

**关键词**：Object.prototype.hasOwnProperty

 `Object.prototype.hasOwnProperty()`

`Object.prototype.hasOwnProperty()`是JavaScript中`Object`原型对象上的方法。它用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。

`hasOwnProperty()`方法的作用是检查对象是否包含特定的属性，而不会考虑该属性是否继承自原型链。它接受一个字符串参数，表示要检查的属性名。如果对象自身拥有该属性，则返回`true`；如果对象没有该属性或该属性是从原型链继承的，则返回`false`。

以下是`hasOwnProperty()`方法的使用示例：

```javascript
const obj = {
  prop1: 'value1',
  prop2: 'value2'
}

// console.log(obj.hasOwnProperty('prop1')) // true
// console.log(obj.hasOwnProperty('prop3')) // false
```

在上述示例中，`obj`对象拥有`prop1`属性，因此`obj.hasOwnProperty('prop1')`返回`true`。然而，`obj`对象没有`prop3`属性，因此`obj.hasOwnProperty('prop3')`返回`false`。

使用`hasOwnProperty()`方法可以帮助我们确定属性是对象自身的属性还是继承自原型链。这在进行属性遍历或属性存在性检查时非常有用。请注意，`hasOwnProperty()`方法只能检查对象自身的属性，不能检查原型链上的属性。如果需要检查原型链上的属性，可以使用`in`运算符或`Object.prototype.hasOwnProperty.call()`方法。

 `hasOwnProperty`和`instanceof` 区别

`hasOwnProperty`和`instanceof`是两个不同的操作符，用于在JavaScript中进行不同类型的检查。

1. `hasOwnProperty`：`hasOwnProperty`是`Object`原型对象上的方法，用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。它是针对对象属性的检查。

2. `instanceof`：`instanceof`是JavaScript的一个操作符，用于检查一个对象是否是某个构造函数的实例。它用于检查对象的类型。

以下是两者之间的区别：

* `hasOwnProperty`是用于检查对象是否具有特定的属性，它关注的是对象自身的属性，不涉及对象的类型。它只检查对象自身的属性，不会检查原型链上的属性。

* `instanceof`是用于检查对象是否是某个构造函数的实例，它关注的是对象的类型。它会检查对象的原型链上是否存在指定构造函数的原型对象。

使用示例：

```javascript
const obj = {
  prop: 'value'
}

// console.log(obj.hasOwnProperty('prop')) // true

console.log(obj instanceof Object) // true
console.log(obj instanceof Array) // false
```

在上述示例中，`obj`对象拥有`prop`属性，因此`obj.hasOwnProperty('prop')`返回`true`。同时，`obj`对象是`Object`构造函数的实例，因此`obj instanceof Object`返回`true`，但不是`Array`构造函数的实例，因此`obj instanceof Array`返回`false`。

总结而言，`hasOwnProperty`用于检查对象是否拥有特定的属性，而`instanceof`用于检查对象的类型。

## array

可以改变自身的数组方法：

* `pop()`: 删除数组最后一项，并返回删除项的值。
* `push():` 向数组末尾添加一个或多个元素，并返回新数组的长度。
* `reverse()`: 反转数组的顺序，返回逆序后的原数组。
* `shift()`: 删除数组第一项，并返回删除项的值。
* `unshift()`: 方法将指定元素添加到数组的开头，并返回数组的新长度。
* `sort()`: 对数组进行排序，返回排序后的原数组。
* `splice()`: 添加或删除数组元素，返回由被删除元素组成的数组。

不可以改变自身的数组方法:

* `concat()`: 连接一或多个数组，返回新的合并的数组。
* `filter()`: 对数组筛选符合条件的项，并返回符合条件的项组成的新数组。
* `map()`: 对数组的每一项进行操作，并返回每个操作后的项组成的新数组。
* `slice()`: 返回数组的一部分作为新数组，原数组不会改变。
* `join()`: 将数组的每一项拼接起来作为一个字符串返回，原数组不会改变。

* 数组开头插入,删除元素
* 数组中间插入元素,[splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* 数组末尾插入,删除元素

详细代码参见

> Array-operation.test.js

> **实际上大部分操作均可利用,splice 方法实现**

常见的两数组进行集合运算包括

* 并集
* 交集
* 补集

参看
> SetOps.js

该工具函数参考 [SetOps](https://gist.github.com/jabney/d9d5c13ad7f871ddf03f).

核心在于,遍历数组 a,b 的元素,保存到一个对象.
其中对元素进行标注,只属于 a,只属于 b,和 a,b 共有,基于此标注即可过滤出所需的元素集.

> 注意若数组中的元素为对象,需要在对象上添加 uid,利用此 uid 实现对不同元素的判断.

* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

`splice()` 和 `slice()` 是 JavaScript 中用于操作数组的两个方法，它们的功能和用法有一些区别。

1. `splice()` 方法：

* 功能：从数组中添加、删除或替换元素。
* 用法：`array.splice(start, deleteCount, item1, item2, ...)`。
* 参数：
* `start`：表示修改的起始位置的下标。
* `deleteCount`：可选参数，表示要删除的元素数量。
* `item1, item2, ...`：可选参数，表示要添加到数组的元素。
* 返回值：返回一个被删除元素组成的数组。

2. `slice()` 方法：

* 功能：从数组中提取指定范围内的元素，返回一个新的数组。
* 用法：`array.slice(start, end)`。
* 参数：
* `start`：可选参数，表示提取的起始位置的下标。
* `end`：可选参数，表示提取的结束位置的下标（不包含该位置的元素）。
* 返回值：返回一个新的数组，包含提取出的元素。

主要区别：

* `splice()` 方法会对原数组进行修改，而 `slice()` 方法不会修改原数组，而是返回一个新的数组。
* `splice()` 方法可以在指定位置添加、删除或替换元素，而 `slice()` 方法只能提取指定范围内的元素。
* `splice()` 方法返回被删除的元素组成的数组，而 `slice()` 方法返回一个新的数组。

总结：

* 如果需要修改原数组，并且需要添加、删除或替换元素，可以使用 `splice()` 方法。
* 如果只是需要提取指定范围内的元素，并且不想修改原数组，可以使用 `slice()` 方法。

## 类数组转换成数组的方法有哪些 {#p0-like-array}

伪数组（Array-like）和类数组（Array-like Object）都是描述一种类似数组的对象结构，它们在外观和行为上类似于数组，但实际上不是真正的数组。

伪数组（Array-like）：

* 伪数组是指具有类似数组的结构，但不具备数组的方法和属性的对象。
* 伪数组对象通常拥有一个 length 属性，用于表示其元素的个数。
* 伪数组对象可以通过索引访问元素，类似于数组的下标访问。
* 伪数组对象不具备数组的方法，如 push、pop、slice 等。

类数组（Array-like Object）：

* 类数组是指具有类似数组的结构，但不是由 Array 构造函数创建的对象。
* 类数组对象通常拥有一个 length 属性，用于表示其元素的个数。
* 类数组对象可以通过索引访问元素，类似于数组的下标访问。
* 类数组对象不具备数组的方法，如 push、pop、slice 等。

示例：

```javascript
// 伪数组
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
console.log(arrayLike[0]) // 'apple'
console.log(arrayLike.length) // 2
console.log(arrayLike.push) // undefined

// 类数组
const arrayLikeObject = document.querySelectorAll('div')
console.log(arrayLikeObject[0]) // DOM元素
console.log(arrayLikeObject.length) // 元素数量
console.log(arrayLikeObject.push) // undefined
```

需要注意的是，伪数组和类数组虽然具有类似数组的结构，但它们没有继承自 Array 的方法和属性，因此无法直接使用数组的方法。如果需要使用数组的方法，可以将伪数组或类数组对象转换为真正的数组，例如通过 `Array.from()`、`Array.prototype.slice.call()` 或展开运算符 `...` 等方法进行转换。

有几种常见的方法可以将类数组对象转换为真正的数组：

1. Array.from()：使用 Array.from() 方法可以将可迭代对象或类数组对象转换为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = Array.from(arrayLike)
console.log(array) // ['apple', 'banana']
```

2. Array.prototype.slice.call()：通过调用 Array.prototype.slice() 方法，并将类数组对象作为参数传入，可以将其转换为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = Array.prototype.slice.call(arrayLike)
console.log(array) // ['apple', 'banana']
```

3. Spread Operator（展开运算符）：使用展开运算符 `...` 可以将可迭代对象或类数组对象展开为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = [...arrayLike]
console.log(array) // ['apple', 'banana']
```

这些方法都可以将类数组对象转换为真正的数组，使其具备数组的方法和属性。需要注意的是，类数组对象必须具有 length 属性和通过索引访问元素的能力才能成功转换为数组。

## 有使用过 Promise 么， 讲解下 Promise 的使用?

回答思路，三要素 what,why,how

1. what -> Promsie 是 ES6 引入的异步编程对象
2. why -> 解决异步编程中常见的回调地狱问题
3. how promise 的使用
   1. 同步函数转为异步的方法， `new Promise((resolve, rej) =>`, 或者直接返回 Promise 对象
   2. Promise 构造器上的常用方法
      1. resolve
      2. reject
      3. all
      4. race
      5. allSettled
   3. Promise.prototype 上常用方法
      1. then
      2. catch
      3. finally
   4. promise 的核心原理
      1. 状态机迁移 pendding -> resolve|rejected
      2. Promise A+ 规范
      3. ES6 差别
      4. 实现

在原生的 JavaScript Promise 中，它没有内建的取消机制。一旦一个 Promise 被创建并开始执行，就无法直接取消它。

通常情况下，Promise 一旦被创建，就会一直执行直到成功(resolve)或失败(reject)。但是，你可以通过一些手动的方式来模拟取消 Promise 的效果。下面是几种常见的方法：

1. 忽略 Promise 的结果：当你不关心 Promise 的结果时，你可以选择忽略它。这意味着你不会处理 Promise 的 resolve 或 reject 回调函数，也不会将结果传递给其他地方。这样做相当于"取消"了对 Promise 结果的关注。

2. 基于标志位的取消机制：你可以创建一个标志位变量，并在 Promise 的执行过程中检查该变量。如果标志位被设置为取消状态，你可以选择终止 Promise 的执行，例如抛出一个特定的错误或执行一个不会产生影响的操作。

3. 使用第三方库：有一些第三方库，如`p-cancelable`和`cancelable-promise`，提供了可取消 Promise 的功能。这些库通过封装 Promise，提供了额外的方法来取消 Promise 的执行。

需要注意的是，虽然你可以使用上述方法来模拟取消 Promise 的效果，但它们并不是 Promise 的原生功能。在实际开发中，如果你需要取消异步操作，可能需要使用其他异步编程模型或使用支持取消操作的第三方库。

**以下是几个使用例子**，展示了如何通过不同的方式模拟取消 Promise 的效果：

1. 忽略 Promise 的结果：

```javascript
const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
})

// 不处理 Promise 的结果
```

在上述示例中，我们创建了一个 Promise，但没有处理它的 resolve 或 reject 回调函数。这意味着我们不关心 Promise 的结果，相当于忽略了它。

2. 基于标志位的取消机制：

```javascript
let canceled = false

const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
  if (canceled) {
    reject(new Error('Promise canceled'))
  } else {
    // 继续正常处理
  }
})

// 在需要取消 Promise 的时候，将 canceled 标志位设置为 true
canceled = true
```

在上述示例中，我们创建了一个标志位变量`canceled`，并在 Promise 的执行过程中检查该变量。如果`canceled`被设置为`true`，我们选择拒绝 Promise，并传递一个特定的错误作为原因，表示 Promise 被取消。

3. 使用第三方库：

```javascript
import PCancelable from 'p-cancelable'

const promise = new PCancelable((resolve, reject, onCancel) => {
  // 执行异步操作...

  // 注册取消回调函数
  onCancel(() => {
    // 在取消时执行清理操作...
  })
})

// 取消 Promise
promise.cancel()
```

在上述示例中，我们使用第三方库`p-cancelable`，它提供了可取消 Promise 的功能。我们创建了一个`PCancelable`实例，并在 Promise 的执行过程中注册了一个取消回调函数。通过调用`promise.cancel()`方法，我们可以取消 Promise 的执行，并触发取消回调函数。

这些例子展示了如何通过不同的方式模拟取消 Promise 的效果。请注意，这些方法并不是 Promise 的原生功能，而是通过不同的实现方式来达到类似的效果。

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

## js 编写数组排序

## 找出匹配的数组

```js
// A = [1, 2, 3, 5, 8, 7, 6, 5, 9, 1, 1, 6, 9, 8]

// B = [5, 8, 7]
```

在A中找出B，元素必须是连续的(也就是在A中找出连在一起的5，8，7)，返回符合这种情况的B的第一个元素在A的位置(也就是5的位置，第3位)，如果没有，返回一个负数;

## Set

Set 的时间复杂度为什么是 O(1)

* Set 通常基于 HashMap 实现
* 使用哈希表作为底层数据结构
* 通过哈希函数将元素映射到数组位置
* 查找、插入、删除操作平均时间复杂度都是 O(1)
* 注意：当发生哈希冲突时，最坏情况下可能退化到 O(n)

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。

Map 对象是键值对的集合。Map 中的一个键只能出现一次；它在 Map 的集合中是独一无二的。Map 对象按键值对迭代——一个 for...of 循环在每次迭代后会返回一个形式为 [key，value] 的数组。迭代按插入顺序进行，即键值对按 set() 方法首次插入到集合中的顺序（也就是说，当调用 set() 时，map 中没有具有相同值的键）进行迭代。

pi

**静态属性**

* size 属性：size属性返回 Map 结构的成员总数。

**实例方法**

* set(key, value)：set方法设置key所对应的键值，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

* get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。

* has(key)：has方法返回一个布尔值，表示某个键是否在 Map 数据结构中。

* delete(key)：delete方法删除某个键，返回 true 。如果删除失败，返回 false 。

* clear()：clear方法清除所有成员，没有返回值。

* forEach()：遍历 Map 的所有成员。

**迭代方法**

* keys()：返回键名的遍历器。
* values()：返回键值的遍历器。
* entries()：返回所有成员的遍历器。
* `Map.prototype[@@iterator]()`：返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组，并以插入 Map 对象的顺序排列。

制或合并 Maps

Map 能像数组一样被复制：

```js
const original = new Map([
  [1, 'one']
])

const clone = new Map(original)

console.log(clone.get(1)) // one
console.log(original === clone) // false. 浅比较 不为同一个对象的引用
```

Map 对象间可以进行合并，但是会保持键的唯一性。

```js
const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])

const second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开语法本质上是将 Map 对象转换成数组。
const merged = new Map([...first, ...second])

console.log(merged.get(1)) // uno
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

Map 对象也能与数组合并：

```js
const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])

const second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// Map 对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
const merged = new Map([...first, ...second, [1, 'eins']])

console.log(merged.get(1)) // eins
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

## es6 generator

## Map 了解多少

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。

Map 对象是键值对的集合。Map 中的一个键只能出现一次；它在 Map 的集合中是独一无二的。Map 对象按键值对迭代——一个 for...of 循环在每次迭代后会返回一个形式为 [key，value] 的数组。迭代按插入顺序进行，即键值对按 set() 方法首次插入到集合中的顺序（也就是说，当调用 set() 时，map 中没有具有相同值的键）进行迭代。

pi

**静态属性**

* size 属性：size属性返回 Map 结构的成员总数。

**实例方法**

* set(key, value)：set方法设置key所对应的键值，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

* get(key)：get方法读取key对应的键值，如果找不到key，返回undefined。

* has(key)：has方法返回一个布尔值，表示某个键是否在 Map 数据结构中。

* delete(key)：delete方法删除某个键，返回 true 。如果删除失败，返回 false 。

* clear()：clear方法清除所有成员，没有返回值。

* forEach()：遍历 Map 的所有成员。

**迭代方法**

* keys()：返回键名的遍历器。
* values()：返回键值的遍历器。
* entries()：返回所有成员的遍历器。
* `Map.prototype[@@iterator]()`：返回一个新的迭代对象，其为一个包含 Map 对象中所有键值对的 [key, value] 数组，并以插入 Map 对象的顺序排列。

制或合并 Maps

Map 能像数组一样被复制：

```js
const original = new Map([
  [1, 'one']
])

const clone = new Map(original)

console.log(clone.get(1)) // one
console.log(original === clone) // false. 浅比较 不为同一个对象的引用
```

Map 对象间可以进行合并，但是会保持键的唯一性。

```js
const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])

const second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开语法本质上是将 Map 对象转换成数组。
const merged = new Map([...first, ...second])

console.log(merged.get(1)) // uno
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

Map 对象也能与数组合并：

```js
const first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
])

const second = new Map([
  [1, 'uno'],
  [2, 'dos']
])

// Map 对象同数组进行合并时，如果有重复的键值，则后面的会覆盖前面的。
const merged = new Map([...first, ...second, [1, 'eins']])

console.log(merged.get(1)) // eins
console.log(merged.get(2)) // dos
console.log(merged.get(3)) // three
```

 Map 遍历

在 JavaScript 中，`Map`对象当然可以被遍历。`Map` 对象持有键值对，任何值(对象或者原始值) 都可以作为一个键或一个值。你可以使用 `Map` 对象的几种方法遍历其中的键值对。

以下是几种遍历 Map 对象的方法：

1. **使用 `forEach()` 方法**：

`Map` 对象有一个 `forEach` 方法，你可以像遍历数组一样使用它来遍历 `Map`。`forEach` 方法会按照插入顺序遍历 Map 对象。

```javascript
const myMap = new Map()
myMap.set('a', 'alpha')
myMap.set('b', 'beta')
myMap.set('g', 'gamma')

myMap.forEach((value, key) => {
  console.log(key + ' = ' + value)
})
```

1. **使用 `for...of` 循环**：

你可以使用 `for...of` 循环来遍历 `Map` 对象的键值对(`entries`)，键(`keys`)或值(`values`)。

* 遍历 `Map` 的键值对:

```javascript
for (const [key, value] of myMap) {
  console.log(key + ' = ' + value)
}
```

* 遍历 `Map` 的键:

```javascript
for (const key of myMap.keys()) {
  console.log(key)
}
```

* 遍历 `Map` 的值:

```javascript
for (const value of myMap.values()) {
  console.log(value)
}
```

1. **使用扩展运算符**：

你还可以使用扩展运算符来将 `Map` 对象的键值对、键或值转换为数组。

* 键值对数组:

```javascript
const keyValueArray = [...myMap]
console.log(keyValueArray)
```

* 键数组:

```javascript
const keysArray = [...myMap.keys()]
console.log(keysArray)
```

* 值数组:

```javascript
const valuesArray = [...myMap.values()]
console.log(valuesArray)
```

每种方法的使用取决于你的具体需求。通常，`for...of` 和 `forEach()` 会用得更多，因为它们可以直接操作键和值。

## let const var 区别

let 和 const 与 var 的区别

1、不存在变量提升
必须先定义后使用，否则报错

2、暂时性死区
在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

3、不允许重复申明/不允许在函数内部重新申明参数（也算重复申明）

4.1 SE5的作用域
1）、内层变量覆盖外层的变量
2）、用来计数的循环变量会泄露为全局变量

5、const是一个常量，一旦声明，就不能改变。而且在申明的时候必须初始化，不能留到后面赋值。

6、在ES5里面，var 在全局作用域下申明的变量，会自动生为window的属性:
没法在编译过程爆出变量为申明的错误，语法上顶层对象有一个实体含义的对象这样肯定不合适。
用var定义的依然会升级为顶层对象(全局对象)window的属性；但是let,const申明则不会。

## WeakSet

1. WeackSet 如何实现弱引用的?

1. map 和 object 的区别
2. map 的 key 是稳定排序，可以用来实现 LRU

WeakSet 是一种特殊的集合数据结构，它只能存储对象引用，并且这些对象是弱引用。WeakSet 中的对象是被弱引用的，意味着如果没有其他引用指向这个对象，垃圾回收机制就会自动将其回收，即使该对象存在于 WeakSet 中。与 Set 不同，WeakSet 不支持迭代和遍历。

**API**

WeakSet 提供了以下几个常用的 API：

1. `add(value)`：向 WeakSet 中添加一个值。

2. `delete(value)`：从 WeakSet 中删除指定的值。

3. `has(value)`：判断 WeakSet 中是否存在指定的值，返回一个布尔值。

需要注意的是，WeakSet 不支持迭代和遍历操作，所以没有类似于 Set 的 `keys()`、`values()`、`entries()` 或 `forEach()` 等方法。同时，WeakSet 也没有类似于 Set 的 `size` 属性来获取 WeakSet 中的元素个数。

另外，WeakSet 是一个构造函数，可以使用 `new WeakSet()` 来创建一个空的 WeakSet。

**使用场景**

WeakSet 的主要应用场景是在需要存储对象集合，并且不希望这些对象的存在阻止它们被垃圾回收时使用。一些常见的使用场景包括：

1. 对象存储：WeakSet 可以用来存储一组对象，并且不会阻止这些对象被垃圾回收。这在需要跟踪一组对象，但又不希望这些对象阻止被释放时很有用。

2. 数据缓存：由于 WeakSet 中的对象是弱引用的，当对象从其他地方被删除时，它们会自动从 WeakSet 中移除。这在需要缓存一些对象，但又希望能够自动清理不再需要的对象时很有用。

需要注意的是，由于 WeakSet 中的对象是弱引用的，所以不能通过遍历或迭代来访问 WeakSet 中的对象。同时，WeakSet 也不提供像 Set 那样的方法，无法判断对象是否存在于 WeakSet 中。

## WeakMap

WeakMap 是一种键值对存储的数据结构，类似于 Map。它的特点是键必须是对象，值可以是任意类型的数据。

WeakMap 内部使用了引用计数的方式来判断键是否存活，当键不再被引用时，垃圾回收机制会自动清除对应的键值对。这意味着如果没有其他地方引用该键，WeakMap 中的键值对会被自动清理，并释放内存。

与 Map 不同的是，WeakMap 的键是弱引用，不会阻止垃圾回收。这意味着在 WeakMap 中，键不能被枚举、迭代或获取键的数量。同时，WeakMap 也没有提供像 Map 中的 size 属性和 clear 方法。

因为键是弱引用，所以 WeakMap 也不能使用普通对象作为键，只能使用具有引用类型的对象作为键。这是为了避免内存泄漏问题，因为如果键是普通对象，即使它没有被其他地方引用，也无法被垃圾回收。

因为 WeakMap 的键是弱引用并且没有提供常用的方法，所以它的使用场景相对有限，主要用于存储对象的私有数据或附加元数据。

**有哪些 api**

WeakMap 提供了以下的 API：

* `set(key, value)`: 向 WeakMap 中设置键值对，键必须是对象。
* `get(key)`: 获取指定键对应的值。
* `has(key)`: 判断指定键是否存在于 WeakMap 中。
* `delete(key)`: 删除指定键对应的键值对。
* 注意：WeakMap 没有提供 `size` 属性和 `clear` 方法，也不能直接迭代或枚举键。

需要注意的是，由于 WeakMap 的键是弱引用，只能使用对象作为键，同时也意味着无法通过值来查找对应的键。所以 WeakMap 适用于需要存储对象的私有数据或附加元数据的场景，而不适合用于需要根据值来查找键的情况。

## Proxy

JavaScript的Proxy对象提供了一种拦截并定制JavaScript对象底层操作的机制。它允许你在对象上定义自定义行为，例如访问、赋值、函数调用等操作。Proxy对象包裹着目标对象，并拦截对目标对象的访问，使你能够自定义处理这些操作。

Proxy可以用于实现很多功能，包括：

1. 属性验证和拦截：可以拦截对象属性的读取、写入和删除操作，并进行验证和处理。例如，你可以拦截对属性的访问，验证属性的值是否符合特定规则。

2. 对象扩展和变形：可以拦截对象属性的读取和写入操作，并根据需求进行变形或扩展。例如，你可以在访问对象属性时，动态生成属性的值。

3. 函数调用的拦截：可以拦截函数的调用和构造，以便进行自定义处理。例如，你可以在函数调用之前或之后执行额外的逻辑。

4. 数组操作的拦截：可以拦截数组的操作，如push、pop、shift等，允许你对数组的操作进行自定义处理。例如，你可以在数组操作之后触发其他逻辑。

通过使用Proxy对象，你可以拦截和修改对象的底层操作，实现更加灵活和定制化的行为。然而需要注意的是，Proxy对象的使用可能会导致性能上的一些影响，所以在使用时要谨慎考虑。

**`Proxy`的实际使用场景有很多，以下是一些常见的示例**：

1. 数据验证和过滤：你可以使用`Proxy`来拦截对对象属性的访问和修改，从而进行数据验证和过滤。例如，你可以使用`Proxy`来确保一个对象的属性只能是特定的类型或范围。

```javascript
const person = {
  name: 'Alice',
  age: 25
}

const personProxy = new Proxy(person, {
  set (target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Invalid age')
    }

    target[key] = value
    return true
  }
})

personProxy.age = -10 // 抛出错误：Invalid age
```

2. 计算属性：你可以使用`Proxy`来动态计算属性的值，而无需实际存储它们。这对于需要根据其他属性的值来计算衍生属性的情况非常有用。

```javascript
const person = {
  firstName: 'Alice',
  lastName: 'Smith'
}

const personProxy = new Proxy(person, {
  get (target, key) {
    if (key === 'fullName') {
      return `${target.firstName} ${target.lastName}`
    }

    return target[key]
  }
})

console.log(personProxy.fullName) // Alice Smith
```

3. 资源管理和延迟加载：你可以使用`Proxy`来延迟加载资源，直到它们被真正需要。这在处理大型数据集或昂贵的资源时非常有用，可以节省内存和提高性能。

```javascript
const expensiveResource = {
  // 一些昂贵的操作
}

const expensiveResourceProxy = new Proxy(expensiveResource, {
  get (target, key) {
    // 在需要的时候才加载资源
    if (!target.loaded) {
      target.load()
      target.loaded = true
    }

    return target[key]
  }
})

console.log(expensiveResourceProxy.someProperty) // 加载资源并返回属性值
```

4. 日志记录和调试：你可以使用`Proxy`来记录对象属性的访问和修改，以便进行调试和日志记录。

```javascript
const person = {
  name: 'Alice',
  age: 25
}

const personProxy = new Proxy(person, {
  get (target, key) {
    console.log(`Getting property '${key}'`)
    return target[key]
  },
  set (target, key, value) {
    console.log(`Setting property '${key}' to '${value}'`)
    target[key] = value
    return true
  }
})

personProxy.age // 记录：Getting property 'age'
personProxy.age = 30 // 记录：Setting property 'age' to '30'
```

这些只是`Proxy`的一些实际使用场景示例，`Proxy`的强大之处在于它提供了对对象的底层操作的拦截和自定义能力，可以根据具体需求进行灵活的应用。

Proxy(代理) 是 ES6 中新增的一个特性。Proxy 让我们能够以简洁易懂的方式控制外部对对象的访问。其功能非常类似于设计模式中的代理模式。
使用 Proxy 的好处是：对象只需关注于核心逻辑，一些非核心的逻辑 （如：读取或设置对象的某些属性前记录日志；设置对象的某些属性值前，需要验证；某些属性的访问控制等）可以让 Proxy 来做。 从而达到关注点分离，降级对象复杂度的目的。

 api 有哪些？

`var p = new Proxy(target, handler);`
其中，target 为被代理对象。handler 是一个对象，其声明了代理 target 的一些操作。p 是代理后的对象。当外界每次对 p 进行操作时，就会执行 handler 对象上的一些方法。

handler 能代理的一些常用的方法如下：

* handler.getPrototypeOf(): Object.getPrototypeOf 方法的捕捉器。

* handler.setPrototypeOf(): Object.setPrototypeOf 方法的捕捉器。

* handler.isExtensible(): Object.isExtensible 方法的捕捉器。

* handler.preventExtensions(): Object.preventExtensions 方法的捕捉器。

* handler.getOwnPropertyDescriptor(): Object.getOwnPropertyDescriptor 方法的捕捉器。

* handler.defineProperty(): Object.defineProperty 方法的捕捉器。

* handler.has(): in 操作符的捕捉器。

* handler.get(): 属性读取操作的捕捉器。

* handler.set(): 属性设置操作的捕捉器。

* handler.deleteProperty(): delete 操作符的捕捉器。

* handler.ownKeys(): Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。

* handler.apply(): 函数调用操作的捕捉器。

* handler.construct(): new 操作符的捕捉器。
...

 基础使用

```javascript
const target = {
  name: 'obj'
}
const logHandler = {
  get: function (target, key) {
    console.log(`${key} 被读取`)
    return target[key]
  },
  set: function (target, key, value) {
    console.log(`${key} 被设置为 ${value}`)
    target[key] = value
  }
}
const targetWithLog = new Proxy(target, logHandler)
targetWithLog.name // 控制台输出：name 被读取
targetWithLog.name = 'others' // 控制台输出：name 被设置为 others
console.log(target.name) // 控制台输出: others
```

 使用示例 - 实现虚拟属性

```javascript
const person = {
  fisrsName: '张',
  lastName: '小白'
}
const proxyedPerson = new Proxy(person, {
  get: function (target, key) {
    if (key === 'fullName') {
      return [target.fisrsName, target.lastName].join(' ')
    }
    return target[key]
  },
  set: function (target, key, value) {
    if (key === 'fullName') {
      const fullNameInfo = value.split(' ')
      target.fisrsName = fullNameInfo[0]
      target.lastName = fullNameInfo[1]
    } else {
      target[key] = value
    }
  }
})

console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName)// 姓:张, 名:小白, 全名: 张 小白
proxyedPerson.fullName = '李 小露'
console.log('姓:%s, 名:%s, 全名: %s', proxyedPerson.fisrsName, proxyedPerson.lastName, proxyedPerson.fullName)// 姓:李, 名:小露, 全名: 李 小露
```

 使用示例 - 实现私有变量

下面的 demo 实现了真正的私有变量。代理中把以 _ 开头的变量都认为是私有的。

```javascript
let api = {
  _secret: 'xxxx',
  _otherSec: 'bbb',
  ver: 'v0.0.1'
}

api = new Proxy(api, {
  get: function (target, key) {
    // 以 _ 下划线开头的都认为是 私有的
    if (key.startsWith('_')) {
      console.log('私有变量不能被访问')
      return false
    }
    return target[key]
  },
  set: function (target, key, value) {
    if (key.startsWith('_')) {
      console.log('私有变量不能被修改')
      return false
    }
    target[key] = value
  },
  has: function (target, key) {
    return key.startsWith('_') ? false : (key in target)
  }
})

api._secret // 私有变量不能被访问
console.log(api.ver) // v0.0.1
api._otherSec = 3 // 私有变量不能被修改
console.log('_secret' in api) // false
console.log('ver' in api) // true
```

 使用示例 - 抽离校验模块

```javascript
function Animal () {
  return createValidator(this, animalValidator)
}
var animalValidator = {
  name: function (name) {
    // 动物的名字必须是字符串类型的
    return typeof name === 'string'
  }
}

function createValidator (target, validator) {
  return new Proxy(target, {
    set: function (target, key, value) {
      if (validator[key]) {
        // 符合验证条件
        if (validator[key](value)) {
          target[key] = value
        } else {
          throw Error(`Cannot set ${key} to ${value}. Invalid.`)
        }
      } else {
        target[key] = value
      }
    }
  })
}

const dog = new Animal()
dog.name = 'dog'
console.log(dog.name)
dog.name = 123 // Uncaught Error: Cannot set name to 123. Invalid.
```

eflect

 概念

Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。**这些方法与 `proxy handler` 的方法相同**。Reflect 不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同 Reflect 并非一个构造函数，所以不能通过 new 运算符对其进行调用，或者将 Reflect 对象作为一个函数来调用。**Reflect 的所有属性和方法都是静态的**（就像 Math 对象）。

 api 有哪些？

* Reflect.apply(target, thisArgument, argumentsList): 对一个函数进行调用操作，同时可以传入一个数组作为调用参数。和 Function.prototype.apply() 功能类似。

* 举例

 ```javascript
 const ages = [11, 33, 12, 54, 18, 96]
 
 // 旧写法
 const youngest = Math.min.apply(Math, ages)
 const oldest = Math.max.apply(Math, ages)
 const type = Object.prototype.toString.call(youngest)
 
 // 新写法
//  const youngest = Reflect.apply(Math.min, Math, ages);
//  const oldest = Reflect.apply(Math.max, Math, ages);
//  const type = Reflect.apply(Object.prototype.toString, youngest, []);
 ```

* Reflect.construct(target, argumentsList[, newTarget]): 对构造函数进行 new 操作，相当于执行 new target(...args)。
* Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。

 ```javascript
 function Greeting (name) {
   this.name = name
 }
 
 // new 的写法
 const instance = new Greeting('张三')
 
 // Reflect.construct 的写法
//  const instance = Reflect.construct(Greeting, ['张三']);
 ```

* Reflect.defineProperty(target, propertyKey, attributes): 和 Object.defineProperty() 类似。如果设置成功就会返回 true

* Reflect.deleteProperty(target, propertyKey): 作为函数的delete操作符，相当于执行 delete target[name]。该方法返回一个布尔值。
* Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象属性。

 ```javascript
 const myObj = { foo: 'bar' }
 
 // 旧写法
 delete myObj.foo
 
 // 新写法
 Reflect.deleteProperty(myObj, 'foo')
 ```

 该方法返回一个布尔值。如果删除成功或删除的属性不存在，则返回true，如果删除失败，删除的属性依然还在，则返回false。

* Reflect.get(target, propertyKey[, receiver]): 获取对象身上某个属性的值，类似于 target[name]。
* Reflect.get方法查找并返回target的name属性，如果没有，则返回undefined。

 ```javascript
 const myObject = {
   foo: 1,
   bar: 2,
   get baz () {
     return this.foo + this.bar
   }
 }
 
 Reflect.get(myObject, 'foo') // 1
 Reflect.get(myObject, 'bar') // 2
 Reflect.get(myObject, 'baz') // 3
 ```

* 读取函数的this绑定的receiver

 ```js
 const myObject = {
   foo: 1,
   bar: 2,
   get baz () {
     return this.foo + this.bar
   }
 }
 
 const myReceiverObject = {
   foo: 4,
   bar: 4
 }
 
 Reflect.get(myObject, 'baz', myReceiverObject) // 8
 ```

* 如果第一个参数不是对象，则Reflect.get则会报错。

* Reflect.getOwnPropertyDescriptor(target, propertyKey): 类似于 Object.getOwnPropertyDescriptor()。如果对象中存在该属性，则返回对应的属性描述符，否则返回 undefined。

* Reflect.getPrototypeOf(target): 类似于 Object.getPrototypeOf()。

* Reflect.has(target, propertyKey): 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同。
* Reflect.has对应 name in obj 里面的in操作

 ```javascript
 const myObject = {
   foo: 1
 }
 
 // 旧写法
 'foo' in myObject // true
 
 // 新写法
 Reflect.has(myObject, 'foo') // true
 ```

 如果第一个参数不是对象，Reflect.has和in都会报错。

* Reflect.isExtensible(target): 类似于 Object.isExtensible().

* Reflect.ownKeys(target): 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受enumerable 影响).

* Reflect.preventExtensions(target): 类似于 Object.preventExtensions()。返回一个Boolean。

* Reflect.set(target, propertyKey, value[, receiver]): 将值分配给属性的函数。返回一个Boolean，如果更新成功，则返回true。
* Reflect.set方法设置target对象的name属性等于value。

```javascript
const myObject = {
  foo: 1,
  // eslint-disable-next-line
  set bar (value) {
    // eslint-disable-next-line
    return this.foo = value
  }
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2)
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

* 如果name属性设置的赋值函数，则赋值函数的this绑定receiver。

 ```javascript
 const myObject = {
   foo: 4,
   // eslint-disable-next-line
   set bar (value) {
     // eslint-disable-next-line
     return this.foo = value
   }
 }
 
 const myReceiverObject = {
   foo: 0
 }
 
 Reflect.set(myObject, 'bar', 1, myReceiverObject)
 myObject.foo // 4
 myReceiverObject.foo // 1
 ```

* Reflect.setPrototypeOf(target, prototype): 设置对象原型的函数。返回一个 Boolean，如果更新成功，则返回 true。

是的，`Proxy` 能够监听到对象属性的读取和设置操作，包括对象中嵌套的对象的引用操作。但是，要注意的是，如果你想要监听一个嵌套对象内部的变化（例如，对象的属性或者数组的元素），那么你需要单独为这个嵌套对象也创建一个 `Proxy` 实例。因为 `Proxy` 只能直接监听它直接代理的对象的操作，对于嵌套对象的操作，需要嵌套地使用 `Proxy` 来实现深度监听。

举个例子：

```javascript
function createDeepProxy (obj) {
  // 递归函数，为对象及其嵌套对象创建代理
  const handler = {
    get (target, property, receiver) {
      const value = Reflect.get(target, property, receiver)
      if (typeof value === 'object' && value !== null) {
        // 如果属性是对象（且非 null），则为该属性也创建代理
        return createDeepProxy(value)
      }
      return value
    },
    set (target, property, value, receiver) {
      console.log(`Setting property ${property} to ${value}`)
      return Reflect.set(target, property, value, receiver)
    }
  }

  return new Proxy(obj, handler)
}

const original = { name: 'John', address: { city: 'New York' } }

const proxied = createDeepProxy(original)

proxied.address.city = 'San Francisco' // 控制台输出：Setting property city to San Francisco
console.log(original.address.city) // 输出 San Francisco
```

在这个例子中，`createDeepProxy` 函数使用了递归，为对象及其所有嵌套对象创建了 `Proxy` 代理。因此，修改嵌套对象 `address` 下的 `city` 属性时，`set` 陷阱（trap）被触发，并且控制台有相应的输出。但注意这种递归创建 `Proxy` 的做法可能会带来性能问题，特别是在处理有很深嵌套结构或者很大的对象时。

此外，需要留意的是，由于每次访问嵌套对象时都会动态创建新的 `Proxy` 实例，这可能导致一些意料之外的行为，比如基于身份的比较或引用检查可能会失败。因此，在实际应用中，应根据需求精心设计 `Proxy` 的使用方式。

## Reflect

`Reflect`是 ES6 引入的一个内置对象，它提供了一组与对象操作对应的方法，这些方法与`Object`上的某些方法类似，但有一些重要的区别。

以下是对`Reflect`内置函数的详细介绍：

**一、获取属性（`Reflect.get()`）**

1. 作用：

* 用于获取对象的属性值。
* 类似于传统的对象属性访问操作符（`obj.property`或`obj[property]`）。

2. 示例：

 ```javascript
 const obj = { name: 'John' }
 console.log(Reflect.get(obj, 'name')) // 'John'
 ```

3. 与传统方式的区别：

* 返回值：如果属性不存在，`Reflect.get()`返回`undefined`，而直接访问属性可能会导致错误（如果在严格模式下）或返回`undefined`（非严格模式下）。
* 可接受第三个参数`receiver`，用于指定属性访问的上下文对象，这在某些情况下（如使用代理时）非常有用。

**二、设置属性（`Reflect.set()`）**

1. 作用：

* 用于设置对象的属性值。
* 类似于传统的属性赋值操作符（`obj.property = value`或`obj[property] = value`）。

2. 示例：

 ```javascript
 const obj = {}
 Reflect.set(obj, 'name', 'Jane')
 console.log(obj.name) // 'Jane'
 ```

3. 与传统方式的区别：

* 返回值：返回一个布尔值，表示属性设置是否成功。如果目标对象不可扩展、属性不可写或属性为访问器属性且设置器函数返回`false`，则返回`false`；否则返回`true`。
* 同样可接受第三个参数`receiver`，用于指定属性设置的上下文对象。

**三、判断对象是否具有某个属性（`Reflect.has()`）**

1. 作用：

* 相当于`in`操作符，用于检查对象是否具有某个属性。

2. 示例：

 ```javascript
 const obj = { age: 30 }
 console.log(Reflect.has(obj, 'age')) // true
 console.log(Reflect.has(obj, 'gender')) // false
 ```

**四、获取对象的原型（`Reflect.getPrototypeOf()`）**

1. 作用：

* 获取对象的原型，与`Object.getPrototypeOf()`方法类似。

2. 示例：

 ```javascript
 function Person () {}
 const person = new Person()
 console.log(Reflect.getPrototypeOf(person) === Person.prototype) // true
 ```

**五、设置对象的原型（`Reflect.setPrototypeOf()`）**

1. 作用：

* 设置对象的原型，与`Object.setPrototypeOf()`方法类似。

2. 示例：

 ```javascript
 function Person () {}
 function Employee () {}
 const person = new Person()
 Reflect.setPrototypeOf(person, Employee.prototype)
 console.log(Reflect.getPrototypeOf(person) === Employee.prototype) // true
 ```

3. 注意事项：

* 频繁地设置对象的原型可能会对性能产生负面影响，并且可能会导致代码难以理解和维护。

**六、判断对象是否可扩展（`Reflect.isExtensible()`）**

1. 作用：

* 确定一个对象是否可以添加新的属性。

2. 示例：

 ```javascript
 const obj = {}
 console.log(Reflect.isExtensible(obj)) // true
 Object.preventExtensions(obj)
 console.log(Reflect.isExtensible(obj)) // false
 ```

**七、使对象不可扩展（`Reflect.preventExtensions()`）**

1. 作用：

* 使一个对象不可扩展，即不能再添加新的属性。

2. 示例：

 ```javascript
 const obj = {}
 Reflect.preventExtensions(obj)
 try {
   obj.newProperty = 'value'
 } catch (e) {
   console.log('Cannot add new property to non-extensible object.')
 }
 ```

**八、判断对象的属性是否可配置（`Reflect.ownKeys()`）**

1. 作用：

* 返回一个对象自身的所有属性的键名，包括不可枚举属性和 Symbol 属性。

2. 示例：

 ```javascript
 const obj = { name: 'John', [Symbol('secret')]: 'secret value' }
 console.log(Reflect.ownKeys(obj)) // ['name', Symbol(secret)]
 ```

总的来说，`Reflect`对象提供了一种更统一、更规范的方式来进行对象操作，并且在某些情况下（如与代理一起使用时）具有特殊的用途。它的方法通常与`Object`上的对应方法具有相似的功能，但在返回值和行为上可能会有所不同，这使得开发者可以更精确地控制对象的操作。

`Proxy` 和 `Reflect` 是 ES6 (ECMAScript 2015) 中引入的两个不同的构造函数，它们密切相关，通常在某些操作中一起使用。

1. **Proxy**：
 `Proxy` 对象用于定义基本操作的自定义行为，例如属性查找、赋值、枚举、函数调用等。当你对一个`Proxy`对象执行这些操作时，你可以拦截并重新定义这些操作的行为。

 下面是一些你可以使用`Proxy`拦截的操作:

* `get`：读取属性值
* `set`：设置属性值
* `has`：`in`操作符
* `deleteProperty`：`delete`操作符
* `apply`：调用一个函数
* 诸如此类的其他捕获器（handlers）

2. **Reflect**：
 `Reflect`对象与`Proxy`捕获器（handlers）的方法一一对应。其目的是提供默认行为，对相应的对象操作进行默认的行为操作。在很多情况下，`Reflect`的方法与对应的直接对象操作是相同的。

 这里是一些`Reflect`提供的方法的例子：

* `Reflect.get()`：获取对象属性的值，类似于`obj[prop]`
* `Reflect.set()`：设置对象属性的值，类似于`obj[prop] = value`
* `Reflect.has()`：类似于`prop in obj`
* `Reflect.deleteProperty()`：类似于`delete obj[prop]`
* `Reflect.apply()`：调用一个函数
* 其他与`Proxy`捕获器相对应的方法

**两者的关系**：
`Proxy`和`Reflect`的关系体现在它们共同协作时。在`Proxy`的捕获器函数中，开发者可以调用对应的`Reflect`方法，以实现默认的行为，同时加入自己的操纵和侧面逻辑。`Reflect`方法提供了一种方便的方式来保持默认行为，而不需要手动编写这些语义。

例如，当在`Proxy`捕获器中捕获属性的读取行为时，使用`Reflect.get()`可以非常容易地调用相应对象的默认读取行为：

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3
}

const p = new Proxy(obj, {
  get (target, prop, receiver) {
    console.log(`读取了属性 ${prop}`)
    return Reflect.get(target, prop, receiver) // 调用默认操作
  },
  set (target, prop, value, receiver) {
    console.log(`将属性 ${prop} 设置为 ${value}`)
    return Reflect.set(target, prop, value, receiver) // 调用默认操作
  }
})

console.log(p.a) // 读取了属性 a，返回 1
p.b = 4 // 将属性 b 设置为 4
```

上面的例子中，通过`Reflect`对象的方法，我们不仅可以保持默认的`get`和`set`行为，还可以在这个过程之前或之后添加自己的逻辑。这样的设计使得代理行为的实现既安全又易于管理。

总而言之，`Proxy`和`Reflect`共同提供了一种强大的机制来拦截和定义基本的 JavaScript 操作，`Reflect`能提供操纵对象的默认方法，而`Proxy`则允许我们根据需要来定义这些操作的新行为。

> 以前对两者进行过对比， 但是没有讨论起关联关系。
> 以前对比的文章：[资料](https://github.com/pro-collection/interview-question/issues/8)

## Reflect.get() 和直接通过对象 [.] 访问获取属性， 有何区别 {#p2-reflect-get}

`Reflect.get()`和直接通过对象`[.]`访问获取属性有以下一些区别：

**一、返回值**

1. `Reflect.get()`：

* 如果属性不存在，返回`undefined`。
* 例如：

 ```javascript
 const obj = {}
 const value = Reflect.get(obj, 'property')
 console.log(value) // undefined
 ```

2. 对象直接访问：

* 如果属性不存在，在非严格模式下返回`undefined`；在严格模式下，会抛出一个`ReferenceError`错误。
* 例如：

 ```javascript
 const obj = {}
 // 非严格模式下
 console.log(obj.property); // undefined
 // 严格模式下
 ('use strict')
 console.log(obj.property) // ReferenceError: property is not defined
 ```

**二、可接受的参数和功能扩展**

1. `Reflect.get()`：

* 可以接受第三个参数`receiver`，用于指定属性访问的上下文对象，这在某些情况下非常有用，比如在使用代理时可以控制属性访问的行为。
* 例如：

 ```javascript
 const obj = { name: 'John' }
 const proxy = new Proxy(obj, {})
 console.log(Reflect.get(proxy, 'name', { name: 'Jane' })) // 'Jane'
 ```

2. 对象直接访问：

* 没有类似的参数来指定上下文对象。

**三、与代理的交互**

1. `Reflect.get()`：

* 与代理对象配合使用时，会触发代理对象上定义的相应拦截方法，使得可以对属性访问进行更精细的控制。
* 例如：

 ```javascript
 const obj = { name: 'John' }
 const handler = {
   get (target, property, receiver) {
     if (property === 'name') {
       return 'Modified Name'
     }
     return Reflect.get(target, property, receiver)
   }
 }
 const proxy = new Proxy(obj, handler)
 console.log(proxy.name) // 'Modified Name'
 ```

2. 对象直接访问：

* 当通过直接访问属性的方式访问代理对象时，不一定会触发代理对象上的拦截方法，具体行为取决于代理的实现和配置。

**四、一致性和规范性**

1. `Reflect.get()`：

* 作为一种更规范的方法，它与其他`Reflect`方法一起提供了一种统一的方式来进行对象操作，有助于提高代码的可读性和可维护性。

2. 对象直接访问：

* 虽然直接访问属性的方式更加简洁，但在一些复杂的场景下可能会导致不一致的行为，并且不太容易与其他高级特性（如代理）进行良好的集成。

## getter setter {#p2-getter-setter}

## Object.keys 与 Object.getOwnPropertyNames() 有何区别 {#p2-object-keys-getOwnPropertyNames}

`Object.keys()`和`Object.getOwnPropertyNames()`都是用于获取对象自身属性名的方法，但它们之间存在一些区别：

**一、返回值类型**

1. `Object.keys()`：

* 返回一个由对象自身可枚举属性名组成的数组。
* 可枚举属性是指那些可以通过`for...in`循环遍历到的属性。

2. `Object.getOwnPropertyNames()`：

* 返回一个由对象自身所有属性名组成的数组，无论属性是否可枚举。

**二、可枚举性处理**

1. `Object.keys()`：

* 只返回可枚举属性的名称。如果一个属性被设置为不可枚举，它将不会出现在`Object.keys()`的返回结果中。
* 例如，使用`Object.defineProperty()`定义的不可枚举属性不会被包含在`Object.keys()`的结果中。

2. `Object.getOwnPropertyNames()`：

* 返回所有属性的名称，包括可枚举和不可枚举的属性。
* 这使得它在需要获取对象的所有属性，无论其可枚举性如何时非常有用。

**三、示例**

1. 以下是一个使用`Object.keys()`和`Object.getOwnPropertyNames()`的示例：

```javascript
const obj = {
  property1: 'value1',
  property2: 'value2'
}

Object.defineProperty(obj, 'nonEnumerableProperty', {
  value: 'value3',
  enumerable: false
})

console.log(Object.keys(obj)) // ['property1', 'property2']
console.log(Object.getOwnPropertyNames(obj)) // ['property1', 'property2', 'nonEnumerableProperty']
```

在这个例子中，`Object.keys()`只返回了可枚举的属性`property1`和`property2`，而`Object.getOwnPropertyNames()`返回了所有属性，包括不可枚举的`nonEnumerableProperty`。

## Javascript 数组中有那些方法可以改变自身，那些不可以 {#p2-javascript-array-change-self}

在 JavaScript 中，数组的方法可以分为两类：改变自身的方法和不改变自身的方法。

**一、改变自身的方法**

1. `push()`：在数组末尾添加一个或多个元素，并返回新的数组长度。
2. `pop()`：删除数组的最后一个元素，并返回这个元素。
3. `shift()`：删除数组的第一个元素，并返回这个元素。
4. `unshift()`：在数组开头添加一个或多个元素，并返回新的数组长度。
5. `splice()`：通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。
6. `sort()`：对数组的元素进行排序，并返回排序后的数组。默认按照字符串编码的顺序进行排序。
7. `reverse()`：反转数组中的元素顺序，并返回反转后的数组。

**二、不改变自身的方法**

1. `concat()`：返回一个新数组，这个新数组是由调用该方法的数组和其他数组或值连接而成。
2. `slice()`：返回一个新的数组，包含从原数组中提取的元素。可以指定起始位置和结束位置（不包括结束位置的元素）。
3. `indexOf()`：返回在数组中首次出现的指定元素的索引，如果不存在则返回 -1。
4. `lastIndexOf()`：返回在数组中最后一次出现的指定元素的索引，如果不存在则返回 -1。
5. `includes()`：判断数组是否包含指定的元素，返回一个布尔值。
6. `join()`：将数组的所有元素连接成一个字符串，并返回这个字符串。可以指定连接元素的分隔符。

## 防止对象被篡改有哪些方式 {#p2-prevent-object-tampering}

在 JavaScript 中，可以通过以下几种方式防止对象被篡改：

**一、使用`Object.freeze()`**

1. 功能：

* 完全冻结一个对象，使其不能添加新属性、删除现有属性或修改现有属性的值。
* 对嵌套对象也会进行深度冻结。

2. 示例：

 ```javascript
 const obj = {
   prop1: 'value1',
   prop2: { nestedProp: 'nestedValue' }
 }
 Object.freeze(obj)
 
 // 以下操作都会抛出错误
 obj.newProp = 'newValue'
 delete obj.prop1
 obj.prop1 = 'newValue1'
 obj.prop2.nestedProp = 'newNestedValue'
 ```

**二、使用`Object.seal()`**

1. 功能：

* 密封一个对象，阻止添加新属性和删除现有属性，但可以修改现有属性的值。
* 对嵌套对象不进行深度密封。

2. 示例：

 ```javascript
 const obj = {
   prop1: 'value1',
   prop2: { nestedProp: 'nestedValue' }
 }
 Object.seal(obj)
 
 // 以下操作会抛出错误或不被允许
 obj.newProp = 'newValue'
 delete obj.prop1
 
 // 这个操作是允许的
 obj.prop1 = 'newValue1'
 obj.prop2.nestedProp = 'newNestedValue'
 ```

**三、使用`const`声明对象引用**

1. 功能：

* 使用`const`声明的变量不能被重新赋值，但对象本身的属性仍然可以被修改，除非使用上述冻结或密封的方法。

2. 示例：

 ```javascript
 const obj = { prop: 'value' }
 
 // 这个操作是允许的
 obj.prop = 'newValue1'
 ```

**四、使用代理（Proxy）进行拦截**

1. 功能：

* 通过创建一个代理对象，可以拦截对目标对象的各种操作，如属性访问、赋值、删除等，并根据需要进行控制。

2. 示例：

 ```javascript
 const targetObject = { prop: 'value' }
 const handler = {
   set (target, key, value) {
     throw new Error('Object is immutable.')
   },
   deleteProperty (target, key) {
     throw new Error('Object is immutable.')
   }
 }
 const immutableObject = new Proxy(targetObject, handler)
 
 // 以下操作都会抛出错误
 immutableObject.prop = 'newValue'
 delete immutableObject.prop
 ```

## JS 创建对象的方式有哪些？ {#p0-js-create-object}

1. 使用对象字面量创建对象。

```
var obj = { 
 name: "John", 
 age: 30 
};
```

2. 使用 Object 构造函数创建对象。

```
var obj = new Object();
obj.name = "John";
obj.age = 30;
```

3. 使用构造函数创建对象。

```
function Person(name, age) {
 this.name = name;
 this.age = age;
}
var john = new Person("John", 30);
```

4. 使用 Object.create() 方法创建对象。

```
var obj = Object.create(null);
obj.name = "John";
obj.age = 30;
```

5. 使用类和继承创建对象。

```
class Person {
 constructor(name, age) {
 this.name = name;
 this.age = age;
 }
}
var john = new Person("John", 30);
```
