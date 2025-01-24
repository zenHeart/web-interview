# 函数式

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

## 继承有哪几种方式？
