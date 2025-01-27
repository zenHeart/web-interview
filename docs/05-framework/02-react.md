# react

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

## 是如何进行渲染的？ {#p0-render}

在 React 中，JSX 最终被转换为真实的 DOM 经历了以下步骤：

 1. 解析 JSX：在编译阶段，React 会使用 Babel 等工具将 JSX 转换为 JavaScript 对象

在编译阶段，React 使用 Babel 等工具将 JSX 转换为 JavaScript 对象的过程可以使用以下代码示例来说明：

原始的 JSX 代码：

```jsx
const element = <h1>Hello, world!</h1>;
```

经过编译后，会被转换为类似的 JavaScript 对象：

```javascript
const element = React.createElement('h1', null, 'Hello, world!')
```

上述代码中，`React.createElement` 是一个由 React 提供的方法，它接收三个参数：元素的类型、元素的属性（可以是一个对象或 null）、元素的子元素。这样，通过调用 `React.createElement`，JSX 元素就被转换成了一个 JavaScript 对象。

在 React 项目中，Babel 是一个常用的工具，用于将 JSX 代码转换为 JavaScript 代码。Babel 实际上是一个 JavaScript 编译器，可以根据配置和插件，将代码从一种语法转换为另一种语法。

当 Babel 遇到 JSX 代码时，它会使用一个名为 `@babel/preset-react` 的 preset（预设）来进行转换。这个 preset 包含了一系列的插件，用于处理 JSX 语法。

**具体的工作流程如下**：

1. Babel 解析代码：Babel 会将代码解析成抽象语法树（AST），以便于之后的处理。

2. JSX 转换：Babel 使用 `@babel/preset-react` 预设来处理 JSX 代码。这个预设包含了一个插件 `@babel/plugin-transform-react-jsx`，用于将 JSX 转换为函数调用。

 例如，将 `<h1>Hello, world!</h1>` 转换成 `React.createElement("h1", null, "Hello, world!")`。

3. 生成 JavaScript 代码：Babel 使用转换后的 AST，将其重新生成为 JavaScript 代码。

 例如，将 `React.createElement("h1", null, "Hello, world!")` 转换成实际的 JavaScript 代码。

总结起来，Babel 的作用就是将 JSX 代码转换为 JavaScript 代码，使其能够在浏览器中执行。这样，React 就可以理解和处理 JSX 语法，并通过转换后的 JavaScript 代码来创建虚拟 DOM 和进行后续的更新操作。

 2. 创建虚拟 DOM：React 使用解析后的 JSX 对象来创建虚拟 DOM（Virtual DOM）。虚拟 DOM 是一个轻量级的、以 JavaScript 对象表示的 DOM 树的副本

**createElement 创建虚拟dom**

在 React 中，`React.createElement` 函数用于创建虚拟 DOM 元素。它接受三个参数：元素类型、属性对象以及子元素。

```javascript
const element = React.createElement(type, props, children)
```

`React.createElement` 函数会返回一个描述虚拟 DOM 元素的 JavaScript 对象。这个对象包含了元素的类型、属性和子元素等信息。例如，对于 `<div className="container">Hello, React!</div>` 这个 JSX 语法，它被转换为以下形式：

```javascript
React.createElement('div', { className: 'container' }, 'Hello, React!')
```

这样就创建了一个描述 `<div>` 元素的虚拟 DOM 对象。虚拟 DOM 对象可以通过 `ReactDOM.render` 方法渲染到实际的 DOM 中。当虚拟 DOM 发生变化时，React 会通过比较新旧虚拟 DOM，找出差异并进行局部更新，从而最小化对实际 DOM 的操作。

**createElement 原理**

以下是 React 源码中 `React.createElement` 函数的简化版本：

```javascript
function createElement (type, props, ...children) {
  const element = {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  }

  return element
}

function createTextElement (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}
```

在上面的源码中，`createElement` 函数接收一个 `type` 参数（元素类型）、一个 `props` 参数（元素的属性对象）以及可选的 `children` 参数（子元素）。

首先，通过创建一个名为 `element` 的对象，我们存储了虚拟 DOM 元素的信息。`element` 对象中的 `type` 属性保存了元素的类型，而 `props` 属性则是一个对象，用来存储元素的属性和子元素。我们使用了 ES6 中的扩展运算符将 `props` 参数中的属性分配给 `element.props`，同时也将 `children` 参数中的子元素映射为虚拟 DOM 对象。

对于 `children` 参数的处理，通过 `children.map` 方法遍历 `children` 数组，并对每个子元素执行以下操作：

* 如果子元素是对象类型，即已经是一个虚拟 DOM 对象，直接将其添加到 `element.props.children` 中。
* 如果子元素是字符串或数字类型，即文本节点，那么我们调用 `createTextElement` 函数来创建一个描述该文本节点的虚拟 DOM 对象，并将其添加到 `element.props.children` 中。

`createTextElement` 函数用于创建文本节点的虚拟 DOM 对象。它返回一个包含 `type` 为 `'TEXT_ELEMENT'` 的对象，且 `props` 对象中的 `nodeValue` 属性保存了文本节点的内容，`children` 属性为空数组。

最后，我们将 `element` 对象作为结果返回，这样就创建了一个描述虚拟 DOM 元素的 JavaScript 对象。

总结起来，`createElement` 函数通过创建一个对象来描述虚拟 DOM 元素，其中包含了元素的类型、属性和子元素等信息。对于子元素，会根据其类型进行判断，如果是对象类型，则直接添加到 `props.children` 中；如果是文本类型，则通过 `createTextElement` 函数创建对应的虚拟 DOM 对象。这样就生成了一个虚拟 DOM 元素，可以用于进行后续的渲染和更新操作。

 3. Diff 算法比较变化：在每次组件更新时，React 使用 Diff 算法对比前后两个虚拟 DOM 树的差异。Diff 算法能够高效地找出需要进行更新的部分

React中通过diff算法来比较两个虚拟DOM树的差异，以确定需要更新的最小操作集合。

首先，React会比较两个根节点的类型，如果不同，它们代表不同的组件，React会将原来的组件树完全替换为新的组件树。

如果类型相同，React会比较两个根节点的属性，检查它们是否有任何更改。如果有更改，React会更新已有的DOM元素的属性。

接下来，React会递归地比较和更新子节点。React会通过遍历子节点的方式找到相同位置上的子节点，并进行递归比较。

对于子节点，React使用一种称为"key"的特殊属性来判断它们是否是相同的元素。如果两个子节点的key相同，React会认为它们是相同的元素，并只更新它们的属性和子节点。如果key不同，React会将旧的子节点完全替换为新的子节点。

最后，React会将所有需要更新的操作记录下来，并将其发送到浏览器的渲染引擎中执行。这些操作可能包括添加、移动或删除DOM节点。

通过使用diff算法，React可以最小化对真实DOM的操作，提高性能和效率。同时，React还会使用一些启发式策略和优化算法，如批处理和异步更新，来进一步提升性能。

 4. 生成 DOM 更新操作：根据 Diff 算法的比较结果，React 会生成一系列的 DOM 更新操作，包括添加、移除和修改节点等。这些操作被存储在更新队列中

在React中，生成DOM更新操作的过程可以概括为以下几个步骤：

* 通过diff算法比较新旧虚拟DOM树的差异，得到需要更新的最小操作集合。

* 对于每个需要更新的操作，React会将其转化为一个待执行的DOM更新任务。

* React将这些待执行的DOM更新任务放入一个队列中，等待执行。

* 当React准备执行DOM更新时，会将队列中的任务按照特定的顺序进行执行。这个顺序通常是根据DOM节点的层级和位置来确定的，以保证DOM更新的正确性。

* 执行DOM更新时，React会根据操作的类型，比如添加、移动或删除DOM节点，调用浏览器提供的DOM API来执行相应的操作。

* 在执行DOM更新的过程中，React会尽量优化操作，避免一些不必要的DOM操作。例如，将多个连续的DOM插入操作合并为一次操作，或者将多个DOM删除操作合并为一次操作。

* 执行完所有的DOM更新任务后，React会通知浏览器进行重新渲染，将更新后的DOM树呈现给用户。

总的来说，React通过将虚拟DOM树转化为真实DOM树，并通过diff算法生成DOM更新操作，然后按照特定顺序执行这些操作，最终完成DOM的更新和渲染。这样的设计可以提高性能，减少不必要的DOM操作，并保证DOM的一致性。

 5. 批量进行 DOM 更新：React 会将更新队列中的 DOM 更新操作批量进行，以减少浏览器的重绘和回流操作。React 会通过批量更新来优化性能

React通过批量更新的方式来优化DOM操作，以减少不必要的性能开销。

在React中，当需要更新组件状态或属性时，不会立即执行DOM更新操作，而是将更新请求加入到一个待处理的队列中。React会在适当的时机，比如在事件处理函数执行完毕或在生命周期方法结束时，对队列中的更新请求进行批量处理。

具体的批量更新过程如下：

* 在React中，每个组件都有一个内部的pending state队列，用于存储待处理的更新请求。

* 当需要更新组件的状态或属性时，React会将更新请求添加到该组件的pending state队列中。

* 在React的更新过程中，会遍历组件的pending state队列，将其中的所有更新请求合并为一个批量更新。

* React会根据合并后的批量更新，生成最小化的DOM操作集合。

* 最后，React会通过执行这个批量更新的DOM操作集合，将更新应用到真实的DOM树中。

通过批量更新的方式，React可以减少不必要的DOM操作次数，提高性能。同时，React也提供了一些API，让开发者可以手动控制更新的时机，比如使用`setState`的回调函数、使用`ReactDom.unstable_batchedUpdates`方法等。

需要注意的是，React并不保证所有的更新都会批量处理。在一些特殊情况下，比如在事件处理函数中手动调用`setState`，或者使用`ReactDOM.unstable_batchedUpdates`方法，可以强制进行批量更新。但在某些情况下，React可能会选择立即更新，以保证更新的时机和结果的一致性。

 6. 应用 DOM 更新：最后，React 将批量的 DOM 更新操作应用到实际的浏览器 DOM 中，从而更新用户界面。这个过程中，React 会尽量最小化对真实 DOM 的操作，以提高性能

原理同上， 只是进行了重复操作；

 总结

一图带千言

