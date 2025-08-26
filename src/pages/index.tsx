import type { ReactNode } from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useGlobalData from '@docusaurus/useGlobalData'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import HomeQuestionsSummary from '../components/HomeQuestionsSummary'
import HomeContributor from '../components/HomeContributor'
import styles from './index.module.css'

interface LastCommitData {
   lastCommit?: {
      hash: string
      shortHash: string
      authorName: string
      authorEmail: string
      dateISO: string
      dateReadable: string
      message: string
   }
}

function HomepageHeader () {
  const { siteConfig } = useDocusaurusContext()
  const globalData = useGlobalData() as Record<string, { default?: LastCommitData }>
  const lastCommit = globalData['last-commit-info-plugin']?.default?.lastCommit
  const repoUrl = `https://github.com/${siteConfig.organizationName || 'zenHeart'}/${siteConfig.projectName || 'web-interview'}`
  return (
      <header className={clsx('hero', styles.heroBanner)}>
         <div className="container">
            <Heading as="h1" className="hero__title">
               前端面试全攻略
            </Heading>
            <div style={{ marginBottom: '2rem' }}>
               <div>按知识领域系统整理，学习重点一目了然，内容持续更新</div>
               {lastCommit && (
                  <div style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '0.5rem' }}>
                     最近更新：
                     <a
                        href={`${repoUrl}/commit/${lastCommit.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={lastCommit.message}
                        style={{ marginLeft: '0.25rem' }}
                     >
                        {lastCommit.dateReadable} · {lastCommit.authorName}
                     </a>
                  </div>
               )}
            </div>
            <div className={styles.homeBtns}>
               <Link className="button button--secondary" to="/reference">
                  <Translate id="home.cta.start">开始使用</Translate>
               </Link>
            </div>
         </div>
      </header>
  )
}

export default function Home (): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
      <Layout title={`欢迎来到 ${siteConfig.title}`}>
         <HomepageHeader />
         <main>
            <h1 style={{ textAlign: 'center' }}>为什么选择 {siteConfig.title}</h1>
            <HomepageFeatures />
            <h1 style={{ textAlign: 'center' }}>知识领域总览</h1>
            <HomeQuestionsSummary />
            <HomeContributor />
         </main>
      </Layout>
  )
}
