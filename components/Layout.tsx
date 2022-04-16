import Head from 'next/head'
import styles from '../styles/layout.module.css'
import { Footer } from './Footer'
import { Header } from './Header'

export default function Layout({ children }:any) {
  return (
    <>
      <Head>
        <title>Scripture</title>
      </Head>
      <Header/>
      <main className={styles.main}>{children}</main>
      {/* <Footer/> */}
    </>
  )
}