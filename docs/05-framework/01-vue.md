# vue

## 双向数据绑定原理

## 说一下Vue的双向绑定数据的原理

## ref 和 reactive 有何区别吗 {#p1-ref-reactive}

在 Vue 3 中，`ref` 和 `reactive` 是创建响应式数据的两种不同方法，它们都是 Vue 的响应式系统的一部分，但在使用方式和适用场景上有一些区别。下面是 `ref` 和 `reactive` 的主要区别：

 `ref`

* **用法**：`ref` 用于创建一个响应式的引用类型数据。当你需要使基本数据类型（例如：string, number, boolean）变得响应式时，`ref` 是一个很好的选择。
* **返回值**：`ref` 返回一个包含 `value` 属性的对象。你需要通过 `.value` 属性来访问或修改其内部值。
* **适用场景**：适用于基本数据类型，也可以用于对象和数组，但主要是为了基本数据类型设计的。

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 访问值
count.value++ // 修改值
```

 `reactive`

* **用法**：`reactive` 用于创建一个响应式的复杂类型数据，如对象或数组。
* **返回值**：直接返回原始对象的响应式代理，不需要通过 `.value` 属性来访问或修改。
* **适用场景**：是为了使对象或数组这样的引用数据类型变得响应式而设计的。

```javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })
console.log(state.count) // 访问值
state.count++ // 修改值
```

 主要区别

1. **数据类型**：`ref` 主要用于基本数据类型，但也可以用于对象和数组；`reactive` 适用于对象或数组等引用数据类型。
2. **返回值**：`ref` 返回一个对象，这个对象包含一个 `value` 属性，这意味着你需要通过 `.value` 来获取或设置值；而 `reactive` 返回的是对象或数组的响应式代理，可以直接操作。
3. **模板中使用**：在模板中使用时，`ref` 创建的响应式数据访问时不需要 `.value`，Vue 模板会自动解包；`reactive` 对象在模板中的行为与普通对象相同。

 使用建议

* 当你处理基本数据类型时，使用 `ref`；
* 当你需要管理一个复杂的数据结构（如对象或数组），使用 `reactive` 以保持代码的简洁和直观。

在 Vue 3 的响应式系统中，处理深层嵌套的数据时，`ref` 和 `reactive` 在行为上有一些细微但重要的区别，特别是当涉及到对象、数组以及 JavaScript 内置的数据结构（如 Map 和 Set）时。这些区别主要体现在如何使嵌套的数据成为响应式的，以及如何维护这些响应性。

 处理深层嵌套的数据

无论是使用 `ref` 还是 `reactive`，Vue 会尝试使给定的数据结构及其嵌套的所有子结构变成响应式的。但是，具体的实现机制有所不同。

 `reactive`

* `reactive` 对象默认深度响应式。当你使用 `reactive` 使一个对象变成响应式时，这个对象的所有嵌套对象和数组也会自动变成响应式的。这意味着你可以在任意深度的嵌套数据上进行修改，并且这些修改将会触发视图更新。
* 对于 JavaScript 的内置数据结构，如 Map 和 Set，Vue 3 也提供了响应式支持，但它们必须通过 `reactive` 方法来创建或转换为响应式的。

```javascript
const state = reactive({
  nested: {
    count: 0
  },
  numbers: [1, 2, 3],
  map: new Map()
})

state.nested.count++ // 触发视图更新
state.numbers.push(4) // 触发视图更新
state.map.set('key', 'value') // 触发视图更新
```

 `ref`

* 使用 `ref` 创建响应式数据时，如果 `ref` 被赋值为一个对象或数组，Vue 会将该对象或数组内部转换为深度响应式。然而，这种转换仅发生在赋值操作时，如果后续对该对象或数组进行再嵌套，新增的嵌套不会自动转换为响应式。
* 对于内置数据结构如 Map 和 Set，`ref` 可以存储它们，但不会使它们或其内容变成响应式的。如果你需要在模板中直接绑定这些数据结构的响应式变化，使用 `reactive` 会是更好的选择。

```javascript
const nestedObj = ref({
  nested: {
    count: 0
  }
})

nestedObj.value.nested.count++ // 触发视图更新

