# 函数

## new Function 了解多少？ {#p0-new-function}

 基本概念

`new Function()` 是 JavaScript 中的一个构造函数，它可以实例化一个新的函数对象并返回。该函数对象可以使用传递给 `new Function()` 的字符串参数作为函数体，并使用其他传递给它的参数作为函数参数，从而动态创建一个可执行的函数。

具体来说，`new Function()` 构造函数可以接受多个字符串参数作为函数的参数和函数体，其参数形式如下：

```
new Function ([arg1[, arg2[, ...argn]],] functionBody)
```

其中，`arg1, arg2, ..., argn` 为函数的参数列表，`functionBody` 为函数体的字符串表示。当调用 `new Function()` 函数时，JavaScript 引擎会将 `arg1, arg2, ..., argn` 所表示的参数和 `functionBody` 所表示的函数体组合成一个新的函数对象，并将该对象返回。

**举例**

下面是一个简单的 `new Function()` 的使用示例，它使用 `new Function()` 构造函数动态创建一个函数对象，并将该对象作为变量 `add` 的值进行赋值：

```
const add = new Function('a', 'b', 'return a + b;');
console.log(add(2, 3)); // 5
```

上述代码中，`new Function('a', 'b', 'return a + b;')` 创建了一个新的函数对象，其中 `'a'` 和 `'b'` 是函数的参数列表，`'return a + b;'` 是函数的实现代码。然后，该函数对象被赋值给变量 `add`。最后，调用 `add(2, 3)` 执行该函数，返回 `5`。

需要注意的是，`new Function()` 构造函数不能访问其上下文中的变量和函数，因此在使用时需要特别注意作用域的限制。同时，由于 `new Function()` 构造函数的执行权限较为灵活，因此在使用时需要仔细检查并确保其输入参数的合法性和安全性。

 new Function 和 eval 的区别

虽然 `new Function()` 和 `eval()` 都可以执行字符串形式的 JavaScript 代码，但是它们在执行方式、使用场景和安全性方面还是有很大的区别的。

下面是 `new Function()` 和 `eval()` 的主要区别：

1. 执行方式不同：`new Function()` 构造函数创建的函数对象只会在其被调用时才会执行，而 `eval()` 函数则立即执行其参数中的 JavaScript 代码，并返回其中的值（如果有）。

2. 作用域不同：`new Function()` 构造函数创建的函数对象没有访问父作用域的能力，只能访问自己的局部变量和全局变量；而 `eval()` 函数则可以访问其自身函数作用域和父作用域的变量和函数，因此具有更高的灵活性和不可预知性。

3. 安全性不同：由于 `new Function()` 构造函数定义的函数对象是在严格的函数作用域下运行的，因此其代码不会改变或访问父作用域中的变量。因此，使用 `new Function()` 构造函数创建函数对象时，可以更好地保证其安全性。而 `eval()` 函数则无法保证代码的安全性，因为它可以访问并改变父作用域中的变量，从而具有更高的攻击风险。

 new Function 性能

与 `eval()` 相比，`new Function()` 函数具有更好的性能。这是因为 `new Function()` 函数在编译时会创建一个新的函数对象，不会像 `eval()` 函数一样将代码注入到当前作用域中。相反，它只在需要时才编译并执行代码，因此在常规情况下，`new Function()` 的性能比 `eval()` 更好。

另外，由于 `new Function()` 在全局作用域外部定义新的函数，可以更好地掌控执行环境，因此我们可以利用 `new Function()` 函数的局部性，使其不仅取代 `eval()`，而且在一定程度上比自执行函数和即时函数表达式引入更少的全局变量。

不过需要注意的是，如果在一个循环中频繁地使用 `new Function()`，或者在函数体内创建过多的嵌套函数，可能会导致性能下降。因此，当需要使用 `new Function()` 函数时，应该尽量减少不必要的重复调用，并注意代码的优化和缓存。

 new Function 使用场景

`new Function()` 的使用场景主要是动态生成 Javascript 代码的情况。由于它可以使用字符串形式作为函数体，并接受可变数量的参数，因此很适合在需要动态生成 JavaScript 代码的场景中使用。下面列举一些常见的使用场景：

