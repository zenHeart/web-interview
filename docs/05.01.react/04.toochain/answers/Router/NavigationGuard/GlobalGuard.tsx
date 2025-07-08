import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link
} from 'react-router'

import React, { useContext, createContext, useState, useEffect } from 'react'

// ---------- Auth 上下文 ----------
const AuthContext = createContext()
function useAuth () {
  return useContext(AuthContext)
}

// ---------- 全局导航守卫组件 ----------
function GlobalGuard () {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLogin } = useAuth()

  useEffect(() => {
    if (!isLogin && location.pathname !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [isLogin, location, navigate])

  return null
}

// ---------- 首页 ----------
function Home () {
  const { isLogin, logout } = useAuth()
  return (
    <div>
      <h2>🏠 首页</h2>
      <p>当前状态：{isLogin ? '✅ 已登录' : '❌ 未登录'}</p>
      <nav>
        <Link to="/dashboard">前往 Dashboard</Link>
      </nav>
      {isLogin && <button onClick={logout}>退出登录</button>}
    </div>
  )
}

// ---------- 登录页 ----------
function Login () {
  const { login } = useAuth()
  const navigate = useNavigate()
  return (
    <div>
      <h2>🔐 登录页</h2>
      <button
        onClick={() => {
          login()
          navigate('/', { replace: true })
        }}
      >
        登录
      </button>
    </div>
  )
}

// ---------- 受保护页面 ----------
function Dashboard () {
  return (
    <div>
      <h2>📊 Dashboard</h2>
      <p>这个页面需要登录才能访问</p>
      <Link to="/">返回首页</Link>
    </div>
  )
}

// ---------- App 根组件 ----------
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
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      <BrowserRouter>
        {/* 👇 全局守卫放在路由前 */}
        <GlobalGuard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
