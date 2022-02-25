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
                    <img className={styles.subsidiaryLogo} src='/logos/journalsText.png' alt={company.subsidiary} />
                    <h1>Your private 100% customizable online journal</h1>
                    <p>Sanctuary for your mind and soul, spirit will help increase your positive energy, be more grateful and a calmer mind by building healthy thinkings through journaling.</p>
                    <CTA type='main' color="linear-gradient(200deg, #FF31B2, rgba(142, 97, 255, 0) 34%), radial-gradient(circle farthest-corner at 0% -100%, #FA4B62 20%, rgba(205, 219, 248, 0) 51%), linear-gradient(180deg, #FF31B2, #FA4B62)" />
                </div>
                <img loading='lazy' decoding='async' className={styles.heroImg} src = '/decor/journals.png' alt={company.subsidiary} />
            </div>
            <img src={isMobile?'/screens/multipleJournalsMobile.png':'/screens/multipleJournals.png'} alt='' className={styles.heroDemo} />
        </div>
    )
}

export default Hero
