# react

## 题目

1. react element 和 component 的区别
2. react jsx 语法
   1. jsx 返回 null undefined false 区别
3. React.Children.map 和 props.children 的区别
4. 类组件和函数组件的使用场景
5. react 生命周期
6. 请求在哪个阶段发出，如何取消请求
7. shouldComponentUpdate 的作用
8. state 和 props 区别
9. 组件什么时候用 state
   1. setState 第二个参数的作用
10. setState 后发生了什么
11. 受控和非受控组件
12. 高阶组件是什么
13. 错误边界组件如何使用
14. react 组件通信方式
    1. 父子组件
    2. 兄弟组件
    3. 跨级通信
    4. 无级通信
15. react refs 的作用
16. react 中的 key 有什么作用
17. react 如何获得 dom
18. react 中如何引入样式
    1. 内联样式
    2. css 类
    3. css in js
19. react 虚拟 dom 如何对比，diff 算法
20. react hooks 原理
21. react fiber 的作用和原理
22. react 如何处理事件，Synthetic Event 的作用
23. react router
24. redux
25. mobx

1. React 与 Vue 的主要区别:

- 设计理念: React 推崇函数式编程，Vue 推崇声明式编程
- 数据流: React 单向数据流，Vue 支持双向绑定
- 状态管理: React 使用 setState/Hooks，Vue 使用响应式系统
- 模板语法: React 使用 JSX，Vue 使用模板语法
- 生态系统: React 社区更大，第三方库更丰富

2. React 生命周期:

```javascript
// 函数组件使用 useEffect 代替生命周期
function Example () {
  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    // 执行副作用
    return () => {
      // 清理副作用 (相当于 componentWillUnmount)
    }
  }, [dependencies])
}
```

3. React Hooks 的使用和原理:

```javascript
// useState: 状态管理
const [count, setCount] = useState(0)

// useEffect: 副作用处理
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])

// useCallback: 缓存函数
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b]
)

// useMemo: 缓存计算结果
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
)

// useRef: 保存可变值
const inputRef = useRef(null)
```

4. 虚拟 DOM 和 Diff 算法:

- 虚拟 DOM 是真实 DOM 的 JavaScript 对象表示
- Diff 算法对比新旧虚拟 DOM 树，找出需要更新的节点
- React 使用 Fiber 架构优化渲染过程

```javascript
// 虚拟 DOM 示例
const vdom = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      {
        type: 'h1',
        props: {
          children: 'Hello'
        }
      }
    ]
  }
}
```

5. 状态管理方案:

```javascript
// Context API
const ThemeContext = React.createContext('light')

function App () {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  )
}

function useTheme () {
  return React.useContext(ThemeContext)
}

// Redux
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

// Recoil
const countState = atom({
  key: 'countState',
  default: 0
})
```

6. 性能优化方法:

```javascript
// React.memo 优化函数组件
// 虚拟列表优化长列表
import { FixedSizeList } from 'react-window'

const MemoComponent = React.memo(function MyComponent (props) {
  /* 渲染内容 */
})

// useMemo 优化计算
const memoizedValue = useMemo(() => {
  return expensiveComputation(prop1, prop2)
}, [prop1, prop2])
function Row ({ index, style }) {
  return <div style={style}>Row {index}</div>
}

function List () {
  return (
    <FixedSizeList
      height={400}
      width={300}
      itemCount={1000}
      itemSize={35}
    >
      {Row}
    </FixedSizeList>
  )
}
```

7. 组件通信方式:

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

8. React Router 的使用:

```javascript
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/user/:id" component={User} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
```

9. 受控组件与非受控组件:

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

10. React 错误边界:

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

11. React 18 新特性:

- 自动批处理
- Suspense 服务端渲染
- Concurrent Mode

```javascript
// 自动批处理
// React 18 之前
setTimeout(() => {
  setCount(c => c + 1) // 触发重渲染
  setFlag(f => !f) // 触发重渲染
}, 0)

// React 18
setTimeout(() => {
  setCount(c => c + 1) // 不会立即重渲染
  setFlag(f => !f) // 批处理，只触发一次重渲染
}, 0)

// Suspense
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

12. React 中的 key:

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

13. React 中的事件处理:

```javascript
// 事件绑定方式
class Component extends React.Component {
  // 方式1：箭头函数
  handleClick = (e) => {
    console.log(this);
  }

  // 方式2：构造函数中绑定
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // 方式3：render 中使用箭头函数（不推荐）
  render() {
    return <button onClick={(e) => this.handleClick(e)}>Click</button>
  }
}
```

14. React 中的 Refs:

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

15. React 中的高阶组件(HOC):

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


## 题库来源

* [剑指前端 Offer](https://febook.hzfe.org/awesome-interview/)
