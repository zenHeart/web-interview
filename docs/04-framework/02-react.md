# react

## react element 和 component 的区别 {#p1-react-element-component}

## jsx 返回 null undefined false 区别 {#p2-jsx-return-null-undefined-false}

## React.Children.map 和 props.children 的区别 {#p3-react-children-map-props-children}

## 类组件和函数组件的使用场景 {#p4-class-component-function-component}

## react 生命周期 {#p5-react-lifecycle}

## 请求在哪个阶段发出，如何取消请求 {#p6-request-cancel}

## shouldComponentUpdate 的作用 {#p7-should-component-update}

## state 和 props 区别 {#p8-state-props}

## 讲一下 setState 执行流程 {#p9-set-state-execution-flow}

在 React 中，当调用`setState`时，会发生以下一系列事情：

**一、触发状态更新**

1. **调用 setState 方法**：

* 当在 React 组件中调用`setState`方法时，React 会将这个状态更新请求排队。这意味着 React 不会立即更新组件的状态，而是将这个更新请求添加到一个队列中，等待合适的时机进行处理。
* 例如：

 ```javascript
 this.setState({ count: this.state.count + 1 })
 ```

* 在这个例子中，调用`setState`方法来增加`count`状态的值。

**二、合并状态**

1. **状态合并**：

* 如果多次调用`setState`方法，React 会将这些状态更新请求合并在一起。这意味着 React 不会立即应用每个状态更新请求，而是会将它们合并成一个单一的状态更新。
* 例如，如果在一个事件处理函数中多次调用`setState`方法：

 ```javascript
 handleClick() {
 this.setState({ count: this.state.count + 1 });
 this.setState({ count: this.state.count + 1 });
 }
 ```

* React 不会立即将`count`的值增加两次，而是会将这两个状态更新请求合并成一个，最终只将`count`的值增加一次。

2. **浅合并对象状态**：

* 如果`setState`方法的参数是一个对象，React 会进行浅合并。这意味着如果状态是一个对象，并且只更新了其中的一部分属性，React 会将新的属性值合并到旧的状态对象中，而不会替换整个状态对象。
* 例如：

 ```javascript
 this.setState({ user: { name: 'New Name' } })
 ```

* 如果原来的状态是`{ user: { name: 'Old Name', age: 30 } }`，那么调用`setState`方法后，新的状态将是`{ user: { name: 'New Name', age: 30 } }`。React 只会更新`user`对象的`name`属性，而不会影响`age`属性。

**三、触发重新渲染**

1. **协调阶段**：

* 在合适的时机，React 会开始处理状态更新请求队列。React 会进入一个称为协调阶段的过程，在这个阶段，React 会比较组件的当前状态和新的状态，确定哪些组件需要重新渲染。
* React 会使用一种称为虚拟 DOM 的技术来比较新旧状态，并确定最小化的更新操作，以提高性能。

2. **重新渲染组件**：

* 如果 React 确定某个组件的状态发生了变化，并且需要重新渲染，它会调用该组件的`render`方法来生成新的虚拟 DOM。然后，React 会将新的虚拟 DOM 与旧的虚拟 DOM 进行比较，确定需要进行哪些实际的 DOM 操作来更新页面。
* 例如，如果一个组件的状态发生了变化，React 会调用该组件的`render`方法，生成新的虚拟 DOM，并将其与旧的虚拟 DOM 进行比较。如果有差异，React 会更新实际的 DOM，以反映新的状态。

**四、异步执行**

1. **异步更新状态**：

* 在 React 中，`setState`方法通常是异步执行的。这意味着在调用`setState`方法后，不能立即依赖新的状态值。
* 例如：

 ```javascript
 this.setState({ count: this.state.count + 1 })
 console.log(this.state.count)
 ```

* 在这个例子中，`console.log`语句可能不会输出更新后的`count`值，因为`setState`方法是异步执行的，状态更新可能还没有完成。

2. **使用回调函数**：

* 如果需要在状态更新完成后执行一些操作，可以在`setState`方法中传递一个回调函数作为第二个参数。这个回调函数将在状态更新完成后被调用。
* 例如：

 ```javascript
 this.setState({ count: this.state.count + 1 }, () => {
   console.log(this.state.count)
 })
 ```

* 在这个例子中，回调函数将在状态更新完成后被调用，此时可以确保`count`的值已经更新。

在 React 中，调用`setState`方法会触发一系列的操作，包括排队状态更新请求、合并状态、触发重新渲染等。

在 React 类组件中，状态（state）是组件的局部状态，你可以通过调用 `setState` 方法来异步更新组件的状态。有几个重要原因解释了为什么在 React 类组件中应该使用 `setState` 而不是直接修改 `this.state`：

 1. **保证状态的不可变性（Immutability）**

React 强烈建议开发人员保持状态（state）的不可变性。这意味着状态不应被直接修改，而应该通过创建一个新的状态对象来更新。直接修改 `this.state` 不遵循不可变性原则，这可能会导致未定义的行为和性能问题。

 2. **状态更新是异步的**

React 可能会将多个 `setState` 调用批量处理为一个更新，以优化性能。因为 `setState` 是异步的，所以这意呀着在调用 `setState` 之后立即读取 `this.state` 可能不会返回预期的值。如果直接修改 `this.state`，则无法利用 React 的异步更新和批量处理机制。

 3. **组件重新渲染**

`setState` 方法不仅更新状态，而且还告诉 React 该组件及其子组件需要重新渲染，以反映状态的变化。直接修改 `this.state` 不会触发组件的重新渲染，因此即使状态发生了变化，用户界面也不会更新。

 4. **可预测的状态变更**

使用 `setState` 方法可以确保所有状态更新都有一个清晰、可预测的流程。这使得调试和理解组件的行为变得更加容易。同时，`setState` 还提供了一个回调函数，只有在状态更新和组件重新渲染完成后，这个回调函数才会被执行，这样就可以安全地操作更新后的状态。

 5. **合并状态更新**