const map = ref(new Map())
map.value.set('key', 'value') // 不会触发视图更新，除非重新赋值给 map.value
```

总结

当处理深层嵌套的对象、数组或内置数据结构时：

* `reactive` 默认提供深度响应式，并且可以使 Map、Set 等内置数据结构变为响应式。
* `ref` 在赋值对象或数组时自动将其转换为响应式，但不适用于 Map 或 Set 等内置数据结构的深度响应。

一般情况下，对于复杂或深层嵌套的数据结构，`reactive` 更加适合。对于基本数据类型或不太复杂的嵌套数据，`ref` 可以提供方便的响应式转换。

## 生命周期 {#p0-lifecycle}

最基础生命周期直接可以看下面这个图， 如果只能回答下面这个图里面的生命周期， 那么该问题只能是「中等」级别； 之所以是 「高等」级别的问题， 因为还有很多别的生命周期， 大家不一定知道， 但是也很重要；

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/135d7bede61b4423961c2dfb208f44a7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pm05bCP56-G:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDEyNTAyMzM1Nzg5OTM2NyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726649822&x-orig-sign=7AZx17uuMqrw4eKTe%2BJoj%2FHSI4c%3D)

 Vue3 新增的生命周期

* `onErrorCaptured()`
* `onRenderTracked()`
* `onRenderTriggered()`
* `onActivated()`
* `onDeactivated()`
* `onServerPrefetch()`

Vue 3 引入了组合式 API，随之而来的是一系列新的生命周期钩子，这些钩子提供了更细粒度的控制方式，尤其是在使用 `setup()` 函数时非常有用。下面简单解释一下你提到的这几个新的生命周期钩子：

**onErrorCaptured()**

* **作用**：捕获组件及其子组件树中发生的错误。它提供了一个句柄来处理错误，并防止错误继续冒泡。
* **使用场景**：当你需要在组件树中某个层级捕获并处理错误时使用，特别适用于构建错误边界。

**onRenderTracked()**

* **作用**：每当一个响应式依赖被访问时调用，允许开发者跟踪渲染过程中依赖的访问。
* **使用场景**：用于调试目的，帮助开发者理解组件如何响应数据变化，以及哪些依赖触发了组件的重新渲染。

**onRenderTriggered()**

* **作用**：每当响应式依赖的变化导致组件重新渲染时调用。
* **使用场景**：同样用于调试目的，让开发者知道是哪个具体的依赖变化导致了组件的更新。

**onActivated() 和 onDeactivated()**

* **作用**：这两个钩子分别在 `<keep-alive>` 缓存的组件激活和停用时被调用。
* **使用场景**：在使用 `<keep-alive>` 时非常有用，可以用来执行如清理或设置相关资源的操作。

**onServerPrefetch()**

* **作用**：允许组件在服务器端渲染（SSR）期间进行数据预取。
* **使用场景**：用于服务器端渲染的 Vue 应用中，可以在组件级别添加数据预取逻辑，提高首屏加载性能和 SEO 优化。

这些新的生命周期钩子为 Vue 应用提供了更多的灵活性和控制力，允许开发者编写更高效、更可靠的代码。特别是在构建大型应用或需要精细管理资源和错误处理的情况下非常有用。

## virtual dom

## 解释单向数据流和双向数据绑定

## vuex 原理

## hash 模式和历史模式区别

## MVC 和 MVVM

## VUE 生命周期

## 组件通信策略和方法

## v-if 和 v-show 差别

## Vue2 与 Vue3 的主要区别

* 响应式系统: Vue3 使用 Proxy 替代了 Vue2 的 Object.defineProperty，提供了更好的性能和数组监听
* Composition API: Vue3 引入组合式 API，更好地支持代码复用和逻辑组织
* 性能提升: Vue3 通过静态标记、TreeShaking 等优化提升了性能
* TypeScript 支持: Vue3 使用 TypeScript 重写，提供更好的类型支持
* Fragment: Vue3 支持多根节点组件

## key 的作用

* 用于 Vue 的虚拟 DOM diff 算法，帮助 Vue 准确找到对应的节点，高效地更新虚拟 DOM
* 避免"就地复用"带来的副作用，特别是在列表渲染时
* 触发组件的重新渲染

## computed 和 watch 的区别

下面是一个表格，对比了 Vue 3 中的 `computed` 计算属性和普通函数方法的主要差异：

| 特性 | 计算属性 (`computed`) | 普通函数方法 (`methods`) |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------ |
| **缓存** | 是。只有当依赖数据变化时，才会重新计算。 | 否。每次调用都会执行函数逻辑。 |
| **性能** | 高。避免了不必要的计算，只在依赖变化时重新计算。 | 较低。不区分是否有数据更新，都会执行。 |
| **触发更新** | 依赖数据变化时自动更新。 | 需要手动触发或组件重新渲染时才更新。 |
| **使用场景** | 当数据变化需要进行复杂运算时，且结果要被多次引用。 | 每次都需执行新逻辑或操作不依赖响应式数据时。 |
| **访问方式** | 如访问属性一样，不需要加括号。 | 在模板中调用时需要加括号。 |
| **返回值** | 调用时返回计算后的结果，不需要执行任何函数。 | 必须执行函数以获取结果。 |
| **更新性能** | 只在依赖变化时重新求值，如果依赖未变化则返回上次的结果。 | 在每次访问或调用时无条件执行，不考虑依赖数据是否变化。 |

通过对比，我们可以看到两者在 Vue 应用中各自的优势和应用场景。`computed` 适合用于基于数据变化需要重新计算的场景，特别是当这些计算比较昂贵，或者计算结果会被多处使用时。而普通函数方法更适合用于执行不依赖响应式数据的操作，或者当操作每次都需要产生不同结果时。正确地选择使用计算属性还是普通方法，可以优化你的 Vue 应用的性能和可维护性。

* computed 是计算属性，有缓存，依赖变化才会重新计算
* watch 是监听器，用于响应数据变化执行回调
* computed 适合多个数据影响一个数据的场景

```javascript
// computed 示例：计算总价
computed: {
total() {
  return this.price * this.quantity
}
}
```

* watch 适合一个数据变化影响多个数据的场景

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

1. scoped style 原理:

* 通过给组件添加唯一的属性标识符(data-v-hash)
* 编译时给 css 选择器添加对应的属性选择器
* 确保样式只作用于当前组件

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

* 都是用来改变函数的 this 指向
* call 接受参数列表
* apply 接受参数数组

```javascript
fn.call(obj, arg1, arg2)
fn.apply(obj, [arg1, arg2])
```

9. this 指向:

* 普通函数中，this 指向调用者
* 箭头函数中，this 指向定义时的上下文
* call/apply/bind 可以改变 this 指向
* 构造函数中，this 指向新创建的实例

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

* 宏任务: setTimeout, setInterval, requestAnimationFrame
* 微任务: Promise, MutationObserver, process.nextTick
* 执行顺序: 同步代码 -> 微任务队列 -> 宏任务队列

13. async/await:

* async 函数返回 Promise
* await 等待 Promise 完成
* 用同步的写法实现异步操作

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

* interface 可以声明合并，type 不行
* interface 只能声明对象类型，type 可以声明任意类型
* type 可以使用联合类型和交叉类型
* interface 可以 extends 和 implements

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

* 数据的变化自动触发相关联的更新操作
* 实现了数据与视图的同步

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

* 无法检测对象属性的添加和删除
* 无法直接监听数组索引和长度变化
* 需要递归遍历对象的所有属性
* 需要使用 Vue.set 或 this.$set 添加响应式属性

**Vue3 优势**:

* 可以监听动态添加的属性
* 可以监听数组的索引和长度变化
* 支持 Map、Set、WeakMap、WeakSet
* 性能更好，不需要初始化时递归
* 更好的类型推导支持

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

* 在 Vue 3 的编译阶段，会分析模板中的静态内容，将静态的节点提升到渲染函数之外。这意味着对于静态的元素和文本，不会在每次渲染时都重新创建虚拟 DOM 节点，而是在组件首次渲染时创建一次，然后在后续的渲染中直接复用。
* 例如，如果一个组件的模板中有一个静态的标题文本，在 Vue 2 中，每次渲染都会为这个文本创建一个新的虚拟 DOM 节点。而在 Vue 3 中，这个静态文本会被提升，只在组件首次渲染时创建虚拟 DOM 节点，后续渲染直接使用已创建的节点。

2. 性能提升：

* 减少了虚拟 DOM 的创建和比较开销，特别是在组件频繁渲染时，效果尤为明显。因为静态内容通常不会改变，避免了不必要的重复操作，提高了渲染性能。

**二、补丁算法优化**

1. 更高效的比较策略：

* Vue 3 改进了虚拟 DOM 的补丁算法，能够更快速地找到新旧虚拟 DOM 树之间的差异。新的算法在比较节点时更加智能，能够准确判断节点的类型和属性变化，只对真正发生变化的节点进行更新操作。
* 例如，当一个列表中的某个元素的文本内容发生变化时，Vue 3 能够快速定位到这个变化的节点，而不会像 Vue 2 那样对整个列表进行逐一比较。

2. 减少不必要的操作：

* 通过更精确的比较，Vue 3 避免了一些不必要的 DOM 操作。例如，如果一个元素的样式属性没有发生变化，Vue 3 不会触发样式的重新设置，从而减少了对浏览器渲染引擎的压力。

**三、事件处理优化**

1. 静态事件提升：

* 对于静态的事件监听器，Vue 3 也会在编译阶段进行提升。如果一个组件的模板中有一个静态的点击事件监听器，在 Vue 3 中，这个事件监听器会被提取出来，在组件首次渲染时进行绑定，后续渲染中不再重复绑定。
* 例如，一个按钮的点击事件在组件的整个生命周期中都不会改变，那么在 Vue 3 中，这个事件监听器只会在首次渲染时绑定一次，提高了性能。

2. 事件缓存：

* Vue 3 还对事件进行了缓存处理。当一个组件被销毁时，它的事件监听器不会立即被移除，而是被缓存起来。如果这个组件在后续的渲染中再次出现，Vue 3 可以直接复用缓存的事件监听器，而不需要重新绑定，进一步提高了性能。

**四、编译器优化**

1. 更好的代码生成：

* Vue 3 的编译器能够生成更高效的渲染函数代码。通过对模板的分析和优化，编译器可以生成更加简洁、高效的虚拟 DOM 创建和更新代码。
* 例如，编译器可以根据模板中的条件判断和循环结构，生成更加优化的虚拟 DOM 操作代码，减少不必要的计算和操作。

2. 类型推断：

* Vue 3 的编译器支持类型推断，这使得在开发过程中可以获得更好的类型提示和错误检查。同时，类型推断也可以帮助编译器生成更加高效的代码，因为编译器可以根据类型信息进行一些优化操作。
* 例如，如果一个组件的 props 定义了明确的类型，编译器可以在生成虚拟 DOM 代码时，针对这些类型进行优化，提高代码的执行效率。

## vue3 还是使用的虚拟 dom 吗？ {#p2-vue3-virtual-dom}

Vue 3 仍然使用虚拟 DOM（Virtual DOM）。

**一、虚拟 DOM 在 Vue 3 中的重要性**

1. 高效的 DOM 操作：虚拟 DOM 是一种在内存中表示真实 DOM 结构的树形数据结构。在 Vue 3 中，当数据发生变化时，首先会在虚拟 DOM 上进行比较和计算，确定最小化的 DOM 操作集合，然后再将这些操作应用到真实 DOM 上。这样可以避免直接频繁地操作真实 DOM，从而提高性能。

* 例如，当一个组件中的数据发生变化时，Vue 3 会先更新虚拟 DOM 树，然后通过对比新旧虚拟 DOM 树的差异，找出需要更新的真实 DOM 节点，最后只对这些节点进行实际的 DOM 操作。

2. 跨平台开发支持：虚拟 DOM 使得 Vue 3 不仅可以在浏览器中运行，还可以通过一些工具和技术进行跨平台开发。例如，使用 Vue Native 可以将 Vue 3 应用编译为原生移动应用，在移动平台上运行。这是因为虚拟 DOM 可以在不同的平台上进行渲染，而不需要依赖特定平台的 DOM 操作。

* 比如，在开发一个同时支持 Web 和移动平台的应用时，可以使用 Vue 3 的虚拟 DOM 来实现一套代码在多个平台上的运行，提高开发效率和代码复用性。

**二、Vue 3 对虚拟 DOM 的优化**

1. 静态提升（Static Hoisting）：Vue 3 在编译阶段会分析组件的模板，将静态的节点提升到渲染函数之外。这样在每次渲染时，不需要为静态节点创建新的虚拟 DOM 节点，从而减少了虚拟 DOM 的创建和比较开销。

* 例如，如果一个组件的模板中有一些静态的文本节点或元素，Vue 3 会在编译时将这些静态节点提取出来，在渲染时直接复用，而不是每次都重新创建虚拟 DOM 节点。

2. 补丁算法优化：Vue 3 对虚拟 DOM 的补丁算法进行了优化，使得在更新 DOM 时更加高效。新的补丁算法可以更快地找到需要更新的节点，减少不必要的比较和操作。

* 比如，在对比新旧虚拟 DOM 树时，Vue 3 可以更准确地判断节点的类型和属性变化，只对真正发生变化的节点进行更新，提高了渲染性能。

3. 事件处理优化：在 Vue 3 中，事件处理也进行了优化。对于静态的事件监听器，同样会在编译阶段进行提升，减少了每次渲染时的创建和绑定开销。

* 例如，如果一个组件中有一个静态的点击事件监听器，Vue 3 会在编译时将这个事件监听器提取出来，在渲染时直接复用，而不是每次都重新绑定。

## nextTick 作用是什么， 原理是什么 {#p2-vue-next-tick}

在 Vue 中，`nextTick`主要有以下作用和工作原理：

**一、作用**

1. 确保 DOM 更新后执行操作：

* Vue 是异步更新 DOM 的。当你在代码中修改了数据，Vue 不会立即更新 DOM，而是将这些更新操作放入一个队列中，等待下一个“tick”（事件循环的一个周期）再统一进行 DOM 更新。
* 如果在数据变化后，你需要立即操作更新后的 DOM，就可以使用`nextTick`。它会在 DOM 更新完成后执行回调函数，确保你能获取到最新的 DOM 状态。
* 例如，你在修改了一个数据后，想要获取某个元素的新尺寸或位置，就可以在`nextTick`的回调函数中进行操作。

2. 处理异步操作后的 DOM 操作：

* 在一些异步操作（如定时器、Ajax 请求等）之后，如果需要操作 DOM，也可以使用`nextTick`来确保 DOM 已经更新。
* 比如，在一个 Ajax 请求成功后，你想要根据返回的数据更新 DOM，这时可以在请求成功的回调函数中使用`nextTick`来确保 DOM 更新已经完成。

**二、原理**

1. 利用事件循环：

* Vue 的`nextTick`实现利用了 JavaScript 的事件循环机制。在浏览器环境中，JavaScript 是单线程执行的，事件循环负责管理异步任务的执行顺序。
* Vue 将`nextTick`的回调函数放入微任务队列（在 Promise.then、MutationObserver 和 process.nextTick 中执行）或宏任务队列（在 setTimeout、setInterval 和 setImmediate 中执行），具体取决于浏览器的支持情况。
* 当当前执行栈为空时，事件循环会从任务队列中取出任务执行。如果微任务队列中有任务，会先执行微任务队列中的任务，然后再执行宏任务队列中的任务。这样可以确保`nextTick`的回调函数在 DOM 更新之后执行。

2. 内部实现：

* Vue 内部维护了一个异步任务队列，用于存储`nextTick`的回调函数。当调用`nextTick`时，回调函数会被添加到这个队列中。
* Vue 在更新 DOM 后，会检查这个异步任务队列是否为空。如果不为空，会取出队列中的第一个任务并执行它。
* 这样就保证了在 DOM 更新完成后，`nextTick`的回调函数能够按照调用的顺序依次执行。

例如：

```html
<!DOCTYPE html>
<html>
<head>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
<div id="app">
<p>{{ message }}</p>
<button @click="updateMessage">Update Message</button>
</div>

