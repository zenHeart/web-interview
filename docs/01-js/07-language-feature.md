# 语言特性

## 解构复制对象， 是深拷贝还是浅拷贝 {#p2-destructuring-copy-object}

**浅拷贝**

举例：

```javascript
const obj = {
  prop1: 'value1',
  prop2: {
    nestedProp: 'nestedValue'
  }
}

// 使用扩展运算符进行复制
const obj2 = { ...obj }

console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)

// 修改基本类型属性
obj2.prop1 = 'newValue1'
console.log('修改基本类型属性后：')
console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)

// 修改嵌套对象的属性
obj2.prop2.nestedProp = 'newNestedValue'
console.log('修改嵌套对象属性后：')
console.log('原始对象 obj:', obj)
console.log('复制后的对象 obj2:', obj2)
```

解释如下：

1. 首先定义了一个对象`obj`，它包含一个基本类型属性`prop1`和一个嵌套对象属性`prop2`。
2. 使用扩展运算符`{...obj}`创建了一个新的对象`obj2`，这看起来像是对`obj`进行了复制。
3. 当修改`obj2`的基本类型属性`prop1`时，原始对象`obj`的`prop1`不受影响。这是因为基本类型的值在复制时是按值复制的。
4. 然而，当修改`obj2`的嵌套对象属性`prop2.nestedProp`时，原始对象`obj`的`prop2.nestedProp`也被修改了。这是因为扩展运算符对于嵌套对象只是复制了引用，而不是创建一个全新的嵌套对象副本，所以这是浅拷贝的行为。

## for...of、for...in、for 循环， 三者有什么区别 {#p0-loop}

**关键词**：for...in遍历、for...of遍历

以下是 `for...of`、`for...in` 和 `for` 循环的区别对比表格：

| 特性 | for...of 循环 | for...in 循环 | for 循环 |
|------------------|----------------------------------------------------------------|-----------------------------------------------------------|------------------------------------------------------------|
| 遍历对象类型 | 可以遍历可迭代对象（如数组、字符串、Set、Map、Generator 等） | 可以遍历对象的可枚举属性 | 不适用于直接遍历对象，适用于遍历数组或固定个数的循环 |
| 遍历数组 | 遍历数组的元素 | 遍历数组的索引 | 遍历数组的索引或值 |
| 遍历字符串 | 遍历字符串的字符 | 遍历字符串的索引 | 遍历字符串的索引或字符 |
| 遍历 Set | 遍历 Set 的值 | 不适用 | 不适用 |
| 遍历 Map | 遍历 Map 的键值对 | 不适用 | 不适用 |
| 遍历对象 | 不适用 | 遍历对象的可枚举属性及其对应的值 | 不适用 |
| 遍历 Generator | 遍历 Generator 生成的值 | 不适用 | 不适用 |
| 遍历可迭代对象 | 遍历可迭代对象的元素 | 不适用 | 不适用 |
| 适用范围 | 适用于需要遍历可迭代对象的场景 | 适用于需要遍历对象的可枚举属性的场景 | 适用于需要手动控制循环次数的场景 |
| 遍历顺序 | 按照可迭代对象的顺序进行遍历 | 不保证顺序 | 按照循环次数进行遍历 |

需要注意的是，`for...of` 循环只能用于可迭代对象，并且会遍历对象的迭代器方法（即 `Symbol.iterator`），而 `for...in` 循环会遍历对象的所有可枚举属性，包括原型链上的属性。

对于遍历数组的场景，可以使用 `for...of` 循环遍历数组的元素，也可以使用 `for` 循环遍历数组的索引或值。具体选择哪种方式取决于遍历的目的和需求。

以下是一个使用不同循环方式遍历数组的示例：

```javascript
const arr = [1, 2, 3]

console.log('for...of 循环:')
for (const element of arr) {
  console.log(element)
}

console.log('for...in 循环:')
for (const index in arr) {
  console.log(arr[index])
}

console.log('for 循环:')
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
}
```

输出结果为：

```
for...of 循环:
1
2
3
for...in 循环:
1
2
3
for 循环:
1
2
3
```

## 对象冻结 {#p0-freeze}

**冻结对象**

要冻结一个 JavaScript 对象，以防止别人更改它，可以使用`Object.freeze()`方法。`Object.freeze()`方法会递归地冻结一个对象的所有属性，使其变为只读的，并防止更改、删除或添加新属性。以下是使用`Object.freeze()`方法冻结对象的示例：

```javascript
const obj = {
  prop1: 1,
  prop2: 'Hello'
}

Object.freeze(obj)

// 尝试更改属性的值
obj.prop1 = 2 // 不会生效，obj.prop1仍然为1

// 尝试删除属性
delete obj.prop2 // 不会生效，obj仍然包含prop2属性

// 尝试添加新属性
obj.prop3 = true // 不会生效，obj不会添加新属性

console.log(obj)
```

在上述示例中，通过调用`Object.freeze(obj)`方法，将`obj`对象冻结，使其变为只读。此后，无论是更改、删除还是添加属性，都不会对对象产生任何影响。最后，通过`console.log(obj)`输出对象，可以看到对象保持不变，即使尝试进行更改。

需要注意的是，`Object.freeze()`方法只会冻结对象的直接属性，而不会冻结嵌套对象的属性。如果需要递归地冻结嵌套对象的属性，可以编写一个递归函数来处理。

**深度冻结**

要冻结嵌套属性，可以使用一个递归函数来处理。该函数会遍历对象的所有属性，并对每个属性进行冻结。以下是一个示例：

```javascript
function deepFreeze (obj) {
  // 首先冻结当前对象
  Object.freeze(obj)

  // 遍历对象的所有属性
  for (const key of Object.keys(obj)) {
    const value = obj[key]

    // 如果属性是对象类型，则递归调用deepFreeze函数
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value)
    }
  }

  return obj
}

const obj = {
  prop1: 1,
  prop2: {
    nestedProp1: 'Hello',
    nestedProp2: [1, 2, 3]
  }
}

const frozenObj = deepFreeze(obj)

// 尝试更改嵌套属性的值
frozenObj.prop2.nestedProp1 = 'World' // 不会生效，嵌套属性仍然为'Hello'

console.log(frozenObj)
```

在上述示例中，我们定义了一个名为`deepFreeze`的递归函数。该函数首先会对当前对象进行冻结（调用`Object.freeze(obj)`），然后遍历对象的所有属性。如果属性是对象类型，则递归调用`deepFreeze`函数，对嵌套对象进行冻结。

通过调用`deepFreeze(obj)`函数，我们将`obj`对象及其嵌套属性都冻结，并将结果赋值给`frozenObj`。尝试更改嵌套属性的值后，输出`frozenObj`，可以看到对象保持不变，嵌套属性的值没有被更改。

需要注意的是，`deepFreeze`函数并不会修改原始对象，而是返回一个新的冻结对象。如果需要修改原始对象，可以将冻结的属性逐个复制到一个新对象中。
