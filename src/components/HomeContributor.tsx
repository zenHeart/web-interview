import React from 'react'
import './HomeContributor.css'
import Link from '@docusaurus/Link'

const HomeContributor: React.FC = () => {
  return (
    <div className="home-contributor">
      <h2 className="contributor-title">Join Our Community</h2>
      <p className="contributor-description">
        Contribute your knowledge, engage with fellow developers, and stay
        updated with the latest in frontend development.
      </p>
      <Link className="button button--secondary" to="/contributors">
        Become a Contributor
      </Link>
    </div>
  )
}

export default HomeContributor
