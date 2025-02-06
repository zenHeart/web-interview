# 编码题

## 使用Proxy实现简易的vue双向数据绑定

可以直接看这个链接： [资料](https://github.com/pro-collection/interview-question/issues/8)

使用proxy实现数据劫持

```js
const data = {
  name: YoLinDeng,
  height: '176cm'
}

const p = new Proxy(data, {
  get (target, prop) {
    return Reflect.get(...arguments)
  },
  set (target, prop, newValue) {
    return Reflect.set(...arguments)
  }
})
```

 关于vue中数据响应式的原理

 对数据进行侦测

* 在vue2.X中，实现一个`observe`类，对于对象数据，通过`Object.defineProperty`来劫持对象的属性，实现`getter`和`setter`方法，这样就可以在getter的时候知道谁（订阅者）读取了数据，即谁依赖了当前的数据，将它通过`Dep类`（订阅器）收集统一管理，在setter的时候调用Dep类中的`notify`方法通知所以相关的订阅者进行更新视图。如果对象的属性也是一个对象的话，则需要递归调用`observe`进行处理。
* 对于数组则需要另外处理，通过实现一个拦截器类，并将它挂载到数组数据的原型上，当调用`push/pop/shift/unshift/splice/sort/reverse`修改数组数据时候，相当于调用的是拦截器中重新定义的方法，这样在拦截器中就可以侦测到数据改变了，并通知订阅者更新视图。
* vue3中使用Proxy替代了Object.defineProperty，优点在于可以直接监听对象而非属性、可以直接监听数组的变化、多达13种拦截方法。缺点是兼容性还不够好。Proxy作为新标准将受到浏览器厂商重点持续的性能优化。

 对模板字符串进行编译

* 实现Compile解析器类，将`template`中的模板字符串通过正则等方式进行处理生成对应的ast（抽象语法树），通过调用定义的不同钩子函数进行处理，包括开始标签（`start`）并判断是否自闭和以及解析属性、结束标签（`end`）、文本（`chars`）、注释（`comment`）
* 将通过html解析与文本解析的ast进行优化处理，在静态节点上打标记，为后面`dom-diff`算法中性能优化使用，即在对比前后vnode的时候会跳过静态节点不作对比。
* 最后根据处理好的ast生产`render`函数，在组件挂载的时候调用`render`函数就可以得到虚拟dom。

 虚拟dom

* vnode的类型包括注释节点、文本节点、元素节点、组件节点、函数式组件节点、克隆节点，`VNode`可以描述的多种节点类型，它们本质上都是`VNode`类的实例，只是在实例化的时候传入的属性参数不同而已。
* 通过将模板字符串编译生成虚拟dom并缓存起来，当数据发生变化时，通过对比变化前后虚拟dom，以变化后的虚拟dom为基准，更新旧的虚拟dom，使它和新的一样。把dom-diff过程叫做`patch`的过程，其主要做了三件事，分别是创建/删除/更新节点。
* 对于子节点的更新策略，vue中为了避免双重循环数据量大时候造成时间复杂度高带来的性能问题，而选择先从子节点数组中4个特殊位置进行对比，分别是：新前与旧前，新后与旧后，新后与旧前，新前与旧后。如果四种情况都没有找到相同的节点，则再通过循环方式查找。

 实现简易的vue双向数据绑定

vue的双向数据绑定主要是指，数据变化更新视图变化，视图变化更新数据。

**实现代码如下**

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width= , initial-scale=1.0">
 <title>Document</title>
 <script src="myVue.js"></script>
</head>
<body>
 <div id="app">
 {{name}}
 <div>{{message}}</div>
 <input type="text" v-model="test">
 <span>{{test}}</span>
 </div>
 <script>
 let vm = new vue({
 el: '#app',
 data: {
 name: 'YoLinDeng',
 message: '打篮球',
 test: '双向绑定数据'
 }
 })
 // console.log(vm._data)
 </script>
</body>
</html>
```

```js
class vue extends EventTarget {
  constructor (option) {
    super()
    this.option = option
    this._data = this.option.data
    this.el = document.querySelector(this.option.el)
    this.compileNode(this.el)
    this.observe(this._data)
  }

  // 实现监听器方法
  observe (data) {
    const context = this
    // 使用proxy代理，劫持数据
    this._data = new Proxy(data, {
      set (target, prop, newValue) {
        // 自定义事件
        const event = new CustomEvent(prop, {
          detail: newValue
        })
        // 发布自定义事件
        context.dispatchEvent(event)
        return Reflect.set(...arguments)
      }
    })
  }

  // 实现解析器方法，解析模板
  compileNode (el) {
    const child = el.childNodes
    const childArr = [...child]
    childArr.forEach(node => {
      if (node.nodeType === 3) {
        const text = node.textContent
        if (reg.test(text)) {
          const $1 = RegExp.$1
          this._data[$1] && (node.textContent = text.replace(reg, this._data[$1]))
          // 监听数据更改事件
          this.addEventListener($1, e => {
            node.textContent = text.replace(reg, e.detail)
          })
        }
      } else if (node.nodeType === 1) { // 如果是元素节点
        const attr = node.attributes
        // 判断属性中是否含有v-model
        // eslint-disable-next-line
        if (attr.hasOwnProperty('v-model')) {
          const keyName = attr['v-model'].nodeValue
          node.value = this._data[keyName]
          node.addEventListener('input', e => {
            this._data[keyName] = node.value
          })
        }
        // 递归调用解析器方法
        this.compileNode(node)
      }
    })
  }
}
```

## react 中是如何实现 下拉菜单场景， 点击区域外关闭下拉组件？ {#p1-react}

在 React 中，要实现点击区域外关闭下拉组件，一般可以使用以下几种方法：

1. 在下拉组件的根元素上监听点击事件，当点击区域不在下拉组件内时，触发关闭下拉组件的操作。这可以通过添加全局点击事件，然后在事件处理程序中判断点击区域是否在下拉组件内来实现。具体实现如下：

```jsx
import React, { useRef, useEffect } from 'react';

function DropdownMenu(props) {
 const menuRef = useRef(null);

 useEffect(() => {
 function handleClickOutside(event) {
 if (menuRef.current && !menuRef.current.contains(event.target)) {
 props.onClose();
 }
 }

 document.addEventListener('click', handleClickOutside);
 return () => {
 document.removeEventListener('click', handleClickOutside);
 };
 }, [props]);

 return (
 <div ref={menuRef}>
 {/* 下拉菜单内容 */}
 </div>
 );
}
```

2. 在下拉组件的父元素上监听点击事件，当点击区域不在下拉组件及其父元素内时，触发关闭下拉组件的操作。具体实现如下：

```jsx
import React, { useState } from 'react';

function Dropdown(props) {
 const [isOpen, setIsOpen] = useState(false);

 function toggleDropdown() {
 setIsOpen(!isOpen);
 }

 function handleClickOutside(event) {
 if (!event.target.closest('.dropdown')) {
 setIsOpen(false);
 }
 }

 return (
 <div className="dropdown" onClick={handleClickOutside}>
 <button onClick={toggleDropdown}>Toggle Dropdown</button>
 {isOpen && <DropdownMenu onClose={() => setIsOpen(false)} />}
 </div>
 );
}
```

在上述代码中，我们在 `Dropdown` 组件的根元素上添加了点击事件处理程序 `handleClickOutside`，当点击区域不在 `.dropdown` 元素内时，触发关闭下拉组件的操作。由于 `DropdownMenu` 组件位于 `Dropdown` 组件内部，因此当点击下拉菜单时，事件会冒泡到 `Dropdown` 组件，从而不会触发关闭操作。

3. 除了上述方法外，还可以使用 `useRef` 钩子来监听鼠标点击事件。具体实现可以在下拉组件的根元素上使用 `ref` 属性来获取 DOM 元素的引用，然后在组件挂载时使用 `addEventListener` 方法绑定 `mousedown` 事件，最后在事件处理函数中判断鼠标点击的位置是否在下拉组件内，如果不在，则关闭下拉组件。

示例代码如下：

```jsx
import { useRef, useState, useEffect } from 'react';

function Dropdown() {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef(null);

 useEffect(() => {
 function handleClickOutside(event) {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
 setIsOpen(false);
 }
 }

 document.addEventListener('mousedown', handleClickOutside);
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, [dropdownRef]);

 return (
 <div ref={dropdownRef}>
 <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
 {isOpen && (
 <ul>
 <li>Option 1</li>
 <li>Option 2</li>
 <li>Option 3</li>
 </ul>
 )}
 </div>
 );
}
```

这种方法可以在组件内部处理点击事件，不需要将事件处理函数传递给父组件。但是相对而言代码会比较繁琐，需要手动处理事件绑定和解绑。

## redux 日志记录插件

1. 创建日志插件函数：

```js
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

```js
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import loggerMiddleware from './loggerMiddleware'

const store = createStore(rootReducer, applyMiddleware(loggerMiddleware))
```

在创建 Redux store 的时候，使用`applyMiddleware`函数将日志插件中间件添加到 store 中。

这样，每当有动作被派发时，日志插件就会在控制台打印出当前的状态、动作和下一个状态，从而实现记录状态变更的目的。
