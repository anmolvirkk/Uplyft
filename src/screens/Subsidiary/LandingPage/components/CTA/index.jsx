import React from 'react'
import { Link } from 'react-router-dom'
import company from '../../../../../company'
import styles from './_cta.module.sass'

const CTA = ({type}) => {
    return (
        <div>
            {type==='pricing'?<div className={styles.cta}>Create Account</div>:<Link className={styles.cta} to={`/${company['subsidiary']}/pricing`}>Get Started</Link>}
            {type==='pricing'?<div className={styles.sub}>Start With Pro Account</div>:<div className={styles.sub}>No Login. Free Forever.</div>}
        </div>
    )
}

export default CTA