当你调用 `setState`，React 会将你提供的对象合并到当前状态中。这是一种浅合并（shallow merge），意味着只合并顶层属性，而不会影响到嵌套的状态。这种行为让状态更新变得简单而直接。如果直接修改 `this.state`，则需要手动处理这种合并逻辑。

因为以上原因，建议遵循 React 的最佳实践，即通过 `setState` 方法而不是直接修改 `this.state` 来更新组件的状态。这样可以保证应用的性能、可维护性和可预测性。

在 React 的类组件中，`setState` 方法主要做了以下几件事情：

1. 触发组件的重新渲染：当调用 `setState` 时，React 会标记该组件为“脏”状态，在下一个渲染周期中重新渲染组件。

2. 合并状态更新：`setState` 接受一个对象或函数作为参数。如果是对象，它会与当前组件的状态进行合并。如果是函数，该函数会接收当前的状态作为参数，并返回一个新的状态对象，然后与当前状态合并。

3. 异步更新：在大多数情况下，`setState` 是异步执行的，这是为了优化性能，避免不必要的频繁渲染。但在某些特殊情况下，如在事件处理函数中，可以通过给 `setState` 传递一个函数作为第二个参数来在状态更新完成后执行一些操作。

例如：

```javascript
class MyComponent extends React.Component {
 constructor(props) {
 super(props);
 this.state = { count: 0 };
 }

 handleClick = () => {
 // 方式一：对象形式
 this.setState({ count: this.state.count + 1 });
 // 方式二：函数形式
 this.setState((prevState) => ({ count: prevState.count + 1 }));
 };
}
```

## useRef 是如何实现的 {#useref}

* created_at: 2024-08-10T03:44:14Z
* updated_at: 2024-08-10T03:44:14Z
* labels: web框架, TOP100互联网
* milestone: 资深

**关键词**：useRef 实现

该问题也是非常复杂， 需要深入源码， 可以看下面文章解析：

