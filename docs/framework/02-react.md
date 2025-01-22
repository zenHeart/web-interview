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

- 用于标识列表中的元素
- 帮助 React 识别哪些元素改变了
- 不推荐使用数组索引作为 key

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

## mobx

## React 与 Vue 的主要区别

- 设计理念: React 推崇函数式编程，Vue 推崇声明式编程
- 数据流: React 单向数据流，Vue 支持双向绑定
- 状态管理: React 使用 setState/Hooks，Vue 使用响应式系统
- 模板语法: React 使用 JSX，Vue 使用模板语法
- 生态系统: React 社区更大，第三方库更丰富

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