![image](https://github.com/pro-collection/interview-question/assets/22188674/f24dad99-66fe-4206-9d05-6f7194dcc5b5)

render阶段开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步更新还是异步更新。

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync () {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent () {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

可以看到，他们唯一的区别是是否调用shouldYield。如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。

workInProgress代表当前已创建的workInProgress fiber。

performUnitOfWork方法会创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。

通过遍历的方式实现可中断的递归，所以performUnitOfWork的工作可以分为两部分：“递”和“归”。

 创建节点

首先从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用`beginWork`方法 (opens new window)。

该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

在“归”阶段会调用`completeWork` (opens new window)处理Fiber节点。

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。

如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。

**举例**

代码如下：

```js
function App () {
  return (
 <div>
 i am
 <span>KaSong</span>
 </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

对应的 fiber 树结构如下
![image](https://user-images.githubusercontent.com/22188674/235359287-0f448fa3-657d-40b4-8cff-92327ef5414c.png)

render 阶段会依次执行

```
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork
```

 beginWork

源码链接： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3075)

工作流程图：
![image](https://user-images.githubusercontent.com/22188674/235361451-6440499a-09dc-4478-81e4-e0585e815f0b.png)

beginWork的工作是传入当前Fiber节点，创建子Fiber节点，我们从传参来看看具体是如何做的。

**传参**

```ts
function beginWork (
  current: Fiber | null, // 当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderLanes: Lanes // 优先级相关，在讲解Scheduler时再讲解
): Fiber | null {
  // ...省略函数体
}
```

beginWork的工作可以分为两部分:

* `update`时：如果current存在，在满足一定条件时可以复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child。
* `mount`时：除fiberRootNode以外，current === null。会根据fiber.tag不同，创建不同类型的子Fiber节点

```ts
function beginWork (
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes
    )
  } else {
    didReceiveUpdate = false
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    // case IndeterminateComponent:
    //   // ...省略
    // case LazyComponent:
    //   // ...省略
    // case FunctionComponent:
    //   // ...省略
    // case ClassComponent:
    //   // ...省略
    // case HostRoot:
    //   // ...省略
    // case HostComponent:
    //   // ...省略
    // case HostText:
    // ...省略
    // ...省略其他类型
    default: // ..
  }
}
```

 update时

满足如下情况时didReceiveUpdate === false（即可以直接复用前一次更新的子Fiber，不需要新建子Fiber）

```ts
if (current !== null) {
  const oldProps = current.memoizedProps
  const newProps = workInProgress.pendingProps

  if (
    oldProps !== newProps ||
 hasLegacyContextChanged() ||
 (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true
  } else if (!includesSomeLane(renderLanes, updateLanes)) {
    didReceiveUpdate = false
    // switch (workInProgress.tag) {
    //   // console.log('..')
    //   // 省略处理
    // }
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes
    )
  } else {
    didReceiveUpdate = false
  }
} else {
  didReceiveUpdate = false
}
```

1. `oldProps === newProps && workInProgress.type === current.type`，即props与fiber.type不变
2. `!includesSomeLane(renderLanes, updateLanes)`，即当前Fiber节点优先级不够，会在讲解Scheduler时介绍

 mount

当不满足优化路径时，我们就进入第二部分，新建子Fiber。

```ts
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  // case IndeterminateComponent:
  //   // ...省略
  // case LazyComponent:
  //   // ...省略
  // case FunctionComponent:
  //   // ...省略
  // case ClassComponent:
  //   // ...省略
  // case HostRoot:
  //   // ...省略
  // case HostComponent:
  //   // ...省略
  // case HostText:
  // ...省略
  // ...省略其他类型
  default: // ..
}
```

我们可以看到，根据fiber.tag不同，进入不同类型Fiber的创建逻辑。

对于我们常见的组件类型，如`（FunctionComponent/ClassComponent/HostComponent）`，最终会进入`reconcileChildren` (opens new window)方法。

 reconcileChildren

* 对于mount的组件，他会创建新的子Fiber节点
* 对于update的组件，他会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的Diff算法），将比较的结果生成新Fiber节点

```ts
export function reconcileChildren (
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    )
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    )
  }
}
```

从代码可以看出，和beginWork一样，他也是通过current === null ?区分mount与update。

不论走哪个逻辑，最终他会生成新的子Fiber节点并赋值给workInProgress.child，作为本次beginWork返回值 (opens new window)
，并作为下次performUnitOfWork执行时workInProgress的传参

 effectTag

我们知道，render阶段的工作是在内存中进行，当工作结束后会通知Renderer需要执行的DOM操作。要执行DOM操作的具体类型就保存在fiber.effectTag中。

```ts
// DOM需要插入到页面中
// export const Placement = // */ 0b00000000000010;
// DOM需要更新
// export const Update = // */ 0b00000000000100;
// DOM需要插入到页面中并更新
// export const PlacementAndUpdate = // */ 0b00000000000110;
// // DOM需要删除
// export const Deletion = // */ 0b00000000001000;
```

通过二进制表示effectTag，可以方便的使用位操作为fiber.effectTag赋值多个effect。

那么，如果要通知Renderer将Fiber节点对应的DOM节点插入页面中，需要满足两个条件：

1. `fiber.stateNode`存在，即Fiber节点中保存了对应的DOM节点

2. `(fiber.effectTag & Placement) !== 0`，即 `Fiber节点存在Placement effectTag`

我们知道，mount时，fiber.stateNode === null，且在reconcileChildren中调用的mountChildFibers不会为Fiber节点赋值effectTag。那么首屏渲染如何完成呢？

针对第一个问题，`fiber.stateNode`会在`completeWork`中创建，我们会在下一节介绍。

第二个问题的答案十分巧妙：假设`mountChildFibers`也会赋值effectTag，那么可以预见mount时整棵Fiber树所有节点都会有Placement
effectTag。那么commit阶段在执行DOM操作时每个节点都会执行一次插入操作，这样大量的DOM操作是极低效的。

为了解决这个问题，**在mount时只有rootFiber会赋值Placement effectTag**，在commit阶段只会执行一次插入操作。

 completeWork

流程图：
![image](https://user-images.githubusercontent.com/22188674/235362048-ce278ddf-b944-4ed6-a6af-e3b1502fb6c7.png)

类似beginWork，completeWork也是针对不同fiber.tag调用不同的处理逻辑。

```ts
function completeWork (
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null
    case ClassComponent: {
      // ...省略
      return null
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress)
      return null
    }
    case HostComponent: {
      // ...省略
      return null
    }
 // ...省略
  }
  // ...省略
}
```

我们重点关注页面渲染所必须的 `HostComponent`（即原生DOM组件对应的Fiber节点），其他类型Fiber的处理留在具体功能实现时讲解。

 处理 HostComponent

和`beginWork`一样，我们根据 `current === null` ?判断是mount还是`update`。

同时针对 `HostComponent`，判断 `update` 时我们还需要考虑 `workInProgress.stateNode != null` ?（即该Fiber节点是否存在对应的DOM节点）

```ts
{
  popHostContext(workInProgress)
  const rootContainerInstance = getRootHostContainer()
  const type = workInProgress.type

  if (current !== null && workInProgress.stateNode != null) {
    // update的情况
    // ...省略
  } else {
    // mount的情况
    // ...省略
  }
  return null
}
```

 update 时

当update时，Fiber节点已经存在对应DOM节点，所以不需要生成DOM节点。需要做的主要是处理props，比如：

* `onClick、onChange` 等回调函数的注册
* 处理 `style prop`
* 处理 `DANGEROUSLY_SET_INNER_HTML prop`
* 处理 `children prop`

我们去掉一些当前不需要关注的功能（比如ref）。可以看到最主要的逻辑是调用updateHostComponent方法。

```ts
if (current !== null && workInProgress.stateNode != null) {
  // update的情况
  updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance
  )
}
```

在updateHostComponent内部，被处理完的props会被赋值给workInProgress.updateQueue，并最终会在commit阶段被渲染在页面上。

`workInProgress.updateQueue = (updatePayload: any);`

其中updatePayload为数组形式，他的偶数索引的值为变化的prop key，奇数索引的值为变化的prop value。

 mount 时

同样，我们省略了不相关的逻辑。可以看到，mount时的主要逻辑包括三个：

* 为Fiber节点生成对应的DOM节点
* 将子孙DOM节点插入刚生成的DOM节点中
* 与update逻辑中的updateHostComponent类似的处理props的过程

```ts
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext()
// 为fiber创建对应DOM节点
const instance = createInstance(
  type,
  newProps,
  rootContainerInstance,
  currentHostContext,
  workInProgress
)
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false)
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  )
) {
  markUpdate(workInProgress)
}
```

mount时只会在rootFiber存在Placement effectTag。那么commit阶段是如何通过一次插入DOM操作（对应一个Placement effectTag）将整棵DOM树插入页面的呢？

原因就在于 `completeWork中的appendAllChildren` 方法。

由于`completeWork`属于“归”阶段调用的函数，每次调用`appendAllChildren`时都会将已生成的子孙DOM节点插入当前生成的DOM节点下。那么当“归”到rootFiber时，我们已经有一个构建好的离屏DOM树。

 effectList

至此render阶段的绝大部分工作就完成了。

还有一个问题：作为DOM操作的依据，commit阶段需要找到所有有effectTag的Fiber节点并依次执行effectTag对应操作。难道需要在commit阶段再遍历一次Fiber树寻找effectTag !== null的Fiber节点么？

这显然是很低效的。

为了解决这个问题，在completeWork的上层函数completeUnitOfWork中，每个执行完completeWork且存在effectTag的Fiber节点会被保存在一条被称为effectList的单向链表中。

effectList中第一个Fiber节点保存在fiber.firstEffect，最后一个元素保存在fiber.lastEffect。

类似appendAllChildren，在“归”阶段，所有有effectTag的Fiber节点都会被追加在effectList中，最终形成一条以rootFiber.firstEffect为起点的单向链表。

```
 nextEffect nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

这样，在commit阶段只需要遍历`effectList`就能执行所有`effect`了。

 流程结尾

至此，render阶段全部工作完成。在performSyncWorkOnRoot函数中fiberRootNode被传递给commitRoot方法，开启commit阶段工作流程。

`commitRoot(root);`

## react element 和 component 的区别 {#p1-react-element-component}

## diff 算法 {#p0-diff}

在 react 中：一个`DOM`节点在某一时刻最多会有4个节点和他相关。

一个DOM节点在某一时刻最多会有4个节点和他相关。

1. `JSX对象`。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

2. `workInProgress Fiber`。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。

3. `current Fiber`。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。

4. `DOM节点本身`。

**Diff算法的本质是对比1和2，生成3。**

 概览

 Diff的瓶颈以及React如何应对

由于Diff操作本身也会带来性能损耗， 即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。

如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围

为了降低算法复杂度，**React的diff会预设三个限制**：

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

3. 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

 Diff是如何实现的

我们从Diff的入口函数reconcileChildFibers出发，该函数会根据newChild（即JSX对象）类型调用不同的处理函数。

从同级的节点数量将Diff分为两类：

1. 当newChild类型为object、number、string，代表同级只有一个节点

2. 当newChild类型为Array，同级有多个节点

 单节点 diff

路程图：
![image](https://user-images.githubusercontent.com/22188674/235393691-d5355bfb-da2a-4ffd-9961-04a3927ebd11.png)

React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。

 多节点 diff

主要分为以下几种情况

* 节点更新
* 节点属性变化
* 节点类型更新
* 节点新增或减少
* 节点位置变化

 diff 思路

React 团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新。

本质上是进行了两轮遍历：

* 第一轮遍历：处理更新的节点。
* 第二轮遍历：处理剩下的不属于更新的节点。

**为何不用双向指针的方式**？

虽然本次更新的JSX对象 newChildren为数组形式，但是和newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历。

即 newChildren[0]与fiber比较，newChildren[1]与fiber.sibling比较。

所以无法使用双指针优化。

 第一次遍历

第一轮遍历步骤如下：

1. `let i = 0`，遍历`newChildren`，将`newChildren[i]`与`oldFiber`比较，判断DOM节点是否可复用。

2. 如果可复用，`i++`，继续比较`newChildren[i]`与`oldFiber.sibling`，可以复用则继续遍历。

3. 如果不可复用，分两种情况：

* key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

* key相同type不同导致不可复用，会将`oldFiber`标记为`DELETION`，并继续遍历

4. 如果`newChildren`遍历完（即`i === newChildren.length - 1`）或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历，第一轮遍历结束。

源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L818)

 第二轮遍历

**`newChildren`与`oldFiber`同时遍历完**

那就是最理想的情况：只需在第一轮遍历进行组件更新

> 源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L825)

**`newChildren`没遍历完，`oldFiber`遍历完**

已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`为生成的`workInProgress fiber`依次标记`Placement`。

> 源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L869)

**`newChildren`遍历完，`oldFiber`没遍历完**

意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的`oldFiber`，依次标记`Deletion`。

> [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L863)

**`newChildren`与`oldFiber`都没遍历完**

这意味着有节点在这次更新中改变了位置。

这是Diff算法最精髓也是最难懂的部分。我们接下来会重点讲解。

> 源码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L893)

 处理移动的节点

由于有节点改变了位置，所以不能再用位置索引i对比前后的节点，那么如何才能将同一个节点在两次更新中对应上呢？

我们需要使用key。

为了快速的找到key对应的`oldFiber`，我们将所有还未处理的`oldFiber`存入以key为key，`oldFiber`为`value`的`Map`中。

`const existingChildren = mapRemainingChildren(returnFiber, oldFiber);`

> 源码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L890)

接下来遍历剩余的`newChildren`，通过`newChildren[i].key`就能在`existingChildren`中找到`key`相同的`oldFiber`。

 标记节点是否移动

既然我们的目标是寻找移动的节点，那么我们需要明确：节点是否移动是以什么为参照物？

我们的参照物是：最后一个可复用的节点在`oldFiber`中的位置索引（用变量`lastPlacedIndex`表示）。

由于本次更新中节点是按`newChildren`的顺序排列。在遍历`newChildren`过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在`lastPlacedIndex`对应的可复用的节点在本次更新中位置的后面。

那么我们只需要比较遍历到的可复用节点在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量`oldIndex`表示遍历到的可复用节点在`oldFiber`中的位置索引。如果`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为0，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`。

 参考文档

* [资料](https://react.iamkasong.com/diff/prepare.html)

## jsx 返回 null undefined false 区别 {#p2-jsx-return-null-undefined-false}

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

## Class Components 和 Function Components 有区别？ {#p1-react-class-function}

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

 ```js
