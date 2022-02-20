import React, {useEffect} from 'react'
import Footer from '../LandingPage/components/Footer'
import Header from '../LandingPage/components/Header'
import styles from './_schedule.module.sass'
import Hero from './components/Hero'

const Schedule = () => {

  useEffect(()=>{
      document.getElementsByTagName('html')[0].className = 'light'
  }, [])

  return (
    <div className={styles.container} style={{height: window.innerHeight+'px'}}>
        <Header />
        <Hero />
        <Footer />
    </div>
  )
}

export default Schedule