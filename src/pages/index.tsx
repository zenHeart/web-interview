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
               前端面试全攻略
            </Heading>
            <div style={{ marginBottom: '2rem' }}>
               按知识领域系统整理，学习重点一目了然，内容持续由社区共建和更新。
            </div>
            <div className={styles.homeBtns}>
               <Link className="button button--secondary" to="/reference">
                  <Translate>开始使用</Translate>
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
         title={`欢迎来到 ${siteConfig.title}`}
      >
         <HomepageHeader />

         <main>
            <h1
               style={{
                 textAlign: 'center'
               }}
            >
               为什么选择 {siteConfig.title}
            </h1>
            <HomepageFeatures />
            <h1
               style={{
                 textAlign: 'center'
               }}
            >
               知识领域总览
            </h1>
            <HomeQuestionsSummary />
            <HomeContributor />
         </main>
      </Layout>
  )
}
