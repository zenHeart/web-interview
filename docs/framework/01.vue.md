## 双向数据绑定原理

## 说一下Vue的双向绑定数据的原理

## virtual dom

## 解释单向数据流和双向数据绑定

## vuex 原理

## hash 模式和历史模式区别

## MVC 和 MVVM

## VUE 生命周期

## 组件通信策略和方法

## v-if 和 v-show 差别

1. Vue2 与 Vue3 的主要区别:

- 响应式系统: Vue3 使用 Proxy 替代了 Vue2 的 Object.defineProperty，提供了更好的性能和数组监听
- Composition API: Vue3 引入组合式 API，更好地支持代码复用和逻辑组织
- 性能提升: Vue3 通过静态标记、TreeShaking 等优化提升了性能
- TypeScript 支持: Vue3 使用 TypeScript 重写，提供更好的类型支持
- Fragment: Vue3 支持多根节点组件

2. key 的作用:

- 用于 Vue 的虚拟 DOM diff 算法，帮助 Vue 准确找到对应的节点，高效地更新虚拟 DOM
- 避免"就地复用"带来的副作用，特别是在列表渲染时
- 触发组件的重新渲染

3. computed 和 watch 的区别:

- computed 是计算属性，有缓存，依赖变化才会重新计算
- watch 是监听器，用于响应数据变化执行回调
- computed 适合多个数据影响一个数据的场景

```javascript
// computed 示例：计算总价
computed: {
  total() {
    return this.price * this.quantity
  }
}
```

- watch 适合一个数据变化影响多个数据的场景

```javascript
// watch 示例：数据变化执行多个操作
watch: {
  username(newVal) {
    this.validateUsername(newVal)
    this.checkAvailability(newVal)
    this.updateUserProfile(newVal)
  }
}
```

4. scoped style 原理:

- 通过给组件添加唯一的属性标识符(data-v-hash)
- 编译时给 css 选择器添加对应的属性选择器
- 确保样式只作用于当前组件

5. 垂直居中实现:

```css
/* Flex 方式 */
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Grid 方式 */
.parent {
  display: grid;
  place-items: center;
}

/* 绝对定位方式 */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

6. flex: 1 的含义:
相当于设置:

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```
表示元素可以伸展和收缩，占据剩余空间

7. 单行文本省略:

```css
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

8. apply 和 call 的区别:

- 都是用来改变函数的 this 指向
- call 接受参数列表
- apply 接受参数数组

```javascript
fn.call(obj, arg1, arg2)
fn.apply(obj, [arg1, arg2])
```

9. this 指向:

- 普通函数中，this 指向调用者
- 箭头函数中，this 指向定义时的上下文
- call/apply/bind 可以改变 this 指向
- 构造函数中，this 指向新创建的实例

10. 闭包及场景:
闭包是函数能够访问其定义时所在的词法作用域
常见场景:

```javascript
// 数据私有化
function counter () {
  let count = 0
  return {
    add () { count++ },
    get () { return count }
  }
}

// 函数柯里化
function curry (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs))
    }
  }
}
```

11. 节流防抖:

```javascript
// 防抖: 延迟执行，重复触发重新计时
function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流: 规定时间内只执行一次
function throttle (fn, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}
```

12. 宏任务与微任务:

- 宏任务: setTimeout, setInterval, requestAnimationFrame
- 微任务: Promise, MutationObserver, process.nextTick
- 执行顺序: 同步代码 -> 微任务队列 -> 宏任务队列

13. async/await:

- async 函数返回 Promise
- await 等待 Promise 完成
- 用同步的写法实现异步操作

```javascript
async function example () {
  try {
    const result = await someAsyncOperation()
    return result
  } catch (error) {
    console.error(error)
  }
}
```

14. 生成器:

```javascript
function * generator () {
  yield 1
  yield 2
  return 3
}

const gen = generator()
console.log(gen.next()) // {value: 1, done: false}
console.log(gen.next()) // {value: 2, done: false}
console.log(gen.next()) // {value: 3, done: true}
```

15. TypeScript 中 type 和 interface 的区别:

- interface 可以声明合并，type 不行
- interface 只能声明对象类型，type 可以声明任意类型
- type 可以使用联合类型和交叉类型
- interface 可以 extends 和 implements

```typescript
// interface 合并
interface User {
  name: string;
}
interface User {
  age: number;
}

// type 联合类型
type Status = 'pending' | 'fulfilled' | 'rejected';
```

16. Vue 响应式原理及 Vue2/Vue3 区别:

**响应式定义**：

- 数据的变化自动触发相关联的更新操作
- 实现了数据与视图的同步

**Vue2 实现 (Object.defineProperty)**:
```javascript
Object.defineProperty(obj, 'key', {
  get () {
    // 依赖收集
    track()
    return value
  },
  set (newValue) {
    value = newValue
    // 触发更新
    trigger()
  }
})
```

**Vue3 实现 (Proxy)**:
```javascript
const proxy = new Proxy(target, {
  get (target, key) {
    // 依赖收集
    track(target, key)
    return target[key]
  },
  set (target, key, value) {
    target[key] = value
    // 触发更新
    trigger(target, key)
    return true
  }
})
```

**Vue2 局限性**:

- 无法检测对象属性的添加和删除
- 无法直接监听数组索引和长度变化
- 需要递归遍历对象的所有属性
- 需要使用 Vue.set 或 this.$set 添加响应式属性

**Vue3 优势**:

- 可以监听动态添加的属性
- 可以监听数组的索引和长度变化
- 支持 Map、Set、WeakMap、WeakSet
- 性能更好，不需要初始化时递归
- 更好的类型推导支持

**实际应用示例**:
```javascript
// Vue2 的局限
const vm = new Vue({
  data: {
    items: ['a', 'b']
  }
})
vm.items[0] = 'x' // 不会触发响应
vm.items.length = 1 // 不会触发响应

// Vue3 的优势
const proxy = reactive({
  items: ['a', 'b']
})
proxy.items[0] = 'x' // 可以触发响应
proxy.items.length = 1 // 可以触发响应
```
