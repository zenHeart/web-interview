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
