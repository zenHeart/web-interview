# js 引擎原理

## scope {#p0-scope}

JavaScript 作用域链（Scope Chain）是指变量和函数的可访问性和查找规则。它是由多个执行上下文（Execution Context）的变量对象（Variable Object）按照它们被创建的顺序组成的链式结构。

在 JavaScript 中，每个函数都会创建一个新的执行上下文，并将其添加到作用域链的最前端。当访问一个变量时，JavaScript 引擎会先从当前执行上下文的变量对象开始查找，如果找不到，则沿着作用域链依次向上查找，直到全局执行上下文的变量对象。

作用域链的创建过程如下：

1. 在函数定义时，会创建一个变量对象（VO）来存储函数的变量和函数声明。这个变量对象包含了当前函数的作用域中的变量和函数。
2. 在函数执行时，会创建一个执行上下文（Execution Context），并将其添加到作用域链的最前端。执行上下文中的变量对象称为活动对象（Active Object）。
3. 当访问一个变量时，JavaScript 引擎首先会在活动对象中查找，如果找不到，则沿着作用域链依次向上查找，直到全局执行上下文的变量对象。
4. 如果在作用域链的任何一个环节找到了变量，则停止查找并返回变量的值；如果未找到，则抛出引用错误（ReferenceError）。

作用域链的特点：

1. 作用域链是一个静态的概念，它在函数定义时就确定了，不会随着函数的调用而改变。
2. 作用域链是由多个执行上下文的变量对象按照它们被创建的顺序组成的。
3. 作用域链的最后一个变量对象是全局执行上下文的变量对象，它是作用域链的终点。
4. 内部函数可以访问外部函数的变量，因为内部函数的作用域链包含了外部函数的变量对象。

 有哪些应用场景

作用域链在 JavaScript 中具有广泛的应用场景。下面列举了一些常见的应用场景：

1. 变量查找：作用域链决定了变量的访问顺序，当访问一个变量时，会按照作用域链的顺序依次查找变量，直到找到匹配的变量或到达全局作用域。

2. 闭包：闭包是指函数能够访问和操作它的外部函数中定义的变量。通过作用域链，内部函数可以访问外部函数的变量，实现了闭包的特性。闭包在许多场景中用于创建私有变量和实现函数封装。

3. 垃圾回收：JavaScript 的垃圾回收机制通过作用域链来判断变量的生命周期。当变量不再被引用时，垃圾回收器可以回收它所占用的内存空间。

4. 函数作为参数传递：在 JavaScript 中，可以将函数作为参数传递给其他函数。在传递过程中，作用域链决定了内部函数对外部函数变量的访问权限，实现了回调函数和高阶函数的功能。

5. 面向对象编程：JavaScript 中的对象和原型链是基于作用域链实现的。通过原型链，对象可以访问和继承其原型对象的属性和方法。

6. 模块化开发：作用域链可以用于实现模块化开发，通过定义私有变量和公共接口，控制模块内部变量的可访问性，避免变量冲突和全局污染。

7. 作用域链的动态改变：在 JavaScript 中，可以通过闭包和动态作用域的特性来改变作用域链。例如，使用 eval() 函数或 with 语句可以改变当前的作用域链。

总之，作用域链在 JavaScript 中扮演了重要的角色，涵盖了变量的访问、闭包、垃圾回收、模块化开发等多个方面。深入理解作用域链对于编写高质量的 JavaScript 代码和理解其底层工作原理非常重要。

## 解释性语言和编译型语言的区别 {#p0-explain-compile}

解释性语言和编译型语言是两种不同的编程语言类型，它们在代码的执行方式和运行过程中的一些特点上存在区别。

1. 编译型语言：

* 编译型语言的代码在运行之前需要经过编译器的处理，将源代码一次性地转换成机器语言的可执行文件（通常是二进制文件）。
* 编译器将源代码转换为目标代码的过程包括词法分析、语法分析、语义分析、优化和代码生成等步骤。
* 在运行时，编译型语言的可执行文件直接在计算机上执行，无需再次进行翻译或解释。
* 典型的编译型语言包括 C、C++、Java（虚拟机字节码编译）、Go等。

2. 解释性语言：

* 解释性语言的代码在运行时逐行被解释器解释执行，无需预先编译为可执行文件。
* 解释器逐行读取源代码，将其解析并直接执行，将源代码翻译为机器指令并逐行执行。
* 解释性语言的执行过程通常边解释边执行，每次运行都需要经过解释器的处理。
* 典型的解释性语言包括 JavaScript、Python、Ruby、PHP等。

区别：

