# vue

## v-for 时给每项元素绑定事件需要用事件代理吗？为什么？ {#p1-vue-for}

 Vue 并没有在源码中做代理

vue 并没有在源码中做代理， 至少是 2.x 是没有做事件代理的。但是理论上来说使用事件代理性能会更好一点。

阅读 vue 源码的过程中，并没有发现 vue 会自动做事件代理，但是一般给 v-for 绑定事件时，都会让节点指向同一个事件处理程序（第二种情况可以运行，但是 eslint 会警告），一定程度上比每生成一个节点都绑定一个不同的事件处理程序性能好，但是监听器的数量仍不会变，所以使用事件代理会更好一点。

react 是委托到 document 上, 然后自己生成了合成事件, 冒泡到 document 的时候进入合成事件, 然后他通过 getParent() 获取该事件源的所有合成事件, 触发完毕之后继续冒泡。但是一些特殊的比如focus这种必须放在input这些dom上。

 为何事件代理会让性能好一些

说一下我个人理解，先说结论，可以使用

事件代理作用主要是 2 个

1. 将事件处理程序代理到父节点，减少内存占用率
2. 动态生成子节点时能自动绑定事件处理程序到父节点

这里我生成了十万个 span 节点，通过 performance monitor 来监控内存占用率和事件监听器的数量，对比以下 3 种情况

1. 不使用事件代理，每个 span 节点绑定一个 click 事件，并指向同一个事件处理程序

```html
<div>
 <span 
 v-for="(item,index) of 100000" 
 :key="index" 
 @click="handleClick">
 {{item}}
 </span>
</div>
```

2. 不使用事件代理，每个 span 节点绑定一个 click 事件，并指向不同的事件处理程序

```html
<div>
 <span 
 v-for="(item,index) of 100000" 
 :key="index" 
 @click="function () {}">
 {{item}}
 </span>
</div>
```

3. 使用事件代理

```html
<div @click="handleClick">
 <span 
 v-for="(item,index) of 100000" 
 :key="index">
 {{item}}
 </span>
</div>
```

可以通过 chrome devtools performance monitor 查看内存使用情况

可以看到使用事件代理无论是监听器数量和内存占用率都比前两者要少

 为什么 Vue 不适用事件委托

首先我们需要知道事件代理主要有什么作用？

1. 事件代理能够避免我们逐个的去给元素新增和删除事件
2. 事件代理比每一个元素都绑定一个事件性能要更好

从vue的角度上来看上面两点

* 在v-for中，我们直接用一个for循环就能在模板中将每个元素都绑定上事件，并且当组件销毁时，vue也会自动给我们将所有的事件处理器都移除掉。所以事件代理能做到的第一点vue已经给我们做到了
* 在v-for中，给元素绑定的都是相同的事件，所以除非上千行的元素需要加上事件，其实和使用事件代理的性能差别不大，所以也没必要用事件代理

## vue3 的响应式库是独立出来的，它单独使用的时候是什么效果 {#p0-vue3-reactivity}

 该话题涉及的相关内容

* 原理：Proxy、track、trigger
* 新增属性
* 遍历后新增
* 遍历后删除或者清空
* 获取 keys
* 删除对象属性
* 判断属性是否存在
* 性能

