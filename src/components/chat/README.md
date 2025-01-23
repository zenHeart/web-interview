# chat

一个支持使用大模型服务的悬浮聊天窗组件。核心技术栈如下

1. 组件库使用 [chatui](https://github.com/alibaba/ChatUI/tree/next)
2. 接口服务使用 [ollama api](https://github.com/ollama/ollama/blob/main/docs/api.md)

## 快速入门

```typescript
import Chat from '@site/src/components'

// 就会在页面挂载一个悬浮聊天窗
<Chat />

```

## 功能说明

1. 支持文本输入用户聊天后回车，调用 ollama api 接口，返回结果后展示在聊天窗中
