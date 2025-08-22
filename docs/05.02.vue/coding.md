# 编码题

## 实现一个文件夹树组件，支持拖拽排序 {#p0-vue-file-tree}

<Answer>

import appFileTree from '!!raw-loader!./answers/file-tree/app.vue';
import FileTree from '!!raw-loader!./answers/file-tree/FileTree.vue';
import TreeNode from '!!raw-loader!./answers/file-tree/TreeNode.vue';

<Sandpack
  template="vue"
  options={{
     editorHeight: 600
  }}
  files={{
    "/src/App.vue": appFileTree,
    "/src/FileTree.vue": FileTree,
    "/src/TreeNode.vue": TreeNode,
  }}
/>

**答案解析**

该题考察如下知识点：

1. **递归组件**：使用组件自身递归渲染树形结构
2. **拖拽 API**：使用 HTML5 拖拽 API（`dragstart`、`dragover`、`drop` 等事件）
3. **数据结构操作**：对嵌套树形数据进行增删改查操作
4. **事件传递**：子组件向父组件传递事件进行数据更新
5. **CSS 样式控制**：拖拽时的视觉反馈

**核心实现思路**：

- 使用递归组件渲染文件夹树形结构
- 实现拖拽源和拖放目标的事件处理
- 通过事件向上传递，在根组件中统一处理数据更新
- 提供拖拽时的视觉反馈效果
- 处理拖拽排序的边界情况（如不能拖拽到自身子节点）

</Answer>

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

## 实现下拉菜单，支持点击区域外关闭下拉组件？ {#p1-vue-dropdown}

<Answer>

import appDropdown from '!!raw-loader!./answers/dropdown/app.vue';
import ClickOutside from '!!raw-loader!./answers/dropdown/ClickOutside.vue';

<Sandpack
  template="vue"
  options={{
     editorHeight: 600
  }}
  files={{
    "/src/App.vue": appDropdown,
    "/src/ClickOutside.vue": ClickOutside,
  }}
/>

**答案解析**

该题考察如下知识点：

1. **自定义指令**：通过 `v-click-outside` 指令实现点击外部区域的检测
2. **事件处理**：使用 `addEventListener` 和 `removeEventListener` 管理全局事件
3. **DOM 节点操作**：使用 `contains` 方法判断点击目标是否在组件内部
4. **组件生命周期**：在指令的 `mounted` 和 `unmounted` 钩子中添加和移除事件监听器

**核心实现思路**：

- 在组件挂载时添加全局 `click` 事件监听器
- 在事件处理函数中判断点击目标是否在组件内部
- 如果点击在外部，则执行关闭操作
- 在组件卸载时移除事件监听器以防止内存泄漏

</Answer>

## 实现一个简单的 i18n (国际化 (Internationalization) 的缩写) 插件 {#p3-implement-a-simple-i18n-internationalization-plugin}

实现下面的这样的一个插件 `<h1>{{ $translate('greetings.hello') }}</h1>`

<Answer>

**核心实现思路**

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

**答案解析**

该题考察如下知识点：

1. **Vue 插件机制**：理解 Vue 插件的 `install` 方法和如何注册全局属性
2. **对象深度访问**：通过点分隔符访问嵌套对象的属性值
3. **全局属性注册**：使用 `app.config.globalProperties` 注册全局方法
4. **字符串处理**：解析点分隔的键名并遍历对象结构

**核心技术要点**：

- 插件通过 `app.use()` 方式注册
- 使用 `globalProperties` 在所有组件中提供 `$translate` 方法
- 通过递归方式访问嵌套的翻译对象
- 当找不到翻译时返回原始键名作为降级处理

</Answer>
