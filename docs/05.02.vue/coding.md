# 编码题

## 实现一个文件夹树组件，支持拖拽排序 {#p0-vue-file-tree}

## 实现一个 ErrorBoundary 组件，捕获子组件的错误并可自定义错误组件 {#p1-vue-errorboundary}

<Answer>

import appErrorBoundary from '!!raw-loader!./answers/ErrorBoundary/app.vue';
import VDefaultFallback from '!!raw-loader!./answers/ErrorBoundary/VDefaultFallback.vue';
import VueErrorBoundary from '!!raw-loader!./answers/ErrorBoundary/VueErrorBoundary.vue';

<Sandpack
  template="vue-ts"
  options={{
     editorHeight: 600
  }}
  files={{
    "/src/App.vue": appErrorBoundary,
    "/src/VueErrorBoundary.vue": VueErrorBoundary,
    "/src/VDefaultFallback.vue": VDefaultFallback,
  }}
/>

**答案解析**

该题考察如下知识点

1. 是否知道 Vue 组件错误处理的 hook onErrorCaptured, 参考问题 [组件生命周期](./02.01.component.md#p0-vue-lifecycle)
2. 是否知道作用域插槽来抛出 Vue 内部错误给自定义组件消费, 参考问题 [讲解一下插槽的使用](./02.01.component.md#p2-introduce-conditional-slots)

</Answer>

## 实现下拉菜单，支持点击区域外关闭下拉组件？ {#p1-react}

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

## 实现一个简单的 i18n (国际化 (Internationalization) 的缩写) 插件 {#p3-implement-a-simple-i18n-internationalization-plugin}

实现下面的这样的一个插件 `<h1>{{ $translate('greetings.hello') }}</h1>`

以下是一个简单的 Vue 3 的国际化插件实现：

1. 创建一个名为`i18nPlugin.js`的文件：

```js
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
