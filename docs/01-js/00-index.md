# js-草稿箱

此处放置待整理内容

* [ ] [JavaScript Quizzes](https://quiz.typeofnan.dev/)

## 操作符优先级

```js
console.log(1 < 2 < 3)
console.log(3 > 2 > 1)
```

## 软技能，细心程度

```js
typeof undefined === typeof NULL
```

## Set 的时间复杂度为什么是 O(1)

* Set 通常基于 HashMap 实现
* 使用哈希表作为底层数据结构
* 通过哈希函数将元素映射到数组位置
* 查找、插入、删除操作平均时间复杂度都是 O(1)
* 注意：当发生哈希冲突时，最坏情况下可能退化到 O(n)

* js asyc / defer
* async await 原理， 手写 async 函数？
* es6 generator
* Map 了解多少
* Set 了解多少
* Proxy 和 Reflect 了解多少

* let const var 区别

## 编程题

* 检测对象循环引用