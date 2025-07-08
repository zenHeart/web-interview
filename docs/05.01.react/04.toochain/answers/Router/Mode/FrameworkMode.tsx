import {
  createFrameworkRouter,
  index,
  route,
  Link
} from '@react-router/dev'

const Layout = ({ children }) => (
  <div>
    <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
    </nav>
    <div>{children}</div>
  </div>
)

const Home = () => (
  <div>
    <h1>🏠 首页</h1>
    <p>欢迎来到首页。</p>
  </div>
)

const About = () => (
  <div>
    <h1>📘 关于页面</h1>
    <p>这里是关于我们的介绍。</p>
  </div>
)

// 2️⃣ 路由配置：Framework Mode 虚拟路径 + 内联组件
const routes = [
  index(() => ( // Corrected: No path needed for the root index
    <Layout>
      <Home />
    </Layout>
  )),
  route('about', () => ( // Corrected: 'about' is the path
    <Layout>
      <About />
    </Layout>
  ))
]

// 3️⃣ 创建 Router (Framework 模式)
const Router = createFrameworkRouter({ routes })

export default Router