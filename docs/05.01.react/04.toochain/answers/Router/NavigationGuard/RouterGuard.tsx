import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useNavigate,
  useLocation,
  Link,
  useRouteError
} from 'react-router'
import React, { createContext, useContext, useState } from 'react'

// --------- 模拟登录上下文 ---------
const AuthContext = createContext(null)

function useAuth () {
  return useContext(AuthContext)
}

// --------- loader 守卫函数 ---------
function authLoader () {
  const isLogin = localStorage.getItem('isLogin') === 'true'
  if (!isLogin) {
    throw redirect('/login')
  }
  return null
}

// --------- 首页组件 ---------
function Home () {
  const { isLogin, logout } = useAuth()
  return (
    <div>
      <h2>🏠 首页</h2>
      <p>当前状态: {isLogin ? '✅ 已登录' : '❌ 未登录'}</p>
      <nav style={{ marginBottom: '10px' }}>
        <Link to="/dashboard">进入 Dashboard</Link>
      </nav>
      {isLogin && <button onClick={logout}>退出登录</button>}
    </div>
  )
}

// --------- 登录页组件 ---------
function Login () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  function handleLogin () {
    login()
    navigate(from, { replace: true })
  }

  return (
    <div>
      <h2>🔐 登录页</h2>
      <p>登录后将跳转到：<code>{from}</code></p>
      <button onClick={handleLogin}>点我登录</button>
    </div>
  )
}

// --------- 受保护页组件 ---------
function Dashboard () {
  return (
    <div>
      <h2>📊 Dashboard</h2>
      <p>此页面需登录后才能访问。</p>
      <Link to="/">返回首页</Link>
    </div>
  )
}

// --------- 错误处理组件（可选） ---------
function ErrorBoundary () {
  const error = useRouteError()
  return (
    <div style={{ color: 'red' }}>
      <h2>出错啦 🚨</h2>
      <pre>{error.statusText || error.message}</pre>
    </div>
  )
}

// --------- 创建路由 ---------
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    loader: authLoader,
    errorElement: <ErrorBoundary />
  }
])

// --------- 应用根组件 ---------
export default function App () {
  const [isLogin, setLogin] = useState(
    localStorage.getItem('isLogin') === 'true'
  )

  const login = () => {
    localStorage.setItem('isLogin', 'true')
    setLogin(true)
  }

  const logout = () => {
    localStorage.setItem('isLogin', 'false')
    setLogin(false)
  }

  return (
    <AuthContext value={{ isLogin, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext>
  )
}