function handleClick () {
   this.setState({ count: this.state.count + 1 })
   this.setState({ count: this.state.count + 1 })
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
  constructor (props) {
    super(props)
    this.state = { count: 0 }
  }

  handleClick () {
    // 方式一：对象形式
    this.setState({ count: this.state.count + 1 })
    // 方式二：函数形式
    this.setState((prevState) => ({ count: prevState.count + 1 }))
  }
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

## fiber {#p0-fiber}

 双缓存Fiber树

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题， 就有了图像处理中的**双缓存技术**。

双缓存是一种技术，用于在图像处理中减少闪烁和图像模糊等视觉问题。在使用双缓存时，图像处理器会将图像绘制到一个“后台缓存”中，而不是直接绘制到屏幕上。一旦绘制完成，新的图像将与当前显示的图像交换，使得新图像无缝地显示在屏幕上，避免了闪烁和模糊的问题。因此，双缓存有助于提高图像处理的质量和可靠性，特别是在高速显示和实时处理应用中。

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

React Fiber 的双缓存机制是一种优化技术，用于在 UI 更新过程中避免视觉问题，如闪烁、撕裂和卡顿等。React Double Buffer 在 React Fiber 内部实现了两个缓存区域：当前显示的缓存（Current Buffer）和等待显示的缓存（Work Buffer）。

```js
currentFiber.alternate === workInProgressFiber
workInProgressFiber.alternate === currentFiber
```

当应用程序状态发生更改，并需要更新 UI 时，React Fiber 首先在 Work Buffer 中执行所有渲染操作，以避免将中间状态呈现在屏幕上。一旦 Work Buffer 中的所有渲染操作完成，React Fiber 将当前缓存与工作缓存进行切换，即将 Work Buffer 设置为当前缓存，以此来更新屏幕上的 UI。

这样一来，React Fiber 就可以确保在任何时候，所有呈现在屏幕上的内容都是完整和稳定的。

 mount与update 场景

当组件第一次被挂载时：

```jsx
class MyComponent extends React.Component {

 constructor(props) {
 super(props);
 this.state = {
 count: 0,
 };
 }

 handleClick = () => {
 this.setState((prevState) => ({
 count: prevState.count + 1,
 }));
 }

 render() {
 return (
 <div onClick={this.handleClick}>
 Click me: {this.state.count}
 </div>
 );
 }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

当我们将 `<MyComponent />` 挂载到页面上时，React Fiber 首先会在内存中创建一个空的 Fiber 树，然后根据组件的定义，为组件创建一个初始的“工作单元”（Work In Progress）。

在这个工作单元内部，React Fiber 会为状态和 props 建立初始的 Fiber 对象，并在之后的更新过程中使用这些 Fiber 对象来跟踪组件的状态和变化。这样可以确保任何时候都可以根据状态和 props 的变化来更新 UI，而不会出现任何问题。

接下来，React Fiber 开始在工作单元中执行所有的渲染操作，生成一棵虚拟 DOM 树，并将其添加到 Work Buffer 中。然后，React Fiber 会检查 Work Buffer 是否有更改，如果有更改，就将 Work Buffer 与 Current Buffer 进行对比，以查找差异并更新到 DOM 上。

这个初次渲染的过程不太会涉及到双缓存树，因为当前缓存是空的，所有的操作都是在 Work Buffer 中进行的。但是，一旦初次渲染完成，并且组件状态发生变化时，双缓存树就开始发挥作用了。

当我们通过点击按钮更新组件状态时，React Fiber 将启动一个新的渲染周期，并为更新创建一个新的工作单元。React Fiber 会在新的工作单元中更新状态、生成新的虚拟 DOM 树，并将其添加到 Work Buffer 中。

然后，React Fiber 会将 Work Buffer 与 Current Buffer 进行对比，找出差异并将其更新到 DOM 上。但是，由于双缓存树的存在，React Fiber 不会立即将 Work Buffer 切换到 Current Buffer，以避免将中间状态显示在屏幕上。

 执行流程

好的，下面是 React Fiber 在页面初次更新时的工作过程的流程图：

1. 应用程序启动，ReactDOM 调用 `ReactDOM.render()` 方法，并将组件渲染到 DOM 中，React Fiber 创建一个空的 Fiber 树。
2. React Fiber 为组件创建初始的“工作单元”，并在其中创建状态和 props 的 Fiber 对象。
3. React Fiber 执行组件的 `render()` 方法，生成虚拟 DOM 树并添加到工作单元中。
4. React Fiber 将工作单元中的虚拟 DOM 树添加到 Work Buffer 中。
5. React Fiber 检查 Work Buffer 是否有更改，如果有更改，则将其与 Current Buffer 进行对比，并将差异更新到 DOM 上。
6. 由于这是初次渲染，Current Buffer 为空，所有更新操作都在 Work Buffer 中完成，然后将 Work Buffer 设置为 Current Buffer。
7. React Fiber 在内存中保留 Fiber 树的副本，并用于后续的更新操作。此时，组件初次渲染流程结束。

1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。

2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

 Fiber的结构

总的属性如下：

```ts
function FiberNode (
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // 作为静态数据结构的属性
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null
  this.stateNode = null

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.ref = null

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps
  this.memoizedProps = null
  this.updateQueue = null
  this.memoizedState = null
  this.dependencies = null

  this.mode = mode

  this.effectTag = NoEffect
  this.nextEffect = null

  this.firstEffect = null
  this.lastEffect = null

  // 调度优先级相关
  this.lanes = NoLanes
  this.childLanes = NoLanes

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null
}
```

可以按三层含义将他们分类来看

 作为架构

每个Fiber节点有个对应的React element，多个Fiber节点是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null
// 指向子Fiber节点
this.child = null
// 指向右边第一个兄弟Fiber节点
this.sibling = null
```

举个例子，如下的组件结构：

```js
function App () {
  return (
 <div>
 i am
 <span>KaSong</span>
 </div>
  )
}
```

对应的Fiber树结构：
![image](https://user-images.githubusercontent.com/22188674/235214339-4efeccaf-95fd-420f-8ac2-7a9b89c301c0.png)

 作为静态的数据结构

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag
// key属性
this.key = key
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null
// Fiber对应的真实DOM节点
this.stateNode = null
```

 作为动态的工作单元

作为动态的工作单元，Fiber中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps
this.memoizedProps = null
this.updateQueue = null
this.memoizedState = null
this.dependencies = null

this.mode = mode

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect
this.nextEffect = null

this.firstEffect = null
this.lastEffect = null

// 调度优先级相关
this.lanes = NoLanes
this.childLanes = NoLanes
```

本质上来说就是将渲染任务拆分成多个小任务，以便提高应用程序的响应性和性能。React Fiber 实现时间切片主要依赖于两个核心功能：**任务分割和任务优先级**。

任务分割是指将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。React Fiber 使用 Fiber 节点之间的父子关系，将一个组件树分割成多个”片段“，每个“片段”内部是一颗 Fiber 子树，多个“片段”之间可以交错执行，实现时间切片。

任务优先级是指 React Fiber 提供了一套基于优先级的算法来决定哪些任务应该先执行，哪些任务可以放到后面执行。React Fiber 将任务分成多个优先级级别，较高优先级的任务在进行渲染时会优先进行，从而确保应用程序的响应性和性能。

React Fiber 实现时间切片的基本原理如下：

1. React Fiber 会将渲染任务划分成多个小任务，每个小任务一般只负责一小部分 DOM 更新。
2. React Fiber 将这些小任务保存到任务队列中，并按照优先级进行排序和调度。
3. 当浏览器处于空闲状态时，React Fiber 会从任务队列中取出一个高优先级的任务并执行，直到任务完成或者时间片用完。
4. 如果任务完成，则将结果提交到 DOM 树上并开始下一个任务。如果时间片用完，则将任务挂起，并将未完成的工作保存到 Fiber 树中，返回控制权给浏览器。
5. 当浏览器再次处于空闲状态时，React Fiber 会再次从任务队列中取出未完成的任务并继续执行，直到所有任务完成。

通过使用任务分割和任务优先级算法，React Fiber 实现了时间切片功能，保证了应用程序的响应性和性能，提高了用户的使用体验。

 是如何实现任务分割的？伪代码实现一下

React Fiber 实现任务分割的过程十分复杂，需要涉及到 Fiber 数据结构、调度器、DOM 操作等多个部分。以下是一个简单的示例代码，演示了 React Fiber 任务分割的基本工作原理。

```jsx
const workInProgressFiber = {};

const performUnitOfWork = () => {
 // 执行当前 Fiber 对应的组件
 const isFunctionComponent = workInProgressFiber.type instanceof Function; 
 if (isFunctionComponent) {
 updateFunctionComponent(workInProgressFiber);
 } else {
 updateHostComponent(workInProgressFiber);
 }

 // 返回下一个待处理的 Fiber 节点
 if (workInProgressFiber.child) {
 return workInProgressFiber.child;
 }

 let nextFiber = workInProgressFiber;
 while (nextFiber) {
 if (nextFiber.sibling) {
 return nextFiber.sibling;
 }
 nextFiber = nextFiber.parent;
 }

 return null;
};

const render = (element, container) => {
 const rootFiber = {
 dom: container,
 props: {
 children: [element],
 },
 };

 workInProgressFiber = rootFiber;
 nextUnitOfWork = rootFiber;

 requestIdleCallback(workLoop);
};

const workLoop = (deadline) => {
 while (nextUnitOfWork && deadline.timeRemaining() > 0) {
 nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
 }

 if (nextUnitOfWork) {
 requestIdleCallback(workLoop);
 }
};

const updateFunctionComponent = (fiber) => {
 const children = [fiber.type(fiber.props)];
 reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
 if (!fiber.dom) {
 fiber.dom = createDom(fiber);
 }

 reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (fiber, children) => {
 let index = 0;
 let oldFiber = fiber.alternate ? fiber.alternate.child : null;
 let prevSibling = null;

 while (index < children.length || oldFiber) {
 const child = children[index];
 let newFiber = null;
 const sameType = oldFiber && child && child.type === oldFiber.type;

 if (sameType) {
 newFiber = {
 type: oldFiber.type,
 props: child.props,
 dom: oldFiber.dom,
 parent: fiber,
 alternate: oldFiber,
 effectTag: 'UPDATE',
 };
 }

 if (child && !sameType) {
 newFiber = {
 type: child.type,
 props: child.props,
 dom: null,
 parent: fiber,
 alternate: null,
 effectTag: 'PLACEMENT',
 };
 }

 if (oldFiber && !sameType) {
 oldFiber.effectTag = 'DELETION';
 deletions.push(oldFiber);
 }

 if (oldFiber) {
 oldFiber = oldFiber.sibling;
 }

 if (index === 0) {
 fiber.child = newFiber;
 } else if (child) {
 prevSibling.sibling = newFiber;
 }

 prevSibling = newFiber;

 index++;
 }
};
```

在这个示例中，我们定义了一个名为 `performUnitOfWork` 的函数，用于执行一个 Fiber 节点上的任务。这个函数会根据 Fiber 节点的类型，执行不同的操作，并返回下一个待处理的 Fiber 节点。

在 `updateFunctionComponent` 和 `updateHostComponent` 函数中，我们分别根据 Fiber 节点的类型执行函数组件和普通组件的更新操作。通过 `reconcileChildren` 函数，我们可以将一个组件的子节点拆分成多个 Fiber 节点，并在 `performUnitOfWork` 函数中进行遍历和处理。

React Fiber 实现任务分割的核心思想是将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。通过在 Fiber 树上进行遍历和操作，我们可以实现任务分割，提高应用程序的响应性和性能。

 react fiber 是如何实现任务优先级的？用代码简单示范一下

React Fiber 的任务优先级是通过创建多个优先级队列，并使用一个时间片策略来调度任务的。以下是一个简单的示例代码，用于演示 React Fiber 的优先级队列和任务优先级机制。

```jsx
const MAX_PRIORITY_LEVEL = 5;

const NoWork = 0;
const Sync = 1;
const DefaultPriority = 3;
const IdlePriority = 4;
const AnimationPriority = 5;

const initialScheduler = {
 didTimeout: false,
 enqueuedTasks: [],
 scheduledCallback: null,
 scheduledCallbackTimeout: null,
 taskQueue: [],
 currentTime: 0,
};

let currentScheduler = initialScheduler;

const enableScheduler = () => {
 // ...初始化 scheduler 的代码...
};

const requestCallback = (callback, options) => {
 const currentTime = getCurrentTime();
 const timeout = options != null && options.timeout != null ? options.timeout : -1;
 const expirationTime =
 timeout > 0 ? currentTime + timeout : currentTime + 51000;
 const newTask = {
 callback,
 priorityLevel: DefaultPriority,
 startTime: currentTime,
 expirationTime,
 };

 currentScheduler.taskQueue.push(newTask);
 ensureHostCallbackIsScheduled();
};

const ensureHostCallbackIsScheduled = () => {
 if (currentScheduler.scheduledCallback === null) {
 currentScheduler.scheduledCallback = performSchedulerWork;
 currentScheduler.scheduledCallbackTimeout = setTimeout(() => {
 performSchedulerWork(currentTime);
 }, 0);
 }
};

const performSchedulerWork = (currentTime) => {
 performConcurrentWorkOnRoots();

 if (currentScheduler.taskQueue.length > 0) {
 const firstTask = currentScheduler.taskQueue[0];
 if (firstTask.startTime <= currentTime) {
 currentScheduler.taskQueue.shift();
 firstTask.callback({ didTimeout: false });
 return;
 }
 }
};

const performConcurrentWorkOnRoots = () => {
 const priorityLevel = AnimationPriority;
 const deadline = {
 timeRemaining() {
 return Infinity;
 },
 };
 while (currentScheduler.taskQueue.length > 0) {
 const task = findHighestPriorityTask();
 if (task.priorityLevel > priorityLevel || task.expirationTime <= currentScheduler.currentTime) {
 break;
 }
 const root = task.callback(deadline);

 if (root !== null) {
 // ...执行任务更新...
 }
 }
};

const findHighestPriorityTask = () => {
 let highestPriorityTask = null;
 let highestPriorityLevel = NoWork;

 for (let i = 0; i < currentScheduler.taskQueue.length; i++) {
 const task = currentScheduler.taskQueue[i];
 const priorityLevel = task.priorityLevel;
 if (priorityLevel > highestPriorityLevel) {
 highestPriorityLevel = priorityLevel;
 highestPriorityTask = task;
 }
 }

 return highestPriorityTask;
};
```

在这个示例中，我们定义了多个优先级常量和优先级队列，以及与之相关的一些变量和函数。我们通过 `requestCallback` 函数，将任务以优先级的方式插入到任务队列中。在 `performConcurrentWorkOnRoots` 函数中，我们按照优先级顺序遍历任务队列，并将任务的回调函数传递给 `callback` 函数执行更新操作。

通过在任务队列和调度器中使用优先级的方式来调度和执行任务，我们可以在保证页面响应性的同时，最大化利用浏览器的空闲时间，提高应用程序整体的性能和用户体验。

之前 React 的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。
为c？原架构有何不足？原架构采用递归遍历方式来更新 DOM 树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如 input 输入后页面卡顿等
Fiber 如何解决该问题？时间分片和暂停
Fiber如何实现？使用链表结构，将递归遍历更改为循环遍历，实现任务拆分、中断和恢复
Fiber 如何实现比较？双缓冲技术，在 diff 过程中创建新的 DOM Tree，diff 完成之后生成 EffectList，即需要更新的地方，之后进入 commit 阶段，该阶段不允许中断

## react 如何处理事件，Synthetic Event 的作用

## react router

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

## redux {#p0-redux}

实现 Redux 的源码主要包括以下几个步骤：

1. 实现 createStore 函数，创建 store 对象，该函数接收一个 reducer 函数作为参数，返回一个对象。
2. 在 createStore 函数内部，定义一个 state 变量来存储当前的状态值，定义一个 listeners 数组来存储所有的监听函数。
3. 实现 getState 方法，返回当前的状态值。
4. 实现 dispatch 方法，接收一个 action 对象作为参数，将当前的状态值和 action 对象传给 reducer 函数，更新状态值。然后遍历 listeners 数组，调用所有的监听函数。
5. 实现 subscribe 方法，接收一个监听函数作为参数，将该函数添加到 listeners 数组中，以便在状态更新时调用。
6. 实现 combineReducers 函数，将多个 reducer 函数合并成一个 reducer 函数。
7. 在 createStore 函数内部，将传入的 reducer 函数或者合并后的 reducer 函数赋值给一个内部的 currentReducer 变量。
8. 在 dispatch 方法内部，将 currentReducer 赋值给一个局部变量，以保证在 reducer 函数中调用 dispatch 方法时可以获取到最新的 reducer 函数。

下面是代码实现：

```javascript
// 实现 createStore 函数
function createStore (reducer) {
  let state
  const listeners = []

  function getState () {
    return state
  }

  function dispatch (action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
  }

  function subscribe (listener) {
    listeners.push(listener)
  }

  dispatch({})

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 实现 combineReducers 函数
function combineReducers (reducers) {
  return function (state = {}, action) {
    const nextState = {}
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState
  }
}
```

在使用时，可以先定义 reducer 函数：

```javascript
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

function visibilityFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
```

然后将它们传入 combineReducers 函数，创建一个 reducer 函数：

```javascript
const reducer = combineReducers({
  todos,
  visibilityFilter
})
```

最后调用 createStore 函数，创建一个 store 对象：

```javascript
const store = createStore(reducer)
```

现在就可以使用 store 对象来获取状态值、派发 action、监听状态变化了。

可以参考文档: [资料](https://juejin.cn/post/6844903785689546760)

Redux 和 React-Redux 是两个独立的库，但它们通常一起使用，因为 Redux 库本身并不针对 React，而是一个通用的状态管理库，而 React-Redux 则是一个用于将 Redux 集成到 React 应用程序中的库。

React-Redux 提供了一组 React 组件和钩子，使得在 React 应用程序中使用 Redux 变得更加容易。它提供了一个 `Provider` 组件，可以将 Redux store 注入到整个 React 应用程序中，并且可以使用 `connect` 函数将组件连接到 Redux store，使它们可以访问和修改 store 中的数据。

使用 React-Redux，我们可以将 Redux 的状态管理能力与 React 的组件化能力结合起来，使得应用程序的状态可以很方便地被管理和共享，并且组件也可以方便地访问和修改应用程序的状态。

 react-redux 是如何集成到 UI 的？

`react-redux` 提供了两个主要的组件 `Provider` 和 `connect`，它们用于将 Redux 状态管理与 React 组件相结合。

首先，使用 `Provider` 组件将 Redux store 传递给整个应用程序。可以将 `<Provider>` 组件作为最高层的组件，这样在应用程序中的所有组件中都可以访问到 Redux store。

下一步，使用 `connect` 函数连接 Redux store 和组件。`connect` 函数是一个高阶函数，它接收两个参数：`mapStateToProps` 和 `mapDispatchToProps`，并返回另一个函数，这个函数接受一个组件作为参数，并返回一个增强版的组件。

`mapStateToProps` 函数用于从 Redux store 中获取需要的 state 数据，并将其映射到组件的 props 上。`mapDispatchToProps` 函数用于将 action creator 映射到组件的 props 上，这样组件就可以直接调用 action creator 发起 action，而不需要手动分发 dispatch。

使用 `connect` 函数生成的增强版组件可以访问到 Redux store 中的 state 和 dispatch，并将它们作为 props 传递给原始组件。在组件中，可以直接使用这些 props 来获取和更新 state，以及发起 action。当组件中的 state 或 props 发生变化时，`connect` 函数会自动更新组件，以反映最新的 state 和 props。

通过这种方式，`react-redux` 让我们可以在 React 组件中使用 Redux 进行状态管理，实现了 Redux 和 React 的无缝集成。

 简单写一下更新 UI 核心代码实现

react-redux 是基于 React 和 Redux 的，主要用于将 Redux 的状态管理功能集成到 React 应用程序中。它主要包括两个部分：Provider 和 connect。

Provider 组件是 react-redux 的核心，它将 Redux 的 store 作为 props 传递给 React 组件，并通过 React 的上下文（Context）使得后代组件能够访问到 store。

connect 函数用于连接 React 组件与 Redux store，返回一个新的组件。该函数的主要作用是在组件中提供 mapStateToProps 和 mapDispatchToProps 函数，从而使组件能够从 Redux store 中读取数据，并向 store 分发 action。

下面是一个简单的实现，用于说明 react-redux 是如何集成到 UI 的：

```javascript
// Provider.js
import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext();

export default function Provider(props) {
 const { store, children } = props;
 return (
 <StoreContext.Provider value={store}>
 {children}
 </StoreContext.Provider>
 );
}

Provider.propTypes = {
 store: PropTypes.object.isRequired,
 children: PropTypes.any,
};

// connect.js
import React from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from './Provider';

export default function connect(mapStateToProps, mapDispatchToProps) {
 return function wrapWithConnect(WrappedComponent) {
 class Connect extends React.Component {
 componentDidMount() {
 const { store } = this.context;
 this.unsubscribe = store.subscribe(this.handleChange.bind(this));
 }

 componentWillUnmount() {
 this.unsubscribe();
 }

 handleChange() {
 this.forceUpdate();
 }

 render() {
 const { store } = this.context;
 const props = {
 ...this.props,
 ...mapStateToProps(store.getState(), this.props),
 ...mapDispatchToProps(store.dispatch, this.props),
 };
 return <WrappedComponent {...props} />;
 }
 }

 Connect.contextType = StoreContext;
 Connect.propTypes = {
 store: PropTypes.object,
 };
 Connect.displayName = `Connect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

 return Connect;
 };
}
```

这里的 Provider 组件用于将 Redux 的 store 传递给 React 组件：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
 <Provider store={store}>
 <App />
 </Provider>,
 document.getElementById('root')
)
```

而 connect 函数用于将 React 组件连接到 Redux store：

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { increment } from './actions'

function Counter (props) {
  const { count, increment } = props
  return (
 <div>
 <p>Count: {count}</p>
 <button onClick={() => increment()}>+</button>
 </div>
  )
}

const mapStateToProps = state => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

Redux 的存储过程可以简单地分为以下几个步骤：

1. Action Creator 函数被调用，生成一个 Action 对象；
2. Action 对象被传递给 Store.dispatch() 方法；
3. Redux Store 调用 Reducer 函数，将当前的 State 和 Action 作为参数传入；
4. Reducer 函数根据 Action 的类型，生成一个新的 State；
5. Redux Store 将新的 State 存储下来，用于下一次的状态更新；
6. 组件通过调用 Store.subscribe() 方法，监听 Store 中 State 的变化；
7. 当 State 发生变化时，Store 会通知所有的订阅者，订阅者会重新渲染相应的组件。

这个过程可以简单地描述为：Action -> Reducer -> Store -> View。其中，Action 是一个纯对象，它描述了发生的事件；Reducer 是一个纯函数，它接收当前的 State 和 Action，返回一个新的 State；Store 是将 Action 和 Reducer 结合起来的对象，它维护了应用程序的 State；View 则是 React 组件，它通过 Store.subscribe() 方法监听 State 的变化，根据 State 的变化重新渲染页面。

Redux 的 reducer 是纯函数，它的作用是接收一个旧的状态和一个操作，返回一个新的状态，是一个纯粹的状态转换函数，因此在 reducer 中不能执行异步操作，否则会破坏 reducer 的纯函数特性。如果在 reducer 中执行异步操作，会导致 reducer 不可预测和不可重现，因为异步操作的结果是不确定的，而 reducer 必须保证在相同的输入条件下，产生相同的输出结果。同时，在 reducer 中执行异步操作可能会导致应用的状态不一致或者有延迟的问题。

为了解决这个问题，Redux 提供了中间件的机制，比如 `redux-thunk`、`redux-saga` 等，可以在中间件中进行异步操作，然后再将异步操作的结果传递给 reducer 进行状态更新。这样就可以避免在 reducer 中执行异步操作，保证 reducer 的纯函数特性，同时也可以完成异步操作的需求。

## mobx

## mobx 与 redux 的区别

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

在React中，合成事件和原生事件的触发顺序是先合成事件，然后是原生事件。

React使用了一种称为"合成事件"的机制来处理事件。当你在组件中使用事件属性（例如onClick）时，React会在底层创建合成事件，并将其附加到相应的DOM元素上。合成事件是React自己实现的一套事件系统，它通过事件委托和其他技术来提供更好的性能和一致的事件处理方式。

当触发一个合成事件时，React会首先执行事件的处理函数，然后会调用合成事件的`stopPropagation()`方法来阻止事件冒泡。如果处理函数调用了`stopPropagation()`，则合成事件会终止，不再触发原生事件。

如果合成事件没有被终止，并且对应的DOM元素上还有原生事件监听器，React会触发相应的原生事件。原生事件是由浏览器提供的，React并没有对其进行改变或拦截。

因此，合成事件和原生事件的触发顺序是**先合成事件，然后是原生事件**。这意味着在事件处理函数中，你可以放心地使用合成事件对象，而不需要担心原生事件的影响。

**为何有一些文章是说， 原生事件先执行？**

原生事件先执行的说法是因为在React早期的版本中，React使用事件委托的方式来处理事件。事件委托是指将事件处理函数绑定在父元素上，然后利用事件冒泡机制，通过父元素捕获并处理子元素的事件。这种方式会导致在事件冒泡阶段，父元素的事件处理函数会先于子元素的事件处理函数执行。

在这种情况下，如果一个组件有一个合成事件和一个原生事件绑定在同一个元素上，原生事件的处理函数会在合成事件的处理函数之前执行。这就造成了一些文章中提到的原生事件先执行的观察结果。

然而，从React v16开始，React改变了事件处理的方式，不再使用事件委托，而是直接将事件处理函数绑定在目标元素上。这样做的好处是提高了性能，并且保证了事件处理函数的执行顺序与绑定顺序一致。

因此，根据React的最新版本，合成事件会先于原生事件执行。如果你发现有一些旧的文章提到原生事件先执行，那可能是因为这些文章对React的早期版本进行了描述，不适用于目前的React版本。

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

## HOC {#p0-hoc}

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

## 性能优化 {#p0-render-profile}

**关键词**：react 渲染优化

在 React 中，有几种方法可以避免不必要的渲染，以提高性能和优化应用程序的渲染过程：

1. 使用 PureComponent 或 shouldComponentUpdate 方法：继承 PureComponent 类或在自定义组件中实现 shouldComponentUpdate 方法，以检查组件的 props 和 state 是否发生变化。如果没有变化，则阻止组件的重新渲染。这种方式适用于简单的组件，并且可以自动执行浅比较。

2. 使用 React.memo 高阶组件：使用 React.memo 包装函数组件，以缓存组件的渲染结果，并仅在其 props 发生变化时重新渲染。这种方式适用于函数组件，并且可以自动执行浅比较。

3. 避免在 render 方法中创建新对象：由于对象的引用发生变化，React 将会认为组件的 props 或 state 发生了变化，从而触发重新渲染。因此，应尽量避免在 render 方法中创建新的对象，尤其是在大型数据结构中。

4. 使用 key 属性唯一标识列表项：在渲染列表时，为每个列表项指定唯一的 key 属性。这样，当列表项重新排序、添加或删除时，React 可以更准确地确定哪些列表项需要重新渲染，而不是重新渲染整个列表。

5. 使用 useCallback 和 useMemo 避免不必要的函数和计算：使用 useCallback 缓存函数引用，以确保只有在其依赖项发生变化时才重新创建函数。使用 useMemo 缓存计算结果，以确保只有在其依赖项发生变化时才重新计算结果。这些钩子函数可以帮助避免不必要的函数创建和计算过程，从而提高性能。

6. 使用 React.lazy 和 Suspense 实现按需加载组件：使用 React.lazy 函数和 Suspense 组件可以实现按需加载组件，只在需要时才加载组件代码。这可以减少初始渲染时的资源负载。

从 React 层面上，可以进行以下性能优化：

1. 使用 memoization（记忆化）：通过使用 React.memo() 或 useMemo() 来避免不必要的重新渲染。这对于纯函数组件和大型组件特别有用。

2. 使用 shouldComponentUpdate 或 PureComponent：在类组件中，可以通过重写 shouldComponentUpdate 方法或使用 PureComponent 来避免不必要的重新渲染。

3. 使用 React.lazy 和 Suspense：通过使用 React.lazy 和 Suspense 来按需加载组件，从而减少初始加载时间。

4. 使用虚拟化：对于大型列表或表格等组件，可以使用虚拟化技术（如 react-window 或 react-virtualized）来仅渲染可见区域内的元素，从而提高性能。

5. 避免不必要的渲染：在函数组件中，可以使用 useCallback 和 useMemo 来避免不必要的函数创建和计算, 使用 useRef 保持函数应用的唯一性。

6. 使用 key 属性：在使用列表或动态元素时，确保为每个元素提供唯一的 key 属性，这有助于 React 有效地识别和更新元素。

7. 使用 React DevTools Profiler：使用 React DevTools Profiler 来分析组件的渲染性能，并找出性能瓶颈。

8. 使用 React.StrictMode：在开发环境中，可以使用 React.StrictMode 组件来检测潜在的问题和不安全的使用。

9. 避免深层嵌套：尽量避免过多的组件嵌套，这可能会导致性能下降。

10. 使用组件分割：将大型组件拆分成多个小组件，可以提高组件的可维护性和性能。

这些是一些常见的 React 层面上的性能优化技巧，根据具体的应用场景和需求，可能还有其他优化方式。

参考文档：
[资料](https://juejin.cn/post/7273427487588925501)

## 如何实现转场动画？

这个问题非常复杂， 我这边用白话文解释一下原理， 若有不对的地方， 请大家更正：

如果没有专场动画， 那么在路由切换的一瞬间， 加载下一个路由页面的组件， 注销上一个路由页面的组件；

但是如果加上专场动画， 比如专场动画时间为 500ms， 那么， 在咋合格 500ms 过程中， 首先要加载下一个路由页面的组件， 然后加载上一个渐进的动画。
同时不能注销掉当前路由， 需要给当前路由加载一个渐出的动画。
需要当两个页面完成动画时间， 完成页面覆盖切换之后， 然后注销上一个路由页面的组件；

所以涉及到的知识点：

1. 如何做页面跳转拦截；
2. 如何在页面路由组件不跳转的同时， 加载下一个页面的组件；
3. 配置页面层级；
4. 如何执行、加载、完成专场动画；
5. 动画结束的时候手动注销组件；

具体实现， 可以参考以下两个文档：

* [资料](https://github.com/SmallStoneSK/Blog/issues/8)
* [资料](https://juejin.cn/post/6887471865720209415)

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

## 事件绑定原理 {#p0-event-bind}

 绑定原理与过程

在 React 中，事件绑定不同于传统的直接在 HTML 元素添加事件监听器的方式。React 的事件绑定是建立在自定义组件上的，因此需要对 React 组件的生命周期进行理解。

React 事件绑定的原理可以概括为三个步骤：

1. 创建 React 元素

在 React 中，事件的绑定是通过在 JSX 中创建元素时给元素添加一个事件属性实现的。例如：

```
<button onClick={this.handleClick}>点我</button>
```

这里使用 onClick 属性将组件的 handleClick 方法传递给一个按钮组件，这个按钮组件在点击之后会调用 handleClick 方法。

2. 挂载事件处理函数

当 React 元素插入文档中之后，React 会在元素宿主节点上挂载事件处理函数。这个过程是在 React 元素生成之后、组件挂载之前完成的。React 在执行组件挂载生命周期函数之前，会将所有元素上声明的事件处理函数统一挂载到 DOM 上。

3. 移除事件处理函数

当 React 元素被移除文档时，React 会自动移除对应的事件处理函数。这个过程是在组件卸载之后、元素从 DOM 中移除之前执行的。

React 的事件绑定表现为组件的方法，所以在事件处理函数中，可以通过 this 关键字来访问组件的状态和属性。

需要注意的是，React 组件中不能使用原生事件绑定方式，比如使用 `element.addEventListener('click', function(){})`，因为这样做会导致 React 无法正确地跟踪组件状态的变化，从而可能导致一些潜在问题。

 React 组件中为何不能使用原生事件绑定方式

React 组件中不能使用原生事件绑定方式是因为，React 使用的是 Virtual DOM 技术，而不是直接操作 DOM。React 的 Virtual DOM 能够自动监测组件（即数据）状态的变化和更新，从而根据更新后的状态重新渲染视图，并在必要的时候更新真实 DOM。

如果使用原生事件绑定方式，比如使用 `element.addEventListener('click', function(){})`，那么这些绑定的事件处理函数是直接绑定在真实的 DOM 元素上的，并不参与 Virtual DOM 中的数据流程，这样就会导致以下两个问题：

1. 事件绑定后，如果组件状态变化并且重新渲染，那么重新渲染后的组件实例会重新创建一个新的 DOM 元素，而旧的 DOM 元素会被销毁，导致原来的事件处理函数被绑定在了一个不存在的元素上，导致事件失效。

2. 使用原生事件绑定方式，无法在事件处理函数中直接访问组件实例的状态和属性。例如，在事件处理函数中想要访问一个组件的状态或者属性，就必须使用组件实例的引用（即 this 指针），但是这个 this 指针指向的并不是组件实例本身，而是真实的 DOM 元素，这样就无法直接访问组件状态和属性。

因此，在 React 中，我们必须使用 `onClick` 等钩子函数来绑定事件处理函数，这样 React 就能够在其 Virtual DOM 中正确地跟踪组件状态变化，并保证事件处理函数的正确性。当然，在一些极端的情况下，React 也提供了访问真实 DOM 元素的机制，比如 `ref` 属性，这个可以在某些场景下使用。

## commit 阶段的执行过程 {#p0-commit}

commitRoot方法是commit阶段工作的起点。fiberRootNode会作为传参。 `commitRoot(root);`

如何走到 commit 阶段的， 可以参考这个文档：[资料](https://github.com/pro-collection/interview-question/issues/324)

在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList，这些Fiber节点的updateQueue中保存了变化的props。

这些副作用对应的DOM操作在commit阶段执行。

除此之外，一些生命周期钩子（比如componentDidXXX）、hook（比如useEffect）需要在commit阶段执行。

commit阶段的主要工作（即Renderer的工作流程）分为三部分：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

你可以从这里看到commit阶段的完整代码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001)

在before mutation阶段之前和layout阶段之后还有一些额外工作，涉及到比如useEffect的触发、优先级相关的重置、ref的绑定/解绑。

 before mutation之前

`commitRootImpl`方法中直到第一句`if (firstEffect !== null)`之前属于`before mutation之前`。

我们大体看下他做的工作，现在你还不需要理解他们：

```ts
do {
  // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
  flushPassiveEffects()
} while (rootWithPendingPassiveEffects !== null)

// root指 fiberRootNode
// root.finishedWork指当前应用的rootFiber
const finishedWork = root.finishedWork

// 凡是变量名带lane的都是优先级相关
const lanes = root.finishedLanes
if (finishedWork === null) {
  return null
}
root.finishedWork = null
root.finishedLanes = NoLanes

// 重置Scheduler绑定的回调函数
root.callbackNode = null
root.callbackId = NoLanes

const remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes)
// 重置优先级相关变量
markRootFinished(root, remainingLanes)

// 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
if (rootsWithPendingDiscreteUpdates !== null) {
  if (
    !hasDiscreteLanes(remainingLanes) &&
 rootsWithPendingDiscreteUpdates.has(root)
  ) {
    rootsWithPendingDiscreteUpdates.delete(root)
  }
}

// 重置全局变量
if (root === workInProgressRoot) {
  workInProgressRoot = null
  workInProgress = null
  workInProgressRootRenderLanes = NoLanes
} else {
  // ..
}

// 将effectList赋值给firstEffect
// 由于每个fiber的effectList只包含他的子孙节点
// 所以根节点如果有effectTag则不会被包含进来
// 所以这里将有effectTag的根节点插入到effectList尾部
// 这样才能保证有effect的fiber都在effectList中
let firstEffect
if (finishedWork.effectTag > PerformedWork) {
  if (finishedWork.lastEffect !== null) {
    finishedWork.lastEffect.nextEffect = finishedWork
    firstEffect = finishedWork.firstEffect
  } else {
    firstEffect = finishedWork
  }
} else {
  // 根节点没有effectTag
  firstEffect = finishedWork.firstEffect
}
```

可以看到，before mutation之前主要做一些变量赋值，状态重置的工作。

这一长串代码我们只需要关注最后赋值的firstEffect，在commit的三个子阶段都会用到他。

 layout之后

接下来让我们简单看下layout阶段执行完后的代码，现在你还不需要理解他们：

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
} else {}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
}

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now())

// ...处理未捕获错误及老版本遗留的边界问题

// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue()

return null
```

主要包括三点内容：

1. useEffect相关的处理。

2. 性能追踪相关。
源码里有很多和interaction相关的变量。他们都和追踪React渲染时间、性能相关，在Profiler API 和DevTools 中使用。

1. 在commit阶段会触发一些生命周期钩子（如 componentDidXXX）和hook（如useLayoutEffect、useEffect）。

 before mutation 阶段

Renderer工作的阶段被称为commit阶段。commit阶段可以分为三个子阶段：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

本节我们看看before mutation阶段（执行DOM操作前）都做了什么。

 概览

before mutation阶段的代码很短，整个过程就是遍历effectList并调用commitBeforeMutationEffects函数处理。

```ts
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority()
setCurrentUpdateLanePriority(SyncLanePriority)

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext
executionContext |= CommitContext

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo)
shouldFireAfterActiveInstanceBlur = false

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork)

