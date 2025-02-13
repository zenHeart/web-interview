import type { ReactNode } from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import HomeQuestionsSummary from '../components/HomeQuestionsSummary'
import HomeContributor from '../components/HomeContributor'

import styles from './index.module.css'

function HomepageHeader () {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Master Your Frontend Interview
        </Heading>
        <div style={{ marginBottom: '2rem' }}>
          Organized by knowledge domains, prioritized for your learning, and
          community-driven for the most up-to-date content.
        </div>
        <div className={styles.homeBtns}>
          <Link className="button button--secondary" to="/reference">
            <Translate>Get Started</Translate>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home (): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />

      <main>
        <h1
          style={{
            textAlign: 'center'
          }}
        >
          {' '}
          Why {siteConfig.title}
        </h1>
        <HomepageFeatures />
        <h1
          style={{
            textAlign: 'center'
          }}
        >
          Explore Knowledge Domains
        </h1>
        <HomeQuestionsSummary />
        <HomeContributor />
      </main>
    </Layout>
  )
}
