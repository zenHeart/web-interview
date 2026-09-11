import React from 'react'
import './HomeContributor.css'
import Link from '@docusaurus/Link'

const HomeContributor: React.FC = () => {
  return (
    <div className="home-contributor">
      <div className="contributor-eyebrow">
        <span>OPEN SOURCE & COLLABORATION</span>
      </div>
      <h2 className="contributor-title">共建前端与跨端架构知识库</h2>
      <p className="contributor-description">
        无论是勘误指正、补充大厂最新面试真题，还是完善前沿架构设计与交互沙箱，
        欢迎提交 Pull Request，与开发者共同打磨长青的技术沉淀。
      </p>
      <div className="contributor-actions">
        <Link className="contributor-btn-primary" to="/contributors">
          <span>查看贡献指南 →</span>
        </Link>
        <a
          className="contributor-btn-secondary"
          href="https://github.com/zenHeart/web-interview"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>GitHub 仓库</span>
        </a>
      </div>
    </div>
  )
}

export default HomeContributor
