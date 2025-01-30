# 组件

## react element 和 component 的区别 {#p1-react-element-component}

## jsx 返回 null undefined false 区别 {#p2-jsx-return-null-undefined-false}

## 构建组件的方式有哪些 {#p1-component-type}

1. Class Components（类组件）：使用ES6的类语法来定义组件。类组件继承自`React.Component`，并通过`render`方法返回需要渲染的React元素。

```jsx
class MyComponent extends React.Component {
 render() {
 return <div>Hello</div>;
 }
}
```

2. Function Components（函数组件）：使用函数来定义组件，函数接收`props`作为参数，并返回需要渲染的React元素。

```jsx
function MyComponent(props) {
 return <div>Hello</div>;
}
```

3. Higher-Order Components（高阶组件）：高阶组件是一个函数，接收一个组件作为参数，并返回一个新的增强组件。它用于在不修改原始组件的情况下，添加额外的功能或逻辑。

```jsx
function withLogger(WrappedComponent) {
 return class extends React.Component {
 componentDidMount() {
 console.log('Component did mount!');
 }

 render() {
 return <WrappedComponent {...this.props} />;
 }
 };
}

const EnhancedComponent = withLogger(MyComponent);
```

4. Function as Children（函数作为子组件）：将函数作为子组件传递给父组件，并通过父组件的props传递数据给子组件。

```jsx
function MyComponent(props) {
 return <div>{props.children('Hello')}</div>;
}

<MyComponent>
 {(message) => <p>{message}</p>}
</MyComponent>
```

这些是React中常见的构建组件的方式。每种方式都适用于不同的场景，你可以根据自己的需求选择合适的方式来构建组件。

5. `React.cloneElement`：`React.cloneElement`是一个函数，用于克隆并返回一个新的React元素。它可以用于修改现有元素的props，或者在将父组件的props传递给子组件时进行一些额外的操作。

```jsx
const parentElement = <div>Hello</div>;
const clonedElement = React.cloneElement(parentElement, { className: 'greeting' });

// Result: <div className="greeting">Hello</div>
```

6. `React.createElement`：`React.createElement`是一个函数，用于创建并返回一个新的React元素。它接收一个类型（组件、HTML标签等）、props和子元素，并返回一个React元素。

```jsx
const element = React.createElement('div', { className: 'greeting' }, 'Hello');

// Result: <div className="greeting">Hello</div>
```

`React.createElement`和`React.cloneElement`通常在一些特殊的场景下使用，例如在高阶组件中对组件进行包装或修改。它们不是常规的组件构建方式，但是在某些情况下是非常有用的。非常抱歉之前的遗漏，希望这次能够更全面地回答您的问题。

## 如何实现vue 中 keep-alive 的功能？{#p0-keep-alive}

**keep-alive 原理**
可以参考这个文章： [资料](https://github.com/pro-collection/interview-question/issues/119)

**实现**
当使用函数式组件时，可以使用React的Hooks来实现类似Vue的`<keep-alive>`功能。下面是一个使用React函数式组件和Hooks实现类似Vue的`<keep-alive>`功能的示例：

```jsx
import React, { useEffect, useRef } from 'react';

const withKeepAlive = (WrappedComponent) => {
 const cache = new Map(); // 使用Map来存储缓存的组件实例

 return (props) => {
 const { id } = props;
 const componentRef = useRef(null);

 useEffect(() => {
 if (!cache.has(id)) {
 cache.set(id, componentRef.current); // 缓存组件实例
 }

 return () => {
 cache.delete(id); // 组件销毁时从缓存中移除
 };
 }, [id]);

 const cachedInstance = cache.get(id); // 获取缓存的组件实例

 if (cachedInstance) {
 return React.cloneElement(cachedInstance.props.children, props); // 渲染缓存的组件实例的子组件
 }

 return <WrappedComponent ref={componentRef} {...props} />; // 初次渲染时渲染原始组件
 };
};
```

使用这个高阶函数组件来包裹需要缓存的函数式组件：

```jsx
const SomeComponent = (props) => {
 return (
 <div>
 <h1>Some Component</h1>
 <p>{props.message}</p>
 </div>
 );
};

const KeepAliveSomeComponent = withKeepAlive(SomeComponent);
```

在父组件中使用`KeepAliveSomeComponent`来实现缓存功能：

```jsx
const ParentComponent = () => {
 const [showComponent, setShowComponent] = useState(false);

 const toggleComponent = () => {
 setShowComponent(!showComponent);
 };

 return (
 <div>
 <button onClick={toggleComponent}>Toggle Component</button>
 {showComponent && (
 <KeepAliveSomeComponent id="some-component" message="Hello, World!" />
 )}
 </div>
 );
};
```

在上述示例中，`ParentComponent`包含一个按钮，点击按钮时切换`KeepAliveSomeComponent`的显示与隐藏。每次切换时，`KeepAliveSomeComponent`的状态将保留，因为它被缓存并在需要时重新渲染。

同样地，这个示例只实现了最基本的缓存功能，并没有处理更复杂的场景。如果需要更复杂的缓存功能，可以考虑使用状态管理库来管理组件的状态和缓存。

## class Components 和 Function Components 有区别？ {#p1-react-class-function}

Class组件是使用ES6的类语法定义的组件，它是继承自React.Component的一个子类。Class组件有自己的状态和生命周期方法，可以通过`this.state`来管理状态，并通过`this.setState()`来更新状态。

```jsx
class Counter extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 count: 0
 };
 }

 increment = () => {
 this.setState({ count: this.state.count + 1 });
 };

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={this.increment}>Increment</button>
 </div>
 );
 }
}
```

函数组件是使用函数来定义的组件，在React 16.8版本引入的Hooks之后，函数组件可以拥有自己的状态和副作用，可以使用`useState`和其他Hooks来管理状态。

```jsx
import React, { useState } from 'react';

function Counter() {
 const [count, setCount] = useState(0);

 const increment = () => {
 setCount(count + 1);
 };

 return (
 <div>
 <p>Count: {count}</p>
 <button onClick={increment}>Increment</button>
 </div>
 );
}
```

函数组件通常比Class组件更简洁和易于理解，尤其是在处理简单的逻辑和状态时。然而，Class组件仍然在一些特定情况下有它们的优势，例如需要使用生命周期方法、引入Ref或者需要更多的精确控制和性能优化时。

**细节对比**

| 方面 | Class组件 | 函数组件 |
| --- | --- | --- |
| 语法 | 使用ES6类语法定义组件 | 使用函数语法定义组件 |
| 继承 | 继承自React.Component类 | 无需继承任何类 |
| 状态管理 | 可通过this.state和this.setState来管理状态 | 可使用useState Hook来管理状态 |
| 生命周期方法 | 可使用生命周期方法，如componentDidMount、componentDidUpdate等 | 可使用Effect Hook来处理副作用 |
| Props | 可通过this.props来访问父组件传递的props | 可通过函数参数来访问父组件传递的props |
| 状态更新 | 使用this.setState来更新状态 | 使用对应的Hook来更新状态 |
| 内部引用 | 可以通过Ref引用组件实例或DOM元素 | 可以使用Ref Hook引用组件实例或DOM元素 |
| 性能优化 | 可以使用shouldComponentUpdate来控制组件是否重新渲染 | 可以使用React.memo或useMemo Hook来控制组件是否重新渲染 |
| 访问上下文 | 可以使用this.context来访问上下文 | 可以使用useContext Hook来访问上下文 |

需要注意的是，这只是一些常见的区别，并不是所有的区别。在实际开发中，具体的区别可能还会根据需求和使用的React版本而有所变化。

**关键词**：React函数组件对比类组件、React函数组件对比类组件性能、React函数组件对比类组件状态管理、React函数组件与类组件

函数组件和类组件是React中两种定义组件的方式，它们有以下区别：

1. 语法：函数组件是使用函数声明的方式定义组件，而类组件是使用ES6的class语法定义组件。

2. 写法和简洁性：函数组件更为简洁，没有类组件中的繁琐的生命周期方法和this关键字。函数组件只是一个纯粹的JavaScript函数，可以直接返回JSX元素。

3. 状态管理：在React的早期版本中，函数组件是无法拥有自己的状态（state）和生命周期方法的。但是从React 16.8开始，React引入了Hooks（钩子）机制，使得函数组件也能够拥有状态和使用生命周期方法。

4. 性能：由于函数组件不拥有实例化的过程，相较于类组件，它的性能会稍微高一些。但是在React 16.6之后，通过React.memo和PureComponent的优化，类组件也能够具备相对较好的性能表现。

总体来说，函数组件更加简洁、易读，适合用于无需复杂逻辑和生命周期方法的场景，而类组件适合于需要较多逻辑处理和生命周期控制的场景。另外，使用Hooks后，函数组件也能够拥有与类组件类似的能力，因此在开发中可以更加灵活地选择使用哪种方式来定义组件。

**状态管理方面做对比**

从状态管理的角度来看，函数组件和类组件在React中的区别主要体现在以下几个方面：

1. 类组件中的状态管理：类组件通过使用`state`属性来存储和管理组件的状态。`state`是一个对象，可以通过`this.state`进行访问和修改。类组件可以使用`setState`方法来更新状态，并通过`this.setState`来触发组件的重新渲染。在类组件中，状态的更新是异步的，React会将多次的状态更新合并为一次更新，以提高性能。

2. 函数组件中的状态管理：在React之前的版本中，函数组件是没有自己的状态的，只能通过父组件通过`props`传递数据给它。但是从React 16.8版本开始，通过引入Hooks机制，函数组件也可以使用`useState`钩子来定义和管理自己的状态。`useState`返回一个状态值和一个更新该状态值的函数，通过解构赋值的方式进行使用。每次调用状态更新函数，都会触发组件的重新渲染。

3. 类组件的生命周期方法：类组件有很多生命周期方法，例如`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等等。这些生命周期方法可以用来在不同的阶段执行特定的逻辑，例如在`componentDidMount`中进行数据的初始化，在`componentDidUpdate`中处理状态或属性的变化等等。通过这些生命周期方法，类组件可以对组件的状态进行更加细粒度的控制。

4. 函数组件中的副作用处理：在函数组件中，可以使用`useEffect`钩子来处理副作用逻辑，例如数据获取、订阅事件、DOM操作等。`useEffect`接收一个回调函数和一个依赖数组，可以在回调函数中执行副作用逻辑，依赖数组用于控制副作用的执行时机。函数组件的副作用处理与类组件的生命周期方法类似，但是可以更灵活地控制执行时机。

函数组件和类组件在状态管理方面的主要区别是函数组件通过使用Hooks机制来定义和管理状态，而类组件通过`state`属性来存储和管理状态。
函数组件中使用`useState`来定义和更新状态，而类组件则使用`setState`方法。
另外，函数组件也可以使用`useEffect`来处理副作用逻辑，类似于类组件的生命周期方法。通过使用Hooks，函数组件在状态管理方面的能力得到了大幅度的提升和扩展。

**性能方面做对比**

在性能方面，函数组件和类组件的表现也有一些区别。

1. 初始渲染性能：函数组件相对于类组件来说，在初始渲染时具有更好的性能。这是因为函数组件本身的实现比类组件更加简单，不需要进行实例化和维护额外的实例属性。函数组件在渲染时更轻量化，因此在初始渲染时更快。

2. 更新性能：当组件的状态或属性发生变化时，React会触发组件的重新渲染。在类组件中，由于状态的更新是异步的，React会将多次的状态更新合并为一次更新，以提高性能。而在函数组件中，由于每次状态更新都会触发组件的重新渲染，可能会导致性能略低于类组件。但是，通过使用React的memo或useMemo、useCallback等优化技术，可以在函数组件中避免不必要的重新渲染，从而提高性能。

3. 代码拆分和懒加载：由于函数组件本身的实现比类组件更加简单，所以在进行代码拆分和懒加载时，函数组件相对于类组件更容易实现。React的Suspense和lazy技术可以在函数组件中实现组件的按需加载，从而提高应用的性能。

函数组件相对于类组件在初始渲染和代码拆分方面具有优势，在更新性能方面可能稍逊一筹。然而，React的优化技术可以在函数组件中应用，以提高性能并减少不必要的渲染。此外，性能的差异在实际应用中可能并不明显，因此在选择使用函数组件还是类组件时，应根据具体场景和需求进行综合考量。

## constructor 和 getInitialState 的区别? {#p0-getInitialState}

在 React 中，constructor 是一个类的构造函数，用于初始化类的成员变量和方法，这个函数不仅会在组件实例化时调用，还会在后续的组件更新时调用。而 getInitialState 是一个组件的声明周期函数，用于初始化组件的状态，该函数只会在组件实例化时调用一次，后续的更新不会再调用。

具体来说，constructor 用于初始化类成员变量和方法，如下面的示例代码所示：

```
class MyComponent extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 count: 0
 };
 this.handleClick = this.handleClick.bind(this);
 }

 handleClick() {
 this.setState({ count: this.state.count + 1 });
 }

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={this.handleClick}>Click me</button>
 </div>
 );
 }
}
```

在上面的代码中，constructor 用于初始化组件的状态 count 和绑定 handleClick 方法的 this 指向。每次组件更新时，constructor 函数都会被调用。

而 getInitialState 则是用于初始化组件的状态，如下面的示例代码所示：

```
class MyComponent extends React.Component {
 getInitialState() {
 return {
 count: 0
 };
 }

