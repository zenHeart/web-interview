## 详细讲解 js 数组考点
### 常用操作
* 数组开头插入,删除元素
* 数组中间插入元素,[splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* 数组末尾插入,删除元素

详细代码参见 [数组操作](./Array-operation.test.js)

> **实际上大部分操作均可利用,splice 方法实现**

### 数组集合 
常见的两数组进行集合运算包括
* 并集
* 交集
* 补集

参看 [集合函数](./SetOps.js),对应的测试用例为 [SetOps.test.js](./SetOps.test.js)
该工具函数参考 [SetOps](https://gist.github.com/jabney/d9d5c13ad7f871ddf03f).

核心在于,遍历数组 a,b 的元素,保存到一个对象.
其中对元素进行标注,只属于 a,只属于 b,和 a,b 共有,基于此标注即可过滤出所需的元素集.

> 注意若数组中的元素为对象,需要在对象上添加 uid,利用此 uid 实现对不同元素的判断.



### 核心函数
*  [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)