推荐阅读文档： [资料](https://juejin.cn/post/6844904122479542285)

 响应式仓库

Vue3 不同于 Vue2 也体现在源码结构上，Vue3 把耦合性比较低的包分散在 `packages` 目录下单独发布成 `npm` 包。 这也是目前很流行的一种大型项目管理方式 `Monorepo`。

其中负责响应式部分的仓库就是 `@vue/reactivity`，它不涉及 Vue 的其他的任何部分，是非常非常 「正交」 的一种实现方式。

甚至可以`轻松的集成进 React` [资料](https://juejin.cn/post/6844904095594381325)

 区别

Proxy 和 Object.defineProperty 的使用方法看似很相似，其实 Proxy 是在 「更高维度」 上去拦截属性的修改的，怎么理解呢？

Vue2 中，对于给定的 data，如 `{ count: 1 }`，是需要根据具体的 key 也就是 `count`，去对「修改 data.count 」 和 「读取 data.count」进行拦截，也就是

```javascript
Object.defineProperty(data, 'count', {
  get () {},
  set () {}
})
```

必须预先知道要拦截的 key 是什么，这也就是为什么 Vue2 里对于对象上的新增属性无能为力。

而 Vue3 所使用的 Proxy，则是这样拦截的：

```js
const p = new Proxy(data, {
  get (key) { },
  set (key, value) { }
})
```

可以看到，根本不需要关心具体的 key，它去拦截的是 「修改 data 上的任意 key」 和 「读取 data 上的任意 key」。

所以，不管是已有的 key 还是新增的 key，都逃不过它的魔爪。

但是 Proxy 更加强大的地方还在于 Proxy 除了 get 和 set，还可以拦截更多的操作符。

 简单的例子🌰

先写一个 Vue3 响应式的最小案例，本文的相关案例都只会用 `reactive` 和 `effect` 这两个 api。如果你了解过 React 中的 `useEffect`，相信你会对这个概念秒懂，Vue3 的 `effect` 不过就是去掉了手动声明依赖的「进化版」的 `useEffect`。

React 中手动声明 `[data.count]` 这个依赖的步骤被 Vue3 内部直接做掉了，在 `effect` 函数内部读取到 `data.count` 的时候，它就已经被收集作为依赖了。

Vue3：

```kotlin
// 响应式数据
const data = reactive({
 count: 1
})

// 观测变化
effect(() => console.log('count changed', data.count))

// 触发 console.log('count changed', data.count) 重新执行
data.count = 2

```

React：

```scss
// 数据
const [data, setData] = useState({
 count: 1
})

// 观测变化 需要手动声明依赖
useEffect(() => {
 console.log('count changed', data.count)
}, [data.count])

// 触发 console.log('count changed', data.count) 重新执行
setData({
 count: 2
})

```

也可以把 `effect` 中的回调函数联想到视图的重新渲染、 watch 的回调函数等等…… 它们是同样基于这套响应式机制的。

而本文的核心目的，就是探究这个基于 Proxy 的 reactive api，到底能强大到什么程度，能监听到用户对于什么程度的修改。

 讲讲原理

先最小化的讲解一下响应式的原理，其实就是在 Proxy 第二个参数 `handler` 也就是陷阱操作符中，拦截各种取值、赋值操作，依托 `track` 和 `trigger` 两个函数进行依赖收集和派发更新。

`track` 用来在读取时收集依赖。

`trigger` 用来在更新时触发依赖。

 track

```vbnet
function track(target: object, type: TrackOpTypes, key: unknown) {
 const depsMap = targetMap.get(target);
 // 收集依赖时 通过 key 建立一个 set
 let dep = new Set()
 targetMap.set(ITERATE_KEY, dep)
 // 这个 effect 可以先理解为更新函数 存放在 dep 里
 dep.add(effect)
}

```

`target` 是原对象。

`type` 是本次收集的类型，也就是收集依赖的时候用来标识是什么类型的操作，比如上文依赖中的类型就是 `get`，这个后续会详细讲解。

`key` 是指本次访问的是数据中的哪个 key，比如上文例子中收集依赖的 key 就是 `count`

首先全局会存在一个 `targetMap`，它用来建立 `数据 -> 依赖` 的映射，它是一个 WeakMap 数据结构。

而 `targetMap` 通过数据 `target`，可以获取到 `depsMap`，它用来存放这个数据对应的所有响应式依赖。

`depsMap` 的每一项则是一个 Set 数据结构，而这个 Set 就存放着对应 key 的更新函数。

是不是有点绕？我们用一个具体的例子来举例吧。

```ini
const target = { count: 1}
const data = reactive(target)

const effection = effect(() => {
 console.log(data.count)
})

```

对于这个例子的依赖关系，

1. 全局的 `targetMap` 是：

```js
targetMap: {
 { count: 1 }: dep
}

```

2. dep 则是

```js
dep: {
 count: Set { effection }
}

```

这样一层层的下去，就可以通过 `target` 找到 `count` 对应的更新函数 `effection` 了。

 trigger

这里是最小化的实现，仅仅为了便于理解原理，实际上要复杂很多，

其实 `type` 的作用很关键，先记住，后面会详细讲。

```typescript
export function trigger (
  target: object,
  type: TriggerOpTypes,
  key?: unknown
) {
  // 简化来说 就是通过 key 找到所有更新函数 依次执行
  const dep = targetMap.get(target)
  dep.get(key).forEach(effect => effect())
}
```

vue3 的响应式库是独立出来的，它可以很方便的集成进 React， 作为 React 的状态管理库使用！

 使用示范

定义 store

```typescript
// store.ts
import { reactive, computed, effect } from '@vue/reactivity'

export const state = reactive({
  count: 0
})

const plusOne = computed(() => state.count + 1)

effect(() => {
  console.log('plusOne changed: ', plusOne)
})

const add = () => (state.count += 1)

export const mutations = {
  // mutation
  add
}

export const store = {
  state,
  computed: {
    plusOne
  }
}

export type Store = typeof store;
```

消费使用

```js
// Index.tsx
import { Provider, useStore } from 'rxv'
import { mutations, store, Store } from './store.ts'
function Count() {
 const countState = useStore((store: Store) => {
 const { state, computed } = store;
 const { count } = state;
 const { plusOne } = computed;

 return {
 count,
 plusOne,
 };
 });

 return (
 <Card hoverable style={{ marginBottom: 24 }}>
 <h1>计数器</h1>
 <div className="chunk">
 <div className="chunk">store中的count现在是 {countState.count}</div>
 <div className="chunk">computed值中的plusOne现在是 {countState.plusOne.value}</div>
 <Button onClick={mutations.add}>add</Button>
 </div>
 </Card>
 );
}

export default () => {
 return (
 <Provider value={store}>
 <Count />
 </Provider>
 );
};
```

可以看出，store的定义只用到了@vue/reactivity，而rxv只是在组件中做了一层桥接，连通了Vue3和React，正如它名字的含义：React x Vue。

 如何实现

只要effect能接入到React系统中，那么其他的api都没什么问题，因为它们只是去收集effect的依赖，去通知effect触发更新。

effect接受的是一个函数，而且effect还支持通过传入schedule参数来自定义依赖更新的时候需要触发什么函数，

而rxv的核心api: useStore接受的也是一个函数selector，它会让用户自己选择在组件中需要访问的数据。

把selector包装在effect中执行，去收集依赖。

指定依赖发生更新时，需要调用的函数是当前正在使用useStore的这个组件的forceUpdate强制渲染函数。

简单的看一下核心实现

share.ts

```typescript
export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(s => s + 1, 0)
  return forceUpdate
}

export const useEffection = (...effectArgs: Parameters<typeof effect>) => {
  // 用一个ref存储effection
  // effect函数只需要初始化执行一遍
  const effectionRef = useRef<ReactiveEffect>()
  if (!effectionRef.current) {
    effectionRef.current = effect(...effectArgs)
  }

  // 卸载组件后取消effect
  const stopEffect = () => {
    stop(effectionRef.current!)
  }
  useEffect(() => stopEffect, [])

  return effectionRef.current
}
```

核心逻辑在此

```typescript
import React, { useContext } from 'react'
import { useForceUpdate, useEffection } from './share'

type Selector<T, S> = (store: T) => S;

const StoreContext = React.createContext<any>(null)

const useStoreContext = () => {
  const contextValue = useContext(StoreContext)
  if (!contextValue) {
    throw new Error(
      'could not find store context value; please ensure the component is wrapped in a <Provider>'
    )
  }
  return contextValue
}

/**
在组件中读取全局状态
需要通过传入的函数收集依赖
 */
export const useStore = <T, S>(selector: Selector<T, S>): S => {
  const forceUpdate = useForceUpdate()
  const store = useStoreContext()

  const effection = useEffection(() => selector(store), {
    scheduler: job => {
      if (job() === undefined) return
      forceUpdate()
    },
    lazy: true
  })

  const value = effection()
  return value
}

export const Provider = StoreContext.Provider
```

参考文档：

* [资料](https://github.com/sl1673495/react-composition-api)
* [资料](https://juejin.cn/post/6844904054192078855)

## 响应式原理 {#p0-reactivity-theory}

Vue.js 的响应式原理主要是通过数据劫持（Object.defineProperty()）实现。当我们在Vue实例中定义了一个 data 属性时，Vue 会对这个属性进行劫持，即在getter和setter时做一些操作。

具体实现流程如下：

1. 在Vue实例化时，Vue 会对 data 对象进行遍历，使用 Object.defineProperty() 方法将每个属性转换为 getter 和 setter。
2. 当数据发生变化时，setter 会被调用，并通知所有相关联的视图进行更新。
3. 当视图进行更新时，Vue 会对新旧 VNode 进行比对（diff）, 只对发生了变化的部分进行更新，从而提高效率。

这种数据劫持的方式能够让开发者以声明式的方式来编写代码，同时又能够监测到数据的变化，并及时地通知相关视图进行更新。

Vue 的响应式原理还包括了watcher和dep的概念。Watcher 用于监听数据的变化，并在变化时触发相应的回调函数，而 Dep 则用于收集 Watcher，当数据发生变化时通知所有相关的 Watcher 去更新视图。

Vue 的响应式原理是一种通过数据劫持实现的观察者模式，通过对数据的监听和更新，实现了数据驱动视图的变化，提高了代码的可维护性和开发效率。

响应式流程:

1. Observe：Vue 在实例化时会对 data 对象进行遍历，将每个属性转换为 getter 和 setter，以进行数据劫持。当数据发生变化时，setter 会被调用。在 setter 中，Vue 会通知所有相关的 Watcher 去更新视图。

2. Compile：Compile 是 Vue 的编译器，用于编译模板，将模板转换为 VNode。在编译模板时，Compile 会根据模板中的指令和表达式创建对应的 Watcher。当数据发生变化时，相关的 Watcher 会被触发，从而更新视图。

3. Watcher：Watcher 是订阅者，用于监听数据的变化，并在变化时触发相应的回调函数。每个 Watcher 都会对应一个数据项和一个表达式。当数据发生变化时，Watcher 会重新计算表达式的值，并触发回调函数。

4. Dep：Dep 用于收集 Watcher，当数据发生变化时通知所有相关的 Watcher 去更新视图。在 Observe 中，每个属性都会对应一个 Dep。在 getter 中，如果当前 Watcher 存在，则会将该 Watcher 添加到 Dep 中。在 setter 中，如果数据发生变化，则会通知 Dep 中所有的 Watcher 去更新视图。

综上所述，Observe、Compile、Watcher 和 Dep 一起构成了 Vue 的响应式流程。这一流程包括了数据劫持、模板编译、订阅者监听和更新视图等多个环节，从而实现了 Vue 的数据驱动视图的特性。

Vue 在早期版本中使用了 `Object.defineProperty` 来实现响应式系统。但是，在 `Object.defineProperty` 中存在一些限制和局限性，导致在某些场景下无法完全满足需求。因此，Vue 在最新的版本中引入了 `Proxy` 来替代 `Object.defineProperty`。

以下是一些 `Proxy` 相对于 `Object.defineProperty` 的优势：

1. 功能更强大：`Proxy` 可以代理整个对象，而 `Object.defineProperty` 只能对已存在的属性进行拦截。使用 `Proxy` 可以在对象级别上进行拦截、代理、验证等操作。

2. 更易于使用和理解：`Proxy` 提供了一组更直观和易于理解的 API，使开发者可以更容易地创建和管理代理。

3. 性能优化：`Proxy` 针对属性的访问和修改都提供了更佳的性能优化。而 `Object.defineProperty` 在拦截属性访问和修改时会有一定的性能损耗。

4. 更好的嵌套支持：`Proxy` 可以代理嵌套对象的属性，而 `Object.defineProperty` 只能对顶层对象的属性进行拦截。

总的来说，`Proxy` 相对于 `Object.defineProperty` 在功能上更强大、使用更便捷、性能更优，并且在更复杂的场景下也能提供更好的支持。因此，Vue 在新版本中选择了使用 `Proxy` 来实现响应式系统。

## data  {#p1-data}

`vue` 实例的时候定义`data`属性既可以是一个对象，也可以是一个函数

```js
const app = new Vue({
  el: '#app',
  // 对象格式
  data: {
    foo: 'foo'
  }
  // 函数格式
  // data () {
  //   return {
  //     foo: 'foo'
  //   }
  // }
})
```

组件中定义data属性，只能是一个函数

如果为组件data直接定义为一个对象

```js
Vue.component('component1', {
  template: '<div>组件</div>',
  data: {
    foo: 'foo'
  }
})
```

则会得到警告信息

警告说明：返回的data应该是一个函数在每一个组件实例中

**组件data定义函数与对象的区别**

上面讲到组件data必须是一个函数，不知道大家有没有思考过这是为什么呢？

在我们定义好一个组件的时候，vue最终都会通过Vue.extend()构成组件实例

这里我们模仿组件构造函数，定义data属性，采用对象的形式

```js
function Component () {

}

Component.prototype.data = {
  count: 0
}
```

创建两个组件实例

```js
const componentA = new Component()
const componentB = new Component()
```

产生这样的原因这是两者共用了同一个内存地址，componentA修改的内容，同样对componentB产生了影响

如果我们采用函数的形式，则不会出现这种情况（函数返回的对象内存地址并不相同）

```js
function Component () {
  this.data = this.data()
}

Component.prototype.data = function () {
  return {
    count: 0
  }
}
```

修改componentA组件data属性的值，componentB中的值不受影响

```js
console.log(componentB.data.count) // 0
componentA.data.count = 1
console.log(componentB.data.count) // 0
```

vue组件可能会有很多个实例，采用函数返回一个全新data形式，使每个实例对象的数据不会受到其他实例对象数据的污染

**原理分析**

首先可以看看vue初始化data的代码，data的定义可以是函数也可以是对象

源码位置：`/vue-dev/src/core/instance/state.js`

```ts
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  // ...
}
```

`data`既能是`object`也能是`function`，那为什么还会出现上文警告呢？

别急，继续看下文

组件在创建的时候，会进行选项的合并

源码位置：`/vue-dev/src/core/util/options.js`

自定义组件会进入`mergeOptions`进行选项合并

```ts
Vue.prototype._init = function (options?: object) {
  // ...
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options)
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  // ...
}
```

定义data会进行数据校验

源码位置：`/vue-dev/src/core/instance/init.js`

这时候`vm`实例为`undefined`，进入if判断，若`data`类型不是`function`，则出现警告提示

```tsx
strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): () => any {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' &&
 warn(
   'The "data" option should be a function ' +
 'that returns a per-instance value in component ' +
 'definitions.',
   vm
 )

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }
  return mergeDataOrFn(parentVal, childVal, vm)
}
```

**结论**

* 根实例对象`data`可以是对象也可以是函数（根实例是单例），不会产生数据污染情况
* 组件实例对象`data`必须为函数，目的是为了防止多个组件实例对象之间共用一个`data`，产生数据污染。采用函数的形式，`initData`时会将其作为工厂函数都会返回全新`data`对象

**关键词**：vue更改data属性

**直接添加属性的问题**

我们从一个例子开始

定义一个`p`标签，通过`v-for`指令进行遍历

然后给`botton`标签绑定点击事件，我们预期点击按钮时，数据新增一个属性，界面也 新增一行

```vue

<template>
 <p v-for="(value,key) in item" :key="key">
 {{ value }}
 </p>
 <button @click="addProperty">动态添加新属性</button>
</template>
```

实例化一个`vue`实例，定义`data`属性和`methods`方法

```js
const app = new Vue({
  el: '#app',
  data: () => ({
    // '旧属性'
  }
  ),
  methods: {
    addProperty () {
      this.items.newProperty = '新属性' // 为items添加新属性
      console.log(this.items) // 输出带有newProperty的items
    }
  }
})
```

点击按钮，发现结果不及预期，数据虽然更新了（console打印出了新属性），但页面并没有更新

**原理分析**

为什么产生上面的情况呢？

下面来分析一下

`vue2`是用过`Object.defineProperty`实现数据响应式

```js
const obj = {}
Object.defineProperty(obj, 'foo', {
  get () {
    console.log(`get foo:${val}`)
    return val
  },
  set (newVal) {
    if (newVal !== val) {
      console.log(`set foo:${newVal}`)
      val = newVal
    }
  }
})
```

当我们访问`foo`属性或者设置`foo`值的时候都能够触发`setter与getter`

```js
obj.foo
obj.foo = 'new'
```

但是我们为`obj`添加新属性的时候，却无法触发事件属性的拦截

```js
obj.bar = '新属性'
```

原因是一开始`obj`的`foo`属性被设成了响应式数据，而`bar`是后面新增的属性，并没有通过`Object.defineProperty`设置成响应式数据

**解决方案**

`Vue` 不允许在已经创建的实例上动态添加新的响应式属性

若想实现数据与视图同步更新，可采取下面三种解决方案：

* `Vue.set()`
* `Object.assign()`
* `$forcecUpdated()`

**`Vue.set()`**

`Vue.set( target, propertyName/index, value )`

参数

* `{Object | Array} target`
* `{string | number} propertyName/index`
* `{any} value`

返回值：设置的值

通过`Vue.set`向响应式对象中添加一个`property`，并确保这个新 `property` 同样是响应式的，且触发视图更新

关于`Vue.set`源码（省略了很多与本节不相关的代码）

源码位置：`src\core\observer\index.js`

```ts
function set (target: Array<any> | object, key: any, val: any): any {
  // ...
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

这里无非再次调用 `defineReactive` 方法，实现新增属性的响应式

关于 `defineReactive` 方法，内部还是通过 `Object.defineProperty` 实现属性拦截

```js
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    get () {
      console.log(`get ${key}:${val}`)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log(`set ${key}:${newVal}`)
        val = newVal
      }
    }
  })
}
```

**`Object.assign()`**

直接使用Object.assign()添加到对象的新属性不会触发更新

应创建一个新的对象，合并原对象和混入对象的属性

```js
this.someObject = Object.assign({}, this.someObject, { newProperty1: 1, newProperty2: 2 })
```

**`$forceUpdate`**

如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事

`$forceUpdate` 迫使 Vue 实例重新渲染

PS：仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

**小结**

如果为对象添加少量的新属性，可以直接采用`Vue.set()`

如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象

如果你实在不知道怎么操作时，可采取`$forceUpdate()`进行强制刷新 (不建议)

## render 函数了解吗？ {#p0-render}

在Vue.js中，`render`是一个用于生成虚拟DOM（VNode）树的函数。它是Vue.js的渲染函数，负责将组件的模板转换为可渲染的VNode树。

`render`函数接收一个上下文对象作为参数，该对象包含了渲染过程中需要的数据和方法。在`render`函数中，我们可以使用Vue.js提供的模板语法（如插值表达式、指令等）来描述组件的视图结构。

`render`函数的主要作用是根据模板和组件的状态生成VNode树，其中包含了组件的结构、属性、事件等信息。通过对VNode树的创建和更新，Vue.js能够实现高效的虚拟DOM diff算法，并将变更应用到实际的DOM上，从而实现组件视图的动态更新。

在Vue.js中，`render`函数有两种使用方式：

1. 基于模板编译：Vue.js会将组件的模板编译为`render`函数。这是Vue.js的默认行为，它会在运行时将模板编译成渲染函数，并将其作为组件的`render`选项。这种方式可以方便地使用模板语法来描述组件的视图结构。

2. 手动编写：开发者可以手动编写`render`函数，而不依赖模板编译。手动编写`render`函数需要熟悉Vue.js的虚拟DOM API和JavaScript语法，可以更精细地控制组件的渲染过程。这种方式适用于需要更高级别的自定义和优化的场景。

`render` 函数是Vue.js的渲染函数，用于生成组件的虚拟DOM树。它接收上下文对象作为参数，根据模板或手动编写的代码逻辑，生成VNode树，实现组件的动态更新和渲染。

**使用示例**

当使用基于模板编译的方式时，Vue.js会将模板编译为`render`函数，并将其作为组件的`render`选项。下面是一个简单的示例：

```vue
<template>
 <div>
 <h1>{{ message }}</h1>
 <button @click="increaseCount">Click me</button>
 </div>
