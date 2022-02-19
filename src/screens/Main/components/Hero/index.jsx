import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../company'
import CTA from '../../../Subsidiary/LandingPage/components/CTA'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <img className={styles.subsidiaryLogo} src='/logos/subsidiaryText.png' alt={company.subsidiary} />
                <h1>Save 50% on Uplyft</h1>
                <p><span>{company.subsidiary}</span> is a collection of multiple apps, each designed to help you conquer specific challenges in life.</p>
                <CTA type='main' />
            </div>
            <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/hero2.jpg' alt={company.subsidiary} />
        </div>
    )
}

export default Hero
