import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useSearchParams,
  useNavigate,
  Link
} from 'react-router'
import { useContext, createContext } from 'react'

// ---------- 上下文定义 ----------
const UserContext = createContext({ name: 'DefaultUser' })

// ---------- 页面组件：主页 ----------
function Home () {
  const navigate = useNavigate()

  return (
    <div>
      <h2>首页</h2>
      <ul>
        <li>
          <Link to="/user/123?tab=profile">查看用户 123（带查询参数）</Link>
        </li>
        <li>
          <button
            onClick={() => {
              navigate('/user/456', {
                state: { source: 'FromHomeButton' }
              })
            }}
          >
            跳转用户 456（带状态）
          </button>
        </li>
      </ul>
    </div>
  )
}

// ---------- 页面组件：用户 ----------
function UserPage () {
  const { id } = useParams()
  const [query, setQuery] = useSearchParams()
  const tab = query.get('tab') || 'default'
  const userCtx = useContext(UserContext)

  const handleChangeTab = (newTab) => {
    // 修改查询参数，同时保留其他参数
    query.set('tab', newTab)
    setQuery(query, { replace: true }) // 避免 push 到历史记录
  }

  return (
    <div>
      <h2>👤 用户页</h2>
      <p>路径参数 id: {id}</p>
      <p>查询参数 tab: <strong>{tab}</strong></p>
      <p>上下文用户名称: {userCtx.name}</p>

      <div>
        切换 Tab:
        <button onClick={() => handleChangeTab('profile')}>Profile</button>
        <button onClick={() => handleChangeTab('settings')}>Settings</button>
      </div>

      <div style={{ marginTop: '10px' }}>
        <Link to="/">← 返回首页</Link>
      </div>
    </div>
  )
}

// ---------- 顶层组件 ----------
export default function AppRouter () {
  const user = { name: 'TomUser' }

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
