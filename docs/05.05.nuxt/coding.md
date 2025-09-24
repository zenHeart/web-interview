# 编程题✅

本主题涵盖 Nuxt 相关的编程实践题，包括组件开发、状态管理、API 集成等实际开发场景。

## 实现一个支持 SSR 的用户列表组件 {#p0-nuxt-user-list-component}

<Answer>

**题目要求**

实现一个支持服务端渲染的用户列表组件，要求：

1. 支持分页加载
2. 支持搜索功能
3. 支持 SSR 和客户端渲染
4. 使用 TypeScript

**实现方案**

```vue
<!-- components/UserList.vue -->
<template>
  <div class="user-list">
    <!-- 搜索框 -->
    <div class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索用户..."
        class="search-input"
        @input="debouncedSearch"
      />
    </div>
    
    <!-- 用户列表 -->
    <div class="user-grid">
      <div
        v-for="user in users"
        :key="user.id"
        class="user-card"
      >
        <img :src="user.avatar" :alt="user.name" class="avatar" />
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <span class="role">{{ user.role }}</span>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <!-- 分页 -->
    <div v-if="hasMore" class="pagination">
      <button
        @click="loadMore"
        :disabled="loading"
        class="load-more-btn"
      >
        {{ loading ? '加载中...' : '加载更多' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
}

interface UserListProps {
  initialUsers?: User[]
  initialPage?: number
  initialSearch?: string
}

const props = withDefaults(defineProps<UserListProps>(), {
  initialUsers: () => [],
  initialPage: 1,
  initialSearch: ''
})

// 响应式数据
const users = ref<User[]>(props.initialUsers)
const loading = ref(false)
const hasMore = ref(true)
const currentPage = ref(props.initialPage)
const searchQuery = ref(props.initialSearch)

// 防抖搜索
const debouncedSearch = debounce(async () => {
  await searchUsers()
}, 300)

// 搜索用户
const searchUsers = async () => {
  loading.value = true
  currentPage.value = 1
  users.value = []
  
  try {
    const { data } = await $fetch('/api/users', {
      query: {
        page: currentPage.value,
        search: searchQuery.value
      }
    })
    
    users.value = data.users
    hasMore.value = data.hasMore
  } catch (error) {
    console.error('搜索用户失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = async () => {
  if (loading.value || !hasMore.value) return
  
  loading.value = true
  currentPage.value++
  
  try {
    const { data } = await $fetch('/api/users', {
      query: {
        page: currentPage.value,
        search: searchQuery.value
      }
    })
    
    users.value.push(...data.users)
    hasMore.value = data.hasMore
  } catch (error) {
    console.error('加载更多失败:', error)
    currentPage.value-- // 回滚页码
  } finally {
    loading.value = false
  }
}

// 服务端渲染时预加载数据
if (process.server && props.initialUsers.length === 0) {
  await searchUsers()
}
</script>

<style scoped>
.user-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.search-section {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.user-card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.role {
  display: inline-block;
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.pagination {
  text-align: center;
}

.load-more-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.load-more-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

**API 路由实现**

```ts
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const search = query.search as string || ''
  const limit = 10
  
  // 模拟数据库查询
  const users = await getUserList(page, limit, search)
  
  return {
    users: users.data,
    hasMore: users.hasMore,
    total: users.total
  }
})

async function getUserList(page: number, limit: number, search: string) {
  // 模拟数据
  const allUsers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
    role: ['管理员', '用户', '编辑'][i % 3]
  }))
  
  // 搜索过滤
  const filteredUsers = search
    ? allUsers.filter(user => 
        user.name.includes(search) || 
        user.email.includes(search)
      )
    : allUsers
  
  // 分页
  const start = (page - 1) * limit
  const end = start + limit
  const data = filteredUsers.slice(start, end)
  
  return {
    data,
    hasMore: end < filteredUsers.length,
    total: filteredUsers.length
  }
}
```

**使用示例**

```vue
<!-- pages/users.vue -->
<template>
  <div>
    <h1>用户管理</h1>
    <UserList />
  </div>
</template>

