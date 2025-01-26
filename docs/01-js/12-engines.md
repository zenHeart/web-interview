# js 引擎原理

## 原型链？{#p0-prototype-chain}

根据 [ECMAScript 规范对象原型链的描述](https://tc39.es/ecma262/#sec-objects)概念如下: 每一个通过构造器创建的对象都会有一个隐式索引,值指向构造器的 **prototype(原型)** 属性值。此外该原型可能包含一个值为非空的隐式索引指向它自己的原型,依次类推称为原型链。当查找某个对象属性时会顺着原型链检查,返回匹配的第一个相同属性值。

基于上述概念原型链具有如下特性

1. 在访问对象属性和方法时,js 引擎会遍历对象的自有属性和递归遍历内部  `__proto__` 索引指向的对象返回第一个查找到的值
2. 采用构造函数初始化对象时,实例的 `__proto__` 属性指向构造函数的 `prototype`

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

## 什么是 Strict Mode?

回答要点包括如下几个方面。

1. **Strict Mode 定义** Strict Mode 是 ECMAScript 语言的变种，详见规范 [strict-variant-of-ecmascript](https://tc39.es/ecma262/#sec-strict-variant-of-ecmascript) 。 开启 Strict Mode  后，JS 引擎会基于 ECMAScript 规范中定义的严格模式约束，排除特定的语法或语义，改变特定语义的执行流程。
2. **如何开启** 通过在代码或函数顶部声明 `'use strict'` 开启 Strict Mode 模式, 开启规则详见 [Use Strict Directive](https://tc39.es/ecma262/#sec-directive-prologues-and-the-use-strict-directive)。
3. **Strict Mode 作用** 用户通过开启来解决一些不安全的语言特性带来的安全或者其他问题。开启后的限制，详见 [The Strict Mode of ECMAScript](https://tc39.es/ecma262/#sec-strict-mode-of-ecmascript)。
4. **加分项** 理解为什么会有这个特性，为什么会设计成这样的语法。可以阅读 [JavaScript二十年 严格模式章节](https://cn.history.js.org/part-4.html#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)

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

## 箭头函数同非箭头函数 this 的区别？

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
