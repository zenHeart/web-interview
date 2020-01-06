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


## 实现数组复制
参考如下效果
```js
[1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]
```

## 实现 map 函数
参看 [map](./map.js)

## js 编写数组排序


## 找出匹配的数组
```js
A=【1，2，3，5，8，7，6，5，9，1，1，6，9，8】

B=【5，8，7】
```

在A中找出B，元素必须是连续的(也就是在A中找出连在一起的5，8，7)，返回符合这种情况的B的第一个元素在A的位置(也就是5的位置，第3位)，如果没有，返回一个负数;