</template>

<script>
export default {
 data() {
 return {
 message: 'Hello, Vue!',
 count: 0
 };
 },
 methods: {
 increaseCount() {
 this.count++;
 }
 },
 render() {
 return (
 <div>
 <h1>{this.message}</h1>
 <button onClick={this.increaseCount}>Click me</button>
 </div>
 );
 }
};
</script>
```

在上面的示例中，模板中的`<template>`标签中的内容会被编译为`render`函数。在`render`函数中，使用了Vue.js的模板语法（如插值表达式和事件绑定），并将其转化为JSX语法。

注意，当使用基于模板编译的方式时，模板中的代码会被编译为`render`函数的形式，而不是直接在组件中使用模板字符串。

另外，**如果你想手动编写`render`函数**，可以在组件的`render`选项中直接编写函数逻辑。以下是手动编写`render`函数的示例：

```vue
<script>
export default {
 data() {
 return {
 message: 'Hello, Vue!',
 count: 0
 };
 },
 methods: {
 increaseCount() {
 this.count++;
 }
 },
 render(h) {
 return h('div', [
 h('h1', this.message),
 h('button', {
 on: {
 click: this.increaseCount
 }
 }, 'Click me')
 ]);
 }
};
</script>
```

在上述示例中，我们通过手动编写`render`函数，使用了Vue.js提供的`h`函数（也可以使用`createElement`函数）来创建VNode节点。这样可以更加灵活地控制组件的渲染逻辑。

无论是基于模板编译还是手动编写，`render`函数都是用来描述组件视图结构的关键部分。通过`render`函数，Vue.js能够将组件的模板或手动编写的代码转化为可执行的VNode树，实现组件的渲染和更新。

 render函数 与 template 之间关系是啥

在Vue.js中，`render`和`template`是两种定义组件视图的方式，它们之间有一定的关系。

`template`是一种更高级别的、声明式的定义组件视图的方式。通过`template`，我们可以使用Vue.js提供的模板语法，描述组件的结构、样式和交互等，例如使用插值表达式、指令、条件渲染、循环等。`template`提供了更直观、易于理解的方式来定义组件的视图。

当使用基于模板编译的方式时，Vue.js会将`template`编译为`render`函数。这个编译过程将模板转换为可执行的JavaScript代码，最终生成VNode树用于组件的渲染。所以，可以说`render`函数是由`template`转化而来的。

`render`函数是一种更底层、编程式的定义组件视图的方式。它使用JavaScript代码直接描述组件的结构，通过创建和组装VNode节点来构建组件的虚拟DOM树。通过手动编写`render`函数，我们可以更加灵活地控制组件的渲染逻辑，但也需要对Vue.js的虚拟DOM API和JavaScript语法有一定的了解。

总结来说，`template`是一种声明式的、更高级别的定义组件视图的方式，而`render`函数是一种编程式的、更底层的定义组件视图的方式。`render`函数可以通过编译`template`生成，也可以手动编写。它们都用于定义组件的视图结构，最终生成VNode树用于组件的渲染和更新。

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

## 组件通信策略和方法 {#p0-component-communicate}

 在Vue中 组件之间的通信总结

在Vue中，组件之间的通信可以通过以下几种方式实现：

1. Props/Attributes：父组件通过向子组件传递属性（props），子组件通过props接收父组件传递的数据。这是一种单向数据流的方式。

2. Events/Custom Events：子组件可以通过触发自定义事件（$emit），向父组件发送消息。父组件可以监听子组件的自定义事件，在事件回调中处理接收到的消息。

3. $refs：父组件可以通过在子组件上使用ref属性，获取子组件的实例，并直接调用子组件的方法或访问子组件的属性。

4. Event Bus：通过创建一个全局事件总线实例，可以在任何组件中触发和监听事件。组件之间可以通过事件总线进行通信。

5. Vuex：Vuex是Vue官方提供的状态管理库，用于在组件之间共享状态。组件可以通过Vuex的store来进行状态的读取和修改。

6. Provide/Inject：父组件通过provide选项提供数据，子组件通过inject选项注入数据。这样可以在跨层级的组件中进行数据传递。

 Props/Attributes

在Vue中，可以通过props和attributes来实现组件之间的通信。

1. 使用props：
 父组件可以通过props向子组件传递数据。子组件通过在props选项中声明属性来接收父组件传递的数据。

例如，父组件传递一个名为message的属性给子组件：

```html
<template>
 <div>
 <child-component :message="parentMessage"></child-component>
 </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
 components: {
 ChildComponent
 },
 data() {
 return {
 parentMessage: 'Hello from parent'
 };
 }
};
</script>
```

子组件接收并使用父组件传递的属性：

```html
<template>
 <div>
 {{ message }}
 </div>