<script>
const app = Vue.createApp({
data() {
return {
message: "Hello Vue!",
};
},
methods: {
updateMessage() {
this.message = "Updated Message";
console.log("Before nextTick");
Vue.nextTick(() => {
console.log("After DOM update");
const pElement = document.querySelector("p");
console.log(pElement.textContent);
});
},
},
});

app.mount("#app");
</script>
</body>
</html>
```

在这个例子中，点击按钮后，数据被更新，但立即获取`<p>`元素的文本内容时，还是旧的值。而在`nextTick`的回调函数中获取`<p>`元素的文本内容时，就已经是更新后的新值了。

综上所述，`nextTick`在 Vue 中是一个非常有用的工具，用于确保在 DOM 更新后执行特定的操作，其原理是利用 JavaScript 的事件循环机制来实现异步任务的调度。

## vuex 和 Pinia 有什么区别 {#p3-vuex-pinia}

Vuex 和 Pinia 都是用于 Vue 应用程序的状态管理库，它们有一些相似之处，但也存在一些差异。以下是它们的对比：

**一、相似之处**

1. **集中式状态管理**：

* 两者都提供了一种集中式的方式来管理应用程序的状态。这使得状态可以在不同的组件之间共享，并且可以更容易地跟踪和调试状态的变化。
* 例如，在一个电商应用中，用户的购物车状态可以存储在状态管理库中，以便在不同的页面和组件中访问和更新。

2. **响应式状态**：

* Vuex 和 Pinia 都与 Vue 的响应式系统集成，使得状态的变化可以自动触发相关组件的重新渲染。
* 当购物车中的商品数量发生变化时，相关的组件可以自动更新以反映这个变化。

**二、不同之处**

1. **语法和 API**：

* **Pinia**：

* Pinia 提供了一种更加简洁和直观的 API。它使用类似于 Vue 组件的语法来定义状态和操作，使得代码更加易读和易于维护。
* 例如，定义一个 store 可以像这样：

```javascript
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem (item) {
      this.items.push(item)
    }
  }
})
```

* **Vuex**：

* Vuex 的语法相对较为复杂，需要定义 mutations、actions 和 getters 等不同的概念来管理状态。
* 例如，定义一个 store 可能如下所示：

```javascript
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    ADD_ITEM (state, item) {
      state.items.push(item)
    }
  },
  actions: {
    addItem ({ commit }, item) {
      commit('ADD_ITEM', item)
    }
  },
  getters: {
    cartItems: (state) => state.items
  }
})
```

2. **模块系统**：

* **Pinia**：

* Pinia 的模块系统更加灵活和易于使用。可以轻松地将 store 拆分为多个模块，并且可以在不同的模块之间共享状态和操作。
* 例如，可以创建一个名为`user`的模块和一个名为`cart`的模块，并在它们之间共享一些状态和操作：

```javascript
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
// ...
})

const useCartStore = defineStore('cart', {
  state: () => ({
    // ...
  }),
  actions: {
    addItem (item) {
      // 可以访问 userStore 的状态
      if (useUserStore().isLoggedIn) {
        // ...
      }
    }
  }
})
```

* **Vuex**：
* Vuex 的模块系统也很强大，但相对来说更加复杂。需要使用命名空间来区分不同模块的 actions、mutations 和 getters，并且在模块之间共享状态和操作需要一些额外的配置。

3. **类型支持**：

* **Pinia**：

* Pinia 对 TypeScript 的支持非常好，可以轻松地为 store 定义类型，并且在开发过程中可以获得更好的类型提示和错误检查。
* 例如，可以使用 TypeScript 来定义一个 store 的类型：

```javascript
import { defineStore } from 'pinia';

interface CartItem {
id: number;
name: string;
price: number;
}

