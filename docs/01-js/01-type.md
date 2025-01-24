# 类型

## javascript 中有几种数据类型 ? {#p0-types}

<Answer>

- 基础类型
  - undefined
  - Null
  - Boolean
  - Number 采用 IEEE 754 标准
  - String
  - Symbol
  - BigInt 属于新增类型
- 引用类型
  - 内建对象 EMACScript 定义
    - Object
    - Function
    - Set
    - WeackSet
    - Map
    - WeakMap
    - Array
    - Regexp
  - 宿主对象 取决于运行环境，如浏览器、Node.js
  - 自定义对象 用户创建的对象

- [mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)

</Answer>

## null undefined 区别?

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

## Symbol

1. 定义无冲突的属性名
2. 自定义内部方法

Symbol 是 ECMAScript 6 引入的一种新的原始数据类型，用来表示独一无二的值。每个 Symbol 值都是唯一的，因此可以用来创建一些独特的标识符。

义

Symbol 的定义非常简单，只需要调用 Symbol() 方法即可，例如：

```js
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

## 0.1 + 02 !== 0.3

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

```javascript
function numbersAreCloseEnough (num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON
}

const result = 0.1 + 0.2
console.log(numbersAreCloseEnough(result, 0.3))
```

2. 将浮点数乘以一个适当的倍数转换为整数进行计算，计算完成后再除以这个倍数转换回浮点数：

```javascript
const num1 = 0.110
const num2 = 0.210
const sum = (num1 + num2) / 10
console.log(sum === 0.3)
```

3. 使用第三方库，如 `decimal.js` ，它提供了更精确的十进制运算：

```javascript
const Decimal = require('decimal.js')

const num1 = new Decimal('0.1')
const num2 = new Decimal('0.2')
const sum = num1.plus(num2)
console.log(sum.eq(0.3))
```

这些方法可以帮助您在处理浮点数运算时更准确地得到预期的结果。

### 什么是 NaN ，它的类型，如何判断 NaN?

### 如何判断一个数值是整数，实现 isInteger

## js 中类型转换规则？

<Answer>

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

</Answer>