 handleClick() {
 this.setState({ count: this.state.count + 1 });
 }

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={this.handleClick}>Click me</button>
 </div>
 );
 }
}
```

在上面的代码中，getInitialState 用于初始化组件的状态 count，该函数只会在组件实例化时调用一次。后续的更新不会再调用。需要注意的是，在 React 16.3 之后，getInitialState 已经不再被支持，需要使用 constructor 来初始化 state。

## React.Children.map 和 props.children 的区别 {#p3-react-children-map-props-children}

## 类组件和函数组件的使用场景 {#p2-class-component-function-component}

## 请求在哪个阶段发出，如何取消请求 {#p2-request-cancel}

## ref 有哪些使用场景，请举例 {#p0-ref}

React的ref用于获取组件或DOM元素的引用。它有以下几个常见的使用场景：

1. 访问子组件的方法或属性：通过ref可以获取子组件的实例，并调用其方法或访问其属性。

```jsx
import React, { useRef } from 'react';

function ChildComponent() {
 const childRef = useRef(null);

 const handleClick = () => {
 childRef.current.doSomething();
 }

 return (
 <div>
 <button onClick={handleClick}>Click</button>
 <Child ref={childRef} />
 </div>
 );
}

const Child = React.forwardRef((props, ref) => {
 const doSomething = () => {
 console.log('Doing something...');
 }

 // 将ref引用绑定到组件的实例
 React.useImperativeHandle(ref, () => ({
 doSomething
 }));

 return <div>Child Component</div>;
});
```

2. 获取DOM元素：通过ref可以获取组件渲染后的DOM元素，并进行操作。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
 const inputRef = useRef(null);

 const handleClick = () => {
 inputRef.current.focus();
 }

 return (
 <div>
 <input ref={inputRef} type="text" />
 <button onClick={handleClick}>Focus Input</button>
 </div>
 );
}
```

3. 动态引用：通过ref可以在函数组件中动态地引用不同的组件或DOM元素。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
 const ref = useRef(null);
 const condition = true;

 const handleClick = () => {
 ref.current.doSomething();
 }

 return (
 <div>
 {condition ? (
 <ChildComponent ref={ref} />
 ) : (
 <OtherComponent ref={ref} />
 )}
 <button onClick={handleClick}>Click</button>
 </div>
 );
}
```

这些例子展示了一些使用React的ref的常见场景，但实际上，ref的用途非常灵活，可以根据具体需求进行扩展和应用。

## state 和 props 区别 {#p1-state-props}

## 受控和非受控组件 {#p0-controlled-uncontrolled-component}

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

## HOC {#p0-hoc}

```javascript
// HOC 示例
function withSubscription (WrappedComponent, selectData) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        data: selectData(DataSource, props)
      }
    }

    componentDidMount () {
      DataSource.addListener(this.handleChange)
    }

    componentWillUnmount () {
      DataSource.removeListener(this.handleChange)
    }

    handleChange () {
      this.setState({
        data: selectData(DataSource, this.props)
      })
    }

    render () {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}
