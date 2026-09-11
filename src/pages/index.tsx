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
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          <span>2026 前沿体系演进 · 覆盖 1,200+ 大厂真题与架构实战</span>
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          前端与跨端架构题库
        </Heading>
        <p className={styles.heroSubtitle}>
          以第一性原理系统整理技术脉络，深度覆盖语言底层、现代框架源码、跨端引擎机制与全链路系统设计，全流程助力技术突破与职业晋升。
        </p>

        {lastCommit && (
          <div className={styles.commitInfo}>
            <span>最后更新时间：</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={lastCommit.message}
            >
              {lastCommit.dateReadable}
            </a>
          </div>
        )}

        <div className={styles.homeBtns}>
          <Link className={styles.primaryBtn} to="/docs/js/type-value">
            <span>⚡ 开始刷题 / 探索题库</span>
          </Link>
          <Link className={styles.secondaryBtn} to="/reference">
            <span>🧭 知识索引 & 全景看板</span>
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
            <span className={styles.metricVal}>P0~P2</span>
            <span className={styles.metricLabel}>分级考察权重</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricVal}>100%</span>
            <span className={styles.metricLabel}>离线毫秒级搜索</span>
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
          <div className={styles.sectionTag}>Why Web Interview</div>
          <h2 className={styles.sectionTitle}>为什么选择本题库</h2>
          <p className={styles.sectionDesc}>
            告别死记硬背与碎片拼凑，以金字塔原理解析、生产级代码与沙箱运行直击技术本质
          </p>
        </div>
        <HomepageFeatures />

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Curriculum Matrix</div>
          <h2 className={styles.sectionTitle}>全景学科与知识矩阵</h2>
          <p className={styles.sectionDesc}>
            涵盖现代前端、跨端桌面/移动端、Node.js 与系统设计的核心工程节点，按需精准突击
          </p>
        </div>
        <HomeQuestionsSummary />

        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>Open Collaboration</div>
          <h2 className={styles.sectionTitle}>开放共建与持续演进</h2>
          <p className={styles.sectionDesc}>
            面向社区与开发者的开源知识库，共同打磨严谨的技术沉淀与工程实践
          </p>
        </div>
        <HomeContributor />
      </main>
    </Layout>
  )
}