[资料](https://juejin.cn/post/7341757372188065792)

> 以下是题库作者对上面文档的一些提炼总结

* 什么是数据共享层
* hooks
* 如何确定 fiber 对应的 hook 上下文？
* hook 是如何存在的？保存在什么地方？
* 多个 hook 如何处理？
* useRef
* 实现原理
* 标记 Ref​
* 执行 Ref​ 操作
* mount 该如何操作
* update 的时候该如何操作
* 整体执行流程
* 标记
* 执行

## 受控和非受控组件 {#p10-controlled-uncontrolled-component}

## 高阶组件是什么 {#p11-high-order-component}

## 错误边界组件如何使用 {#p12-error-boundary-component}

## react 组件通信方式 {#p13-react-component-communication}

1. 父子组件
2. 兄弟组件
3. 跨级通信

```javascript
// Props 父子通信
function Child (props) {
  return <div>{props.message}</div>
}

// Context 跨层级通信
const UserContext = React.createContext()
function App () {
  return (
    <UserContext.Provider value={{ name: 'John' }}>
      <Child />
    </UserContext.Provider>
  )
}

// 事件总线
const eventBus = {
  listeners: {},
  on (event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  },
  emit (event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }
}
```

## react refs 的作用 {#p1-react-refs}

```javascript
// 创建 Refs 的方式
function Component () {
  // useRef Hook
  const inputRef = useRef()

  // 回调 Refs
  const setTextInputRef = element => {
    this.textInput = element
  }

  return (
    <>
      <input ref={inputRef} />
      <input ref={setTextInputRef} />
    </>
  )
}
```

## react 中的 key 有什么作用 {#p0-react-key}

* 用于标识列表中的元素
* 帮助 React 识别哪些元素改变了
* 不推荐使用数组索引作为 key

```javascript
function List ({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}
```

在 React 的循环渲染中，不推荐使用数组的`index`（索引）作为元素的`key`，主要基于以下几点理由：

1. **列表项顺序的变化**：如果列表项的顺序会发生变化（如排序、增加、删除操作），使用`index`作为`key`可能会导致性能问题和组件状态的错误。这是因为 React 依赖`key`来判断哪些元素是新元素、哪些被移除，以及哪些元素的位置发生了变化。当使用`index`作为`key`时，即使数据项的内容改变了，`key`仍然保持不变，导致 React 无法正确识别和优化渲染。

2. **性能问题**：当列表项发生变动时，如果使用`index`作为`key`，React 可能会做更多的 DOM 操作来更新视图，因为它无法准确地通过`key`识别哪些元素是新的，哪些元素被移动了位置。这可能导致不必要的重渲染和性能下降。

3. **组件状态的问题**：对于使用 state 的组件，如果列表项的顺序改变，使用`index`作为`key`可能会导致状态错乱。例如，当你删除一个列表项时，后面的项会移上来，它们的`index`改变了，如果它们有独立的状态，这时会由于`index`作为`key`使得状态与视图匹配错误。

因此，推荐的做法是使用唯一的、稳定的标识符（如数据库中的 id 或者具有唯一性的 hash 值等）作为`key`，这样无论数据如何变化，每个元素的`key`都是稳定的，可以帮助 React 更准确、更高效地进行 DOM 的比对和更新。

## react 如何获得 dom {#p16-react-get-dom}

## react 中如何引入样式 {#p17-react-引入样式}

## react 虚拟 dom 如何对比，diff 算法 {#p0-react-virtual-dom-diff}

考虑到 DOM 节点很少跨层级移动，React 采用同层比较的方式：
单节点 Diff：比较 elementType 和 key 是否相同，都相同可复用，否则标记旧的 DELETION、新的 PLACEMENT
多节点 Diff：需要两轮遍历，分别处理更新的节点，处理剩下的不属于更新的节点
第一轮：逐个对比 key 是否相同（无 key 则认为相同）。相同则对比 elementType，若类型不同则标记 oldFiber 为 DELETION，相同则复用；若 key 不同则跳出循环。记录此次循环位置为 lastPlacedIndex
第一轮循环结束后（跳出也是结束），若仅 oldFiber 剩余则均标记为 DELETION，仅 newFiber 剩余则均标记为 PLACEMENT；两者都剩余则进入第二轮循环

* [react 揭秘](https://react.iamkasong.com/diff/prepare.html)

## react hooks 原理

`useState` 是 React 库中的一个 Hook，它允许你在函数组件中添加 React 状态。使用 `useState`，你可以给组件添加内部状态，并且能够通过调用这个 Hook 来更新状态，从而触发组件的重新渲染。

 原理简述

`useState` 的工作原理基于 React 的渲染机制和 Fiber 架构。以下是 `useState` 工作流程的简要概述：

1. **初始化状态**：当你在函数组件中调用 `useState` 时，React 会为该组件创建一个状态变量。如果提供了初始值，状态将被初始化为该值。

2. **返回更新函数**：`useState` 返回一个数组，包含当前的状态值和一个更新该状态的函数（通常命名为 `setState`）。

3. **调用更新函数**：当你调用这个更新函数并传入一个新的状态值时，React 会将这个新的状态值与当前状态合并，并计划重新渲染组件。

4. **重新渲染**：在下一次的渲染周期中，React 会使用新的状态值重新渲染组件。

5. **状态持久化**：React 通过内部机制确保状态在组件的多次渲染之间保持不变。

 执行过程

以下是 `useState` 在 React 内部可能的执行过程：

1. **调用 useState**：在函数组件中调用 `useState(initialState)`。

2. **创建状态对象**：React 创建一个状态对象，存储状态值和与之关联的更新函数。

3. **渲染组件**：使用当前的状态值渲染组件。

4. **更新状态**：当组件需要更新状态时，调用由 `useState` 返回的更新函数，例如 `setState(newState)`。

5. **调度更新**：React 将更新调度到下一个渲染周期，并标记组件为需要重新渲染。

6. **批量处理**：React 可能会将多个状态更新批处理在一起，以避免不必要的多次渲染。

7. **重新渲染组件**：在下一个渲染周期，React 使用新的状态值重新渲染组件。

8. **状态持久化**：React 的状态持久化机制确保即使在组件卸载和重新挂载后，状态也能被正确地恢复。

 代码示例

```javascript
import React, { useState } from 'react'

function Counter () {
  const [count, setCount] = useState(0) // 初始化状态为 0

  return (
 <div>
 <p>Count: {count}</p>
 <button onClick={() => setCount(count + 1)}>Increment</button>
 </div>
  )
}
```

在这个例子中，`useState` 被用来初始化 `count` 状态，并提供了一个 `setCount` 函数来更新它。每次点击按钮时，`setCount` 被调用，React 计划重新渲染组件，并在下一次渲染周期中使用新的状态值。

## useMemo 是否支持异步函数 {#p1-use-memo-async}

## useCallback 是否支持异步函数 {#p1-use-callback-async}

## react fiber 的作用和原理

之前 React 的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。
为c？原架构有何不足？原架构采用递归遍历方式来更新 DOM 树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如 input 输入后页面卡顿等
Fiber 如何解决该问题？时间分片和暂停
Fiber如何实现？使用链表结构，将递归遍历更改为循环遍历，实现任务拆分、中断和恢复
Fiber 如何实现比较？双缓冲技术，在 diff 过程中创建新的 DOM Tree，diff 完成之后生成 EffectList，即需要更新的地方，之后进入 commit 阶段，该阶段不允许中断

## react 如何处理事件，Synthetic Event 的作用

## react router

## redux

## redux 日志记录插件

1. 创建日志插件函数：

```javascript
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('prev state', store.getState())
  console.log('action', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}
```

这个函数接收一个 Redux store 对象，返回一个中间件函数。这个中间件函数接收下一个中间件的调用函数`next`和当前的动作`action`。

2. 将日志插件添加到 Redux store：

```javascript
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import loggerMiddleware from './loggerMiddleware'

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware))
```

在创建 Redux store 的时候，使用`applyMiddleware`函数将日志插件中间件添加到 store 中。

这样，每当有动作被派发时，日志插件就会在控制台打印出当前的状态、动作和下一个状态，从而实现记录状态变更的目的。

## mobx

## mobx 与 redux 的区别

## 952 mobx 和 redux 有什么区别【热度: 277】

MobX 和 Redux 都是流行的 JavaScript 状态管理库，广泛用于帮助开发者以可预测的方式管理应用的状态。尽管它们都旨在解决相同的问题，但它们的设计哲学、实现方式以及提倡的最佳实践有很大差异。

 设计理念的不同

* **Redux**：其设计理念是保持状态的可预测性，鼓励使用纯函数来执行状态变更。在 Redux 中，所有的状态变化都是通过派发（dispatching）一个动作（action）并通过一个或多个 reducer 来处理这些动作来实现的。这促进了一个单向数据流模型，使得状态管理变得清晰但也更加繁琐。
* **MobX**：其通过透明的函数响应式编程（TFRP）原则来实现状态管理。在 MobX 中，你可以直接修改状态，而 MobX 会负责跟踪这些状态的变化，并自动应用任何副作用（如重新渲染 UI）。这种方式使得状态管理更加直观和灵活，但可能会牺牲一些可预测性。

 使用和实现上的差异

* **Redux**：通常需要更多的样板代码和设置。你需要定义 action 类型、action 创建函数以及 reducer。同时，它鼓励使用不可变数据模式，这可能需要使用额外的库（如 Immutable.js）。Redux 并不自带中间件和异步管理的解决方案，通常需要引入如 redux-thunk 或 redux-saga 等中间件来处理副作用。
* **MobX**：使用起来更简单，几乎不需要样板代码。因为 MobX 通过跟踪状态的修改并自动应用更改来工作（使用代理或装饰器跟踪属性的读写），开箱即用，而无需担心不可变性。MobX 允许使用更自然的 JavaScript 数据结构（如对象、数组），并自动为你处理检测更改和更新 UI。

 性能对比

* **Redux**：对于大型应用，由于每次状态更新都会执行可能涉及整个状态树的深度比较，因此可能需要仔细优化选择器和避免不必要的渲染。
* **MobX**：由于其使用响应式系统仅跟踪实际使用的状态部分，并在这部分状态变更时才更新，通常能提供更好的运行时性能，尤其是在大型应用中。

 选择哪一个？

选择 Redux 还是 MobX，很大程度上取决于项目需求、团队偏好和项目的规模。

* 如果你更喜欢函数式编程范式、需要更高程度的可预测性以及更好的时间旅行调试能力，那么 Redux 可能是更好的选择。
* 如果你倾向于面向对象的编程范式、期望更少的样板代码以及更加灵活的状态管理方式，那么 MobX 可能更符合你的需求。

两者之间的选择并不是全有或全无，实际上有些项目也会结合使用两者的优点。正确理解每种库的设计理念和适用场景是做出选择的关键。

## React 与 Vue 的主要区别

* 设计理念: React 推崇函数式编程，Vue 推崇声明式编程
* 数据流: React 单向数据流，Vue 支持双向绑定
* 状态管理: React 使用 setState/Hooks，Vue 使用响应式系统
* 模板语法: React 使用 JSX，Vue 使用模板语法
* 生态系统: React 社区更大，第三方库更丰富

## 受控组件与非受控组件 {#p1-controlled-uncontrolled-component}

```javascript
// 受控组件
function ControlledForm () {
  const [value, setValue] = useState('')
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

// 非受控组件
function UncontrolledForm () {
  const inputRef = useRef()
  return (
    <input
      ref={inputRef}
      defaultValue="default"
    />
  )
}
```

## React 中的高阶组件(HOC) {#p1-react-hoc}

```javascript
// HOC 示例
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    
    componentDidMount() {
      DataSource.addListener(this.handleChange);
    }
    
    componentWillUnmount() {
      DataSource.removeListener(this.handleChange);
    }
    
    handleChange = () => {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }
    
    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

## 在应用中如何排查性能问题 {#p2-react-performance-problem}

在 React 应用中，可以通过以下方法来排查性能问题：

**一、使用 Chrome 开发者工具**

1. **性能分析（Performance）**：

* 打开 Chrome 浏览器，进入开发者工具。选择“Performance”选项卡。
* 点击“Record”按钮开始录制页面的交互过程。进行一些典型的操作，如加载页面、点击按钮、滚动页面等。
* 停止录制后，开发者工具会生成一个性能分析报告。这个报告显示了页面在录制期间的各种性能指标，包括 CPU 使用率、内存使用情况、网络请求等。
* 分析报告中的“Main”线程，可以查看在录制期间哪些操作占用了大量的 CPU 时间。常见的性能瓶颈包括长时间的 JavaScript 执行、频繁的重渲染等。
* 例如，如果发现某个函数的执行时间很长，可以点击该函数查看详细的调用栈，以确定问题的根源。

2. **React 开发者工具（React Developer Tools）**：

* 安装 React 开发者工具插件。在 Chrome 浏览器中，打开需要排查性能问题的 React 应用页面。
* 打开开发者工具，选择“React”选项卡。
* 在 React 开发者工具中，可以查看组件的层次结构、Props 和 State。这有助于确定哪些组件的状态变化频繁，或者哪些组件的渲染时间较长。
* 特别关注那些在不必要的时候触发重新渲染的组件。可以通过检查组件的`shouldComponentUpdate`方法或使用`React.memo`、`PureComponent`等优化手段来减少不必要的重新渲染。

**二、使用 React Profiler**

1. **开启 Profiler**：

* 在 React 应用中，可以使用`React.Profiler`组件来进行性能分析。在需要分析性能的组件树的根节点处包裹`React.Profiler`。
* 例如：

 ```jsx
 import React from "react";
 import ReactDOM from "react-dom";
 import { Profiler } from "react";

 const App = () => (
 <Profiler
 id="MyApp"
 onRender={(id, phase, actualDuration) => {
 console.log(`Component ${id} rendered in phase ${phase} with duration ${actualDuration} ms.`);
 }}
 >
 {/* 你的应用组件 */}
 </Profiler>
 );

 ReactDOM.render(<App />, document.getElementById("root"));
 ```

2. **分析结果**：

* 在应用运行过程中，`React.Profiler`会记录组件的渲染时间和其他性能指标。可以在控制台中查看输出的日志，了解每个组件的渲染时间和触发渲染的原因。
* 根据日志信息，可以确定哪些组件的渲染时间较长，以及哪些操作导致了频繁的重新渲染。这有助于针对性地进行性能优化。

**三、检查代码中的潜在问题**

1. **避免不必要的重新渲染**：

* 确保组件的`shouldComponentUpdate`方法正确实现，或者使用`React.memo`和`PureComponent`来避免不必要的重新渲染。检查组件的依赖项是否正确设置，避免因为不必要的状态变化而触发重新渲染。
* 例如，如果一个组件的渲染结果只依赖于某个特定的 prop，而不是所有的 props，可以使用`React.memo`并指定一个自定义的比较函数来进行更精确的比较。

2. **优化大型列表渲染**：

* 对于大型列表的渲染，考虑使用`React.memo`和`key`属性来优化性能。确保为每个列表项设置一个唯一的`key`属性，这有助于 React 更高效地识别列表项的变化。
* 避免在列表渲染中使用索引作为`key`属性，因为这可能会导致性能问题。如果列表项的顺序可能发生变化，使用一个稳定的唯一标识符作为`key`。

3. **减少不必要的计算和副作用**：

* 检查代码中是否存在不必要的计算或副作用。例如，避免在`render`方法中进行复杂的计算或发起网络请求。将这些操作移到生命周期方法或使用`useEffect`钩子中，并确保副作用的依赖项正确设置，以避免不必要的执行。
* 对于频繁执行的计算，可以考虑使用 memoization（记忆化）技术来缓存结果，避免重复计算。

4. **优化网络请求**：

* 检查应用中的网络请求是否高效。避免频繁的重复请求，使用缓存策略来减少请求次数。确保网络请求的响应时间合理，可以使用工具来监测网络请求的性能，并考虑优化服务器端的响应时间。

通过以上方法，可以系统地排查 React 应用中的性能问题，并采取相应的优化措施来提高应用的性能和响应速度。

## 性能调优中，如何确定哪个数据变化引起的组件渲染 {#p2-react-performance-problem-determine}

帮助开发者排查是哪个属性改变导致了组件的 rerender。

直接接受 ahooks 里面的一个方法： [useWhyDidYouUpdate](https://ahooks.js.org/zh-CN/hooks/use-why-did-you-update)

源码实现：

```tsx
import { useEffect, useRef } from 'react'

export type IProps = Record<string, any>;

export default function useWhyDidYouUpdate (componentName: string, props: IProps) {
  const prevProps = useRef<IProps>({})

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props })
      const changedProps: IProps = {}

      allKeys.forEach((key) => {
        if (!Object.is(prevProps.current[key], props[key])) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key]
          }
        }
      })

      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps)
      }
    }

    prevProps.current = props
  })
}
```

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

## 为什么要自定义合成事件 {#p1-custom-event}

React 选择自定义合成事件系统主要是为了提供一个统一的事件处理接口，解决浏览器原生事件的兼容性问题，并优化性能。以下是自定义合成事件系统的几个关键原因：

1. **跨浏览器一致性**：
 不同的浏览器对事件的实现存在差异，这可能导致在不同浏览器上运行的代码行为不一致。React 的合成事件系统提供了一个统一的 API，使得开发者可以编写一次代码，而无需担心浏览器兼容性问题。

1. **性能优化**：
 React 的合成事件系统允许事件处理在事件冒泡阶段进行，而不是在捕获阶段。这样可以减少不必要的事件处理调用，因为事件在冒泡阶段到达目标元素时，通常意味着用户与页面的交互已经完成。此外，React 还可以将多个事件合并处理，减少对 DOM 的操作次数，从而提高性能。

1. **简化事件处理**：
 在原生事件中，事件处理函数需要处理事件的捕获和冒泡阶段，这可能会导致代码复杂且难以维护。React 的合成事件系统抽象了这些细节，开发者只需要关注事件的冒泡阶段，简化了事件处理逻辑。

1. **事件池**：
 React 的合成事件对象是池化的，这意味着在事件处理函数执行完毕后，事件对象会被重用，以减少垃圾回收的压力。这有助于提高应用的性能。

1. **安全性和可控性**：
 React 的合成事件系统提供了一个安全的环境，可以防止一些常见的安全问题，如跨站脚本攻击（XSS）。同时，它也使得开发者可以更容易地控制事件的行为。

1. **与 React 的生命周期集成**：
 React 的合成事件系统与组件的生命周期紧密集成，例如，事件处理函数可以在组件卸载时自动清理，避免内存泄漏。

1. **与 React 的其他特性集成**：
 合成事件系统与 React 的其他特性（如虚拟 DOM、组件状态管理等）紧密集成，提供了一致的开发体验。

1. **便于调试和开发工具**：
 React 的合成事件系统使得开发者可以更容易地调试事件处理代码，因为事件对象具有一致的结构和属性。

综上所述，React 的自定义合成事件系统是为了提供一个更加一致、高效和安全的事件处理机制，使得开发者可以更容易地构建高性能的用户界面。

## scheduler 调度机制原理 {#scheduler}

1. scheduler 概念
2. 时间片与优先级 概念
3. 优先级切分
4. 任务队列
5. scheduleCallback
6. requestHostCallback
7. MessageChannel
8. performWorkUntilDeadline

* 任务的中断和恢复
* 判断任务的完成状态
* 取消任务

React 在性能优化方面的一个关键组件是调度器（Scheduler），它负责在渲染的过程中合理安排工作，以减少用户的等待时间以及避免单个任务占用过多的主线程时间，从而提高渲染性能。React 在 18.0 版本后引入了新的调度器机制，提供了更好的性能体验。

那么，为什么 React 不直接使用 `requestIdleCallback` 而要自己实现调度器呢？

1. **控制精细度：** React 需要比 `requestIdleCallback` 更高的控制精细度。`requestIdleCallback` 是基于浏览器的空闲时间进行调度的，而 React 调度器可以根据组件优先级、更新的紧急程度等信息，更精确地安排渲染的工作。

2. **跨浏览器兼容性：** `requestIdleCallback` 直到 2018 年才是浏览器中较普遍支持的 API。React 需要一个能够跨各个版本或框架的解决方案，以实现一致的性能体验。

3. **时间切片：** React 使用一种称为“时间切片”（time slicing）的技术，允许组件分布在多个帧中渲染以维持流畅的 UI。这依赖于 React 自己对任务和帧的精确控制，而不是依赖浏览器的 `requestIdleCallback`。

4. **更丰富的特性：** React 调度器提供了比 `requestIdleCallback` 更丰富的特性和更加详细的调度策略，这包括：

* `Immediate` 模式，用于同步渲染，当它是必需的时候。
* `User-blocking` 模式，用于任务需要尽快完成，但能够容忍一定延迟，比如交互动画。
* `Normal` 和 `Low` 模式，用于不同优先级的更新。

5. **复杂功能的实现：** React 使用调度器实现某些特定的特性，比如：

* Fiber 架构，允许 React 在类组件上实现 Concurrent 特性。
* 在客户端渲染和服务器端渲染之间实现一致性。

6. **优化生态工具：** 对于 React 生态中的其他工具和实现（如 react-native、fast-refresh 等），它们可能需要特定或不同的调度策略。

7. **未来兼容性：** React 团队可以更好地在自己控制的调度器中实现未来的优化和特性，而不受浏览器 API 变更的影响。

最后，调度器是 React 架构中的一个重要部分，它让 React 能够实现更丰富和灵活的用户界面渲染逻辑。尽管 `requestIdleCallback` 可以被用来实现一些调度器的特性，但是完全使用它将限制 React 进一步优化的可能性，并迫使 React 依赖于浏览器的调度行为，这可能不符合 React 的长期发展和技术策略。

## context

要避免在 React 开发中使用 `context` 时引起整个挂载节点树的重新渲染，可以采取以下方法：

1. React Context 数据分割：把提供 `context value` 的部分提取到单独的组件中，并且仅在该组件中修改 `context value`。这样，当 `context value` 变化时，只有真正使用该 `context` 的消费组件会重新渲染，而非所有挂载节点都会重新渲染。

假设我们有一个应用，需要管理主题颜色和用户信息两个不同的数据。

首先，创建两个 Context：

```jsx
import React from "eact";

