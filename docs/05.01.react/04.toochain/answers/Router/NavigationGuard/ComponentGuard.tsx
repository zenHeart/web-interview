import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  Link
} from 'react-router'

import { useState, createContext, useContext } from 'react'

// ---------- 模拟 Auth 状态 ----------
const AuthContext = createContext(null)

function useAuth () {
  return useContext(AuthContext)
}

// ---------- 登录页 ----------
function LoginPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const { setLogin } = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleLogin () {
    setLogin(true)
    navigate(from, { replace: true }) // 登录成功后返回原始页面
  }

  return (
    <div>
      <h2>🔐 登录页</h2>
      <p>登录后将跳转到: <code>{from}</code></p>
      <button onClick={handleLogin}>点我登录</button>
    </div>
  )
}

// ---------- 受保护页 ----------
function Dashboard () {
  return (
    <div>
      <h2>📊 仪表盘（受保护）</h2>
      <Link to="/">返回首页</Link>
    </div>
  )
}

// ---------- 守卫高阶组件 ----------
function withAuthGuard (Component) {
  return function Guarded (props) {
    const { isLogin } = useAuth()
    const location = useLocation()
    if (!isLogin) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Component {...props} />
  }
}

// ---------- 首页 ----------
function Home () {
  const { isLogin, setLogin } = useAuth()
  return (
    <div>
      <h2>🏠 首页</h2>
      <p>当前状态: {isLogin ? '已登录 ✅' : '未登录 ❌'}</p>
      <Link to="/dashboard">访问仪表盘</Link>
      <br />
      <button onClick={() => setLogin(false)}>退出登录</button>
    </div>
  )
}

const ProtectedDashboard = withAuthGuard(Dashboard)

// ---------- 顶层路由 ----------
export default function App () {
  const [isLogin, setLogin] = useState(false)
  const AuthValue = { isLogin, setLogin }

  return (
    <AuthContext value={AuthValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedDashboard/>} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  )
}