export const useCartStore = defineStore('cart', {
state: () => ({
items: [] as CartItem[],
}),
//...
});
```

* **Vuex**：
* Vuex 也支持 TypeScript，但相对来说需要一些额外的配置和类型定义文件来获得更好的类型支持。

4. **开发体验**：

* **Pinia**：
* Pinia 提供了一些开发工具，如 Pinia Devtools，可以方便地调试和检查 store 的状态和操作。它还与 Vue Devtools 集成，使得在开发过程中可以更好地跟踪状态的变化。
* Pinia 的 API 更加简洁，使得开发过程更加高效和愉快。
* **Vuex**：
* Vuex 也有一些开发工具，如 Vuex Devtools，但相对来说功能可能没有 Pinia Devtools 那么强大。
* Vuex 的语法相对较为复杂，可能需要一些时间来适应和掌握。

总的来说，Pinia 和 Vuex 都是强大的状态管理库，选择哪一个取决于你的具体需求和个人偏好。如果你喜欢简洁和直观的 API，并且对 TypeScript 有较好的支持需求，那么 Pinia 可能是一个更好的选择。如果你已经熟悉 Vuex 并且对其功能和模块系统有特定的需求，那么 Vuex 也是一个可靠的选择。

## 介绍一下 component 动态组件 {#p4-component-dynamic-component}

在 Vue 中，动态组件是一种强大的特性，可以根据不同的条件在运行时动态地切换组件的显示。

**一、基本概念**

动态组件使用特殊的`<component>`标签结合`is`属性来实现。`is`属性可以接受一个字符串或变量，用于指定要渲染的组件名称或组件选项对象。Vue 会根据`is`属性的值来动态地加载和渲染相应的组件。

**二、使用方法**

1. **使用字符串指定组件名称**：

* 可以直接在`is`属性中使用字符串来指定组件的名称。例如：

```html
<template>
<div>
<component :is="currentComponent"></component>
</div>
</template>
<script setup>
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";
let currentComponent = "ComponentA";
</script>
```

* 在这个例子中，根据`currentComponent`变量的值，`<component>`标签会动态地渲染`ComponentA`或`ComponentB`组件。

2. **使用变量指定组件选项对象**：

* 也可以使用变量来指定一个组件选项对象。例如：

```html
<template>
<div>
<component :is="currentComponent"></component>
</div>
</template>
<script setup>
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";
let currentComponent = ComponentA;
</script>
```

* 这里，`currentComponent`变量可以在运行时被赋值为`ComponentA`或`ComponentB`的组件选项对象，从而实现动态切换组件。

3. **结合`v-if`或`v-show`控制组件显示**：

* 可以结合`v-if`或`v-show`指令来控制动态组件的显示条件。例如：

```html
<template>
<div>
<component :is="currentComponent" v-if="showComponent"></component>
</div>
</template>
<script setup>
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";
let currentComponent = "ComponentA";
let showComponent = true;
</script>
```

* 在这个例子中，只有当`showComponent`为`true`时，动态组件才会被渲染。

**三、优势和应用场景**

1. **优势**：

* **灵活性**：可以根据不同的业务逻辑和用户交互动态地切换组件，提高应用的灵活性和可维护性。
* **代码复用**：可以在多个地方使用相同的动态组件机制，减少重复代码。
* **性能优化**：只在需要的时候加载和渲染特定的组件，可以提高应用的性能。

2. **应用场景**：

* **页面布局切换**：根据用户的操作或应用的状态，动态地切换不同的页面布局组件。例如，在一个管理系统中，根据用户的角色显示不同的菜单栏和功能区域。
* **内容展示切换**：根据数据的类型或状态，动态地展示不同的内容组件。例如，在一个新闻应用中，根据新闻的类型显示不同的新闻详情组件。
* **步骤向导**：在一个多步骤的向导流程中，使用动态组件来逐步展示不同的步骤组件。用户可以根据向导的进度动态地切换到不同的步骤，提高用户体验。

## 详细介绍一下 teleport 内置组件 {#p2-teleport-built-in-component}

在 Vue 中，`<teleport>`是一个内置组件，它提供了一种将组件的模板内容渲染到指定 DOM 节点位置的方式，而不是在组件自身的位置渲染。

**一、作用与优势**

1. 灵活布局：允许你将特定的组件内容放置在页面的任何位置，而不受组件层次结构的限制。这对于创建模态框、通知、工具提示等需要在特定位置显示的元素非常有用。
2. 分离关注点：可以将与特定功能相关的模板内容从组件的逻辑中分离出来，并将其渲染到合适的位置。这样可以使组件的代码更加清晰和易于维护。
3. 性能优化：在某些情况下，将某些内容渲染到远离其他组件的位置可以减少不必要的重绘和回流，提高性能。

**二、使用方法**

1. 基本用法：

```vue
<template>
<div>
<teleport to="body">
<div class="modal">This is a modal content.</div>
</teleport>
</div>
</template>

<style>
.modal {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: white;
padding: 20px;
border: 1px solid #ccc;
}
</style>
```

在这个例子中，`<teleport>`组件将包含模态框内容的`<div>`渲染到了`<body>`元素中，使其在页面上居中显示。

2. 指定目标选择器：
可以使用任何有效的 CSS 选择器作为`to`属性的值来指定目标位置。例如：

```vue
<template>
<div>
<teleport to="#my-target-element">
<div class="notification">This is a notification.</div>
</teleport>
</div>
</template>
```

这里将通知内容渲染到具有`id`为`my-target-element`的元素中。

3. 动态目标：
可以使用响应式数据来动态地确定`<teleport>`的目标位置。例如：

```vue
<template>
<div>
<input v-model="targetElementId" />
<teleport :to="targetElementId">
<div class="dynamic-content">This content will be teleported to the specified element.</div>
</teleport>
</div>
</template>

<script setup>
import { ref } from "vue";

const targetElementId = ref("body");
</script>
```

在这个例子中，用户可以通过输入框输入目标元素的`id`，从而动态地确定`<teleport>`的目标位置。

**三、注意事项**

1. 事件冒泡：当在`<teleport>`内部的元素上触发事件时，事件会按照正常的 DOM 事件冒泡机制传播到目标位置的父元素中。如果需要处理这些事件，确保在目标位置的父元素中正确地监听和处理这些事件。
2. 样式隔离：如果`<teleport>`内部的内容需要特定的样式，确保这些样式不会影响到目标位置的其他元素。可以使用 CSS 模块化、命名空间或特定的选择器来确保样式的隔离。
3. 响应式数据：如果在`<teleport>`内部使用了响应式数据，确保这些数据在目标位置的上下文中也能正确地更新。可以使用 Vue 的响应式系统来确保数据的一致性。

## 实现一个简单的 i18n (国际化 (Internationalization) 的缩写) 插件 {#p3-implement-a-simple-i18n-internationalization-plugin}

实现下面的这样的一个插件 `<h1>{{ $translate('greetings.hello') }}</h1>`

以下是一个简单的 Vue 3 的国际化插件实现：

1. 创建一个名为`i18nPlugin.js`的文件：

```javascript
const i18nPlugin = {
install (app, options) {
  const translations = options.translations
  app.config.globalProperties.$translate = (key) => {
    const parts = key.split('.')
    let value = translations[parts[0]]
    for (let i = 1; i < parts.length && value; i++) {
      value = value[parts[i]]
    }
    return value || key
  }
}
}

export default i18nPlugin
```

2. 在你的 Vue 3 项目中使用这个插件：

假设你有以下的语言翻译对象：

```javascript
// en.js
const enTranslations = {
greetings: {
hello: 'Hello!',
},
};

export default enTranslations;

// zh.js
const zhTranslations = {
greetings: {
hello: '你好！',
},
};

export default zhTranslations;
```

在项目的入口文件（通常是`main.js`或`main.ts`）中：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import enTranslations from './locales/en'
import i18nPlugin from './i18nPlugin'

const app = createApp(App)

app.use(i18nPlugin, { translations: enTranslations })

app.mount('#app')
```

这样，在你的组件中就可以使用`{{ $translate('greetings.hello') }}`来获取翻译后的文本，并且可以通过修改传入插件的翻译对象来切换不同的语言。

## 插件是什么概念，有什么作用，该怎么用 {#p4-what-is-the-plugin-what-is-its-purpose-and-how-to-use-it}

在 Vue 中，插件是一种用于增强 Vue 功能的工具。

**一、概念**

Vue 插件是一个包含`install`方法的对象，或者是一个函数，这个函数接收 Vue 的构造函数作为参数。插件可以为 Vue 添加全局的功能，如全局组件、全局指令、全局过滤器、全局混入（mixin）等，也可以扩展 Vue 的实例方法或原型属性。

**二、作用**

1. **添加全局功能**：

* **全局组件**：可以通过插件注册全局组件，使得在整个项目的任何组件中都可以直接使用这个组件，无需在每个组件中单独引入。例如，一个弹窗组件可以作为插件注册为全局组件，方便在项目中的各个地方弹出统一风格的弹窗。
* **全局指令**：插件可以添加全局指令，用于在模板中对元素进行特定的操作。比如，一个`v-focus`指令可以在元素挂载时自动聚焦该元素，提高用户体验。
* **全局过滤器**：用于对数据进行格式化处理。例如，一个全局过滤器可以将日期格式化为特定的字符串格式，方便在模板中显示日期数据。
* **全局混入**：可以在多个组件之间共享一些通用的选项或方法。例如，一个全局混入可以为多个组件添加相同的生命周期钩子函数或方法，减少重复代码。

