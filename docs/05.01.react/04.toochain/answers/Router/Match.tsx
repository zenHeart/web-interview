import { HashRouter, Routes, Route, Link, useParams } from 'react-router'

function User () {
  const { id, status } = useParams()
  return (
      <div>
        {!!id && <strong>用户 ID: {id}</strong>}
        {!!status && <strong>状态: {status}</strong>}
      </div>
  )
}

function Spalt () {
  const { '*': splat } = useParams()
  return <div>{!!splat && <strong>{splat}</strong>}</div>
}

function Multi () {
  const { '*': splat, size, type } = useParams()

  return (
      <div>
        {!!splat && <strong>{splat}</strong>}
        {!!size && <strong>大小: {size}</strong>}
        {!!type && <strong>类型: {type}</strong>}
      </div>
  )
}

// 验证 react-router 支持的路由配置
const RouteConfig = [
  {
    path: '/',
    element: <div>首页</div>
  },
  {
    path: '/about',
    element: <div>关于</div>
  },
  {
    path: '/user/:id',
    to: '/user/1', // 默认重定向到用户 ID 1
    element: <User />
  },
  {
    path: '/user/:id/profile/:status?',
    to: ['/user/2/profile/edit', '/user/2/profile'],
    element: <User />
  },
  {
    path: '/spalt/*',
    to: ['/spalt', '/spalt/:test', '/spalt/2/3'], // 默认重定向到用户 ID 1
    element: <Spalt />
  },
  {
    path: '/multi/file/:size/:type?/*',
    to: ['/multi/file/0', '/multi/file/10KB/png/a.png', '/multi/file/20KB/b.jpg', '/multi/file/20KB/pdf/d/g.pdf'],
    element: <Multi />
  }
]

function App () {
  return (
      <>
        <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {RouteConfig.map((route, index) =>
            Array.isArray(route.to)
              ? (
                  route.to.map((link) => (
                <Link key={link} to={link}>
                  {link}
                </Link>
                  ))
                )
              : (
              <Link key={index} to={route.to ?? route.path}>
                {route.to ?? route.path}
              </Link>
                )
          )}
        </nav>
        <Routes>
          {RouteConfig.map(({ path, ...options }, index) => (
            <Route key={index} path={path} {...options} />
          ))}
        </Routes>
      </>
  )
}
export default function HashRouterApp () {
  return (
      <HashRouter>
        <App />
      </HashRouter>
  )
}
