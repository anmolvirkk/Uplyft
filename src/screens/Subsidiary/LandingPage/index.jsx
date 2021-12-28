import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import styles from './_main.module.sass'
import Journals from './components/Journals'

const LandingPage = () => {
    return (
        <div className={`${styles.container} light`}>
            <Header />
            <Hero />
            <Journals />
            <Footer />
        </div>
    )
}

export default LandingPage
