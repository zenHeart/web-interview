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

## vue2 和 vue3 数组变化是如何处理的

数组拦截包括

1. vue3
   1. get、set 代理拦截存取
   2. apply 拦截方法
2. vue2
   1. get/set 拦截存取
   2. 重写原型拦截方法，**动态添加无法拦截**

## vue3 对虚拟 dom 做了哪些优化 {#p2-vue3-virtual-dom-optimization}

Vue 3 对虚拟 DOM 进行了多方面的优化，主要包括以下几点：

**一、静态提升（Static Hoisting）**

1. 原理与作用：

- 在 Vue 3 的编译阶段，会分析模板中的静态内容，将静态的节点提升到渲染函数之外。这意味着对于静态的元素和文本，不会在每次渲染时都重新创建虚拟 DOM 节点，而是在组件首次渲染时创建一次，然后在后续的渲染中直接复用。
- 例如，如果一个组件的模板中有一个静态的标题文本，在 Vue 2 中，每次渲染都会为这个文本创建一个新的虚拟 DOM 节点。而在 Vue 3 中，这个静态文本会被提升，只在组件首次渲染时创建虚拟 DOM 节点，后续渲染直接使用已创建的节点。

2. 性能提升：

- 减少了虚拟 DOM 的创建和比较开销，特别是在组件频繁渲染时，效果尤为明显。因为静态内容通常不会改变，避免了不必要的重复操作，提高了渲染性能。

**二、补丁算法优化**

1. 更高效的比较策略：

- Vue 3 改进了虚拟 DOM 的补丁算法，能够更快速地找到新旧虚拟 DOM 树之间的差异。新的算法在比较节点时更加智能，能够准确判断节点的类型和属性变化，只对真正发生变化的节点进行更新操作。
- 例如，当一个列表中的某个元素的文本内容发生变化时，Vue 3 能够快速定位到这个变化的节点，而不会像 Vue 2 那样对整个列表进行逐一比较。

2. 减少不必要的操作：

- 通过更精确的比较，Vue 3 避免了一些不必要的 DOM 操作。例如，如果一个元素的样式属性没有发生变化，Vue 3 不会触发样式的重新设置，从而减少了对浏览器渲染引擎的压力。

**三、事件处理优化**

1. 静态事件提升：

- 对于静态的事件监听器，Vue 3 也会在编译阶段进行提升。如果一个组件的模板中有一个静态的点击事件监听器，在 Vue 3 中，这个事件监听器会被提取出来，在组件首次渲染时进行绑定，后续渲染中不再重复绑定。
- 例如，一个按钮的点击事件在组件的整个生命周期中都不会改变，那么在 Vue 3 中，这个事件监听器只会在首次渲染时绑定一次，提高了性能。

2. 事件缓存：

- Vue 3 还对事件进行了缓存处理。当一个组件被销毁时，它的事件监听器不会立即被移除，而是被缓存起来。如果这个组件在后续的渲染中再次出现，Vue 3 可以直接复用缓存的事件监听器，而不需要重新绑定，进一步提高了性能。

**四、编译器优化**

1. 更好的代码生成：

- Vue 3 的编译器能够生成更高效的渲染函数代码。通过对模板的分析和优化，编译器可以生成更加简洁、高效的虚拟 DOM 创建和更新代码。
- 例如，编译器可以根据模板中的条件判断和循环结构，生成更加优化的虚拟 DOM 操作代码，减少不必要的计算和操作。

2. 类型推断：

- Vue 3 的编译器支持类型推断，这使得在开发过程中可以获得更好的类型提示和错误检查。同时，类型推断也可以帮助编译器生成更加高效的代码，因为编译器可以根据类型信息进行一些优化操作。
- 例如，如果一个组件的 props 定义了明确的类型，编译器可以在生成虚拟 DOM 代码时，针对这些类型进行优化，提高代码的执行效率。

## vue3 还是使用的虚拟 dom 吗？ {#p2-vue3-virtual-dom}

Vue 3 仍然使用虚拟 DOM（Virtual DOM）。

**一、虚拟 DOM 在 Vue 3 中的重要性**

1. 高效的 DOM 操作：虚拟 DOM 是一种在内存中表示真实 DOM 结构的树形数据结构。在 Vue 3 中，当数据发生变化时，首先会在虚拟 DOM 上进行比较和计算，确定最小化的 DOM 操作集合，然后再将这些操作应用到真实 DOM 上。这样可以避免直接频繁地操作真实 DOM，从而提高性能。

- 例如，当一个组件中的数据发生变化时，Vue 3 会先更新虚拟 DOM 树，然后通过对比新旧虚拟 DOM 树的差异，找出需要更新的真实 DOM 节点，最后只对这些节点进行实际的 DOM 操作。

2. 跨平台开发支持：虚拟 DOM 使得 Vue 3 不仅可以在浏览器中运行，还可以通过一些工具和技术进行跨平台开发。例如，使用 Vue Native 可以将 Vue 3 应用编译为原生移动应用，在移动平台上运行。这是因为虚拟 DOM 可以在不同的平台上进行渲染，而不需要依赖特定平台的 DOM 操作。

- 比如，在开发一个同时支持 Web 和移动平台的应用时，可以使用 Vue 3 的虚拟 DOM 来实现一套代码在多个平台上的运行，提高开发效率和代码复用性。

**二、Vue 3 对虚拟 DOM 的优化**

1. 静态提升（Static Hoisting）：Vue 3 在编译阶段会分析组件的模板，将静态的节点提升到渲染函数之外。这样在每次渲染时，不需要为静态节点创建新的虚拟 DOM 节点，从而减少了虚拟 DOM 的创建和比较开销。

- 例如，如果一个组件的模板中有一些静态的文本节点或元素，Vue 3 会在编译时将这些静态节点提取出来，在渲染时直接复用，而不是每次都重新创建虚拟 DOM 节点。

2. 补丁算法优化：Vue 3 对虚拟 DOM 的补丁算法进行了优化，使得在更新 DOM 时更加高效。新的补丁算法可以更快地找到需要更新的节点，减少不必要的比较和操作。

- 比如，在对比新旧虚拟 DOM 树时，Vue 3 可以更准确地判断节点的类型和属性变化，只对真正发生变化的节点进行更新，提高了渲染性能。

3. 事件处理优化：在 Vue 3 中，事件处理也进行了优化。对于静态的事件监听器，同样会在编译阶段进行提升，减少了每次渲染时的创建和绑定开销。

- 例如，如果一个组件中有一个静态的点击事件监听器，Vue 3 会在编译时将这个事件监听器提取出来，在渲染时直接复用，而不是每次都重新绑定。
