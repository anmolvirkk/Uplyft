import React from 'react'
import styles from './_trust.module.sass'
import Testimonials from './components/Testimonials'
import Statement from './components/Statement'

const Trust = () => {
    return (
        <div className={styles.trustSection}>
            <Statement />
            <Testimonials />
        </div>
    )
}

export default Trust
