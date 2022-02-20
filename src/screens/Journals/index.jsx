import React, {useEffect} from 'react'
import Header from '../LandingPage/components/Header'
import Footer from './components/Footer'
import styles from './_journals.module.sass'
import Hero from './components/Hero'
import Features from './components/Features'

const Journals = () => {

  useEffect(()=>{
      document.getElementsByTagName('html')[0].className = 'light'
  }, [])

  return (
    <div className={styles.container} style={{height: window.innerHeight+'px'}}>
        <Header />
        <Hero />
        <Features />
        <Footer />
    </div>
  )
}

export default Journals