import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../company'
import CTA from '../../../LandingPage/components/CTA'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <img className={styles.subsidiaryLogo} src='/logos/journalsText.png' alt={company.subsidiary} />
                <h1>Your private 100% customizable online journal</h1>
                <p>Sanctuary for your mind and soul, spirit will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling.</p>
                <CTA type='main' />
            </div>
            <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/journals.png' alt={company.subsidiary} />
        </div>
    )
}

export default Hero
