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

## Object.create 实现原型继承

### 原型链？ ⭐️⭐️⭐️⭐️⭐️

根据 [ECMAScript 规范对象原型链的描述](https://tc39.es/ecma262/#sec-objects)概念如下: 每一个通过构造器创建的对象都会有一个隐式索引,值指向构造器的 **prototype(原型)** 属性值。此外该原型可能包含一个值为非空的隐式索引指向它自己的原型,依次类推称为原型链。当查找某个对象属性时会顺着原型链检查,返回匹配的第一个相同属性值。

基于上述概念原型链具有如下特性

1. 在访问对象属性和方法时,js 引擎会遍历对象的自有属性和递归遍历内部  `__proto__` 索引指向的对象返回第一个查找到的值
2. 采用构造函数初始化对象时,实例的 `__proto__` 属性指向构造函数的 `prototype`

## array

* 数组开头插入,删除元素
* 数组中间插入元素,[splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* 数组末尾插入,删除元素

详细代码参见

> Array-operation.test.js

> **实际上大部分操作均可利用,splice 方法实现**

## 数组集合

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

### 核心函数

* [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## 实现数组复制

参考如下效果

```js
[1, 2, 3, 4, 5].duplicator() // [1,2,3,4,5,1,2,3,4,5]
```

## 有使用过 Promise 么， 讲解下 Promise 的使用?

<Answer>

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

</Answer>

## 实现 map 函数

> map.js

> ['1', '2', '3'].map(parseInt) 的使用

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

## WeakMap

## Proxy

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
