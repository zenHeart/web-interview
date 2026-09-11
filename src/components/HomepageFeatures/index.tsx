import type { ReactNode } from 'react'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  tag: string
  description: ReactNode
  icon: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    tag: 'Methodology',
    title: '第一性原理金字塔',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
    description: (
      <>
        遵循“核心结论先行-机制原理解析-工业级代码-追问攻防链”四层模型，逻辑闭环，从容应对任何下探提问。
      </>
    )
  },
  {
    tag: 'Production Grade',
    title: '工业级规范代码',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="10" y1="4" x2="14" y2="20" />
      </svg>
    ),
    description: (
      <>
        拒绝 Demo 式敷衍片段，所有高频手写题均提供生产级 TypeScript 严格类型、边界防线与异常容灾保障。
      </>
    )
  },
  {
    tag: 'Interactive Sandbox',
    title: '实时交互沙箱验证',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description: (
      <>
        基于 Sandpack 内置即时运行环境与架构状态机可视化组件，边研读原理解析，边在浏览器零配置交互调试。
      </>
    )
  },
  {
    tag: 'Interview Defense',
    title: '面试官追问攻防链',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="22" y1="12" x2="18" y2="12" />
        <line x1="6" y1="12" x2="2" y2="12" />
        <line x1="12" y1="6" x2="12" y2="2" />
        <line x1="12" y1="22" x2="12" y2="18" />
      </svg>
    ),
    description: (
      <>
        深度还原大厂面试真实攻防场景，剖析面试官核心考察意图、高频下探陷阱与延伸反问策略。
      </>
    )
  }
]

function Feature({ title, tag, description, icon }: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.cardTop}>
        <div className={styles.iconBox}>{icon}</div>
        <span className={styles.cardTag}>{tag}</span>
      </div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDesc}>{description}</p>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresGrid}>
      {FeatureList.map((props, idx) => (
        <Feature key={idx} {...props} />
      ))}
    </section>
  )
}