</template>

<script>
export default {
 props: {
 message: {
 type: String,
 required: true
 }
 }
};
</script>
```

2. 使用attributes：
 父组件可以通过attributes向子组件传递数据。子组件通过$attrs属性来访问父组件传递的所有属性。

例如，父组件传递一个名为message的属性给子组件：

```html
<template>
 <div>
 <child-component message="Hello from parent"></child-component>
 </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
 components: {
 ChildComponent
 }
};
</script>
```

子组件访问父组件传递的属性：

```html
<template>
 <div>
 {{ $attrs.message }}
 </div>
</template>

<script>
export default {
 inheritAttrs: false
};
</script>
```

这些是使用props和attributes在Vue中实现组件之间通信的示例。通过props可以实现父子组件之间的单向数据流，而通过attributes可以实现更灵活的通信方式。

 Events/Custom Events

在Vue中，可以使用Events/Custom Events（事件/自定义事件）来实现组件之间的通信。以下是一个示例：

1. 在父组件中触发事件：

```html
<template>
 <div>
 <button @click="sendMessage">发送消息给子组件</button>
 <child-component @message-received="handleMessage"></child-component>
 </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
 components: {
 ChildComponent
 },
 methods: {
 sendMessage() {
 this.$emit('message-received', 'Hello from parent');
 },
 handleMessage(message) {
 console.log(message);
 }
 }
};
</script>
```

2. 在子组件中监听事件：

```html
<template>
 <div>
 <p>{{ message }}</p>
 </div>
</template>

<script>
export default {
 data() {
 return {
 message: ''
 };
 },
 mounted() {
 this.$on('message-received', this.handleMessage);
 },
 methods: {
 handleMessage(message) {
 this.message = message;
 }
 }
};
</script>
```

在这个示例中，父组件中有一个按钮，当点击按钮时会触发`sendMessage`方法，该方法通过`$emit`触发名为`message-received`的自定义事件，并传递了一个消息作为参数。

子组件中通过`$on`方法监听`message-received`事件，并在事件触发时调用`handleMessage`方法，该方法用于接收并处理接收到的消息。

通过这种方式，父组件可以通过自定义事件向子组件传递数据，子组件则可以通过监听相应的自定义事件来接收并处理父组件传递的数据。

这是使用Events/Custom Events在Vue中实现组件之间通信的示例。通过自定义事件，可以实现父子组件之间的双向通信。

 $refs

在Vue中，可以使用`$refs`来访问子组件的实例，从而进行组件之间的通信。以下是一个示例：

1. 在父组件中访问子组件的实例：

```html
<template>
 <div>
 <child-component ref="child"></child-component>
 <button @click="sendMessage">发送消息给子组件</button>
 </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
 components: {
 ChildComponent
 },
 methods: {
 sendMessage() {
 this.$refs.child.handleMessage('Hello from parent');
 }
 }
};
</script>
```

2. 子组件中的方法处理接收到的消息：

```html
<template>
 <div>
 <p>{{ message }}</p>
 </div>
</template>

<script>
export default {
 data() {
 return {
 message: ''
 };
 },
 methods: {
 handleMessage(message) {
 this.message = message;
 }
 }
};
</script>
```

在这个示例中，父组件通过在子组件上使用`ref`属性来获取子组件的实例。在父组件的`sendMessage`方法中，通过`this.$refs.child`访问子组件的实例，并调用子组件的`handleMessage`方法，将消息作为参数传递给子组件。

子组件的`handleMessage`方法接收到父组件传递的消息，并更新`message`的值。这样，父组件就可以通过`$refs`来访问子组件的实例，并调用子组件中的方法，从而实现组件之间的通信。

需要注意的是，`$refs`只能用于访问子组件的实例，在父组件中直接修改子组件的数据是不推荐的。更好的做法是在子组件中提供相应的方法，父组件通过`$refs`调用这些方法来进行通信。

 Event Bus

在Vue中，可以使用Event Bus（事件总线）来实现组件之间的通信。Event Bus是一个空的Vue实例，可以用于作为中央事件总线，用于组件之间的通信。以下是一个示例：

1. 创建一个Event Bus实例：

```javascript
// EventBus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

2. 在需要通信的组件中，使用Event Bus来发送和接收事件：

```html
<template>
 <div>
 <button @click="sendMessage">发送消息给另一个组件</button>
 </div>
</template>

<script>
import { EventBus } from './EventBus.js';

export default {
 methods: {
 sendMessage() {
 EventBus.$emit('messageReceived', 'Hello from Component A');
 }
 }
};
</script>
```