1. 动态生成函数：使用 `new Function()` 可以动态生成函数，有时候这种方式比使用函数表达式更加灵活。

2. 模板引擎：某些模板引擎使用 `new Function()` 动态生成 JavaScript 代码来进行文本渲染和数据绑定。

3. 解析 JSON：从服务端获取 JSON 数据时，可以使用 `new Function()` 将其转换为具有更好可读性的 JavaScript 对象。
举例：

```js
const json = '{"name": "张三", "age": "18", "gender": "男"}'
const parseJson = new Function(`return ${json}`)

console.log(parseJson()) // 输出：{name: "张三", age: "18", gender: "男"}
```

4. 在浏览器中查找或执行某些 DOM 元素：可以将 JavaScript 代码传递给 `new Function()` 进行动态执行和查找。

需要注意的是，由于 `new Function()` 可以动态生成和执行任意 JavaScript 代码，因此其安全性和风险需要仔细考虑和评估。在使用 `new Function()` 时，应该避免用于可疑的或不可信任的代码执行，并严格控制传递给函数构造函数的参数，以避免潜在的安全漏洞。

## 函数声明与函数表达式的区别 {#p0-function-expression}

JavaScript中有两种主要的方式来定义函数：函数声明（Function Declaration）和函数表达式（Function Expression）。

1. 函数声明（Function Declaration）：

* 函数声明是通过使用 `function` 关键字后面跟着函数名称来创建的，通常位于作用域的顶部。
* 函数声明会被提升（Hoisting），即在执行代码之前就可以使用。这意味着可以在函数声明之前调用该函数。
* 函数声明创建的函数可以在整个作用域内部访问。

示例：

```javascript
function sayHello () {
  console.log('Hello!')
}

sayHello() // 可以在函数声明之后调用
```

2. 函数表达式（Function Expression）：

* 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的。
* 函数表达式通常是匿名函数，即没有指定函数名称。但也可以使用具名函数表达式，为函数表达式指定一个名称。
* 函数表达式不会被提升，必须在定义之后才能使用。
* 函数表达式创建的函数只能在其所在的变量或表达式作用域内访问。

示例：

```javascript
// 匿名函数表达式
const sayHello = function () {
  console.log('Hello!')
}

sayHello() // 必须在函数表达式之后调用

// 具名函数表达式
const add = function sum (a, b) {
  return a + b
}

console.log(add(2, 3)) // 输出: 5
// console.log(sum(2, 3)); // 错误，无法在外部访问具名函数表达式的名称
```

总结：

* 函数声明是使用 `function` 关键字创建的函数，会被提升，可以在声明之前调用，而且在整个作用域内都可访问。
* 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的，不会被提升，必须在定义之后才能使用，且只能在其所在的变量或表达式作用域内访问。

## 匿名函数？ {#p1-anoymous-function}

在JavaScript中，匿名函数是一种没有名称的函数。它是一种可以直接被定义和使用的函数，而不需要通过函数名进行引用。匿名函数通常用于需要临时定义一个函数并在某个地方立即调用它的情况下使用。

匿名函数可以使用两种方式进行定义：函数表达式和箭头函数。

1. 函数表达式：

 ```javascript
 const func = function () {
 // 函数的代码块
 }
 ```

 在上述代码中，我们定义了一个没有名称的函数，并将其赋值给了变量`func`。这个函数可以通过`func`变量进行调用。

2. 箭头函数：

 ```javascript
 const func = () => {
 // 函数的代码块
 }
 ```

 箭头函数是ES6引入的一种简化的函数表达式。它使用箭头（=>）来定义函数，并且没有自己的this值，继承了外层作用域的this值。

匿名函数常用于以下场景：

* 作为回调函数：匿名函数可以作为参数传递给其他函数，并在需要的时候被调用，例如事件处理函数、定时器回调等。
* 自执行函数：匿名函数可以在定义后立即调用，避免在全局作用域中定义过多的变量。
* 模块化开发：匿名函数可以用于封装私有变量和方法，实现模块化的开发和避免变量名冲突。

需要注意的是，由于匿名函数没有名字，所以在调试和异常追踪时可能会比较困难，因此在开发中建议给函数命名，以提高代码的可读性和可维护性。

