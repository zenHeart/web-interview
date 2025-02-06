import React, { useState } from 'react'
import styles from './ThinkBlock.module.css'

// 思考区块组件
const ThinkingBlock: React.FC<{ content: string }> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
     <div className={styles.thinkingBlock} onClick={() => setIsExpanded(!isExpanded)}>
       <div className={styles.thinkingHeader}>
         <span className={`${styles.thinkingIcon} ${isExpanded ? styles.expanded : ''}`}>▶</span>
         查看思考过程
       </div>
       <div className={`${styles.thinkingContent} ${isExpanded ? styles.expanded : ''}`}>
         {content}
       </div>
     </div>
  )
}
export default ThinkingBlock
