import React from 'react'
import './HomeContributor.css'
import Link from '@docusaurus/Link'

const HomeContributor: React.FC = () => {
  return (
    <div className="home-contributor">
      <div className="contributor-badge">
        <span className="contributor-dot" />
        <span>Open Source · Community Driven</span>
      </div>
      <h2 className="contributor-title">共同打磨高质量技术沉淀</h2>
      <p className="contributor-description">
        无论是勘误指正、补充大厂前沿面试真题，还是完善架构设计与交互沙箱，
        欢迎提交 Pull Request，与众多开发者一起构建更加精准、实用的面试知识库。
      </p>
      <div className="contributor-actions">
        <Link className="contributor-btn-primary" to="/contributors">
          <span>📖 查看贡献指南</span>
        </Link>
        <a
          className="contributor-btn-secondary"
          href="https://github.com/zenHeart/web-interview"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>⭐ Star on GitHub</span>
        </a>
      </div>
    </div>
  )
}

export default HomeContributor
