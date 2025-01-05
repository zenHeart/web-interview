import Answer from '@site/src/components/templates/Answer.tsx';

## `==` 和 `===` 区别

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

### 1. null 判断

```js
typeof null
```

<Answer>

</Answer>
