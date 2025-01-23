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

* created_at: 2024-10-12T15:29:46Z
* updated_at: 2024-12-06T04:08:00Z
* labels: web框架, 小米
* milestone: 高

**关键词**：React setState 过程

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

## react 如何获得 dom {#p16-react-get-dom}

## react 中如何引入样式 {#p17-react-引入样式}

## react 虚拟 dom 如何对比，diff 算法 {#p18-react-virtual-dom-diff}

## react hooks 原理

## useMemo 是否支持异步函数 {#p1-use-memo-async}

## useCallback 是否支持异步函数 {#p1-use-callback-async}

## react fiber 的作用和原理

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
