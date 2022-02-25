import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../company'
import CTA from '../../../LandingPage/components/CTA'

const Hero = () => {
    const isMobile = window.innerWidth < 640
    return (
        <div className={styles.hero}>
            <div className={styles.main}>
                <div className={styles.content}>
                    <img className={styles.subsidiaryLogo} src='/logos/scheduleText.png' alt={company.subsidiary} />
                    <h1>Get organized today by creating a sleek new schedule</h1>
                    <p>Control is an all in one schedule where you can track your projects, tasks, events and habits to simplify your life.</p>
                    <CTA type='main' color="linear-gradient(200deg, #AAD0E8, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, #43B9FE 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, #AAD0E8, #43B9FE)" />
                </div>
                <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/schedule.png' alt={company.subsidiary} />
            </div>
            <img src={isMobile?'/screens/trackEventsMobile.png':'/screens/trackHabits.png'} alt='' className={styles.heroDemo} />
        </div>
    )
}

export default Hero
