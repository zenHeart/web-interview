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

<Answer>

Set 的时间复杂度为什么是 O(1)

* Set 通常基于 HashMap 实现
* 使用哈希表作为底层数据结构
* 通过哈希函数将元素映射到数组位置
* 查找、插入、删除操作平均时间复杂度都是 O(1)
* 注意：当发生哈希冲突时，最坏情况下可能退化到 O(n)

</Answer>

## es6 generator

## Map 了解多少

## Set 了解多少

## let const var 区别

## WeakSet

1. WeackSet 如何实现弱引用的?

## Map 了解多少

1. map 和 object 的区别
2. map 的 key 是稳定排序，可以用来实现 LRU

## WeakMap

## Proxy

## Reflect

* created_at: 2024-10-29T23:47:01Z
* updated_at: 2024-10-29T23:47:01Z
* labels: JavaScript
* milestone: 中

**关键词**：Reflect 函数

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
 // 以下操作会报错
 obj = { newProp: 'newValue' }
 
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