focusedInstanceHandle = null
```

我们重点关注beforeMutation阶段的主函数commitBeforeMutationEffects做了什么。

 commitBeforeMutationEffects

```ts
function commitBeforeMutationEffects () {
  while (nextEffect !== null) {
    const current = nextEffect.alternate

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect)
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects()
          return null
        })
      }
    }
    nextEffect = nextEffect.nextEffect
  }
}
```

整体可以分为三部分：

* 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。

* 调用getSnapshotBeforeUpdate生命周期钩子。

* 调度useEffect。

 调用 getSnapshotBeforeUpdate

commitBeforeMutationEffectOnFiber是commitBeforeMutationLifeCycles的别名。

在该方法内会调用getSnapshotBeforeUpdate。

从Reactv16开始，componentWillXXX钩子前增加了UNSAFE_前缀。

究其原因，是因为Stack Reconciler重构为Fiber Reconciler后，render阶段的任务可能中断/重新开始，对应的组件在render阶段的生命周期钩子（即componentWillXXX）可能触发多次。

这种行为和Reactv15不一致，所以标记为UNSAFE_。

更详细的解释参照这里(opens new window)

为此，React提供了替代的生命周期钩子getSnapshotBeforeUpdate。

我们可以看见，getSnapshotBeforeUpdate是在commit阶段内的before mutation阶段调用的，由于commit阶段是同步的，所以不会遇到多次调用的问题。

 调度useEffect

在这几行代码内，scheduleCallback方法由Scheduler模块提供，用于以某个优先级异步调度一个回调函数。

```ts
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects()
      return null
    })
  }
}
```

在此处，被异步调度的回调函数就是触发useEffect的方法flushPassiveEffects。

我们接下来讨论useEffect如何被异步调度，以及为什么要异步（而不是同步）调度。

 如何异步调度

在flushPassiveEffects方法内部会从全局变量rootWithPendingPassiveEffects获取effectList。

关于flushPassiveEffects的具体讲解参照useEffect与useLayoutEffect一节

在completeWork一节我们讲到，effectList中保存了需要执行副作用的Fiber节点。其中副作用包括

* 插入DOM节点（Placement）
* 更新DOM节点（Update）
* 删除DOM节点（Deletion）

除此外，当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值effectTag。

在flushPassiveEffects方法内部会遍历rootWithPendingPassiveEffects（即effectList）执行effect回调函数。

如果在此时直接执行，rootWithPendingPassiveEffects === null。

那么rootWithPendingPassiveEffects会在何时赋值呢？

在上一节layout之后的代码片段中会根据rootDoesHavePassiveEffects === true?决定是否赋值rootWithPendingPassiveEffects。

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
}
```