```

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

React高阶组件（Higher-Order Component，HOC）是一种用于复用组件逻辑的设计模式。它本质上是一个函数，接受一个组件作为参数，并返回一个新的增强过的组件。

通过使用高阶组件，我们可以将一些通用的功能逻辑抽象出来，并将其应用到多个组件中，从而避免代码重复和逻辑分散的问题。

**React高阶组件需要满足以下条件**：

1. 接受一个组件作为参数：高阶组件函数应该接受一个组件作为参数，并返回一个新的增强过的组件。

2. 返回一个新的组件：高阶组件函数应该在内部创建一个新的组件，并将其返回作为结果。这个新组件可以是一个类组件或函数组件。

3. 传递props：高阶组件应该将传递给它的props传递给原始组件，可以通过使用展开运算符或手动传递props进行传递。

4. 可以修改props：高阶组件可以对传递给原始组件的props进行处理、转换或增加额外的props。

5. 可以访问组件生命周期方法和状态：高阶组件可以在新组件中访问组件的生命周期方法和状态，并根据需要执行逻辑。

**使用场景**

React高阶组件有以下几个常见的使用场景：

1. 代码复用：当多个组件之间有相同的逻辑和功能时，可以将这些逻辑和功能抽象成一个高阶组件，并在多个组件中使用该高阶组件进行代码复用。

```jsx
const withLogging = (WrappedComponent) => {
 return (props) => {
 useEffect(() => {
 console.log('Component is mounted');
 }, []);

 return <WrappedComponent {...props} />;
 }
}

const MyComponent = withLogging(MyOriginalComponent);
```

2. 条件渲染：高阶组件可以根据一些条件来决定是否渲染原始组件或其他组件。这对于实现权限控制、用户认证等场景非常有用。

```jsx
const withAuthorization = (WrappedComponent) => {
 return (props) => {
 if (props.isAuthenticated) {
 return <WrappedComponent {...props} />;
 } else {
 return <div>Unauthorized</div>;
 }
 }
}

const MyComponent = withAuthorization(MyOriginalComponent);
```

3. Props 改变：高阶组件可以监听原始组件的props的变化，并在变化时执行一些逻辑。这对于实现数据的深拷贝、数据的格式化等场景非常有用。

```jsx
const withDeepCopy = (WrappedComponent) => {
 return (props) => {
 const prevPropsRef = useRef(props);

 useEffect(() => {
 if (prevPropsRef.current.data !== props.data) {
 const copiedData = JSON.parse(JSON.stringify(props.data));
 // Do something with copiedData...
 }

 prevPropsRef.current = props;
 }, [props.data]);

 return <WrappedComponent {...props} />;
 }
}

const MyComponent = withDeepCopy(MyOriginalComponent);
```

4. 功能增强：高阶组件可以对原始组件的功能进行增强，例如增加表单校验、日志记录、性能优化等。

```jsx
const withFormValidation = (WrappedComponent) => {
 return (props) => {
 const [isValid, setValid] = useState(false);

 const validateForm = () => {
 // Perform form validation logic...
 setValid(true);
 }

 return (
 <div>
 <WrappedComponent {...props} />
 {isValid ? <div>Form is valid</div> : <div>Form is invalid</div>}
 </div>
 );
 }
}

const MyComponent = withFormValidation(MyOriginalComponent);
```

5. 渲染劫持：高阶组件可以在原始组件渲染之前或之后执行一些逻辑，例如在渲染之前进行数据加载，或在渲染之后进行动画效果的添加等。

```jsx
const withDataFetching = (WrappedComponent) => {
 return (props) => {
 const [data, setData] = useState(null);

 useEffect(() => {
 // Fetch data...
 axios.get('/api/data')
 .then(response => {
 setData(response.data);
 })
 .catch(error => {
 console.error('Error fetching data:', error);
 });
 }, []);

 if (data === null) {
 return <div>Loading...</div>;
 } else {
 return <WrappedComponent data={data} {...props} />;
 }
 }
}

const MyComponent = withDataFetching(MyOriginalComponent);
```

总的来说，React高阶组件提供了一种灵活的方式来对组件进行组合和功能增强，可以在不修改原始组件的情况下对其进行扩展和定制。

## 错误边界组件如何使用 {#p1-error-boundary-component}

## react 组件通信方式 {#p0-react-component-communication}

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

## useMemo {#p0-useMemo}

`React.memo` 和 `useMemo` 是在 React 中处理性能优化的两个工具，虽然它们名称相似，但是它们的作用和使用方法是不同的。

`React.memo` 是高阶组件，它可以用来优化函数组件的渲染性能。它会比较当前组件的 `props` 和 `state` 是否发生了变化，如果都没有变化，就不会重新渲染该组件，而是直接使用之前的结果。例如：

```jsx
import React from 'react';
 
const MyComponent = React.memo(props => {
 return <div>{props.value}</div>;
});
```

在上面的代码中，`React.memo` 包装了一个简单的函数组件 `MyComponent`。如果该组件的 `value` prop 和 `state` 没有发生变化，那么就会直接使用之前的结果不会重新渲染。

`useMemo` 是 `React` 中一个 hooks，它可以用来缓存计算结果，从而优化组件渲染性能。它接受两个参数：要缓存的计算函数和依赖项数组。每当依赖项发生变化时，该计算函数就会重新计算，并返回一个新的结果。例如：

```jsx
import React, { useMemo } from 'react';
 
const MyComponent = props => {
 const result = useMemo(() => expensiveComputation(props.value), [props.value]);
 return <div>{result}</div>;
};
```

在上面的代码中，我们传递了一个计算函数 `expensiveComputation`，以及一个依赖项数组 `[props.value]`。如果依赖项没有发生变化，`myValue` 就会被缓存起来，不会重新计算。

总的来说：

`React.memo` 的作用是优化函数组件的渲染性能，它可以比较组件的 `props` 和 `state` 是否发生变化，如果没有变化，就不会重新渲染。

`useMemo` 的作用是缓存计算结果，从而避免重复计算，它接受一个计算函数和一个依赖项数组，当依赖项发生变化时，计算函数就会重新计算，返回一个新的结果，否则就会使用之前的缓存结果。

## useCallback 是否支持异步函数 {#p1-use-callback-async}

## 父组件调用子组件的方法 {#p1-parent-call-children}

在React中，我们经常在子组件中调用父组件的方法，一般用props回调即可。但是有时候也需要在父组件中调用子组件的方法，通过这种方法实现高内聚。有多种方法，请按需服用。

 类组件中

 React.createRef()

* 优点：通俗易懂，用ref指向。

* 缺点：使用了HOC的子组件不可用，无法指向真是子组件

 比如一些常用的写法，mobx的@observer包裹的子组件就不适用此方法。

```jsx
import React, { Component } from 'react'

class Sub extends Component {
  callback () {
    console.log('执行回调')
  }

  render () {
    return <div>子组件</div>
  }
}

class Super extends Component {
  constructor (props) {
    super(props)
    this.sub = React.createRef()
  }

  handleOnClick () {
    this.sub.callback()
  }

  render () {
    return (
 <div>
 <Sub ref={this.sub}></Sub>
 </div>
    )
  }
}
```

 ref的函数式声明

* 优点：ref写法简洁
* 缺点：使用了HOC的子组件不可用，无法指向真是子组件（同上）

使用方法和上述的一样，就是定义ref的方式不同。

```csharp
...

<Sub ref={ref => this.sub = ref}></Sub>

...


```

 使用props自定义onRef属性

* 优点：假如子组件是嵌套了HOC，也可以指向真实子组件。
* 缺点：需要自定义props属性

```tsx
import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
class Sub extends Component {
  componentDidMount () {
    // 将子组件指向父组件的变量
    this.props.onRef && this.props.onRef(this)
  }

  callback () {
    console.log('执行我')
  }

  render () {
    return (<div>子组件</div>)
  }
}

class Super extends Component {
  handleOnClick () {
    // 可以调用子组件方法
    this.Sub.callback()
  }