<script setup>
// 设置页面元数据
definePageMeta({
  title: '用户管理',
  description: '用户列表页面'
})
</script>
```

**面试官视角**

该题考察候选人对 Nuxt SSR 的理解，包括组件设计、状态管理、API 集成等综合能力。通过此题可以评估候选人的实际开发经验。

**延伸阅读**

- [Nuxt 组件开发指南](https://nuxt.com/docs/guide/directory-structure/components)
- [Vue 3 组合式 API](https://vuejs.org/guide/composition-api-introduction.html)

</Answer>

## 实现一个支持深色模式的 Nuxt 应用 {#p1-nuxt-dark-mode}

<Answer>

**题目要求**

实现一个支持深色模式的 Nuxt 应用，要求：

1. 支持系统主题检测
2. 支持手动切换主题
3. 主题状态持久化
4. 平滑过渡动画

**实现方案**

1. **创建主题模块**

   ```ts
   // modules/theme-switcher.ts
   import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

   export default defineNuxtModule({
     meta: {
       name: 'theme-switcher',
       configKey: 'themeSwitcher'
     },
     
     defaults: {
       themes: ['light', 'dark'],
       defaultTheme: 'light',
       storageKey: 'theme',
       enableSystemTheme: true
     },
     
     setup(options, nuxt) {
       const resolver = createResolver(import.meta.url)
       
       // 添加插件
       addPlugin({
         src: resolver.resolve('./runtime/plugin.client.ts'),
         options
       })
       
       // 添加组合式函数
       addImports({
         name: 'useTheme',
         from: resolver.resolve('./runtime/composables/useTheme.ts')
       })
     }
   })
   ```

2. **主题组合式函数**

   ```ts
   // runtime/composables/useTheme.ts
   export const useTheme = () => {
     const config = useRuntimeConfig()
     const { themes, defaultTheme, storageKey, enableSystemTheme } = config.public.themeSwitcher
     
     const currentTheme = ref(defaultTheme)
     const systemTheme = ref<'light' | 'dark'>('light')
     
     // 检测系统主题
     const detectSystemTheme = () => {
       if (process.client && enableSystemTheme) {
         const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
         systemTheme.value = mediaQuery.matches ? 'dark' : 'light'
         
         // 监听系统主题变化
         mediaQuery.addEventListener('change', (e) => {
           systemTheme.value = e.matches ? 'dark' : 'light'
           if (!localStorage.getItem(storageKey)) {
             applyTheme(systemTheme.value)
           }
         })
       }
     }
     
     // 应用主题
     const applyTheme = (theme: string) => {
       if (process.client) {
         document.documentElement.setAttribute('data-theme', theme)
         currentTheme.value = theme
       }
     }
     
     // 设置主题
     const setTheme = (theme: string) => {
       if (themes.includes(theme)) {
         applyTheme(theme)
         localStorage.setItem(storageKey, theme)
       }
     }
     
     // 切换主题
     const toggleTheme = () => {
       const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
       setTheme(newTheme)
     }
     
     // 初始化主题
     const initTheme = () => {
       if (process.client) {
         const savedTheme = localStorage.getItem(storageKey)
         if (savedTheme && themes.includes(savedTheme)) {
           setTheme(savedTheme)
         } else if (enableSystemTheme) {
           setTheme(systemTheme.value)
         } else {
           setTheme(defaultTheme)
         }
       }
     }
     
     return {
       currentTheme: readonly(currentTheme),
       systemTheme: readonly(systemTheme),
       setTheme,
       toggleTheme,
       initTheme,
       detectSystemTheme
     }
   }
   ```

3. **主题插件**

   ```ts
   // runtime/plugin.client.ts
   export default defineNuxtPlugin(() => {
     const { initTheme, detectSystemTheme } = useTheme()
     
     // 初始化主题
     initTheme()
     detectSystemTheme()
   })
   ```

4. **主题切换组件**

   ```vue
   <!-- components/ThemeSwitcher.vue -->
   <template>
     <button
       @click="toggleTheme"
       class="theme-switcher"
       :aria-label="`切换到${currentTheme === 'light' ? '深色' : '浅色'}模式`"
     >
       <Icon
         :name="currentTheme === 'light' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
         class="theme-icon"
       />
       <span class="theme-text">
         {{ currentTheme === 'light' ? '深色模式' : '浅色模式' }}
       </span>
     </button>
   </template>

   <script setup>
   const { currentTheme, toggleTheme } = useTheme()
   </script>

   <style scoped>
   .theme-switcher {
     display: flex;
     align-items: center;
     gap: 0.5rem;
     padding: 0.5rem 1rem;
     border: 1px solid var(--border-color);
     border-radius: 0.5rem;
     background: var(--bg-color);
     color: var(--text-color);
     cursor: pointer;
     transition: all 0.3s ease;
   }

   .theme-switcher:hover {
     background: var(--hover-color);
   }

   .theme-icon {
     width: 1.25rem;
     height: 1.25rem;
   }

   .theme-text {
     font-size: 0.875rem;
   }
   </style>
   ```

5. **CSS 变量定义**

   ```css
   /* assets/css/theme.css */
   :root {
     /* 浅色主题 */
     --bg-color: #ffffff;
     --text-color: #333333;
     --border-color: #e5e5e5;
     --hover-color: #f5f5f5;
     --primary-color: #007bff;
     --secondary-color: #6c757d;
     --success-color: #28a745;
     --warning-color: #ffc107;
     --danger-color: #dc3545;
   }

   [data-theme="dark"] {
     /* 深色主题 */
     --bg-color: #1a1a1a;
     --text-color: #ffffff;
     --border-color: #333333;
     --hover-color: #2a2a2a;
     --primary-color: #0d6efd;
     --secondary-color: #6c757d;
     --success-color: #198754;
     --warning-color: #fd7e14;
     --danger-color: #dc3545;
   }

   /* 平滑过渡 */
   * {
     transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
   }
   ```

6. **应用配置**

   ```ts
   // nuxt.config.ts
   export default defineNuxtConfig({
     modules: [
       './modules/theme-switcher'
     ],
     
     css: ['~/assets/css/theme.css'],
     
     themeSwitcher: {
       themes: ['light', 'dark'],
       defaultTheme: 'light',
       storageKey: 'theme',
       enableSystemTheme: true
     }
   })
   ```

7. **使用示例**

   ```vue
   <!-- layouts/default.vue -->
   <template>
     <div class="layout">
       <header class="header">
         <nav class="nav">
           <NuxtLink to="/">首页</NuxtLink>
           <NuxtLink to="/about">关于</NuxtLink>
         </nav>
         <ThemeSwitcher />
       </header>
       
       <main class="main">
         <slot />
       </main>
       
       <footer class="footer">
         <p>&copy; 2024 My App</p>
       </footer>
     </div>
   </template>

   <style scoped>
   .layout {
     min-height: 100vh;
     background: var(--bg-color);
     color: var(--text-color);
   }

   .header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 1rem 2rem;
     border-bottom: 1px solid var(--border-color);
   }

   .nav {
     display: flex;
     gap: 2rem;
   }

   .nav a {
     color: var(--text-color);
     text-decoration: none;
     padding: 0.5rem 1rem;
     border-radius: 0.25rem;
     transition: background-color 0.3s ease;
   }

   .nav a:hover {
     background: var(--hover-color);
   }

   .main {
     padding: 2rem;
   }

   .footer {
     text-align: center;
     padding: 2rem;
     border-top: 1px solid var(--border-color);
   }
   </style>
   ```

**面试官视角**

该题考察候选人对 Nuxt 模块开发、主题系统设计的理解，是构建用户体验良好的应用的重要技能。通过此题可以评估候选人的系统设计能力。

**延伸阅读**

- [Nuxt 模块开发指南](https://nuxt.com/docs/guide/going-further/modules)
- [CSS 变量和主题设计](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

</Answer>

## 实现一个支持实时通信的聊天应用 {#p2-nuxt-realtime-chat}

<Answer>

**题目要求**

实现一个支持实时通信的聊天应用，要求：

1. 支持 WebSocket 连接
2. 支持消息发送和接收
3. 支持在线用户列表
4. 支持消息历史记录

**实现方案**

1. **WebSocket 服务端**

   ```ts
   // server/api/chat/socket.ts
   import { Server } from 'socket.io'
   import { createServer } from 'http'

   export default defineEventHandler(async (event) => {
     const server = createServer()
     const io = new Server(server, {
       cors: {
         origin: "*",
         methods: ["GET", "POST"]
       }
     })

     // 存储在线用户
     const onlineUsers = new Map()

     io.on('connection', (socket) => {
       console.log('用户连接:', socket.id)

       // 用户加入
       socket.on('join', (userData) => {
         onlineUsers.set(socket.id, userData)
         socket.broadcast.emit('userJoined', userData)
         io.emit('onlineUsers', Array.from(onlineUsers.values()))
       })

       // 发送消息
       socket.on('sendMessage', (messageData) => {
         const user = onlineUsers.get(socket.id)
         if (user) {
           const message = {
             id: Date.now(),
             content: messageData.content,
             user: user,
             timestamp: new Date().toISOString()
           }
           
           // 广播消息
           io.emit('newMessage', message)
           
           // 保存到数据库
           saveMessage(message)
         }
       })

       // 用户断开连接
       socket.on('disconnect', () => {
         const user = onlineUsers.get(socket.id)
         if (user) {
           onlineUsers.delete(socket.id)
           socket.broadcast.emit('userLeft', user)
           io.emit('onlineUsers', Array.from(onlineUsers.values()))
         }
       })
     })

     server.listen(3001)
   })

   // 保存消息到数据库
   async function saveMessage(message: any) {
     // 这里可以保存到数据库
     console.log('保存消息:', message)
   }
   ```

2. **聊天组合式函数**

   ```ts
   // composables/useChat.ts
   export const useChat = () => {
     const socket = ref(null)
     const messages = ref([])
     const onlineUsers = ref([])
     const currentUser = ref(null)
     const isConnected = ref(false)

     // 连接 WebSocket
     const connect = (userData: any) => {
       if (process.client) {
         socket.value = new WebSocket('ws://localhost:3001')
         
         socket.value.onopen = () => {
           isConnected.value = true
           currentUser.value = userData
           
           // 发送加入消息
           socket.value.send(JSON.stringify({
             type: 'join',
             data: userData
           }))
         }

         socket.value.onmessage = (event) => {
           const message = JSON.parse(event.data)
           
           switch (message.type) {
             case 'newMessage':
               messages.value.push(message.data)
               break
             case 'userJoined':
               console.log('用户加入:', message.data)
               break
             case 'userLeft':
               console.log('用户离开:', message.data)
               break
             case 'onlineUsers':
               onlineUsers.value = message.data
               break
           }
         }

         socket.value.onclose = () => {
           isConnected.value = false
           console.log('WebSocket 连接关闭')
         }

         socket.value.onerror = (error) => {
           console.error('WebSocket 错误:', error)
         }
       }
     }

     // 发送消息
     const sendMessage = (content: string) => {
       if (socket.value && isConnected.value) {
         socket.value.send(JSON.stringify({
           type: 'sendMessage',
           data: { content }
         }))
       }
     }

     // 断开连接
     const disconnect = () => {
       if (socket.value) {
         socket.value.close()
         socket.value = null
         isConnected.value = false
       }
     }

     // 获取消息历史
     const loadMessages = async () => {
       try {
         const { data } = await $fetch('/api/chat/messages')
         messages.value = data
       } catch (error) {
         console.error('加载消息失败:', error)
       }
     }

     return {
       socket: readonly(socket),
       messages: readonly(messages),
       onlineUsers: readonly(onlineUsers),
       currentUser: readonly(currentUser),
       isConnected: readonly(isConnected),
       connect,
       sendMessage,
       disconnect,
       loadMessages
     }
   }
   ```

3. **聊天组件**

   ```vue
   <!-- components/ChatRoom.vue -->
   <template>
     <div class="chat-room">
       <!-- 在线用户 -->
       <div class="online-users">
         <h3>在线用户 ({{ onlineUsers.length })}</h3>
         <div class="user-list">
           <div
             v-for="user in onlineUsers"
             :key="user.id"
             class="user-item"
           >
             <img :src="user.avatar" :alt="user.name" class="avatar" />
             <span>{{ user.name }}</span>
           </div>
         </div>
       </div>

       <!-- 消息列表 -->
       <div class="messages" ref="messagesContainer">
         <div
           v-for="message in messages"
           :key="message.id"
           class="message"
           :class="{ 'own-message': message.user.id === currentUser?.id }"
         >
           <img :src="message.user.avatar" :alt="message.user.name" class="avatar" />
           <div class="message-content">
             <div class="message-header">
               <span class="username">{{ message.user.name }}</span>
               <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
             </div>
             <div class="message-text">{{ message.content }}</div>
           </div>
         </div>
       </div>

       <!-- 消息输入 -->
       <div class="message-input">
         <input
           v-model="newMessage"
           type="text"
           placeholder="输入消息..."
           @keyup.enter="sendMessage"
           :disabled="!isConnected"
         />
         <button
           @click="sendMessage"
           :disabled="!newMessage.trim() || !isConnected"
         >
           发送
         </button>
       </div>
     </div>
   </template>

   <script setup>
   const { messages, onlineUsers, currentUser, isConnected, sendMessage: sendChatMessage } = useChat()
   
   const newMessage = ref('')
   const messagesContainer = ref(null)

   // 发送消息
   const sendMessage = () => {
     if (newMessage.value.trim()) {
       sendChatMessage(newMessage.value)
       newMessage.value = ''
     }
   }

   // 格式化时间
   const formatTime = (timestamp) => {
     return new Date(timestamp).toLocaleTimeString()
   }

   // 自动滚动到底部
   watch(messages, () => {
     nextTick(() => {
       if (messagesContainer.value) {
         messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
       }
     })
   })
   </script>

   <style scoped>
   .chat-room {
     display: flex;
     height: 600px;
     border: 1px solid #ddd;
     border-radius: 0.5rem;
     overflow: hidden;
   }

   .online-users {
     width: 200px;
     background: #f5f5f5;
     padding: 1rem;
     border-right: 1px solid #ddd;
   }

   .user-list {
     margin-top: 1rem;
   }

   .user-item {
     display: flex;
     align-items: center;
     gap: 0.5rem;
     padding: 0.5rem;
     border-radius: 0.25rem;
   }

   .user-item:hover {
     background: #e9ecef;
   }

   .messages {
     flex: 1;
     padding: 1rem;
     overflow-y: auto;
     display: flex;
     flex-direction: column;
     gap: 1rem;
   }

   .message {
     display: flex;
     gap: 0.75rem;
   }

   .own-message {
     flex-direction: row-reverse;
   }

   .message-content {
     flex: 1;
   }

   .message-header {
     display: flex;
     gap: 0.5rem;
     margin-bottom: 0.25rem;
   }

   .username {
     font-weight: 600;
   }

   .timestamp {
     font-size: 0.75rem;
     color: #666;
   }

   .message-text {
     background: #f8f9fa;
     padding: 0.75rem;
     border-radius: 0.5rem;
   }

   .own-message .message-text {
     background: #007bff;
     color: white;
   }

   .message-input {
     display: flex;
     gap: 0.5rem;
     padding: 1rem;
     border-top: 1px solid #ddd;
   }

   .message-input input {
     flex: 1;
     padding: 0.75rem;
     border: 1px solid #ddd;
     border-radius: 0.25rem;
   }

   .message-input button {
     padding: 0.75rem 1.5rem;
     background: #007bff;
     color: white;
     border: none;
     border-radius: 0.25rem;
     cursor: pointer;
   }

   .message-input button:disabled {
     background: #ccc;
     cursor: not-allowed;
   }
   </style>
   ```

4. **聊天页面**

   ```vue
   <!-- pages/chat.vue -->
   <template>
     <div class="chat-page">
       <h1>聊天室</h1>
       
       <div v-if="!isConnected" class="login-form">
         <h2>加入聊天室</h2>
         <form @submit.prevent="joinChat">
           <input
             v-model="userForm.name"
             type="text"
             placeholder="用户名"
             required
           />
           <input
             v-model="userForm.email"
             type="email"
             placeholder="邮箱"
             required
           />
           <button type="submit">加入</button>
         </form>
       </div>
       
       <div v-else class="chat-container">
         <ChatRoom />
         <button @click="disconnect" class="disconnect-btn">
           离开聊天室
         </button>
       </div>
     </div>
   </template>

   <script setup>
   const { connect, disconnect, isConnected, loadMessages } = useChat()
   
   const userForm = ref({
     name: '',
     email: ''
   })

   // 加入聊天
   const joinChat = () => {
     const userData = {
       id: Date.now(),
       name: userForm.value.name,
       email: userForm.value.email,
       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userForm.value.name}`
     }
     
     connect(userData)
     loadMessages()
   }

   // 页面卸载时断开连接
   onUnmounted(() => {
     disconnect()
   })
   </script>

   <style scoped>
   .chat-page {
     max-width: 1200px;
     margin: 0 auto;
     padding: 2rem;
   }

   .login-form {
     max-width: 400px;
     margin: 2rem auto;
     padding: 2rem;
     border: 1px solid #ddd;
     border-radius: 0.5rem;
   }

   .login-form form {
     display: flex;
     flex-direction: column;
     gap: 1rem;
   }

   .login-form input {
     padding: 0.75rem;
     border: 1px solid #ddd;
     border-radius: 0.25rem;
   }

   .login-form button {
     padding: 0.75rem;
     background: #007bff;
     color: white;
     border: none;
     border-radius: 0.25rem;
     cursor: pointer;
   }

   .chat-container {
     margin-top: 2rem;
   }

   .disconnect-btn {
     margin-top: 1rem;
     padding: 0.5rem 1rem;
     background: #dc3545;
     color: white;
     border: none;
     border-radius: 0.25rem;
     cursor: pointer;
   }
   </style>
   ```

**面试官视角**

该题考察候选人对实时通信、WebSocket 技术的理解，是构建现代 Web 应用的重要技能。通过此题可以评估候选人的全栈开发能力。

**延伸阅读**

- [WebSocket API 文档](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Socket.IO 官方文档](https://socket.io/docs/)

</Answer>
