import React from 'react'
import styles from '../styles/layout.module.css'
export const Footer = () => {
  return (
    <footer className={styles.footer}>
    <a
      href="https://github.com/virgerick"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by virgerick
      {/* <img src="/profile.jpg" alt="Vercel Logo" width={100} height={100} className="logo" /> */}
    </a>
  </footer>
  )
}
