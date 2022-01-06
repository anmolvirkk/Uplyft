import React from 'react'
import { Link } from 'react-router-dom'
import company from '../../../../../company'
import styles from './_cta.module.sass'

const CTA = () => {
    return (
        <div>
            <Link className={styles.cta} to={`/${company['subsidiary']}/signup`}>Sign Up</Link>
            <div className={styles.sub}>free forever. no credit card.</div>
        </div>
    )
}

export default CTA
