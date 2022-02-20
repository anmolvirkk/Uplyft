import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../company'
import CTA from '../../../LandingPage/components/CTA'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <img className={styles.subsidiaryLogo} src='/logos/scheduleText.png' alt={company.subsidiary} />
                <h1>Manage your tasks, projects, events and habits all in one schedule</h1>
                <p><span>{company.main} {company.journals}</span> is a private customizable online journal to help you understand your thoughts and emotions to feel at ease.</p>
                <CTA type='main' />
            </div>
            <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/schedule.png' alt={company.subsidiary} />
        </div>
    )
}

export default Hero