2. **扩展 Vue 实例**：

* 插件可以向 Vue 实例添加新的方法或属性，使得在项目中的任何地方都可以通过`this`访问这些方法或属性。例如，一个插件可以添加一个`$http`方法，用于发送 HTTP 请求，方便在组件中进行数据获取。

3. **集成第三方库**：

* 可以将第三方库包装成 Vue 插件，使其与 Vue 更好地集成。例如，将 Vue Router（路由库）和 Vuex（状态管理库）作为插件使用，方便在 Vue 项目中进行路由管理和状态管理。

**三、使用方法**

1. **创建插件**：

* 插件可以是一个对象，包含`install`方法：

```javascript
const myPlugin = {
install (Vue) {
  // 在这里添加全局功能或扩展 Vue 实例
  Vue.prototype.$myMethod = function () {
    console.log('This is a custom method added by the plugin.')
  }
}
}
```

* 也可以是一个函数，接收 Vue 构造函数作为参数：

```javascript
function myPlugin (Vue) {
Vue.prototype.$myMethod = function () {
  console.log('This is a custom method added by the plugin.')
}
}
```

2. **使用插件**：

* 在 Vue 项目中，可以通过`Vue.use()`方法来使用插件。通常在项目的入口文件（如`main.js`）中进行插件的安装。

```javascript
import Vue from 'vue'
import App from './App.vue'
// 引入插件
import myPlugin from './myPlugin'

Vue.use(myPlugin)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
```

3. **在组件中使用插件提供的功能**：

* 在组件的方法、生命周期钩子函数或模板中，可以通过`this.$myMethod()`来调用插件添加的方法。

```html
<template>
<div @click="callPluginMethod">Click me</div>
</template>
<script>
export default {
methods: {
callPluginMethod() {
this.$myMethod();
},
},
};
</script>
```

通过使用插件，可以将一些通用的功能封装起来，提高代码的可维护性和可复用性，同时也方便在项目中进行功能的扩展和集成第三方库。

## vue 如何配置全局使用的定义或者常量 {#p3-how-to-configure-global-definitions-or-constants-in-vue}

在 Vue 中，可以通过以下几种方式配置全局使用的定义或常量：

**一、使用 Vue 原型（不推荐在 Vue 3 中使用）**

在 Vue 2 中，可以通过在`main.js`文件中向 Vue 的原型上添加属性来实现全局定义或常量的访问。但在 Vue 3 中不推荐这种方式，因为它可能会导致一些潜在的问题。

```javascript
// Vue 2 示例
Vue.prototype.$globalConstant = 'This is a global constant'
```

**二、使用 provide/inject（推荐）**

1. 在根组件中提供全局定义或常量：

```javascript
import { createApp } from 'vue'

const app = createApp({
  setup () {
    return {
      globalValue: 'Global value'
    }
  },
  provide () {
    return {
      global: this.globalValue
    }
  }
})

app.mount('#app')
```

2. 在子组件中注入并使用：

```vue
<script setup>
import { inject } from "vue";

const global = inject("global");
</script>

<template>
<div>{{ global }}</div>
</template>
```

**三、创建全局变量文件并导入**

1. 创建一个专门的文件用于存储全局定义或常量，例如`globals.js`：

```javascript
export const globalConstant = 'This is a global constant'
```

2. 在需要使用的地方导入：

```javascript
import { globalConstant } from './globals.js'
```

**四、使用 Vuex（状态管理）**

如果你的全局定义或常量需要在多个组件之间共享并且可能会发生变化，可以考虑使用 Vuex 进行状态管理。

1. 安装和设置 Vuex：

```bash
npm install vuex@next
```

创建一个`store.js`文件：

```javascript
import { createStore } from 'vuex'

const store = createStore({
  state: {
    globalValue: 'Global value from Vuex'
  },
  mutations: {},
  actions: {},
  modules: {}
})

export default store
```

2. 在`main.js`中引入并挂载 Vuex：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
app.mount('#app')
```

3. 在组件中使用：

```vue
<script setup>
import { useStore } from "vuex";

const store = useStore();
</script>

<template>
<div>{{ store.state.globalValue }}</div>
</template>
```

## 如何自定义指令 {#p2-how-to-customize-directives}

在 Vue 中，可以通过以下步骤来自定义指令：

**一、全局自定义指令**

1. 使用`Vue.directive()`方法定义全局指令：

```javascript
Vue.directive('my-directive', {
// 指令的定义对象
  bind (el, binding, vnode) {
    // 在元素绑定指令时调用
    // el 是指令所绑定的元素
    // binding 包含指令的信息，如 value、arg、modifiers 等
    // vnode 是虚拟节点
  },
  inserted (el, binding, vnode) {
    // 被绑定元素插入父节点时调用
  },
  update (el, binding, vnode, oldVnode) {
    // 当组件更新时调用，包括数据更新和组件本身的更新
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    // 组件及其子组件的 VNode 更新后调用
  },
  unbind (el, binding, vnode) {
    // 指令与元素解绑时调用
  }
})
```

2. 在模板中使用自定义指令：

```html
<div v-my-directive="someValue"></div>
```

**二、局部自定义指令**

1. 在组件中定义局部指令：

```javascript
export default {
  directives: {
    'my-directive': {
      bind (el, binding, vnode) {
        // 指令定义
      }
    }
  }
}
```

2. 在组件的模板中使用局部自定义指令：

```html
<template>
<div v-my-directive="someValue"></div>
</template>
```

**三、指令定义对象的参数说明**

1. `el`：指令所绑定的元素，可以通过这个参数来操作元素的属性、样式等。
2. `binding`：一个对象，包含以下属性：

* `value`：指令的绑定值，例如在`v-my-directive="someValue"`中，`value`就是`someValue`的值。
* `arg`：指令的参数，如果指令是`v-my-directive:argName`，那么`arg`就是`argName`。
* `modifiers`：一个对象，包含指令的修饰符。

3. `vnode`：虚拟节点，代表指令所绑定的元素的虚拟节点。
4. `oldVnode`：上一个虚拟节点，仅在`update`和`componentUpdated`钩子中可用。

**四、自定义指令的应用场景**

1. 操作 DOM 元素：例如，在特定条件下为元素添加或移除类名、设置样式、监听元素的事件等。
2. 实现复杂的交互效果：比如拖拽、缩放、滚动监听等。
3. 数据格式化：在将数据绑定到元素之前对数据进行格式化处理。

## Provide inject {#p2-provide-inject}

Vue 3 中的 `provide` 和 `inject` 功能提供了一种方法，允许祖先组件将数据“提供”给它的所有后代组件，无论后代组件位于组件树的何处，而不必通过所有的组件层层传递属性（props）。这对于深层嵌套的组件或跨多个组件共享状态特别有用。

 基本用法

 在祖先组件中提供数据

你可以在任何组件中使用 `provide` 选项来提供数据。`provide` 选项应该是一个对象或返回对象的函数，其中的每个属性都可以被子组件注入。从 Vue 3 开始，`provide` 和 `inject` 绑定现在是响应式的。

在 Vue 3 中，建议在 `setup()` 函数中使用 `provide` 函数，因为 `setup` 是组合式 API 的入口点。

```javascript
import { provide } from 'vue'

export default {
  setup () {
    // 提供 'theme' 数据
    provide('theme', 'dark')
  }
}
```

 在后代组件中注入数据

后代组件可以使用 `inject` 选项来接收数据。`inject` 选项应该是一个字符串数组，列出需要注入的属性名。

```javascript
import { inject } from 'vue'

export default {
  setup () {
    const theme = inject('theme')
    return { theme }
  }
}
```

 案例

假设你正在开发一个应用，该应用有一个主题切换功能，你可以在顶层组件中提供当前主题，而所有子组件都可以注入这个主题信息，而不必通过层层传递。

 响应式提供

如果要提供的数据是响应式的，并且希望后代组件能够响应数据的变化，你需要使用 Vue 的响应式系统函数，例如 `reactive` 或 `ref`。

```javascript
import { provide, reactive } from 'vue'