  render () {
    return (
 <div>
   <div onClick={this.handleOnClick}>click</div>
   {/* eslint-disable-next-line */}
   <Sub onRef={ node => this.Sub = node }></Sub>
    </div>)
  }
}
```

 函数组件、Hook组件

 useImperativeHandle

* 优点： 1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件
* 缺点： 1、需要自定义props属性 2、需要自定义暴露的方法

```javascript
import React, { useImperativeHandle } from 'react'
import { observer } from 'mobx-react'

const Parent = () => {
  const ChildRef = React.createRef()

  function handleOnClick () {
    ChildRef.current.func()
  }

  return (
 <div>
 <button onClick={handleOnClick}>click</button>
 <Child onRef={ChildRef} />
 </div>
  )
}

const Child = observer(props => {
  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    // 需要将暴露的接口返回出去
    return {
      func
    }
  })
  function func () {
    console.log('执行我')
  }
  return <div>子组件</div>
})

export default Parent
```

 forwardRef

使用forwardRef抛出子组件的ref

这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。

```javascript
import React, { useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))

  return <input ref={inputRef} type="text" />
})

const Sub = observer(FancyInput)

const App = props => {
  const fancyInputRef = useRef()

  return (
 <div>
 <FancyInput ref={fancyInputRef} />
 <button
 onClick={() => fancyInputRef.current.focus()}
 >父组件调用子组件的 focus</button>
 </div>
  )
}

export default App
```

 总结

父组件调子组件函数有两种情况

* 子组件无HOC嵌套：推荐使用ref直接调用
* 有HOC嵌套：推荐使用自定义props的方式

## 如何给 children 添加额外的属性 {#p0-react-children-add-prop}

在 React 中，可以使用`React.cloneElement()` 方法来给 children 添加额外的属性。

`React.cloneElement(element, props, ...children)`

其中，element 是需要克隆的 React 元素，props 是要添加的属性，children 是要传递给克隆元素的子元素。

以下是一个示例：

```jsx
import React from "react";

function ParentComponent() {
 return (
 <div>
 {React.Children.map(children, (child) =>
 React.cloneElement(child, { additionalProp: "value" })
 )}
 </div>
 );
}

function ChildComponent(props) {
 return <div>{props.additionalProp}</div>;
}

function App() {
 return (
 <ParentComponent>
 <ChildComponent />
 <ChildComponent />
 </ParentComponent>
 );
}

export default App;
```

在上面的示例中，ParentComponent 是一个父组件，它接收了一些 children，并使用 React.Children.map() 方法遍历每个 child，然后使用 React.cloneElement() 方法给每个 child 添加了一个名为 additionalProp 的属性。

ChildComponent 是一个子组件，它通过 props.additionalProp 获取到了父组件传递的 additionalProp 属性值。

这样，通过 React.cloneElement() 方法，我们可以给 children 添加额外的属性。

## ref 是如何拿到函数组件的实例 {#p0-ref}

 使用`forwordRef`

将`input`单独封装成一个组件`TextInput`。

```jsx
const TextInput = React.forwardRef((props,ref) => {
 return <input ref={ref}></input>
})

```

用`TextInputWithFocusButton`调用它

```jsx
function TextInputWithFocusButton() {
 // 关键代码
 const inputEl = useRef(null);
 const onButtonClick = () => {
 // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
 inputEl.current.focus();
 };
 return (
 <>
 // 关键代码
 <TextInput ref={inputEl}></TextInput>
 <button onClick={onButtonClick}>Focus the input</button>
 </>
 );
}

```

 useImperativeHandle

有时候，我们可能**不想将整个子组件暴露给父组件**，而只是暴露出父组件需要的值或者方法，这样可以让代码更加明确。而`useImperativeHandle` Api就是帮助我们做这件事的。

```jsx
const TextInput = forwardRef((props,ref) => {
 const inputRef = useRef();
 // 关键代码
 useImperativeHandle(ref, () => ({
 focus: () => {
 inputRef.current.focus();
 }
 }));
 return <input ref={inputRef} />
})


function TextInputWithFocusButton() {
 // 关键代码
 const inputEl = useRef(null);
 const onButtonClick = () => {
 // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
 inputEl.current.focus();
 };
 return (
 <>
 // 关键代码
 <TextInput ref={inputEl}></TextInput>
 <button onClick={onButtonClick}>
 Focus the input
 </button>
 </>
 );
}


```

也可以使用`current.focus()`来做`input`聚焦。

> 这里要注意的是，子组件`TextInput`中的`useRef`对象，只是用来获取`input`元素的，大家不要和父组件的`useRef`混淆了。

## createContext 和 useContext 有什么区别， 是做什么用的 {#p0-createContext}

 `createContext` 和 `useContext`

`createContext`和`useContext`是React中用于处理上下文（Context）的两个钩子函数，它们用于在组件之间共享数据。

`createContext`用于创建一个上下文对象，该对象包含`Provider`和`Consumer`两个组件。`createContext`接受一个初始值作为参数，该初始值将在没有匹配的`Provider`时被使用。

`useContext`用于在函数组件中访问上下文的值。它接受一个上下文对象作为参数，并返回当前上下文的值。

具体区别和用途如下：

1. `createContext`：`createContext`用于创建一个上下文对象，并指定初始值。它返回一个包含`Provider`和`Consumer`组件的对象。`Provider`组件用于在组件树中向下传递上下文的值，而`Consumer`组件用于在组件树中向上获取上下文的值。

```jsx
const MyContext = createContext(initialValue);
```

2. `useContext`：`useContext`用于在函数组件中访问上下文的值。它接受一个上下文对象作为参数，并返回当前上下文的值。使用`useContext`可以避免使用`Consumer`组件进行嵌套。

```jsx
const value = useContext(MyContext);
```

使用上下文的主要目的是在组件树中共享数据，避免通过逐层传递`props`的方式传递数据。上下文可以在跨组件层级的情况下方便地共享数据，使组件之间的通信更加简洁和灵活。

使用步骤如下：

1. 使用`createContext`创建一个上下文对象，并提供初始值。
2. 在组件树中的某个位置使用`Provider`组件，将要共享的数据通过`value`属性传递给子组件。
3. 在需要访问上下文数据的组件中使用`useContext`钩子，获取上下文的值。

需要注意的是，上下文中的数据变化会触发使用该上下文的组件重新渲染，因此应谨慎使用上下文，避免无谓的性能损耗。

 代码示范

当使用`createContext`和`useContext`时，以下是一个简单的代码示例：

```jsx
import React, { createContext, useContext } from 'react';

// 创建上下文对象
const MyContext = createContext();

// 父组件
function ParentComponent() {
 const value = 'Hello, World!';

 return (
 // 提供上下文的值
 <MyContext.Provider value={value}>
 <ChildComponent />
 </MyContext.Provider>
 );
}

// 子组件
function ChildComponent() {
 // 使用 useContext 获取上下文的值
 const value = useContext(MyContext);

 return <div>{value}</div>;
}

// 使用上述组件
function App() {
 return <ParentComponent />;
}
```

在上述示例中，我们首先使用`createContext`创建一个上下文对象`MyContext`。然后，在`ParentComponent`组件中，我们通过`MyContext.Provider`组件提供了上下文的值，值为`'Hello, World!'`。在`ChildComponent`组件中，我们使用`useContext`钩子获取了上下文的值，并将其显示在页面上。

最终，我们在`App`组件中使用`ParentComponent`组件作为根组件。当渲染应用程序时，`ChildComponent`将获取到上下文的值并显示在页面上。

通过这种方式，`ParentComponent`提供了上下文的值，`ChildComponent`通过`useContext`钩子获取并使用该值，实现了组件之间的数据共享。

## forwardsRef 作用是啥， 有哪些使用场景？{#p0-forwardsRef}

`forwardRef` 是 React 提供的一个高阶函数，它可以让你在函数组件中访问子组件的 ref，并把该 ref 传递给子组件。

使用 `forwardRef` 的主要场景是，当你需要访问子组件的 DOM 节点或实例时，比如要操作子组件的滚动条、聚焦输入框等等。在这些场景下，需要用到 `ref`，而 `ref` 又不能直接在函数组件中使用。

下面是 `forwardRef` 的基本使用方式：

```jsx
jsxCopy codeimport React, { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
 return <input type="text" ref={ref} />;
});