**所以整个useEffect异步调用分为三步**：

* `before mutation`阶段在`scheduleCallback`中调度`flushPassiveEffects`
* `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
* `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`

 为什么需要异步调用

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

可见，useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染。

 mutation阶段

终于到了执行DOM操作的mutation阶段。

 概览

类似before mutation阶段，mutation阶段也是遍历effectList，执行函数。这里执行的是commitMutationEffects。

```ts
nextEffect = firstEffect
do {
  try {
    commitMutationEffects(root, renderPriorityLevel)
  } catch (error) {
    invariant(nextEffect !== null, 'Should be working on an effect.')
    captureCommitPhaseError(nextEffect, error)
    nextEffect = nextEffect.nextEffect
  }
} while (nextEffect !== null)
```

 commitMutationEffects

代码如下：

```ts
function commitMutationEffects (root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect)
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate
      if (current !== null) {
        commitDetachRef(current)
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
 effectTag & (Placement | Update | Deletion | Hydrating)
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect)
        nextEffect.effectTag &= ~Placement
        break
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect)

        nextEffect.effectTag &= ~Placement

        // 更新
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating
        break
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating

        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel)
        break
      }
    }

    nextEffect = nextEffect.nextEffect
  }
}
```

commitMutationEffects会遍历effectList，对每个Fiber节点执行如下三个操作：

* 根据ContentReset effectTag重置文字节点
* 更新ref
* 根据effectTag分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)

我们关注步骤三中的`Placement | Update | Deletion`。Hydrating作为服务端渲染相关，我们先不关注。

 Placement effect

当Fiber节点含有Placement effectTag，意味着该Fiber节点对应的DOM节点需要插入到页面中。

调用的方法为commitPlacement。

该方法所做的工作分为三步：

1. 获取父级DOM节点。其中finishedWork为传入的Fiber节点。

```ts
const parentFiber = getHostParentFiber(finishedWork)
// 父级DOM节点
const parentStateNode = parentFiber.stateNode
```

2. 获取Fiber节点的DOM兄弟节点

```ts
获取Fiber节点的DOM兄弟节点
```

3. 根据DOM兄弟节点是否存在决定调用parentNode.insertBefore或parentNode.appendChild执行DOM插入操作。

```ts
// parentStateNode是否是rootFiber
if (isContainer) {
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent)
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent)
}
```

值得注意的是，getHostSibling（获取兄弟DOM节点）的执行很耗时，当在同一个父Fiber节点下依次执行多个插入操作，getHostSibling算法的复杂度为指数级。

这是由于Fiber节点不只包括HostComponent，所以Fiber树和渲染的DOM树节点并不是一一对应的。要从Fiber节点找到DOM节点很可能跨层级遍历。

```tsx
function Item() {
 return <li><li>;
}