export default {
  setup () {
    const theme = reactive({ color: 'dark' })
    provide('theme', theme)
  }
}
```

后代组件同样可以如上所示通过 `inject` 获取这个响应式的数据。

 注意事项

* `provide` 和 `inject` 提供的依赖关系不是可靠的，并且不应该在业务逻辑中频繁使用，以避免复杂的跨组件通讯导致应用难以维护。它通常被用于开发可复用的插件或高阶组件。
* 使用这两个选项时，注入的数据在后代组件中并不是响应式的，除非使用了 Vue 的响应式系统（如 `reactive`、`ref`）来提供这些数据。
* 如果 `inject` 未找到提供的键，则它默认返回 `undefined`。你可以通过提供第二个参数作为默认值来改变这一行为。

总的来说，`provide` 和 `inject` 是 Vue 3 中解决跨多个组件共享状态问题的一个非常有用的功能，尤其适用于开发高阶组件或插件时使用。

## 介绍一下动态插槽名 {#p2-introduce-dynamic-slot-names}

在 Vue 3 中，动态插槽名允许在运行时根据特定的条件动态地确定插槽的名称，从而为组件的渲染提供了更大的灵活性。

 **一、基本概念**

通常情况下，插槽名在组件定义时是固定的。但在某些场景中，可能需要根据不同的情况动态地选择要渲染的插槽。Vue 3 引入了动态插槽名的特性，使得可以在运行时动态地确定插槽的名称。

 **二、使用方法**

1. 在子组件中接收动态插槽：

 ```vue
 <template>
 <div>
 <slot :name="dynamicSlotName"></slot>
 </div>
 </template>

 <script setup>
 import { ref } from "vue";
 const dynamicSlotName = ref("defaultSlot");
 </script>
 ```

 在这个子组件中，通过`ref`定义了一个名为`dynamicSlotName`的响应式变量，用于动态确定插槽的名称。

2. 在父组件中使用动态插槽名：

 ```vue
 <template>
 <ChildComponent>
 <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
 <!-- 根据不同的插槽名渲染不同的内容 -->
 <p v-if="slotName === 'slot1'">Content for slot1</p>
 <p v-else-if="slotName === 'slot2'">Content for slot2</p>
 </template>
 </ChildComponent>
 </template>

 <script setup>
 import { ref } from "vue";
 const slotNames = ref(["slot1", "slot2"]);
 </script>
 ```

 在父组件中，使用`v-for`循环遍历一个包含插槽名的数组，并根据不同的插槽名渲染不同的内容。通过这种方式，可以动态地将内容传递给子组件的不同插槽。

 **三、优势**

1. 灵活性：可以根据不同的条件动态地选择要渲染的插槽，使得组件能够适应各种复杂的场景。
2. 可扩展性：在需要根据不同的情况展示不同的内容时，动态插槽名提供了一种简洁而强大的方式，无需为每个可能的情况创建单独的组件。
3. 代码复用：通过动态插槽名，可以在不同的组件中复用相同的逻辑，只需要在父组件中根据不同的需求传递不同的插槽名即可。

## 介绍一下条件插槽 {#p2-introduce-conditional-slots}

可以查看官网: [资料](https://cn.vuejs.org/guide/components/slots#conditional-slots)

在 Vue 中，条件插槽可以通过结合使用 `$slots` 属性与 `v-if` 来实现动态地根据特定条件渲染不同的内容到插槽中。

**一、基本概念**

条件插槽允许在父组件向子组件传递内容时，根据一定的条件来决定渲染哪个插槽的内容。通过使用 `$slots` 属性可以访问子组件中的插槽内容，然后结合 `v-if` 进行条件判断来选择要渲染的部分。

**二、使用方法**

1. 在子组件中定义插槽：

 ```html
 <template>
 <div>
 <slot v-if="$slots.conditionalSlot" name="conditionalSlot"></slot>
 <slot v-else name="defaultSlot"></slot>
 </div>
 </template>
 ```

 在这个子组件中，定义了两个插槽，一个名为 `conditionalSlot`，另一个名为 `defaultSlot`。通过判断 `$slots.conditionalSlot` 是否存在来决定渲染哪个插槽。

2. 在父组件中使用条件插槽：

 ```html
 <template>
 <ChildComponent>
 <template v-if="someCondition" #conditionalSlot>
 <!-- 条件成立时要渲染的内容 -->
 <p>Conditional content</p>
 </template>
 <template v-else #defaultSlot>
 <!-- 条件不成立时要渲染的内容 -->
 <p>Default content</p>
 </template>
 </ChildComponent>
 </template>
 ```

 在父组件中，根据 `someCondition` 的值来决定向子组件的插槽中传递不同的内容。当 `someCondition` 为真时，传递名为 `conditionalSlot` 的插槽内容；当 `someCondition` 为假时，传递名为 `defaultSlot` 的插槽内容。

**三、优势**

1. 动态性：可以根据不同的条件动态地渲染不同的内容，使组件更加灵活适应各种场景。
2. 可维护性：将不同情况下的内容分别组织在不同的模板中，使得代码更加清晰易读，便于维护。
3. 代码复用：通过条件插槽，可以在不同的场景下复用同一个子组件，只需要在父组件中根据不同的条件传递不同的内容即可。

## defineModel {#p2-define-model}

在 Vue 3 中，`defineModel`是一个用于简化双向绑定的函数，通常与组合式函数（composition function）一起使用。

**一、主要作用**

1. **自动解包响应式对象**：

* 当在组合式函数中使用响应式对象时，使用`defineModel`可以自动解包响应式对象的属性，使得这些属性可以在模板中直接使用，无需通过`.value`来访问。
* 例如，如果有一个响应式对象`state`，其中包含属性`count`，在不使用`defineModel`时，在模板中需要使用`state.count.value`来访问`count`的值。但使用`defineModel`后，可以直接在模板中使用`count`。

2. **实现双向绑定**：

* 配合`v-model`指令使用时，`defineModel`可以轻松实现双向绑定。它会自动处理输入事件，并将新的值更新到响应式对象中。
* 例如，在一个自定义组件中，使用`defineModel`可以让组件的`props`中的一个值与组件内部的状态实现双向绑定，使得父组件和子组件之间的数据传递更加方便。

**二、使用方法**

1. **导入`defineModel`**：

* 在组合式函数中，首先需要从`'vue'`模块中导入`defineModel`函数。

 ```javascript
 import { defineModel } from 'vue'
 ```

2. **使用`defineModel`**：

* 在组合式函数内部，将需要双向绑定的响应式对象作为参数传递给`defineModel`。

 ```javascript
 import { reactive } from 'vue'
 
 export default function useCounter () {
   const state = reactive({
     count: 0
   })
 
   return defineModel(() => ({
     count: state.count
   }))
 }
 ```

* 在上面的例子中，`state.count`是一个响应式属性，通过`defineModel`函数返回后，可以在模板中直接使用`count`进行双向绑定。

3. **在模板中使用**：

* 在组件的模板中，可以使用`v-model`指令来绑定使用了`defineModel`的属性。

 ```html
 <template>
 <div>
 <input v-model="count" />
 </div>
 </template>

 <script setup>
 import useCounter from "./useCounter";
 const { count } = useCounter();
 </script>
 ```

* 在这个例子中，`input`元素的`v-model`绑定了`count`属性，当用户在输入框中输入内容时，`count`的值会自动更新，实现了双向绑定。

**三、优势和适用场景**

1. **优势**：

* **简化代码**：减少了在模板中访问响应式属性时需要添加`.value`的繁琐操作，使代码更加简洁易读。
* **方便双向绑定**：特别是在自定义组件中，使用`defineModel`可以快速实现双向绑定，提高开发效率。

2. **适用场景**：

* **自定义组件开发**：当开发自定义组件时，如果需要实现双向绑定的属性，使用`defineModel`可以简化代码，提高组件的易用性。
* **复杂业务逻辑处理**：在组合式函数中处理复杂的业务逻辑时，`defineModel`可以帮助更好地管理响应式数据，实现数据的双向绑定。

## 9 useTemplateRef {#p2-use-template-ref}

## watchEffect {#p2-wactheffect}

## watch 和 watchEffect 场景上有何区别 {#p2-watch-and-watcheffect}

`watch` 和 `watchEffect` 在 Vue 3 中都是强大的响应式特性，用于侦听响应式状态的变化并执行一些副作用（如调用函数）。虽然它们很相似，但在使用场景和行为上有一些关键的区别，了解这些区别可以帮助你选择最合适的工具来实现你的需求。

 watch

* **精确性**：`watch` 允许你明确指定要侦听的数据源，并且可以分别访问其新值和旧值。这让 `watch` 在需要对特定数据变化做出响应时非常精确和灵活。
* **惰性执行**：`watch` 默认情况下是惰性执行的，即它需要数据发生变化后才执行回调。这意味着在初始化时，`watch` 的回调不会执行，除非你通过配置使其立即执行。
* **使用场景**：当你需要明确知道数据何时改变以及如何改变时（例如对比新旧值），或者需要侦听一个或多个特定的响应式引用时，`watch` 是更好的选择。

 watchEffect

* **自动侦测**：`watchEffect` 会自动侦测其回调函数中用到的响应式状态，并在这些状态改变时重新执行。这意味着你不需要明确指定侦听的状态，让侦听副作用的编写更简单直接。
* **立即执行**：`watchEffect` 回调会在初始时立即执行一次，然后再每次依赖的响应式状态变化时再次执行。这适合于不需要初始条件判断且希望立即根据响应式状态渲染或执行逻辑的场景。
* **使用场景**：当你需要自动追踪并响应所有使用到的响应式状态变化时，`watchEffect` 是更便捷的选项。它适用于依赖项不明确或者希望自动追踪依赖并执行副作用的场合。

 如何选择

1. **如果你的副作用逻辑需要明确侦听特定的数据源，并且需要区分初始执行和依赖更新时的逻辑**，那么使用 `watch` 更合适。`watch` 提供了对侦听数据和执行逻辑的细粒度控制。
2. **如果你的逻辑只是单纯地需要对使用到的任何响应式状态的改变做出响应，且希望简化依赖跟踪**，`watchEffect` 更简单、更易于使用。它自动收集依赖项，简化了代码，使你的副作用逻辑更容易编写和维护。

通常，选择依赖于你想要的控制级别和特定的使用情况。`watch` 提供了更高的灵活性和控制力，`watchEffect` 则为常见的自动响应逻辑提供了便利。了解这些区别和使用场景可以帮助你更合理地使用 Vue 3 的响应式系统。

## 事件修饰符 {#p2-input-binding-modifiers}

在 Vue 中，事件修饰符是一些由点 (.) 开头的特殊后缀，用于指示 Vue 对 DOM 事件进行某种特殊处理。Vue 提供了一系列的默认事件修饰符来帮助开发者更方便地处理一些常见的 DOM 事件行为。

下面是 Vue 3 中提供的一些默认事件修饰符：

| 事件修饰符 | 描述 |
| ---------- | ------------------------------------------------------------------------ |
| `.stop` | 调用 `event.stopPropagation()` 阻止事件冒泡。 |
| `.prevent` | 调用 `event.preventDefault()` 阻止默认事件行为。 |
| `.capture` | 使用事件捕获模式添加事件监听器，而不是冒泡模式。 |
| `.self` | 仅当事件是从事件绑定的元素本身触发时才触发回调。 |
| `.once` | 事件只触发一次，之后移除事件监听器。 |
| `.passive` | 以 `{ passive: true }` 模式添加监听器，表示不会调用 `preventDefault()`。 |

这些修饰符可以单独使用，也可以组合使用。以下是一些示例：

```html
<!-- 阻止点击事件冒泡 -->
<button @click.stop="doThis">Stop Propagation</button>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit">Prevent Default</form>

