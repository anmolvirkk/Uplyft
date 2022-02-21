import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../company'
import CTA from '../CTA'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <img className={styles.subsidiaryLogo} src='/logos/main.png' alt={company.subsidiary} />
                <h1>The ultimate toolkit to become the best version of yourself.</h1>
                <p><span>{company.main} {company.subsidiary}</span> is a collection of multiple apps, each designed to help you conquer specific challenges in life.</p>
                <CTA />
            </div>
            <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/hero2.jpg' alt={company.subsidiary} />
        </div>
    )
}

export default Hero
