import React from 'react'
import styles from './_cta.module.sass'

const CTA = () => {
    return (
        <div>
            <button className={styles.cta}>Sign Up</button>
            <div className={styles.sub}>free forever. no credit card.</div>
        </div>
    )
}

export default CTA
