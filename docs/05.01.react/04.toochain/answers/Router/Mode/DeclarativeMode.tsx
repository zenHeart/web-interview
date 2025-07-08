import { HashRouter, Routes, Route, Link } from 'react-router'

function Home () {
  return <div>首页</div>
}
function About () {
  return <div>关于</div>
}

export default function App () {
  return (
    <HashRouter>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  )
}
