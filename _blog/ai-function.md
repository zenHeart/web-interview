# 🎯 函数式编程面试题库（含参考答案）

> 面向前端开发岗位，适用于初中高级面试阶段。

---

## 🟢 基础知识

### Q1. 什么是纯函数？请举例说明其特性

**答案：**

纯函数是指在相同输入下总是返回相同输出，并且没有任何副作用（例如修改外部状态、依赖全局变量等）。

```js
// 纯函数
function add (a, b) {
  return a + b
}

// 非纯函数
let count = 0
function increment () {
  return ++count
}
```

---

### Q2. 什么是高阶函数？请用 JavaScript 写一个简单例子

**答案：**

高阶函数是指**接受函数作为参数**或**返回一个函数**的函数。

```js
function map (arr, fn) {
  return arr.map(fn)
}

function greaterThan (n) {
  return x => x > n
}
```

---

### Q3. 请解释以下函数的作用，并说明是否是纯函数

```js
const add = x => y => x + y
```

**答案：**

这是一个**柯里化函数**。它将一个二元函数拆分为两个一元函数。

```js
const add5 = add(5) // y => 5 + y
add5(3) // 8
```

是纯函数，无副作用、相同输入产生相同输出。

---

### Q4. 什么是柯里化？它与偏函数应用的区别？

**答案：**

- **柯里化（Currying）**：把接收多个参数的函数转换为一系列接收一个参数的函数。
- **偏函数应用（Partial Application）**：提前为函数的部分参数赋值，返回一个新的函数。

区别：

- 柯里化是固定“一个参数”，偏函数可以固定“多个参数”。

---

## 🟡 中级知识

### Q5. 什么是函子？请手写一个简单的 `Functor` 实现，并说明其定律

**答案：**

函子是一个具有 `map` 方法的数据结构，用于在容器中映射值，不改变结构。

```js
class Functor {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    return new Functor(fn(this.value))
  }
}
```

**Functor 定律：**

- 恒等律：`F.map(x => x) === F`
- 组合律：`F.map(x => f(g(x))) === F.map(g).map(f)`

---

### Q6. 请实现一个 `Maybe` 函子，并说明其用途

**答案：**

`Maybe` 用于处理空值，避免 null 或 undefined 引发错误。

```js
class Maybe {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    return this.value == null ? this : new Maybe(fn(this.value))
  }
}
```

用途示例：

```js
Maybe.of = value => new Maybe(value)

const safeName = Maybe.of(user.name).map(n => n.toUpperCase())
```

---

### Q7. 实现一个 `compose` 函数，并组合 `toUpperCase` 和 `exclaim`

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const toUpperCase = str => str.toUpperCase()
const exclaim = str => str + '!'

const shout = compose(exclaim, toUpperCase)
shout('hello') // "HELLO!"
```

---

### Q8. 函数式方式过滤空值并加 1

```js
const cleanAndAddOne = arr =>
  arr.filter(x => x != null && x !== '').map(x => Number(x) + 1)

cleanAndAddOne([1, '', 2, null, 3]) // [2, 3, 4]
```

---

## 🔵 高级知识

### Q9. 什么是 Monad？与 Functor 的区别？

**答案：**

Monad 是一种扩展的函子，提供 `flatMap` 或 `chain`，用于展开嵌套结构。

```js
class Maybe {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    return this.value == null ? this : new Maybe(fn(this.value))
  }

  flatMap (fn) {
    return this.value == null ? this : fn(this.value)
  }
}
```

区别：

- Functor 只能 `map`，Monad 能**链式调用并扁平化嵌套结构**。

---

### Q10. IO 函子的意义？

IO 用来封装副作用（如读取 DOM、console.log 等），避免副作用污染主流程，并延迟执行。

```js
class IO {
  constructor (effect) {
    this.effect = effect
  }

  map (fn) {
    return new IO(() => fn(this.effect()))
  }

  run () {
    return this.effect()
  }
}
```

---

### Q11. 实现一个 `Either` 函子处理 JSON 安全解析

```js
class Either {
  static of (x) {
    return new Right(x)
  }
}

class Left extends Either {
  constructor (value) {
    super()
    this.value = value
  }

  map (_) {
    return this
  }
}

class Right extends Either {
  constructor (value) {
    super()
    this.value = value
  }

  map (fn) {
    return new Right(fn(this.value))
  }
}

// 用法
const tryParse = str => {
  try {
    return new Right(JSON.parse(str))
  } catch (e) {
    return new Left('Invalid JSON')
  }
}
```

---

### Q12. Promise 是 Monad 吗？

是的。Promise 提供 `.then`，类似 `map` 和 `flatMap` 的组合。它遵循 Monad 定律（左/右单位律、结合律），所以被称为异步 Monad。

---

## 🟣 实战与思想

### Q13. 函数式 vs 命令式 示例对比

- 命令式：

```js
const result = []
for (let i = 0; i < list.length; i++) {
  if (list[i].active) result.push(list[i].price)
}
```

- 函数式：

```js
const result = list.filter(x => x.active).map(x => x.price)
```

---

### Q14. 函数式方式重写

```js
const total = items
  .filter(item => item.active)
  .map(item => item.price)
  .reduce((sum, price) => sum + price, 0)
```

---

### Q15. 前端应用场景示例

1. **表单校验管道**：用 `compose` 组合多个校验函数。
2. **状态不可变更新**：使用纯函数更新组件状态。

---

### Q16. 函数式库支持

- **Ramda**：支持柯里化、compose。
- **Lodash/fp**：函数优先风格、不可变。
- **RxJS**：提供流式 `map/filter/reduce`，纯函数处理异步事件流。

---

## 🧩 Bonus 挑战题

### Q17. 链式函数式容器

```js
class Chain {
  constructor (value) {
    this.value = value
  }

  map (fn) {
    return new Chain(fn(this.value))
  }

  value () {
    return this.value
  }
}

const chain = val => new Chain(val)
```

---

### Q18. 惰性求值容器

```js
class Lazy {
  constructor (fn) {
    this.fn = fn
  }

  map (fn) {
    return new Lazy(() => fn(this.fn()))
  }

  evaluate () {
    return this.fn()
  }
}
```

---

是否还需要我：

- 帮你生成 PDF / HTML 格式版本？
- 或者帮你导入到你用的笔试平台（如 Notion、HackMD、GitBook）？
你可以告诉我你希望如何使用这份题库。
