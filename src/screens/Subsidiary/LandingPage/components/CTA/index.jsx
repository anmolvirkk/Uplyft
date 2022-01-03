import React from 'react'
import styles from './_cta.module.sass'

const CTA = () => {
    return (
        <div>
            <button className={styles.cta}>Try for free</button>
            <div className={styles.sub}>no credit card required</div>
        </div>
    )
}

export default CTA