// 创建主题颜色 Context
const ThemeContext = React.createContext({ theme: "light" });

// 创建用户信息 Context
const UserContext = React.createContext({ user: null });
```

在顶层组件中，提供这两个 Context 的 Provider，并设置相应的值：

```jsx
class App extends React.Component {
 state = {
 theme: "dark",
 user: { name: "John Doe", age: 25 },
 };

 render() {
 return (
 <ThemeContext.Provider value={this.state.theme}>
 <UserContext.Provider value={this.state.user}>
 <Toolbar />
 </UserContext.Provider>
 </ThemeContext.Provider>
 );
 }
}
```

然后，在需要使用主题颜色的组件中，可以通过以下方式获取：

```jsx
class ThemedButton extends React.Component {
 static contextType = ThemeContext;

 render() {
 const theme = this.context;
 return <Button theme={theme} />;
 }
}
```

在需要使用用户信息的组件中，同样方式获取：

```jsx
class UserProfile extends React.Component {
 static contextType = UserContext;

 render() {
 const user = this.context;
 return (
 <div>
 <p>用户名：{user.name}</p>
 <p>年龄：{user.age}</p>
 </div>
 );
 }
}
```

在上述例子中，我们将主题颜色和用户信息分割到不同的 Context 中。`ThemeContext` 用于传递主题相关的数据，`UserContext` 用于传递用户相关的数据。这样，不同的组件可以根据自己的需求订阅相应的 Context，获取所需的数据，而不会相互干扰。每个组件只需要关注自己所使用的 Context，提高了代码的可读性和可维护性。同时，当某个 Context 的数据发生变化时，只有订阅了该 Context 的组件才会重新渲染，避免了不必要的重新渲染。

2. 对消费组件使用 `React.memo()` 进行包裹：`React.memo` 可以对函数组件进行浅比较，如果组件的 props 没有变化，就不会触发重新渲染。通过将消费 `context` 的组件用 `React.memo()` 包裹，可以避免不必要的重新渲染。

例如，假设有一个 `ContextProvider` 组件提供 `context value`，以及一个使用该 `context` 的子组件 `ConsumerComponent`，优化后的代码可能如下所示：

```jsx
const ContextProvider = ({ children }) => {
 // 管理 context value 的状态
 const [value, setValue] = useState(/* 初始值 */);

 return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const ConsumerComponent = React.memo(({ contextValue }) => {
 // 仅根据 context value 进行渲染或处理逻辑
 return <div>{/* 使用 context value 的相关逻辑 */}</div>;
});
```

在上述示例中，`ContextProvider` 负责管理 `context value` 的状态变化，而 `ConsumerComponent` 是使用 `context` 的消费组件，并通过 `React.memo()` 进行了包裹。这样，当 `value` 发生变化时，只有 `ConsumerComponent` 会根据浅比较来决定是否重新渲染，而不是整个挂载节点树都重新渲染。

通过以上方式，可以减少使用 `context` 时不必要的重新渲染，提高应用的性能。但具体的优化策略还需要根据项目的实际情况进行选择和调整。同时，还需注意避免在 `context` 中传递过于复杂或频繁变化的数据，以减少不必要的渲染次数。

## react19 新特性 {#p2-react19}

更多详细信息可以看下面这个文章： [资料](https://juejin.cn/post/7362057701792923684)

作者总结上文的重点信息内容

 React 19 的新功能

* 新型 hook：`useActionState`
* React DOM：`<form>` Action
* React DOM：新型 hook：`useFormStatus`
* 新型 hook：`useOptimistic`
* 新型 API：`use`

 React 服务器组件

* 服务器组件
* Server Action（服务器操作）

## useReducer {p3-useReducer}

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

## forwardsRef 作用是啥， 有哪些使用场景？{#p2-forwardsRef}

在 React 中，`forwardRef` 是一个用来传递 `ref` 引用给子组件的技术。通常情况下，refs 是不会透传给子组件的，因为 refs 并不是像 `props` 那样的属性。`forwardRef` 提供了一种机制，可以将 `ref` 自动地通过组件传递到它的子组件。

 `forwardRef` 的作用

* **访问子组件的 DOM 节点：** 当需要直接访问子组件中的 DOM 元素（例如，需要管理焦点或测量尺寸）时，可以使用 `forwardRef`。
* **在高阶组件（HOC）中转发 refs:** 封装组件时，通过 `forwardRef` 可以将 ref 属性透传给被封装的组件，这样父组件就能够通过 ref 访问到实际的子组件实例或 DOM 节点。
* **在函数组件中使用 refs(React 16.8+）：** 在引入 Hook 之前，函数组件不能直接与 refs 交互。但是，引入了 `forwardRef` 和 `useRef` 之后，函数组件可以接受 ref 并将它透传给子节点。

 使用场景举例

 1. 访问子组件的 DOM 节点

假设你有一个 `FancyButton` 组件，你想从父组件中直接访问这个按钮的 DOM 节点。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
 <button ref={ref} className="FancyButton">
 {props.children}
 </button>
));

// 现在你可以从父组件中直接获取DOM引用
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

 2. 在高阶组件中转发 refs

一个常见的模式是为了抽象或修改子组件行为的高阶组件（HOC）。`forwardRef`可以用来确保 ref 可以传递给包装组件：

```jsx
function logProps(Component) {
 class LogProps extends React.Component {
 componentDidUpdate(prevProps) {
 console.log("old props:", prevProps);
 console.log("new props:", this.props);
 }

 render() {
 const { forwardedRef, ...rest } = this.props;

 // 将自定义的 prop 属性 "forwardedRef" 定义为 ref
 return <Component ref={forwardedRef} {...rest} />;
 }
 }

 // 注意：React.forwardRef 回调的第二个参数 "ref" 传递给了LogProps组件的props.forwardedRef
 return React.forwardRef((props, ref) => {
 return <LogProps {...props} forwardedRef={ref} />;
 });
}
```

 3. 在函数组件中使用 ref

在 Hook 出现之前，函数组件不能够直接与 `ref` 交云。现在可以这样做：

```jsx
const MyFunctionalComponent = React.forwardRef((props, ref) => {
 return <input type="text" ref={ref} />;
});

const ref = React.createRef();
<MyFunctionalComponent ref={ref} />;
```

当你需要在父组件中控制子组件中的 DOM 元素或组件实例的行为时，`forwardRef` 是非常有用的工具。不过，如果可行的话，通常最好通过状态提升或使用 context 来管理行为，只在没有其他替代的情况下才选择使用 refs。

## react 和 react-dom 是什么关系？{#react-dom}

`react` 和 `react-dom` 是两个与 React 生态系统密切相关的 npm 包，它们在使用 React 构建用户界面时扮演不同的角色：

 `react`

* `react` 包含了构建 React 组件所必需的核心功能，例如创建组件类（如 `React.Component`），创建元素（如使用 `React.createElement`），还有新的 React 16+ 特性中的 Hooks（如 `useState` 和 `useEffect`）。
* 它提供了组件生命周期管理、组件状态管理以及 React 元素（用于描述 UI 长相的对象）的创建。
* `react` 实现了 React 的核心算法，包括对组件状态的更新以及虚拟 DOM 的概念。
* 简而言之，`react` 包对于任何使用 React 的应用程序都是一个必需的依赖，无论该应用程序是运行在浏览器还是其他环境中。

 `react-dom`

* `react-dom` 提供了一些让 React 能够与 DOM 互动的方法。在浏览器中，它把 React 组件渲染到真实的 DOM 节点上，并且处理用户的交互（如点击、输入等事件）。
* 主要的方法是 `ReactDOM.render()`，它将 React 组件或者元素渲染到指定的 DOM 容器中。在 React 18+ 中，这个角色由 `ReactDOM.createRoot().render()` 接手。
* 如果你在使用服务端渲染（Server-Side Rendering, SSR），那么你会使用 `react-dom/server` 中的方法，如 `ReactDOMServer.renderToString()` 或 `ReactDOMServer.renderToStaticMarkup()`。这些方法允许你把 React 组件渲染成初始的 HTML 字符串。
* 当 React 组件需要被集成到现有的非 React 应用中，或者需要执行如测试和服务端渲染等操作时，通常需要使用 `react-dom` 包。

 它们之间的关系

React 使用了所谓的“适配器模式”（Adapter Pattern），`react` 包提供平台独立的解决方案，而像 `react-dom` 这样的包则提供针对特定平台的方法。这允许 React 的核心能够被跨平台使用，例如在浏览器（通过 `react-dom`）、移动设备（通过 React Native 的 `react-native`）、VR 设备（通过 `react-vr`）等。

当你在浏览器中构建 React 应用程序时，你通常会同时安装并使用这两个包。在引导你的应用程序时，你将使用 `react` 包来定义你的组件，然后用 `react-dom` 包将你的顶层组件渲染到页面中的 DOM 元素上。这样的分离也为服务器端渲染或在其他渲染目标上使用 React 打下了基础。

## Portals 作用是什么， 有哪些使用场景？ {#p2-portals}

React Portals 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的方式。通常，组件的渲染输出会被插入到其在组件树中的父组件下，但是 Portals 提供了一种穿透组件层次结构直接渲染到任意 DOM 节点的方法。

 React Portals 的作用

1. **父子结构逃逸**：React Portals 允许你将子组件渲染到其父组件 DOM 结构之外的地方，这在视觉和位置上「逃逸」了它们的父组件。
2. **样式继承独立**：使用 Portal 的组件通常可以避免父组件样式的影响，易于控制和自定义样式。

3. **事件冒泡正常**：尽管 Portal 可以渲染到 DOM 树中的任何位置，但是事件冒泡会按照 React 组件树而不是 DOM 树来进行。所以，尽管组件可能被渲染到 DOM 树的不同部分，它的行为仍然像常规的 React 子组件一样。

 React Portals 的使用场景

1. **模态框**：最常见的场景之一就是模态对话框，这时候对话框需要覆盖应用程序的其余部分（包括可能存在的其他元素如遮罩层），而且往往模态框的样式不应该受到其它 DOM 元素的影响。

2. **浮动菜单**：对于那些需要覆盖其它元素的浮动菜单或下拉式组件，React Portal 可以使这些组件渲染在最外层，避免被其他 DOM 元素的样式或结构干扰。

3. **提示/通知**：用于在界面上创建提示信息，如 Toasts 或 Snackbars，这些通常会浮动在内容之上并在固定位置显示。

4. **全屏组件**：对于需要全屏显示而不受现有 DOM 层级影响的组件（如图片库的全屏视图、视频播放或者游戏界面）。

5. **第三方库的集成**：有时候需要将 React 组件嵌入由非 React 库管理的 DOM 结构中，此时 Portal 可以非常有用。

总之，Portals 提供了一种灵活的方式来逃离父组件的限制，帮助开发者更加自由和方便地进行 UI 布局，同时也有助于维护组件结构的整洁和一致性。

 代码使用举例

假设我们想创建一个模态框（Modal）组件，我们会希望这个模态框在 DOM 中是在最顶层的，但在 React 组件树中它应该在逻辑上保持在其父组件下。使用 React Portals 可以很容易地实现这一点。

首先，我们在 `public/index.html` 中，添加一个新的 DOM 节点，作为 Portal 的容器：

```html
<!-- index.html -->
<div id="app-root"></div>
<!-- React App 将会挂载在这里 -->
<div id="modal-root"></div>
<!-- Modal 元素将会挂载在这里 -->
```

接着，我们创建一个 `Modal` 组件，它会使用 `ReactDOM.createPortal` 来渲染其子元素到 `#modal-root`：

```javascript
// Modal.js
import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
  render () {
    // 使用 ReactDOM.createPortal 将子元素渲染到 modal-root 中
    return ReactDOM.createPortal(
      // 任何有效的 React 孩子元素
      this.props.children,
      // 一个 DOM 元素
      document.getElementById('modal-root')
    )
  }
}

export default Modal
```

现在，我们可以在应用程序的任何其他组件中使用这个 `Modal` 组件了，不论它们在 DOM 树中的位置如何：

```javascript
// App.js
import React from "react";
import Modal from "./Modal";

class App extends React.Component {
 constructor(props) {
 super(props);
 this.state = { showModal: false };
 }

 handleShow = () => {
 this.setState({ showModal: true });
 };

 handleClose = () => {
 this.setState({ showModal: false });
 };

 render() {
 return (
 <div className="App">
 <button onClick={this.handleShow}>显示模态框</button>

 {this.state.showModal ? (
 <Modal>
 <div className="modal">
 <div className="modal-content">
 <h2>我是一个模态框!</h2>
 <button onClick={this.handleClose}>关闭</button>
 </div>
 </div>
 </Modal>
 ) : null}
 </div>
 );
 }
}

export default App;
```

在以上代码中，无论 `Modal` 组件在 `App` 组件中的位置如何，模态框的渲染位置总是在 `#modal-root` 中，这是一个典型的使用 React Portals 的例子。上述代码中的模态框在视觉上会覆盖整个应用程序的位置，但在组件层次结构中它仍然是 `App` 组件的子组件。

## 介绍一下 HOC {p0-hoc}

React 中的 HOC（高阶组件，Higher-Order Components）是一种基于 React 的组合特性而形成的设计模式，用于重用组件逻辑。一个高阶组件是一个函数，它接受一个组件并返回一个新组件。

HOC 允许你为组件添加额外的功能而无需更改组件自身的实现。这种模式可以帮助你在 React 应用程序中保持 DRY（不重复你自己），并且可以提升组件的可测试性和可维护性。

 HOC 的使用场景包括

1. **代码复用、逻辑和引导抽象：** 可以将共享逻辑提取到 HOC 中，让不同的组件能够重用这段逻辑。
2. **渲染劫持：** 在 HOC 中可以修改传入组件的 JSX 结构。
3. **状态抽象和操作：** 可以将内部状态和相关方法从组件中抽离出来。
4. **Props 代理：** 通过 HOC 可以添加、编辑或删除传入组件的 props。

 HOC 的定义方式

```jsx
function withSubscription(WrappedComponent, selectData) {
 // 返回一个 class 组件
 return class extends React.Component {
 constructor(props) {
 super(props);
 this.handleChange = this.handleChange.bind(this);
 this.state = {
 data: selectData(DataSource, props)
 };
 }

 componentDidMount() {
 // ...负责订阅相关的操作...
 }

 componentWillUnmount() {
 // ...取消订阅...
 }

 handleChange() {
 this.setState({
 data: selectData(DataSource, this.props)
 });
 }

 render() {
 // ... 并使用新数据渲染被包装的组件!
 // 请注意，我们可能还会传递其他属性
 return <WrappedComponent data={this.state.data} {...this.props} />;
 }
 };
}
```

在这个例子中，`withSubscription` 是一个 HOC。它接受一个组件 `WrappedComponent` 和一个函数 `selectData` 作为参数，这个函数用于从数据源中选择需要的数据。返回一个新的组件，这个新组件通过 `state` 管理数据，并在挂载后订阅数据源，在卸载前取消订阅，并且在数据改变时通过 `setState` 更新数据。

 注意事项

* HOC 不应该修改传入的组件，而是使用组合的方式将其包裹起来。
* 传递不相关的 props 至被包裹的组件，可能会导致属性冲突。
* HOC 应该传递不与高阶组件相关的 props 至被包裹的组件，这有助于保持组件的纯净和可复用性。
* 对于 HOC，通常需要注意不要在 render 方法中创建 HOC，因为这会导致组件的不必要的重新挂载。

总而言之，HOC 是 React 中一个非常有用的模式，允许开发者以声明方式抽象组件逻辑，提高组件复用。