<!-- 修饰符链 -->
<a @click.stop.prevent="doThat">Stop Propagation and Prevent Default</a>

<!-- 只在 @click.self 表达式中的元素本身（而非子元素）触发时调用 doThat -->
<div @click.self="doThat">Only Trigger on Self</div>

<!-- 点击事件将只触发一次 -->
<button @click.once="doOnce">Trigger Once</button>
```

使用这些事件修饰符可以使你的事件处理逻辑更简洁和直观，同时也能够实现一些复杂的事件处理方式。

在 Vue 中，`.lazy` 是一个输入绑定修饰符，用于 `v-model` 指令。它的主要作用是改变数据同步的时机：默认情况下，使用 `v-model` 绑定的输入字段会在每次 `input` 事件触发时同步数据（即用户输入时实时同步），而通过添加 `.lazy` 修饰符后，数据同步会改为在 `change` 事件发生时才进行，通常这意味着在输入字段失去焦点或按下回车键后。

 使用 `.lazy` 修饰符的好处

* **性能优化**：对于一些性能敏感的应用，或者当输入操作导致重度计算时，减少数据同步的频率可以提升性能。
* **用户体验**：在一些场景下，可能希望用户完成输入后（例如填写完整的表单字段后）再收集数据，使用 `.lazy` 可以提升这类体验。
* **减少数据校验**：如果你在输入数据时进行校验或处理，使用 `.lazy` 可以减少这种校验的频率，仅在用户完成输入时执行。

 示例

```html
<!-- 在输入框失去焦点或用户按下回车后，才更新 data 的 message 属性 -->
<input v-model.lazy="message" />
```

在这个例子中，不会在每次用户输入时同步 `message` 的值，而是在输入框失去焦点，或用户按下回车键时同步，这可以减少数据同步的次数，适用于不需要实时更新数据，或更新操作比较昂贵的场景。

总之，`.lazy` 修饰符提供了一种简便的方式来优化数据绑定的行为，尤其是在你希望控制数据更新频率，或者当实时更新不是必要时非常有用。

`.exact` 修饰符在 Vue 事件处理中起着非常特定的作用。它允许控制触发事件处理器的确切方式，确保只有在指定的系统修饰键（如 `ctrl`、`alt`、`shift`、`meta`）组合完全匹配时，事件处理函数才会被触发。这意味着，如果你绑定了 `.exact` 修饰符到一个事件上，只有在没有其他未指定的修饰键被按下的情况下，该事件才会被触发。

 使用场景

`.exact` 修饰符非常有用，尤其是在你想要精确控制事件触发条件的时候。例如，你可能有以下场景：

* 当用户严格只按下 `ctrl` 键时触发一个动作，如果用户同时按下了 `ctrl` 和 `shift`，则不触发。

 示例

```html
<!-- 只有当没有任何其他键被同时按下时，点击才会调用 doThis -->
<button @click.exact="doThis">No Modifier Key</button>

<!-- 只有当仅按下 ctrl 键时点击才会调用 doThat -->
<button @click.ctrl.exact="doThat">Ctrl + Click Only</button>
```

在第一个例子中，点击按钮将只在没有按下 `ctrl`、`alt`、`shift` 或 `meta` 键的情况下触发 `doThis` 方法。在第二个例子中，`doThat` 方法只会在严格按下 `ctrl` 键时触发点击事件。

## 如何处理异步加载组件 {#p1-async-loading-components}

在 Vue 应用中，异步组件是指那些在声明时不会立即加载，而是在需要的时候才加载的组件。使用异步组件能够帮助你提高应用的加载速度和性能，特别是在处理大型应用和路由懒加载时。Vue 提供了几种处理异步加载组件的方法。

 Vue 3 中处理异步组件的方法

 使用 `defineAsyncComponent` 方法

Vue 3 提供了 `defineAsyncComponent` 方法，使得定义和使用异步组件变得简单。你可以通过传递一个函数，该函数返回一个 `import()` 调用（返回 Promise），来动态加载组件。

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() => import('./components/AsyncComponent.vue'))

// 在组件中使用
export default {
  components: {
    AsyncComponent
  }
}
```

 加载状态处理

你还可以使用 `defineAsyncComponent` 的高级用法，提供一个对象来处理加载状态，如显示加载中的提示、错误处理和超时处理。

```javascript
const AsyncComponent = defineAsyncComponent({
  // 加载异步组件的工厂函数
  loader: () => import('./components/AsyncComponent.vue'),
  // 加载中时要使用的组件
  loadingComponent: LoadingComponent,
  // 加载失败时要使用的组件
  errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（毫秒）
  delay: 200,
  // 如果提供了超时时间（毫秒），超时后将显示错误组件 | 默认值：Infinity
  timeout: 3000
})
```

 Vue 2 中处理异步组件的方法

在 Vue 2 中，异步组件的定义略有不同，你可以直接在组件注册时提供一个返回 Promise 的工厂函数。

```javascript
Vue.component('async-component', () => import('./components/AsyncComponent.vue'))
```

或者为了处理加载状态，可以提供一个高级的对象形式：

```javascript
Vue.component('async-component', (resolve, reject) => ({
  // 需要加载的组件 (应该是一个 Promise)
  component: import('./components/AsyncComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载中组件前的等待时间。默认：200ms。
  delay: 200,
  // 如果提供了超时时间 (毫秒)，超时后会显示错误组件。默认：Infinity
  timeout: 3000
}))
```