function App() {
 return (
 <div>
 <Item/>
 </div>
 )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

对应的Fiber树和DOM树结构为：

```
// Fiber树
 child child child child
rootFiber -----> App -----> div -----> Item -----> li

// DOM树
#root ---> div ---> li
```

当在div的子节点Item前插入一个新节点p，即App变为：

```tsx
function App () {
  return (
 <div>
 <p></p>
 <Item/>
 </div>
  )
}
```

对应的Fiber树和DOM树结构为：

```
// Fiber树
 child child child
rootFiber -----> App -----> div -----> p 
 | sibling child
 | -------> Item -----> li 
// DOM树
#root ---> div ---> p
 |
 ---> li
```

此时DOM节点 p的兄弟节点为li，而Fiber节点 p对应的兄弟DOM节点为： `fiberP.sibling.child`

即fiber p的兄弟fiber Item的子fiber li

 Update effect

当Fiber节点含有Update effectTag，意味着该Fiber节点需要更新。调用的方法为commitWork，他会根据Fiber.tag分别处理。

这里我们主要关注FunctionComponent和HostComponent。

 FunctionComponent mutation

当fiber.tag为FunctionComponent，会调用commitHookEffectListUnmount。该方法会遍历effectList，执行所有useLayoutEffect hook的销毁函数。

所谓“销毁函数”，见如下例子

```ts
useLayoutEffect(() => {
  // ...一些副作用逻辑

  return () => {
    // ...这就是销毁函数
  }
})
```

你不需要很了解useLayoutEffect，我们会在下一节详细介绍。你只需要知道在mutation阶段会执行useLayoutEffect的销毁函数。

 HostComponent mutation

当fiber.tag为HostComponent，会调用commitUpdate。

最终会在updateDOMProperties (opens new window)中将render阶段 completeWork (opens new window)中为Fiber节点赋值的updateQueue对应的内容渲染在页面上。

```ts
for (let i = 0; i < updatePayload.length; i += 2) {
  const propKey = updatePayload[i]
  const propValue = updatePayload[i + 1]

  // 处理 style
  if (propKey === STYLE) {
    setValueForStyles(domElement, propValue)
    // 处理 DANGEROUSLY_SET_INNER_HTML
  } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    setInnerHTML(domElement, propValue)
    // 处理 children
  } else if (propKey === CHILDREN) {
    setTextContent(domElement, propValue)
  } else {
    // 处理剩余 props
    setValueForProperty(domElement, propKey, propValue, isCustomComponentTag)
  }
}
```

 Deletion effect

当Fiber节点含有Deletion effectTag，意味着该Fiber节点对应的DOM节点需要从页面中删除。调用的方法为commitDeletion。

该方法会执行如下操作：

* 递归调用Fiber节点及其子孙Fiber节点中fiber.tag为ClassComponent的componentWillUnmount (opens new window)生命周期钩子，从页面移除Fiber节点对应DOM节点
* 解绑ref
* 调度useEffect的销毁函数

 layout阶段

该阶段之所以称为layout，因为该阶段的代码都是在DOM渲染完成（mutation阶段完成）后执行的。

该阶段触发的生命周期钩子和hook可以直接访问到已经改变后的DOM，即该阶段是可以参与DOM layout的阶段。

与前两个阶段类似，layout阶段也是遍历effectList，执行函数。

具体执行的函数是commitLayoutEffects。

 commitLayoutEffects

commitLayoutEffects一共做了两件事：

1. commitLayoutEffectOnFiber（调用生命周期钩子和hook相关操作）

2. commitAttachRef（赋值 ref）

 commitLayoutEffectOnFiber

commitLayoutEffectOnFiber方法会根据fiber.tag对不同类型的节点分别处理。

* 对于ClassComponent，他会通过current === null?区分是mount还是update，调用componentDidMount (opens new window)或componentDidUpdate

触发状态更新的this.setState如果赋值了第二个参数回调函数，也会在此时调用。

* 对于FunctionComponent及相关类型，他会调用useLayoutEffect hook的回调函数，调度useEffect的销毁与回调函数

相关类型指特殊处理后的FunctionComponent，比如ForwardRef、React.memo包裹的FunctionComponent

mutation阶段会执行useLayoutEffect hook的销毁函数。

结合这里我们可以发现，useLayoutEffect hook从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的。

而useEffect则需要先调度，在Layout阶段完成后再异步执行。

这就是useLayoutEffect与useEffect的区别。

* 对于HostRoot，即rootFiber，如果赋值了第三个参数回调函数，也会在此时调用。

 commitAttachRef

commitLayoutEffects会做的第二件事是commitAttachRef。

代码逻辑很简单：获取DOM实例，更新ref。

 current Fiber树切换

至此，整个layout阶段就结束了。

## React15 架构存在什么样的问题？ {#p2-react-15}

React15 架构可以分为两层：

* Reconciler（协调器）—— 负责找出变化的组件
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上

 Reconciler（协调器）

我们知道，在React中可以通过 `this.setState、this.forceUpdate、ReactDOM.render` 等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

* 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
* 将虚拟DOM和上次更新时的虚拟DOM对比
* 通过对比找出本次更新中变化的虚拟DOM
* 通知Renderer将变化的虚拟DOM渲染到页面上

 Renderer（渲染器）

由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— `ReactDOM`

除此之外，还有：

* ReactNative 渲染器，渲染App原生组件
* ReactTest 渲染器，渲染出纯Js对象用于测试
* ReactArt 渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，Renderer接到 `Reconciler` 通知，将变化的组件渲染在当前宿主环境。

 React15 架构的缺点

**react15 是通过递归去更新组件的**

在 Reconciler 中，mount的组件会调用 mountComponent (opens new window)，update 的组件会调用 updateComponent (opens new window)。这两个方法都会递归更新子组件。

**由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。**

本质上说是因为 递归 的架构， 是不允许中断的， 因为 react 希望有更好的渲染性能，那么面对大规模 dom diff 更新渲染的时候， 就不能让每一递归时间超过 16 ms。
递归是做不到这个功能的。 所以只有重写 react15 架构。引入了 react16 fiber 架构。

## react 16 {#p2-react-16}

React16架构可以分为三层：

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
Reconciler（协调器）—— 负责找出变化的组件
Renderer（渲染器）—— 负责将变化的组件渲染到页面上
可以看到，相较于React15，React16中新增了Scheduler（调度器）。

 Scheduler（调度器）

以浏览器是否有剩余时间作为任务中断的标准，那么**需要一种机制，当浏览器有剩余时间时通知我们**。

其实部分浏览器已经实现了这个API，这就是 `requestIdleCallback` (opens new window)。但是由于以下因素，React放弃使用：

* 浏览器兼容性
* 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的 `requestIdleCallback` 触发的频率会变得很低

基于以上原因，React实现了功能更完备的 `requestIdleCallback polyfill`，这就是`Scheduler`。除了在空闲时触发回调的功能外，`Scheduler` 还提供了多种调度优先级供任务设置。

Scheduler (opens new window) 是独立于React的库

 Reconciler（协调器）

在 React15 中 `Reconciler` 是递归处理虚拟DOM的

在 React16 中更新工作从递归变成了可以中断的循环过程。每次循环都会调用 `shouldYield` 判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent () {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress)
  }
}
```

**那么React16是如何解决中断更新时DOM渲染不完全的问题呢？**

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记；

全部标记可以见这里： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)

整个Scheduler与 Reconciler 的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

可以看这里 react16 对 Reconciler 的解释：[资料](https://zh-hans.legacy.reactjs.org/docs/codebase-overview.html#fiber-reconciler)

Reconciler 内部采用了 `Fiber` 的架构。

 Renderer（渲染器）

Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

 参考资料

* [资料](https://react.iamkasong.com/preparation/newConstructure.html#react16%E6%9E%B6%E6%9E%84)

```js
``

## 320 [React] React Reconciler 为何要采用 fiber 架构？【热度: 1,794】

* created_at: 2023-04-27T15:37:45Z
* updated_at: 2023-04-27T15:37:45Z
* labels: web框架
* milestone: 资深

**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

 代数效应的实践

React中做的就是践行代数效应（Algebraic Effects）。

简单点儿来说就是： **用于将副作用从函数调用中分离。**

举例子：
比如我们要获取用户的姓名做展示：

```js
const resource = fetchProfileData()

function ProfileDetails () {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read()
  return <h1>{user.name}</h1>
}
```

代码如上， 但是 resource 是通过异步获取的。 这个时候代码就要改为下面这种形式

```js
const resource = fetchProfileData()

async function ProfileDetails () {
  // Try to read user info, although it might not have loaded yet
  const user = await resource.user.read()
  return <h1>{user.name}</h1>
}
```

但是 async/await 是具有传染性的。 这个穿践行就是副作用， 我们不希望有这样的副作用， 尽管里面有异步调用， 不希望这样的副作用传递给外部的函数， 只希望外部的函数是一个纯函数。

 代数效应在React中的应用

在 react 代码中， 每一个函数式组件， 其实都是一个纯函数， 但是内部里面可能会有各种各样的副作用。 这些副作用就是我们使用的 hooks;

对于类似useState、useReducer、useRef这样的Hook，我们不需要关注FunctionComponent的state在Hook中是如何保存的，React会为我们处理。

我们只需要假设useState返回的是我们想要的state，并编写业务逻辑就行。

可以看官方的 Suspense demo, 可以是通过 Suspense 让内部直接可以同步的方式调用异步代码；
代码链接： [资料](https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/index.js:152-160)

```jsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { fetchProfileData } from "./fakeApi";

const resource = fetchProfileData();

function ProfilePage() {
 return (
 <Suspense
 fallback={<h1>Loading profile...</h1>}
 >
 <ProfileDetails />
 <Suspense
 fallback={<h1>Loading posts...</h1>}
 >
 <ProfileTimeline />
 </Suspense>
 </Suspense>
 );
}

function ProfileDetails() {
 // Try to read user info, although it might not have loaded yet
 const user = resource.user.read();
 return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
 // Try to read posts, although they might not have loaded yet
 const posts = resource.posts.read();
 return (
 <ul>
 {posts.map(post => (
 <li key={post.id}>{post.text}</li>
 ))}
 </ul>
 );
}

const rootElement = document.getElementById(
 "root"
);
ReactDOM.createRoot(rootElement).render(
 <ProfilePage />
);
```

 Generator 架构

从React15到React16，协调器（Reconciler）重构的一大目的是：将老的同步更新的架构变为异步可中断更新。

异步可中断更新可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

其实，浏览器原生就支持类似的实现，这就是Generator。

但是Generator的一些缺陷使React团队放弃了他：

* 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重。
* Generator执行的中间状态是上下文关联的。

例如这样的例子：

```js
function * doWork (A, B, C) {
  const x = doExpensiveWorkA(A)
  yield
  const y = x + doExpensiveWorkB(B)
  yield
  const z = y + doExpensiveWorkC(C)
  return z
}
```

但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成doExpensiveWorkA与doExpensiveWorkB计算出x与y。

此时B组件接收到一个高优更新，由于Generator执行的中间状态是上下文关联的，所以计算y时无法复用之前已经计算出的x，需要重新计算。

如果通过全局变量保存之前执行的中间状态，又会引入新的复杂度。

 fiber 架构

他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为React Element对应的Fiber节点。

## 是如何实现页面的快速响应？ {#p1-how-wrol}

react 是如何实现快速响应的？

我们日常使用App，浏览网页时，有两类场景会制约快速响应：

当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。

发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

这两类场景可以概括为：

* CPU的瓶颈
* IO的瓶颈

 CPU的瓶颈

**主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。**

我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。

在每16.6ms时间内，需要完成如下工作： `JS脚本执行 ----- 样式布局 ----- 样式绘制`

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。

比如我们可以通过一个循环， 渲染列表 3000 个组件， 那么这种渲染时间， 就肯定是远超过 16.6 ms 的， 页面就会感觉到卡顿。

如何解决这个问题呢？

**答案是：在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（可以看到，在源码中，预留的初始时间是5ms）。**
源码位置： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)

当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）

