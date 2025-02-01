# 类型

## JavaScript 中有几种数据类型 ? {#p0-types}

<Answer>

- 原始类型
  - Undefined
  - Null
  - Boolean
  - String
  - Symbol
  - Number 采用 IEEE 754 标准
  - BigInt 属于新增类型
- 引用类型
  - [内建对象 EMACScript 定义](https://tc39.es/ecma262/#sec-global-object) 一些常用对象类型如下
    - Object
    - Function
    - Date
    - Error
    - Set
    - WeakSet
    - Map
    - WeakMap
    - Array
    - RegExp
    - Proxy
    - Reflect
  - 宿主对象 取决于运行环境，如 DOM、BOM..
  - 自定义对象 用户创建的对象

**题解**

该题一般作为面试热身题，帮助面试者快速进入状态，通过此题又可以引出很多知识点，来对面试者能力作进一步下探。

**延伸阅读**

- [ecmascript language types](https://tc39.es/ecma262/#sec-ecmascript-language-types) 规范中定义的类型
- [MDN 数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

</Answer>

## 原始类型和引用类型的区别? {#p0-primitive-reference}

<Answer>

在JavaScript中，值类型和引用类型是两种不同的数据类型，它们之间的区别在于数据存储和传递的方式不同。

值类型（也称为“原始类型”）包括 undefined、null、boolean、number和string。这些数据类型的值是可以直接存储在变量中的，这意味着如果我们将一个值类型的变量赋给另一个变量时，实际上是将值复制到新变量的内存空间中。在JavaScript中，值类型的变量是直接存储在栈中的。因此，值类型的变量永远不会出现“引用计数”错误，因为每个变量都可以被简单地复制和赋值。

引用类型包括对象、数组和函数等复杂数据类型。和值类型不同，引用类型的值是存储在堆中的，栈中存储的是变量的引用地址。当我们把一个引用类型的变量赋给另一个变量时，实际上是将变量的引用地址复制到了新变量的内存空间中。这意味着这两个变量引用同一个对象。如果我们修改一个变量，那么另一个变量也会被修改；因为它们引用同一个对象。如果我们在堆中创建多个对象，则会有多个变量引用它们。这一点需要非常小心，因为它可以导致一些问题，如“引用计数”错误。

总之，JavaScript中的值类型和引用类型之间的区别在于它们如何存储和传递。理解这两种不同的数据类型的工作原理，可以帮助我们更好地理解JavaScript的内部工作原理，从而更好地编写代码。

**举例说明**

下面是一个简单的例子，来说明值类型和引用类型在操作时的区别：

```js
// 值类型
let x = 1
const y = x
x = 2
console.log(x) // 输出2
console.log(y) // 输出1

// 引用类型
const a = { name: 'Tom', age: 20 }
const b = a
a.age = 30
console.log(a.age) // 输出30
console.log(b.age) // 输出30，原因是 a 和 b 指向同一个对象
```

在这个例子中，我们首先创建一个值类型变量 x，并将其值设置为 1。接着我们将 x 的值赋给 y 变量。然后我们将 x 的值修改为 2，这不会影响变量 y，因为 x 和 y 之间的赋值使用的是值复制。这是值类型的典型特性。

接下来，我们创建了一个包含 name 和 age 属性的对象 a，并将其赋给变量 b。然后我们修改了 a 的 age 属性的值。此时，由于 a 和 b 引用同一个对象，因此 b.age 的值也随之改变，这才是引用类型的典型特性。

在代码中我们看到，值类型的变量在赋值时是通过复制整个值本身的副本，在内存中分配了新的空间来存储。而引用类型的变量赋值时是将指针复制到新变量中，用来指向堆（heap）中存储对象的内存空间。

**延伸阅读**

- [JavaScript高级程序设计（第5版） 第四章](https://book.douban.com/subject/37143075/) 原始类型和引用类型讲解

</Answer>

## 引用类型 {#p0-reference-type}

在JavaScript中，引用类型是指非基本数据类型，它们是由对象、数组、函数等复杂数据结构组成的。

常见的引用类型包括：

1. `对象（Object）`：对象是JavaScript中最基本的引用类型，它可以用来存储键值对，也可以通过原型链实现继承。

2. `数组（Array）`：数组是一种有序的集合，可以存储任意类型的数据，它的长度是动态的，可以随时添加或删除元素。

3. `函数（Function）`：函数是一种可执行的对象，可以封装一段可重复使用的代码。函数可以接收参数并返回值。

引用类型的特点包括：

1. 引用类型的值是可变的：引用类型的值是存储在堆内存中的，当我们修改一个引用类型的值时，实际上是修改了它在内存中的地址，而不是修改了该值本身。

2. 引用类型值的比较是引用的比较：当使用"=="或"==="运算符比较两个引用类型的值时，它们会进行引用的比较，即判断它们是否指向同一个内存地址。只有当两个引用指向同一个对象时，它们才被认为是相等的。

3. 引用类型可以有自己的属性和方法：引用类型的值可以拥有自己的属性和方法。例如，数组对象有长度属性和一些常用的数组方法（例如push、pop、sort等），而函数对象有call、apply等方法。

4. 引用类型可以通过原型链实现继承：通过原型链，引用类型可以继承父类型的属性和方法。

基本类型（如数字、字符串、布尔值）在JavaScript中是按值传递的，而引用类型是按引用传递的。

这意味着当将一个引用类型的值赋给另一个变量时，实际上是将内存地址复制给了新的变量，两个变量引用的是同一对象。而基本类型的值赋给另一个变量时，会创建一个新的值并赋给新的变量。

## 有几种方法判断变量的类型 {#p1-type-check}

 JavaScript 中有以下几种方法可以判断变量的类型

- typeof 运算符：可以用于判断基本数据类型（如字符串、数字、布尔值、Undefined 等）和函数类型，但对于对象类型（如数组、日期、正则表达式等）不能准确判断。

- instanceof 运算符：可以用于判断一个对象是否为某个构造函数的实例，但不能判断基本数据类型。

- Object.prototype.toString() 方法：可以返回一个对象的具体类型字符串，可以判断所有数据类型，但需要注意的是需要使用 call 或 apply 方法将要判断的对象传递给 toString 方法。

- Array.isArray() 方法：可以判断一个对象是否为数组类型。

- constructor 属性：可以返回一个对象的构造函数，但需要注意的是 constructor 属性可以被修改，因此不能保证准确性。

 举例 Object.prototype.toString() 是如何判断js 类型的

Object.prototype.toString() 方法是用来返回当前对象的类型字符串，其实现方式是返回一个类似 "[object Type]" 的字符串，其中 Type 是当前对象的类型。

```js
Object.prototype.toString.call('hello') // "[object String]"
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"

const arr = [1, 2, 3]
Object.prototype.toString.call(arr) // "[object Array]"

const date = new Date()
Object.prototype.toString.call(date) // "[object Date]"

const reg = /abc/
Object.prototype.toString.call(reg) // "[object RegExp]"

const func = function () {}
Object.prototype.toString.call(func) // "[object Function]"
```

通过这种方式，可以精确判断变量的类型，包括基本数据类型和对象类型。

## null undefined 区别? {#p1-null-undefined}

<Answer>

1. 语言层面
   1. **null** 表示值为空
   2. **undefined** 表示缺省值或默认值
2. 功能层面:
   1. 数值转换
      1. null 会变为 0
      2. undefined 变为 NaN

详细区别参考 [阮一峰 undefined 与 null 的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

</Answer>

## Symbol {#p1-symbol}

1. 定义无冲突的属性名
2. 自定义内部方法

Symbol 是 ECMAScript 6 引入的一种新的原始数据类型，用来表示独一无二的值。每个 Symbol 值都是唯一的，因此可以用来创建一些独特的标识符。

义

Symbol 的定义非常简单，只需要调用 Symbol() 方法即可，例如：

```js
// eslint-disable-next-line
const mySymbol = Symbol()
```

在使用 Symbol 的时候，可以给它传递一个可选的描述信息，用于标识 Symbol 的含义，例如：

```js
const mySymbol = Symbol('my symbol')
```

用场景

 常量的定义

由于每个 Symbol 的值都是唯一的，因此可以用它来定义常量，避免不小心修改值。例如：

```js
const MY_CONST = Symbol('my_const')
```

 Symbol 值可以作为对象的属性名，用来避免属性名冲突

例如：

```js
const obj = {}
const mySymbol = Symbol('my symbol')
obj[mySymbol] = 'hello'
console.log(obj[mySymbol]) // 输出：'hello'
```

 在使用 Symbol 的时候，可以结合 Object.defineProperty() 方法来定义一个只读的属性

例如：

```js
const obj = {}
const mySymbol = Symbol('my symbol')
Object.defineProperty(obj, mySymbol, {
  value: 'hello',
  writable: false
})
console.log(obj[mySymbol]) // 输出：'hello'
obj[mySymbol] = 'world'
console.log(obj[mySymbol]) // 输出：'hello'
```

 还可以使用 Symbol.for() 方法创建一个可共享的 Symbol 值

例如：

```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 === s2) // 输出：true
```

在上述示例中，虽然 s1 和 s2 的值不同，但是它们所表示的含义相同，因此可以认为它们是相等的。这种通过 Symbol.for() 方法创建的 Symbol 值，会被保存在一个全局的 Symbol 注册表中，可以被不同的代码块访问到。

 私有属性的定义

由于 Symbol 值是唯一的，因此可以用它来模拟私有属性的概念，防止属性名冲突。例如：

```js
const _myPrivateProp = Symbol('my_private_prop')
class MyClass {
  constructor () {
    this[_myPrivateProp] = 'private value'
  }

  getPrivateValue () {
    return this[_myPrivateProp]
  }
}
```

在这个例子中，_myPrivateProp 就是一个 Symbol 值，用于存储私有属性的值，它无法被外部访问到，只能通过类的方法来获取它的值。

 自定义迭代器

Symbol 还可以用于自定义迭代器，例如：

```js
const myIterable = {
  [Symbol.iterator]: function * () {
    yield 1
    yield 2
    yield 3
  }
}
for (const value of myIterable) {
  console.log(value)
}
// Output: 1 2 3
```

在这个例子中，我们使用了 Symbol.iterator 来定义了一个自定义的迭代器，这个迭代器可以被 for...of 循环调用来遍历对象的属性值。

结

总之，`Symbol` 的主要用途是创建独一无二的属性名，用来避免属性名冲突。
在实际开发中，可以将 `Symbol` 作为对象的属性名来定义一些特殊的行为，例如迭代器、生成器等，这些都是 `Symbol` 的实际使用案例。

## 0.1 + 02 !== 0.3 {#p0-ieee754}

```js
// 说出下面语句的执行结果，并解释原因
console.log(0.1 + 0.2)
console.log(0.1 + 0.2 === 0.3)
```

重点是理解 js 数值采用采用 **IEEE 754 编码**表示数值,,产生原因是二级制表示浮点时某些浮点只能取近似值导致,存在编码误差

推荐视频 [watch](https://www.youtube.com/watch?v=wPBjd-vb9eI)

- [表示 ieee754](https://www.youtube.com/watch?v=8afbTaA-gOQ)

1. **NaN** 表示非法数字,利用 `NaN !=== NaN` 的特性判断
2. **Infinity** 正无穷
3. **-Infinity** 负无穷
    > 注意 Number 类型上包含一系列常量,利用`Object.getOwnPropertyDescriptors(Number)` 自行查看

- `toString` 转换为对应进制的字符串
- 根据前缀自动判断进制
  - **0x** 开头 16 进制
  - **0** 开头 8 进制

在计算机中，浮点数采用二进制存储，而有些十进制小数无法精确地用二进制表示。`0.1` 和 `0.2` 在二进制表示中是无限循环的，在进行运算时会产生舍入误差。

要解决这个问题，可以使用以下方法：

1. 使用 `Number.EPSILON` 来比较两个浮点数是否接近：

```js
function numbersAreCloseEnough (num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON
}

const result = 0.1 + 0.2
console.log(numbersAreCloseEnough(result, 0.3))
```

2. 将浮点数乘以一个适当的倍数转换为整数进行计算，计算完成后再除以这个倍数转换回浮点数：

```js
const num1 = 0.110
const num2 = 0.210
const sum = (num1 + num2) / 10
console.log(sum === 0.3)
```

3. 使用第三方库，如 `decimal.js` ，它提供了更精确的十进制运算：

```js
const Decimal = require('decimal.js')

const num1 = new Decimal('0.1')
const num2 = new Decimal('0.2')
const sum = num1.plus(num2)
console.log(sum.eq(0.3))
```

这些方法可以帮助您在处理浮点数运算时更准确地得到预期的结果。

## 什么是 NaN ，它的类型，如何判断 NaN? {#p1-nan}

## js 中类型转换规则？{#p1-type-convert}

类型转换分为两种

1. **隐式类型转换** 典型场景
   1. `==` 操作触发类型转换,详情参见 [equality operator](https://tc39.github.io/ecma262/#sec-equality-operators-runtime-semantics-evaluation)
   2. 运算符操作触发类型转换
      1. `+` 若存在字符串则进行字符串的连接运算
      2. `-,*,/,**` 转换为数字进行操作
        > 对象转换为数字和准换为字符串的规则,详见 `js 权威指南 第六版 3.8.3 章节`
2. 显示类型转换
   1. 采用 Boolean,Number,String 等构造器初始化
   2. 利用 [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 转换为整形

类型转换测试用例参见

> type-convert.test.js

对象在隐式类型转换中会涉及如下三个函数:

1. [Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) 决定对象如何取值
2. [Object.prototype.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
3. [Object.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

记住如下规则

1. 上述原型方法可能被覆盖
   1. 外部申明对象可以重定义上述方法
   2. 内建对象例如 array 会创建自定义的 toString
   3. 原始封装类型 `Number` 也会重写 toString 方法
2. 当采用 `+,==` 触发隐式类型转换时,调用规则为
   1. `Symbol.toPrimitive` 未重定义则退化到 valueOf
   2. `valueOf` 若定义则执行,若返回非初始类型,则退化到 toString
   3. toString 若定义则执行,否则触发原生 toString
3. 模板运算会直接触发 `toString` 方法

可以将上述类型转换分为以下几类：

1. 显式转换：显式转换是通过特定的函数或操作符来实现的，开发者明确地指定了类型转换的规则和目标类型。例如使用`String()`、`Number()`、`Boolean()`等函数进行类型转。

2. 隐式转换：隐式转换是在特定的运算或操作中自动发生的，不需要开发者明确指定类型转换的规则和目标类型。例如在字符串拼接时，JavaScript会自动将其他类型转换为字符串类型；在使用比较操作符（如`==`、`>`、`<`）进行比较时，JavaScript会自动进行类型转换以满足比较的要求。或者使用`+`、`-`、`*`、`/`等操作符进行数值转换和计算。

3. 强制转换：强制转换是指将一个类型强制转换为另一个类型，无论是显式转换还是隐式转换，都是通过强制转换来实现的。例如使用`parseInt()`、`parseFloat()`等函数将字符串转换为数字类型；使用`Boolean()`函数将其他类型转换为布尔类型。

隐式转换在某些情况下可能会导致不可预测的结果，因此在开发中应尽量避免依赖隐式转换，而是通过显式转换来确保类型转换的准确性。

--------
**补充**

在JavaScript中，有以下几种常见的类型转换方式：

1. 转换为字符串：可以使用String()函数或toString()方法将其他类型的值转换为字符串类型。例如：

 ```js
 const num = 42
 const str = String(num) // 将数字转换为字符串
 const bool = true
 const str2 = bool.toString() // 将布尔值转换为字符串
 ```

2. 转换为数字：可以使用Number()函数或使用parseInt()、parseFloat()等方法将其他类型的值转换为数字类型。例如：

 ```js
 const str = '42'
 const num = Number(str) // 将字符串转换为数字
 const str2 = '3.14'
 const floatNum = parseFloat(str2) // 将字符串转换为浮点数
 ```

3. 转换为布尔值：可以使用Boolean()函数将其他类型的值转换为布尔类型。例如：

 ```js
 const num = 42
 const bool = Boolean(num) // 将数字转换为布尔值
 const str = 'hello'
 const bool2 = Boolean(str) // 将字符串转换为布尔值
 ```

4. 隐式类型转换：JavaScript在某些情况下会自动进行类型转换，例如通过算术运算符、比较运算符等进行操作时，会根据需要隐式地将值转换为特定的类型。例如：

 ```js
 const num1 = 42
 const num2 = '3'
 const sum = num1 + Number(num2) // 隐式将字符串转换为数字并进行相加
 ```
