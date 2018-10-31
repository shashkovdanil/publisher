import React from 'react'
import styles from './styles.module.css'

const Page = ({ children }) => (
  <>
    <header>
      <div className={styles['is-mobile-settings']}>
        <input type="checkbox" className={styles.checkbox} id="toggle" />
        <label htmlFor="toggle" className={styles.button}>
          <span className={styles.icon}>&nbsp;</span>
        </label>
        <div className={styles.background}>&nbsp;</div>
        <div className={styles.content} /> {/* For settings content */}
      </div>
    </header>
    <div className={styles.page}>
      <aside className={styles.settings} />
      {children}
    </div>
  </>
)

export default Page
