# react

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
