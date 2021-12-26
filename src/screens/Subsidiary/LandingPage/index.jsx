import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import styles from './_main.module.sass'
import Smoke from './Smoke'

const LandingPage = () => {
    return (
        <div className={`${styles.container} light`}>
            <Smoke />
            <Header />
            <Hero />
            <Footer />
        </div>
    )
}

export default LandingPage
