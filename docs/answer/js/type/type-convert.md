类型装换分为两类

**1. 隐式转换**

1. 理解 `==` 会出现类型转换,典型的例子参见如下.

    ```js
    console.log(0 == '0'); //为 true
    console.log(0 == []); //为 true
    console.log('0' == []); //为 false
    ```

    > 详情参见 [equality operator](https://tc39.github.io/ecma262/#sec-equality-operators-runtime-semantics-evaluation)

2. 操作符导致导致的转换

    1. `+` 若存在字符串则进行字符串的连接运算
    2. `-,*,/,**` 转换为数字进行操作

3. 对象转换为数字和准换为字符串的规则,详见 js 权威指南 第六版 3.8.3 章节

**2. 显示类型转换**

1. Boolean,Number,String,Object 的使用



-   [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
    测试用例参见 [type-convert](type-convert.test.js)