* 编译型语言在运行之前需要将代码转换为可执行文件，而解释性语言在运行时逐行解释执行。
* 编译型语言的执行速度通常较快，因为代码已经被预先编译成机器语言，无需再进行解释。解释性语言的执行速度较慢，因为每次运行都需要经过解释器的处理。
* 编译型语言一般需要根据目标平台进行编译，可执行文件通常与特定的操作系统和硬件相关。解释性语言通常是跨平台的，只需要相应的解释器即可运行。
* 编译型语言在代码运行之前会进行全面的语法和类型检查，可以在编译过程中发现一些潜在的错误。解释性语言在运行时进行解释，错误可能会在运行过程中被发现。

需要注意的是，实际上很多语言不是严格的编译型语言或解释性语言，而是在两者之间存在折中的方式。例如，Java 语言将源代码编译为字节码（中间形式），然后在虚拟机中解释执行。因此，这些概念并不是绝对的，语言的执行方式可能有所不同。

## 原型链？{#p0-prototype-chain}

根据 [ECMAScript 规范对象原型链的描述](https://tc39.es/ecma262/#sec-objects)概念如下: 每一个通过构造器创建的对象都会有一个隐式索引,值指向构造器的 **prototype(原型)** 属性值。此外该原型可能包含一个值为非空的隐式索引指向它自己的原型,依次类推称为原型链。当查找某个对象属性时会顺着原型链检查,返回匹配的第一个相同属性值。

基于上述概念原型链具有如下特性

1. 在访问对象属性和方法时,js 引擎会遍历对象的自有属性和递归遍历内部  `__proto__` 索引指向的对象返回第一个查找到的值
2. 采用构造函数初始化对象时,实例的 `__proto__` 属性指向构造函数的 `prototype`

在JavaScript中，原型链的终点是 `null`。当访问一个对象的属性或方法时，如果当前对象没有该属性或方法，JavaScript引擎会沿着原型链向上查找，直到找到该属性或方法或者到达原型链的终点 `null`。

每个对象都有一个原型（`prototype`）属性，指向它的原型对象。原型对象也是一个对象，也有自己的原型，形成了原型链。原型链是由一系列对象的连接构成的，每个对象都有一个指向其原型的引用，通过这个引用可以沿着原型链向上查找属性和方法。

原型链的终点是 `null`，即最顶层的原型对象没有原型，它的 `[[Prototype]]` 指向 `null`。当查找属性或方法时，如果一直沿着原型链找到最顶层的原型对象仍然没有找到，则返回 `undefined`。

示例：

```javascript
const obj = {}
console.log(obj.toString()) // obj 没有定义 toString 方法，通过原型链找到 Object.prototype 上的 toString 方法

const arr = []
console.log(arr.join()) // arr 没有定义 join 方法，通过原型链找到 Array.prototype 上的 join 方法

const str = 'Hello'
console.log(str.toUpperCase()) // str 没有定义 toUpperCase 方法，通过原型链找到 String.prototype 上的 toUpperCase 方法

const num = 42
console.log(num.toFixed(2)) // num 没有定义 toFixed 方法，通过原型链找到 Number.prototype 上的 toFixed 方法

// console.log(Object.prototype.__proto__) // 最顶层的原型对象 Object.prototype 的原型是 null
```

因此，原型链的终点是 `null`，表示在原型链的最顶层无法再继续向上查找。

## JavaScript 如何做内存管理？ {#p0-memory}

JavaScript中的内存管理是由垃圾收集器负责的。垃圾收集器会自动追踪不再使用的对象，并在适当的时候释放它们占用的内存。

JavaScript的垃圾收集器使用了一种称为"**标记-清除**"（mark and sweep）的算法来确定哪些对象是不再需要的。该算法通过标记所有被引用的对象，然后清除未被标记的对象。

以下是JavaScript中的一些内存管理的原则和技巧：

1. 自动内存管理：JavaScript的垃圾收集器会自动管理内存，不需要手动释放内存。你只需确保不再使用的对象没有被引用，垃圾收集器会在适当的时候自动回收内存。

2. 避免全局变量：全局变量会一直存在于内存中，直到页面关闭。尽量减少使用全局变量，而是使用函数作用域或模块化的方式来限制变量的作用范围。

3. 及时释放引用：当你不再需要一个对象时，最好将对它的引用设置为null，这样可以使垃圾收集器更早地释放对象所占用的内存。

4. 避免循环引用：如果对象之间存在循环引用，即使它们已经不再被使用，垃圾收集器也不会自动释放它们。确保及时断开循环引用，使垃圾收集器能够正确地回收内存。

5. 避免大量对象的创建和销毁：频繁地创建和销毁大量对象会导致垃圾收集器频繁地执行，影响性能。如果可能的话，尽量重用对象，而不是频繁地创建和销毁它们。

虽然JavaScript的垃圾收集器自动管理内存，但仍然需要开发人员编写高效的代码来避免内存泄漏和浪费，以确保JavaScript应用程序的性能和可靠性。

## 必包是什么? {#p0-js-closure}

闭包在 JavaScript 中有很多实用的使用场景，以下是一些主要的场景：

**一、数据隐藏和封装**

1. 保护变量：

* 闭包可以创建一个私有作用域，将变量封装在函数内部，防止外部直接访问和修改。只有通过特定的函数接口才能访问和操作这些变量。
* 例如：

 ```javascript
 function createCounter () {
   let count = 0
   return {
     increment () {
       count++
     },
     getCount () {
       return count
     }
   }
 }

 const counter = createCounter()
 counter.increment()
 console.log(counter.getCount()) // 1
 ```

* 在这个例子中，`count`变量被封装在`createCounter`函数内部，外部无法直接访问，只能通过返回的对象上的方法来操作`count`。

2. 模拟私有方法：

* 在面向对象编程中，可以使用闭包来模拟私有方法。私有方法只能在对象内部被访问，外部无法直接调用。
* 例如：

 ```javascript
 const myObject = (function () {
   let privateVariable = 0
 
   function privateMethod () {
     privateVariable++
     console.log(privateVariable)
   }

   return {
     publicMethod () {
       privateMethod()
     }
   }
 })()
 
 myObject.publicMethod() // 1
 ```

* 在这个例子中，`privateMethod`和`privateVariable`只能在内部函数中被访问，外部通过调用`publicMethod`间接访问了私有方法。

**二、函数柯里化（Currying）**

1. 逐步参数化：

* 闭包可以用于实现函数柯里化，将一个多参数的函数转换为一系列单参数的函数。每次调用只接受一部分参数，并返回一个新的函数，直到所有参数都被提供。
* 例如：

 ```javascript
 function add (a) {
   return function (b) {
     return function (c) {
       return a + b + c
     }
   }
 }

 const addFiveAndSixAndSeven = add(5)(6)(7)
 console.log(addFiveAndSixAndSeven) // 18
 ```

* 在这个例子中，`add`函数通过闭包逐步接受参数，最后返回一个计算结果。

2. 灵活的参数传递：

* 函数柯里化可以使函数的参数传递更加灵活，特别是在需要部分应用参数或者延迟参数传递的情况下。
* 例如，可以先创建一个部分应用参数的函数，然后在需要的时候再传递剩余的参数。

**三、回调函数和事件处理**

1. 保存外部环境：

* 在异步编程或者事件处理中，闭包可以保存外部函数的变量和状态，使得回调函数能够访问这些信息。
* 例如：

 ```javascript
 function setTimeoutWithMessage (message) {
   setTimeout(function () {
     console.log(message)
   }, 1000)
 }

 setTimeoutWithMessage('Hello after 1 second!')
 ```

* 在这个例子中，回调函数内部的`message`变量是通过闭包从外部函数中获取的，即使外部函数已经执行完毕，回调函数仍然能够访问到这个变量。

2. 事件处理程序：

* 在 DOM 事件处理中，闭包可以用于保存与事件相关的状态和数据。
* 例如：

 ```html
 <button id="myButton">Click me</button>
 <script>
 document.getElementById("myButton").addEventListener("click", function () {
 const buttonText = this.textContent;
 console.log(`Button clicked: ${buttonText}`);
 });
 </script>
 ```

* 在这个例子中，事件处理程序内部的`buttonText`变量是通过闭包从外部环境中获取的，每次点击按钮时，都能正确地打印出按钮的文本内容。

**四、记忆化（Memoization）**

1. 缓存计算结果：

* 闭包可以用于实现记忆化，将函数的计算结果缓存起来，避免重复计算。如果相同的参数再次被传入，直接返回缓存的结果，而不是重新计算。
* 例如：

 ```javascript
 function memoizedAdd () {
   const cache = {}
   return function (a, b) {
     const key = `${a},${b}`
     if (cache[key]) {
       return cache[key]
     } else {
       const result = a + b
       cache[key] = result
       return result
     }
   }
 }

 const memoizedAddFunction = memoizedAdd()
 console.log(memoizedAddFunction(2, 3)) // 5
 console.log(memoizedAddFunction(2, 3)) // 5（直接从缓存中获取结果）
 ```

* 在这个例子中，`memoizedAdd`函数内部的`cache`对象用于缓存计算结果，通过闭包保存了这个缓存对象，使得每次调用函数时都能访问到它。

2. 提高性能：

* 对于计算复杂或者频繁调用的函数，记忆化可以显著提高性能，减少不必要的计算。

## Strict Mode?

回答要点包括如下几个方面。

1. **Strict Mode 定义** Strict Mode 是 ECMAScript 语言的变种，详见规范 [strict-variant-of-ecmascript](https://tc39.es/ecma262/#sec-strict-variant-of-ecmascript) 。 开启 Strict Mode  后，JS 引擎会基于 ECMAScript 规范中定义的严格模式约束，排除特定的语法或语义，改变特定语义的执行流程。
2. **如何开启** 通过在代码或函数顶部声明 `'use strict'` 开启 Strict Mode 模式, 开启规则详见 [Use Strict Directive](https://tc39.es/ecma262/#sec-directive-prologues-and-the-use-strict-directive)。
3. **Strict Mode 作用** 用户通过开启来解决一些不安全的语言特性带来的安全或者其他问题。开启后的限制，详见 [The Strict Mode of ECMAScript](https://tc39.es/ecma262/#sec-strict-mode-of-ecmascript)。
4. **加分项** 理解为什么会有这个特性，为什么会设计成这样的语法。可以阅读 [JavaScript二十年 严格模式章节](https://cn.history.js.org/part-4.html#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)

`"use strict"` 是 JavaScript 中的一个编译指示（directive），用于启用严格模式（strict mode）。

严格模式是 JavaScript 的一种执行模式，它增强了代码的健壮性、可维护性和安全性，并减少了一些常见的错误。启用严格模式后，JavaScript 引擎会执行更严格的语法检查，提供更好的错误检测和提示。

使用 `"use strict"` 有以下几个特点和用途：

1. 严格模式禁止使用一些不安全或不推荐的语法和行为，例如使用未声明的变量、删除变量或函数、对只读属性赋值等。它会抛出更多的错误，帮助开发者发现并修复潜在的问题。

2. 严格模式禁止使用一些不严谨的语法解析和错误容忍行为，例如不允许在全局作用域中定义变量时省略 `var` 关键字。

3. 严格模式对函数的处理更加严格，要求函数内部的 `this` 值为 `undefined`，而非在非严格模式下默认指向全局对象。

4. 严格模式禁止使用一些具有歧义性的特性，例如禁止使用八进制字面量、重复的函数参数名。

使用严格模式可以提高代码的质量和可靠性，并避免一些常见的错误。为了启用严格模式，只需在 JavaScript 文件或函数的顶部添加 `"use strict"` 即可。严格模式默认不启用，需要显式地指定。例如：

```javascript
'use strict'

// 严格模式下的代码
```

需要注意的是，严格模式不兼容一些旧版本的 JavaScript 代码，可能会导致一些旧有的代码产生错误。因此，在使用严格模式之前，需要确保代码中不会出现与严格模式不兼容的语法和行为。

## let var const 区别? ⭐️⭐️⭐️⭐️⭐️

核心在于作用域.

* let 作用域为最近的块结构
* var 为最近的函数结构

js 采用词法作用域,更详细的资料参见 [你不知道的 JavaScript（上卷） 第一章](https://book.douban.com/subject/26351021/)
理解如下概念:

1. 静态(词法)作用域和动态作用域
2. 左查询和右查询

## 什么是闭包,闭包的的使用场景？⭐️⭐️⭐️⭐️⭐️

闭包就是在函数的词法作用域外访问函数内作用域的现象。

> 闭包的原理是由于外部变量持有内层函数的引用导致函数及其变量未被释放仍就可用

1. 闭包保留了内部函数所有的状态

> 使用场景

1. 私有变量
2. 回调模式保存动画状态,相比全局变量每个动画可以维持自己的状态值。避免全局污染。

## this

1. this 是一个关键字,它的值取决于当前的执行环境,而非申明环境
2. this 值的判定方法,参考 [你不知道的 javascript 上卷-第二部分　 this 和对象原型](https://book.douban.com/subject/26351021/)
    1. **默认绑定**,当为普通函数调用或处于全局环境时
        1. 严格模式 this 为 undefined
        2. 非严格模式为 window
    2. **隐式绑定**,当未对象成员的函数调用时,this 为当前对象 > 此种情况最易出错,当对象成员函数经过赋值等其他操作时,会转变为**默认绑定**须严格区分
    3. **显示绑定** 当采用如下方法调用函数时会改变 this 的值
        1. **call** 修改运行时 this
        2. **apply** 效果同上,传入参数维数组模式
        3. **bind** 永久改变 this,返回新的函数 > 当 this 的值为 null,undefined 时会采用 **默认绑定**,若赋值为原始值则采用原始封装对象进行替换
    4. **new** 当采用 new 运行函数时,this 指向新创建的对象
    5. **箭头函数 this** 继承外层执行环境的 this 值

> DOM 中的 this

当在回调中绑定 this 时,this 值的机制,由于是用户代理触发回调执行,**this** 的值等于申明时绑定的 dom 环境。

```ts
const obj = {
  name: 'yanle',
  age: 20,
  getName: () => {
    const _getName = () => {
      console.log('this.getName', this.name)
    }
    _getName()
  },
  getAge: function () {
    const _getAge = () => {
      console.log('this.getAge', this.age)
    }
    _getAge()
  },
  extend: {
    name: 'le',
    age: 20,
    getName: function () {
      console.log('name: ', this.name)
    },
    getAge: () => {
      console.log('age: ', this.age)
    }
  }
}

obj.getName()
obj.getAge()

obj.extend.getName()
obj.extend.getAge()

obj.extend.getName.bind(obj)()
obj.extend.getAge.bind(obj)()
```

**执行结果**

```shell
this.getName undefined
this.getAge 20
name: le
age: undefined
name: yanle
age: undefined
```

解释如下：

* `obj.getName()`：在箭头函数getName中，this指向的是全局对象（在浏览器中是window对象，Node.js 中是Global对象）。因此this.getName输出undefined。
* `obj.getAge()`：在普通函数getAge中，this指向的是obj对象。因此this.getAge输出20。
* `obj.extend.getName()`：在普通函数getName中，this指向的是obj.extend对象。因此this.name输出le。
* `obj.extend.getAge()`：在箭头函数getAge中，this指向的是全局对象（在浏览器中是window对象，Node.js 中是Global对象）。因此this.age输出undefined。
* `obj.extend.getName.bind(obj)()`：通过bind方法将getName函数绑定到obj对象上，并立即调用绑定后的函数。在绑定后调用时，this指向的是obj对象。因此this.name输出yanle。
* `obj.extend.getAge.bind(obj)()`：在箭头函数 getAge 中，this 是在函数定义时绑定的，而不是在函数调用时绑定的。在这种情况下，箭头函数的 this 指向的是外层作用域的 this，即全局对象（在浏览器中是 window 对象，Node.js 中是 Global 对象）。因此，在 obj.extend.getAge.bind(obj)() 中，this.age 输出的是全局对象的 age，而全局对象中并没有定义 age 属性，所以结果是 undefined。

JavaScript 中 this 指向混乱的原因主要有以下几个：

1. 函数调用方式不同：JavaScript 中函数的调用方式决定了 this 的指向。常见的函数调用方式有函数调用、方法调用、构造函数调用和箭头函数调用。不同的调用方式会导致 this 指向不同的对象，容易引发混乱。

2. 丢失绑定：当函数作为一个独立的变量传递时，或者作为回调函数传递给其他函数时，函数内部的 this 可能会丢失绑定。这意味着函数中的 this 不再指向原来的对象，而是指向全局对象（在浏览器环境中通常是 window 对象）或 undefined（在严格模式下）。

3. 嵌套函数：当函数嵌套在其他函数内部时，嵌套函数中的 this 通常会与外部函数的 this 不同。这可能导致 this 的指向出现混乱，特别是在多层嵌套的情况下。

4. 使用 apply、call 或 bind 方法：apply、call 和 bind 是 JavaScript 中用于显式指定函数的 this 的方法。如果不正确使用这些方法，比如传递了错误的上下文对象，就会导致 this 指向错误。

5. 箭头函数：箭头函数具有词法作用域的 this 绑定，它会捕获其所在上下文的 this 值，而不是动态绑定 this。因此，在箭头函数中使用 this 时，它指向的是箭头函数声明时的上下文，而不是调用时的上下文。

为了避免 this 指向混乱的问题，可以采取以下措施：

* 使用箭头函数，确保 this 始终指向期望的上下文。
* 在函数调用时，确保正确设置了函数的上下文对象，可以使用 bind、call 或 apply 方法。
* 使用严格模式，避免函数内部的 this 默认绑定到全局对象。
* 在嵌套函数中，使用箭头函数或者显式保存外部函数的 this 值，以避免内部函数的 this 指向错误。

理解和正确处理 this 的指向是 JavaScript 开发中重要的一环，它能帮助我们避免许多常见的错误和混乱。

## 变量提升

参考 [我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)

变量提升是 js 语言的一种机制确保在变量或函数定义后,无需考虑调用位置对变量或函数进行引用。

它具有如下机制:

1. 变量或函数声明语句会在代码执行前,完成对变量或函数的初始化
2. 同名函数和变量申明,变量申明提升在前
3. 重复申明的函数提升会按照声明顺序后面覆盖前面
4. let 提升会出现 TDZ 现象

## 解释下原型、构造函数、示例、原型链之间的关系

## 内存管理

js 语言有内置的垃圾回收机制。
内存分配的申明周期如下

1. 分配内存 (申明语句会触发内存分配操作)
2. 使用内存 (函数调用,局域执行触发内存读写)
3. 内存释放 (gc 自动完成)

node 采用标记清除算法。

## V8 里面的 JIT 是什么？ {#jit}

在计算机科学中，JIT 是“Just-In-Time”（即时编译）的缩写，它是一种提高代码执行性能的技术。具体来说，在 V8 引擎（Google Chrome 浏览器和 Node.js 的 JavaScript 引擎）中，JIT 编译器在 JavaScript 代码运行时，将其编译成机器语言，以提高执行速度。

这里简要解释下 JIT 编译器的工作原理：

1. **解释执行**：V8 首先通过一个解释器（如 Ignition）来执行 JavaScript 代码。这个过程中，代码不会编译成机器语言，而是逐行解释执行。这样做的优点是启动快，但执行速度较慢。

2. **即时编译**：当代码被多次执行时，V8 会认为这部分代码是“热点代码”（Hot Spot），此时 JIT 编译器（如 TurboFan）会介入，将这部分热点代码编译成机器语言。机器语言运行在 CPU 上比解释执行要快得多。

3. **优化与去优化**：JIT 编译器会对热点代码进行优化，但有时候它会基于错误的假设做出优化（例如认为某个变量总是某种类型）。如果后来的执行发现这些假设不成立，编译器需要去掉优化（Deoptimize），重新编译。

JIT 编译器的一个关键优点是它能够在不牺牲启动速度的情况下，提供接近于或同等于编译语言的运行速度。这使得像 JavaScript 这样原本被认为执行效率较低的语言能够用于复杂的计算任务和高性能的应用场景。

随着 V8 和其他现代 JavaScript 引擎的不断进步，JIT 编译技术也在持续优化，以提供更快的执行速度和更高的性能。

## 隐藏类是什么概念？ {#p0-hidden-class}

**关键词**：JavaScript隐藏类

隐藏类是JavaScript引擎中的一种优化技术，用于提高对象访问的性能。隐藏类是一种数据结构，用于跟踪对象的属性和方法的布局和类型，以便在代码运行时能够快速访问它们。

当JavaScript引擎在执行代码时，会动态地创建对象的隐藏类。隐藏类会跟踪对象的属性和方法，并为它们分配固定的内存偏移量。每当对象的属性和方法发生变化时，隐藏类会根据变化的情况进行更新。

使用隐藏类可以提高代码的执行速度，因为JavaScript引擎可以根据隐藏类的信息来直接定位和访问对象的属性和方法，而不需要进行动态查找或解析。这种优化技术可以减少对象访问的开销，提高代码的性能。

需要注意的是，隐藏类是在运行时动态创建的，因此代码中创建对象的顺序和属性的添加顺序都会影响隐藏类的生成。如果对象的属性添加顺序不一致，可能会导致隐藏类的生成不一致，从而降低代码的性能。

隐藏类是现代JavaScript引擎（如V8、SpiderMonkey等）中的一项重要优化技术，可以显著提高JavaScript代码的执行速度。

下面是一个使用隐藏类的简单示例：

```javascript
function MyClass (a, b) {
  this.prop1 = a
  this.prop2 = b
}

MyClass.prototype.method1 = function () {
  console.log('Method 1')
}

MyClass.prototype.method2 = function () {
  console.log('Method 2')
}

const obj1 = new MyClass(10, 20)
const obj2 = new MyClass(30, 40)

obj1.method1() // 输出 "Method 1"
obj2.method2() // 输出 "Method 2"
```

在上面的示例中，我们创建了一个名为`MyClass`的类，它有两个属性`prop1`和`prop2`，以及两个方法`method1`和`method2`。我们用`new`关键字创建了两个实例`obj1`和`obj2`。

当我们使用隐藏类优化的JavaScript引擎运行这段代码时，它会动态地创建隐藏类来跟踪`MyClass`的属性和方法。每个实例都会有一个关联的隐藏类，它包含了实例的属性和方法的布局和类型信息。

在调用`obj1.method1()`和`obj2.method2()`时，JavaScript引擎会使用隐藏类的信息来直接定位并执行相应的方法，而不需要进行动态查找和解析，从而提高了代码的执行速度。

需要注意的是，这只是一个简单的示例，实际上隐藏类的优化是更复杂和细致的。不同的引擎可能会有不同的隐藏类实现方式，并且隐藏类的生成和优化过程会受到许多因素的影响，如代码的结构、对象的属性访问模式等。

## JS 执行上下文的生命周期阶段有哪些 {#p0-execute-context}

在JavaScript中，执行上下文的生命周期可以分为三个阶段：创建阶段（Creation phase）、执行阶段（Execution phase）和回收阶段（Cleanup phase）。

1. 创建阶段（Creation phase）：

* 在创建阶段，JavaScript引擎会做以下工作：
* 创建变量对象（Variable
 object）：变量对象是执行上下文中的一个重要部分，用于存储变量和函数声明。在该阶段，JavaScript引擎会扫描当前上下文中的代码，并创建变量对象。变量对象包括函数的参数、函数声明和变量声明。对于全局上下文，变量对象是全局对象（如`window`
 对象）。
* 建立作用域链（Scope chain）：作用域链用于解析变量的访问权限。JavaScript引擎会根据当前执行上下文的词法环境和作用域嵌套关系来建立作用域链。
* 确定this值：在创建阶段，JavaScript引擎会确定`this`关键字的值，这取决于函数的调用方式（如函数调用、方法调用、构造函数调用等）。

2. 执行阶段（Execution phase）：

* 在执行阶段，JavaScript引擎会按照代码的顺序执行语句，执行以下操作：
* 变量赋值：根据代码中的赋值操作，给变量分配内存并赋予相应的值。
* 函数引用：根据代码中的函数调用，将函数的引用添加到变量对象中。
* 代码执行：按照代码的顺序执行语句，包括表达式计算、条件判断、循环等操作。
* 创建局部变量：当函数内部存在局部变量时，在执行到相应代码行时，会为局部变量分配内存空间。

3. 回收阶段（Cleanup phase）：

* 在回收阶段，JavaScript引擎会进行垃圾回收和释放内存等清理工作。当执行上下文不再被引用或执行完毕后，会触发回收阶段，进行以下操作：
* 解除引用：将执行上下文中的变量和函数从变量对象中移除，解除对它们的引用。
* 内存回收：对不再被引用的变量和对象进行垃圾回收，释放占用的内存空间。

这三个阶段共同构成了执行上下文的生命周期。创建阶段主要用于初始化执行上下文的变量和函数，建立作用域链和确定`this`值。执行阶段是实际执行代码的阶段，按照代码顺序执行语句。回收阶段主要用于清理执行上下文，释放内存空间。这个生

命周期的循环会在代码的执行过程中反复进行，直到所有的代码都执行完毕并且没有引用指向该执行上下文时，执行上下文将被彻底回收。

在JavaScript中，执行上下文栈（Execution Context Stack）是用于跟踪和管理函数执行的机制。每当JavaScript代码执行到一个函数时，就会创建一个执行上下文（Execution Context）并被推入执行上下文栈的顶部。当函数执行完毕后，执行上下文将从栈中弹出，控制权将返回给调用该函数的上下文。

执行上下文栈遵循"先进后出"（Last-In-First-Out）的原则。也就是说，最后一个推入栈的执行上下文会被最先弹出。

每个执行上下文都包含了以下三个重要的组成部分：

1. 变量对象（Variable Object）：变量对象存储了函数的形参、函数声明、变量声明和作用域链等信息。

2. 作用域链（Scope Chain）：作用域链是一个由当前执行上下文的变量对象和所有父级执行上下文的变量对象组成的链表结构。它用于变量查找的过程。

3. this 值：this 值指定了当前执行上下文中的 this 关键字的指向。

通过执行上下文栈，JavaScript引擎能够追踪到代码的执行位置，并根据当前执行上下文的环境来解析变量和执行函数。这种栈结构的管理方式使得JavaScript能够实现函数的嵌套调用和正确的变量作用域处理。

## JS 中的数组和函数在内存中是如何存储的？{#p0-object-model}

在JavaScript中，数组和函数在内存中的存储方式有一些不同。

1. 数组（Array）的存储：

* 数组是一种线性数据结构，它可以存储多个值，并且这些值可以是不同类型的。在内存中，数组的存储通常是连续的。当创建一个数组时，JavaScript引擎会为其分配一段连续的内存空间来存储数组的元素。数组的每个元素都会被存储在这段内存空间中的相应位置。数组的长度可以动态改变，当向数组添加或删除元素时，JavaScript引擎会重新分配内存空间并移动元素的位置。

2. 函数（Function）的存储：

* 函数在JavaScript中被视为一种特殊的对象。函数的定义实际上是创建一个函数对象，并将其存储在内存中。函数对象本身包含了函数的代码以及其他相关信息，例如函数的名称、参数和闭包等。函数对象的代码部分通常是一段可执行的JavaScript代码，它被存储在内存中的某个位置。当调用函数时，JavaScript引擎会查找该函数对象的存储位置，并执行其中的代码。

需要注意的是，数组和函数的存储方式是由JavaScript引擎决定的，不同的引擎可能会有一些微小的差异。此外，JavaScript引擎还会使用一些优化技术，如垃圾回收和内存管理，来优化内存的使用和回收。

在JavaScript中，变量的存储方式是基于所存储值的数据类型。JavaScript有7种内置数据类型：undefined、null、boolean、number、string、symbol和object。

对于基础数据类型（除了object），变量值会直接存储在内存中。具体来说，这些数据类型的变量在内存中的存储形式如下：

* undefined和null：这两个数据类型都只有一个值，每个值有一个特殊的内存地址。存储它们的变量会被赋予对应的内存地址。
* boolean：这个数据类型的值只需要存储一个比特位（0或1），它们通常被存储在栈中，而不是堆中。
* number：根据规范，数字类型在内存中占用8个字节的空间（64位），它们通常被存储在栈中，而不是堆中。
* string：字符串实际上是一组字符数组，它们通常被存储在堆中，并通过引用地址存储在栈中。
* symbol：每个symbol对应于唯一的标识符。它们通常被存储在堆中，并通过引用地址存储在栈中。

而对于对象类型（包括对象、数组等），变量存储了一个指向存储对象的内存地址的指针。JavaScript采用引用计数内存管理，因此它会对每个对象进行引用计数，当一个对象不再被引用时，JavaScript会自动回收这个对象的内存空间。

总的来说，在JavaScript中，变量的存储方式基于值类型的数据类型，对于对象型变量，存储指向对象的内存地址的指针以及对象的值，而对于基础类型的变量，直接存储变量的值。

在JavaScript中，对象是一种无序的键值对集合，可以保存和传递信息。对象是一种非常重要的数据类型，在JavaScript中，几乎所有东西都是对象。

在底层，JavaScript对象的数据结构是哈希表（Hash Table），也可以称为散列表。哈希表是一种使用哈希函数将键值映射到数据中的位置的数据结构。它允许效率高且快速地插入、查找和删除数据，这些操作在算法的平均情况下都需要常数时间。哈希表的主要思想是将键值对转换为索引的方式在常数时间内获取值，因此哈希表非常适合用于大量的键值对数据存储。

在JavaScript中，对象的键值对存储使用了类似哈希表的技术。JavaScript引擎使用一个称为哈希表种子的随机数字来计算键的哈希值，然后使用头插法（链表或树）将键和值存储在桶中，以实现高效的插入和查询操作。因此，JavaScript对象在实现上使用了哈希表来存储和访问键值对，从而提供了非常高效的数据存储和查找操作，使之成为了编写JavaScript代码的强大工具。

## for 循环的性能远远高于 forEach 的性能？{#p1-for-foreach}

 首先问题说"for循环优于forEach"并不完全正确

循环次数不够多的时候， forEach 性能优于 for

```js
// 循环十万次
const arrs = new Array(100000)

console.time('for')
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd('for') // for: 2.36474609375 ms

console.time('forEach')
arrs.forEach((arr) => {})
console.timeEnd('forEach') // forEach: 0.825927734375 ms
```

循环次数越大， for 的性能优势越明显

```js
// 循环 1 亿次
const arrs = new Array(100000000)

console.time('for')
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd('for') // for: 72.7099609375 ms

console.time('forEach')
arrs.forEach((arr) => {})
console.timeEnd('forEach') // forEach: 923.77392578125 ms
```

 先做一下对比

|对比类型|for|forEach|
|:---|:---|:---|
|遍历|for循环按顺序遍历|forEach 使用 iterator 迭代器遍历|
|数据结构|for循环是随机访问元素|forEach 是顺序链表访问元素|
|性能上|对于arraylist，是顺序表，使用for循环可以顺序访问，速度较快；使用foreach会比for循环稍慢一些|对于linkedlist，是单链表，使用for循环每次都要从第一个元素读取next域来读取，速度非常慢；使用foreach可以直接读取当前结点，数据较快|

 结论

for 性能优于 forEach ， 主要原因如下：

1. foreach相对于for循环，代码减少了，但是foreach依赖IEnumerable。在运行的时候效率低于for循环。
2. for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。

 参考文档

* [资料](https://zhuanlan.zhihu.com/p/461523927)

* [javascript 中 for 的性能比 forEach 的性能要好，为何还要使用 forEach？ - 李十三的回答 - 知乎](https://www.zhihu.com/question/556786869/answer/2706658837)
* [资料](https://juejin.cn/post/6844904159938887687)