```html
<template>
 <div>
 <p>{{ message }}</p>
 </div>
</template>

<script>
import { EventBus } from './EventBus.js';

export default {
 data() {
 return {
 message: ''
 };
 },
 mounted() {
 EventBus.$on('messageReceived', (message) => {
 this.message = message;
 });
 }
};
</script>
```

在这个示例中，我们首先创建了一个Event Bus实例`EventBus`，并将其导出。然后在发送消息的组件中，通过`EventBus.$emit`方法发送一个名为`messageReceived`的事件，并传递消息作为参数。

在接收消息的组件中，通过在`mounted`钩子中使用`EventBus.$on`方法来监听`messageReceived`事件，并定义一个回调函数来处理接收到的消息。

当发送消息的组件点击按钮时，会触发`sendMessage`方法，该方法通过`EventBus.$emit`发送一个事件，并将消息作为参数传递给该事件。

在接收消息的组件中，`mounted`钩子函数会在组件挂载后执行，此时会调用`EventBus.$on`方法来监听事件。当`messageReceived`事件被触发时，回调函数中的逻辑会执行，将接收到的消息更新到`message`的值上。

这样，通过Event Bus实例，可以实现不同组件之间的通信，组件A通过发送事件，组件B通过监听事件来接收消息。

需要注意的是，使用Event Bus时需要确保事件名称唯一，并在适当的生命周期钩子中进行事件监听和解绑操作，以避免内存泄漏和不必要的事件监听。

 Vuex

在Vue中，可以使用Vuex来进行组件之间的通信。Vuex是一个专为Vue.js应用程序开发的状态管理模式。以下是一个使用Vuex进行组件之间通信的示例：

1. 安装并配置Vuex：
 安装Vuex：`npm install vuex --save`
 创建store.js文件：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    setMessage (state, payload) {
      state.message = payload
    }
  }
})
```

在main.js中引入store.js并注册：

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store.js'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

2. 在需要通信的组件中，使用Vuex来发送和接收数据：

```html
<template>
 <div>
 <button @click="sendMessage">发送消息给另一个组件</button>
 </div>
</template>

<script>
export default {
 methods: {
 sendMessage() {
 this.$store.commit('setMessage', 'Hello from Component A');
 }
 }
};
</script>
```

```html
<template>
 <div>
 <p>{{ message }}</p>
 </div>
</template>

<script>
export default {
 computed: {
 message() {
 return this.$store.state.message;
 }
 }
};
</script>
```

在这个示例中，我们首先安装并配置了Vuex。

然后，在store.js文件中，我们创建了一个store实例，并定义了一个名为message的状态和一个名为setMessage的mutation，用于更新message的值。

在发送消息的组件中，我们通过`this.$store.commit('mutationName', payload)`的形式来调用mutation，从而更新Vuex的状态。

在接收消息的组件中，我们通过计算属性来获取Vuex中的message状态，并在模板中使用该计算属性来展示消息。

这样，通过Vuex的状态管理，可以实现组件之间的通信。组件A通过调用mutation来更新状态，组件B通过计算属性来获取状态并进行展示。

需要注意的是，在实际应用中，可以根据需求来定义更多的状态和mutations，以满足组件之间的通信需求。

 Provide/Inject

在Vue中，可以使用provide/inject来实现组件之间的通信。provide和inject是Vue的高级特性，可以在祖先组件中提供数据，并在后代组件中注入数据。以下是一个使用provide/inject实现组件之间通信的示例：

父组件：

```html
<template>
 <div>
 <child-component></child-component>
 </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
 components: {
 ChildComponent
 },
 provide() {
 return {
 message: 'Hello from Parent Component'
 };
 }
};
</script>
```

子组件：

```html
<template>
 <div>
 <p>{{ injectedMessage }}</p>
 </div>
</template>

<script>
export default {
 inject: ['message'],
 computed: {
 injectedMessage() {
 return this.message;
 }
 }
};
</script>
```

在这个示例中，父组件通过provide属性提供了一个名为message的数据，值为'Hello from Parent Component'。

子组件通过inject属性注入了父组件提供的message数据，并将其存储在一个名为injectedMessage的计算属性中。

最后，子组件通过模板中的`{{ injectedMessage }}`来展示通过provide/inject传递的数据。

这样，通过provide/inject，父组件可以将数据提供给后代组件，并且后代组件可以通过注入的方式来获取这些数据，实现了组件之间的通信。

需要注意的是，provide/inject是一种上下文注入的方式，因此数据的变化会影响到所有注入了该数据的组件。在实际应用中，要谨慎使用provide/inject，确保数据的使用和变化符合预期。

通过provide/inject，可以在组件之间实现数据的传递和共享，从而实现组件之间的通信。

## v-if 和 v-show 差别

## Vue2 与 Vue3 的主要区别

* 响应式系统: Vue3 使用 Proxy 替代了 Vue2 的 Object.defineProperty，提供了更好的性能和数组监听
* Composition API: Vue3 引入组合式 API，更好地支持代码复用和逻辑组织
* 性能提升: Vue3 通过静态标记、TreeShaking 等优化提升了性能
* TypeScript 支持: Vue3 使用 TypeScript 重写，提供更好的类型支持
* Fragment: Vue3 支持多根节点组件

## vue3 的 diff 算法是什么 {#p0-diff}

Vue3的diff算法是一种用于比较虚拟DOM树之间差异的算法。它用于确定需要更新的部分，以便最小化对实际DOM的操作，从而提高性能。

Vue3的diff算法采用了一种称为"逐层比较"的策略，即从根节点开始逐层比较虚拟DOM树的节点。具体的比较过程如下：

1. 对比两棵虚拟DOM树的根节点，判断它们是否相同。如果不相同，则直接替换整个根节点及其子节点，无需进一步比较。
2. 如果根节点相同，则对比它们的子节点。这里采用了一种称为"双端比较"的策略，即同时从两棵树的头部和尾部开始比较子节点。
3. 从头部开始，依次对比两棵树的相同位置的子节点。如果两个子节点相同，则继续比较它们的子节点。
4. 如果两个子节点不同，根据一些启发式规则（如节点类型、key值等），判断是否需要替换、删除或插入子节点。
5. 继续比较下一个位置的子节点，直到两棵树的所有子节点都被比较完。

通过逐层比较和双端比较的策略，Vue3的diff算法能够高效地找到虚拟DOM树之间的差异，并只对需要更新的部分进行操作，从而减少了对实际DOM的操作次数，提高了性能。

值得注意的是，Vue3还引入了一种称为"静态标记"的优化策略，用于在编译阶段将一些静态节点标记出来，从而在diff算法中更快地跳过这些静态节点的比较，进一步提升性能。这一优化策略在处理大型列表、静态内容等场景下特别有效。

## key 的作用

* 用于 Vue 的虚拟 DOM diff 算法，帮助 Vue 准确找到对应的节点，高效地更新虚拟 DOM
* 避免"就地复用"带来的副作用，特别是在列表渲染时
* 触发组件的重新渲染

## computed 和 watch 的区别 {#p0-computed-watch}

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算，计算属性可用于快速计算视图（View）中显示的属性。这些计算将被缓存，并且只在需要时更新。computed是计算属性的; 它会根据所依赖的数据动态显示新的计算结果, 该计算结果会被缓存起来。computed的值在getter执行后是会被缓存的。如果所依赖的数据发生改变时候, 就会重新调用getter来计算最新的结果。

2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化

3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值

4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed

5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

6. 适用于一些重复使用数据或复杂及费时的运算。我们可以把它放入computed中进行计算, 然后会在computed中缓存起来, 下次就可以直接获取了。

7. 如果我们需要的数据依赖于其他的数据的话, 我们可以把该数据设计为computed中。

8. computed 是基于响应性依赖来进行缓存的。只有在响应式依赖发生改变时它们才会重新求值, 也就是说, 当msg属性值没有发生改变时, 多次访问 reversedMsg 计算属性会立即返回之前缓存的计算结果, 而不会再次执行computed中的函数。但是methods方法中是每次调用, 都会执行函数的, methods它不是响应式的。

9. computed中的成员可以只定义一个函数作为只读属性, 也可以定义成 get/set变成可读写属性, 但是methods中的成员没有这样的。

**侦听属性watch：**

1.watch它是一个对data的数据监听回调, 当依赖的data的数据变化时, 会执行回调。在回调中会传入newVal和oldVal两个参数。Vue实列将会在实例化时调用$watch(), 他会遍历watch对象的每一个属性。watch的使用场景是：当在data中的某个数据发生变化时, 我们需要做一些操作, 或者当需要在数据变化时执行异步或开销较大的操作时. 我们就可以使用watch来进行监听。watch普通监听和深度监听不支持缓存，数据变，直接会触发相应的操作；

2.watch里面有一个属性为deep，含义是：是否深度监听某个对象的值, 该值默认为false。watch支持异步；

3.监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

4.当一个属性发生变化时，需要执行对应的操作；一对多；

5.监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，

**watch 和 computed的区别是：**

相同点：他们两者都是观察页面数据变化的。

不同点：computed只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据。 watch每次都需要执行函数。watch更适用于数据变化时的异步操作。

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。这是和computed最大的区别，请勿滥用。

在 Vue 中，`computed` 和 `watch` 是两种用于监听和响应数据变化的方式。

`computed` 是计算属性，它是基于响应式数据进行计算得到的一个新的派生属性。计算属性可以接收其他响应式数据作为依赖，并且只有当依赖数据发生变化时，计算属性才会重新计算。计算属性的值会被缓存，只有在依赖数据变化时才会重新计算，这样可以提高性能。计算属性的定义方式是使用 `computed` 函数或者在 Vue 组件中使用 `get` 和 `set` 方法。

下面是一个使用计算属性的示例：

```javascript
import { reactive, computed } from 'vue'

