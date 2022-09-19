import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { contractABI } from '../abi'
require('dotenv').config()

export default function Home() {
  return (
    <div className={styles.container}>
     <h1>8k DAO</h1>
    </div>
  )
}
