# 武汉

## 面试流程

## 面试题

### 1 面

1. 自我介绍
2. 说下如何做的性能优化
3. 说一下宏任务和微任务的区别
4. 说一下 requestAnimationFrame
5. 说一下 requestIdleCallback, 该回调会阻塞渲染么
6. 说一下重排和重绘
7. getBoundingClientRect 一定会触发重排么
8. 有用过 TS 么
9. 写下如下函数的 TS 定义

```ts
// 获取对象的 key
interface Person {
  name: string
  age: number
}

setObject(person, 'name', 'tom')
setObject(person, 'age', 12)
```

10. 完成如下算法

```js
/*
实现一个 flatten 方法，输入一个嵌套的对象，输出一个扁平化的对象

{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  'c': 3
}

*/
flatten({
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5
    }
  },
  b: [1, 3, {
    a: 2,
    b: 3
  }],
  c: 3
})
```

11. 在题目 10 的实现下

```js
/**
 * 如果是嵌套对象则输出为 X
 * /

```

### 2 面

1. 自我介绍
2. 有做过流式渲染么
3. 怎么处理 markdwon 截断的
4. 实现一个 markdown 缺省表格字符串补齐的功能

   ```ts
   /*
   输入缺省的或者完整的 markdown 表格字符串，自动修正表格，避免缺失

   CASE1=`
   | 姓名 | 年龄 |
   | ---- | ---- |
   | 张三 | 18
   `
   补全为
   `| 姓名 | 年龄 |
   | ---- | ---- |
   | 张三 | 18   |
   `

   CASE2=`
   | 姓名 | 年龄 |
   `

   补全为
   `| 姓名 | 年龄 |
   | ---- | ---- |
   `
   */

   function completeTable (markdown: string): string {
   // TODO
     return ''
   }
   ```

5. 如果要设计一个高性能表格，你要如何实现，说一下你回如何定义组件的属性，业务方如何使用？
