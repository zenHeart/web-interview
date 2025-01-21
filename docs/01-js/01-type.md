# 类型

## javascript 中有几种数据类型 ?

<Answer>

- 基础类型
  - undefined
  - Null
  - Boolean
  - Number 采用 IEEE 754 标准
  - String
  - Symbol
  - BigInt 属于新增类型
- 引用类型
  - 内建对象 EMACScript 定义
    - Object
    - Function
    - Set
    - WeackSet
    - Map
    - WeakMap
    - Array
    - Regexp
  - 宿主对象 取决于运行环境，如浏览器、Node.js
  - 自定义对象 用户创建的对象

</Answer>

## null undefined 区别?

<Answer>

1. 语言层面
   1. **null** 表示值为空
   2. **undefined** 表示缺省值或默认值
2. 功能层面:
   1. 数值转换
      1. null 会变为 0
      2. undefined 变为 NaN

详细区别参考 [阮一峰 undefined 与 null 的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

</Answer>

## Symbol

1. 定义无冲突的属性名
2. 自定义内部方法

## Number

### IEEE 754

```js
// 说出下面语句的执行结果，并解释原因
console.log(0.1 + 0.2)
console.log(0.1 + 0.2 === 0.3)
```

<Answer>

重点是理解 js 数值采用采用 **IEEE 754 编码**表示数值,,产生原因是二级制表示浮点时某些浮点只能取近似值导致,存在编码误差

推荐视频 [watch](https://www.youtube.com/watch?v=wPBjd-vb9eI)

- [表示 ieee754](https://www.youtube.com/watch?v=8afbTaA-gOQ)

1. **NaN** 表示非法数字,利用 `NaN !=== NaN` 的特性判断
2. **Infinity** 正无穷
3. **-Infinity** 负无穷
    > 注意 Number 类型上包含一系列常量,利用`Object.getOwnPropertyDescriptors(Number)` 自行查看

- `toString` 转换为对应进制的字符串
- 根据前缀自动判断进制
  - **0x** 开头 16 进制
  - **0** 开头 8 进制

整数的加法运算符?

</Answer>

### 什么是 NaN ，它的类型，如何判断 NaN?

### 如何判断一个数值是整数，实现 isInteger

## js 中类型转换规则？

<Answer>

类型转换分为两种

1. **隐式类型转换** 典型场景
   1. `==` 操作触发类型转换,详情参见 [equality operator](https://tc39.github.io/ecma262/#sec-equality-operators-runtime-semantics-evaluation)
   2. 运算符操作触发类型转换
      1. `+` 若存在字符串则进行字符串的连接运算
      2. `-,*,/,**` 转换为数字进行操作
        > 对象转换为数字和准换为字符串的规则,详见 `js 权威指南 第六版 3.8.3 章节`
2. 显示类型转换
   1. 采用 Boolean,Number,String 等构造器初始化
   2. 利用 [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 转换为整形

类型转换测试用例参见

> type-convert.test.js

对象在隐式类型转换中会涉及如下三个函数:

1. [Symbol.toPrimitive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) 决定对象如何取值
2. [Object.prototype.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
3. [Object.prototype.toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

记住如下规则

1. 上述原型方法可能被覆盖
   1. 外部申明对象可以重定义上述方法
   2. 内建对象例如 array 会创建自定义的 toString
   3. 原始封装类型 `Number` 也会重写 toString 方法
2. 当采用 `+,==` 触发隐式类型转换时,调用规则为
   1. `Symbol.toPrimitive` 未重定义则退化到 valueOf
   2. `valueOf` 若定义则执行,若返回非初始类型,则退化到 toString
   3. toString 若定义则执行,否则触发原生 toString
3. 模板运算会直接触发 `toString` 方法

</Answer>
