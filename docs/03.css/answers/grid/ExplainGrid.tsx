import styles from './ExplainGrid.module.css'

export default function Grid () {
  return (
    <div className={styles.container}>
      <div className={styles.cell + ' ' + styles['y-line']}>
        <span className={styles['x-line']}></span>
        <strong>grid 项目(item)</strong>
      </div>
      <div className={styles.cell}>
        <span className={styles['x-line']}></span>
      </div>
      <div className={styles.cell}>
        <span className={styles['x-line']}></span>
      </div>
      <div className={styles.cell}>
        <span className={styles['x-line'] + ' ' + styles.end}></span>
        <span className={styles['grid-track']}>grid 轨道(track)</span>
      </div>
      <div className={styles.cell + ' ' + styles['y-line']}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell + ' ' + styles['y-line']}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div
        className={styles.cell + ' ' + styles['y-line'] + ' ' + styles.end}
      ></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles.cell}></div>
      <div className={styles['grid-column']}>
        <strong>grid 列(column)</strong>
      </div>
      <div className={styles['grid-row']}>
        <strong>grid 行(row)</strong>
      </div>
      <div className={styles['grid-gutter']}>
        <strong>缝隙(gutter)</strong>
      </div>
      <div className={styles['grid-area']}>
        <strong>grid 区域(area)</strong>
      </div>
    </div>
  )
}
