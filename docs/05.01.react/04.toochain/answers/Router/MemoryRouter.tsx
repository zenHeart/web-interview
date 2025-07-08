import { MemoryRouter, Route, Link, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'

function App () {
  // eslint-disable-next-line
   let location = useLocation()
  useEffect(() => {
    console.log('✅ 路由变化，当前地址为：', window?.location?.href)
  }, [location])

  return (
    <>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>首页</div>} />
        <Route path="/about" element={<div>关于</div>} />
      </Routes>
    </>
  )
}

export default function MemoryRouterApp () {
  return (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
}
