# 钩子

## hooks {#p0-hooks}

在探索 useEffect 原理的时候，一直被一个问题困扰：useEffect 作用和用途是什么？当然，用于函数的副作用这句话谁都会讲。举个例子吧：

```tsx
function App () {
  const [num, setNum] = useState(0)

  useEffect(() => {
    // 模拟异步请求后端数据
    setTimeout(() => {
      setNum(num + 1)
    }, 1000)
  }, [])

  return <div>{!num ? '请求后端数据...' : `后端数据是 ${num}`}</div>
}
```

这段代码，虽然这样组织可读性更高，毕竟可以将这个请求理解为函数的副作用。**但这并不是必要的**。完全可以不使用`useEffect`，直接使用`setTimeout`，并且它的回调函数中更新函数组件的 state。

在 useEffect 的第二个参数中，我们可以指定一个数组，如果下次渲染时，数组中的元素没变，那么就不会触发这个副作用（可以类比 Class 类的关于 nextprops 和 prevProps 的生命周期）。好处显然易见，**相比于直接裸写在函数组件顶层，useEffect 能根据需要，避免多余的 render**。

下面是一个不包括销毁副作用功能的 useEffect 的 TypeScript 实现：

```tsx
// 还是利用 Array + Cursor的思路
const allDeps: any[][] = []
let effectCursor = 0

function useEffect (callback: () => void, deps: any[]) {
  if (!allDeps[effectCursor]) {
    // 初次渲染：赋值 + 调用回调函数
    allDeps[effectCursor] = deps
    ++effectCursor
    callback()
    return
  }

  const currenEffectCursor = effectCursor
  const rawDeps = allDeps[currenEffectCursor]
  // 检测依赖项是否发生变化，发生变化需要重新render
  const isChanged = rawDeps.some(
    (dep: any, index: number) => dep !== deps[index]
  )
  if (isChanged) {
    callback()
    allDeps[effectCursor] = deps // 感谢 juejin@carlzzz 的指正
  }
  ++effectCursor
}

function render () {
  ReactDOM.render(<App />, document.getElementById('root'))
  effectCursor = 0 // 注意将 effectCursor 重置为0
}
```

对于 useEffect 的实现，配合下面案例的使用会更容易理解。当然，你也可以在这个 useEffect 中发起异步请求，并在接受数据后，调用 state 的更新函数，不会发生爆栈的情况。

```tsx
function App () {
  const [num, setNum] = useState < number > 0
  const [num2] = useState < number > 1

  // 多次触发
  // 每次点击按钮，都会触发 setNum 函数
  // 副作用检测到 num 变化，会自动调用回调函数
  useEffect(() => {
    console.log('num update: ', num)
  }, [num])

  // 仅第一次触发
  // 只会在compoentDidMount时，触发一次
  // 副作用函数不会多次执行
  useEffect(() => {
    console.log('num2 update: ', num2)
  }, [num2])

  return (
 <div>
 <div>num: {num}</div>
 <div>
 <button onClick={() => setNum(num + 1)}>加 1</button>
 <button onClick={() => setNum(num - 1)}>减 1</button>
 </div>
 </div>
  )
}
```

useEffect 第一个回调函数可以返回一个用于销毁副作用的函数，相当于 Class 组件的 unmount 生命周期。这里为了方便说明，没有进行实现。

参考文档：

