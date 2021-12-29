import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../../company'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1>The ultimate toolkit to become the best version of yourself.</h1>
                <p>{company.subsidiary} is a collection of multiple apps, each designed to help you conquer specific challenges in life.</p>
                <button className={styles.cta}>Try for free</button>
            </div>
            <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/hero2.jpg' alt={company.subsidiary} />
        </div>
    )
}

export default Hero
