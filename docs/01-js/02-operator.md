
# 操作符

## == 和 === 区别 {#p0-operator-equal}

<Answer>

`==` 和 `===` 等号的区别在于, `==` 当比对的值类型不同时会发生类型转换。记住如下核心点

1. 相同类型比较则规则同 `===`
2. 不同基础类型之间的比较,最终会退化为数值比较(不考虑 Symbol)
3. 基础类型同对象的比较会退化为,基础类型同,`ToPrimitive(对象)`的比较,`ToPrimitive` 则会执行如下操作
   1. 先采用 `valueOf` 返回值
   2. 若无结果采用 `toString` 返回值

参看 [ECMAScript == 规范](https://tc39.es/ecma262/#sec-abstract-equality-comparison) 详细比对步骤如下,假设比对为 `x == y`

1. x,y 类型相同则比较结果同 `x === y`
2. x,y 为 `null == undefined` 或 `undefined == null` 时返回 true
3. x 为 Number 类型,y 为字符串 结果同 `x == ToNumber(y)`
4. x 为字符串,y 为 Number 类型,结果同 `ToNumber(x) == y`
5. x 为 BigInt,y 为字符串,结果为 `x == StringToBigInt(y)`
6. 如果 x 为字符串,y 为 BigInt,结果为 `y == x` 然后采用第五步进行比较
7. 如果 x 为 Boolean,则采用 `ToNumber(x) == y` 比较
8. 如果 y 为 Boolean 则转换为 `x == ToNumber(y)`
9. 如果 x 为 String,Number,BigInt,Symbol,y 为对象 `x == ToPrimitive(y)`
10. 如果 x 为对象,有 为 String,Number,BigInt,Symbol 则转换为 `ToPrimitive(x) == y`
11. 如果 x 为 BigInt ,y 为 Number
    1. x 和 y 中任意值为 NaN 返回 false
    2. 比较两者数值相同返回 true 不同返回 false

- [抽象比较](https://tc39.github.io/ecma262/#sec-abstract-equality-comparison)
- [严格比较](https://tc39.github.io/ecma262/#sec-strict-equality-comparison)

</Answer>

## typeof

在JavaScript中，typeof和instanceof是两个用于检查变量类型的操作符，但它们具有不同的用途和区别。

typeof是一个一元操作符，用于确定给定变量的数据类型。它返回一个字符串，表示变量的数据类型。typeof可以用于任何变量，包括基本数据类型（如字符串、数字、布尔值）和引用数据类型（如对象、数组、函数等）。

例如：

```ts
typeof 42 // "number"
typeof 'Hello' // "string"
typeof true // "boolean"
typeof undefined // "undefined"
typeof null // "object"
typeof [1, 2, 3] // "object"
typeof { name: 'John', age: 30 } // "object"
typeof function () {
  // nop
} // "function"
```

注意，typeof null返回的是"object"，这是一个历史遗留问题。

instanceof是一个二元操作符，用于检查对象是否属于指定的构造函数的实例。它返回一个布尔值，表示对象是否是特定构造函数的实例或其子类的实例。

例如：

```ts
const arr = [1, 2, 3]
arr instanceof Array // true

const obj = { name: 'John', age: 30 }
obj instanceof Object // true

function Person (name) {
  this.name = name
}
const john = new Person('John')
john instanceof Person // true
```

typeof用于确定变量的数据类型，而instanceof用于确定对象是否为某个构造函数的实例。虽然typeof可以检查基本数据类型和引用数据类型，但无法检查对象的具体类型。而instanceof可以在对象的继承链上进行检查，可以明确对象是否为某个类的实例或其子类的实例。

## 操作符优先级 {#p2-operator-priority}

```js
console.log(1 < 2 < 3)
console.log(3 > 2 > 1)
```

## null 判断

```js
typeof null
```

<Answer>

</Answer>

## 连续赋值

<!-- 问题说明 -->
```js
(function () {
  const a = b = 3
})()

console.log('a defined? ' + (typeof a !== 'undefined'))
console.log('b defined? ' + (typeof b !== 'undefined'))
```

## Object.is 与全等运算符(===)有何区别 {#p2-object-is}

`Object.is()`与全等运算符（`===`）都用于比较两个值是否相等，但它们之间存在一些区别：

**一、对特殊值的处理**

1. `NaN`的比较：

- `===`认为`NaN`不等于任何值，包括它自身。
- `Object.is()`认为`NaN`只等于`NaN`。
- 例如：

```js
// eslint-disable-next-line
console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true
```

2. `-0`和`+0`的比较：

- `===`认为`-0`和`+0`是相等的。
- `Object.is()`可以区分`-0`和`+0`。
- 例如：

```javascript
// eslint-disable-next-line
console.log(+0 === -0) // true
console.log(Object.is(-0, +0)) // false
```

**二、一般值的比较**

1. 对于其他值的比较，`Object.is()`和`===`的行为类似：

- 比较两个数字、字符串、布尔值、对象等，如果它们的值和类型都相同，则认为它们相等。
- 例如：

```javascript
// eslint-disable-next-line
console.log(5 === 5) // true
console.log(Object.is(5, 5)) // true

const obj1 = { a: 1 }
const obj2 = { a: 1 }
// eslint-disable-next-line
console.log(obj1 === obj1) // true
console.log(obj1 === obj2) // false
console.log(Object.is(obj1, obj1)) // true
console.log(Object.is(obj1, obj2)) // false
```

## in  {#p0-in}

在 TypeScript 中，`in` 是一个运算符，用于检查对象是否具有指定的属性或者类实例是否实现了指定的接口。

对于对象类型，`in` 运算符可以用来检查对象是否具有某个属性。语法为 `property in object`，其中 `property` 是一个字符串，`object` 是一个对象。

示例：

```typescript
interface Person {
 name: string;
 age: number;
}

function printPersonInfo (person: Person) {
  if ('name' in person) {
    console.log('Name:', person.name)
  }
  if ('age' in person) {
    console.log('Age:', person.age)
  }
}

const person = { name: 'Alice', age: 25 }
printPersonInfo(person) // 输出: Name: Alice, Age: 25
```

在上述示例中，我们定义了一个接口 `Person`，具有 `name` 和 `age` 两个属性。然后定义了一个函数 `printPersonInfo`，它接收一个参数 `person`，类型为 `Person`。在函数内部，我们使用 `in` 运算符检查 `person` 对象是否具有 `name` 和 `age` 属性，如果有则打印对应的值。

对于类类型，`in` 运算符可以用来检查类的实例是否实现了指定的接口。语法为 `interfaceName in object`，其中 `interfaceName` 是一个接口名字，`object` 是一个对象或类的实例。

示例：

```typescript
interface Printable {
 print(): void;
}

class MyClass implements Printable {
  print () {
    console.log('Printing...')
  }
}

function printObjectInfo (obj: any) {
  if ('print' in obj) {
    obj.print()
  }
}

const myObj = new MyClass()
printObjectInfo(myObj) // 输出: Printing...
```

在上述示例中，我们定义了一个接口 `Printable`，具有一个方法 `print`。然后定义了一个类 `MyClass`，它实现了 `Printable` 接口，并且实现了 `print` 方法。接着定义了一个函数 `printObjectInfo`，它接收一个参数 `obj`，类型为 `any`。在函数内部，我们使用 `in` 运算符检查 `obj` 对象是否实现了 `Printable` 接口，如果是则调用 `print` 方法。

总的来说，`in` 关键字在 TypeScript 中用于检查对象是否具有指定的属性或类实例是否实现了指定的接口。它可以帮助我们在运行时根据对象的属性或接口的实现情况来进行相应的处理。

## new {#p0-new}

在 JavaScript 中，`new` 关键字用于创建一个对象实例。当使用 `new` 关键字创建对象时，会发生以下几个步骤：

1. 创建一个空的对象。
2. 将这个空对象的 `[[Prototype]]` 属性设置为构造函数的 `prototype` 属性。
3. 将这个空对象赋值给构造函数内部的 `this` 关键字，用于初始化属性和方法。
4. 如果构造函数返回一个对象，那么返回这个对象；否则，返回第一步创建的对象实例。

以下是一个示例，演示如何使用 `new` 关键字创建一个对象实例：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

const person = new Person('John', 30)
console.log(person.name) // "John"
console.log(person.age) // 30
```

在上面的示例中，`new Person("John", 30)` 会创建一个新的对象实例。在构造函数 `Person` 中，`this.name` 和 `this.age` 会被赋值为 `"John"` 和 `30`。最终，`new` 关键字会返回这个新的对象实例。

需要注意的是，在 JavaScript 中，函数也是对象。因此，我们可以向对象一样定义属性和方法。当我们使用 `new` 关键字调用一个函数时，这个函数会被视为构造函数，从而创建一个新的对象实例。

ES5 和 ES6 使用 `new` 关键字实例化对象的流程基本上是一样的，只是在细节上存在一些差异。

在 ES5 中，当使用 `new` 关键字调用一个函数时，会创建一个新的对象，并将这个新对象的 `[[Prototype]]` 属性指向构造函数的 `prototype` 属性。此外，`new` 关键字还会将构造函数内部的 `this` 关键字绑定到新创建的对象上，从而允许我们在构造函数内部添加属性和方法。

在 ES6 中，这些基本的流程也是相同的。但是，ES6 引入了类（class）的概念，从而为面向对象编程提供了更加便利的语法。使用类定义一个对象时，需要使用 `constructor` 方法作为构造函数，而不是普通的函数。类定义的语法糖实际上是对函数的封装，使用 `new` 关键字创建类的实例时，实际上也是在调用类的 `constructor` 方法。

在 ES6 中，可以使用类的继承来创建更复杂的对象。当使用 `new` 关键字创建一个继承自另一个类的类的实例时，会先调用父类的 `constructor` 方法，再调用子类的 `constructor` 方法，从而完成对象实例的创建过程。

需要注意的是，虽然 ES6 的类看起来像是其他面向对象语言中的类，但在 JavaScript 中，类仍然是基于原型继承的。在创建一个类的实例时，实际上是在创建一个新对象，并将这个新对象的原型指向类的原型。因此，实例化对象的流程与使用普通函数或类定义的对象的流程基本上是相同的。

可以使用以下代码来模拟`new`操作：

```javascript
function myNew (constructor, ...args) {
  // 创建一个新对象，该对象继承自构造函数的原型
  const obj = Object.create(constructor.prototype)

  // 调用构造函数，并将新对象作为this值传递进去
  const result = constructor.apply(obj, args)

  // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : obj
}
```

使用示例：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const john = myNew(Person, 'John', 25)
john.sayHello() // 输出：Hello, my name is John and I'm 25 years old.
```

在上述代码中，`myNew`函数模拟了`new`操作的过程：

1. 首先，通过`Object.create`创建了一个新对象`obj`，并将构造函数的原型对象赋值给该新对象的原型。
2. 然后，使用`apply`方法调用构造函数，并传入新对象`obj`作为`this`值，以及其他参数。
3. 最后，根据构造函数的返回值判断，如果返回的是一个非空对象，则返回该对象；否则，返回新创建的对象`obj`。

这样，我们就可以使用`myNew`函数来模拟`new`操作了。

## Object.is() 与比较操作符 “===”、“==” 有什么区别

`Object.is()` 方法和比较操作符 "==="、"==" 用于比较两个值的相等性，但它们在比较方式和行为上有一些区别。

1. `Object.is()` 方法是严格相等比较，而 "===" 操作符也是严格相等比较，但 "==" 操作符是相等比较。

- 严格相等比较（`===`）要求比较的两个值在类型和值上完全相同才会返回 `true`。
- 相等比较（`==`）会进行类型转换，将两个值转换为相同类型后再进行比较。

2. `Object.is()` 方法对于一些特殊的值比较更准确：

- 对于 NaN 和 NaN 的比较，`Object.is(NaN, NaN)` 返回 `true`，而 `NaN === NaN` 返回 `false`。
- 对于 +0 和 -0 的比较，`Object.is(+0, -0)` 返回 `false`，而 `+0 === -0` 返回 `true`。

下面是一些示例：

```javascript
console.log(Object.is(1, 1)) // true
console.log(Object.is('foo', 'foo')) // true
console.log(Object.is(true, true)) // true

console.log(Object.is(null, null)) // true
console.log(Object.is(undefined, undefined)) // true

console.log(Object.is(NaN, NaN)) // true
// eslint-disable-next-line
console.log(NaN === NaN) // false

console.log(Object.is(+0, -0)) // false
// eslint-disable-next-line
console.log(+0 === -0) // true

console.log(Object.is({}, {})) // false
// eslint-disable-next-line
console.log({} === {}) // false
```

`Object.is()` 方法更精确地比较两个值的相等性，尤其是在处理一些特殊的值时，而 "===" 操作符和 "==" 操作符则具有不同的类型转换行为和比较规则。