* [资料](https://juejin.cn/post/6844903975838285838)

* useState
* useEffect
* useContext
* useReducer
* useMemo
* useCallback
* useRef
* useImperativeHandle
* useLayoutEffect
* useDebugValue

 React v18中的hooks

* useSyncExternalStore

* useTransition
* useDeferredValue
* useInsertionEffect
* useId

 简单介绍一下 react 18 新增的 hooks

 useSyncExternalStore

`useSyncExternalStore`:是一个推荐用于**读取和订阅外部数据源**的 `hook`，其方式与选择性的 `hydration` 和时间切片等并发渲染功能兼容

```js
const state = useSyncExternalStore(
  subscribe,
  getSnapshot[getServerSnapshot]
)
```

* `subscribe`: 订阅函数，用于注册一个回调函数，**当存储值发生更改时被调用**。此外， `useSyncExternalStore` 会通过带有记忆性的 `getSnapshot` 来判别数据是否发生变化，如果发生变化，那么会**强制更新数据**。
* `getSnapshot`: 返回当前存储值的函数。必须返回缓存的值。如果 `getSnapshot` 连续多次调用，则必须返回相同的确切值，除非中间有存储值更新。
* `getServerSnapshot`：返回服务端(hydration模式下)渲染期间使用的存储值的函数

---

 useTransition

> `useTransition`：
>
>返回一个**状态值**表示过渡任务的等待状态，
>以及一个启动该过渡任务的函数。

**过渡任务** 在一些场景中，如：`输入框`、`tab切换`、`按钮`等，这些任务需要视图上立刻做出响应，这些任务可以称之为**立即更新的任务**

但有的时候，更新任务并不是那么紧急，或者来说要去请求数据等，导致新的状态不能立马更新，需要用一个`loading...`的等待状态，这类任务就是过度任务

```javascript
const [isPending, startTransition] = useTransition()
```

* `isPending`：**过渡状态的标志**，为`true`时是等待状态
* `startTransition`：可以**将里面的任务变成过渡任务**

---

 useDeferredValue

> `useDeferredValue`：接受一个值，并返回该值的新副本，该副本将**推迟**到更紧急地更新之后。

如果当前渲染是一个紧急更新的结果，比如用户输入，`React` 将**返回之前的值**，然后**在紧急渲染完成后渲染新的值**。

也就是说`useDeferredValue`可以让状态滞后派生。

```javascript
const deferredValue = useDeferredValue(value)
```

* `value`：可变的值，如`useState`创建的值
* `deferredValue`: 延时状态

> **useTransition和useDeferredValue做个对比**
>
>相同点：`useDeferredValue` 和 `useTransition` 一样，都是**过渡更新任务**
>不同点：`useTransition` 给的是一个**状态**，而`useDeferredValue`给的是一个**值**

---

 useInsertionEffect

`useInsertionEffect`：与 `useLayoutEffect` 一样，但它在所有 DOM 突变之前**同步触发**

在执行顺序上 `useInsertionEffect` > `useLayoutEffect` > `useEffect`

> `seInsertionEffect` 应仅限于 `css-in-js` 库作者使用。
> 优先考虑使用 `useEffect` 或 `useLayoutEffect` 来替代。

---

 useId

`useId` ： 是一个**用于生成横跨服务端和客户端的稳定的唯一 ID** 的同时避免`hydration`不匹配的 hook。

---

 参考文档

* [资料](https://juejin.cn/post/7118937685653192735)

**hooks 和 memorizedState 之间的关系**

在React中，Hooks是一种特殊的函数，用于在函数组件中添加和管理状态以及其他React特性。而`memorizedState`是React内部用于存储和管理Hooks状态的数据结构。

当你在函数组件中使用Hooks（如`useState`、`useEffect`等）时，React会在组件首次渲染时创建一个`memorizedState`链表。这个链表中的节点包含了组件的各个状态值。

每个节点都包含了两个重要的属性：`memoizedState`和`next`。`memoizedState`是该节点对应的状态值，而`next`是指向下一个节点的指针。这样就形成了一个链表，其中的节点对应于组件中的不同状态。

当组件重新渲染时，React会通过`memorizedState`链表找到与组件对应的节点，并将其中的状态值返回给组件。当调用状态更新的函数时，React会在`memorizedState`链表中找到与组件对应的节点，并将其中的状态值更新为新的值。

因此，Hooks和`memorizedState`是紧密相关的，Hooks通过`memorizedState`实现了状态的管理和更新。这种关系使得在函数组件中使用Hooks能够实现声明式的、可持久的状态管理，并且方便React进行性能优化。

**hooks 和 memorizedState 是怎么关联起来的？**

在React中，Hooks和`memorizedState`通过一种特殊的数据结构关联起来，这个数据结构被称为Fiber节点。

每个函数组件都对应一个Fiber节点，Fiber节点中包含了组件的各种信息，包括组件的状态（`memorizedState`）、props、子节点等。

当一个函数组件被调用时，React会创建一个新的Fiber节点，并将其与函数组件关联起来。在这个Fiber节点中，React会通过`memoizedState`属性存储组件的状态值。

当函数组件重新渲染时，React会更新对应的Fiber节点。在更新过程中，React会根据函数组件中的Hooks调用顺序，遍历`memorizedState`链表中的节点。

React会根据Hooks调用的顺序，将当前的`memorizedState`链表中的节点与新的Hooks调用结果进行比较，并更新`memoizedState`中的值。

这个过程中，React会使用一些算法来比较和更新`memorizedState`链表中的节点，以确保状态的正确性和一致性。例如，React可能会使用链表的插入、删除、移动等操作来更新`memorizedState`链表。

通过这样的机制，Hooks和`memorizedState`实现了状态的管理和更新。Hooks提供了一种声明式的方式，让我们能够在函数组件中使用和更新状态，而`memorizedState`则是React内部用于存储和管理这些状态的数据结构。

**useState 和 memorizedState 状态举例**

当组件首次渲染时（mount阶段），React会创建一个新的Fiber节点，并在其中创建一个`memorizedState`来存储`useState` hook的初始值。这个`memorizedState`会被添加到Fiber节点的`memoizedState`属性中。

在更新阶段（update阶段），当组件重新渲染时，React会通过比较前后两次渲染中的`memorizedState`来判断状态是否发生了变化。

React会根据`useState` hook的调用顺序来确定`memorizedState`的位置。例如，在一个组件中多次调用了`useState` hook，React会按照调用的顺序在`memoizedState`属性中创建对应的`memorizedState`。

举一个例子，假设我们有一个表单组件，其中使用了两个`useState` hook来存储用户名和密码的值：

```jsx
import React, { useState } from 'react';

function LoginForm() {
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 return (
 <form>
 <input
 type="text"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 <button type="submit">Submit</button>
 </form>
 );
}
```

在这个例子中，我们在组件函数中分别调用了两次`useState` hook，创建了`username`和`password`这两个状态。

在首次渲染时（mount阶段），React会为每一个`useState` hook创建一个`memorizedState`对象，并将它们存储在组件的Fiber节点的`memoizedState`属性中。

当我们输入用户名或密码并触发onChange事件时，React会进入更新阶段（update阶段）。在这个阶段，React会比较前后两次渲染中的`memorizedState`，并根据变化的状态来更新UI。

React会比较`username`和`password`的旧值和新值，如果有变化，会更新对应的Fiber节点中的`memoizedState`，然后重新渲染组件，并将最新的`username`和`password`值传递给相应的input元素。

通过比较`memorizedState`，React能够检测到状态的变化，并只更新发生变化的部分，以提高性能和优化渲染过程。

## lifecycle {#p0-lifecycle}

分别是： `v16.0前` 和 `v16.4`

 v16.0 前

![1](https://foruda.gitee.com/images/1682257247128664078/b5848c64_7819612.png)

总共分为**四大阶段**：

1. `{初始化| Intialization}`
2. `{挂载| Mounting}`
3. `{更新| Update}`
4. `{卸载| Unmounting}`

 Intialization(初始化）

在初始化阶段,会用到 `constructor()` 这个构造函数，如：

```js
// constructor(props) {
//  super(props);
// }
```

* `super`的作用
用来调用*基类*的构造方法( `constructor()` ),
也**将父组件的`props`注入给子组件，供子组件读取**
* 初始化操作，定义`this.state`的初始内容
* **只会执行一次**

---

 Mounting(挂载）（3个）

1. `componentWillMount`：**在组件挂载到`DOM`前调用**

这里面的调用的`this.setState`不会引起组件的重新渲染，也可以把写在这边的内容提到`constructor()`，所以在项目中很少。
**只会调用一次**
2. `render`: 渲染
只要`props`和`state`发生改变（无论值是否有变化,两者的重传递和重赋值，都可以引起组件重新`render`），`都会重新渲染render`。
`return`：**是必须的，是一个React元素**，不负责组件实际渲染工作，由`React`自身根据此元素去渲染出`DOM`。
`render` 是**纯函数**，不能执行`this.setState`。
3. `componentDidMount`：**组件挂载到`DOM`后调用**

**调用一次**

---

 Update(更新)（5个）

1. `componentWillReceiveProps(nextProps)`:调用于`props`引起的组件更新过程中

`nextProps`：父组件传给当前组件新的`props`
可以用`nextProps`和`this.props`来查明重传`props`是否发生改变（原因：不能保证父组件重传的`props`有变化）
只要`props`发生变化就会，引起调用

2. `shouldComponentUpdate(nextProps, nextState)`：用于性能优化

`nextProps`：当前组件的`this.props`
`nextState`：当前组件的`this.state`
通过比较`nextProps`和`nextState`,来判断当前组件是否有必要继续执行更新过程。
返回`false`：表示停止更新，用于减少组件的不必要渲染，优化性能
返回`true`：继续执行更新
像`componentWillReceiveProps（）`中执行了`this.setState`，更新了`state`，但**在`render`前**(如`shouldComponentUpdate`，`componentWillUpdate`)，`this.state`依然指向更新前的state，不然`nextState`及当前组件的`this.state`的对比就一直是`true`了

3. `componentWillUpdate(nextProps, nextState)`：组件更新前调用

在`render`方法前执行
由于组件更新就会调用，所以一般很少使用

4. `render`：重新渲染

5. `componentDidUpdate(prevProps, prevState)`：组件更新后被调用

`prevProps`：组件更新前的`props`
`prevState`：组件更新前的`state`
可以操作组件更新的DOM

---

 Unmounting(卸载)（1个）

`componentWillUnmount`：组件被卸载前调用

可以在这里执行一些**清理工作**，比如清除组件中使用的*定时器*，清除`componentDidMount`中*手动创建的DOM元素*等，以避免引起内存泄漏

---

 React v16.4

![2](https://foruda.gitee.com/images/1682257393147988566/aa702114_7819612.png)

与 `v16.0`的生命周期相比

* 新增了 -- （两个`getXX`）

 1. `getDerivedStateFromProps`
 2. `getSnapshotBeforeUpdate`

* 取消了 -- (三个`componmentWillXX`)

 1. `componentWillMount`、
 2. `componentWillReceiveProps`、
 3. `componentWillUpdate`

 getDerivedStateFromProps

`getDerivedStateFromProps(prevProps, prevState)`：组件创建和更新时调用的方法

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

> 在`React v16.3`中，在创建和更新时，只能是由父组件引发才会调用这个函数，在`React v16.4`改为无论是`Mounting`还是`Updating`，全部都会调用。

是一个静态函数，也就是这个函数不能通过`this`访问到`class`的属性。

> 如果`props`传入的内容不需要影响到你的`state`，那么就需要返回一个`null`，这个**返回值是必须的**，所以尽量将其写到函数的末尾。

在组件创建时和更新时的render方法之前调用，它应该

* 返回一个对象来更新状态
* 或者返回`null`来不更新任何内容

 getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate(prevProps,prevState)`:`Updating`时的函数，在render之后调用

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

可以读取，但无法使用DOM的时候，在组件可以在可能更改之前从`DOM`捕获一些信息（例如滚动位置）

> **返回的任何值都将作为参数传递给`componentDidUpdate（)`**

---

 Note

在`17.0`的版本，官方彻底废除

* `componentWillMount`、
* `componentWillReceiveProps`、
* `componentWillUpdate`

## 类组件的生命周期， 映射的 hooks 哪些 api ? {#p0-class-hooks}

下面是 React 类组件的生命周期方法和对应的 Hooks API：

1. `constructor`：`useState` 可以在函数组件中模拟类组件的 `constructor`。在函数组件内部使用 `useState` 声明状态变量，并设置初始值。

2. `componentDidMount`：`useEffect` 用于模拟 `componentDidMount`。通过在 `useEffect` 的回调函数中返回一个清理函数，可以模拟 `componentWillUnmount`。

3. `componentDidUpdate`：`useEffect` 可以在函数组件中模拟 `componentDidUpdate`。通过使用 `useEffect` 的第二个参数，可以指定依赖项的数组，当依赖项发生变化时，`useEffect` 的回调函数会被调用。

4. `componentWillUnmount`：`useEffect` 的清理函数可以模拟 `componentWillUnmount`。在 `useEffect` 的回调函数中返回一个清理函数，它会在组件销毁时执行。

5. `shouldComponentUpdate`：`React.memo` 可以用于函数组件的性能优化，类似于 `shouldComponentUpdate` 的功能。`React.memo` 可以包裹一个组件，并只在组件的 props 发生变化时重新渲染。

6. `getDerivedStateFromProps`：`useState` 可以通过提供 setter 函数，将 props 的值作为 state 的初始值。在组件重新渲染时，`useState` 不会重置 state 的值。

并不是每一个生命周期方法都有与之对应的 Hooks API。
Hooks 是为了解决函数式组件的状态管理和副作用问题而引入的新特性，因此 Hooks 在某种程度上替换了类组件的生命周期方法。

下面是一个使用表格方式对比 React 类组件的生命周期方法和对应的 Hooks API：

| 生命周期方法 | Hooks API |
|-------------------|-----------------------------------------------|
| constructor | useState |
| componentDidMount | useEffect（第二个参数为空数组） |
| componentDidUpdate | useEffect（包含依赖项的数组） |
| componentWillUnmount | useEffect 的清理函数 |
| shouldComponentUpdate | React.memo |
| getDerivedStateFromProps | useState（通过提供 setter 函数） |

## shouldComponentUpdate 的作用 {#p1-should-component-update}

## react 如何处理事件，Synthetic Event 的作用

在 React 中，绑定事件的原理是基于合成事件（SyntheticEvent）的机制。合成事件是一种由 React 自己实现的事件系统，它是对原生 DOM 事件的封装和优化，提供了一种统一的事件处理机制，可以跨浏览器保持一致的行为。

当我们在 React 组件中使用 `onClick` 等事件处理函数时，实际上是在使用合成事件。React 使用一种称为“事件委托”的技术，在组件的最外层容器上注册事件监听器，然后根据事件的目标元素和事件类型来触发合适的事件处理函数。这种机制可以大大减少事件监听器的数量，提高事件处理的性能和效率。

在使用合成事件时，React 会将事件处理函数包装成一个合成事件对象（SyntheticEvent），并将其传递给事件处理函数。合成事件对象包含了与原生 DOM 事件相同的属性和方法，例如 `target`、`currentTarget`、`preventDefault()` 等，但是它是由 React 实现的，并不是原生的 DOM 事件对象。因此，我们不能在合成事件对象上调用 `stopPropagation()` 或 `stopImmediatePropagation()` 等方法，而应该使用 `nativeEvent` 属性来访问原生 DOM 事件对象。

绑定事件的实现原理也涉及到 React 的更新机制。当组件的状态或属性发生变化时，React 会对组件进行重新渲染，同时重新注册事件监听器。为了避免不必要的事件处理函数的创建和注册，React 会对事件处理函数进行缓存和复用，只有在事件处理函数发生变化时才会重新创建和注册新的事件处理函数。这种机制可以大大提高组件的性能和效率，尤其是在处理大量事件和频繁更新状态的情况下。

在 React 中，合成事件是一种封装了浏览器原生事件对象的高级事件机制。它是由 React 提供的一种用于处理事件的抽象层，可以让开发者更方便地处理和管理事件。

React 的合成事件机制提供了一些优秀的特性：

1. 跨浏览器兼容性：React 的合成事件可以屏蔽浏览器的差异，保证在各种浏览器上运行一致。

2. 性能优化：React 的合成事件可以对事件进行池化处理，重用事件对象，避免创建大量的事件对象，从而提高性能。

3. 事件委托：React 的合成事件可以实现事件委托机制，将事件处理程序绑定在组件树的根节点上，统一管理和处理组件内部和外部的事件，从而避免多次绑定事件处理程序的问题。

4. 支持自定义事件：React 的合成事件可以支持自定义事件，开发者可以自定义组件事件，提供更多的自定义能力。

React 的合成事件机制通过事件冒泡和事件委托来实现。当在组件中触发事件时，React 会将该事件包装成一个合成事件对象，并在组件树中冒泡传递，直到根节点处。在组件树中，React 使用事件委托机制将事件处理程序绑定到根节点上，统一处理所有组件的事件。

在处理合成事件时，React 提供了一些常用的事件处理函数，例如 `onClick`、`onMouseOver`、`onSubmit` 等，可以在组件中直接使用。此外，开发者还可以自定义事件处理函数，通过 `on` 前缀加上事件名称的方式来绑定自定义事件。例如，我们可以定义一个 `onCustomEvent` 方法来处理自定义事件：

```jsx
jsxCopy codeclass MyComponent extends React.Component {
 handleCustomEvent() {
 // 处理自定义事件
 }

 render() {
 return (
 <div>
 <button onClick={this.handleCustomEvent}>触发自定义事件</button>
 </div>
 );
 }
}
```

在这个例子中，我们定义了一个名为 `handleCustomEvent` 的方法来处理自定义事件，然后在组件中通过 `onClick` 属性来绑定该方法。当用户点击按钮时，React 会将该事件包装成一个合成事件对象，并调用 `handleCustomEvent` 方法来处理事件。

## useState {#p0-useState}

流程图如下：renderWithHooks 根据current来判断当前是首次渲染还是更新。 hooks加载时调用对应的mount函数，更新时调用对应的update函数。
hooks生成单向链表，通过next连接，最后一个next指向null。 state hooks会生成update循环链表， effects会生成另外一个effectList循环链表。

![image](https://user-images.githubusercontent.com/22188674/232322402-c4a5a5a0-feec-4bda-92b8-775cc4dfdb1a.png)

 renderWithHooks

react-reconciler/src/ReactFiberHooks.js

```jsx
// renderWithHooks中判断是否是首次渲染
function renderWithHooks(current, workInProgress, Component, props, nextRenderLanes) {

 //当前正在渲染的车道
 renderLanes = nextRenderLanes
 currentlyRenderingFiber = workInProgress;
 //函数组件更新队列里存的effect
 workInProgress.updateQueue = null;
 //函数组件状态存的hooks的链表
 workInProgress.memoizedState = null;
 //如果有老的fiber,并且有老的hook链表
 if (current !== null && current.memoizedState !== null) {
 ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
 } else {
 ReactCurrentDispatcher.current = HooksDispatcherOnMount;
 }

//需要要函数组件执行前给ReactCurrentDispatcher.current赋值

 const children = Component(props);
 currentlyRenderingFiber = null;
 workInProgressHook = null;
 currentHook = null;
 renderLanes = NoLanes;
 return children;
}
```

`HooksDispatcherOnMount和HooksDispatcherOnUpdate`对象分别存放hooks的挂载函数和更新函数

 hooks的注册

```typescript jsx
function resolveDispatcher () {
  return ReactCurrentDispatcher.current
}

/**
 *
@param {*} reducer 处理函数，用于根据老状态和动作计算新状态
@param {*} initialArg 初始状态
 */

export function useState (initialState) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}
```

![image](https://user-images.githubusercontent.com/22188674/232322419-c4db85f8-f162-40b7-84a5-affc349b9b82.png)

```typescript jsx
/**
构建新的hooks， 其主要作用是在 Fiber 树中遍历到某个组件时，
根据该组件的类型和当前处理阶段（mount 或 update），处理该组件的 Hook 状态。
 */
function updateWorkInProgressHook () {
  // 获取将要构建的新的hook的老hook
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate
    currentHook = current.memoizedState
  } else {
    currentHook = currentHook.next
  }
  // 根据老hook创建新hook
  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue,
    next: null,
    baseState: currentHook.baseState,
    baseQueue: currentHook.baseQueue
  }
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook
  } else {
    workInProgressHook = workInProgressHook.next = newHook
  }
  return workInProgressHook
}
```

 useState 实现

接收一个初始状态值，返回一个数组，包含当前状态值和更新状态值的方法。可以通过调用更新方法来改变状态值，并触发组件的重新渲染

参考文档

* [资料](https://juejin.cn/post/6844903981836140552)

* [资料](https://juejin.cn/post/7219129726078533693)

## useContext {#p0-useContext}

如何合理使用 useContext

useContext 是 React 中提供的一种跨组件传递数据的方式，可以让我们在不同层级的组件之间共享数据，避免了繁琐的 props 传递过程。使用 useContext 可以大大简化组件之间的通信方式，提高代码可维护性和可读性。

下面是一些使用 useContext 的最佳实践：

1. 合理使用 context 的层级

context 可以跨组件传递数据，但是过多的 context 层级会使代码变得复杂、难以维护，而且会影响性能。因此，应该尽量避免嵌套过多 context 的层级，保持简单的组件结构。

2. 将 context 统一定义在一个文件中

为了方便管理和使用，我们应该将 context 的定义统一放在一个文件中，这样能够避免重复代码，也能方便其他组件引用。

3. 使用 context.Provider 提供数据

使用 context.Provider 来提供数据，将数据传递给子组件。在 Provider 中可以设置 value 属性来传递数据。

4. 使用 useContext 获取数据

使用 useContext hook 来获取 context 中的数据。useContext 接收一个 context 对象作为参数，返回 context 的当前值。这样就可以在组件中直接使用 context 中的数据。

5. 避免滥用 useContext

虽然 useContext 可以方便地跨组件传递数据，但是滥用 useContext 也会使代码变得难以维护。因此，在使用 useContext 时，应该优先考虑组件通信是否真的需要使用
useContext。只有在需要跨越多级组件传递数据时，才应该使用 useContext 解决问题。

 如何避免使用 context 的时候， 引起整个挂载节点树的重新渲染？

使用 context 时，如果 context 中的值发生了变化，会触发整个组件树的重新渲染。这可能会导致性能问题，特别是在组件树较大或者数据变化频繁的情况下。

为了避免这种情况，可以采用以下方法：

1. 对 context 值进行优化

如果 context 中的值是一个对象或者数组，可以考虑使用 useMemo 或者 useCallback 对其进行优化。这样可以确保只有在值发生变化时才会触发重新渲染。

2. 将 context 的值进行拆分

如果 context 中的值包含多个独立的部分，可以考虑将其进行拆分，将不需要更新的部分放入另一个 context 中。这样可以避免因为一个值的变化而导致整个组件树的重新渲染。

3. 使用 shouldComponentUpdate 或者 React.memo 进行优化

对于一些需要频繁更新的组件，可以使用 shouldComponentUpdate 或者 React.memo 进行优化。这样可以在值发生变化时，只重新渲染需要更新的部分。

4. 使用其他数据管理方案

如果 context 不能满足需求，可以考虑使用其他数据管理方案，如 Redux 或者 MobX。这些方案可以更好地控制数据更新，避免不必要的渲染。

**如果 context 中的值是一个对象或者数组，可以考虑使用 useMemo 或者 useCallback 对其进行优化**

代码举例： 以下是一个使用 useMemo 对 context 值进行优化的示例代码：

```tsx
import React, { useMemo, createContext } from 'react'

// 创建一个 Context
const MyContext = createContext()

// 创建一个 Provider
const MyProvider = ({ children }) => {
  // 定义一个复杂的数据对象
  const data = useMemo(() => {
    // 这里可以是一些复杂的计算逻辑
    return {
      name: 'Alice',
      age: 18,
      hobbies: ['Reading', 'Traveling', 'Sports'],
      friends: [
        { name: 'Bob', age: 20 },
        { name: 'Charlie', age: 22 },
        { name: 'David', age: 24 }
      ]
    }
  }, [])

  return (
 // 将 data 作为 value 传入 context.Provider
 <MyContext.Provider value={data}>
 {children}
 </MyContext.Provider>
  )
}

// 在 Consumer 中使用 context
const MyConsumer = () => {
  return (
 <MyContext.Consumer>
 {data => (
 <div>
 <div>Name: {data.name}</div>
 <div>Age: {data.age}</div>
 <div>Hobbies: {data.hobbies.join(', ')}</div>
 <div>Friends:
 <ul>
 {data.friends.map(friend => (
 <li key={friend.name}>
 {friend.name} ({friend.age})
 </li>
 ))}
 </ul>
 </div>
 </div>
 )}
 </MyContext.Consumer>
  )
}

// 使用 MyProvider 包裹需要使用 context 的组件
const App = () => {
  return (
 <MyProvider>
 <MyConsumer />
 </MyProvider>
  )
}

export default App
```

在上面的示例中，我们使用了 useMemo 对复杂的数据对象进行了缓存。这样，当 context 中的值变化时，只会重新计算数据对象的值，而不是重新创建一个新的对象。这样可以有效地减少不必要的渲染。

## useEffect 依赖为空数组与 componentDidMount 区别【热度: 366】

* created_at: 2024-05-26T06:10:05Z
* updated_at: 2024-05-26T06:10:06Z
* labels: web框架, TOP100互联网
* milestone: 中

**关键词**：useEffect 与 componentDidMount 区别

`useEffect` 是 React 函数组件的生命周期钩子，它是替代类组件中 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 生命周期方法的统一方式。

当你给 `useEffect` 的依赖项数组传入一个空数组（`[]`），它的行为类似于 `componentDidMount`，但实质上有些区别：

1. 执行时机：

* `componentDidMount`：在类组件的实例被创建并插入 DOM 之后（即挂载完成后）会立即被调用一次。
* `useEffect`（依赖为空数组）：在函数组件的渲染结果被提交到 DOM 之后，在浏览器绘制之前被调用。React 保证了不会在 DOM 更新后阻塞页面绘制。

2. 清除操作：

* `componentDidMount`：不涉及清理机制。
* `useEffect`：可以返回一个清理函数，React 会在组件卸载或重新渲染（当依赖项改变时）之前调用这个函数。对于只依赖空数组的 `useEffect`，此清理函数只会在组件卸载时被调用。

3. 执行次数：

* `componentDidMount`：在 render 执行之后，componentDidMount 会执行，如果在这个生命周期中再一次 setState ，会导致再次 render ，返回了新的值，浏览器只会渲染第二次 render 返回的值，这样可以避免闪屏。
* `useEffect`：是在真实的 DOM 渲染之后才会去执行，在这个 hooks 中再一次 setState, 这会造成两次 render ，有可能会闪屏。

实际上 `useLayoutEffect` 会更接近 `componentDidMount` 的表现，它们都同步执行且会阻碍真实的 DOM 渲染的

`useEffect` 钩子的工作原理涉及到 React 的渲染流程和副作用的调度机制。以下是其工作原理的详细说明：

* **调度副作用**：当你在组件内部调用 `useEffect` 时，你实际上是将一个副作用函数及其依赖项数组排队等待执行。这个函数并不会立即执行。

* **提交阶段（Commit Phase）**：React 渲染组件并且执行了所有的纯函数组件或类组件的渲染方法后，会进入所谓的提交阶段。在这个阶段，React 将计算出的新视图（新的 DOM 节点）更新到屏幕上。一旦这个更新完成，React 就知道现在可以安全地执行副作用函数了，因为这不会影响到正在屏幕上显示的界面。

* **副作用执行**：提交阶段完成后，React 会处理所有排队的副作用。如果组件是首次渲染，所有的副作用都会执行。如果组件是重新渲染，React 会首先对比副作用的依赖项数组：如果依赖项未变，副作用则不会执行；如果依赖项有变化，或者没有提供依赖项数组，副作用会再次执行。

* **清理机制**：如果副作用函数返回了一个函数，那么这个函数将被视为清理函数。在执行当前的副作用之前，以及组件卸载前，React 会先调用上一次渲染中的清理函数。这样确保了不会有内存泄漏，同时能撤销上一次副作用导致的改变。

* **延迟副作用**：尽管 `useEffect` 会在渲染之后执行，但它是异步执行的，不会阻塞浏览器更新屏幕。这意味着 React 会等待浏览器完成绘制之后，再执行你的副作用函数，以此来确保副作用处理不会导致用户可见的延迟。

通过这种机制，`useEffect` 允许开发者以一种优化的方式来处理组件中可能存在的副作用，而不需要关心渲染的具体时机。退出清理功能确保了即使组件被多次快速创建和销毁，应用程序也能保持稳定和性能。

## useLayoutEffect 和 useEffect 有什么区别? {#p0-useLayoutEffect}

**关键词**：useLayoutEffect 和 useEffect 区别

useLayoutEffect 和 useEffect 的主要区别在于它们执行的时机。

* **useLayoutEffect**:
 useLayoutEffect 是在 DOM 更新完成但在浏览器绘制之前同步执行的钩子函数。它会在 DOM 更新之后立即执行，阻塞浏览器的绘制过程。这使得它更适合于需要立即获取最新 DOM 布局信息的操作，如测量元素尺寸或位置等。使用 useLayoutEffect 可以在更新后同步触发副作用，从而保证 DOM 的一致性。

* **useEffect**:
 useEffect 是在组件渲染完毕后异步执行的钩子函数。它会在浏览器完成绘制后延迟执行，不会阻塞浏览器的绘制过程。这使得它更适合于处理副作用操作，如发送网络请求、订阅事件等。使用 useEffect 可以将副作用操作放到组件渲染完成后执行，以避免阻塞浏览器绘制。

总结：

* useLayoutEffect 是同步执行的钩子函数，在 DOM 更新后立即执行，可能会阻塞浏览器的绘制过程；
* useEffect 是异步执行的钩子函数，在浏览器完成绘制后延迟执行，不会阻塞浏览器的绘制过程。

通常情况下，应优先使用 useEffect，因为它不会阻塞浏览器的渲染，并且能够满足大多数的副作用操作需求。只有在需要获取最新的 DOM 布局信息并立即触发副作用时，才需要使用 useLayoutEffect。

## useReducer {#p3-useReducer}

`useReducer`是 React Hooks 的一个部分，它为状态管理提供了一个更加灵活的方法。`useReducer`特别适合处理包含多个子值的复杂状态逻辑，或者当下一个状态依赖于之前的状态时。与`useState`相比，`useReducer`更适合于复杂的状态逻辑，它使组件的状态管理更加清晰和可预测。

 基础使用

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

* `state`：当前管理的状态。
* `dispatch`：一个允许你分发动作(action)来更新状态的函数。
* `reducer`：一个函数，接受当前的状态和一个动作对象作为参数，并返回一个新的状态。
* `initialState`：初始状态值。

 Reducer 函数

Reducer 函数的格式如下：

```javascript
function reducer (state, action) {
  switch (action.type) {
    case 'ACTION_TYPE': {
      // 处理动作并返回新的状态
      return newState
    }
    // 更多的动作处理
    default:
      return state
  }
}
```

 动作（Action）

动作通常是一个包含`type`字段的对象。`type`用于在 reducer 函数中标识要执行的动作。动作对象也可以包含其他数据字段，用于传递动作所需的额外信息。

 示例

以下是一个使用`useReducer`的简单示例：

```jsx
import React, { useReducer } from "react";

// 定义reducer函数
function counterReducer(state, action) {
 switch (action.type) {
 case "increment":
 return { count: state.count + 1 };
 case "decrement":
 return { count: state.count - 1 };
 default:
 return state;
 }
}

function Counter() {
 // 初始化状态和dispatch函数
 const [state, dispatch] = useReducer(counterReducer, { count: 0 });

 return (
 <>
 Count: {state.count}
 <button onClick={() => dispatch({ type: "decrement" })}>-</button>
 <button onClick={() => dispatch({ type: "increment" })}>+</button>
 </>
 );
}
```

在上面的例子中，我们创建了一个简单的计数器。当用户点击按钮时，会分发一个包含`type`的动作到`useReducer`钩子。然后，`reducer`函数根据动作`type`来决定如何更新状态。

 使用场景

* 管理局部组件的状态。
* 处理复杂的状态逻辑。
* 当前状态依赖上一状态时，可以通过上一状态计算得到新状态。

`useReducer`通常与`Context`一起使用可以实现不同组件间的状态共享，这在避免 prop drilling（长距离传递 prop）的同时使状态更新更为模块化。
