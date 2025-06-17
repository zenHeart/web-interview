import React from 'react'
import './HomeContributor.css'
import Link from '@docusaurus/Link'

const HomeContributor: React.FC = () => {
  return (
      <div className="home-contributor">
         <h2 className="contributor-title">加入我们的社区</h2>
         <p className="contributor-description">
            分享你的知识，与开发者交流互动，及时获取前端领域的最新动态。
         </p>
         <Link className="button button--secondary" to="/contributors">
            成为贡献者
         </Link>
      </div>
  )
}

export default HomeContributor
