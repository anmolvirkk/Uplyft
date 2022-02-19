import React from 'react'
import Header from '../Subsidiary/LandingPage/components/Header'
import Hero from './components/Hero'
import styles from './_main.module.sass'
import About from '../Subsidiary/LandingPage/components/About'
import Footer from '../Subsidiary/LandingPage/components/Footer'

const Main = () => {
  return (
    <div className={styles.container} style={{height: window.innerHeight+'px'}}>
        <Header type='pricing' />
        <Hero />
        <About type='main' />
        <Footer />
    </div>
  )
}

export default Main