**所以，解决CPU瓶颈的关键是实现时间切片，而时间切片的关键是：将同步的更新变为可中断的异步更新。**

 IO的瓶颈

网络延迟是前端开发者无法解决的。如何在网络延迟客观存在的情况下，减少用户对网络延迟的感知？

简单点儿来说， 就是在点击页面跳转的是时候提前去加载下一个页面的内容。 或者在当前页面 hold .5s 左右时间， 利用这个时间去加载下一个页面的内容。
从而达到下一个页面的快速交互

React实现了 `Suspense` 功能及配套的 hook——`useDeferredValue`。

而在源码内部，为了支持这些特性，**同样需要将同步的更新变为可中断的异步更新。**

## 如何监听路由变化？ {#p0-router-change}

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

## React 18 的新特性有哪些 {#react-18}

批量处理是指 React 将多个状态更新分组到一个重新渲染中，以获得更好的性能。如果没有自动批量处理，我们只对 React 事件处理程序中的更新进行批量处理。默认情况下，React 不会对
Promise、setTimeout、原生事件处理程序或任何其它事件中的更新进行批量处理。有了自动批量处理，这些更新将被自动的批量处理。

```typescript jsx
// 之前：只对 React 事件执行批量处理
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 将渲染两次，每次状态更新一次（无批量处理）
}, 1000)

// 之后：超时、Promises、本机事件处理程序
// 或任何其他事件内的更新是批处理的。

setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 只会在最终重新渲染一次（这就是批量处理！）
}, 1000)
```

 新功能：过渡

过渡是 React 中的一个新概念，用以区分紧急和非紧急更新。

* 紧急更新 反映了直接的交互，如输入、点击、按压等。
* 过渡更新 将 UI 从一个视图过渡到另一个。

像输入、点击或按压这样的紧急更新，需要立即响应，以符合我们对物理对象行为方式的直觉。否则他们就会感到“不对劲儿”。然而，过渡是不同的，因为用户并不期望在屏幕上看到每个中间值。

例如，当你在一个下拉菜单中选择一个过滤器时，你希望过滤器按钮本身在你点击时能立即做出反应。然而，实际结果可能会单独过渡。一个小的延迟将是难以察觉的，而且往往是预期的。并且，如果你在结果渲染完成之前再次改变过滤器，你只关心看到最新的结果。

通常情况下，为了获得最佳的用户体验，一个用户输入应该同时导致一个紧急更新和一个非紧急更新。你可以在输入事件中使用 startTransition API 来告知 React 哪些是紧急更新，哪些是“过渡”：

```typescript jsx
import { startTransition } from 'react'

// 紧急：显示输入的内容
setInputValue(input)

// 将内部的任何状态更新都标记为过渡
startTransition(() => {
  // 过渡：显示结果
  setSearchQuery(input)
})
```

被 startTransition 包裹的更新被当作非紧急事件处理，如有更紧急更新，如点击或按键，则会被中断。如果一个过渡被用户中断（例如，连续输入多个字符），React 会丢弃未完成的无效的渲染，而只渲染最新的更新。

* useTransition：一个启动过渡的 Hook，包括一个值以跟踪待定状态。
* startTransition：当 Hook 不能使用时，一个启动过渡的方法。

过渡将选择并发渲染，这允许更新被中断。如果内容重新挂起，过渡也会告诉 React 继续显示当前内容，同时在后台渲染过渡内容。

 新的 Suspense 特性

如果组件树的某一部分还没有准备好被显示，Suspense 可以让你声明式地指定加载状态：

```typescript jsx
<Suspense fallback={<Spinner />}>
 <Comments />
</Suspense>
```

Suspense 使“UI 加载状态”成为 React 编程模型中的第一类声明式概念。这让我们可以在它上面建立更高层次的功能。

几年前，我们推出了一个有限的 Suspense 版本。然而，唯一支持的用例是用 React.lazy 拆分代码，且在服务端渲染时根本不支持。

在 React 18 中，我们增加了对服务端的 Suspense 支持，并使用并发渲染特性扩展了其功能。

React 18 中的 Suspense 在与过渡 API 结合时效果最好。如果你在过渡期间挂起，React 将防止已经可见的内容被回退取代。相反，React 会延迟渲染，直到有足够的数据加载，以防止出现糟糕的加载状态。

 新的客户端、服务端渲染 API

在这个版本中，我们借此机会重新设计了我们为在客户端和服务端渲染所暴露的 API。这些更改允许用户在升级到 React 18 中的新 API 时继续使用 React 17 模式下的旧 API。

**React DOM Client**

这些新的 API 现在从 react-dom/client 导出：

* createRoot：新的创建根的方法，以进行 render 或 unmount。使用它替代 ReactDOM.render。没有它，React 18 的新功能就不能工作。
* hydrateRoot：新的方法用以创建服务端渲染应用。使用它替代 ReactDOM.hydrate 与新的 React DOM 服务端 API 一起使用。没有它，React 18 的新功能就不能工作。

createRoot 和 hydrateRoot 都接受一个新的选项，叫做 onRecoverableError，以防你想在 React render 或 hydrate 从错误恢复时得到通知，以便记录。默认情况下，React会使用
reportError，或在较旧的浏览器中使用 console.error。

**React DOM Server**

这些新的 API 现在从 react-dom/server 导出，并且完全支持服务端的流式 Suspense：

* renderToPipeableStream：用于 Node 环境下的 Stream。
* renderToReadableStream：用于现代边缘运行环境，如 Deno 和 Cloudflare workers。

现有的 renderToString 方法仍然可用，但不鼓励使用。

 新的严格模式行为

在未来，我们希望增加一个功能，允许 React 在保留状态的同时增加和删除部分的 UI。例如，当用户从一个屏幕切出并切回时，React 应该能够立即显示之前的屏幕。要做到这一点，React 将使用与之前相同的组件状态来卸载和重新装载树。

这个功能将给 React 应用带来更好的开箱即用的性能，但需要组件对 effect 被多次装载和销毁具有弹性。大多数 effect 会正常工作而无需任何更改，但有些 effect 假设它们只被装载或销毁一次。

为了帮助浮现这些问题，React 18 为严格模式引入了一个新的仅用于开发的检查。每当组件第一次装载时，此检查将自动卸载并重新装载每个组件，并在第二次装载时恢复先前的状态。

在这个变化之前，React 会装载组件并创建 effect：

```
* React 装载组件
layout effect 创建
effect 创建
```

在 React 18 的严格模式下，React 会在开发模式下模拟卸载和重新装载组件：

```
* React 装载组件
layout effect 创建
effect 创建
* React 模拟卸载组件
layout effect 销毁
effect 销毁
* React 模拟装载组件（使用之前的状态）
layout effect 创建
effect 创建
```

 新的 Hook

**useId**

useId 是一个新的 Hook，用于在客户端和服务端上生成唯一 ID，避免 hydrate 不匹配。它主要用于组件库，这些库集成了需要唯一 ID 的可访问性 API。这解决了 React 17 及更低版本中已经存在的问题，但在 React
18 中更为重要，因为新的流式服务端渲染器对 HTML 的无序交付方式。

**useTransition**

useTransition 和 startTransition 让你把一些状态更新标记为不紧急。其他状态更新在默认情况下被认为是紧急的。React
将允许紧急的状态更新（例如，更新一个文本输入）中断非紧急的状态更新（例如，渲染一个搜索结果列表）。

**useDeferredValue**

useDeferredValue 让你推迟重新渲染树的非紧急部分。它类似于 debounce，但与之相比有一些优势。它没有固定的时间延迟，React 会在第一次渲染反映在屏幕后立即尝试延迟渲染。延迟渲染是可中断的，它不会阻塞用户输入。

**useSyncExternalStore**

useSyncExternalStore 是一个新的 Hook，它允许外部存储支持并发读取，通过强制更新到 store 以同步。在实现对外部数据源的订阅时，它消除了对 useEffect 的需求，并被推荐给任何与 React
外部状态集成的库。

**useInsertionEffect**

useInsertionEffect 是一个新的 Hook ，允许 CSS-in-JS 库解决在渲染中注入样式的性能问题。除非你已经建立了一个 CSS-in-JS 库，否则我们不希望你使用它。这个 Hook 将在 DOM 被变更后运行，但在
layout effect 读取新布局之前。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更加重要，因为 React 在并发渲染时向浏览器让步，给它一个重新计算布局的机会。

 Concurrent Mode（并发模式）

Concurrent Mode（以下简称 CM）翻译叫并发模式，这个概念我们或许已经听过很多次了，实际上，在去年这个概念已经很成熟了，在 React 17 中就可以通过一些试验性的api开启 CM。

并发模式可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复阻塞渲染限制。在 Concurrent 模式中，React 可以同时更新多个状态。

说的太复杂可能有点拗口，总结一句话就是：**React 17 和 React 18 的区别就是：从同步不可中断更新变成了异步可中断更新。**

为了更好的管理root节点，React 18 引入了一个新的 root API，新的 root API 还支持 new concurrent renderer（并发模式的渲染），它允许你进入concurrent mode（并发模式）。

```jsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.createRoot(root).render(<App />);
```

在 React 18 中，提供了新的 root api，我们只需要把 render 升级成 `createRoot(root).render(<App />)` 就可以开启并发模式了。

那么这个时候，可能有同学会提问：开启并发模式就是开启了并发更新么？

NO！ 在 React 17 中一些实验性功能里面，开启并发模式就是开启了并发更新，但是在 React 18 正式版发布后，由于官方策略调整，React 不再依赖并发模式开启并发更新了。

换句话说：**开启了并发模式，并不一定开启了并发更新！**

一句话总结：**在 18 中，不再有多种模式，而是以是否使用并发特性作为是否开启并发更新的依据。**

可以从架构角度来概括下，当前一共有两种架构：

* 采用不可中断的递归方式更新的 `Stack Reconciler`（老架构）
* 采用可中断的遍历方式更新的 `Fiber Reconciler`（新架构）

新架构可以选择是否开启并发更新，所以当前市面上所有 React 版本有四种情况：

* 老架构（v15及之前版本）
* 新架构，未开启并发更新，与情况1行为一致（v16、v17 默认属于这种情况）
* 新架构，未开启并发更新，但是启用了并发模式和一些新功能（比如 Automatic Batching，v18 默认属于这种情况）
* 新架构，开启并发模式，开启并发更新

**并发特性指开启并发模式后才能使用的特性**，比如：

* useDeferredValue
* useTransition

![1](https://foruda.gitee.com/images/1682007325938364918/c6174e9f_7819612.png)

 startTransition 并发特性举例

这个新的 API 可以通过将特定更新标记为“过渡”来显著改善用户交互，简单来说，就是被 startTransition 回调包裹的 setState 触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占。

```tsx
import React, { useState, useEffect, useTransition } from 'react'

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null))
    })
  }, [])
  return (
 <>
 {list.map((_, i) => (
 <div key={i}>{i}</div>
 ))}
 </>
  )
}

export default App
```

 useDeferredValue 并发特性举例

从介绍上来看 useDeferredValue 与 useTransition 是否感觉很相似呢？

相同：useDeferredValue 本质上和内部实现与 useTransition 一样，都是标记成了延迟更新任务。 不同：useTransition 是把更新任务变成了延迟更新任务，而 useDeferredValue
是产生一个新的值，这个值作为延时状态。（一个用来包装方法，一个用来包装值）

所以，上面 startTransition 的例子，我们也可以用 useDeferredValue 来实现：

```jsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
 const [list, setList] = useState < any[] > ([]);
 useEffect(() => {
 setList(new Array(10000).fill(null));
 }, []);
 // 使用了并发特性，开启并发更新
 const deferredList = useDeferredValue(list);
 return (
 <>
 {deferredList.map((_, i) => (
 <div key={i}>{i}</div>
 ))}
 </>
 );
};

export default App;
```

此时我们的任务被拆分到每一帧不同的 task 中，JS脚本执行时间大体在5ms左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。

 setState 自动批处理

React 18 通过在默认情况下执行批处理来实现了开箱即用的性能改进。

批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合并成一次更新（在视图层，将多个渲染合并成一次渲染）。

 在 React 18 之前：有一些情况下并不会合并更新

在React 18 之前，我们只在 React 事件处理函数 中进行批处理更新。默认情况下，在 `promise、setTimeout、原生事件处理函数中`、或任`何其它事件内`的更新都不会进行批处理：

**情况一：React 事件处理函数**

下面的代码就会批量处理，只会渲染一次页面

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <button
 onClick={() => {
 setCount1(count => count + 1);
 setCount2(count => count + 1);
 // 在React事件中被批处理
 }}
 >
 {`count1 is ${count1}, count2 is ${count2}`}
 </button>
 );
};

export default App;
```

**情况二：setTimeout**

如果我们把状态的更新放在`promise`或者`setTimeout`里面， 组件都会渲染两次，不会进行批量更新。

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <div
 onClick={() => {
 setTimeout(() => {
 setCount1(count => count + 1);
 setCount2(count => count + 1);
 });
 // 在 setTimeout 中不会进行批处理
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
 );
};

export default App;
```

**情况三：原生js事件**

在原生js事件中，结果跟情况二是一样的，每次点击更新两个状态，组件都会渲染两次，不会进行批量更新。