## 3.x 中 app.config 有哪些应用配置？ {#p4-app-config-has-which-application-configuration}

确实，在 Vue 3 中，`app.config` 提供了一系列的应用级别的配置选项，用于自定义或调整 Vue 应用的行为。你提到的这些配置项都是 `app.config` 的一部分，下面是关于它们的详细介绍：

 `app.config.errorHandler`

* **作用**：为未捕获的异常定义一个全局的处理函数。这在集中处理组件渲染或观察者(watchers)中的异常时非常有用。
* **示例**：

```javascript
app.config.errorHandler = (err, instance, info) => {
  // 处理错误
}
```

 `app.config.warnHandler`

* **作用**：为 Vue 运行时警告定义一个全局的处理函数，允许你在开发过程中自定义处理警告的方式。
* **示例**：

```javascript
app.config.warnHandler = (msg, instance, trace) => {
  // 处理警告
}
```

 `app.config.performance`

* **作用**：开启性能追踪。在开发模式下启用，能够测量和追踪组件的初始化、编译时间等性能指标。
* **示例**：

```javascript
app.config.performance = true
```

 `app.config.compilerOptions`

* **作用**：允许自定义编译器选项，如模板中的自定义指令等。这对于更细致地控制模板的编译过程很有帮助。
* **示例**：

```javascript
app.config.compilerOptions = {
  // 编译器配置
}
```

 `app.config.globalProperties`

* **作用**：定义全局可用的属性。这在 Vue 2 中通过 `Vue.prototype` 实现，Vue 3 中通过 `app.config.globalProperties` 实现。
* **示例**：

```javascript
app.config.globalProperties.$utils = {
  // 一些全局方法或属性
}
```

 `app.config.optionMergeStrategies`

* **作用**：自定义选项的合并策略。允许你为自定义选项指定如何合并父子选项。
* **示例**：

 ```javascript
 app.config.optionMergeStrategies.myOption = (parent, child) => {
 // 合并策略
 }
 ```

 `app.config.idPrefix`

* **作用**：配置此应用中通过 useId() 生成的所有 ID 的前缀。由 3.5+ 版本引入。
* **示例**：

```javascript
app.config.idPrefix = 'custom-'

// 在组件中：
const id1 = useId() // 'my-app:0'
const id2 = useId() // 'my-app:1'
```

 `app.config.throwUnhandledErrorInProduction`

* **作用**：强制在生产模式下抛出未处理的错误。 由 3.5+ 版本引入。

默认情况下，在 Vue 应用中抛出但未显式处理的错误在开发和生产模式下有不同的行为：

在开发模式下，错误会被抛出并可能导致应用崩溃。这是为了使错误更加突出，以便在开发过程中被注意到并修复。

在生产模式下，错误只会被记录到控制台以尽量减少对最终用户的影响。然而，这可能会导致只在生产中发生的错误无法被错误监控服务捕获。

通过将 app.config.throwUnhandledErrorInProduction 设置为 true，即使在生产模式下也会抛出未处理的错误。

这些应用级配置选项提供了对 Vue 应用的高度控制，允许开发者根据实际需要调整 Vue 的默认行为。在使用时，建议根据项目实际情况和需求进行选择性地配置。

## scope 是怎么做的样式隔离的 {#p2-scope}

Vue 中的样式隔离是通过 Vue 单文件组件（Single File Components，简称 SFC）的 `<style>` 标签中的 `scoped` 属性实现的。当你在一个 Vue 组件的 `<style>` 标签上添加 `scoped` 属性时，Vue 会自动将该样式限定在当前组件的范围内，从而防止样式冲突和不必要的样式泄漏。

 实现原理

Vue 在编译带有 `scoped` 属性的 `<style>` 标签时，会按照以下步骤处理样式隔离：

1. **生成唯一的作用域 ID**：Vue 为每个带有 `scoped` 属性的组件生成一个唯一的作用域 ID（如 `data-v-f3f3eg9`）。这个 ID 是随机的，确保每个组件的作用域 ID 是独一无二的。

2. **添加作用域 ID 到模板元素**：Vue 会在编译组件模板的过程中，将这个作用域 ID 作为自定义属性添加到组件模板的所有元素上。例如，如果作用域 ID 是 `data-v-f3f3eg9`，那么在该组件模板的所有元素上都会添加一个属性 `data-v-f3f3eg9`。

3. **修改 CSS 选择器**：对于组件内部的每个 CSS 规则，Vue 会自动转换其选择器，使其仅匹配带有对应作用域 ID 的元素。这是通过在 CSS 选择器的末尾添加相应的作用域 ID 属性选择器来实现的。例如，如果 CSS 规则是 `.button { color: red; }`，并且作用域 ID 是 `data-v-f3f3eg9`，那么该规则会被转换成 `.button[data-v-f3f3eg9] { color: red; }`。

 示例

假设有如下 Vue 单文件组件：

```vue
<template>
 <button class="btn">Click Me</button>
</template>

<style scoped>
.btn {
 background-color: red;
}
</style>
```

编译后，CSS 规则会变成类似于这样（注意：实际的作用域 ID 是随机生成的）：

```css
.btn[data-v-f3f3eg9] {
 background-color: red;
}
```

并且模板里的 `<button>` 元素会被编译为类似这样：

```html
<button class="btn" data-v-f3f3eg9>Click Me</button>
```

这样，`.btn` 样式规则只会应用到当前组件中的 `<button>` 元素上，而不会影响到其他组件中的同类元素，实现了样式隔离。

 注意事项

* 由于样式隔离是通过属性选择器和自定义属性实现的，因此这种方法的性能可能会略低于全局样式规则。
* `scoped` 样式不能影响子组件，仅限于当前的组件。如果需要影响子组件，则需要使用深度选择器（`>>>` 或 `/deep/`）。
* 其他 Web 组件技术如 Shadow DOM 也可以提供样式隔离的功能，但 Vue 选择了这种不需要 polyfill、兼容性更好的实现方式。

在 Vue 中，`.vue` 单文件组件的 `<style>` 标签可以添加一个 `scoped` 属性来实现样式的隔离。通过这个 `scoped` 属性，Vue 会确保样式只应用到当前组件的模板中，而不会泄漏到外部的其他组件中。

这个效果是通过 PostCSS 在构建过程中对 CSS 进行转换来实现的。基本原理如下：

 Scoped Styles 的工作原理

1. 当你为 `<style>` 标签添加 `scoped` 属性时，Vue 的加载器（比如 `vue-loader`）会处理你的组件文件。

2. `vue-loader` 使用 PostCSS 来处理 `scoped` 的 CSS。它为组件模板内的每个元素添加一个独特的属性（如 `data-v-f3f3eg9`）。这个属性是随机生成的，确保唯一性（是在 Vue 项目构建过程中的 hash 值）。

3. 同时，所有的 CSS 规则都会被更新，以仅匹配带有相应属性选择器的元素。例如：如果你有一个 `.button` 类的样式规则，它会被转换成类似 `.button[data-v-f3f3eg9]` 的形式。这确保了样式只会被应用到拥有对应属性的 DOM 元素上。

 示例

假设你在组件 `MyComponent.vue` 内写了如下代码：

```html
<template>
 <button class="btn">Click Me</button>
</template>

<style scoped>
 .btn {
 background-color: blue;
 }
</style>
```

`vue-loader` 将处理上述代码，模板中的 `<button>` 可能会渲染成类似下面的 HTML：

```html
<button class="btn" data-v-f3f3eg9>Click Me</button>
```

CSS 则会被转换成：

```css
.btn[data-v-f3f3eg9] {
 background-color: blue;
}
```

因此，`.btn` 类的样式仅会应用于拥有 `data-v-f3f3eg9` 属性的 `<button>` 元素上。

 注意

* Scoped styles 提供了样式封装，但不是绝对的隔离。子组件的根节点仍然会受到父组件的 `scoped` CSS 的影响。在子组件中使用 `scoped` 可以避免这种情况。
* Scoped CSS 不防止全局样式影响组件。如果其他地方定义了全局样式，它们仍然会应用到组件中。
* 当使用外部库的类名时，`scoped` 可能会导致样式不被应用，因为它会期望所有匹配规则的元素都带有特定的属性。

总的来说，Scoped Styles 是 Vue 单文件组件提供的一种方便且有效的样式封装方式，通过 PostCSS 转换和属性选择器来实现组件之间的样式隔离。