**追问: function 是匿名函数吗?**

在JavaScript中，`function`关键字用于定义函数，而不是匿名函数。`function`关键字后面可以跟一个函数名，用于定义具名函数，也可以省略函数名，定义匿名函数。

具名函数示例：

```javascript
function add (a, b) {
  return a + b
}
```

上述代码中的`add`函数是一个具名函数，可以通过函数名`add`进行引用和调用。

匿名函数示例：

```javascript
const sum = function (a, b) {
  return a + b
}
```

上述代码中的`sum`是一个匿名函数，它没有名称，但可以通过变量`sum`进行引用和调用。

可以看到，具名函数和匿名函数的区别在于函数名的存在与否。具名函数可以在函数内部和外部通过函数名进行引用和调用，而匿名函数则需要通过赋值给变量或作为参数传递给其他函数来引用和调用。

需要注意的是，在使用函数表达式定义匿名函数时，函数名是可选的，但在使用函数声明定义具名函数时，函数名是必需的，且函数声明的语法要求将函数名和函数体写在一起。

## 箭头函数?

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
 const sum = function (a, b) {
   return a + b
 }

 // 箭头函数
//  const sum = (a, b) => a + b;
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
   getValue: function () {
     setTimeout(function () {
       console.log(this.value) // undefined，因为此时this指向全局对象
     }, 1000)
   }
 }
 
 // 使用箭头函数避免this绑定问题
 const obj1 = {
   value: 42,
   getValue: function () {
     setTimeout(() => {
       console.log(this.value) // 42，箭头函数捕获了外层上下文的this
     }, 1000)
   }
 }

 // ```
 ```

箭头函数是ES6中引入的一种新的函数语法，它主要解决了以下几个问题：

1. **简化函数表达式**：箭头函数提供了一种更简洁的函数定义方式，可以用更短的语法来定义函数，减少了冗余的代码。例如，使用箭头函数可以将一个函数表达式 `function(x) { return xx; }` 简化为 `(x) => xx;`。

2. **简化this的指向**：在传统的函数定义中，函数内部的`this`指向的是调用该函数的对象。而在箭头函数中，`this`的指向是在定义函数时确定的，指向的是箭头函数所在的上下文。这解决了传统函数中`this`指向容易混淆的问题，使得代码更加易读和简洁。

3. **消除了`arguments`对象**：在箭头函数中，不存在`arguments`对象，这是因为箭头函数没有自己的`arguments`，它继承了所在上下文的`arguments`。这样可以避免在传统函数中使用`arguments`对象时出现的一些问题，如无法使用`arguments`对象的一些方法，以及与命名参数的冲突等。

4. **适用于回调函数**：箭头函数的简洁性和对`this`指向的处理使其特别适用于作为回调函数使用。在传统的函数定义中，由于`this`指向的问题，经常需要使用额外的变量来绑定`this`，而箭头函数可以直接使用外层作用域的`this`，减少了代码的复杂性。

箭头函数也有一些限制和注意事项，例如箭头函数没有自己的`arguments`、`super`和`new.target`，不能作为构造函数使用。

## 普通函数动态参数 和 箭头函数的动态参数有什么区别？  {#p0-arguments}

普通函数和箭头函数在处理动态参数方面有以下区别：

1. 普通函数的动态参数：

* 在普通函数中，可以使用 `arguments` 对象来访问传递给函数的所有参数，无论是否定义了具名参数。`arguments` 是一个类数组对象，可以通过索引访问每个参数的值。
* 普通函数可以使用剩余参数语法（Rest parameters）来声明动态参数，通过三个点（`...`）和一个参数名表示。剩余参数会被收集成一个真正的数组，可以直接使用数组的方法和属性对参数进行操作。

示例：

```javascript
function sum (a, b, ...rest) {
  console.log(a, b) // 输出前两个参数
  console.log(rest) // 输出剩余的动态参数，作为数组
}

