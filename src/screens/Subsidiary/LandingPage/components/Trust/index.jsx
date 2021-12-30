import React from 'react'
import styles from './_trust.module.sass'
import Statement from './components/Statement'
import Logos from './components/Logos'
import Testimonials from './components/Testimonials'

const Trust = () => {
    return (
        <div className={styles.trustSection}>
            <Statement />
            <Testimonials />
            <Logos />
        </div>
    )
}

export default Trust
