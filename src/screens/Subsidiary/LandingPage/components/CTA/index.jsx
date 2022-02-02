import React from 'react'
import { Link } from 'react-router-dom'
import company from '../../../../../company'
import styles from './_cta.module.sass'

const CTA = () => {
    return (
        <div>
            <Link className={styles.cta} to={`/${company['subsidiary']}/signup`}>Get Started</Link>
            <div className={styles.sub}>No Login. Free Forever.</div>
        </div>
    )
}

export default CTA