const state = reactive({
  firstName: 'John',
  lastName: 'Doe'
})

const fullName = computed(() => {
  return `${state.firstName} ${state.lastName}`
})

console.log(fullName.value) // 输出: "John Doe"

state.firstName = 'Mike' // 修改firstName
console.log(fullName.value) // 输出: "Mike Doe"
```

`watch` 是用于监听特定响应式数据的变化，并在数据变化时执行相应的操作。`watch` 可以监听单个数据的变化，也可以监听多个数据的变化。当被监听的数据发生变化时，`watch` 的回调函数会被执行。`watch` 还支持深度监听对象的变化以及异步操作。

下面是一个使用 `watch` 的示例：

```javascript
import { reactive, watch } from 'vue'

const state = reactive({
  count: 0
})

watch(() => state.count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

state.count++ // 输出: "count 从 0 变为 1"
```

以上是 `computed` 和 `watch` 的基本用法。通过使用这两种方式，我们可以根据需要监听和响应数据的变化，实现更加灵活的逻辑和交互。

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
const config = {
  computed: {
    total () {
      return this.price * this.quantity
    }
  }
}
```

* watch 适合一个数据变化影响多个数据的场景

```javascript
// watch 示例：数据变化执行多个操作
const config = {
  watch: {
    username (newVal) {
      this.validateUsername(newVal)
      this.checkAvailability(newVal)
      this.updateUserProfile(newVal)
    }
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

## ref、toRef 和 toRefs 有啥区别？{#p0-ref-toref-torefs}

在 Vue 3 中，`ref`、`toRef` 和 `toRefs` 是 Vue Composition API 提供的函数，用于处理响应式数据。

1. `ref(value: T): Ref<T>`：创建一个响应式数据引用。接收一个初始值作为参数，并返回一个包含该值的响应式引用。`Ref` 是一个包装对象，它的 `.value` 属性用于访问和修改引用的值。

使用 `ref` 创建响应式数据引用：

```javascript
import { ref } from 'vue'

const count = ref(0) // 创建一个初始值为 0 的响应式引用

console.log(count.value) // 输出: 0

count.value++ // 修改引用的值
console.log(count.value) // 输出: 1
```

2. `toRef(object: object, key: string | symbol): ToRef`：创建一个指向另一个响应式对象的响应式引用。接收一个响应式对象和其属性名作为参数，并返回一个指向该属性的响应式引用。`ToRef` 是一个只读的响应式引用。

使用 `toRef` 创建指向另一个响应式对象的引用：

```javascript
import { ref, reactive, toRef } from 'vue'

const state = reactive({
  name: 'John',
  age: 30
})

const nameRef = toRef(state, 'name') // 创建指向 state.name 的引用

console.log(nameRef.value) // 输出: "John"

state.name = 'Mike' // 修改原始对象的属性值
console.log(nameRef.value) // 输出: "Mike"

nameRef.value = 'Amy' // 修改引用的值
console.log(state.name) // 输出: "Amy"
```

3. `toRefs(object: T): ToRefs<T>`：将一个响应式对象的所有属性转换为响应式引用。接收一个响应式对象作为参数，并返回一个包含所有属性的响应式引用对象。`ToRefs` 是一个对象，每个属性都是一个只读的响应式引用。

使用 `toRefs` 将对象的所有属性转换为响应式引用：

```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  name: 'John',
  age: 30
})

const refs = toRefs(state) // 将 state 中的所有属性转换为响应式引用

console.log(refs.name.value) // 输出: "John"
console.log(refs.age.value) // 输出: 30

state.name = 'Mike' // 修改原始对象的属性值
console.log(refs.name.value) // 输出: "Mike"

refs.age.value = 25 // 修改引用的值
console.log(state.age) // 输出: 25
```

这些函数是 Vue 3 Composition API 中用于创建和处理响应式数据的重要工具。通过它们，我们可以更灵活地管理和使用响应式数据。

## Vue2.0 和 Vue3.0 有什么区别 {#p0-vue2-vue3}

1. 响应式系统的重新配置，使用proxy替换Object.defineProperty
2. typescript支持
3. 新增组合API，更好的逻辑重用和代码组织
4. v-if和v-for的优先级
5. 静态元素提升
6. 虚拟节点静态标记
7. 生命周期变化
8. 打包体积优化
9. ssr渲染性能提升
10. 支持多个根节点

* 参考文档: [资料](https://juejin.cn/post/6858558735695937544)

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

```ts
import { defineStore } from 'pinia'

interface CartItem {
  id: number;
  name: string;
  price: number;
  }

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  })
// ...
})
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

```ts
// en.js
const enTranslations = {
  greetings: {
    hello: 'Hello!'
  }
}

// export default enTranslations

// zh.js
const zhTranslations = {
  greetings: {
    hello: '你好！'
  }
}

// export default zhTranslations
```

在项目的入口文件（通常是`main.js`或`main.ts`）中：

```js
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

## useTemplateRef {#p2-use-template-ref}

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

## 你做过哪些性能优化 {#vue-profile}

1、`v-if`和`v-show`

* 频繁切换时使用`v-show`，利用其缓存特性
* 首屏渲染时使用`v-if`，如果为`false`则不进行渲染

2、`v-for`的`key`

* 列表变化时，循环时使用唯一不变的`key`，借助其本地复用策略
* 列表只进行一次渲染时，`key`可以采用循环的`index`

3、侦听器和计算属性

* 侦听器`watch`用于数据变化时引起其他行为
* 多使用`compouter`计算属性顾名思义就是新计算而来的属性，如果依赖的数据未发生变化，不会触发重新计算

4、合理使用生命周期

* 在`destroyed`阶段进行绑定事件或者定时器的销毁
* 使用动态组件的时候通过`keep-alive`包裹进行缓存处理，相关的操作可以在`actived`阶段激活

5、数据响应式处理

* 不需要响应式处理的数据可以通过`Object.freeze`处理，或者直接通过`this.xxx = xxx`的方式进行定义
* 需要响应式处理的属性可以通过`this.$set`的方式处理，而不是`JSON.parse(JSON.stringify(XXX))`的方式

6、路由加载方式

* 页面组件可以采用异步加载的方式

7、插件引入

* 第三方插件可以采用按需加载的方式，比如`element-ui`。

8、减少代码量

* 采用`mixin`的方式抽离公共方法
* 抽离公共组件
* 定义公共方法至公共`js`中
* 抽离公共`css`

9、编译方式

* 如果线上需要`template`的编译，可以采用完成版`vue.esm.js`
* 如果线上无需`template`的编译，可采用运行时版本`vue.runtime.esm.js`，相比完整版体积要小大约`30%`

10、渲染方式

* 服务端渲染，如果是需要`SEO`的网站可以采用服务端渲染的方式
* 前端渲染，一些企业内部使用的后端管理系统可以采用前端渲染的方式

11、字体图标的使用

* 有些图片图标尽可能使用字体图标

## 3.x 中 app.config 有哪些应用配置？ {#p4-app-config-has-which-application-configuration}

确实，在 Vue 3 中，`app.config` 提供了一系列的应用级别的配置选项，用于自定义或调整 Vue 应用的行为。你提到的这些配置项都是 `app.config` 的一部分，下面是关于它们的详细介绍：

 `app.config.errorHandler`

* **作用**：为未捕获的异常定义一个全局的处理函数。这在集中处理组件渲染或观察者(watchers)中的异常时非常有用。
* **示例**：

```js
// app.config.errorHandler = (err, instance, info) => {
//   // 处理错误
//   console.log('nop')
// }
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