```tsx
import React, { useEffect, useState } from 'react'

// React 18 之前
const App: React.FC = () => {
  console.log('App组件渲染了！')
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  useEffect(() => {
    document.body.addEventListener('click', () => {
      setCount1(count => count + 1)
      setCount2(count => count + 1)
    })
    // 在原生js事件中不会进行批处理
  }, [])
  return (
 <>
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </>
  )
}

export default App
```

 在 React 18 中: 合并更新

在 React 18 上面的三个例子只会有一次 render，因为所有的更新都将自动批处理。这样无疑是很好的提高了应用的整体性能。

不过以下例子会在 React 18 中执行两次 render：

```tsx
import React, { useState } from 'react'

// React 18
const App: React.FC = () => {
  console.log('App组件渲染了！')
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  return (
 <div
 onClick={async () => {
   await setCount1(count => count + 1)
   setCount2(count => count + 1)
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
  )
}

export default App
```

总结：

* 在 18 之前，只有在react事件处理函数中，才会自动执行批处理，其它情况会多次更新
* 在 18 之后，任何情况都会自动执行批处理，多次更新始终合并为一次

 flushSync

批处理是一个破坏性改动，如果你想退出批量更新，你可以使用 flushSync：

```tsx
import React, { useState } from 'react'
import { flushSync } from 'react-dom'

const App: React.FC = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  return (
 <div
 onClick={() => {
   flushSync(() => {
     setCount1(count => count + 1)
   })
   // 第一次更新
   flushSync(() => {
     setCount2(count => count + 1)
   })
 // 第二次更新
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
  )
}

export default App
```

 其他

 Suspense 不再需要 fallback 来捕获

空的 fallback 属性的处理方式做了改变：不再跳过 缺失值 或 值为null 的 fallback 的 Suspense 边界。

**更新前**

以前，如果你的 Suspense 组件没有提供 fallback 属性，React 就会悄悄跳过它，继续向上搜索下一个边界：

```jsx
// React 17
const App = () => {
 return (
 <Suspense fallback={<Loading />}>
 <Suspense>
 <Page />
 </Suspense>
 </Suspense>
 );
};

export default App;
```

**更新后**

现在，React将使用当前组件的 Suspense 作为边界，即使当前组件的 Suspense 的值为 null 或 undefined：

```jsx
// React 18
const App = () => {
 return (
 <Suspense fallback={<Loading />}> 
 <Suspense>
 <Page />
 </Suspense>
 </Suspense>
 );
};

export default App;
```

 关于 React 组件的返回值

* 在 React 17 中，如果你需要返回一个空组件，React只允许返回null。如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。
* 在 React 18 中，不再检查因返回 undefined 而导致崩溃。既能返回 null，也能返回 undefined（但是 React 18 的dts文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。

 结论

* 并发更新的意义就是交替执行不同的任务，当预留的时间不够用时，React 将线程控制权交还给浏览器，等待下一帧时间到来，然后继续被中断的工作
* 并发模式是实现并发更新的基本前提
* 时间切片是实现并发更新的具体手段

 参考文档

* [资料](https://zh-hans.legacy.reactjs.org/blog/2022/03/29/react-v18.html)
* [资料](https://juejin.cn/post/7094037148088664078)
* [资料](https://juejin.cn/post/7027995169211285512)

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

## 为什么不能在循环、条件或嵌套函数中调用 Hooks？{#p0-call-in-statement}

如果在条件语句中使用hooks，React会抛出 error。

这与React Hooks的底层设计的数据结构相关，先抛出结论：**react用链表来严格保证hooks的顺序**。

一个典型的useState使用场景：

```js
const [name, setName] = useState('leo')

setName('Lily')
```

那么hooks在这两条语句分别作了什么？

![](https://pic.rmb.bdstatic.com/bjh/89d2fa7124b06495bbbfd4b5758bd6e5.png)

上图是 `useState` 首次渲染的路径，其中，跟我们问题相关的是 `mountState` 这个过程，简而言之，这个过程初始化了一个hooks，并且将其追加到链表结尾。

```tsx
// 进入 mounState 逻辑

function mountState(initialState) {

 // 将新的 hook 对象追加进链表尾部
 var hook = mountWorkInProgressHook();

 // initialState 可以是一个回调，若是回调，则取回调执行后的值

 if (typeof initialState === 'function') {

 // $FlowFixMe: Flow doesn't like mixed types

 initialState = initialState();
 }

 // 创建当前 hook 对象的更新队列，这一步主要是为了能够依序保留 dispatch

 const queue = hook.queue = {

 last: null,

 dispatch: null,

 lastRenderedReducer: basicStateReducer,

 lastRenderedState: (initialState: any),

 };

 // 将 initialState 作为一个“记忆值”存下来

 hook.memoizedState = hook.baseState = initialState;

 // dispatch 是由上下文中一个叫 dispatchAction 的方法创建的，这里不必纠结这个方法具体做了什么

 var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);

 // 返回目标数组，dispatch 其实就是示例中常常见到的 setXXX 这个函数，想不到吧？哈哈

 return [hook.memoizedState, dispatch];
}
```

从这段源码中我们可以看出，mounState 的主要工作是初始化 Hooks。在整段源码中，最需要关注的是 `mountWorkInProgressHook` 方法，它为我们道出了 Hooks 背后的数据结构组织形式。以下是 `mountWorkInProgressHook` 方法的源码：

```js
function mountWorkInProgressHook () {

  // 注意，单个 hook 是以对象的形式存在的
  const hook = {

    memoizedState: null,

    baseState: null,

    baseQueue: null,

    queue: null,

    next: null

  }

  if (workInProgressHook === null) {
    // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
    firstWorkInProgressHook = workInProgressHook = hook
  } else {
    // 若链表不为空，则将 hook 追加到链表尾部
    workInProgressHook = workInProgressHook.next = hook
  }
  // 返回当前的 hook
  return workInProgressHook
}
```

到这里可以看出，hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式相互串联。

接着，我们来看更新过程

![](https://pic.rmb.bdstatic.com/bjh/1cc5bd4c72e4f22d1aa828df3c831f2d.png)

上图中，需要注意的是updateState的过程：按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染。

我们把 mountState 和 updateState 做的事情放在一起来看：mountState（首次渲染）构建链表并渲染；updateState 依次遍历链表并渲染。

hooks 的渲染是通过“依次遍历”来定位每个 hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的。

这个现象有点像我们构建了一个长度确定的数组，数组中的每个坑位都对应着一块确切的信息，后续每次从数组里取值的时候，只能够通过索引（也就是位置）来定位数据。也正因为如此，在许多文章里，都会直截了当地下这样的定义：Hooks 的本质就是数组。但读完这一课时的内容你就会知道，Hooks 的本质其实是链表。

我们举个例子：

```tsx
 let mounted = false;

if(!mounted){
 // eslint-disable-next-line
 const [name,setName] = useState('leo');
 const [age,setAge] = useState(18);
 mounted = true;
}
const [career,setCareer] = useState('码农');
console.log('career',career);

......

<div onClick={()=>setName('Lily')}>
 点我点我点我
<div>
```

点击div后，我们期望的输出是 "码农"，然而事实上(尽管会error，但是打印还是执行)打印的为 "Lily"

原因是，三个useState在初始化的时候已经构建好了一个三个节点的链表结构，依次为： `name('leo') --> age(18) --> career('码农')`

每个节点都已经派发了一个与之对应的update操作，因此执行setName时候，三个节点就修改为了 `name('Lily') --> age(18) --> career('码农')`

然后执行update渲染操作，从链表依次取出值，此时，条件语句的不再执行，第一个取值操作会从链表的第一个，也就是name对应的hooks对象进行取值：此时取到的为 `name:Lily`

必须按照顺序调用从根本上来说是因为 useState 这个钩子在设计层面并没有“状态命名”这个动作，也就是说你每生成一个新的状态，React 并不知道这个状态名字叫啥，所以需要通过顺序来索引到对应的状态值

## 虚拟DOM 一定会比直接操作 真实 DOM 快吗 {#p0-vdom}

大家惯有的思维模式下，我们普遍的认为，虚拟DOM一定会比原生DOM要快的多。

但实际上并不是这样。

**仅从React的角度来说 : React的官网可从来都没有说过虚拟DOM会比原生操作DOM更快。**

虚拟DOM和原生操作DOM谁更快这个问题。如果要我来回答的话，**一定是原生DOM比虚拟DOM更快性能更好。**

值得注意的是，**虚拟DOM并不是比原生DOM快，更确切的来说，虚拟DOM是比操作不当的原生DOM快**。实际上，如果对原生DOM的操作得当的话，原生DOM的性能一定优于虚拟DOM。

我们来剖析一下。

 虚拟DOM为什么而存在

**其最核心的思想是提升开发效率而非提升性能**

使用 React/Vue 这些框架的时候，我们不需要去考虑对DOM的操作，只需要关心数据的改变。我们以前还在使用JQ的时候，数据改变之后我们需要调用`$("#id").append(node)`等操作去手动追加DOM。而在使用React/Vue之后，我们只需要关心数据的改变。至于对DOM的一系列动作，在我们的数据改变之后，React/Vue会为我们代劳。这极大程度的提升了我们的开发效率。也是React/Vue的核心思想和初衷。

至于很多人都说，虚拟DOM会比操作原生DOM更快，这个说法并不全面。比如，**首次渲染或者所有节点都需要进行更新的时候。这个时候采用虚拟DOM会比直接操作原生DOM多一重构建虚拟DOM树的操作。这会更大的占用内存和延长渲染时间。**

 举个例子

**首次渲染👇不采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建所有节点

**首次渲染👇采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建虚拟DOM
3. 创建所有节点

不难发现，在首次渲染的时候，采用虚拟DOM会比不采用虚拟DOM要多一个**创建虚拟DOM**的步骤。

> 注意:虚拟DOM的存在，并不是免费的，比对新旧虚拟DOM树的差异会带来一定的性能开销。

**虚拟DOM的优势在于我们更新节点时候。它会检查哪些节点需要更新。尽量复用已有DOM，减少DOM的删除和重新创建。并且这些操作我们是可以通过自己手动操作javascript底层api实现的。只是我们手动操作会非常耗费我们的时间和精力。这个工作由虚拟DOM代劳，会让我们开发更快速便捷。**

 举个例子👇

在采用虚拟DOM的前提下

假设我们有节点A，下辖两个子节点B/C.

然后我们删除了节点C

这个时候会有两棵虚拟DOM树，

一颗是修改前的，A->B/C。

另一颗是修改后的A->B。

`diff算法会去比对两颗树的差异`，然后发现A->B没有更改，那么A->B节点保留，C节点执行删除动作。

那么，A->B两个节点的删除和创建渲染操作就被省略了。

如果不采用虚拟DOM的话。使用JQ那时候的模板.

我们可能会把A->B/C三个节点全部删除.

再全都重新创建。而A->B是完全没有改动的。

他们的删除和创建则完全不必要。

 框架的意义

我们需要知道:不论是React还是Vue或者是Angular。这些框架本身，都是基于原生的基础上创造的。它们，底层依赖的还是javascript，并不是一门新的语言。在他们的底层逻辑下。我们使用框架所做出的一切行为，都会被框架转化为对原生DOM的操作。**框架，只是一个转化语法的工具。**

既然原生DOM可以创造出这些框架。当然我们使用原生DOM自然是可以写出比这些框架更好的性能。

但是:为什么对原生DOM进行操作的性能明明可以比使用框架更好。为什么大家都在使用框架，而没有人去直接对原生DOM进行操作。

这背后涉及`成本`和`普适性`。

如果我们直接去操作真实DOM,当然，我们可以做到在性能上比虚拟DOM更快。但问题是，技术水准能做到这个地步的人，又有多少人呢。不说比虚拟DOM快。即使是做到和虚拟DOM不分上下的性能，拥有这种水平的前端玩家，也是寥寥无几。**基于这样的客观情况下，框架的出现解决了这个问题。**

框架存在的意义 : 在为我们提供只需要关注数据的前提下。框架本身已经做好了底层原理上的性能优化（包括但不限于,对DOM的调用,算法上的优化）已经是高度封装。这样就可以让我们使用一些简单的较为容易理解的技术去做我们原本做不到的事情。 这其实就像调用网上的第三方包，某一个功能，自己写是写不出来，写出来性能也不会很好。但是同样的功能，我们去网上引入其他大神已经封装完成的第三方包。我们就会用，功能就可以实现并且性能上也过得去。

如果让大家直接对DOM进行操作完成比框架更优秀的性能。这绝不是大多数人可以做到的。让大多数可以接受，框架需要做的，就是让大多数人使用尽量使用简单的技术，完成相对困难的操作。这是`普适性`。

并且，如果完成同一个性能效果，需要我们去*精通原生javascript*和*学习框架上的一些简单的API和结构*。明显后者的学习成本更低。如果说使用框架我们所能完成的某一阶段的性能所需要的学习成本是2个月的话。 那么学习javascript完成同一阶段的性能可能需要一年。

框架的初衷就是让用户使用尽量简单的技术，完成相对复杂的工作并提升一定的性能 *（这其中包括但不限于:可维护性，可复用性，渲染效率等）* 。这样，即使我们的水平不是很高，使用框架以后。项目在性能上也能过得去。

总结

1. 虚拟DOM不一定会比操作原生DOM更快。
2. 虚拟DOM的优势在于节点进行改动的时候尽量减少开销
3. React从来没说过虚拟DOM会比原生更快。
4. 框架的本质是提升开发效率，让我们的注意力更集中于数据
