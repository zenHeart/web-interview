# 函数式

## 函数式编程了解多少？ {#p0-function-program}

 函数式编程的核心概念

函数式编程是一种编程范式，它将程序看做是一系列函数的组合，函数是应用的基础单位。函数式编程主要有以下核心概念：

1. 纯函数：函数的输出只取决于输入，没有任何副作用，不会修改外部变量或状态，所以对于同样的输入，永远返回同样的输出值。因此，纯函数可以有效地避免副作用和竞态条件等问题，使得代码更加可靠、易于调试和测试。

2. 不可变性：在函数式编程中，数据通常是不可变的，即不允许在内部进行修改。这样可以避免副作用的发生，提高代码可靠性。

3. 函数组合：函数可以组合成复杂的函数，从而减少重复代码的产生。

4. 高阶函数：高阶函数是指可以接收其他函数作为参数，也可以返回函数的函数。例如，函数柯里化和函数的组合就是高阶函数的应用场景。

5. 惰性计算：指在必要的时候才计算（执行）函数，而不是在每个可能的执行路径上都执行，从而提高性能。

函数式编程的核心概念是将函数作为基本构建块来组合构建程序，通过纯函数、不可变性、函数组合、高阶函数和惰性计算等概念来实现代码的简洁性、可读性和可维护性，以及高效的性能运行。

 函数式编程的优势

函数式编程有以下优势：

1. 易于理解和维护：函数式编程强调数据不变性和纯函数概念，可以提高代码的可读性和可维护性，因为它避免了按照顺序对变量进行修改，并强调函数行为的确定性。

2. 更少的 bug：由于函数式编程强调纯函数的概念，它可以消除由于副作用引起的bug。因为纯函数不会修改外部状态或数据结构，只是将输入转换为输出。这么做有助于保持代码更加可靠。

3. 更好的可测试性：由于纯函数不具有副作用，它更容易测试，因为测试数据是预测性的。

4. 更少的重构：函数式编程使用函数组合和柯里化等方法来简化代码。它将大型问题分解为微小问题，从而减少了代码重构的需要。

5. 避免并发问题：由于函数式编程强调不变性和纯函数的概念，这使得并发问题变得更简单。纯函数允许并行运行，因此，当程序在不同的线程上执行时，它更容易保持同步。

6. 代码复用：由于函数是基本构建块，并且可以组合成更高级别的功能块，使用函数式编程可以更大程度上推崇代码复用，减少代码冗余。

函数式编程通过强调纯函数、不可变数据结构和函数组合等概念，可以提高代码可读性和可维护性，降低程序bug出现的风险，更容易测试，并且更容易将问题分解为更容易处理的小部分，更好地应对并发和可扩展性。

## curry

```js
// 实现 sum 函数支持类似效果
console.log(sum(2, 3)) // Outputs 5
console.log(sum(2)(3)) // Outputs 5
```

```js
function currying (fn, ...args) {
  return args.length >= fn.length
    ? fn(...args)
    : currying.bind(null, fn, ...args)
}
```

* created_at: 2023-05-22T13:08:59Z
* updated_at: 2023-05-22T13:09:00Z
* labels: JavaScript, 京东
* milestone: 中

**关键词**：函数柯里化、柯里化应用场景、柯里化优势

 函数柯里化是什么？

函数柯里化（Currying）是一种在函数式编程中使用的技术，其主要目的是将一个接受多个参数的函数转换成一系列使用一个参数的函数。
这样做的好处是允许你创建一些部分应用的函数，预先固定一些参数，使得代码更简洁，便于复用和组合。

以下是一个简单的柯里化函数的例子：

```javascript
function curry (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 使用 curry 函数的例子
function sum (a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3)) // 6
console.log(curriedSum(1, 2)(3)) // 6
console.log(curriedSum(1)(2, 3)) // 6
console.log(curriedSum(1, 2, 3)) // 6
```

在这个例子中，我们创建了一个 `curry` 函数，该函数接受一个普通的多参数函数（如 `sum`）作为输入，并返回一个新的柯里化函数。 这个柯里化函数可以用多种方式调用，其参数可以一次性传递，也可以分批传递。

 柯里化有哪些应用场景和优势

函数柯里化在函数式编程中有很多应用场景和优势。以下是一些常见的应用场景和优势：

1. 参数复用：柯里化可以使我们预先固定一些参数，形成一个部分应用的函数，这样可以将相同参数的重复使用降到最低。这有利于减少参数传递的冗余，使代码更简洁。

例：

```javascript
function multiply (a, b) {
  return ab
}

const double = curry(multiply)(2)
const triple = curry(multiply)(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15
```

2. 延迟计算：柯里化允许我们将函数调用分批进行，而不是一次性传递所有参数。这样，我们可以在需要的时候进行最后的计算，提高性能。

例：

```javascript
const data = [1, 2, 3, 4, 5]
const curriedFilter = curry((predicate, arr) => arr.filter(predicate))

const greaterThanThree = (num) => num > 3
const filterGreaterThanThree = curriedFilter(greaterThanThree)

// 延迟计算：先创建过滤函数，最后传入数据时才执行
const result = filterGreaterThanThree(data)
console.log(result) // [4, 5]
```

3. 代码组合和复用：柯里化有助于创建可以被复用或组合成更复杂形式的函数。这使我们能够构建更加模块化和可扩展的代码库。

例：

```javascript
const curriedMap = curry((fn, arr) => arr.map(fn))

const doubleAll = curriedMap(double)
const tripleAll = curriedMap(triple)

console.log(doubleAll([1, 2, 3])) // [2, 4, 6]
console.log(tripleAll([1, 2, 3])) // [3, 6, 9]
```

4. 更易读的代码：柯里化技术可以让我们的代码更加模块化和函数式，进而提高代码的可读性。柯里化函数更加聚焦于单一职责，这样可以让代码逻辑更清晰。

函数柯里化有助于提高代码的可读性、可维护性和模块化程度，同时减少参数传递的冗余，使代码更简洁。在函数式编程场景中，柯里化是一种非常实用的技术。

## 继承有哪几种方式？
