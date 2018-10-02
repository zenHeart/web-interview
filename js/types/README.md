## 类型设计考点

## 类型转换
* [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
测试用例参见 [type-convert](type-convert.test.js)

## equal
理解 `==` 会出现类型转换,
典型的例子参见如下.
```js
console.log(0=='0') //为 true
console.log(0 ==[]) //为 true
console.log('0' == []) //为 false 
```

详情参见 [equality operator](https://tc39.github.io/ecma262/#sec-equality-operators-runtime-semantics-evaluation)