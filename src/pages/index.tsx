import type { ReactNode } from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useGlobalData from '@docusaurus/useGlobalData'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
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

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  const globalData = useGlobalData() as Record<string, { default?: LastCommitData }>
  const lastCommit = globalData['last-commit-info-plugin']?.default?.lastCommit
  const repoUrl = `https://github.com/${siteConfig.organizationName || 'zenHeart'}/${siteConfig.projectName || 'web-interview'}`

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContent)}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          <span>EDITION 2026 · ARCHIVAL KNOWLEDGE MATRIX · 1,200+ PROBLEMS</span>
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          前端与跨端架构题库全书
        </Heading>
        <p className={styles.heroSubtitle}>
          以第一性原理系统整理技术脉络，深度覆盖语言底层、框架内幕、跨端引擎与大型系统设计，全流程助力技术突破与工程实战。
        </p>

        {lastCommit && (
          <div className={styles.commitInfo}>
            <span>REF</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={lastCommit.message}
            >
              {lastCommit.shortHash} ({lastCommit.dateReadable})
            </a>
          </div>
        )}

        <div className={styles.homeBtns}>
          <Link className={styles.primaryBtn} to="/docs/js/type-value">
            <span>开始研读题库 →</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/reference">
            <span>索引看板与全景</span>
          </Link>
        </div>

        <div className={styles.metricsRow}>
          <div className={styles.metricItem}>
            <span className={styles.metricVal}>1,200+</span>
            <span className={styles.metricLabel}>精选题库收录</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricVal}>18</span>
            <span className={styles.metricLabel}>核心知识学科</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricVal}>100%</span>
            <span className={styles.metricLabel}>离线毫秒级搜索</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricVal}>2026</span>
            <span className={styles.metricLabel}>前沿工程体系</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`首页 · ${siteConfig.title}`}>
      <HomepageHeader />
      <main className="container" style={{ paddingBottom: '4rem' }}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>01 / METHODOLOGY</div>
          <h2 className={styles.sectionTitle}>为什么选择 {siteConfig.title}</h2>
          <p className={styles.sectionDesc}>
            告别机械背诵与碎片拼凑，以金字塔原理解析与真实沙箱验证掌握高频技术本质
          </p>
        </div>
        <HomepageFeatures />

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>02 / CURRICULUM MATRIX</div>
          <h2 className={styles.sectionTitle}>知识领域与学科总览</h2>
          <p className={styles.sectionDesc}>
            全景式涵盖现代 Web、跨端与架构设计的核心工程节点，分类严格、索引分明
          </p>
        </div>
        <HomeQuestionsSummary />

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>03 / COLLABORATION</div>
          <h2 className={styles.sectionTitle}>开放共建与规范传承</h2>
          <p className={styles.sectionDesc}>
            面向社区与开发者的开源知识库，共同打磨严谨的技术沉淀与工程实践
          </p>
        </div>
        <HomeContributor />
      </main>
    </Layout>
  )
}
