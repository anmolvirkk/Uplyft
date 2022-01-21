import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import styles from './_main.module.sass'
import About from './components/About'
import Trust from './components/Trust'
import Features from './components/Features'
import {windowHeight} from '../Dashboard/variables/mobileHeights'

const LandingPage = () => {
    return (
        <div className={`${styles.container} light`} style={{height: windowHeight+'px'}}>
            <Header />
            <Hero />
            <About />
            <Features />
            <Trust />
            <Footer />
        </div>
    )
}

export default LandingPage