## 路由守卫 {#p0-router-guide}

路由守卫是 Vue Router 提供的一种机制，用于在路由导航过程中对路由进行拦截和控制。通过使用路由守卫，我们可以在路由导航前、导航后、导航中断等不同的阶段执行相应的逻辑。

Vue Router 提供了三种类型的路由守卫：

1. 全局前置守卫（Global Before Guards）：在路由切换之前被调用，可以用于进行全局的权限校验或者路由跳转拦截等操作。

2. 路由独享守卫（Per-Route Guards）：在特定的路由配置中定义的守卫。这些守卫只会在当前路由匹配成功时被调用。

3. 组件内的守卫（In-Component Guards）：在组件实例内部定义的守卫。这些守卫可以在组件内部对路由的变化进行相应的处理。

* 全局前置守卫

```js
router.beforeEach((to, from, next) => {
  // to: 即将进入的目标
  // from:当前导航正要离开的路由
  return false // 返回false用于取消导航
  // return { name: 'Login' } // 返回到对应name的页面
  // next({ name: 'Login' }) // 进入到对应的页面
  // next() // 放行
})
```

* 全局解析守卫:类似beforeEach

```js
router.beforeResolve(to => {
  if (to.meta.canCopy) {
    return false // 也可取消导航
  }
})
```

* 全局后置钩子

```js
router.afterEach((to, from) => {
  logInfo(to.fullPath)
})
```

* 导航错误钩子，导航发生错误调用

```js
router.onError(error => {
  logError(error)
})
```

* 路由独享守卫,beforeEnter可以传入单个函数，也可传入多个函数。

```js
function dealParams (to) {
  // ...
}
function dealPermission (to) {
  // ...
}

const routes = [
  {
    path: '/home',
    component: Home,
    beforeEnter: (to, from) => {
      return false // 取消导航
    }
    // beforeEnter: [dealParams, dealPermission]
  }
]
```

组件内的守卫

```js
const Home = {
  template: '...',
  beforeRouteEnter (to, from) {
    // 此时组件实例还未被创建，不能获取this
  },
  beforeRouteUpdate (to, from) {
    // 当前路由改变，但是组件被复用的时候调用，此时组件已挂载好
  },
  beforeRouteLeave (to, from) {
    // 导航离开渲染组件的对应路由时调用
  }
}
```

## 中为何不要把 v-if 和 v-for 同时用在同一个元素上， 原理是什么？ {#p0-v-if-v-for}

确实，将`v-if`和`v-for`同时用在同一个元素上可能会导致性能问题。**原因在于`v-for`具有比`v-if`更高的优先级，它会在每次渲染的时候都会运行**。这意味着，即使在某些情况下`v-if`的条件为`false`，`v-for`仍然会对数据进行遍历和渲染。

这样会导致一些不必要的性能消耗，特别是当数据量较大时。Vue在渲染时会尽量复用已经存在的元素，而不是重新创建和销毁它们。但是当`v-for`遍历的数据项发生变化时，Vue会使用具有相同`key`的元素，此时`v-if`的条件可能会影响到之前的元素，导致一些不符合预期的行为。

让我们来看一个具体的例子来说明这个问题。

假设我们有以下的Vue模板代码：

```html
<ul>
 <li v-for="item in items" v-if="item.isActive">{{ item.name }}</li>
</ul>
```

这里我们使用`v-for`来循环渲染`items`数组，并且使用`v-if`来判断每个数组项是否是活动状态。现在，让我们看一下Vue的源码，特别是与渲染相关的部分。

在Vue的渲染过程中，它会将模板解析为AST（抽象语法树），然后将AST转换为渲染函数。对于上面的模板，渲染函数大致如下：

```javascript
function render () {
  return _c(
    'ul',
    null,
    _l(items, function (item) {
      return item.isActive ? _c('li', null, _v(_s(item.name))) : _e()
    })
  )
}
```

上面的代码中，`_l`是由`v-for`指令生成的渲染函数。它接收一个数组和一个回调函数，并在每个数组项上调用回调函数。回调函数根据`v-if`条件来决定是否渲染`li`元素。

问题出在这里：由于`v-for`的优先级比`v-if`高，所以每次渲染时都会执行`v-for`循环，无论`v-if`的条件是否为`false`。这意味着即使`item.isActive`为`false`，Vue仍然会对它进行遍历和渲染。

此外，Vue在渲染时会尽量复用已经存在的元素，而不是重新创建和销毁它们。但是当`v-for`遍历的数据项发生变化时，Vue会使用具有相同`key`的元素。在上面的例子中，如果`item.isActive`从`true`变为`false`，Vue会尝试复用之前的`li`元素，并在其上应用`v-if`条件。这可能会导致一些不符合预期的行为。

为了避免这种性能问题，Vue官方推荐在同一个元素上不要同时使用`v-if`和`v-for`。如果需要根据条件来决定是否渲染循环的元素，可以考虑使用计算属性或者`v-for`的过滤器来处理数据。或者，将条件判断放在外层元素上，内层元素使用`v-for`进行循环渲染，以确保每次渲染时都能正确地应用`v-if`条件。

## 异常处理机制有哪些 {#p0-exception-process}

Vue的错误处理机制主要包括以下几个方面：

1. `Error Capturing（错误捕获）`：Vue提供了全局错误处理的钩子函数`errorCaptured`，可以在组件层级中捕获子组件产生的错误。通过在父组件中使用`errorCaptured`钩子函数，可以捕获子组件中的错误，并对其进行处理或展示错误信息。

2. `Error Boundary（错误边界）`：Vue 2.x中没有内置的错误边界机制，但你可以通过自定义组件来实现。错误边界是一种特殊的组件，它可以捕获并处理其子组件中的错误。错误边界组件使用`errorCaptured`钩子函数来捕获子组件中的错误，并使用`v-if`或`v-show`等指令来显示错误信息或替代内容。

3.`异常处理`：在Vue组件的生命周期钩子函数中，可以使用`try-catch`语句捕获并处理可能出现的异常。例如，在`mounted`钩子函数中进行接口请求，可以使用`try-catch`来捕获请求过程中的异常，并进行相应的处理。

4. `错误提示和日志记录`：在开发环境中，Vue会在浏览器的控制台中输出错误信息，以方便开发者进行调试。在生产环境中，可以使用日志记录工具（如Sentry）来记录错误信息，以便及时发现和解决问题。

**代码举例**

以下是使用代码举例说明以上四种Vue错误处理方式的示例：

1. Error Capturing（错误捕获）：

```vue
// ParentComponent.vue
<template>
 <div>
 <ChildComponent />
 <div v-if="error">{{ error }}</div>
 </div>
</template>

<script>
export default {
 data() {
 return {
 error: null
 };
 },
 errorCaptured(err, vm, info) {
 this.error = err.toString(); // 将错误信息存储在父组件的data中
 return false; // 阻止错误继续向上传播
 }
};
</script>
```

2. Error Boundary（错误边界）：

```vue
// ErrorBoundary.vue
<template>
 <div v-if="hasError">
 Oops, something went wrong.
 <button @click="resetError">Retry</button>
 </div>
 <div v-else>
 <slot></slot>
 </div>
</template>

<script>
export default {
 data() {
 return {
 hasError: false
 };
 },
 errorCaptured() {
 this.hasError = true;
 return false;
 },
 methods: {
 resetError() {
 this.hasError = false;
 }
 }
};
</script>

// ParentComponent.vue
<template>
 <div>
 <ErrorBoundary>
 <ChildComponent />
 </ErrorBoundary>
 </div>
</template>
```

3. 异常处理：

```vue
// ChildComponent.vue
<template>
 <div>{{ data }}</div>
</template>

<script>
export default {
 data() {
 return {
 data: null
 };
 },
 mounted() {
 try {
 // 模拟接口请求
 const response = await fetch('/api/data');
 this.data = await response.json();
 } catch (error) {
 console.error(error); // 处理异常，输出错误信息
 }
 }
};
</script>
```

4. 错误提示和日志记录：

