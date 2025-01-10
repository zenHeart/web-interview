# var 提升

## var 提升到函数之前

```js
(function () {
  try {
    throw new Error()
  } catch (x) {
    var x = 1; var y = 2
    console.log(x)
  }
  console.log(x)
  console.log(y)
})()
```
