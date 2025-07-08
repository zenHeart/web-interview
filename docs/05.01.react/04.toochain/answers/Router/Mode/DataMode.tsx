import { createBrowserRouter, RouterProvider, Link } from 'react-router'

function Layout ({ children }) {
  return (
      <div>
         <nav style={{ display: 'flex', gap: '10px' }}>
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
         </nav>
         <div>{children}</div>
      </div>
  )
}

function Home () {
  return <div>首页</div>
}

function About () {
  return <div>关于</div>
}

async function loader () {
  // 模拟数据加载
  return { message: '数据已加载' }
}

async function action ({ request }) {
  // 模拟表单处理
  return { result: '表单已提交' }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
    loader,
    action
  },
  {
    path: '/about',
    element: <Layout><About /></Layout>,
    loader,
    action
  }
])

export default function App () {
  return <RouterProvider router={router} />
}