```javascript
// main.js
import Vue from 'vue'
import Sentry from '@sentry/browser'

Vue.config.errorHandler = (err) => {
  console.error(err) // 错误提示
  Sentry.captureException(err) // 错误日志记录
}

new Vue({
  // ...
}).$mount('#app')
```

上述代码中，`Error Capturing`通过在父组件中的`errorCaptured`钩子函数中捕获子组件的错误，并展示在父组件中。`Error Boundary`通过自定义错误边界组件，在子组件发生错误时展示错误信息或替代内容。`异常处理`通过在子组件的生命周期钩子函数中使用`try-catch`语句来捕获异常并进行处理。`错误提示和日志记录`通过在`Vue.config.errorHandler`中定义全局的错误处理函数，将错误信息输出到控制台，并使用Sentry等工具记录错误日志。

这些示例展示了不同的错误处理方式，可以根据实际需求选择合适的方式来处理Vue应用中的错误。

## vue3 相比较于 vue2 在编译阶段有哪些改进 {#p0-vue-compiler}

Vue 3 在编译阶段相对于 Vue 2 进行了一些重要的改进，主要包括以下几个方面：

1. 静态模板提升（Static Template Hoisting）：Vue 3 引入了静态模板提升技术，通过对模板进行分析和优化，将模板编译为更简洁、更高效的渲染函数。这种优化可以减少不必要的运行时开销，并提高组件的渲染性能。

2. Fragments 片段支持：Vue 3 支持使用 Fragments 片段来包裹多个根级元素，而不需要额外的父元素。这样可以避免在编译阶段为每个组件生成额外的包裹元素，减少了虚拟 DOM 树的层级，提高了渲染性能。

3. 静态属性提升（Static Props Hoisting）：Vue 3 在编译阶段对静态属性进行了优化，将静态属性从渲染函数中提取出来，只在组件初始化时计算一次，并在后续的渲染中重用。这样可以减少不必要的属性计算和传递，提高了组件的渲染性能。

4. 事件处理函数的内联化：Vue 3 在编译阶段对事件处理函数进行了内联化，将事件处理函数直接写入模板中，而不是在运行时动态生成。这样可以减少运行时的事件绑定和查找开销，提高了事件处理的性能。

5. 静态节点提升（Static Node Hoisting）：Vue 3 通过静态节点提升技术，将静态的节点在编译阶段进行处理，避免了在每次渲染时对静态节点的比对和更新操作，提高了渲染性能。

6. 缓存事件处理器（Cached Event Handlers）：Vue 3 在编译阶段对事件处理器进行了缓存，避免了重复创建事件处理函数的开销。对于相同的事件处理器，只会创建一次，并在组件的生命周期中重复使用，减少了内存占用和运行时开销。

7. 更细粒度的组件分割（Fine-Grained Component Splitting）：Vue 3 支持更细粒度的组件分割，可以将组件的模板、脚本和样式进行独立的编译和加载，以实现更好的代码拆分和按需加载，提高了应用的加载速度和性能。

这些改进使得 Vue 3 在编译阶段能够生成更优化的代码，减少了不必要的运行时开销，并提高了组件的渲染性能和整体的运行效率。

## vue 是如何识别和解析指令 {#p0-diretive}

vue 是如何识别和解析指令的， 详细解释一下

Vue.js在识别和解析指令时，使用了编译器（Compiler）来完成这个过程。下面是Vue.js识别和解析指令的详细步骤：

1. 解析模板：首先，Vue.js会将模板代码转换为抽象语法树（AST）。这个过程由Vue.js的编译器完成。编译器会遍历模板代码，将其解析成一棵抽象语法树，该树表示了模板的结构和各个元素之间的关系。

2. 识别指令：在遍历抽象语法树的过程中，编译器会识别出模板中的指令。指令通常以`v-`开头，例如`v-if`、`v-for`、`v-bind`、`v-on`等。编译器会根据指令的名称和位置来确定它们的作用。

3. 提取指令参数和修饰符：对于识别出的指令，编译器会进一步提取指令的参数和修饰符。指令参数通常是指令名称后面的表达式或变量，用于指定指令的具体行为。修饰符是一些额外的标识符，用于修改指令的行为或增加一些特定功能。

4. 解析指令表达式：针对具有表达式的指令，编译器会解析指令表达式并生成对应的代码。指令表达式通常是模板中的变量或计算属性，用于动态地绑定数据到指令上。编译器会将指令表达式转化为可执行的JavaScript代码，以便在运行时进行数据绑定。

5. 生成渲染函数：最后，编译器将解析后的模板和指令转换为渲染函数。渲染函数是一个JavaScript函数，它接收数据作为参数，并返回一个虚拟DOM（VNode）树，用于渲染组件的视图。渲染函数包含了对指令的执行逻辑和对模板变量的处理。

Vue.js通过编译器对模板进行解析，识别和解析指令，并将其转化为渲染函数。这个过程包括解析模板、识别指令、提取参数和修饰符、解析指令表达式，最终生成渲染函数。通过渲染函数，Vue.js能够根据数据的变化动态更新组件的视图。

 上述指令中，例如 v-bind 是如何映射到具体可执行方法的？

在 Vue.js 中，指令的执行是通过渲染函数来实现的。指令对应的可执行方法会在渲染函数中生成，并在组件渲染时执行。下面以`v-bind`指令为例，解释它是如何映射到具体可执行方法的：

1. 解析指令：在编译模板时，Vue.js的编译器会识别到`v-bind`指令。

2. 提取指令参数和修饰符：编译器会进一步提取`v-bind`指令的参数和修饰符。对于`v-bind`，参数通常是要绑定的属性名或表达式，用于将数据绑定到对应的属性上。

3. 解析指令表达式：对于`v-bind`指令，表达式通常是要绑定的数据或计算属性。编译器会解析指令表达式，并生成对应的代码。

4. 生成渲染函数：在生成渲染函数的过程中，编译器会根据解析得到的指令信息生成可执行的JavaScript代码。对于`v-bind`，编译器会在渲染函数中生成一个函数调用，该函数会将指令参数和表达式所代表的值绑定到对应的属性上。

5. 渲染时执行：在组件渲染时，渲染函数会被调用，并执行其中的代码。对于`v-bind`，生成的函数调用会在渲染函数执行时被触发，将绑定的数据或计算属性的值应用到对应的属性上。

在渲染函数执行时，生成的函数调用会被触发，将绑定的数据或计算属性的值应用到对应的属性上。通过这种方式，`v-bind`指令实现了将数据动态绑定到属性上的功能。其他指令的执行原理也类似，通过编译器将指令解析为可执行的代码，并在渲染函数执行时进行相应的操作。

## Vuex redux {#p0-redux-vuex}

Redux和Vuex都是用于在前端应用中管理状态的JavaScript库。它们的设计思想都基于Flux架构，强调单向数据流的概念，以避免数据的混乱和不可预测的状态变化。

Redux的设计思想可以总结为三个原则：

1. 单一数据源：Redux中所有的状态数据都保存在单一的store对象中，便于管理和维护。

2. 状态只读：Redux的状态数据是只读的，唯一的改变方式是通过dispatch一个action来触发reducer函数对状态进行更新。

3. 纯函数更新状态：Redux的reducer函数必须是纯函数，即接收一个旧的状态和一个action对象，返回一个新的状态。通过这种方式，Redux保证了状态的可控和可预测性。

Vuex的设计思想类似于Redux，但又有所不同：

1. 单一数据源：Vuex也采用了单一数据源的思想，将所有状态保存在store对象中。

2. 显示状态修改：和Redux不同的是，Vuex允许组件直接修改状态，但这必须是通过commit一个mutation来实现的，mutation也必须是同步的。

3. 模块化：Vuex提供了模块化机制，可以将store对象分解成多个模块，以提高可维护性和代码复用性。

Redux和Vuex都是通过一些基本概念来实现状态管理：

1. Store：保存状态的对象，整个应用只有一个Store。

2. Action：描述状态变化的对象，由View层发起。

3. Reducer：一个纯函数，接收旧的状态和一个Action对象，返回新的状态。

4. Dispatch：一个函数，用来触发Action。

5. Mutation：类似于Redux的Reducer，但必须是同步的。用来更新状态。

总之，Redux和Vuex都是优秀的状态管理库，通过它们可以有效地管理前端应用的状态，实现数据的单向流动和可预测性。同时，Redux和Vuex都遵循了Flux架构的设计思想，使得状态管理更加规范化和可控。
