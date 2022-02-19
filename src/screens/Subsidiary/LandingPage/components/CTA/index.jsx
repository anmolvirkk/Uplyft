import React from 'react'
import { Link } from 'react-router-dom'
import company from '../../../../../company'
import styles from './_cta.module.sass'

const CTA = ({type}) => {
    return (
        <div>
            {type==='pricing'?<div className={styles.cta}>Create Account</div>:type!=='main'?<Link className={styles.cta} to={`/${company['subsidiary']}/pricing`}>Get Started</Link>:<Link className={styles.cta} to={`/${company['subsidiary']}`}>Get Started</Link>}
            {type==='pricing'?<div className={styles.sub}>Start With Pro Account</div>:type!=='main'?<div className={styles.sub}>No Login. Free Forever.</div>:null}
        </div>
    )
}

export default CTA
