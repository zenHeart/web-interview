### 类型转换? ⭐️⭐️⭐️⭐️⭐️

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
   

类型转换测试用例参见 [type-convert](type-convert.test.js)


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