function App() {
 const inputRef = React.createRef();

 const handleClick = () => {
 inputRef.current.focus();
 };

 return (
 <div>
 <MyComponent ref={inputRef} />
 <button onClick={handleClick}>Focus Input</button>
 </div>
 );
}
```

在上面的例子中，我们创建了一个 `MyComponent` 组件，并通过 `forwardRef` 来包裹它。这样，`MyComponent` 就可以在 props 中接收一个 `ref` 属性，而 `forwardRef` 将会将该属性转发到子组件中。

在 `App` 组件中，我们创建了一个 `inputRef` 对象，并将它作为 `MyComponent` 的 `ref` 属性传递给了 `MyComponent` 组件。然后，我们在 `handleClick` 函数中使用 `inputRef` 来聚焦输入框。

需要注意的是，`forwardRef` 的回调函数接收两个参数：`props` 和 `ref`。其中，`props` 是组件的属性对象，`ref` 是回调函数中定义的 ref 对象。在函数组件中，我们必须将 `ref` 传递给要访问的子组件，否则 `ref` 将无法访问到子组件的 DOM 节点或实例。

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

## createPortal 了解多少？ {#p0-createPortal}

`createPortal` 是 React 中一个用于将子元素渲染到指定 DOM 元素下的 API。

在 React 应用中，通常会通过组件树传递 props、状态等数据来渲染 UI，并由 React 自动管理 DOM 元素的创建、更新和销毁等操作。不过，有时我们需要将某些 UI 元素渲染到根节点之外的 DOM 元素下，例如弹出框、模态框等。这时，`createPortal` 就能派上用场了。

`createPortal` 的用法如下：

```jsx
ReactDOM.createPortal(child, container)
```

其中，`child` 是指要渲染的子元素，可以是任何有效的 React 元素，包括组件、HTML 元素等等；`container` 是指要将子元素渲染到的 DOM 元素，可以是一个有效的 DOM 元素对象，例如通过 `document.getElementById` 获取到的 DOM 元素。`createPortal` 会将 `child` 渲染到 `container` 中，但仍然能够受到 React 生命周期的管理，例如 `componentDidMount` 和 `componentWillUnmount` 等方法。

下面是一个例子，它展示了如何使用 `createPortal` 来将一个弹出框渲染到根节点之外的 DOM 元素下：

```jsx
function Dialog(props) {
 return ReactDOM.createPortal(
 <div className="dialog">
 <h2>{props.title}</h2>
 <div>{props.content}</div>
 </div>,
 document.getElementById('dialog-container')
 );
}

