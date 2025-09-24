# 武汉面经

## 岗位要求

职位描述：前端架构师
岗位职责：

1. 负责公司产品的前端开发，包括但不限于PC端和桌面应用的开发；
2. 负责前端架构设计和优化，确保系统的高扩展性和高可维护性；
3. 推进现有前端产品的微重构，梳理产品代码问题，并提出有效解决方案；
4. 对现有产品代码和架构进行优化，提升代码质量和系统的可维护性；
5. 负责对团队成员的技能培训，提升团队整体技术水平；
6. 与团队成员紧密合作，参与技术方案的讨论和制定，推动项目的顺利进行。

任职要求：

1. 计算机相关专业本科及以上学历，8年以上前端开发经验，对前端技术有持续的热情和追求；
2. 精通Vue.js 2.x和3.x，有丰富的实战经验，能够熟练使用Vue Router、Vuex等周边库；
3. 熟悉Electron框架，有开发跨平台桌面应用的经验；
4. 对Nuxt.js有深入的了解，能够利用Nuxt.js提高前端开发的效率和可维护性；
5. 具备代码重构和优化能力，能够提升现有代码的质量和可维护性；
6. 熟悉前端性能优化，对前端工程化、组件化有深入的理解和实践；
7. 具备良好的团队合作精神，能够与团队成员有效沟通，共同解决问题；
8. 优秀的分析问题和解决问题的能力，对解决具有挑战性问题充满激情；
9. 具备前端架构设计能力，能够主导系统的架构优化和升级；
10. 有团队培训经验，能够有效提升团队成员的技能水平。

## 面试

### 一面

1. 自我介绍
2. script 脚本中 `async` 和 `defer` 的区别
3. 宏任务和微任务
4. 有哪些典型的内存问题如何解决
5. 讲下 304 状态码
6. 强缓存和协商缓存区别
7. cache-control 配置 public 有什么作用
8. Promise.all 和 Promise.race 的区别
9. ref 和 shallowRef 的区别是什么
10. 父子组件的通讯方式有哪些
11. 虚拟列表的实现原理

## 二面

1. 以下结果输出什么

```js
const arr = [1, 2, 3]
arr.forEach(item => {
  item = item + 1
})
console.log(arr) // ?
```

2. 以下结果输出什么

```js
setTimeout(() => {
  alert(1)
})
const promise = new Promise((resolve) => {
  resolve(2)
  alert(2)
})
Promise.resolve().then(() => {
  alert(3)
})
promise.then(() => {
  alert(4)
})
alert(5)
```

3. 以下结果输出什么

```js
const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
// 是否合法
Promise.all(p1, p2)

// 输出什么
Promise.all('123')
```

4. 什么是迭代器
5. 以下输出什么, 为什么只输出 name，`constructor` 不输出， 为什么原型上的对象不输出

```js
const obj = { name: '张三' }
for (const key in obj) {
  console.log(key)
}
```

6. 为什么如下配置 c 会输出

```js
const obj = { name: '张三' }
Object.prototype.c = 12
for (const key in obj) {
  console.log(key)
}
```

7. 以下结果输出什么, 为什么不会堆栈溢出

```js
function fn () {
  console.log(1)
  setTimeout(fn, 0)
}
```

8. Vue 如下代码的作用是什么

```vue
<template>
  <hello-world :key="foo"/>
</template>
<script>
   const foo = ref(1)
   foo.value = 2
</script>
```

9. Electron 用户出现了白屏怎么定位解决
10. Electron 用户长时间运行出现了画面撕裂有哪些解法
11. 在一个个万人聊天室里面，一个 vip 用户发送了消息，如何同步给所有用户
12. 如何优化一个团队的工程质量
13. 如何设计一个组件库如何考量
14. 如何设计 IMSDK ,分层的原则
15. 为什么需要业务心跳作用是什么
