import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../../company'

const Hero = () => {
    return (
        <div className={styles.hero}>
            <h1>The ultimate toolkit to manage your life</h1>
            <div className={styles.tools}>
                <img src = '/logos/journals.png' alt={company.journals} />
                <img src = '/logos/schedule.png' alt={company.schedule} />
                <img src = '/logos/notes.png' alt={company.notes} />
                <img src = '/logos/finances.png' alt={company.finances} />
                <img src = '/logos/fitness.png' alt={company.fitness} />
            </div>
            <button className={styles.cta}>Try for free</button>
        </div>
    )
}

export default Hero