function App() {
 return (
 <div>
 <p>这是一个文本内容。</p>
 <Dialog title="提示" content="这是一个弹出框。" />
 </div>
 );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

在这个例子中，`Dialog` 组件使用 `createPortal` 将其子元素渲染到 `#dialog-container` 这个元素下，而不是直接渲染到 `#root` 下。这个功能使得我们可以在 React 应用中方便地处理弹出框等类似需求。

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

```jsx
// App.js
import React from 'react'
import Modal from './Modal'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
  }

  handleShow () {
    this.setState({ showModal: true })
  }

  handleClose () {
    this.setState({ showModal: false })
  }

  render () {
    return (
 <div className="App">
 <button onClick={this.handleShow}>显示模态框</button>

 {this.state.showModal
   ? (
 <Modal>
 <div className="modal">
 <div className="modal-content">
 <h2>我是一个模态框!</h2>
 <button onClick={this.handleClose}>关闭</button>
 </div>
 </div>
 </Modal>
     )
   : null}
 </div>
    )
  }
}

export default App
```

在以上代码中，无论 `Modal` 组件在 `App` 组件中的位置如何，模态框的渲染位置总是在 `#modal-root` 中，这是一个典型的使用 React Portals 的例子。上述代码中的模态框在视觉上会覆盖整个应用程序的位置，但在组件层次结构中它仍然是 `App` 组件的子组件。

## createElement {#p0-createElement}

 `createElement` 和 `cloneElement` 有什么区别?

React 中的 `createElement` 和 `cloneElement` 都可以用来创建元素，但它们用法有所不同。

`createElement` 用于在 React 中动态地创建一个新的元素，并返回一个 React 元素对象。它的用法如下：

```jsx
React.createElement(type, [props], [...children]);
```

其中，`type` 是指要创建的元素的类型，可以是一个 HTML 标签名（如 `div`、`span` 等），也可以是一个 React 组件类（如自定义的组件），`props` 是一个包含该元素需要设置的属性信息的对象，`children` 是一个包含其子元素的数组。`createElement` 会以这些参数为基础创建并返回一个 React 元素对象，React 将使用它来构建真正的 DOM 元素。

`cloneElement` 用于复制一个已有的元素，并返回一个新的 React 元素，同时可以修改它的一些属性。它的用法如下：

```jsx
React.cloneElement(element, [props], [...children]);
```

其中，`element` 是指要复制的 React 元素对象，`props` 是一个包含需要覆盖或添加的属性的对象，`children` 是一个包含其修改后的子元素的数组。`cloneElement` 会以这些参数为基础复制该元素，并返回一个新的 React 元素对象。

在实际使用中，`createElement` 通常用于创建新的元素（如动态生成列表），而 `cloneElement` 更适用于用于修改已有的元素，例如在一个组件内部使用 `cloneElement` 来修改传递进来的子组件的属性。

 `cloneElement` 有哪些应用场景

React 中的 `cloneElement` 主要适用于以下场景：

1. 修改 props

`cloneElement` 可以用于复制一个已有的元素并覆盖或添加一些新的属性。例如，可以复制一个带有默认属性的组件并传递新的属性，达到修改属性的目的。

```jsx
// 假设有这样一个组件
function MyComponent(props) {
 // ...
}

// 在另一个组件中使用 cloneElement 修改 MyComponent 的 props
function AnotherComponent() {
 return React.cloneElement(<MyComponent />, { color: 'red' });
}
```

2. 渲染列表

在渲染列表时，可以使用 `Array.map()` 生成一系列的元素数组，也可以使用 `React.Children.map()` 遍历子元素并返回一系列的元素数组，同时使用 `cloneElement` 复制元素并传入新的 key 和 props。

```jsx
// 使用 Children.map() 遍历子元素并复制元素
function MyList({ children, color }) {
 return (
 <ul>
 {React.Children.map(children, (child, index) =>
 React.cloneElement(child, { key: index, color })
 )}
 </ul>
 );
}

// 在组件中使用 MyList 渲染列表元素
function MyPage() {
 return (
 <MyList color="red">
 <li>Item 1</li>
 <li>Item 2</li>
 <li>Item 3</li>
 </MyList>
 );
}
```

3. 修改子元素

使用 `cloneElement` 也可以在一个组件内部修改传递进来的子组件的属性，例如修改按钮的样式。

```jsx
function ButtonGroup({ children, style }) {
 return (
 <div style={style}>
 {React.Children.map(children, (child) =>
 React.cloneElement(child, { style: { color: 'red' } })
 )}
 </div>
 );
}

function MyPage() {
 return (
 <ButtonGroup style={{ display: 'flex' }}>
 <button>Save</button>
 <button>Cancel</button>
 </ButtonGroup>
 );
}
```

总之，`cloneElement` 可以方便地复制已有的 React 元素并修改其属性，适用于许多场景，例如修改 props、渲染列表和修改子元素等。

## 为什么 react 组件， 都必须要申明一个 `import React from 'react';` {#p4-import-react}

首先要知道一个事情： **JSX 是无法直接运行在浏览器环境**。

 原因

JSX 语法不能直接被浏览器解析和运行，因此需要插件 `@babel/plugin-transform-react-jsx` 来转换语法，使之能够在浏览器或任何 JavaScript 环境中执行。

所以 React 组件需要引入`React`的一个主要原因是：在组件中使用 JSX 时，JSX 语法最终会被 Babel 编译成使用`React.createElement`方法的 JavaScript 代码。也就是说，任何使用 JSX 的 React 组件的背后都隐含了`React.createElement`的调用。

例如，当你编写如下的 JSX 代码：

```jsx
const MyComponent = () => {
 return <div>Hello, World!</div>;
};
```

Babel 会将这段 JSX 编译为如下的 JavaScript 代码：

```javascript
const MyComponent = () => {
  return React.createElement('div', null, 'Hello, World!')
}
```

由于编译后的代码调用了`React.createElement`，因此你需要在文件顶部导入`React`对象才能使用它。即使你在组件中并没有直接使用`React`对象，编译后的代码依赖于`React`的运行时。

 Babel 7.0+ / React 17+ ， 可以不再需要 import React

在 Babel 7.0 版本之后，`@babel/plugin-transform-react-jsx` 插件还支持一个自动模式，它可以自动引入 JSX 转换所需的`React`包，无需手动在每个文件中添加 `import React from 'react'`。

注意，随着 React 17 的新 JSX 变换，它们引入了一个新的 JSX 转换方式，这在新的 Babel 插件 `@babel/plugin-transform-react-jsx` 和 `@babel/preset-react` 中得到了支持。这意味着在写 JSX 时，你不再需要导入 React。这个插件现在接收一个 `{ runtime: 'automatic' }` 选项来启用这一特性。

举个例子，在使用新的 JSX 转换之后，编译器将会自动引入 JSX 的运行时库，而不是 React，例如对于一个使用了新转换的`MyComponent`的组件:

```jsx
// React 17+ 及支持新JSX转换的环境，可以不需要显式写这行
// import React from 'react';

const MyComponent = () => {
 return <div>Hello, World!</div>;
};
```

在新的转换下，你会看到类似`import { jsx as _jsx } from 'react/jsx-runtime'`的东西或者类似的别名，被自动插入到转译后的文件中，而不再是直接的`React.createElement`调用。这就是为什么在新版本的 React 中，你可能不再需要手动导入 React 了。

 补充一个细节知识点： plugin-transform-react-jsx`和`@babel/preset-react` 是啥关系

**它们是包含关系**： `@babel/preset-react` 包括了 `@babel/plugin-transform-react-jsx`

`@babel/plugin-transform-react-jsx` 和 `@babel/preset-react` 都是 Babel 插件，它们在处理 React 项目中的 JSX 代码方面有关联，但它们的用途和包含的内容有所不同。

1. **@babel/plugin-transform-react-jsx**:
 这是一个特定的 Babel 插件，它的功能就是将 JSX 语法转换为`React.createElement` 调用。随着 React 17 的更新，它还允许使用新的 JSX 转换，无需导入 React 就可以使用 JSX。这意味着，在文件中不再需要 `import React from 'react'` 语句了，就可以使用 JSX。

 这个插件通常用于开发者想要精细控制某个具体转换功能时。如果你只需要转换 JSX 语法，但不需要处理其他与 React 相关的转换或优化，你可能会单独使用这个插件。

2. **@babel/preset-react**:
 这是一个 Babel 预设，它是一组 Babel 插件的集合，旨在为 React 项目提供所需的全部 Babel 插件。`@babel/preset-react` 包括了 `@babel/plugin-transform-react-jsx`，但它还包含了其他一些插件，如处理 React 的显示名称的 `@babel/plugin-transform-react-display-name`，以及为开发模式和生产模式添加/删除某些代码的插件。

 预设的好处是简化了配置过程。开发者可以在 Babel 的配置中一次性添加 `@babel/preset-react`，而不是单独添加每一个与 React 相关的 Babel 插件。此外，预设将维护这些插件的正确版本和顺序，这有助于避免潜在的配置错误。

在实践中，大多数开发 React 应用的开发者会使用 `@babel/preset-react` 因为它提供了一个即插即用的 Babel 环境，无需担心各个插件的具体细节。但是也有些情况下，为了更细致的优化和控制，开发者可能会选择手动添加特定的插件，包括 `@babel/plugin-transform-react-jsx`。

## router {#p0-router}

React Router 是一个流行的第三方库，它允许在 React 应用程序中实现路由功能。React Router 支持两种路由方式：HashRouter 和 BrowserRouter。

1. HashRouter

HashRouter 使用 URL 中的 hash 部分（即 #）来实现路由。在 React 中，可以使用 `<HashRouter>` 组件来创建 HashRouter。例如：

```jsx
jsxCopy codeimport { HashRouter, Route, Link } from 'react-router-dom';

function App() {
 return (
 <HashRouter>
 <nav>
 <ul>
 <li>
 <Link to="/">Home</Link>
 </li>
 <li>
 <Link to="/about">About</Link>
 </li>
 </ul>
 </nav>
 <Route exact path="/" component={Home} />
 <Route path="/about" component={About} />
 </HashRouter>
 );
}
```

在使用 HashRouter 时，URL 中的路径看起来像这样：`http://example.com/#/about`。HashRouter 不会向服务器发送请求，因为 # 符号后面的内容被浏览器认为是 URL 的一部分，而不是服务器请求的一部分。这意味着在使用 HashRouter 时，React 应用程序可以在客户端上运行，而无需服务器支持。

2. BrowserRouter

BrowserRouter 使用 HTML5 的 history API 来实现路由。在 React 中，可以使用 `<BrowserRouter>` 组件来创建 BrowserRouter。例如：

```jsx
jsxCopy codeimport { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
 return (
 <BrowserRouter>
 <nav>
 <ul>
 <li>
 <Link to="/">Home</Link>
 </li>
 <li>
 <Link to="/about">About</Link>
 </li>
 </ul>
 </nav>
 <Route exact path="/" component={Home} />
 <Route path="/about" component={About} />
 </BrowserRouter>
 );
}
```

在使用 BrowserRouter 时，URL 中的路径看起来像这样：`http://example.com/about`。BrowserRouter 通过 history API 在客户端和服务器之间发送请求，因此需要服务器支持。

3. 区别

HashRouter 和 BrowserRouter 的主要区别在于它们如何处理 URL。HashRouter 使用 URL 中的 # 部分来实现路由，而 BrowserRouter 使用 HTML5 的 history API 来实现路由。HashRouter 不需要服务器支持，而 BrowserRouter 需要服务器支持。

4. 原理

HashRouter 的原理是通过监听 `window.location.hash` 的变化来实现路由。当用户点击链接时，React Router 会根据链接的路径渲染相应的组件，并将路径添加到 URL 中的 # 部分。当用户点击浏览器的“后退”按钮时，React Router 会根据上一个 URL 中的 # 部分来渲染相应的组件。

BrowserRouter 的原理是通过 HTML5 的 history API 来实现路由。当用户点击链接时，React Router 会使用 history API 将路径添加到浏览器的历史记录中，并渲染相应的组件。当用户点击浏览器的“后退”

React Router 和浏览器原生 history API 在路由管理上主要有以下几个区别：

1. **抽象级别**:

* **React Router** 提供了更高层次的抽象，如 `<Router>`、`<Route>`、和 `<Link>` 等组件，这些都是专门为了在 React 中更方便地管理路由而设计的。它处理了底层 history API 的很多细节，把操作抽象成了 React 组件和 hooks。
* **原生 history API** 更底层，直接作用于浏览器的历史记录栈。使用原生 history API 需要开发者自己编写更多的代码来管理 history 栈和渲染相应的组件。

2. **便利性**:

* **React Router** 提供了声明式导航和编程式导航的选项，并且有大量的社区支持和文档，易于使用和学习。
* **原生 history API** 需要开发者自己处理 URL 与组件之间的关系映射，以及页面渲染的逻辑。

3. **功能**:

* **React Router** 除了包含对原生 history API 的基本封装外，还提供了如路由守卫、路由懒加载、嵌套路由、重定向等高级功能。
* **原生 history API** 提供基本的历史记录管理功能，但是不包含上述 React Router 提供的高级应用路由需求。

4. **集成**:

* **React Router** 是专为 React 设计的，与 React 的生命周期、状态管理等密切集成。
* **原生 history API** 与 React 没有直接关联，需要用户手动实现整合。

5. **状态管理**:

* **React Router** 可以将路由状态管理与应用的状态管理（如使用 Redux）结合起来，使路由状态可预测和可管理。
* **原生 history API** 通常需要额外的状态管理逻辑来同步 UI 和 URL。

6. **服务器渲染**:

* **React Router** 可以与服务器渲染一起使用，支持同构应用程序，即客户端和服务器都可以进行路由渲染。
* **原生 history API** 主要是针对客户端的，因此在服务器端渲染中需要额外的处理来模拟 routing 行为。

在考虑是否使用 React Router 或者原生 history API 时，通常需要考虑项目的复杂性、团队的熟悉度以及项目对路由的特定需求。对于大多数 React 项目而言，React Router 的便利性和其附加的高级特性通常使得它成为首选的路由解决方案。

**表格对比**

| 特性 | React Router | 原生 History API |
| ------------ | -------------------------------------------------------------- | ------------------------------------------ |
| 抽象级别 | 高层次抽象，提供了组件和 hooks | 底层 API，直接操作历史记录栈 |
| 便利性 | 声明式和编程式导航，社区支持和文档齐全 | 手动处理 URL 和组件映射，以及渲染逻辑 |
| 功能 | 路由守卫、懒加载、嵌套路由、重定向等 | 基本的历史记录管理 |
| 集成 | 与 React 生命周期和状态管理紧密集成 | 需要手动整合到 React 中 |
| 状态管理 | 与应用的状态管理系统（如 Redux）可集成，路由状态可预测和可管理 | 需要额外实现状态管理逻辑 |
| 服务器渲染 | 支持同构应用程序，客户端和服务器都能渲染 | 主要用于客户端，服务器端需要模拟 |
| 开发者工作量 | 由库处理大部分的路由逻辑，简化开发者工作 | 需要开发者手动编写代码管理路由 |
| 社区和资源 | 广泛的社区和资源，易于获取帮助和解决方案 | 相对较少的社区资源，通常需求独立解决 |
| 用户体验 | 通常能提供更顺畅的用户体验 | 可能因为实现不当导致的复杂性和用户体验问题 |

在 React 项目中，你完全可以不使用 `react-router` 而是使用浏览器原生的 `history` API 来手动管理路由。这通常会涉及以下几个步骤：

1. 使用 `history.pushState()` 和 `history.replaceState()` 方法来添加和修改浏览器历史条目。
2. 侦听 `popstate` 事件来响应浏览器历史的变化。
3. 根据当前的 URL 状态，手动渲染对应的 React 组件。

例如，下面是一个简单的例子，演示了如何在没有 `react-router` 的情况下使用原生 `history` API 来管理路由。

```jsx
class App extends React.Component {
  componentDidMount () {
    // 当用户点击后退/前进按钮时触发路由变化
    window.onpopstate = this.handlePopState
    // 初始页面加载时处理路由
    this.route()
  }

  handlePopState () {
    // 处理路由变化
    this.route()
  }

  route () {
    const path = window.location.pathname
    // 根据 path 渲染不同的组件
    switch (path) {
      case '/page1':
        // 渲染 Page1 组件
        break
      case '/page2':
        // 渲染 Page2 组件
        break
        // 其他路由分支...
      default:
        // 渲染默认组件或404页面
        break
    }
  }

  navigate (path) {
    // 更新历史记录并触发路由变化
    window.history.pushState(null, '', path)
    this.route()
  }

  render () {
    return (
      <div>
      <button onClick={() => this.navigate('/page1')}>Go to Page 1</button>
      <button onClick={() => this.navigate('/page2')}>Go to Page 2</button>
      {/* 这里根据路由渲染对应的组件 */}
      </div>
    )
  }
}

// 实际的页面组件
const Page1 = () => <div>Page 1</div>
const Page2 = () => <div>Page 2</div>
```

尽管手动管理路由是可能的，但使用 `react-router` 这类专门设计的库通常会大大简化路由管理的工作。它为路径匹配、路由嵌套、重定向等提供了便利的抽象，并且和 React 的声明式方式很好地集成在一起。如果不是为了特别的原因，通常推荐使用现成的路由库来管理 React 应用的路由，以避免重新发明轮子。

React Router是React官方提供的用于构建单页应用的路由库，主要包括以下几个主要包和API：

主要包：

1. react-router-dom：用于Web应用的路由库。
2. react-router-native：用于原生应用（如React Native）的路由库。
3. react-router-config：用于配置静态路由的工具包。

主要API：

1. BrowserRouter：一个使用HTML5 history API实现的路由器组件，用于在Web应用中处理路由。
2. HashRouter：一个使用URL hash值实现的路由器组件，用于在不支持HTML5 history API的Web应用中处理路由。
3. Route：定义了路由匹配规则及对应的组件，可以在路由器中使用。
4. Switch：用于渲染与当前URL匹配的第一个Route或Redirect，只能包含Route或Redirect组件。
5. Link：用于创建导航链接，点击后会更新URL，触发路由的切换。
6. NavLink：与Link类似，但在匹配当前URL时会添加指定的样式。

其他常用API：

1. Redirect：用于重定向到指定的路由。
2. withRouter：高阶组件，用于将路由器的相关信息（如history、location）传递给被包裹的组件。
3. useHistory：自定义hook，用于在函数式组件中获取history对象。
4. useLocation：自定义hook，用于在函数式组件中获取location对象。
5. useParams：自定义hook，用于在函数式组件中获取路由参数。
6. useRouteMatch：自定义hook，用于在函数式组件中获取与当前URL匹配的路由信息。

以上是React Router的主要包和API。根据具体的需求，你可以使用这些API来构建和处理路由相关的逻辑。

## 如何进行路由变化监听 {#router-event}

在 React 中，你可以使用 React Router 库来进行路由变化的监听。React Router 是 React 的一个常用路由库，它提供了一组组件和 API 来帮助你在应用中管理路由。

下面是一个示例代码，演示如何使用 React Router 监听路由的变化：

然后，在你的 React 组件中，使用 BrowserRouter 或 HashRouter 组件包裹你的应用：

```jsx
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
 return (
 // 使用 BrowserRouter 或 HashRouter 包裹你的应用
 <BrowserRouter>
 {/* 在这里编写你的应用内容 */}
 </BrowserRouter>
 );
}

export default App;
```

当使用函数组件时，可以使用 `useEffect` 钩子函数来监听路由变化。下面是修改后的示例代码：

```jsx
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function MyComponent(props) {
 useEffect(() => {
 const handleRouteChange = (location, action) => {
 // 路由发生变化时执行的处理逻辑
 console.log('路由发生了变化', location, action);
 };

 // 在组件挂载后，添加路由变化的监听器
 const unlisten = props.history.listen(handleRouteChange);

 // 在组件卸载前，移除监听器
 return () => {
 unlisten();
 };
 }, [props.history]);

 return (
 <div>
 {/* 在这里编写组件的内容 */}
 </div>
 );
}

// 使用 withRouter 高阶组件将路由信息传递给组件
export default withRouter(MyComponent);
```

在上面的代码中，我们使用了 `useEffect` 钩子函数来添加路由变化的监听器。在 `useEffect` 的回调函数中，我们定义了 `handleRouteChange` 方法来处理路由变化的逻辑。然后，通过 `props.history.listen` 方法来添加监听器，并将返回的取消监听函数赋值给 `unlisten` 变量。

同时，我们还在 `useEffect` 返回的清理函数中调用了 `unlisten` 函数，以确保在组件卸载时移除监听器。

需要注意的是，由于 `useEffect` 的依赖数组中包含了 `props.history`，所以每当 `props.history` 发生变化时（即路由发生变化时），`useEffect` 的回调函数会被调用，从而更新路由变化的监听器。

总结起来，通过使用 `useEffect` 钩子函数和 `props.history.listen` 方法，可以在函数组件中监听和响应路由的变化。

监听的核心原理基于useEffect，和useLocation，通过useEffect监听当前location的变化，这样就实现的最基本的监听结构：

```jsx
const location = useLocation();
useEffect(() => {
 //记录路径
}, [location]);
```

然后，我们可以在useEffect中记录和更新from、to的值，可以根据自己的需要选择from、to的数据类型，这里我使用了React-router提供的Location类型。

更新逻辑为：将to的值赋给from，然后将新的location赋值给to

```typescript jsx
import { Location, useLocation } from 'react-router-dom'

type LocationTrans = {
 from: Location;
 to: Location;
};

const location = useLocation()
const locationState = useRef<LocationTrans>({
  from: null,
  to: null
})

useEffect(() => {
  locationState.current.from = locationState.current.to
  locationState.current.to = location
}, [location])
```

最后，利用React的Context进行封装，将其封装成一个组件和一个hook，使用者可以通过这个组件来进行监听，通过hook快速访问数据。我将这些代码放在了同一个.tsx文件中，保证了逻辑的高内聚。

```tsx
import React, { createContext, useContext, useEffect, useRef } from 'react'
import { Location, useLocation } from 'react-router-dom'

type LocationTrans = {
 from: Location;
 to: Location;
};

export const LocationContext =
 createContext<React.MutableRefObject<LocationTrans>>(null)

export function WithLocationListener (props: { children: React.ReactNode }) {
  const location = useLocation()

  const locationState = useRef<LocationTrans>({
    from: null,
    to: null
  })

  useEffect(() => {
    locationState.current.from = locationState.current.to
    locationState.current.to = location
  }, [location])

  return (
 <LocationContext.Provider value={locationState}>
 {props.children}
 </LocationContext.Provider>
  )
}

export function useLocationConsumer (): LocationTrans {
  const ref = useContext(LocationContext)
  return ref.current
}
```

 使用

这个组件只能在RouterProvider的子组件中使用，因为useLocation只能在这个范围内使用。

```tsx
// import ....

function Layout () {
  return (
 <WithLocationListener>
 {/* ..... */}
 </WithLocationListener>
  )
}
```

在需要用到路由信息的页面：

```typescript jsx
const { from, to } = useLocationConsumer()
```

 参考文档

* [资料](https://juejin.cn/post/7195910055497580600)

## react-router 页面跳转时，是如何传递下一个页面参数的？ {#p1-use-router}

React Router 是一个用于管理前端路由的库，它与 React 应用程序集成在一起，提供了一种在单页面应用中处理路由的方式。React Router 并没有直接提供数据存储的功能，它主要负责路由的匹配和导航。

在 React Router 中，路由相关的数据主要存储在组件的 props 和组件的状态中。以下是一些常见的数据存储方式：

1. 路由参数（Route Parameters）：
 React Router 允许通过路径参数（如 `/users/:id`）传递参数给路由组件。这些参数可以通过 `props.match.params` 对象在路由组件中获取。路由参数通常用于标识唯一资源的ID或其他需要动态变化的数据。

1. 查询参数（Query Parameters）：
 查询参数是通过 URL 查询字符串传递的键值对数据，如 `/users?id=123&name=John`。React Router 可以通过 `props.location.search` 属性获取查询字符串，并通过解析库（如 `query-string`）将其转换为 JavaScript 对象。查询参数通常用于筛选、分页或其他需要传递额外数据的场景。

1. 路由状态（Route State）：
 在某些情况下，可能需要将一些状态信息传递给路由组件，例如从一个页面跳转到另一个页面时需要携带一些额外的状态。React Router 提供了 `props.location.state` 属性，可以用于存储和传递路由状态。

1. 上下文（Context）：
 React Router 提供了一个 `Router` 组件，可以使用 React 的上下文功能共享路由相关的数据。通过在 `Router` 组件的上下文中提供数据，可以在路由组件中访问该数据，而无需通过 props 层层传递。这在需要在多个嵌套层级中访问路由数据时非常方便。

总的来说，React Router 并没有专门的数据存储机制，它主要利用 React 组件的 props 和状态来传递和存储路由相关的数据。这些数据可以通过路由参数、查询参数、路由状态以及上下文等方式来传递和获取。根据具体的需求和场景，可以选择适合的方式来存储和管理路由相关的数据。

 路由状态是如何存储的

在 React Router 中，路由状态可以通过 `props.location.state` 属性来存储和获取。

当使用 React Router 进行页面导航时，可以通过 `history.push` 或 `history.replace` 方法传递一个包含状态数据的对象作为第二个参数。例如：

```jsx
history.push('/dashboard', { isLoggedIn: true, username: 'John' });
```

这个对象会被存储在新页面的 `props.location.state` 中，可以在目标页面的组件中通过 `props.location.state` 来访问它。例如：

```jsx
import { useLocation } from 'react-router-dom';

function Dashboard() {
 const location = useLocation();
 const { isLoggedIn, username } = location.state;

 // 使用路由状态数据
 // ...
}
```

需要注意的是，路由状态仅在通过 `history.push` 或 `history.replace` 导航到新页面时才可用。如果用户通过浏览器的前进/后退按钮进行导航，或者直接输入 URL 地址访问页面，路由状态将不会被保留。

另外，路由状态也可以在类组件中通过 `this.props.location.state` 进行访问，或者在函数组件中使用 `props.location.state`。

 props.location.state 数据是如何存储的

在 React Router 中，路由状态数据实际上是存储在客户端的内存中。

当使用 `history.push` 或 `history.replace` 方法导航到一个新页面时，React Router 将路由状态数据作为对象附加到浏览器历史记录中的对应路由条目。这个对象会存储在浏览器的会话历史中，并在新页面加载时被 React Router 读取并提供给组件。

具体地说，React Router 使用 HTML5 的 History API（`pushState` 或 `replaceState` 方法）来实现路由导航，并将路由状态数据作为一个特殊的字段存储在历史记录中。这个字段通常被称为 `state` 字段，用于存储路由状态数据。

在浏览器中，历史记录和相应的状态数据会被保存在内存中。当用户进行前进、后退或直接访问某个 URL 时，浏览器会根据历史记录加载对应的页面，并将相关的状态数据提供给 React Router。这样，组件就能够通过 `props.location.state` 来访问之前存储的路由状态数据。

需要注意的是，路由状态数据仅在客户端内存中存在，每个用户的路由状态是独立的。如果用户刷新页面或关闭浏览器，路由状态数据将丢失，并需要重新通过导航操作来设置。因此，路由状态适合存储短期或临时的数据，而对于长期或持久化的数据，应该考虑其他的数据存储方式，如服务器端存储或状态管理库。

## 如何实现路由守卫 {#p0-router-guide}

在 React 中，虽然没有内置的路由守卫（Route Guards）功能，但可以使用第三方库来实现类似的功能。最常用的第三方路由库是 React Router。

React Router 提供了一些组件和钩子函数，可以用于在路由导航过程中进行拦截和控制。

1. `<Route>` 组件：可以在路由配置中定义特定路由的守卫逻辑。例如，可以设置 `render` 属性或者 `component` 属性来渲染组件，并在渲染前进行守卫逻辑的判断。

2. `useHistory` 钩子：可以获取当前路由的历史记录，并通过 `history` 对象进行路由导航的控制。可以使用 `history` 对象的 `push`、`replace` 方法来切换路由，并在切换前进行守卫逻辑的判断。

3. `useLocation` 钩子：可以获取当前的路由位置信息，包括路径、查询参数等。可以根据这些信息进行守卫逻辑的判断。

下面是一个使用 React Router 实现路由守卫的示例：

```javascript
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'

function App () {
  const history = useHistory()

  const isAuthenticated = () => {
    // 判断用户是否已登录
    return true
  }

  const requireAuth = (Component) => {
    return () => {
      if (isAuthenticated()) {
        return <Component />
      } else {
        history.push('/login')
        return null
      }
    }
  }

  return (
 <Router>
 <Route path="/home" render={requireAuth(Home)} />
 <Route path="/login" component={Login} />
 <Route path="/dashboard" render={requireAuth(Dashboard)} />
 </Router>
  )
}
```

在上述示例中，`requireAuth` 是一个自定义的函数，用于判断是否需要进行权限校验。在 `render` 属性中，我们调用 `requireAuth` 函数包裹组件，根据用户是否已登录来判断是否渲染该组件。如果用户未登录，则使用 `history.push` 方法进行路由跳转到登录页面。

通过使用 React Router 提供的组件和钩子函数，我们可以实现类似于路由守卫的功能，进行路由的拦截和控制。

**参考文档**

* [资料](https://juejin.cn/post/7177374176141901861)
* [资料](https://juejin.cn/post/7253001747542720567)