sum(1, 2, 3, 4, 5) // 输出: 1 2， [3, 4, 5]
```

2. 箭头函数的动态参数：

* 箭头函数不具有自己的 `arguments` 对象。在箭头函数中，无法直接访问传递给函数的所有参数的类数组对象。
* 箭头函数可以使用剩余参数语法来声明动态参数，与普通函数相同。剩余参数会被收集成一个真正的数组，可以直接使用数组的方法和属性对参数进行操作。

示例：

```javascript
const sum = (a, b, ...rest) => {
  console.log(a, b) // 输出前两个参数
  console.log(rest) // 输出剩余的动态参数，作为数组
}

sum(1, 2, 3, 4, 5) // 输出: 1 2， [3, 4, 5]
```

总结：

* 普通函数和箭头函数都可以接受动态参数。
* 普通函数可以使用 `arguments` 对象访问所有参数，也可以使用剩余参数语法将参数收集成数组。
* 箭头函数没有自己的 `arguments` 对象，无法直接访问所有参数，但可以使用剩余参数语法将参数收集成数组。

在 JavaScript 中，函数的 `arguments` 参数被设计为类数组对象，而不是真正的数组。这是因为 `arguments` 对象包含了函数调用时传入的所有参数，包括未命名的参数。它提供了一种方便的方式来访问和操作这些参数。

要遍历类数组对象，可以使用以下方法：

1. 使用 for 循环和索引：通过使用普通的 for 循环和索引来遍历类数组对象。

```javascript
function sum () {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

sum(1, 2, 3) // 输出：1 2 3
```

2. 使用 for...of 循环：`arguments` 是特殊的类数组， 因为他实现了`[Symbol.iterator]`迭代器， 故可以使用 for...of 循环

```javascript
function sum () {
  for (const arg of arguments) {
    console.log(arg)
  }
}

sum(1, 2, 3) // 输出：1 2 3
```

3. 将类数组对象转换为真正的数组后遍历：可以使用上述提到的类数组转换方法将类数组对象转换为真正的数组，然后使用数组的遍历方法进行遍历，如 `forEach()`、`map()` 等。

```javascript
function sum () {
  const args = Array.from(arguments)
  args.forEach(arg => {
    console.log(arg)
  })
}

sum(1, 2, 3) // 输出：1 2 3
```

这些方法都可以用于遍历类数组对象，根据需求选择适合的方式进行操作。

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

## generator {#p0-generator}

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

Generator 是 JavaScript 中一种特殊的函数，它能够通过迭代器协议（Iterator Protocol）实现中断和恢复的功能。

Generator 函数使用 `function*` 声明，内部可以使用 `yield` 关键字来定义中断点。当调用 Generator 函数时，它不会立即执行，而是返回一个迭代器对象。通过调用迭代器的 `next()` 方法，可以逐步执行 Generator 函数，并在每个 `yield` 关键字处暂停执行并返回一个包含当前值的对象。

当调用 `next()` 方法时，Generator 函数会从上次暂停的地方继续执行，直到遇到下一个 `yield` 关键字或函数结束。通过不断调用 `next()` 方法，可以逐步执行 Generator 函数的代码，并获取每个中断点处的值。

由于 Generator 函数具有中断和恢复的特性，可以用于异步编程，实现一种更直观的方式来处理异步操作。通过 `yield` 关键字，可以将异步操作分割成多个步骤，每个步骤都可以通过 `yield` 暂停，等待异步操作完成后再恢复执行。

以下是一个简单的示例，展示了 Generator 函数的中断和恢复特性：

```javascript
function * generatorFunction () {
  console.log('Step 1')
  yield
  console.log('Step 2')
  yield
  console.log('Step 3')
}

const generator = generatorFunction()

generator.next() // Step 1
generator.next() // Step 2
generator.next() // Step 3
```

在上述示例中，我们定义了一个名为 `generatorFunction` 的 Generator 函数。在函数体内，使用 `console.log` 打印了三个不同的步骤，并在每个步骤后使用 `yield` 关键字暂停执行。然后，我们通过调用 `generator.next()` 方法逐步执行 Generator 函数。每次调用 `next()` 方法时，函数会从上次暂停的地方恢复执行，打印相应的步骤。

通过使用 Generator 函数，可以实现更灵活、可控的异步编程模式，提供更好的代码可读性和维护性。

## async await 原理，手写 async 函数?

1. ES8 引入的特性来简化 promise 的使用
2. 采用 迭代器可以实现 async await 方法模拟
